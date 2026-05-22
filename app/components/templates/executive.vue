<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div class="min-h-screen bg-slate-950 text-white">
		<header class="mx-auto max-w-6xl px-6 py-20 md:py-28">
			<div class="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
				<div>
					<p class="mb-5 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
						Executive Portfolio
					</p>
					<h1 class="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
						{{ profile.full_name || "Your Name" }}
					</h1>
				</div>
				<p class="text-lg leading-8 text-slate-300">
					{{ profile.bio || "A focused professional portfolio for consultants, founders, and senior specialists." }}
				</p>
			</div>
			<PortfolioSocialLinks
				:profile="profile"
				link-class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-emerald-300/50 hover:text-emerald-300"
				class="mt-8"
			/>
		</header>

		<main class="mx-auto max-w-6xl px-6 pb-24">
			<div class="mb-8 flex items-center justify-between">
				<h2 class="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Selected work</h2>
				<span class="h-px flex-1 bg-white/10 ml-6"></span>
			</div>

			<section class="grid gap-5 md:grid-cols-2">
				<article
					v-for="(project, index) in projects"
					:key="project.id || index"
					class="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-emerald-300/50"
				>
					<div class="aspect-[16/10] bg-slate-900">
						<img
							v-if="project.image_url"
							:src="project.image_url"
							class="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
							alt=""
						/>
					</div>
					<div class="p-6">
						<p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
							Case {{ String(index + 1).padStart(2, "0") }}
						</p>
						<h3 class="mt-4 text-2xl font-black tracking-tight">{{ project.title || "Project Title" }}</h3>
						<p class="mt-3 text-sm leading-6 text-slate-400">
							{{ project.description || "Project description goes here." }}
						</p>
						<PortfolioProjectLink
							:url="project.link_url"
							hide-when-empty
							class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-emerald-300"
						>
							View project
							<Icon name="ph:arrow-up-right-bold" />
						</PortfolioProjectLink>
					</div>
				</article>
			</section>
		</main>
	</div>
</template>
