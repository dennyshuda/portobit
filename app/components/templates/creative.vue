<script setup lang="ts">
const props = defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div
		class="min-h-screen bg-[#FFC700] text-black font-serif selection:bg-black selection:text-[#FFC700]"
	>
		<div class="container mx-auto px-6 py-20 max-w-6xl">
			<nav class="flex justify-between items-center mb-24 border-b-4 border-black pb-6">
				<div class="font-sans font-black text-2xl tracking-tighter">PORTFOLIO.</div>
				<PortfolioSocialLinks
					:profile="profile"
					mode="labels"
					link-class="font-sans text-xs font-black uppercase tracking-[0.2em] hover:underline decoration-4 underline-offset-4"
				/>
			</nav>

			<header class="mb-32">
				<h1 class="text-7xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
					HELLO, I'M <br />
					<span class="text-white text-stroke-black"> {{ profile.full_name }}</span
					>.
				</h1>
				<p
					class="text-2xl md:text-4xl font-bold font-sans max-w-3xl leading-tight border-l-8 border-black pl-8 py-2"
				>
					{{ profile.bio }}
				</p>
			</header>

			<section class="space-y-32">
				<div
					v-for="(project, index) in projects"
					:key="index"
					class="flex flex-col md:flex-row gap-12 items-center group"
				>
					<div class="w-full md:w-1/2 order-2 md:order-1">
						<div
							class="aspect-square bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-all duration-300 overflow-hidden"
						>
							<img
								v-if="project.image_url"
								:src="project.image_url"
								class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
								alt=""
							/>
						</div>
					</div>
					<div class="w-full md:w-1/2 order-1 md:order-2">
						<div class="text-8xl font-black text-white/40 mb-4 font-sans">{{ index + 1 }}</div>
						<h3 class="text-5xl font-bold mb-6 leading-tight group-hover:underline decoration-4">
							{{ project.title }}
						</h3>
						<p class="text-xl font-sans font-medium leading-relaxed">{{ project.description }}</p>
						<PortfolioProjectLink
							:url="project.link_url"
							hide-when-empty
							class="mt-8 inline-flex items-center gap-3 border-4 border-black bg-white px-5 py-3 font-sans text-xs font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
						>
							View Project
							<Icon name="ph:arrow-up-right-bold" />
						</PortfolioProjectLink>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<style scoped>
.text-stroke-black {
	-webkit-text-stroke: 3px black;
}
</style>
