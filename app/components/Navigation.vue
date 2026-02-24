<script setup lang="ts">
const isOpen = ref(false);
const user = useSupabaseUser();
</script>

<template>
	<nav class="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
		<div class="max-w-7xl mx-auto">
			<div
				class="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-xl shadow-slate-100/50"
			>
				<NuxtLink to="/" class="flex items-center gap-2">
					<div
						class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200"
					>
						<Icon name="ph:cursor-click-fill" class="text-white text-2xl" />
					</div>
					<span class="text-xl font-black tracking-tighter text-slate-900 uppercase">Portobit</span>
				</NuxtLink>

				<div class="hidden md:flex items-center gap-8">
					<NuxtLink
						to="/template"
						class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
						>Templates</NuxtLink
					>
					<NuxtLink
						to="#pricing"
						class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
						>Harga</NuxtLink
					>
					<NuxtLink
						to="#showcase"
						class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
						>Showcase</NuxtLink
					>
				</div>

				<div class="hidden md:flex items-center gap-3">
					<div v-if="user" class="flex items-center gap-3">
						<NuxtLink
							to="/dashboard"
							class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all text-sm"
						>
							Dashboard
						</NuxtLink>
					</div>
					<div v-else class="flex items-center gap-2">
						<NuxtLink
							to="/login"
							class="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900"
							>Masuk</NuxtLink
						>
						<NuxtLink
							to="/register"
							class="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 text-sm"
						>
							Daftar Gratis
						</NuxtLink>
					</div>
				</div>

				<button
					@click="isOpen = !isOpen"
					class="md:hidden w-10 h-10 flex items-center justify-center text-slate-900"
				>
					<Icon :name="isOpen ? 'ph:x-bold' : 'ph:list-bold'" size="24" />
				</button>
			</div>

			<Transition name="slide">
				<div
					v-if="isOpen"
					class="md:hidden mt-4 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-2xl"
				>
					<div class="flex flex-col gap-4">
						<NuxtLink @click="isOpen = false" to="/template" class="font-bold text-slate-600"
							>Templates</NuxtLink
						>
						<NuxtLink @click="isOpen = false" to="#pricing" class="font-bold text-slate-600"
							>Harga</NuxtLink
						>
						<div class="h-px bg-slate-100 my-2"></div>
						<NuxtLink v-if="!user" to="/login" class="font-bold text-slate-600">Masuk</NuxtLink>
						<NuxtLink
							:to="user ? '/dashboard' : '/register'"
							class="w-full py-4 bg-emerald-500 text-white text-center rounded-2xl font-bold"
						>
							{{ user ? "Dashboard" : "Mulai Sekarang" }}
						</NuxtLink>
					</div>
				</div>
			</Transition>
		</div>
	</nav>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
