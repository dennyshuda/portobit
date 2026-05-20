<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
});

const portfolio = usePortfolioStore();

const isProfileIncomplete = computed(() => {
	return !portfolio.profile.username || !portfolio.profile.full_name || portfolio.projects.length === 0;
});

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
		value: "Free",
		icon: "ph:shield-check-bold",
		helper: "Paket aktif saat ini",
	},
]);
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
