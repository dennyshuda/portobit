<script setup>
import { ref } from "vue";
import Minimalist from "~/components/templates/demo-minimalist.vue";
import Creative from "~/components/templates/demo-creative.vue";
import Professional from "~/components/templates/demo-professional.vue";

definePageMeta({
	layout: "default",
});

const templates = {
	Minimalist,
	Creative,
	Professional,
};

const currentTemplate = ref("Minimalist");

const portfolioData = ref({
	name: "Alex Morgan",
	role: "Product Designer",
	about:
		"Saya menciptakan pengalaman digital yang intuitif dan menarik. Berfokus pada UI/UX dengan sentuhan modern.",
	email: "alex@example.com",
	projects: [
		{
			title: "E-Commerce Redesign",
			description:
				"Meningkatkan konversi penjualan sebesar 40% melalui desain antarmuka yang lebih bersih dan user-friendly.",
			image: "https://placehold.co/600x400/e2e8f0/475569?text=Project+1",
		},
		{
			title: "Finance Dashboard",
			description:
				"Visualisasi data kompleks menjadi insight yang mudah dipahami oleh pengguna awam.",
			image: "https://placehold.co/600x400/e2e8f0/475569?text=Project+2",
		},
		{
			title: "Travel App",
			description: "Aplikasi pemesanan tiket perjalanan dengan fitur sosial media terintegrasi.",
			image: "https://placehold.co/600x400/e2e8f0/475569?text=Project+3",
		},
	],
});
</script>

<template>
	<div class="flex h-screen overflow-hidden bg-gray-100 font-sans">
		<!-- Sidebar Controls -->
		<aside class="w-80 bg-white border-r flex flex-col z-20 shadow-xl shrink-0">
			<div class="p-6 border-b">
				<NuxtLink
					to="/"
					class="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-4 text-sm font-medium transition"
				>
					&larr; Kembali ke Beranda
				</NuxtLink>
				<h1 class="text-2xl font-bold text-gray-900">Demo Templates</h1>
				<p class="text-gray-500 text-sm mt-1">Pilih template untuk melihat preview.</p>
			</div>

			<div class="p-6 flex-1 overflow-y-auto custom-scrollbar">
				<div class="space-y-8">
					<!-- Template Selector -->
					<div>
						<h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
							Pilih Gaya
						</h3>
						<div class="space-y-2">
							<button
								v-for="(_, name) in templates"
								:key="name"
								@click="currentTemplate = name"
								class="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group border"
								:class="
									currentTemplate === name
										? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30'
										: 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
								"
							>
								<span class="font-medium">{{ name }}</span>
								<span v-if="currentTemplate === name" class="text-blue-200 text-xs">Aktif</span>
							</button>
						</div>
					</div>

					<!-- Live Editor -->
					<div class="pt-6 border-t">
						<h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
							Coba Edit Data
						</h3>
						<div class="space-y-4">
							<div>
								<label class="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
								<input
									v-model="portfolioData.name"
									type="text"
									class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
								/>
							</div>
							<div>
								<label class="block text-xs font-medium text-gray-700 mb-1">Role / Jabatan</label>
								<input
									v-model="portfolioData.role"
									type="text"
									class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
								/>
							</div>
							<div>
								<label class="block text-xs font-medium text-gray-700 mb-1">Tentang Saya</label>
								<textarea
									v-model="portfolioData.about"
									rows="4"
									class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="p-6 border-t bg-gray-50">
				<NuxtLink
					to="/editor"
					class="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold rounded-xl shadow-lg shadow-blue-600/20 transition transform hover:-translate-y-0.5"
				>
					Gunakan Template Ini
				</NuxtLink>
			</div>
		</aside>

		<!-- Preview Area -->
		<main class="flex-1 relative overflow-hidden bg-gray-200/50">
			<div class="absolute inset-0 overflow-y-auto">
				<div class="min-h-full">
					<!-- Dynamic Component Rendering -->
					<component :is="templates[currentTemplate]" :data="portfolioData" />
				</div>
			</div>
		</main>
	</div>
</template>
