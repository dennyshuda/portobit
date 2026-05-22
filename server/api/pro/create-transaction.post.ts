export default defineEventHandler(async (event) => {
	const authorization = getHeader(event, "authorization") || "";
	const accessToken = authorization.replace(/^Bearer\s+/i, "");
	const { supabase, user, config } = await getAuthenticatedSupabase(accessToken);

	const serverKey = config.midtransServerKey;
	const publicConfig = config.public;
	const price = Number(publicConfig.proPrice || 10000);

	if (!serverKey) {
		throw createError({ statusCode: 500, statusMessage: "MIDTRANS_SERVER_KEY belum diset." });
	}

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("id, full_name, username, is_pro")
		.eq("id", user.id)
		.maybeSingle();

	if (error) {
		throw createError({ statusCode: 500, statusMessage: error.message });
	}

	if (profile?.is_pro) {
		return { alreadyPro: true };
	}

	const userOrderPrefix = user.id.replaceAll("-", "").slice(0, 16);
	const orderId = `pro-${userOrderPrefix}-${Date.now()}`;
	const siteUrl = publicConfig.siteUrl || getRequestURL(event).origin;

	return await createSnapTransaction(serverKey, {
		transaction_details: {
			order_id: orderId,
			gross_amount: price,
		},
		item_details: [
			{
				id: "portobit-pro",
				name: "Portobit Pro",
				price,
				quantity: 1,
			},
		],
		customer_details: {
			first_name: profile?.full_name || profile?.username || user.email || "Portobit User",
			email: user.email,
		},
		callbacks: {
			finish: `${siteUrl}/dashboard/template?payment=finish`,
		},
		custom_field1: user.id,
		custom_field2: "portobit-pro",
	});
});
