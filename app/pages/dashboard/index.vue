<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({
	layout: "dashboard",
});

const portfolio = usePortfolioStore();
const copiedProfileLink = ref(false);

const publicProfileUrl = computed(() => {
	const username = portfolio.profile.username?.toLowerCase();
	if (!username || !import.meta.client) return "";

	return `${window.location.origin}/${username}`;
});

const isProfileIncomplete = computed(() => {
	return !portfolio.profile.username || !portfolio.profile.full_name || portfolio.projects.length === 0;
});

const onboardingSteps = computed(() => [
	{
		id: "name",
		label: "Isi nama lengkap",
		description: "Nama ini tampil sebagai identitas utama di portofolio publik.",
		done: Boolean(portfolio.profile.full_name?.trim()),
		icon: "ph:identification-card-bold",
		to: "/dashboard/settings",
		actionLabel: "Isi Profil",
	},
	{
		id: "username",
		label: "Buat username",
		description: "Username menjadi URL portofolio yang bisa kamu bagikan.",
		done: Boolean(portfolio.profile.username?.trim()),
		icon: "ph:at-bold",
		to: "/dashboard/settings",
		actionLabel: "Atur Username",
	},
	{
		id: "bio",
		label: "Tulis bio singkat",
		description: "Beri konteks tentang peran, fokus, atau keahlianmu.",
		done: Boolean(portfolio.profile.bio?.trim()),
		icon: "ph:text-align-left-bold",
		to: "/dashboard/settings",
		actionLabel: "Tulis Bio",
	},
	{
		id: "avatar",
		label: "Upload avatar",
		description: "Foto atau avatar membuat profil terasa lebih kredibel.",
		done: Boolean(portfolio.profile.avatar_url),
		icon: "ph:user-circle-bold",
		to: "/dashboard/settings",
		actionLabel: "Upload Foto",
	},
	{
		id: "project",
		label: "Tambah project pertama",
		description: "Project adalah bukti utama yang akan dilihat calon klien.",
		done: portfolio.projects.length > 0,
		icon: "ph:briefcase-bold",
		to: "/dashboard/projects",
		actionLabel: "Tambah Project",
	},
	{
		id: "template",
		label: "Pilih template",
		description: "Tentukan gaya visual yang paling cocok dengan personal brand kamu.",
		done: Boolean(portfolio.profile.template_name),
		icon: "ph:layout-bold",
		to: "/dashboard/template",
		actionLabel: "Pilih Template",
	},
	{
		id: "share",
		label: "Bagikan link publik",
		description: "Salin link portofolio untuk bio, lamaran, atau calon klien.",
		done: copiedProfileLink.value,
		icon: "ph:share-network-bold",
		actionLabel: "Copy Link",
	},
]);

const completedSteps = computed(() => onboardingSteps.value.filter((step) => step.done).length);
const onboardingProgress = computed(() => Math.round((completedSteps.value / onboardingSteps.value.length) * 100));
const nextStep = computed(() => onboardingSteps.value.find((step) => !step.done));

const metrics = computed(() => [
	{
		label: "Total View",
		value: portfolio.profile.views_count || 0,
		icon: "ph:eye-bold",
		helper: "Akumulasi kunjungan profil",
	},
	{
		label: "Projects",
		value: portfolio.projects.length,
		icon: "ph:briefcase-bold",
		helper: "Karya yang tampil di profil",
	},
	{
		label: "Status Akun",
		value: portfolio.profile.is_pro ? "Pro" : "Free",
		icon: "ph:shield-check-bold",
		helper: "Paket aktif saat ini",
	},
]);

const copiedStorageKey = computed(() => {
	const username = portfolio.profile.username?.toLowerCase();
	return username ? `portobit_copied_profile_${username}` : "";
});

const syncCopiedState = () => {
	if (!import.meta.client || !copiedStorageKey.value) {
		copiedProfileLink.value = false;
		return;
	}

	copiedProfileLink.value = localStorage.getItem(copiedStorageKey.value) === "true";
};

watch(
	() => portfolio.profile.username,
	() => syncCopiedState(),
);

onMounted(() => {
	syncCopiedState();
});

const copyProfileLink = async () => {
	if (!portfolio.profile.username) {
		toast.warning("Atur username dulu sebelum membagikan link.");
		return;
	}

	await navigator.clipboard.writeText(publicProfileUrl.value);
	copiedProfileLink.value = true;

	if (copiedStorageKey.value) {
		localStorage.setItem(copiedStorageKey.value, "true");
	}

	toast.success("Link portofolio berhasil disalin.");
};
</script>

