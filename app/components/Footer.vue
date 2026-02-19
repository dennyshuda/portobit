<template>
	<footer class="py-10 px-6 bg-white border-t border-slate-100">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
			<div class="flex items-center gap-3">
				<div class="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
					<Icon name="ph:cursor-click-fill" class="text-white text-[10px]" />
				</div>
				<p class="text-[11px] font-black text-slate-900 uppercase tracking-tighter">
					Portobit <span class="text-slate-300 mx-2 font-normal">|</span>
					<span class="text-slate-400 font-bold uppercase tracking-widest"
						>© 2026 | Made with ❤️ in Indonesia.</span
					>
				</p>
			</div>

			<div
				class="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]"
			>
				<NuxtLink to="/privacy" class="hover:text-emerald-600 transition-colors"
					>Privacy Policy</NuxtLink
				>
				<NuxtLink to="/terms" class="hover:text-emerald-600 transition-colors"
					>Terms of Service</NuxtLink
				>
				<a href="mailto:hello@portobit.id" class="hover:text-emerald-600 transition-colors"
					>Support</a
				>
			</div>
		</div>
	</footer>
</template>
