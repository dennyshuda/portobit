<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		profile: any;
		mode?: "icons" | "labels" | "compact";
		linkClass?: string;
	}>(),
	{
		mode: "icons",
		linkClass: "",
	},
);

const socialLinks = computed(() => {
	const profile = props.profile || {};

	return [
		{
			key: "instagram",
			label: "Instagram",
			icon: "ph:instagram-logo-bold",
			url: normalizeSocialUrl("instagram", profile.instagram_url),
		},
		{
			key: "linkedin",
			label: "LinkedIn",
			icon: "ph:linkedin-logo-bold",
			url: normalizeSocialUrl("linkedin", profile.linkedin_url),
		},
		{
			key: "github",
			label: "GitHub",
			icon: "ph:github-logo-bold",
			url: normalizeSocialUrl("github", profile.github_url),
		},
	].filter((item) => item.url);
});
</script>

<template>
	<div v-if="socialLinks.length" class="flex flex-wrap items-center gap-3">
		<a
			v-for="link in socialLinks"
			:key="link.key"
			:href="link.url"
			target="_blank"
			rel="noopener noreferrer"
			:aria-label="link.label"
			:title="link.label"
			:class="linkClass"
		>
			<template v-if="mode === 'labels'">
				{{ link.label }}
			</template>
			<template v-else-if="mode === 'compact'">
				<span>{{ link.label.slice(0, 2).toUpperCase() }}</span>
			</template>
			<template v-else>
				<Icon :name="link.icon" />
			</template>
		</a>
	</div>
</template>
