export default defineEventHandler(async (event) => {
	const authorization = getHeader(event, "authorization") || "";
	const accessToken = authorization.replace(/^Bearer\s+/i, "");
	const { supabase, user, config } = await getAuthenticatedSupabase(accessToken);
	const body = await readBody<{ order_id?: string }>(event);

	if (!body.order_id) {
		throw createError({ statusCode: 400, statusMessage: "order_id wajib dikirim." });
	}

	const serverKey = config.midtransServerKey;
	if (!serverKey) {
		throw createError({ statusCode: 500, statusMessage: "MIDTRANS_SERVER_KEY belum diset." });
	}

	const userOrderPrefix = user.id.replaceAll("-", "").slice(0, 16);

	if (!body.order_id.startsWith(`pro-${userOrderPrefix}-`)) {
		throw createError({ statusCode: 403, statusMessage: "Order ini bukan milik user aktif." });
	}

	const status = await getMidtransTransactionStatus(serverKey, body.order_id);

	if (!isPaidMidtransStatus(status)) {
		return {
			isPro: false,
			transactionStatus: status.transaction_status,
			fraudStatus: status.fraud_status,
		};
	}

	const { error } = await supabase
		.from("profiles")
		.update({ is_pro: true })
		.eq("id", user.id);

	if (error) {
		throw createError({ statusCode: 500, statusMessage: error.message });
	}

	return {
		isPro: true,
		transactionStatus: status.transaction_status,
		fraudStatus: status.fraud_status,
	};
});
