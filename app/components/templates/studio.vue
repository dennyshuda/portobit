<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div class="min-h-screen bg-zinc-50 text-zinc-950">
		<header class="mx-auto max-w-6xl px-6 py-20">
			<div class="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
				<div>
					<div class="h-28 w-28 overflow-hidden rounded-full bg-zinc-200 ring-8 ring-white">
						<img v-if="profile.avatar_url" :src="profile.avatar_url" class="h-full w-full object-cover" alt="" />
					</div>
					<p class="mt-6 text-sm font-black uppercase tracking-[0.25em] text-rose-600">Studio Folio</p>
				</div>
				<div>
					<h1 class="text-5xl font-black leading-tight tracking-tight md:text-7xl">
						{{ profile.full_name || "Your Name" }}
					</h1>
					<p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
						{{ profile.bio || "A clean visual portfolio for creators, designers, and independent studios." }}
					</p>
				</div>
			</div>
		</header>

		<main class="mx-auto max-w-6xl px-6 pb-24">
			<section class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				<article
					v-for="(project, index) in projects"
					:key="project.id || index"
					class="group rounded-lg bg-white p-3 shadow-sm ring-1 ring-zinc-200"
				>
					<div class="aspect-[4/5] overflow-hidden rounded-md bg-zinc-100">
						<img
							v-if="project.image_url"
							:src="project.image_url"
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							alt=""
						/>
					</div>
					<div class="p-3">
						<p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
							{{ String(index + 1).padStart(2, "0") }}
						</p>
						<h2 class="mt-2 text-xl font-black">{{ project.title || "Project Title" }}</h2>
						<p class="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
							{{ project.description || "Project description goes here." }}
						</p>
					</div>
				</article>
			</section>
		</main>
	</div>
</template>
