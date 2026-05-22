<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div class="min-h-screen bg-neutral-950 text-neutral-50">
		<header class="mx-auto max-w-7xl px-6 py-20 md:py-28">
			<p class="text-xs font-black uppercase tracking-[0.45em] text-neutral-500">Monochrome Pro</p>
			<div class="mt-8 grid gap-10 border-y border-neutral-800 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
				<h1 class="text-6xl font-black leading-none tracking-tighter md:text-8xl">
					{{ profile.full_name || "Your Name" }}
				</h1>
				<p class="text-xl leading-9 text-neutral-300">
					{{ profile.bio || "A high-contrast premium portfolio for bold professional presentation." }}
				</p>
			</div>
			<PortfolioSocialLinks
				:profile="profile"
				mode="labels"
				link-class="text-xs font-black uppercase tracking-[0.25em] text-neutral-500 transition-colors hover:text-white"
				class="mt-8"
			/>
		</header>

		<main class="mx-auto max-w-7xl px-6 pb-28">
			<section class="divide-y divide-neutral-800">
				<article
					v-for="(project, index) in projects"
					:key="project.id || index"
					class="grid gap-8 py-10 lg:grid-cols-[160px_minmax(0,1fr)_360px] lg:items-center"
				>
					<p class="text-5xl font-black text-neutral-800">{{ String(index + 1).padStart(2, "0") }}</p>
					<div>
						<h2 class="text-3xl font-black md:text-5xl">{{ project.title || "Project Title" }}</h2>
						<p class="mt-4 max-w-2xl text-sm leading-7 text-neutral-400">
							{{ project.description || "Project description goes here." }}
						</p>
						<PortfolioProjectLink
							:url="project.link_url"
							hide-when-empty
							class="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-white"
						>
							Open
							<Icon name="ph:arrow-up-right-bold" />
						</PortfolioProjectLink>
					</div>
					<div class="aspect-video overflow-hidden rounded-lg bg-neutral-900">
						<img
							v-if="project.image_url"
							:src="project.image_url"
							class="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
							alt=""
						/>
					</div>
				</article>
			</section>
		</main>
	</div>
</template>
