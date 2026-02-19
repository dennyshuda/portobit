<script setup lang="ts">
const props = defineProps<{
	profile: any;
	projects: any[];
}>();

// Mendapatkan tanggal hari ini untuk estetika log terminal
const today = new Date().toLocaleDateString("en-US", {
	weekday: "short",
	year: "numeric",
	month: "short",
	day: "numeric",
});
</script>

<template>
	<div
		class="bg-[#0a0a0a] min-h-screen font-mono text-emerald-500 p-6 md:p-12 selection:bg-emerald-500 selection:text-black"
	>
		<div class="max-w-4xl mx-auto">
			<div class="mb-12 border-b border-emerald-900/50 pb-4 opacity-70 text-[10px] md:text-xs">
				<p>LAST_LOGIN: {{ today }} ON TTYS001</p>
				<p>PORT_O_BIT v1.0.4 CORE_ACTIVE</p>
			</div>

			<header class="mb-16">
				<div class="flex items-center gap-2 mb-4">
					<span class="text-white">visitor@portobit:~$</span>
					<span class="animate-pulse">whoami</span>
				</div>

				<div class="pl-4 md:pl-8 border-l-2 border-emerald-900">
					<h1 class="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
						> {{ profile.full_name }}
					</h1>
					<p class="text-emerald-400/80 leading-relaxed max-w-2xl">
						{{ profile.bio || "System Architect & Digital Nomad." }}
					</p>
				</div>
			</header>

			<section>
				<div class="flex items-center gap-2 mb-8">
					<span class="text-white">visitor@portobit:~$</span>
					<span>ls --projects</span>
				</div>

				<div class="grid grid-cols-1 gap-6">
					<div
						v-for="(project, index) in projects"
						:key="index"
						class="group relative border border-emerald-900/50 p-6 hover:bg-emerald-500/[0.03] transition-all duration-300"
					>
						<div
							class="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
						></div>
						<div
							class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
						></div>

						<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
							<h3 class="text-xl font-bold text-white group-hover:text-emerald-400">
								<span class="text-emerald-900 mr-2">0{{ index + 1 }}</span>
								{{ project.title }}
							</h3>
							<span
								class="text-[10px] bg-emerald-900/30 px-2 py-1 text-emerald-300 border border-emerald-800"
							>
								STATUS: DEPLOYED
							</span>
						</div>

						<p class="text-sm text-emerald-700 mb-6 leading-relaxed">
							{{ project.description }}
						</p>

						<a
							:href="project.link"
							target="_blank"
							class="inline-flex items-center gap-2 text-xs font-bold hover:text-white transition-colors"
						>
							<span class="text-emerald-900">[</span>
							EXECUTE_VIEW
							<span class="text-emerald-900">]</span>
						</a>
					</div>
				</div>
			</section>

			<footer class="mt-20 flex items-center gap-2 text-white/50">
				<span>visitor@portobit:~$</span>
				<div class="w-2.5 h-5 bg-emerald-500 animate-[pulse_1s_infinite]"></div>
			</footer>
		</div>
	</div>
</template>

<style scoped>
/* Menambahkan efek scanline tipis untuk kesan retro */

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>
