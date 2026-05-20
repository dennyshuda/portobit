<script setup lang="ts">
import { toast } from "vue-sonner";

const portfolio = usePortfolioStore();
const supabase = useSupabaseClient();
const isSidebarOpen = ref(false);

const menus = [
	{ label: "Dashboard", to: "/dashboard", icon: "ph:squares-four-bold" },
	{ label: "Projects", to: "/dashboard/projects", icon: "ph:briefcase-bold" },
	{ label: "Template", to: "/dashboard/template", icon: "ph:layout-bold" },
	{ label: "Settings", to: "/dashboard/settings", icon: "ph:gear-six-bold" },
];

const firstName = computed(() => portfolio.profile.full_name?.split(" ")[0] || "Pengguna");
const profilePath = computed(() => {
	const username = portfolio.profile.username?.toLowerCase();
	return username ? `/${username}` : "/dashboard/settings";
});

onMounted(() => {
	portfolio.fetchUserPortfolio();
});

const copyProfileLink = async () => {
	const username = portfolio.profile.username?.toLowerCase();
	if (!username) {
		toast.warning("Atur username kamu dulu di profil.");
		return;
	}

	await navigator.clipboard.writeText(`${window.location.origin}/${username}`);
	toast.success("Link portofolio berhasil disalin.");
};

const handleLogout = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;

		portfolio.$reset();
		await navigateTo("/login");
	} catch (err) {
		console.error("Logout gagal:", err);
		toast.error("Logout gagal. Coba beberapa saat lagi.");
	}
};
</script>

<template>
	<div class="min-h-screen bg-slate-50 text-slate-950">
		<aside
			:class="[
				'fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200',
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
				'lg:translate-x-0',
			]"
		>
			<div class="flex h-16 items-center border-b border-slate-200 px-5">
				<NuxtLink to="/" class="flex items-center gap-3">
					<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
						<Icon name="ph:cursor-click-fill" class="text-xl" />
					</span>
					<span class="text-lg font-black uppercase tracking-tight text-slate-950">Portobit</span>
				</NuxtLink>
			</div>

			<nav class="flex-1 space-y-1 px-3 py-5">
				<NuxtLink
					v-for="menu in menus"
					:key="menu.to"
					:to="menu.to"
					@click="isSidebarOpen = false"
					class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
				>
					<Icon :name="menu.icon" class="text-lg" />
					<span>{{ menu.label }}</span>
				</NuxtLink>
			</nav>

			<div class="border-t border-slate-200 p-4">
				<div class="mb-4 rounded-lg bg-slate-50 p-3">
					<p class="truncate text-sm font-bold text-slate-900">
						{{ portfolio.profile.full_name || "Lengkapi profil" }}
					</p>
					<p class="truncate text-xs font-medium text-slate-500">
						@{{ portfolio.profile.username || "username" }}
					</p>
				</div>
				<button
					@click="handleLogout"
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
				>
					<Icon name="ph:sign-out-bold" />
					<span>Keluar</span>
				</button>
			</div>
		</aside>

		<div
			v-if="isSidebarOpen"
			@click="isSidebarOpen = false"
			class="fixed inset-0 z-20 bg-slate-950/30 lg:hidden"
			aria-hidden="true"
		></div>

		<div class="lg:pl-72">
			<header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
				<div class="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
					<div class="flex min-w-0 items-center gap-3">
						<button
							@click="isSidebarOpen = true"
							class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 lg:hidden"
							aria-label="Buka menu"
						>
							<Icon name="ph:list-bold" size="22" />
						</button>
						<div class="min-w-0">
							<p class="text-xs font-bold uppercase tracking-wider text-slate-500">Dashboard</p>
							<h1 class="truncate text-lg font-black text-slate-950">Hai, {{ firstName }}</h1>
						</div>
					</div>

					<div class="flex items-center gap-2">
						<button
							@click="copyProfileLink"
							class="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
						>
							<Icon name="ph:share-network-bold" />
							<span class="hidden sm:inline">Share</span>
						</button>
						<NuxtLink
							:to="profilePath"
							target="_blank"
							class="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
						>
							<span class="hidden sm:inline">Lihat Profil</span>
							<Icon name="ph:arrow-up-right-bold" />
						</NuxtLink>
					</div>
				</div>
			</header>

			<main class="px-4 py-6 sm:px-6 lg:px-8">
				<slot />
			</main>
		</div>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply bg-emerald-50 text-emerald-700;
}
</style>
