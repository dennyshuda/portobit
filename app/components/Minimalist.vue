<script setup>
defineProps(["data"]);
</script>

<template>
	<div
		class="min-h-screen bg-white text-gray-800 font-sans p-8 md:p-20 max-w-5xl mx-auto shadow-2xl my-8"
	>
		<header class="mb-20 text-center md:text-left">
			<h1 class="text-5xl font-light mb-4 tracking-tight">{{ data.name }}</h1>
			<p class="text-xl text-gray-400 tracking-widest uppercase text-sm">{{ data.role }}</p>
		</header>

		<section class="mb-24 max-w-2xl">
			<p class="text-2xl leading-relaxed font-light text-gray-600">{{ data.about }}</p>
		</section>

		<section class="grid md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
			<div v-for="(project, i) in data.projects" :key="i" class="group cursor-pointer">
				<div class="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
					<img
						:src="project.image"
						class="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
						alt="Project Thumbnail"
					/>
				</div>
				<h3 class="text-xl font-medium mb-2 group-hover:text-blue-600 transition">
					{{ project.title }}
				</h3>
				<p class="text-gray-400 font-light leading-relaxed">{{ project.description }}</p>
			</div>
		</section>

		<footer class="border-t border-gray-100 pt-10 flex gap-8 text-sm font-medium text-gray-400">
			<a :href="'mailto:' + data.email" class="hover:text-black transition">Email Me</a>
			<span class="text-gray-200">/</span>
			<a href="#" class="hover:text-black transition">LinkedIn</a>
			<span class="text-gray-200">/</span>
			<a href="#" class="hover:text-black transition">Instagram</a>
		</footer>
	</div>
</template>
