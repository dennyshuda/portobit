<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		url?: string | null;
		hideWhenEmpty?: boolean;
	}>(),
	{
		hideWhenEmpty: false,
	},
);

const normalizedUrl = computed(() => normalizeExternalUrl(props.url));
</script>

<template>
	<component
		:is="normalizedUrl ? 'a' : 'div'"
		v-if="normalizedUrl || !hideWhenEmpty"
		:href="normalizedUrl || undefined"
		:target="normalizedUrl ? '_blank' : undefined"
		:rel="normalizedUrl ? 'noopener noreferrer' : undefined"
	>
		<slot :url="normalizedUrl" />
	</component>
</template>
