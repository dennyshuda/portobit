<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});

const supabase = useSupabaseClient();
const loading = ref(false);

const loginWithGoogle = async () => {
	loading.value = true;
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo:
				process.env.NODE_ENV === "production"
					? "https://portobit.vercel.app/confirm"
					: "http://localhost:3000/confirm",
			queryParams: {
				access_type: "offline",
				prompt: "select_account",
			},
		},
	});

	if (error) {
		console.error("Login error:", error.message);
		loading.value = false;
	}
};
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-slate-50 px-6">
		<div class="w-full max-w-md">
			<div class="text-center mb-10">
				<NuxtLink to="/" class="text-3xl font-black tracking-tighter text-slate-900 uppercase">
					PORTO<span class="text-emerald-500">BIT</span>
				</NuxtLink>
			</div>

			<div
				class="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100"
			>
				<div class="text-center mb-8">
					<h1 class="text-2xl font-bold text-slate-900">Selamat Datang</h1>
					<p class="text-slate-500 mt-2">
						Masuk untuk mengelola portofolio profesionalmu dalam sekejap.
					</p>
				</div>

				<button
					@click="loginWithGoogle"
					:disabled="loading"
					class="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-emerald-200 transition-all active:scale-[0.98] disabled:opacity-70"
				>
					<img
						v-if="!loading"
						src="https://www.svgrepo.com/show/475656/google-color.svg"
						class="w-6 h-6"
						alt="Google"
					/>
					<div
						v-else
						class="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"
					></div>
					<span>Lanjutkan dengan Google</span>
				</button>

				<div class="mt-8 flex items-center gap-4">
					<div class="h-[1px] bg-slate-100 flex-1"></div>
					<span class="text-xs font-bold text-slate-300 uppercase tracking-widest"
						>Secure Login</span
					>
					<div class="h-[1px] bg-slate-100 flex-1"></div>
				</div>

				<p class="mt-8 text-center text-[11px] text-slate-400 leading-relaxed px-4">
					Dengan mengeklik tombol di atas, kamu menyetujui <br />
					<span class="underline cursor-pointer">Syarat & Ketentuan</span> kami.
				</p>
			</div>

			<NuxtLink
				to="/"
				class="block text-center mt-8 text-sm font-bold text-slate-400 hover:text-slate-600"
			>
				← Kembali ke Beranda
			</NuxtLink>
		</div>
	</div>
</template>
