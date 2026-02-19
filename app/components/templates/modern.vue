<script setup lang="ts">
defineProps<{
	profile: any;
	projects: any[];
}>();
</script>

<template>
	<div class="bg-white p-8 md:p-20 text-center">
		<div
			class="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-6 overflow-hidden border-4 border-emerald-50"
		>
			<img :src="profile.avatar_url" class="w-full h-full object-cover" />
		</div>
		<h2 class="text-4xl font-black mb-2 text-slate-900">{{ profile.full_name }}</h2>
		<p class="text-slate-500 max-w-md mx-auto mb-12">{{ profile.bio }}</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
			<div
				v-for="p in projects"
				:key="p.id"
				class="group p-4 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
			>
				<div class="aspect-video bg-slate-200 rounded-2xl mb-4 overflow-hidden">
					<img
						:src="p.image_url"
						class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					/>
				</div>
				<h4 class="font-bold text-slate-900 px-2">{{ p.title }}</h4>
				<p class="text-sm text-slate-500 px-2 pb-2">{{ p.description }}</p>
			</div>
		</div>
	</div>
</template>
