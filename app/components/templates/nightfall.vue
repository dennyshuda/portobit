<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();

const isVisible = ref(false);

onMounted(() => {
	setTimeout(() => {
		isVisible.value = true;
	}, 100);
});
</script>

<template>
	<div
		class="min-h-screen bg-[#0a0a1a] text-white font-sans overflow-hidden selection:bg-violet-500 selection:text-white"
	>
		<!-- Animated gradient orbs -->
		<div class="fixed inset-0 pointer-events-none overflow-hidden">
			<div
				class="absolute -top-40 -left-40 h-[500px] w-[500px] animate-[drift_20s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 blur-[120px]"
			></div>
			<div
				class="absolute -bottom-40 -right-40 h-[500px] w-[500px] animate-[drift_25s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-r from-amber-600/10 to-rose-600/20 blur-[120px]"
			></div>
			<div
				class="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-[drift_30s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-sky-600/10 to-indigo-600/10 blur-[120px]"
			></div>
		</div>

		<div class="relative z-10">
			<!-- Hero Section -->
			<header class="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-48">
				<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div class="max-w-3xl">
						<div class="mb-6 flex items-center gap-3">
							<span class="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
							<span class="text-xs font-black uppercase tracking-[0.3em] text-slate-500"
								>Available for projects</span
							>
						</div>
						<h1 class="text-6xl font-black leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
							<span
								class="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent"
							>
								{{ profile.full_name || "Your Name" }}
							</span>
						</h1>
					</div>
					<div class="shrink-0">
						<div class="flex items-center gap-4 text-sm text-slate-400">
							<div class="h-px w-16 bg-slate-800"></div>
							<span class="font-bold uppercase tracking-[0.25em]">Pro</span>
						</div>
					</div>
				</div>

				<div class="mt-12 grid gap-10 md:grid-cols-[1fr_auto]">
					<div>
						<p class="max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
							{{
								profile.bio ||
								"A visionary creator crafting digital experiences that push boundaries and redefine possibilities."
							}}
						</p>
					</div>
					<div class="flex items-start gap-6">
						<a
							href="#"
							class="group inline-flex items-center gap-3 rounded-full border border-slate-800 px-6 py-3 text-sm font-bold text-white transition-all hover:border-violet-500 hover:bg-violet-500/10"
						>
							Follow
							<Icon name="ph:instagram-logo-bold" class="text-lg" />
						</a>
						<a
							href="#"
							class="group inline-flex items-center gap-3 rounded-full border border-slate-800 px-6 py-3 text-sm font-bold text-white transition-all hover:border-violet-500 hover:bg-violet-500/10"
						>
							Connect
							<Icon name="ph:linkedin-logo-bold" class="text-lg" />
						</a>
					</div>
				</div>

				<!-- Scroll indicator -->
				<div
					class="mt-24 flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-slate-600"
				>
					<span>Scroll to explore</span>
					<div class="h-px flex-1 bg-slate-800"></div>
					<Icon name="ph:arrow-down-bold" class="animate-bounce" />
				</div>
			</header>

			<!-- Projects Section -->
			<main class="mx-auto max-w-7xl px-6 pb-32">
				<div class="mb-16 flex items-center gap-6">
					<h2 class="text-sm font-black uppercase tracking-[0.35em] text-violet-400">
						Selected Creations
					</h2>
					<span class="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent"></span>
					<span class="text-xs font-black text-slate-600"
						>{{ String(projects.length).padStart(2, "0") }} Projects</span
					>
				</div>

				<div class="space-y-8">
					<div
						v-for="(project, index) in projects"
						:key="project.id || index"
						class="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-slate-900/50"
					>
						<!-- Glow effect on hover -->
						<div
							class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						>
							<div
								class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]"
							></div>
						</div>

						<div class="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10">
							<!-- Project number -->
							<div class="flex items-center gap-4 md:w-24">
								<span
									class="text-6xl font-black text-slate-800 transition-colors duration-500 group-hover:text-violet-500/30 md:text-7xl"
								>
									{{ String(index + 1).padStart(2, "0") }}
								</span>
							</div>

							<!-- Image -->
							<div class="aspect-video overflow-hidden rounded-xl bg-slate-800 md:w-72 shrink-0">
								<img
									v-if="project.image_url"
									:src="project.image_url"
									class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
									alt=""
								/>
							</div>

							<!-- Content -->
							<div class="flex-1">
								<div class="mb-3 flex items-center gap-3">
									<span
										class="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-violet-400"
									>
										Case Study
									</span>
									<span class="h-px flex-1 bg-slate-800"></span>
								</div>
								<h3 class="mb-3 text-2xl font-black md:text-3xl">
									{{ project.title || "Project Title" }}
								</h3>
								<p class="max-w-2xl text-sm leading-relaxed text-slate-400">
									{{
										project.description ||
										"A deep dive into the creative process, challenges, and solutions."
									}}
								</p>
							</div>

							<!-- CTA -->
							<a
								v-if="project.link_url"
								:href="project.link_url"
								target="_blank"
								class="group/btn inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-500 transition-all hover:border-violet-500 hover:bg-violet-500 hover:text-white"
							>
								<Icon name="ph:arrow-up-right-bold" class="text-lg" />
							</a>
						</div>
					</div>
				</div>
			</main>

			<!-- Footer -->
			<footer class="border-t border-slate-800/50 px-6 py-12">
				<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
					<p class="text-xs font-black uppercase tracking-[0.35em] text-slate-600">
						&copy; {{ new Date().getFullYear() }} Portobit — All rights reserved
					</p>
					<div class="flex gap-8 text-xs font-bold uppercase tracking-[0.25em] text-slate-600">
						<a href="#" class="transition-colors hover:text-violet-400">Instagram</a>
						<a href="#" class="transition-colors hover:text-violet-400">LinkedIn</a>
						<a href="#" class="transition-colors hover:text-violet-400">Twitter</a>
						<a href="#" class="transition-colors hover:text-violet-400">Dribbble</a>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<style scoped>
.font-sans {
	font-family:
		"Inter",
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
}

@keyframes drift {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	25% {
		transform: translate(50px, -30px) scale(1.1);
	}
	50% {
		transform: translate(-20px, 40px) scale(0.9);
	}
	75% {
		transform: translate(30px, 20px) scale(1.05);
	}
}
</style>
