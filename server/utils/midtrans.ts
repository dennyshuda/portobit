const SNAP_BASE_URL = "https://app.sandbox.midtrans.com";
const API_BASE_URL = "https://api.sandbox.midtrans.com";

export const createMidtransAuthHeader = (serverKey: string) => {
	const token = Buffer.from(`${serverKey}:`).toString("base64");
	return `Basic ${token}`;
};

export const createSnapTransaction = async (serverKey: string, payload: Record<string, unknown>) => {
	return await $fetch<{ token: string; redirect_url: string }>("/snap/v1/transactions", {
		baseURL: SNAP_BASE_URL,
		method: "POST",
		headers: {
			Authorization: createMidtransAuthHeader(serverKey),
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: payload,
	});
};

export const getMidtransTransactionStatus = async (serverKey: string, orderId: string) => {
	return await $fetch<{
		order_id: string;
		status_code: string;
		gross_amount: string;
		transaction_status: string;
		fraud_status?: string;
		signature_key?: string;
	}>(`/v2/${encodeURIComponent(orderId)}/status`, {
		baseURL: API_BASE_URL,
		method: "GET",
		headers: {
			Authorization: createMidtransAuthHeader(serverKey),
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};

export const isPaidMidtransStatus = (status: { transaction_status?: string; fraud_status?: string }) => {
	if (status.transaction_status === "settlement") return true;
	if (status.transaction_status === "capture") {
		return !status.fraud_status || status.fraud_status === "accept";
	}

	return false;
};
