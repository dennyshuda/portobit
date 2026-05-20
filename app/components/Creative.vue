<script setup lang="ts">
defineProps<{
	data: {
		name: string;
		role: string;
		about: string;
		email: string;
		projects: Array<{
			title: string;
			description: string;
			image: string;
		}>;
	};
}>();
</script>

<template>
	<div class="min-h-screen bg-amber-300 font-serif text-slate-950">
		<div class="mx-auto max-w-6xl px-6 py-20">
			<nav class="mb-20 flex items-center justify-between border-b-4 border-slate-950 pb-6">
				<p class="font-sans text-2xl font-black tracking-tight">PORTFOLIO.</p>
				<a :href="`mailto:${data.email}`" class="font-sans text-sm font-black uppercase tracking-wide underline decoration-4 underline-offset-4">
					Hire Me
				</a>
			</nav>

			<header class="mb-24">
				<p class="mb-4 font-sans text-sm font-black uppercase tracking-widest">{{ data.role }}</p>
				<h1 class="max-w-4xl text-6xl font-black leading-none tracking-tight md:text-8xl">
					{{ data.name }}
				</h1>
				<p class="mt-8 max-w-3xl border-l-8 border-slate-950 py-2 pl-6 font-sans text-2xl font-bold leading-tight">
					{{ data.about }}
				</p>
			</header>

			<section class="space-y-20">
				<article
					v-for="(project, index) in data.projects"
					:key="project.title"
					class="grid items-center gap-10 md:grid-cols-2"
				>
					<div class="aspect-square overflow-hidden border-4 border-slate-950 bg-white shadow-[12px_12px_0_0_rgba(2,6,23,1)]">
						<img :src="project.image" class="h-full w-full object-cover grayscale transition hover:grayscale-0" alt="" />
					</div>
					<div>
						<p class="font-sans text-7xl font-black text-white/60">{{ index + 1 }}</p>
						<h2 class="mt-4 text-4xl font-black leading-tight">{{ project.title }}</h2>
						<p class="mt-5 font-sans text-lg font-medium leading-8">{{ project.description }}</p>
					</div>
				</article>
			</section>
		</div>
	</div>
</template>
