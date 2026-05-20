<script setup lang="ts">
const features = [
	{
		icon: "ph:lightning-bold",
		title: "Setup cepat",
		description: "Bangun profil, susun project, lalu bagikan link portofolio tanpa perlu hosting sendiri.",
	},
	{
		icon: "ph:chart-line-up-bold",
		title: "Insight pengunjung",
		description: "Pantau total view dan gunakan data sederhana untuk memahami performa portofoliomu.",
	},
	{
		icon: "ph:layout-bold",
		title: "Template siap pakai",
		description: "Pilih gaya visual yang konsisten untuk developer, designer, creator, atau freelancer.",
	},
];

const stats = [
	{ value: "5 menit", label: "rata-rata setup" },
	{ value: "1 link", label: "untuk semua karya" },
	{ value: "0 biaya", label: "untuk mulai" },
];

const plans = [
	{
		name: "Starter",
		price: "Gratis",
		description: "Cocok untuk mulai membangun kehadiran profesional.",
		action: "Mulai Gratis",
		to: "/login",
		highlight: false,
		features: ["1 portofolio publik", "Project tidak dibatasi", "Template dasar", "Statistik total view"],
	},
	{
		name: "Pro",
		price: "Segera",
		description: "Untuk portofolio yang butuh branding dan kontrol lebih lengkap.",
		action: "Segera Hadir",
		to: "",
		highlight: true,
		features: ["Template premium", "Tanpa branding Portobit", "Custom domain", "Analitik lanjutan"],
	},
];
</script>

<template>
	<div class="min-h-screen bg-white font-sans text-slate-950">
		<header class="border-b border-slate-200 bg-slate-50 pt-28">
			<div class="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pb-20">
				<div>
					<p class="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
						Portfolio builder untuk kreator digital
					</p>
					<h1 class="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
						Portobit
					</h1>
					<p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
						Buat portofolio profesional dalam satu link. Tampilkan profile, project, template, dan statistik sederhana dari dashboard yang rapi.
					</p>

					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<NuxtLink
							to="/login"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-600"
						>
							Mulai Gratis
							<Icon name="ph:arrow-right-bold" />
						</NuxtLink>
						<NuxtLink
							to="/template"
							class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
						>
							Lihat Template
							<Icon name="ph:squares-four-bold" />
						</NuxtLink>
					</div>

					<div class="mt-10 grid max-w-xl grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-5">
						<div v-for="stat in stats" :key="stat.label" class="px-4 first:pl-0">
							<p class="text-2xl font-black text-slate-950">{{ stat.value }}</p>
							<p class="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{{ stat.label }}</p>
						</div>
					</div>
				</div>

				<div class="relative">
					<div class="rounded-xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
						<img
							src="/mockup-dashboard.png"
							alt="Preview dashboard Portobit"
							class="aspect-[4/3] w-full rounded-lg border border-slate-100 object-cover object-top"
						/>
					</div>
				</div>
			</div>
		</header>

		<section id="showcase" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			<div class="mb-10 max-w-2xl">
				<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Workflow</p>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
					Semua yang dibutuhkan untuk tampil siap dikirim ke klien.
				</h2>
			</div>

			<div class="grid gap-5 md:grid-cols-3">
				<article
					v-for="feature in features"
					:key="feature.title"
					class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
				>
					<div class="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
						<Icon :name="feature.icon" size="24" />
					</div>
					<h3 class="text-lg font-black text-slate-950">{{ feature.title }}</h3>
					<p class="mt-3 text-sm leading-6 text-slate-600">{{ feature.description }}</p>
				</article>
			</div>
		</section>

		<section id="pricing" class="border-y border-slate-200 bg-slate-50 py-20">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mb-10 max-w-2xl">
					<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Pricing</p>
					<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
						Mulai sederhana, upgrade saat portofoliomu bertumbuh.
					</h2>
				</div>

				<div class="grid max-w-5xl gap-6 lg:grid-cols-2">
					<article
						v-for="plan in plans"
						:key="plan.name"
						:class="[
							'rounded-lg border p-7 shadow-sm',
							plan.highlight ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-950',
						]"
					>
						<div class="flex items-start justify-between gap-6">
							<div>
								<p :class="['text-sm font-bold uppercase tracking-wider', plan.highlight ? 'text-emerald-300' : 'text-emerald-600']">
									{{ plan.name }}
								</p>
								<p class="mt-3 text-4xl font-black">{{ plan.price }}</p>
							</div>
							<span
								v-if="plan.highlight"
								class="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
							>
								Roadmap
							</span>
						</div>
						<p :class="['mt-4 text-sm leading-6', plan.highlight ? 'text-slate-300' : 'text-slate-600']">
							{{ plan.description }}
						</p>
						<ul :class="['mt-7 space-y-3 text-sm', plan.highlight ? 'text-slate-200' : 'text-slate-700']">
							<li v-for="item in plan.features" :key="item" class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" />
								<span>{{ item }}</span>
							</li>
						</ul>
						<NuxtLink
							v-if="plan.to"
							:to="plan.to"
							class="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
						>
							{{ plan.action }}
						</NuxtLink>
						<button
							v-else
							disabled
							class="mt-8 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-white/10 px-5 py-3 text-sm font-bold text-white opacity-70"
						>
							{{ plan.action }}
						</button>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>
