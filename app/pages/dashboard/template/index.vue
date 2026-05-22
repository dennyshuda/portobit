<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const availableTemplates = [
	{
		id: "modern",
		name: "The Modernist",
		desc: "Bersih, profesional, dan fokus pada konten.",
		preview:
			"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "minimalist",
		name: "Pure Minimalist",
		desc: "Tipografi editorial yang tenang untuk karya pilihan.",
		preview:
			"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "creative",
		name: "Creative Vibe",
		desc: "Visual berani untuk desainer, ilustrator, dan kreator.",
		preview:
			"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
		isPro: false,
	},
	{
		id: "studio",
		name: "Studio Folio",
		desc: "Grid visual yang cocok untuk creative studio dan karya berbasis gambar.",
		preview:
			"https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "snapshot",
		name: "Snapshot",
		desc: "Layout compact untuk profil yang ingin cepat dipindai recruiter atau klien.",
		preview:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "terminal",
		name: "Hacker Terminal",
		desc: "Gaya terminal untuk developer yang ingin tampil teknikal.",
		preview:
			"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
		isPro: true,
	},
	{
		id: "executive",
		name: "Executive Edge",
		desc: "Tampilan premium untuk founder, konsultan, dan profesional senior.",
		preview:
			"https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
		isPro: true,
	},
	{
		id: "monochrome",
		name: "Monochrome Pro",
		desc: "Tema premium hitam-putih dengan kontras kuat dan presentasi editorial.",
		preview:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
		isPro: true,
	},
	{
		id: "gradient",
		name: "Gradient Glass",
		desc: "Desain modern dengan gradien dan efek glassmorphism yang elegan.",
		preview:
			"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "grid",
		name: "Bento Grid",
		desc: "Layout bento grid yang unik dengan kotak-kotak dinamis untuk karya kamu.",
		preview:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
		isPro: false,
	},
	{
		id: "nightfall",
		name: "Nightfall",
		desc: "Tema dark premium dengan animasi gradien dan efek sinematik.",
		preview:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
		isPro: true,
	},
];

const activeTemplateName = computed(() => portfolio.profile.template_name || "modern");
const publicProfilePath = computed(() => {
	const username = portfolio.profile.username?.toLowerCase();
	return username ? `/${username}` : "/dashboard/settings";
});

const selectTemplate = async (templateId: string, isPro: boolean) => {
	if (portfolio.isLoading || activeTemplateName.value === templateId) return;

	if (isPro) {
		toast.info("Template Pro", { description: "Template ini akan tersedia untuk member Pro." });
		return;
	}

	const userId = user.value?.sub;
	if (!userId) {
		toast.error("User tidak ditemukan. Silakan login ulang.");
		return;
	}

	portfolio.isLoading = true;

	try {
		const { error } = await supabase
			.from("profiles")
			.update({ template_name: templateId })
			.eq("id", userId);

		if (error) throw error;

		portfolio.profile.template_name = templateId;
		toast.success("Template berhasil diganti.");
	} catch (error: any) {
		toast.error("Gagal mengganti template", {
			description: error?.message || "Coba beberapa saat lagi.",
		});
	} finally {
		portfolio.isLoading = false;
	}
};
</script>

<template>
	<div class="space-y-6">
		<section
			class="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center"
		>
			<div>
				<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Template</p>
				<h1 class="mt-2 text-2xl font-black tracking-tight text-slate-950">
					Pilih tampilan portofolio
				</h1>
				<p class="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
					Template yang dipilih akan langsung dipakai di halaman publik kamu.
				</p>
			</div>

			<NuxtLink
				:to="publicProfilePath"
				target="_blank"
				class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
			>
				Lihat Profil Publik
				<Icon name="ph:arrow-up-right-bold" />
			</NuxtLink>
		</section>

		<section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
			<article
				v-for="template in availableTemplates"
				:key="template.id"
				:class="[
					'overflow-hidden rounded-lg border bg-white shadow-sm transition-colors',
					activeTemplateName === template.id
						? 'border-emerald-500 ring-2 ring-emerald-100'
						: 'border-slate-200 hover:border-emerald-300',
				]"
			>
				<div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
					<img
						:src="template.preview"
						:alt="`Preview ${template.name}`"
						class="h-full w-full object-cover transition duration-500 hover:scale-105"
					/>

					<div class="absolute left-3 top-3 flex gap-2">
						<span
							v-if="template.isPro"
							class="inline-flex items-center gap-1 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-amber-300"
						>
							<Icon name="ph:crown-fill" />
							Pro
						</span>
						<span
							v-if="activeTemplateName === template.id"
							class="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white"
						>
							<Icon name="ph:check-circle-fill" />
							Aktif
						</span>
					</div>
				</div>

				<div class="p-5">
					<h3 class="font-black text-slate-950">{{ template.name }}</h3>
					<p class="mt-2 min-h-12 text-sm leading-6 text-slate-600">{{ template.desc }}</p>

					<button
						@click="selectTemplate(template.id, template.isPro)"
						:disabled="portfolio.isLoading || activeTemplateName === template.id"
						:class="[
							'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed',
							activeTemplateName === template.id
								? 'bg-emerald-50 text-emerald-700'
								: 'bg-slate-950 text-white hover:bg-emerald-600 disabled:bg-slate-300',
						]"
					>
						<Icon
							v-if="portfolio.isLoading && activeTemplateName !== template.id"
							name="ph:circle-notch-bold"
							class="animate-spin"
						/>
						<span>{{ activeTemplateName === template.id ? "Digunakan" : "Pilih Template" }}</span>
					</button>
				</div>
			</article>
		</section>
	</div>
</template>
