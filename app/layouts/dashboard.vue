<script setup lang="ts">
import { toast } from "vue-sonner";

const portfolio = usePortfolioStore();
const supabase = useSupabaseClient();
const isSidebarOpen = ref(false);

const menus = ref([
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Projects", to: "/dashboard/projects" },
	{ label: "Template", to: "/dashboard/template" },
	{ label: "Settings", to: "/dashboard/settings" },
]);

onMounted(() => {
	portfolio.fetchUserPortfolio();
});

const copyProfileLink = () => {
	const username = portfolio.profile.username?.toLowerCase();
	if (!username) {
		toast.warning("Atur username kamu dulu di profil!");
		return;
	}

	const fullUrl = `${window.location.origin}/${username}`;

	navigator.clipboard.writeText(fullUrl);
	toast.success("Link portofolio berhasil disalin ke clipboard!");
};

const handleLogout = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;

		portfolio.$reset();

		await navigateTo("/login");
	} catch (err) {
		console.error("Logout gagal:", err);
	}
};
</script>

<template>
	<div class="min-h-screen bg-slate-50">
		<aside
			:class="[
				'w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20 transition-transform duration-300',
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
				'md:translate-x-0',
			]"
		>
			<div class="p-6">
				<NuxtLink to="/" class="text-xl font-black tracking-tighter text-slate-900 uppercase">
					PORTO<span class="text-emerald-500">BIT</span>
				</NuxtLink>
			</div>

			<nav class="flex-1 px-4 space-y-2">
				<NuxtLink
					v-for="{ label, to } in menus"
					:to="to"
					class="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all"
				>
					{{ label }}
				</NuxtLink>
			</nav>

			<div class="p-4 border-t border-slate-100">
				<button
					@click="handleLogout"
					class="w-full flex items-center justify-center sm:justify-start gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
				>
					<Icon name="ph:sign-out-bold" />
					<span>Keluar</span>
				</button>
			</div>
		</aside>

		<!-- Mobile Sidebar Overlay -->
		<div
			v-if="isSidebarOpen"
			@click="isSidebarOpen = false"
			class="fixed inset-0 bg-black/30 z-10 md:hidden"
			aria-hidden="true"
		></div>

		<main class="md:ml-64 p-4 md:p-8">
			<header
				class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
			>
				<div class="flex items-center gap-2">
					<button
						@click="isSidebarOpen = !isSidebarOpen"
						class="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
						<span class="sr-only">Buka menu</span>
					</button>
					<div>
						<h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Dashboard</h2>
						<p class="text-xl font-bold text-slate-900">
							Hai, {{ portfolio.profile.full_name?.split(" ")[0] || "Pengguna" }}!
						</p>
					</div>
				</div>

				<div class="flex items-center gap-3 w-full sm:w-auto">
					<button
						@click="copyProfileLink"
						class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
					>
						<Icon name="ph:share-network-bold" />
						<span class="hidden sm:inline">Share Link</span>
					</button>
					<a
						:href="`/${portfolio.profile.username.toLowerCase()}`"
						target="_blank"
						class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/10"
					>
						<span>Lihat Profil</span>
						<Icon name="ph:arrow-up-right-bold" class="hidden sm:inline" />
					</a>
				</div>
			</header>

			<slot />
		</main>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply bg-emerald-50 text-emerald-600;
}
</style>
