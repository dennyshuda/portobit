const SOCIAL_BASE_URLS: Record<string, string> = {
	github: "https://github.com/",
	instagram: "https://instagram.com/",
	linkedin: "https://linkedin.com/in/",
};

export const normalizeExternalUrl = (value?: string | null) => {
	const trimmed = value?.trim();
	if (!trimmed) return "";

	if (/^(mailto:|tel:)/i.test(trimmed)) return trimmed;
	if (/^https?:\/\//i.test(trimmed)) return trimmed;

	return `https://${trimmed.replace(/^\/+/, "")}`;
};

export const normalizeSocialUrl = (platform: string, value?: string | null) => {
	const trimmed = value?.trim();
	if (!trimmed) return "";

	if (/^https?:\/\//i.test(trimmed)) return trimmed;

	const username = trimmed.replace(/^@/, "").replace(/^\/+/, "");
	const baseUrl = SOCIAL_BASE_URLS[platform];

	return baseUrl ? `${baseUrl}${username}` : normalizeExternalUrl(username);
};
