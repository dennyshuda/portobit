<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
});

const portfolio = usePortfolioStore();

const isProfileIncomplete = computed(() => {
	return (
		!portfolio.profile.username || !portfolio.profile.full_name || portfolio.projects.length === 0
	);
});
</script>

<template>
	<div class="space-y-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div
				class="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between h-48"
			>
				<div>
					<div
						class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-2xl"
					>
						👀
					</div>
					<p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Total View</p>
				</div>
				<h3 class="text-5xl font-black text-slate-900">{{ portfolio.profile.views_count }}</h3>
			</div>

			<div
				class="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between h-48"
			>
				<div>
					<div
						class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-2xl"
					>
						📁
					</div>
					<p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Projects</p>
				</div>
				<h3 class="text-5xl font-black text-slate-900">{{ portfolio.projects.length }}</h3>
			</div>

			<div
				class="p-8 bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200 text-white flex flex-col justify-between h-48 relative overflow-hidden group"
			>
				<div class="relative z-10">
					<div
						class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-2xl"
					>
						⚡
					</div>
					<p class="text-sm font-bold opacity-60 uppercase tracking-wider">Status Akun</p>
				</div>
				<h3 class="text-5xl font-black relative z-10">Free</h3>

				<div
					class="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"
				></div>
			</div>
		</div>

		<div
			v-if="isProfileIncomplete"
			class="p-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] shadow-xl shadow-emerald-100 text-white relative overflow-hidden"
		>
			<div
				class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
			>
				<div>
					<h3 class="text-3xl font-black">Profil kamu belum lengkap! 😱</h3>
					<p class="text-emerald-100 mt-2 max-w-xl text-lg font-medium">
						Portofolio yang lengkap meningkatkan peluang dilirik klien hingga 80%. Yuk lengkapi data
						diri dan upload project pertamamu.
					</p>
				</div>
				<NuxtLink
					to="/dashboard/settings"
					class="px-8 py-4 bg-white text-emerald-600 font-black rounded-2xl shadow-lg hover:scale-105 transition-transform whitespace-nowrap"
				>
					Lengkapi Sekarang
				</NuxtLink>
			</div>

			<div
				class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
			></div>
		</div>
	</div>
</template>
