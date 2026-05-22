<script setup>
defineProps(["data"]);
</script>

<template>
	<div class="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
		<!-- Sidebar -->
		<aside
			class="w-full md:w-80 bg-slate-900 text-white p-10 md:fixed md:h-full flex flex-col justify-between shrink-0"
		>
			<div>
				<div
					class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6 flex items-center justify-center text-3xl font-bold shadow-lg"
				>
					{{ data.name.charAt(0) }}
				</div>
				<h1 class="text-2xl font-bold mb-2 tracking-tight">{{ data.name }}</h1>
				<p class="text-blue-400 font-medium mb-8 text-sm uppercase tracking-wider">
					{{ data.role }}
				</p>

				<div class="w-12 h-1 bg-blue-600 mb-8"></div>

				<div class="text-slate-400 text-sm leading-relaxed mb-8">
					{{ data.about }}
				</div>
			</div>

			<div class="pt-8 border-t border-slate-800">
				<a
					:href="'mailto:' + data.email"
					class="flex items-center gap-3 text-slate-300 hover:text-white transition group"
				>
					<span
						class="w-8 h-8 rounded bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition"
						>✉️</span
					>
					<span class="text-sm font-medium">Contact Me</span>
				</a>
			</div>
		</aside>

		<!-- Main Content -->
		<main class="flex-1 md:ml-80 p-8 md:p-20">
			<h2 class="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
				Selected Projects <span class="h-px flex-1 bg-slate-200"></span>
			</h2>
			<div class="grid gap-12">
				<div
					v-for="(project, i) in data.projects"
					:key="i"
					class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col md:flex-row gap-8 items-start"
				>
					<div class="w-full md:w-64 h-40 bg-slate-100 rounded-lg overflow-hidden shrink-0">
						<img :src="project.image" class="w-full h-full object-cover" alt="" />
					</div>
					<div>
						<h3 class="text-xl font-bold mb-3 text-slate-900">{{ project.title }}</h3>
						<p class="text-slate-600 mb-4 leading-relaxed">{{ project.description }}</p>
						<button
							class="text-blue-600 font-bold text-sm hover:text-blue-800 flex items-center gap-1"
						>
							View Case Study &rarr;
						</button>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
