<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
});

const user = useSupabaseUser();

const portfolio = usePortfolioStore();

onMounted(() => {
	portfolio.fetchUserPortfolio();
});
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
			<p class="text-sm font-bold text-slate-400 uppercase">Total View</p>
			<h3 class="text-3xl font-black text-slate-900 mt-2">{{ portfolio.profile.views_count }}</h3>
		</div>

		<div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
			<p class="text-sm font-bold text-slate-400 uppercase">Projects</p>
			<h3 class="text-3xl font-black text-slate-900 mt-2">{{ portfolio.projects.length }}</h3>
		</div>

		<div class="p-6 bg-emerald-500 rounded-3xl shadow-lg shadow-emerald-200 text-white">
			<p class="text-sm font-bold opacity-80 uppercase">Status Akun</p>
			<h3 class="text-3xl font-black mt-2">Free tier</h3>
		</div>

		<div
			class="md:col-span-2 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
		>
			<div>
				<h3 class="text-xl font-bold">Profil kamu belum lengkap!</h3>
				<p class="text-slate-500 mt-1 text-sm">Lengkapi data diri dan project untuk mulai pamer.</p>
			</div>
			<NuxtLink
				to="/dashboard/settings"
				class="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm"
			>
				Lengkapi Sekarang
			</NuxtLink>
		</div>
	</div>
</template>
