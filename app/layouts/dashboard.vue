<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});

const portfolio = usePortfolioStore();
const supabase = useSupabaseClient();
const isSidebarOpen = ref(false);

const menus = ref([
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Projects", to: "/dashboard/projects" },
	{ label: "Template", to: "/dashboard/template" },
	{ label: "Settings", to: "/dashboard/settings" },
]);

const copyProfileLink = () => {
	const username = portfolio.profile.username.toLowerCase();
	if (!username) return alert("Atur username kamu dulu di profil!");

	const fullUrl = `${window.location.origin}/${username}`;

	navigator.clipboard.writeText(fullUrl);
	alert("Link portofolio berhasil disalin ke clipboard!");
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
					class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
				>
					<span>🚪</span> Keluar
				</button>
			</div>
		</aside>

		<div
			v-if="isSidebarOpen"
			@click="isSidebarOpen = false"
			class="fixed inset-0 bg-black/30 z-10 md:hidden"
			aria-hidden="true"
		></div>

		<main class="md:ml-64 p-8">
			<header class="flex justify-between items-center mb-8">
				<div class="flex items-center gap-2">
					<button
						@click="isSidebarOpen = !isSidebarOpen"
						class="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
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
						<h2 class="text-sm font-medium text-slate-400 uppercase tracking-widest">Dashboard</h2>
						<p class="text-xl font-bold text-slate-900 italic">Selamat datang kembali!</p>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<button
						@click="copyProfileLink"
						class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
					>
						<Icon name="ph:share-network-bold" />
						Share Portfolio
					</button>
					<a
						:href="`/${portfolio.profile.username.toLowerCase()}`"
						target="_blank"
						class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50"
					>
						Lihat Portofolio ↗
					</a>
				</div>
			</header>

			<slot />
		</main>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply bg-emerald-50 text-emerald-600 border-emerald-100;
}
</style>
