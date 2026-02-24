<template>
	<div class="min-h-screen bg-slate-50 font-sans text-slate-900">
		<header class="max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-20 md:pb-32 text-center">
			<h1
				class="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8"
			>
				Pamerkan karyamu <br class="hidden sm:block" />
				<span class="text-emerald-500">dalam satu link.</span>
			</h1>

			<p class="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
				Cara termudah untuk membangun portofolio profesional. Tambahkan project, bagikan link, dan
				lihat statistik pengunjungmu.
			</p>

			<div class="max-w-md mx-auto relative group">
				<div
					class="flex flex-col sm:flex-row items-center bg-white border-2 border-slate-200 p-2 rounded-[2rem] sm:rounded-2xl shadow-sm group-focus-within:border-emerald-500 group-focus-within:shadow-xl group-focus-within:shadow-emerald-100 transition-all gap-2 sm:gap-0"
				>
					<div class="flex items-center flex-1 w-full px-4 py-2 sm:py-0">
						<span class="text-slate-400 font-medium font-mono text-sm sm:text-base"
							>portobit.id/</span
						>
						<input
							type="text"
							placeholder="username"
							class="flex-1 min-w-0 bg-transparent outline-none font-bold text-base sm:text-lg ml-1"
						/>
					</div>

					<button
						class="w-full sm:w-auto bg-emerald-500 text-white px-8 py-4 sm:py-3 rounded-xl sm:rounded-xl font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 sm:shadow-none active:scale-95"
					>
						Klaim Link
					</button>
				</div>

				<p class="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
					Gratis selamanya. Tanpa kartu kredit.
				</p>
			</div>
		</header>

		<section class="max-w-6xl mx-auto px-6 -mt-20">
			<div class="bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-200">
				<img src="/mockup-dashboard.png" class="rounded-[2.5rem] w-full border border-slate-100" />
			</div>
		</section>

		<section
			class="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
		>
			<div>
				<div
					class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
				>
					<Icon name="ph:lightning-bold" size="30" />
				</div>
				<h3 class="text-xl font-black mb-3">Sangat Cepat</h3>
				<p class="text-slate-500 leading-relaxed">
					Bangun portofolio kurang dari 5 menit. Tanpa koding, tanpa ribet hosting.
				</p>
			</div>
			<div>
				<div
					class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
				>
					<Icon name="ph:chart-bar-bold" size="30" />
				</div>
				<h3 class="text-xl font-black mb-3">Analitik Real-time</h3>
				<p class="text-slate-500 leading-relaxed">
					Lihat siapa saja yang mengintip karyamu dengan fitur visitor counter.
				</p>
			</div>
			<div>
				<div
					class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
				>
					<Icon name="ph:share-network-bold" size="30" />
				</div>
				<h3 class="text-xl font-black mb-3">Satu Link Saja</h3>
				<p class="text-slate-500 leading-relaxed">
					Taruh di bio Instagram, Twitter, atau kirimkan langsung ke calon klien.
				</p>
			</div>
		</section>

		<section class="py-20 md:py-32 bg-slate-100/70">
			<div class="max-w-7xl mx-auto px-6">
				<div class="text-center max-w-2xl mx-auto mb-16">
					<h2 class="text-4xl md:text-6xl font-black tracking-tighter">
						Pilih Paket yang <span class="text-emerald-500">Tepat Untukmu.</span>
					</h2>
					<p class="text-slate-500 mt-6 text-lg leading-relaxed">
						Mulai gratis selamanya. Upgrade ke Pro untuk fitur lebih canggih saat kamu sudah siap.
					</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
					<div
						class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col"
					>
						<h3 class="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-2">
							Starter
						</h3>
						<p class="text-5xl font-black text-slate-900 mb-2">Gratis</p>
						<p class="text-slate-500 mb-8">Untuk memulai dan memamerkan karyamu secara instan.</p>
						<ul class="space-y-4 mb-10 text-slate-600 flex-1">
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>1 Portofolio</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Unlimited Projects</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Pilihan Template Dasar</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Analitik Pengunjung</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Branding Portobit</span>
							</li>
						</ul>
						<NuxtLink
							to="/login"
							class="w-full text-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all"
						>
							Mulai Gratis
						</NuxtLink>
					</div>

					<div
						class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 relative border-4 border-slate-900 transform lg:scale-105"
					>
						<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
							<div
								class="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full"
							>
								Paling Populer
							</div>
						</div>
						<h3 class="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">Pro</h3>
						<p class="text-5xl font-black mb-2">Segera</p>
						<p class="text-slate-400 mb-8">Fitur lengkap untuk para profesional sejati.</p>
						<ul class="space-y-4 mb-10 text-slate-300 flex-1">
							<li class="flex items-center gap-3 font-bold">
								<Icon name="ph:sparkle-fill" class="text-amber-400" size="20" />
								<span>Semua di paket Starter, plus:</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Template Premium</span>
							</li>
							<li class="flex items-center gap-3">
								<Icon name="ph:check-circle-fill" class="text-emerald-500" size="20" />
								<span>Tanpa Branding Portobit</span>
							</li>
							<li class="flex items-center gap-3 opacity-50">
								<Icon name="ph:clock-countdown-fill" class="text-slate-400" size="20" />
								<span>Custom Domain (segera)</span>
							</li>
							<li class="flex items-center gap-3 opacity-50">
								<Icon name="ph:clock-countdown-fill" class="text-slate-400" size="20" />
								<span>Analitik Mendalam (segera)</span>
							</li>
						</ul>
						<button
							disabled
							class="w-full text-center bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Segera Hadir
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
