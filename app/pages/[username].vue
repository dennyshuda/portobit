<script setup lang="ts">
import Minimalist from "~/components/templates/minimalist.vue";
import Modern from "~/components/templates/modern.vue";
import Terminal from "~/components/templates/terminal.vue";
import Creative from "~/components/templates/creative.vue";

definePageMeta({
	layout: false,
});

const route = useRoute();
const supabase = useSupabaseClient();

const profile = ref<any>(null);
const projects = ref<any[]>([]);
const loading = ref(true);

// Fungsi untuk set SEO Meta setelah data profile tersedia
const updateSeo = (data: any) => {
	useSeoMeta({
		title: `${data.full_name} | Portobit`,
		ogTitle: `${data.full_name} - Portfolio`,
		description: data.bio || `Cek portofolio profesional ${data.full_name} di Portobit.`,
		ogDescription: data.bio || `Cek portofolio profesional ${data.full_name} di Portobit.`,
		ogImage: data.avatar_url,
		twitterCard: "summary_large_image",
		twitterTitle: `${data.full_name} | Portobit`,
		twitterDescription: data.bio,
		twitterImage: data.avatar_url,
	});
};

// ...

const updateViews = async (profileId: string) => {
	const storageKey = `viewed_${profileId}`;
	const isViewed = localStorage.getItem(storageKey);

	if (!isViewed) {
		const { error } = await supabase.rpc("increment_views", { row_id: profileId });

		if (!error) {
			localStorage.setItem(storageKey, "true");
		}
	}
};

// Ambil data berdasarkan username dari URL
const fetchData = async () => {
	if (!route.params.username) {
		console.error("Username tidak ditemukan di URL");
		loading.value = false;
		return;
	}

	try {
		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.select("*")
			.eq("username", route.params.username as string)
			.single();

		if (profileData) {
			profile.value = profileData;
			updateSeo(profileData);
			updateViews(profileData.id);
		}

		if (profileError) throw profileError;
		profile.value = profileData;

		// 2. Cari Projects berdasarkan profile_id
		const { data: projectData, error: projectError } = await supabase
			.from("projects")
			.select("*")
			.eq("profile_id", profileData.id) // Pastikan kolom FK kamu benar (profile_id atau user_id)
			.order("created_at", { ascending: false });

		if (projectError) throw projectError;
		projects.value = projectData;
	} catch (error) {
		console.error("Fetch error:", error);
	} finally {
		loading.value = false;
	}
};

const templateComponents: Record<string, any> = {
	modern: Modern,
	terminal: Terminal,
	minimalist: Minimalist,
	creative: Creative,
};

const activeTemplate = computed(() => {
	const name = profile.value.template_name || "terminal";
	return templateComponents[name];
});

onMounted(() => {
	fetchData();
});
</script>

<template>
	<div>
		<div v-if="!profile" class="h-screen flex items-center justify-center bg-white">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
		</div>

		<div
			v-else-if="!profile"
			class="h-screen flex flex-col items-center justify-center text-center p-6"
		>
			<h1 class="text-6xl font-black text-slate-200 mb-4">404</h1>
			<p class="text-xl font-bold text-slate-900 mb-2">Waduh, usernamenya nggak ada!</p>
			<p class="text-slate-500 mb-8">
				Mau klaim username <b>{{ $route.params.username }}</b> buat jadi milikmu?
			</p>
			<NuxtLink to="/" class="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black">
				Buat Portofolio Sekarang
			</NuxtLink>
		</div>

		<div v-else>
			<component :is="activeTemplate" :profile="profile" :projects="projects" />

			<a
				href="https://portobit.id"
				target="_blank"
				class="fixed bottom-6 right-6 bg-white/80 backdrop-blur shadow-lg border border-slate-200 px-4 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:scale-105 transition-all z-[9999]"
			>
				MADE WITH <span class="text-emerald-500">PORTOBIT</span>
			</a>
		</div>
	</div>
</template>
