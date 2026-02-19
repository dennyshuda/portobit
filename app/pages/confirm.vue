<script setup>
const user = useSupabaseUser();

watch(
	user,
	() => {
		if (user.value) {
			return navigateTo("/dashboard");
		}
	},
	{ immediate: true },
);
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-slate-50">
		<div class="text-center">
			<Icon name="ph:circle-notch-bold" class="animate-spin text-emerald-500 mb-4" size="40" />
			<p class="font-bold text-slate-600">Menyiapkan dashboard kamu...</p>
		</div>
	</div>
</template>
