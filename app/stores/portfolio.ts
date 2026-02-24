import { defineStore } from "pinia";
import { toast } from "vue-sonner";

interface Project {
	id?: string;
	profile_id?: string;
	title: string;
	description: string | null;
	image_url: string | null;
	link_url: string | null;
	sort_order?: number;
	created_at?: string | null;
	is_new?: boolean;
	pendingImageFile?: File;
}

export const usePortfolioStore = defineStore("portfolio", {
	state: () => {
		return {
			profile: {
				full_name: "",
				username: "",
				bio: "",
				avatar_url: "",
				theme_color: "#10b981",
				views_count: 0,
				template_name: "",
			},
			projects: [] as Project[],
			pendingAvatarFile: null as File | null,
			hasUnsavedChanges: false,
			isLoading: false,
		};
	},

	actions: {
		async fetchUserPortfolio() {
			const supabase = useSupabaseClient();
			const user = useSupabaseUser();

			if (!user.value?.sub) {
				console.warn("Fetch dibatalkan: ID User tidak ditemukan.");
				return;
			}

			try {
				const { data, error } = await supabase
					.from("profiles")
					.select(`*, projects(*)`)
					.eq("id", user.value.sub)
					.maybeSingle();

				this.profile = {
					full_name: data?.full_name || "",
					username: data?.username || "",
					bio: data?.bio || "",
					avatar_url: data?.avatar_url || "",
					theme_color: data?.theme_color || "#10b981",
					views_count: data?.views_count || 0,
					template_name: data?.template_name || "",
				};

				this.projects = data?.projects || [];

				if (error) throw error;
			} catch (error) {
				console.error("Error fetching portfolio:", error);
			}
		},

		async saveChanges() {
			const supabase = useSupabaseClient();
			const user = useSupabaseUser();
			const userId = user.value?.sub;

			if (!userId) return;
			this.isLoading = true;

			try {
				let finalAvatarUrl = this.profile.avatar_url;

				if (this.pendingAvatarFile) {
					const file = this.pendingAvatarFile;
					const fileExt = file.name.split(".").pop();
					const fileName = `avatars/${userId}-${Date.now()}.${fileExt}`;

					const oldUrl = this.profile.avatar_url;

					const { error: uploadError } = await supabase.storage
						.from("portobit")
						.upload(fileName, file);

					if (uploadError) throw uploadError;

					const { data } = supabase.storage.from("portobit").getPublicUrl(fileName);
					finalAvatarUrl = data.publicUrl;

					if (oldUrl && oldUrl.includes("portobit")) {
						const parts = oldUrl.split("/");
						const oldFileName = parts.pop();
						console.log(oldFileName);

						if (oldFileName) {
							await supabase.storage.from("portobit").remove([`avatars/${oldFileName}`]);
						}
					}
				}

				const { error: dbError } = await supabase
					.from("profiles")
					.update({
						full_name: this.profile.full_name,
						username: this.profile.username.toLowerCase(),
						bio: this.profile.bio,
						avatar_url: finalAvatarUrl,
						theme_color: this.profile.theme_color,
					})
					.eq("id", userId);

				if (dbError) throw dbError;

				this.profile.avatar_url = finalAvatarUrl;
				this.pendingAvatarFile = null;
				this.hasUnsavedChanges = false;
				toast.success("Perubahan berhasil disimpan!");
			} catch (err: any) {
				toast.error(err.message || "Gagal menyimpan perubahan");
			} finally {
				this.isLoading = false;
			}
		},

		async uploadImage(file: File, folder: string, oldUrl: string | null) {
			const client = useSupabaseClient();
			const user = useSupabaseUser();

			if (!user.value) return null;

			try {
				this.isLoading = true;

				// 1. Hapus foto lama jika ada (agar storage tidak penuh)
				if (oldUrl) {
					const oldPath = oldUrl.split("/").pop(); // ambil nama file saja
					if (oldPath) {
						await client.storage.from("portobit").remove([`${user.value.id}/${oldPath}`]);
					}
				}

				// 2. Buat nama file unik
				const fileExt = file.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				const filePath = `${user.value.id}/${fileName}`; // Folder sesuai UID

				// 3. Upload ke Bucket portobit
				const { error: uploadError } = await client.storage.from("portobit").upload(filePath, file);

				if (uploadError) throw uploadError;

				// 4. Dapatkan Public URL
				const { data } = client.storage.from("portobit").getPublicUrl(filePath);

				return data.publicUrl;
			} catch (error: any) {
				alert("Error upload: " + error.message);
				return null;
			} finally {
				this.isLoading = false;
			}
		},

		addProject() {
			const newProject = {
				// ID sementara untuk keperluan :key di v-for
				// Pakai Date.now() tapi tandai sebagai "temp"
				id: `temp-${Date.now()}`,
				title: "",
				description: "",
				link_url: "",
				image_url: null,
				is_new: true, // Flag untuk tahu ini harus di-INSERT bukan UPDATE
			};
			this.projects.push(newProject);
			this.hasUnsavedChanges = true;
		},

		async saveProjects() {
			this.isLoading = true;
			const supabase = useSupabaseClient();
			const user = useSupabaseUser();
			const userId = user.value?.sub;

			if (!userId) {
				toast.error("User tidak ditemukan!");
				this.isLoading = false;
				return;
			}

			try {
				for (const project of this.projects) {
					if (project.pendingImageFile) {
						const file = project.pendingImageFile;
						const fileExt = file.name.split(".").pop();
						const fileName = `projects/${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

						const oldImageUrl = project.image_url;

						const { error: uploadError } = await supabase.storage
							.from("portobit")
							.upload(fileName, file);

						if (uploadError) throw uploadError;

						const { data } = supabase.storage.from("portobit").getPublicUrl(fileName);
						project.image_url = data.publicUrl;

						if (oldImageUrl && oldImageUrl.includes("portobit")) {
							try {
								// Ekstrak path setelah nama bucket
								const pathAfterBucket = oldImageUrl.split("/storage/v1/object/public/portobit/")[1];
								if (pathAfterBucket) {
									const { data, error } = await supabase.storage
										.from("portobit")
										.remove([decodeURIComponent(pathAfterBucket)]);
									console.log({ data, error });
								}
							} catch (err) {
								console.error("Gagal menghapus gambar lama:", err);
								// Tetap lanjut, jangan biarkan error hapus menghentikan proses save
							}
						}

						delete project.pendingImageFile;
					}
				}

				const newProjects = this.projects
					.filter((p) => p.is_new)
					.map(({ id, is_new, ...rest }) => ({ ...rest, profile_id: userId }));

				const existingProjects = this.projects.filter((p) => !p.is_new);

				// A. Insert Project Baru
				if (newProjects.length > 0) {
					const { data: insertedData, error: insError } = await supabase
						.from("projects")
						.insert(newProjects)
						.select();

					if (insError) throw insError;
					await this.fetchUserProjects();
				}

				// B. Update Project Lama
				for (const project of existingProjects) {
					if (!project.id) {
						console.warn("Skip update: Project tidak memiliki ID", project);
						continue;
					}
					const { error: updError } = await supabase
						.from("projects")
						.update({
							title: project.title,
							description: project.description,
							link_url: project.link_url,
							image_url: project.image_url,
						})
						.eq("id", project.id);

					if (updError) throw updError;
				}

				this.hasUnsavedChanges = false;
				toast.success("Semua perubahan project berhasil disimpan!");
			} catch (err: any) {
				toast.error("Gagal menyimpan project", { description: err.message });
			} finally {
				this.isLoading = false;
			}
		},

		async fetchUserProjects() {
			const supabase = useSupabaseClient();
			const user = useSupabaseUser();

			if (!user.value) return null;

			const { data } = await supabase
				.from("projects")
				.select("*")
				.eq("user_id", user.value?.sub)
				.order("created_at", { ascending: false });

			if (data) this.projects = data;
		},

		async deleteProject(index: number, imageUrl: string | null) {
			const project = this.projects[index];
			const supabase = useSupabaseClient();

			if (!project) {
				alert("Project tidak ditemukan!");
				return;
			}

			// Konfirmasi ke user
			if (!confirm("Apakah Anda yakin ingin menghapus project ini?")) return;

			try {
				if (project.id && !project.id.toString().includes("temp")) {
					if (imageUrl && imageUrl.includes("portobit")) {
						const path = imageUrl.split("/storage/v1/object/public/portobit/")[1];
						if (path) await supabase.storage.from("portobit").remove([decodeURIComponent(path)]);
					}

					const { error: dbError } = await supabase.from("projects").delete().eq("id", project.id);

					if (dbError) throw dbError;
				}

				// KONDISI 3: Hapus dari array lokal (State Pinia) agar UI terupdate
				this.projects.splice(index, 1);

				// Tandai ada perubahan jika kita menghapus project yang baru saja dibuat
				this.hasUnsavedChanges = true;

				console.log("Project berhasil dihapus");
			} catch (err: any) {
				alert("Gagal menghapus project: " + err.message);
			}
		},
	},
});
