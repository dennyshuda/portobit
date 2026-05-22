import { createClient } from "@supabase/supabase-js";

export const getAuthenticatedSupabase = async (accessToken?: string) => {
	if (!accessToken) {
		throw createError({ statusCode: 401, statusMessage: "Token login tidak ditemukan." });
	}

	const config = useRuntimeConfig();
	const url = process.env.SUPABASE_URL || "";
	const key = process.env.SUPABASE_KEY || "";

	if (!url || !key) {
		throw createError({ statusCode: 500, statusMessage: "Konfigurasi Supabase belum lengkap." });
	}

	const supabase = createClient(url, key, {
		global: {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
		auth: {
			persistSession: false,
		},
	});

	const { data, error } = await supabase.auth.getUser(accessToken);

	if (error || !data.user) {
		throw createError({ statusCode: 401, statusMessage: "Sesi login tidak valid." });
	}

	return { supabase, user: data.user, config };
};
