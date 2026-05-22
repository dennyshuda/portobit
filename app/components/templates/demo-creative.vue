<script setup>
defineProps(["data"]);
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 text-gray-800 font-sans p-8 md:p-16"
	>
		<header class="max-w-5xl mx-auto mb-20">
			<div
				class="inline-block px-4 py-2 bg-white rounded-full shadow-sm text-sm font-bold text-purple-600 mb-6"
			>
				✨ Creative Portfolio
			</div>
			<h1 class="text-6xl md:text-8xl font-black tracking-tight leading-none text-gray-900">
				{{ data.name }}
			</h1>
			<p class="text-xl md:text-2xl text-gray-500 font-medium mt-4">{{ data.role }}</p>
		</header>

		<section class="max-w-5xl mx-auto mb-24">
			<p
				class="text-2xl md:text-3xl font-light leading-relaxed text-gray-600 italic border-l-4 border-purple-400 pl-6"
			>
				{{ data.about }}
			</p>
		</section>

		<section class="max-w-5xl mx-auto">
			<h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-10">
				Selected Works
			</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div v-for="(project, i) in data.projects" :key="i" class="group cursor-pointer">
					<div
						class="aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/60 mb-5 p-4"
					>
						<div class="w-full h-full rounded-2xl bg-gray-100 overflow-hidden">
							<img
								:src="project.image"
								class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
								alt="Project Thumbnail"
							/>
						</div>
					</div>
					<h3 class="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition">
						{{ project.title }}
					</h3>
					<p class="text-gray-500 mt-2 leading-relaxed">{{ project.description }}</p>
				</div>
			</div>
		</section>

		<footer
			class="max-w-5xl mx-auto mt-24 pt-10 border-t border-gray-200 flex gap-8 text-sm font-bold text-gray-400"
		>
			<a :href="'mailto:' + data.email" class="hover:text-purple-600 transition">Email Me</a>
			<span class="text-gray-200">/</span>
			<a href="#" class="hover:text-purple-600 transition">LinkedIn</a>
			<span class="text-gray-200">/</span>
			<a href="#" class="hover:text-purple-600 transition">Instagram</a>
		</footer>
	</div>
</template>
