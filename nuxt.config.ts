const isVercel = process.env.VERCEL === "1";

export default defineNuxtConfig({
	buildDir: ".nuxt-build",
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
	runtimeConfig: {
		midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
		midtransMerchantId: process.env.MIDTRANS_MERCHANT_ID,
		public: {
			midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			proPrice: 10000,
		},
	},
	nitro: {
		externals: {
			// Keep Vercel tracing enabled so serverless functions include runtime dependencies.
			trace: isVercel,
		},
	},
	icon: {
		mode: "local",
	},
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
