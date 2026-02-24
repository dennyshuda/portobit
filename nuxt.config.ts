export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "id",
			},
			title: "Portobit - Platform Portofolio Tercepat",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{
					name: "description",
					content: "Bikin portofolio profesional cuma dalam 1 menit. Cepat, simpel, dan gratis.",
				},
				{ name: "author", content: "Portobit Team" },
				{ name: "robots", content: "index, follow" }, // Memberitahu Google untuk mengindeks situs ini
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt", "@nuxt/icon"],
	supabase: {
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			include: ["/dashboard", "/dashboard/**"],
			exclude: [],
			saveRedirectToCookie: false,
		},
	},
});
