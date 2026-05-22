<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 font-sans text-slate-900 selection:bg-purple-600 selection:text-white"
	>
		<!-- Hero -->
		<header class="relative overflow-hidden px-6 pt-20 pb-32 md:pt-28 md:pb-40">
			<div
				class="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 pointer-events-none"
			></div>
			<div class="mx-auto max-w-6xl relative">
				<div
					class="inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white mb-8"
				>
					Portfolio
				</div>
				<h1 class="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
					{{ profile.full_name || "Your Name" }}
				</h1>
				<p class="max-w-2xl text-xl md:text-2xl font-light leading-relaxed text-slate-600">
					{{ profile.bio || "Designing experiences that blend creativity with purpose." }}
				</p>
				<div class="mt-10 flex gap-4">
					<span
						class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20"
					>
						<Icon name="ph:sparkle-fill" />
						Available for work
					</span>
				</div>
				<PortfolioSocialLinks
					:profile="profile"
					link-class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-lg shadow-purple-100 transition-colors hover:text-purple-600"
					class="mt-6"
				/>
			</div>
		</header>

		<!-- Projects -->
		<main class="mx-auto max-w-6xl px-6 pb-32">
			<!-- Section title -->
			<div class="mb-16 flex items-center gap-6">
				<h2 class="text-sm font-black uppercase tracking-[0.35em] text-purple-600">
					Featured Work
				</h2>
				<span class="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent"></span>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="(project, index) in projects"
					:key="project.id || index"
					class="group relative rounded-2xl bg-white/70 p-6 shadow-lg shadow-purple-100/50 ring-1 ring-purple-100 backdrop-blur-xl transition-all duration-500 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1"
				>
					<!-- Project number badge -->
					<div class="mb-5 flex items-center justify-between">
						<span class="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
							Project {{ String(index + 1).padStart(2, "0") }}
						</span>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-xs font-black text-purple-600"
						>
							{{ index + 1 }}
						</div>
					</div>

					<!-- Image -->
					<div
						class="mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-pink-100"
					>
						<img
							v-if="project.image_url"
							:src="project.image_url"
							class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
							alt=""
						/>
					</div>

					<!-- Content -->
					<h3 class="text-2xl font-black text-slate-900 mb-2">
						{{ project.title || "Project Title" }}
					</h3>
					<p class="text-sm leading-relaxed text-slate-500">
						{{ project.description || "Project description goes here." }}
					</p>

					<!-- Link -->
					<PortfolioProjectLink
						:url="project.link_url"
						hide-when-empty
						class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition-colors hover:text-pink-600"
					>
						View Project
						<Icon
							name="ph:arrow-up-right-bold"
							class="transition-transform group-hover:translate-x-1"
						/>
					</PortfolioProjectLink>
				</div>
			</div>
		</main>

		<!-- Footer -->
		<footer class="border-t border-purple-100 bg-white/50 px-6 py-12 backdrop-blur-xl">
			<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
				<p class="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
					&copy; {{ new Date().getFullYear() }} Portobit
				</p>
				<PortfolioSocialLinks
					:profile="profile"
					mode="labels"
					link-class="text-sm font-bold text-slate-400 transition-colors hover:text-purple-600"
				/>
			</div>
		</footer>
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
</style>
