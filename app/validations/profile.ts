import * as z from "zod";

export const profileSchema = z.object({
	full_name: z.string().min(3, "Nama minimal 3 karakter").max(50, "Nama kepanjangan bos"),
	username: z
		.string()
		.min(3, "Username minimal 3 karakter")
		.regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore")
		.lowercase("Username harus huruf kecil")
		.max(20, "Username maksimal 20 karakter"),
	bio: z.string().max(160, "Bio maksimal 160 karakter").optional(),
});
