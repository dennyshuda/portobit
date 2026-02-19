export default defineNuxtRouteMiddleware((to) => {
	const user = useSupabaseUser();

	if (to.path.startsWith("/dashboard") && !user.value) {
		return navigateTo("/login");
	}

	if (to.path === "/login" && user.value) {
		return navigateTo("/dashboard");
	}
});
