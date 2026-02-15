<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
	<footer class="py-12 border-t border-slate-100 bg-slate-50">
		<div class="text-center text-slate-400 text-sm">
			© {{ year }} Portobit. Dibuat dengan Nuxt 4 & ☕.
		</div>
	</footer>
</template>
