<script setup lang="ts">
const templates = [
	{
		id: "modern",
		name: "The Modernist",
		category: "Minimalist",
		image:
			"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Popular",
	},
	{
		id: "terminal",
		name: "Hacker Terminal",
		category: "Developer",
		image:
			"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "Premium",
	},
	{
		id: "minimalist",
		name: "Pure Minimalist",
		category: "Creative",
		image:
			"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Clean",
	},
	{
		id: "creative",
		name: "Creative Vibe",
		category: "Artist",
		image:
			"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "New",
	},
];

const selectedCategory = ref("All");
const categories = ["All", "Minimalist", "Developer", "Creative", "Artist"];

const filteredTemplates = computed(() => {
	if (selectedCategory.value === "All") return templates;
	return templates.filter((t) => t.category === selectedCategory.value);
});
</script>

<template>
	<div class="min-h-screen bg-white pt-32 pb-20">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
					Pilih desain <span class="text-emerald-500">karaktermu.</span>
				</h1>
				<p class="text-slate-500 max-w-2xl mx-auto text-lg">
					Mulai dengan template yang dirancang profesional. Sesuaikan warna, font, dan konten hanya
					dengan beberapa klik.
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-3 mb-12">
				<button
					v-for="cat in categories"
					:key="cat"
					@click="selectedCategory = cat"
					:class="[
						'px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2',
						selectedCategory === cat
							? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200'
							: 'bg-white border-slate-100 text-slate-400 hover:border-slate-200',
					]"
				>
					{{ cat }}
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				<div v-for="temp in filteredTemplates" :key="temp.id" class="group cursor-pointer">
					<div
						class="relative aspect-[4/3] mb-6 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-emerald-100 group-hover:-translate-y-2"
					>
						<img
							:src="temp.image"
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							alt="Template Preview"
						/>

						<div class="absolute top-6 left-6 flex gap-2">
							<span
								class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
							>
								{{ temp.tag }}
							</span>
							<span
								v-if="temp.isPro"
								class="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200"
							>
								PRO
							</span>
						</div>

						<div
							class="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
						>
							<NuxtLink
								:to="`/template/${temp.id}`"
								class="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
							>
								Live Preview
							</NuxtLink>
						</div>
					</div>

					<div class="px-2">
						<div class="flex items-center justify-between mb-1">
							<h3 class="text-xl font-black text-slate-900">{{ temp.name }}</h3>
							<Icon
								name="ph:arrow-up-right-bold"
								class="text-slate-300 group-hover:text-emerald-500 transition-colors"
							/>
						</div>
						<p class="text-sm font-bold text-slate-400 uppercase tracking-wider">
							{{ temp.category }}
						</p>
					</div>
				</div>
			</div>

			<div class="mt-24 bg-slate-900 rounded-[3rem] p-12 text-center text-white">
				<h2 class="text-3xl md:text-4xl font-black mb-6">Punya konsep template sendiri?</h2>
				<p class="text-slate-400 mb-8 max-w-xl mx-auto">
					Kami terus menambahkan template baru setiap minggu. Hubungi kami jika ingin request desain
					tertentu.
				</p>
				<NuxtLink
					to="/register"
					class="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black transition-all transform hover:scale-105"
				>
					Mulai Buat Portofolio
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.group:hover img {
	filter: grayscale(0);
}
</style>
