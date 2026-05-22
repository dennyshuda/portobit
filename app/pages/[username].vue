<script setup lang="ts">
import Creative from "~/components/templates/creative.vue";
import Executive from "~/components/templates/executive.vue";
import Minimalist from "~/components/templates/minimalist.vue";
import Monochrome from "~/components/templates/monochrome.vue";
import Modern from "~/components/templates/modern.vue";
import Snapshot from "~/components/templates/snapshot.vue";
import Studio from "~/components/templates/studio.vue";
import Terminal from "~/components/templates/terminal.vue";
import Gradient from "~/components/templates/gradient.vue";
import Grid from "~/components/templates/grid.vue";
import Nightfall from "~/components/templates/nightfall.vue";

definePageMeta({
	layout: false,
});

const route = useRoute();
const supabase = useSupabaseClient();

const profile = ref<any>(null);
const projects = ref<any[]>([]);
const loading = ref(true);
const notFound = ref(false);

const templateComponents: Record<string, any> = {
	creative: Creative,
	executive: Executive,
	minimalist: Minimalist,
	monochrome: Monochrome,
	modern: Modern,
	snapshot: Snapshot,
	studio: Studio,
	terminal: Terminal,
	gradient: Gradient,
	grid: Grid,
	nightfall: Nightfall,
};

const activeTemplate = computed(() => {
	const templateName = profile.value?.template_name || "modern";
	return templateComponents[templateName] || Modern;
});

const updateSeo = (data: any) => {
	useSeoMeta({
		title: `${data.full_name || data.username} | Portobit`,
		ogTitle: `${data.full_name || data.username} - Portfolio`,
		description: `Lihat portofolio profesional dari ${data.full_name || data.username} di Portobit.`,
		ogDescription: `Lihat portofolio profesional dari ${data.full_name || data.username} di Portobit.`,
		ogImage: data.avatar_url,
		twitterCard: "summary_large_image",
		twitterTitle: `${data.full_name || data.username} | Portobit`,
		twitterDescription: data.bio,
		twitterImage: data.avatar_url,
		keywords: `${data.full_name || ""}, portofolio ${data.full_name || ""}, portobit, ${data.username}`,
	});
};

const updateViews = async (profileId: string) => {
	if (!import.meta.client) return;

	const storageKey = `viewed_${profileId}`;
	const isViewed = localStorage.getItem(storageKey);

	if (isViewed) return;

	const { error } = await supabase.rpc("increment_views", { row_id: profileId });
	if (!error) {
		localStorage.setItem(storageKey, "true");
	}
};

const fetchData = async () => {
	const username = route.params.username;
	if (!username || Array.isArray(username)) {
		notFound.value = true;
		loading.value = false;
		return;
	}

	try {
		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.select("*")
			.eq("username", username.toLowerCase())
			.maybeSingle();

		if (profileError) throw profileError;

		if (!profileData) {
			notFound.value = true;
			return;
		}

		profile.value = profileData;
		updateSeo(profileData);
		await updateViews(profileData.id);

		const { data: projectData, error: projectError } = await supabase
			.from("projects")
			.select("*")
			.eq("profile_id", profileData.id)
			.order("created_at", { ascending: false });

		if (projectError) throw projectError;
		projects.value = projectData || [];
	} catch (error) {
		console.error("Fetch error:", error);
		notFound.value = true;
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchData();
});
</script>

<template>
	<div>
		<div v-if="loading" class="flex h-screen items-center justify-center bg-white">
			<div
				class="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500"
			></div>
		</div>

		<div
			v-else-if="notFound"
			class="flex h-screen flex-col items-center justify-center p-6 text-center"
		>
			<h1 class="mb-4 text-6xl font-black text-slate-200">404</h1>
			<p class="mb-2 text-xl font-bold text-slate-900">Username ini belum tersedia.</p>
			<p class="mb-8 text-slate-500">
				Kamu bisa klaim <b>{{ route.params.username }}</b> sebagai link portofoliomu.
			</p>
			<NuxtLink to="/" class="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-black text-white">
				Buat Portofolio
			</NuxtLink>
		</div>

		<div v-else>
			<component :is="activeTemplate" :profile="profile" :projects="projects" />

			<a
				href="https://portobit.id"
				target="_blank"
				class="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[10px] font-black tracking-widest shadow-lg backdrop-blur transition-transform hover:scale-105"
			>
				MADE WITH <span class="text-emerald-500">PORTOBIT</span>
			</a>
		</div>
	</div>
</template>
