<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div
		class="min-h-screen bg-white font-sans text-slate-900 selection:bg-sky-600 selection:text-white"
	>
		<div class="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
			<!-- Profile header bento -->
			<div class="mb-16 grid gap-4 md:grid-cols-4 md:grid-rows-2">
				<!-- Avatar - spans 1 col, 2 rows -->
				<div class="relative overflow-hidden rounded-3xl bg-sky-50 md:col-span-1 md:row-span-2">
					<div class="flex h-full items-center justify-center p-6">
						<div
							class="h-32 w-32 overflow-hidden rounded-2xl bg-sky-100 ring-4 ring-white md:h-40 md:w-40"
						>
							<img
								v-if="profile.avatar_url"
								:src="profile.avatar_url"
								class="h-full w-full object-cover"
								alt=""
							/>
						</div>
					</div>
				</div>

				<!-- Name - spans 2 cols -->
				<div class="rounded-3xl bg-slate-50 p-6 md:col-span-2">
					<p class="mb-2 text-xs font-black uppercase tracking-[0.3em] text-sky-600">Portfolio</p>
					<h1 class="text-3xl font-black tracking-tight md:text-5xl">
						{{ profile.full_name || "Your Name" }}
					</h1>
				</div>

				<!-- Social - spans 1 col -->
				<div class="flex items-center gap-3 rounded-3xl bg-slate-50 p-6">
					<div class="flex -space-x-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-black text-sky-600 ring-2 ring-white"
						>
							IG
						</div>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-black text-sky-600 ring-2 ring-white"
						>
							LI
						</div>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-black text-sky-600 ring-2 ring-white"
						>
							GH
						</div>
					</div>
				</div>

				<!-- Bio - spans 3 cols -->
				<div class="rounded-3xl bg-gradient-to-br from-sky-500 to-sky-600 p-6 md:col-span-3">
					<p class="text-lg font-medium leading-relaxed text-white md:text-xl">
						{{
							profile.bio || "Building beautiful things at the intersection of design & technology."
						}}
					</p>
				</div>
			</div>

			<!-- Section title -->
			<div class="mb-8 flex items-center gap-4">
				<h2 class="text-xs font-black uppercase tracking-[0.35em] text-slate-400">Projects</h2>
				<span class="h-px flex-1 bg-slate-100"></span>
				<span class="text-xs font-black text-slate-300">{{ projects.length }} items</span>
			</div>

			<!-- Projects bento grid -->
			<div class="grid gap-4 md:grid-cols-3">
				<template v-for="(project, index) in projects" :key="project.id || index">
					<!-- Every 1st project: spans 2 cols -->
					<div
						v-if="index === 0"
						class="group relative overflow-hidden rounded-3xl bg-slate-50 p-6 transition-all hover:bg-sky-50 md:col-span-2"
					>
						<div class="flex flex-col gap-6 md:flex-row">
							<div class="aspect-video overflow-hidden rounded-2xl bg-slate-200 md:w-1/2">
								<img
									v-if="project.image_url"
									:src="project.image_url"
									class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
									alt=""
								/>
							</div>
							<div class="md:w-1/2 md:self-center">
								<p class="mb-2 text-xs font-black uppercase tracking-[0.25em] text-sky-600">
									Featured
								</p>
								<h3 class="mb-3 text-2xl font-black md:text-3xl">
									{{ project.title || "Project Title" }}
								</h3>
								<p class="mb-4 text-sm leading-relaxed text-slate-500">
									{{ project.description || "Description" }}
								</p>
								<a
									v-if="project.link_url"
									:href="project.link_url"
									target="_blank"
									class="inline-flex items-center gap-2 text-sm font-bold text-sky-600"
								>
									View <Icon name="ph:arrow-up-right-bold" />
								</a>
							</div>
						</div>
					</div>

					<!-- Every 2nd project: regular card -->
					<div
						v-else-if="index === 1"
						class="group relative overflow-hidden rounded-3xl bg-slate-50 p-6 transition-all hover:bg-sky-50"
					>
						<div class="mb-4 aspect-square overflow-hidden rounded-2xl bg-slate-200">
							<img
								v-if="project.image_url"
								:src="project.image_url"
								class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
								alt=""
							/>
						</div>
						<p class="mb-1 text-xs font-black uppercase tracking-[0.25em] text-sky-600">
							0{{ index + 1 }}
						</p>
						<h3 class="mb-2 text-xl font-black">{{ project.title || "Project Title" }}</h3>
						<p class="text-sm text-slate-500">{{ project.description || "Description" }}</p>
					</div>

					<!-- Every 3rd+: spans 2 cols -->
					<div
						v-else
						class="group relative overflow-hidden rounded-3xl bg-slate-50 p-6 transition-all hover:bg-sky-50 md:col-span-2"
					>
						<div class="flex flex-col gap-6 md:flex-row">
							<div class="md:w-1/2 md:self-center md:order-2">
								<p class="mb-2 text-xs font-black uppercase tracking-[0.25em] text-sky-600">
									0{{ index + 1 }}
								</p>
								<h3 class="mb-3 text-xl font-black md:text-2xl">
									{{ project.title || "Project Title" }}
								</h3>
								<p class="mb-4 text-sm leading-relaxed text-slate-500">
									{{ project.description || "Description" }}
								</p>
								<a
									v-if="project.link_url"
									:href="project.link_url"
									target="_blank"
									class="inline-flex items-center gap-2 text-sm font-bold text-sky-600"
								>
									View <Icon name="ph:arrow-up-right-bold" />
								</a>
							</div>
							<div
								class="aspect-video overflow-hidden rounded-2xl bg-slate-200 md:w-1/2 md:order-1"
							>
								<img
									v-if="project.image_url"
									:src="project.image_url"
									class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
									alt=""
								/>
							</div>
						</div>
					</div>
				</template>
			</div>

			<!-- Footer -->
			<footer class="mt-20 border-t border-slate-100 pt-8 text-center">
				<p class="text-xs font-bold uppercase tracking-[0.35em] text-slate-300">
					&copy; {{ new Date().getFullYear() }} Portobit
				</p>
			</footer>
		</div>
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
