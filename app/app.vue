<script setup>
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toaster position="top-center" richColors closeButton />
</template>
