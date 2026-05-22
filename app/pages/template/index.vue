<script setup lang="ts">
const templates = [
	{
		id: "modern",
		name: "The Modernist",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Popular",
	},
	{
		id: "minimalist",
		name: "Pure Minimalist",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Clean",
	},
	{
		id: "creative",
		name: "Creative Vibe",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Bold",
	},
	{
		id: "studio",
		name: "Studio Folio",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Visual",
	},
	{
		id: "snapshot",
		name: "Snapshot",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Compact",
	},
	{
		id: "terminal",
		name: "Hacker Terminal",
		category: "Pro",
		image:
			"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "Developer",
	},
	{
		id: "executive",
		name: "Executive Edge",
		category: "Pro",
		image:
			"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "Premium",
	},
	{
		id: "monochrome",
		name: "Monochrome Pro",
		category: "Pro",
		image:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "Editorial",
	},
	{
		id: "gradient",
		name: "Gradient Glass",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Modern",
	},
	{
		id: "grid",
		name: "Bento Grid",
		category: "Free",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
		isPro: false,
		tag: "Trendy",
	},
	{
		id: "nightfall",
		name: "Nightfall",
		category: "Pro",
		image:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
		isPro: true,
		tag: "Cinematic",
	},
];

const selectedCategory = ref("All");
const categories = ["All", "Free", "Pro"];

const filteredTemplates = computed(() => {
	if (selectedCategory.value === "All") return templates;
	return templates.filter((template) => template.category === selectedCategory.value);
});
</script>

<template>
	<div class="min-h-screen bg-white pt-32 pb-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-14 max-w-3xl">
				<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Templates</p>
				<h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
					7 tema free, 4 tema pro.
				</h1>
				<p class="mt-5 text-lg leading-8 text-slate-600">
					Pilih gaya portofolio yang paling cocok untuk personal brand kamu.
				</p>
			</div>

			<div class="mb-10 flex flex-wrap gap-3">
				<button
					v-for="category in categories"
					:key="category"
					@click="selectedCategory = category"
					:class="[
						'rounded-lg border px-4 py-2.5 text-sm font-bold transition-colors',
						selectedCategory === category
							? 'border-slate-950 bg-slate-950 text-white'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
					]"
				>
					{{ category }}
				</button>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<article v-for="template in filteredTemplates" :key="template.id" class="group">
					<div
						class="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm"
					>
						<img
							:src="template.image"
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							alt="Template Preview"
						/>

						<div class="absolute left-4 top-4 flex gap-2">
							<span
								class="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900 shadow-sm backdrop-blur"
							>
								{{ template.tag }}
							</span>
							<span
								v-if="template.isPro"
								class="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-amber-300 shadow-sm"
							>
								PRO
							</span>
						</div>

						<div
							class="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<NuxtLink
								:to="`/template/${template.id}`"
								class="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-xl transition-transform group-hover:scale-100"
							>
								Live Preview
								<Icon name="ph:arrow-up-right-bold" />
							</NuxtLink>
						</div>
					</div>

					<div class="flex items-start justify-between gap-4">
						<div>
							<h3 class="text-xl font-black text-slate-950">{{ template.name }}</h3>
							<p class="mt-1 text-sm font-bold uppercase tracking-wide text-slate-400">
								{{ template.category }}
							</p>
						</div>
						<Icon
							name="ph:arrow-up-right-bold"
							class="mt-1 text-slate-300 group-hover:text-emerald-500"
						/>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>
