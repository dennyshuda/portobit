<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();

const availableTemplates = ref([
	{
		id: "modern",
		name: "The Modernist",
		desc: "Bersih, profesional, dan fokus pada konten.",
		preview:
			"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=400&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "terminal",
		name: "Hacker Terminal",
		desc: "Gaya konsol Linux untuk para backend dev.",
		preview:
			"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop",
		isPro: true,
	},
	{
		id: "minimal",
		name: "Pure Minimalist",
		desc: "Tanpa gangguan, hanya karyamu yang berbicara.",
		preview:
			"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400&auto=format&fit=crop",
		isPro: false,
	},
]);

const selectTemplate = async (templateId: string, isPro: boolean) => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const userId = user.value?.sub;

	if (!userId) {
		throw new Error("User not found");
	}

	if (isPro) {
		toast.info("Fitur Pro", { description: "Template ini hanya untuk member Pro!" });
		return;
	}

	try {
		const { error } = await supabase
			.from("profiles")
			.update({ template_name: templateId })
			.eq("id", userId);

		portfolio.fetchUserPortfolio();

		toast.success("Template berhasil diganti!");
	} catch (error) {
		toast.error("Gagal mengganti template");
	} finally {
		portfolio.isLoading = false;
	}
};
</script>

<template>
	<div class="max-w-6xl mx-auto py-10 px-6">
		<div class="mb-10">
			<h1 class="text-3xl font-black text-slate-900 tracking-tight">Pilih Template</h1>
			<p class="text-slate-500 mt-1">Sesuaikan gaya portofoliomu dengan kepribadianmu.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				v-for="temp in availableTemplates"
				:key="temp.id"
				class="group relative bg-white border-2 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
				:class="
					portfolio.profile.template_name === temp.id
						? 'border-emerald-500 shadow-xl shadow-emerald-50/50'
						: 'border-slate-100'
				"
			>
				<div
					v-if="portfolio.profile.template_name === temp.id"
					class="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-200"
				>
					<Icon name="ph:check-circle-fill" /> AKTIF
				</div>

				<div
					v-if="temp.isPro"
					class="absolute top-4 left-4 z-10 bg-slate-900 text-amber-400 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1"
				>
					<Icon name="ph:crown-fill" /> PRO
				</div>

				<div class="aspect-[4/3] overflow-hidden bg-slate-100">
					<img
						:src="temp.preview"
						class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
					/>
				</div>

				<div class="p-6">
					<h3 class="font-bold text-slate-900 text-lg">{{ temp.name }}</h3>
					<p class="text-slate-400 text-sm mt-1 mb-6">{{ temp.desc }}</p>

					<button
						@click="selectTemplate(temp.id, temp.isPro)"
						:disabled="portfolio.isLoading || portfolio.profile.template_name === temp.id"
						class="w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
						:class="
							portfolio.profile.template_name === temp.id
								? 'bg-emerald-50 text-emerald-600'
								: 'bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200'
						"
					>
						<span v-if="portfolio.profile.template_name === temp.id">Digunakan</span>
						<span v-else>Pilih Template</span>
					</button>
				</div>
			</div>
		</div>

		<div
			class="mt-16 bg-slate-900 rounded-[3rem] p-10 text-center text-white relative overflow-hidden"
		>
			<div class="relative z-10">
				<h2 class="text-2xl font-bold mb-4">Ingin melihat hasilnya?</h2>
				<p class="text-slate-400 mb-8 max-w-md mx-auto">
					Lihat bagaimana tampilan portofoliomu di mata dunia dengan template terpilih.
				</p>
				<NuxtLink
					:to="`/${portfolio.profile.username}`"
					target="_blank"
					class="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-emerald-400 transition-all"
				>
					Lihat Profil Publik <Icon name="ph:arrow-square-out-bold" />
				</NuxtLink>
			</div>
			<div
				class="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
			></div>
			<div class="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
		</div>
	</div>
</template>
