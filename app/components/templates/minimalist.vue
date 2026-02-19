<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div
		class="bg-[#FCFCFA] min-h-screen font-serif text-[#1a1a1a] selection:bg-black selection:text-white"
	>
		<header class="max-w-5xl mx-auto pt-32 pb-24 px-8">
			<div class="border-b border-black pb-12">
				<h1 class="text-6xl md:text-[120px] font-light leading-[0.8] tracking-tighter mb-12">
					{{ profile.full_name }}
				</h1>
				<div class="flex flex-col md:flex-row justify-between items-start gap-8">
					<p class="text-xl md:text-2xl max-w-xl italic leading-relaxed">
						"{{
							profile.bio || "Curating digital experiences through simple, intentional design."
						}}"
					</p>
					<div class="text-sm font-sans uppercase tracking-[0.3em] font-bold">
						Available for Freelance <br />
						<span class="text-slate-400">Based in Jakarta</span>
					</div>
				</div>
			</div>
		</header>

		<main class="max-w-5xl mx-auto px-8 pb-32">
			<h2 class="text-xs font-sans uppercase tracking-[0.5em] mb-16 text-slate-400">
				Selected Works
			</h2>

			<div class="space-y-32">
				<div v-for="(project, index) in projects" :key="index" class="group relative">
					<div
						class="flex flex-col md:flex-row items-end gap-12 group-hover:opacity-80 transition-opacity duration-500"
					>
						<span class="text-sm font-sans font-light italic text-slate-300">
							0{{ index + 1 }} /
						</span>

						<div class="flex-1 border-b border-slate-200 pb-12">
							<div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
								<div>
									<h3 class="text-4xl md:text-6xl font-light mb-4">{{ project.title }}</h3>
									<p class="font-sans text-sm text-slate-500 tracking-wide uppercase">
										{{ project.description }}
									</p>
								</div>

								<a
									:href="project.link"
									target="_blank"
									class="group/link inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-black"
								>
									View Case
									<div
										class="w-8 h-px bg-black group-hover/link:w-16 transition-all duration-500"
									></div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<footer
			class="max-w-5xl mx-auto px-8 py-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8"
		>
			<div class="font-sans text-[10px] uppercase tracking-[0.4em] font-bold">
				©{{ new Date().getFullYear() }} Portobit
			</div>
			<div class="flex gap-8 font-sans text-[10px] uppercase tracking-[0.4em] font-bold">
				<a href="#" class="hover:text-slate-400">Instagram</a>
				<a href="#" class="hover:text-slate-400">LinkedIn</a>
				<a href="#" class="hover:text-slate-400">Twitter</a>
			</div>
		</footer>
	</div>
</template>

<style scoped>
/* Gunakan font serif sistem yang elegan jika tidak ada Playfair Display */
.font-serif {
	font-family: "Playfair Display", Georgia, serif;
}
.font-sans {
	font-family:
		"Inter",
		-apple-system,
		sans-serif;
}
</style>
