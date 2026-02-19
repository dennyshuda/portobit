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
	</div>
</template>
