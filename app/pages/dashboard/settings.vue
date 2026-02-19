<script setup lang="ts">
import { toast } from "vue-sonner";
import { profileSchema } from "~/validations/profile";

definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();

const isUsernameTaken = ref(false);
const checkingUsername = ref(false);
const localPreview = ref<string | null>(null);
const errors = ref<Record<string, string>>({});

const validate = () => {
	const result = profileSchema.safeParse(portfolio.profile);

	if (!result.success) {
		errors.value = result.error.flatten().fieldErrors as any;
		return false;
	}

	errors.value = {};
	return true;
};

watch(
	() => portfolio.profile,
	() => {
		validate();
	},
	{ deep: true },
);

const handleSave = async () => {
	if (!validate() || isUsernameTaken.value) {
		toast.error("Periksa kembali inputan kamu");
		return;
	}
	await portfolio.saveChanges();
};

const checkUsername = async (username: string) => {
	if (username.length < 3) return;

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

function handleAvatarUpload(event: any) {
	const file = event.target.files[0];
	if (!file) return;

	portfolio.pendingAvatarFile = file;
	portfolio.hasUnsavedChanges = true;

	localPreview.value = URL.createObjectURL(file);
}

onMounted(() => {
	portfolio.fetchUserPortfolio();
});
</script>

<template>
	<div class="max-w-4xl mx-auto py-10 px-6">
		<div class="mb-10 flex justify-between items-end">
			<div>
				<h1 class="text-3xl font-black text-slate-900 tracking-tight">Pengaturan Profil</h1>
				<p class="text-slate-500 mt-1">Kelola bagaimana dunia melihat dirimu di Portobit.</p>
			</div>

			<button
				@click="handleSave"
				:disabled="Object.keys(errors).length > 0 || portfolio.isLoading"
				class="hidden md:flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all duration-300"
			>
				<Icon v-if="portfolio.isLoading" name="ph:circle-notch-bold" class="animate-spin" />
				<Icon v-else name="ph:floppy-disk-back-bold" />
				Simpan Perubahan
			</button>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
			<div class="lg:col-span-4">
				<div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center shadow-sm">
					<div class="relative group mx-auto w-32 h-32 mb-4">
						<img
							:src="
								localPreview ||
								portfolio.profile.avatar_url ||
								'https://ui-avatars.com/api/?name=' + portfolio.profile.full_name
							"
							class="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-white shadow-xl ring-1 ring-slate-100"
						/>
						<label
							class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 rounded-[2.5rem] opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm"
						>
							<Icon name="ph:camera-bold" class="text-white mb-1" size="24" />
							<span class="text-white text-[10px] font-black tracking-widest">UBAH FOTO</span>
							<input type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
						</label>
					</div>
					<h3 class="font-bold text-slate-800 line-clamp-1">
						{{ portfolio.profile.full_name || "Your Name" }}
					</h3>
					<p class="text-xs text-slate-400 font-medium font-mono">
						@{{ portfolio.profile.username || "username" }}
					</p>
				</div>
			</div>

			<div class="lg:col-span-8 space-y-6">
				<div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
					<div class="space-y-2">
						<label class="text-sm font-black text-slate-700 ml-1">Nama Lengkap</label>
						<div class="relative">
							<input
								v-model="portfolio.profile.full_name"
								type="text"
								class="w-full px-5 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
								:class="{ 'border-red-500 bg-red-50': errors.full_name }"
								placeholder="Misal: Daffa Raihan"
							/>
							<p
								v-if="errors.full_name"
								class="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1"
							>
								<Icon name="ph:warning-circle-fill" /> {{ errors.full_name[0] }}
							</p>
						</div>
					</div>

					<div class="space-y-2">
						<label class="text-sm font-black text-slate-700 ml-1">Username</label>
						<div class="relative">
							<span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold"
								>@</span
							>
							<input
								v-model="portfolio.profile.username"
								@input="checkUsername(($event.target as HTMLInputElement).value)"
								type="text"
								class="w-full pl-10 pr-12 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
								placeholder="username"
							/>
						</div>
						<p v-if="errors.username" class="text-red-500 text-xs mt-1.5 ml-1">
							{{ errors.username[0] }}
						</p>
						<p v-if="isUsernameTaken" class="text-red-500 text-xs mt-1.5 ml-1">
							Username ini sudah tidak tersedia.
						</p>
					</div>

					<div class="space-y-2">
						<label class="text-sm font-black text-slate-700 ml-1 text-flex justify-between">
							Bio Singkat
							<span class="text-[10px] text-slate-400 font-normal italic"
								>{{ portfolio.profile.bio?.length || 0 }}/160</span
							>
						</label>
						<textarea
							v-model="portfolio.profile.bio"
							rows="3"
							class="w-full px-5 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
							:class="{ 'border-red-500 bg-red-50': errors.bio }"
							placeholder="Ceritakan sedikit tentang dirimu..."
						></textarea>
						<p v-if="errors.bio" class="text-red-500 text-xs mt-1">{{ errors.bio[0] }}</p>
					</div>
				</div>

				<button
					@click="handleSave"
					:disabled="Object.keys(errors).length > 0 || isUsernameTaken || portfolio.isLoading"
					class="md:hidden w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl disabled:bg-slate-200 transition-all"
				>
					{{ portfolio.isLoading ? "Menyimpan..." : "Simpan Perubahan" }}
				</button>
			</div>
		</div>
	</div>
</template>
