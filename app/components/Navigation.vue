<template>
	<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
		<div class="container mx-auto px-6 h-20 flex items-center justify-between">
			<NuxtLink to="/" class="text-2xl font-black tracking-tighter text-slate-900">
				PORTO<span class="text-emerald-500">BIT</span>
			</NuxtLink>

			<div class="flex items-center gap-6">
				<NuxtLink to="/login" class="text-sm font-semibold hover:text-emerald-600">Masuk</NuxtLink>
				<NuxtLink
					to="/login"
					class="px-5 py-2.5 text-sm font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all"
				>
					Daftar
				</NuxtLink>
			</div>
		</div>
	</nav>
</template>
