<script setup lang="ts">
definePageMeta({
	layout: false,
});
const route = useRoute();
const templateId = route.params.id as string;

const dummyData = {
	profile: {
		full_name: "John Doe",
		bio: "Product Designer making cool things.",
		avatar_url: "https://i.pravatar.cc/150?u=john",
		username: "johndoe",
	},
	projects: [
		{
			id: 1,
			title: "Modern Dashboard",
			description: "UI Kit for SaaS",
			image_url: "https://picsum.photos/800/600?random=1",
		},
		{
			id: 2,
			title: "Mobile App",
			description: "Food delivery design",
			image_url: "https://picsum.photos/800/600?random=2",
		},
	],
};
</script>
<template>
	<div class="flex flex-col h-screen overflow-hidden bg-white">
		<div
			class="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-md z-50"
		>
			<div class="flex items-center gap-4">
				<button
					@click="$router.back()"
					class="p-2 hover:bg-slate-100 rounded-full transition-colors"
				>
					<Icon name="ph:arrow-left-bold" class="text-slate-600" />
				</button>
				<h1 class="font-bold text-slate-900">Preview: {{ templateId }}</h1>
			</div>
		</div>

		<div class="flex-1 overflow-y-auto">
			<TemplatesModern
				v-if="templateId === 'modern'"
				:profile="dummyData.profile"
				:projects="dummyData.projects"
			/>

			<TemplatesTerminal
				v-else-if="templateId === 'terminal'"
				:profile="dummyData.profile"
				:projects="dummyData.projects"
			/>

			<TemplatesMinimalist
				v-if="templateId === 'minimal'"
				:profile="dummyData.profile"
				:projects="dummyData.projects"
			/>
		</div>
	</div>
</template>