<template>
	<div class="space-y-6">
		<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
			<div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
				<div>
					<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Overview</p>
					<h2 class="mt-2 text-2xl font-black tracking-tight text-slate-950">
						Ringkasan portofolio kamu
					</h2>
					<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
						Pantau kelengkapan profil, jumlah project, dan performa dasar sebelum membagikan link ke calon klien.
					</p>
				</div>
				<NuxtLink
					to="/dashboard/projects"
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
				>
					Kelola Project
					<Icon name="ph:arrow-right-bold" />
				</NuxtLink>
			</div>
		</section>

		<section class="grid gap-4 md:grid-cols-3">
			<article
				v-for="metric in metrics"
				:key="metric.label"
				class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
			>
				<div class="flex items-center justify-between">
					<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
						<Icon :name="metric.icon" size="23" />
					</div>
					<span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Live</span>
				</div>
				<p class="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">{{ metric.label }}</p>
				<p class="mt-2 text-4xl font-black tracking-tight text-slate-950">{{ metric.value }}</p>
				<p class="mt-2 text-sm text-slate-500">{{ metric.helper }}</p>
			</article>
		</section>

		<section class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
			<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
				<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
					<div>
						<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Launch checklist</p>
						<h3 class="mt-2 text-xl font-black text-slate-950">Siapkan portofolio sampai siap dibagikan</h3>
						<p class="mt-1 text-sm leading-6 text-slate-600">
							Ikuti langkah ini agar halaman publik terlihat lengkap dan profesional.
						</p>
					</div>
					<div class="rounded-lg bg-slate-50 px-4 py-3 text-right">
						<p class="text-2xl font-black text-slate-950">{{ onboardingProgress }}%</p>
						<p class="text-xs font-bold uppercase tracking-wide text-slate-500">
							{{ completedSteps }}/{{ onboardingSteps.length }} selesai
						</p>
					</div>
				</div>

				<div class="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
					<div
						class="h-full rounded-full bg-emerald-500 transition-all duration-500"
						:style="{ width: `${onboardingProgress}%` }"
					></div>
				</div>

				<div class="mt-6 divide-y divide-slate-100">
					<div
						v-for="step in onboardingSteps"
						:key="step.id"
						class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
					>
						<div class="flex gap-4">
							<div
								:class="[
									'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
									step.done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500',
								]"
							>
								<Icon :name="step.done ? 'ph:check-bold' : step.icon" size="20" />
							</div>
							<div>
								<p :class="['font-black', step.done ? 'text-slate-500 line-through' : 'text-slate-950']">
									{{ step.label }}
								</p>
								<p class="mt-1 text-sm leading-6 text-slate-500">{{ step.description }}</p>
							</div>
						</div>

						<button
							v-if="step.id === 'share'"
							@click="copyProfileLink"
							:disabled="!portfolio.profile.username"
							class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Icon name="ph:copy-bold" />
							{{ step.done ? "Copied" : step.actionLabel }}
						</button>
						<NuxtLink
							v-else
							:to="step.to"
							class="inline-flex shrink-0 items-center justify-center rounded-lg px-4 py-2 text-sm font-bold transition-colors"
							:class="step.done ? 'bg-slate-50 text-slate-500' : 'bg-slate-950 text-white hover:bg-emerald-600'"
						>
							{{ step.done ? "Selesai" : step.actionLabel }}
						</NuxtLink>
					</div>
				</div>
			</div>

			<aside class="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
				<div class="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
					<Icon name="ph:rocket-launch-bold" size="24" />
				</div>
				<h3 class="mt-5 text-xl font-black">Langkah berikutnya</h3>
				<p class="mt-2 text-sm leading-6 text-slate-300">
					{{ nextStep ? nextStep.description : "Portofoliomu sudah siap dibagikan ke dunia." }}
				</p>
				<NuxtLink
					v-if="nextStep?.to"
					:to="nextStep.to"
					class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-100"
				>
					{{ nextStep.actionLabel }}
					<Icon name="ph:arrow-right-bold" />
				</NuxtLink>
				<button
					v-else-if="nextStep?.id === 'share'"
					@click="copyProfileLink"
					class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-100"
				>
					{{ nextStep.actionLabel }}
					<Icon name="ph:copy-bold" />
				</button>
				<NuxtLink
					v-else
					:to="publicProfileUrl ? `/${portfolio.profile.username}` : '/dashboard/settings'"
					target="_blank"
					class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
				>
					Lihat Profil Publik
					<Icon name="ph:arrow-up-right-bold" />
				</NuxtLink>
			</aside>
		</section>

		<section
			v-if="isProfileIncomplete"
			class="rounded-lg border border-emerald-200 bg-emerald-50 p-6 shadow-sm"
		>
			<div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
				<div class="flex gap-4">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
						<Icon name="ph:warning-circle-bold" size="24" />
					</div>
					<div>
						<h3 class="text-lg font-black text-slate-950">Profil belum lengkap</h3>
						<p class="mt-1 max-w-2xl text-sm leading-6 text-slate-700">
							Lengkapi nama, username, dan project pertama supaya halaman publik terlihat siap dikirim.
						</p>
					</div>
				</div>
				<NuxtLink
					to="/dashboard/settings"
					class="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
				>
					Lengkapi Sekarang
				</NuxtLink>
			</div>
		</section>
	</div>
</template>
