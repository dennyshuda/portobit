<script setup lang="ts">
const isOpen = ref(false);
const user = useSupabaseUser();

const navLinks = [
	{ label: "Templates", to: "/template" },
	{ label: "Harga", to: "/#pricing" },
	{ label: "Showcase", to: "/#showcase" },
];

const ctaLink = computed(() => (user.value ? "/dashboard" : "/login"));
const ctaLabel = computed(() => (user.value ? "Dashboard" : "Mulai Gratis"));
</script>

<template>
	<nav class="fixed inset-x-0 top-0 z-[100] border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<NuxtLink to="/" class="flex items-center gap-3" aria-label="Portobit homepage">
				<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm">
					<Icon name="ph:cursor-click-fill" class="text-xl" />
				</span>
				<span class="text-lg font-black uppercase tracking-tight text-slate-950">Portobit</span>
			</NuxtLink>

			<div class="hidden items-center gap-7 md:flex">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
				>
					{{ link.label }}
				</NuxtLink>
			</div>

			<div class="hidden items-center gap-3 md:flex">
				<NuxtLink
					v-if="!user"
					to="/login"
					class="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:text-slate-950"
				>
					Masuk
				</NuxtLink>
				<NuxtLink
					:to="ctaLink"
					class="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-600"
				>
					{{ ctaLabel }}
					<Icon name="ph:arrow-right-bold" class="text-base" />
				</NuxtLink>
			</div>

			<button
				@click="isOpen = !isOpen"
				class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 md:hidden"
				:aria-expanded="isOpen"
				aria-label="Toggle navigation"
			>
				<Icon :name="isOpen ? 'ph:x-bold' : 'ph:list-bold'" size="22" />
			</button>
		</div>

		<Transition name="slide">
			<div v-if="isOpen" class="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
				<div class="mx-auto flex max-w-7xl flex-col gap-2">
					<NuxtLink
						v-for="link in navLinks"
						:key="link.to"
						@click="isOpen = false"
						:to="link.to"
						class="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
					>
						{{ link.label }}
					</NuxtLink>
					<div class="my-2 h-px bg-slate-100"></div>
					<NuxtLink
						@click="isOpen = false"
						:to="ctaLink"
						class="rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white"
					>
						{{ ctaLabel }}
					</NuxtLink>
				</div>
			</div>
		</Transition>
	</nav>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-8px);
}
</style>
