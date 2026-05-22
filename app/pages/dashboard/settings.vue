<script setup lang="ts">
import { toast } from "vue-sonner";
import { profileSchema } from "~/validations/profile";

definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();

const isUsernameTaken = ref(false);
const checkingUsername = ref(false);
const localPreview = ref<string | null>(null);
const errors = ref<Record<string, string[]>>({});

const hasErrors = computed(() => Object.keys(errors.value).length > 0);
const avatarSrc = computed(() => {
	return (
		localPreview.value ||
		portfolio.profile.avatar_url ||
		`https://ui-avatars.com/api/?name=${encodeURIComponent(portfolio.profile.full_name || "Portobit")}`
	);
});

const validate = () => {
	const result = profileSchema.safeParse(portfolio.profile);

	if (!result.success) {
		errors.value = result.error.flatten().fieldErrors as Record<string, string[]>;
		return false;
	}

	errors.value = {};
	return true;
};

watch(
	() => portfolio.profile,
	() => validate(),
	{ deep: true },
);

const handleSave = async () => {
	if (!validate() || isUsernameTaken.value) {
		toast.error("Periksa kembali inputan kamu.");
		return;
	}

	await portfolio.saveChanges();
};

const checkUsername = async (username: string) => {
	if (username.length < 3) {
		isUsernameTaken.value = false;
		return;
	}

	checkingUsername.value = true;
	const supabase = useSupabaseClient();

	const { data } = await supabase
		.from("profiles")
		.select("username")
		.eq("username", username.toLowerCase())
		.single();

	isUsernameTaken.value = !!data;
	checkingUsername.value = false;
};

function handleAvatarUpload(event: Event) {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	if (!file) return;

	portfolio.pendingAvatarFile = file;
	portfolio.hasUnsavedChanges = true;
	localPreview.value = URL.createObjectURL(file);
}
</script>

<template>
	<div class="space-y-6">
		<section class="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
			<div>
				<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Settings</p>
				<h1 class="mt-2 text-2xl font-black tracking-tight text-slate-950">Pengaturan Profil</h1>
				<p class="mt-1 text-sm text-slate-600">Kelola identitas yang tampil di halaman Portobit kamu.</p>
			</div>

			<button
				@click="handleSave"
				:disabled="hasErrors || isUsernameTaken || portfolio.isLoading"
				class="hidden items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 md:inline-flex"
			>
				<Icon v-if="portfolio.isLoading" name="ph:circle-notch-bold" class="animate-spin" />
				<Icon v-else name="ph:floppy-disk-back-bold" />
				{{ portfolio.isLoading ? "Menyimpan..." : "Simpan Perubahan" }}
			</button>
		</section>

		<div class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
			<aside class="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
				<div class="group relative mx-auto mb-4 h-28 w-28">
					<img
						:src="avatarSrc"
						class="h-28 w-28 rounded-lg border border-slate-200 object-cover shadow-sm"
						alt="Avatar preview"
					/>
					<label class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-slate-950/65 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
						<Icon name="ph:camera-bold" class="mb-1 text-white" size="24" />
						<span class="text-[10px] font-black uppercase tracking-widest text-white">Ubah Foto</span>
						<input type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
					</label>
				</div>
				<h3 class="truncate font-black text-slate-950">
					{{ portfolio.profile.full_name || "Your Name" }}
				</h3>
				<p class="mt-1 truncate font-mono text-xs text-slate-500">@{{ portfolio.profile.username || "username" }}</p>
			</aside>

			<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
				<div class="grid gap-6">
					<div class="space-y-2">
						<label class="text-sm font-black text-slate-800">Nama Lengkap</label>
						<input
							v-model="portfolio.profile.full_name"
							type="text"
							class="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-emerald-400 focus:bg-white"
							:class="{ 'border-red-400 bg-red-50': errors.full_name }"
							placeholder="Misal: Daffa Raihan"
						/>
						<p v-if="errors.full_name" class="flex items-center gap-1 text-xs text-red-600">
							<Icon name="ph:warning-circle-fill" /> {{ errors.full_name[0] }}
						</p>
					</div>

					<div class="space-y-2">
						<label class="text-sm font-black text-slate-800">Username</label>
						<div class="relative">
							<span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">@</span>
							<input
								v-model="portfolio.profile.username"
								@input="checkUsername(($event.target as HTMLInputElement).value)"
								type="text"
								class="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-9 pr-12 text-sm font-semibold outline-none transition-colors focus:border-emerald-400 focus:bg-white"
								placeholder="username"
							/>
							<Icon v-if="checkingUsername" name="ph:circle-notch-bold" class="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400" />
						</div>
						<p v-if="errors.username" class="text-xs text-red-600">{{ errors.username[0] }}</p>
						<p v-if="isUsernameTaken" class="text-xs text-red-600">Username ini sudah tidak tersedia.</p>
					</div>

					<div class="space-y-2">
						<label class="flex justify-between text-sm font-black text-slate-800">
							<span>Bio Singkat</span>
							<span class="text-xs font-semibold text-slate-400">{{ portfolio.profile.bio?.length || 0 }}/160</span>
						</label>
						<textarea
							v-model="portfolio.profile.bio"
							rows="4"
							class="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-emerald-400 focus:bg-white"
							:class="{ 'border-red-400 bg-red-50': errors.bio }"
							placeholder="Ceritakan sedikit tentang dirimu..."
						></textarea>
						<p v-if="errors.bio" class="text-xs text-red-600">{{ errors.bio[0] }}</p>
					</div>

					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2">
							<label class="text-sm font-black text-slate-800">Instagram</label>
							<div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
								<Icon name="ph:instagram-logo-bold" class="shrink-0 text-slate-400" />
								<input
									v-model="portfolio.profile.instagram_url"
									type="text"
									class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
									placeholder="@username"
									@input="portfolio.hasUnsavedChanges = true"
								/>
							</div>
							<p v-if="errors.instagram_url" class="text-xs text-red-600">{{ errors.instagram_url[0] }}</p>
						</div>

						<div class="space-y-2">
							<label class="text-sm font-black text-slate-800">LinkedIn</label>
							<div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
								<Icon name="ph:linkedin-logo-bold" class="shrink-0 text-slate-400" />
								<input
									v-model="portfolio.profile.linkedin_url"
									type="text"
									class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
									placeholder="username atau URL"
									@input="portfolio.hasUnsavedChanges = true"
								/>
							</div>
							<p v-if="errors.linkedin_url" class="text-xs text-red-600">{{ errors.linkedin_url[0] }}</p>
						</div>

						<div class="space-y-2">
							<label class="text-sm font-black text-slate-800">GitHub</label>
							<div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
								<Icon name="ph:github-logo-bold" class="shrink-0 text-slate-400" />
								<input
									v-model="portfolio.profile.github_url"
									type="text"
									class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
									placeholder="username"
									@input="portfolio.hasUnsavedChanges = true"
								/>
							</div>
							<p v-if="errors.github_url" class="text-xs text-red-600">{{ errors.github_url[0] }}</p>
						</div>
					</div>
				</div>
			</section>
		</div>

		<button
			@click="handleSave"
			:disabled="hasErrors || isUsernameTaken || portfolio.isLoading"
			class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:bg-slate-200 md:hidden"
		>
			{{ portfolio.isLoading ? "Menyimpan..." : "Simpan Perubahan" }}
		</button>
	</div>
</template>
