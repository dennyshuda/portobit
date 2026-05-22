<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div class="min-h-screen bg-white text-slate-950">
		<div class="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[360px_minmax(0,1fr)]">
			<aside class="border-b border-slate-200 px-6 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
				<div class="flex items-center gap-4 lg:block">
					<div class="h-16 w-16 overflow-hidden rounded-lg bg-slate-100 lg:h-24 lg:w-24">
						<img v-if="profile.avatar_url" :src="profile.avatar_url" class="h-full w-full object-cover" alt="" />
					</div>
					<div class="min-w-0 lg:mt-6">
						<p class="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">Snapshot</p>
						<h1 class="mt-2 truncate text-2xl font-black lg:text-4xl">
							{{ profile.full_name || "Your Name" }}
						</h1>
					</div>
				</div>
				<p class="mt-6 max-w-sm text-sm leading-6 text-slate-600">
					{{ profile.bio || "A compact portfolio for quick scanning and fast decisions." }}
				</p>
				<PortfolioSocialLinks
					:profile="profile"
					link-class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-emerald-300 hover:text-emerald-600"
					class="mt-6"
				/>
			</aside>

			<main class="px-6 py-10">
				<div class="space-y-4">
					<PortfolioProjectLink
						v-for="(project, index) in projects"
						:key="project.id || index"
						:url="project.link_url"
						class="grid gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-emerald-300 hover:bg-slate-50 md:grid-cols-[160px_minmax(0,1fr)_auto]"
					>
						<div class="aspect-video overflow-hidden rounded-md bg-slate-100">
							<img v-if="project.image_url" :src="project.image_url" class="h-full w-full object-cover" alt="" />
						</div>
						<div class="min-w-0">
							<p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
								Project {{ String(index + 1).padStart(2, "0") }}
							</p>
							<h2 class="mt-2 text-xl font-black">{{ project.title || "Project Title" }}</h2>
							<p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
								{{ project.description || "Project description goes here." }}
							</p>
						</div>
						<Icon name="ph:arrow-up-right-bold" class="hidden text-slate-300 md:block" />
					</PortfolioProjectLink>
				</div>
			</main>
		</div>
	</div>
</template>
