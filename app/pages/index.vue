<template>
	<section class="relative py-20 overflow-hidden bg-white">
		<div class="container mx-auto px-6 relative z-10">
			<div class="flex flex-col items-center text-center">
				<span
					class="px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 rounded-full"
				>
					Baru: Template "Cyberpunk" sudah tersedia!
				</span>

				<h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
					Pamerkan karyamu dengan <br />
					<span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
						Portofolio Satu Menit.
					</span>
				</h1>

				<p class="max-w-2xl mt-6 text-lg text-slate-600 leading-relaxed">
					Portobit membantu freelancer dan kreator membangun showcase profesional tanpa perlu
					coding. Fokus pada karya, biar kami yang urus tampilannya.
				</p>

				<div class="flex flex-col sm:flex-row gap-4 mt-10">
					<NuxtLink
						to="/login"
						class="px-8 py-4 text-white font-bold bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-emerald-200"
					>
						Mulai Gratis Sekarang
					</NuxtLink>
					<NuxtLink
						to="/explore"
						class="px-8 py-4 text-slate-700 font-bold bg-slate-100 rounded-2xl hover:bg-gray-200 transition-all"
					>
						Lihat Contoh
					</NuxtLink>
				</div>

				<div
					class="mt-16 w-full max-w-5xl rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-2xl"
				>
					<div
						class="rounded-2xl overflow-hidden bg-white aspect-video flex items-center justify-center text-slate-300 border border-slate-100"
					>
						<span class="text-sm font-medium italic">Preview Editor Portobit</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 bg-slate-50">
		<div class="container mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900">Segalanya yang kamu butuhkan</h2>
				<p class="mt-4 text-slate-600">Fokus pada karyamu, biarkan Portobit menangani teknisnya.</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div
					class="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<div
						class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 text-2xl"
					>
						⚡
					</div>
					<h3 class="text-xl font-bold mb-3">Live Preview Editor</h3>
					<p class="text-slate-600 leading-relaxed">
						Lihat perubahan tampilan portofoliomu secara instan saat kamu mengetik. Tanpa refresh
						halaman.
					</p>
				</div>

				<div
					class="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<div
						class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl"
					>
						📱
					</div>
					<h3 class="text-xl font-bold mb-3">Responsive Design</h3>
					<p class="text-slate-600 leading-relaxed">
						Portofoliomu akan terlihat sempurna di perangkat apa pun, mulai dari smartphone hingga
						desktop.
					</p>
				</div>

				<div
					class="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
				>
					<div
						class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-2xl"
					>
						🔍
					</div>
					<h3 class="text-xl font-bold mb-3">SEO Optimized</h3>
					<p class="text-slate-600 leading-relaxed">
						Dibangun dengan teknologi SSR Nuxt 4 agar karyamu mudah ditemukan oleh klien melalui
						Google.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 bg-white">
		<div class="container mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900">Pilih Paket Kesuksesanmu</h2>
				<p class="mt-4 text-slate-600">Mulai gratis, upgrade kapan saja untuk fitur profesional.</p>
			</div>

			<div class="flex flex-wrap justify-center gap-8">
				<div class="w-full max-w-sm p-8 rounded-3xl border border-slate-200 bg-white flex flex-col">
					<h3 class="text-lg font-bold text-slate-900">Free Tier</h3>
					<div class="mt-4 flex items-baseline">
						<span class="text-4xl font-black tracking-tight">Rp 0</span>
						<span class="ml-1 text-slate-500">/selamanya</span>
					</div>
					<p class="mt-4 text-sm text-slate-600">Cocok untuk pemula yang ingin mencoba Portobit.</p>

					<ul class="mt-8 space-y-4 flex-1 text-sm text-slate-700">
						<li class="flex items-center gap-3">✅ Maksimal 3 Project</li>
						<li class="flex items-center gap-3">✅ Template Standar</li>
						<li class="flex items-center gap-3">✅ Subdomain portobit.id/kamu</li>
						<li class="flex items-center gap-3 text-slate-400">❌ Custom Theme Color</li>
					</ul>

					<NuxtLink
						to="/login"
						class="mt-8 block w-full py-3 px-6 text-center font-bold text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
					>
						Mulai Sekarang
					</NuxtLink>
				</div>

				<div
					class="w-full max-w-sm p-8 rounded-3xl border-2 border-emerald-500 bg-white shadow-2xl shadow-emerald-100 relative overflow-hidden flex flex-col"
				>
					<div
						class="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-4 py-1 rounded-bl-lg uppercase tracking-widest"
					>
						Paling Laku
					</div>

					<h3 class="text-lg font-bold text-slate-900">Pro Member</h3>
					<div class="mt-4 flex items-baseline">
						<span class="text-4xl font-black tracking-tight text-emerald-600">Rp 49rb</span>
						<span class="ml-1 text-slate-500">/bulan</span>
					</div>
					<p class="mt-4 text-sm text-slate-600">
						Fitur lengkap untuk profesional yang ingin tampil beda.
					</p>

					<ul class="mt-8 space-y-4 flex-1 text-sm text-slate-700">
						<li class="flex items-center gap-3">✅ Unlimited Projects</li>
						<li class="flex items-center gap-3 font-semibold text-emerald-600">
							✅ Akses Semua Premium Themes
						</li>
						<li class="flex items-center gap-3">✅ Custom Theme Color</li>
						<li class="flex items-center gap-3">✅ Analytics Pengunjung</li>
						<li class="flex items-center gap-3 font-semibold text-emerald-600">
							✅ Badge "Verified Pro"
						</li>
					</ul>

					<NuxtLink
						to="/login"
						class="mt-8 block w-full py-3 px-6 text-center font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-shadow shadow-lg shadow-slate-200"
					>
						Upgrade ke Pro
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
