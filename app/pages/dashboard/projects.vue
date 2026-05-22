<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();
const projectPendingDelete = ref<{ index: number; title: string; imageUrl: string | null } | null>(null);

function handleProjectImageUpload(event: Event, index: number) {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	const project = portfolio.projects[index];

	if (!file || !project) return;

	project.pendingImageFile = file;
	project.image_url = URL.createObjectURL(file);
	portfolio.hasUnsavedChanges = true;
}

function requestDeleteProject(index: number) {
	const project = portfolio.projects[index];
	if (!project) return;

	projectPendingDelete.value = {
		index,
		title: project.title || "Untitled project",
		imageUrl: project.image_url,
	};
}

async function confirmDeleteProject() {
	if (!projectPendingDelete.value) return;

	const { index, imageUrl } = projectPendingDelete.value;
	await portfolio.deleteProject(index, imageUrl);
	projectPendingDelete.value = null;
}
</script>

<template>
	<div class="relative">
		<div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
			<section class="min-w-0 space-y-5 pb-24">
				<div class="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
					<div>
						<p class="text-sm font-bold uppercase tracking-wider text-emerald-600">Projects</p>
						<h1 class="mt-2 text-2xl font-black tracking-tight text-slate-950">Project Saya</h1>
						<p class="mt-1 text-sm text-slate-600">Susun karya terbaik yang akan tampil di halaman publik.</p>
					</div>
					<button
						@click="portfolio.addProject"
						class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
					>
						<Icon name="ph:plus-bold" />
						Tambah Project
					</button>
				</div>

				<div
					v-if="portfolio.projects.length === 0"
					class="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm"
				>
					<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
						<Icon name="ph:briefcase-bold" size="28" />
					</div>
					<h3 class="font-black text-slate-950">Belum ada project</h3>
					<p class="mt-1 text-sm text-slate-500">Tambahkan project pertama untuk membuat profilmu lebih meyakinkan.</p>
				</div>

				<div class="space-y-4">
					<article
						v-for="(project, index) in portfolio.projects"
						:key="project.id || index"
						class="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-300"
					>
						<div class="flex flex-col gap-5 md:flex-row">
							<div class="w-full shrink-0 md:w-44">
								<div class="relative aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-100 md:aspect-square">
									<img v-if="project.image_url" :src="project.image_url" class="h-full w-full object-cover" alt="" />
									<div v-else class="flex h-full w-full flex-col items-center justify-center text-xs font-bold uppercase tracking-wide text-slate-400">
										<Icon name="ph:image-square-bold" size="26" class="mb-2" />
										No Image
									</div>

									<label class="absolute inset-0 flex cursor-pointer items-center justify-center bg-slate-950/60 opacity-0 transition-opacity group-hover:opacity-100">
										<input type="file" class="hidden" accept="image/*" @change="handleProjectImageUpload($event, index)" />
										<span class="rounded-lg bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
											{{ project.image_url ? "Ganti" : "Upload" }}
										</span>
									</label>
								</div>
							</div>

							<div class="min-w-0 flex-1 space-y-4">
								<div class="flex items-start gap-3">
									<input
										v-model="project.title"
										placeholder="Judul project"
										class="min-w-0 flex-1 bg-transparent text-xl font-black text-slate-900 outline-none placeholder:text-slate-300 focus:text-emerald-700"
										@input="portfolio.hasUnsavedChanges = true"
									/>
									<button
										@click="requestDeleteProject(index)"
										class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
										title="Hapus project"
									>
										<Icon name="ph:trash-bold" size="19" />
									</button>
								</div>

								<textarea
									v-model="project.description"
									placeholder="Ceritakan konteks, peran, atau hasil dari project ini."
									rows="3"
									class="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
									@input="portfolio.hasUnsavedChanges = true"
								></textarea>

								<div class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3">
									<Icon name="ph:link-bold" class="text-slate-400" />
									<input
										v-model="project.link_url"
										placeholder="https://project-kamu.com"
										class="min-w-0 flex-1 bg-transparent font-mono text-xs text-emerald-700 outline-none placeholder:text-slate-400"
										@input="portfolio.hasUnsavedChanges = true"
										@blur="project.link_url = normalizeExternalUrl(project.link_url)"
									/>
								</div>
							</div>
						</div>
					</article>
				</div>
			</section>

			<aside class="hidden xl:block">
				<div class="sticky top-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<div>
							<p class="text-sm font-black text-slate-950">Preview</p>
							<p class="text-xs text-slate-500">Tampilan ringkas profil publik</p>
						</div>
						<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Live</span>
					</div>

					<div class="rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-xl">
						<div class="h-[640px] overflow-y-auto rounded-[1.45rem] bg-white p-5">
							<div class="mx-auto mb-3 h-14 w-14 overflow-hidden rounded-full bg-slate-100">
								<img
									v-if="portfolio.profile.avatar_url"
									:src="portfolio.profile.avatar_url"
									class="h-full w-full object-cover"
									alt=""
								/>
							</div>
							<p class="truncate text-center text-xs font-black uppercase tracking-wide">
								{{ portfolio.profile.full_name || "Your Name" }}
							</p>
							<p class="mt-1 line-clamp-2 text-center text-[10px] text-slate-500">
								{{ portfolio.profile.bio || "Bio singkat akan tampil di sini." }}
							</p>

							<div class="mt-6 space-y-3">
								<div
									v-for="project in portfolio.projects"
									:key="project.id"
									class="overflow-hidden rounded-lg border border-slate-200 bg-white"
								>
									<div class="aspect-video bg-slate-100">
										<img v-if="project.image_url" :src="project.image_url" class="h-full w-full object-cover" alt="" />
									</div>
									<div class="p-3">
										<p class="truncate text-xs font-black">{{ project.title || "Project Title" }}</p>
										<p class="mt-1 line-clamp-1 text-[10px] text-slate-500">
											{{ project.description || "Description goes here..." }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>

		<Transition name="slide-up">
			<div
				v-if="portfolio.hasUnsavedChanges"
				class="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:left-72"
			>
				<div class="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-sm font-semibold text-slate-700">Ada perubahan project yang belum disimpan.</p>
					<button
						@click="portfolio.saveProjects"
						class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:bg-slate-300"
						:disabled="portfolio.isLoading"
					>
						<Icon v-if="portfolio.isLoading" name="ph:circle-notch-bold" class="animate-spin" />
						<span>{{ portfolio.isLoading ? "Menyimpan..." : "Simpan Perubahan" }}</span>
					</button>
				</div>
			</div>
		</Transition>

		<Transition name="fade">
			<div
				v-if="projectPendingDelete"
				class="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
				role="dialog"
				aria-modal="true"
			>
				<div class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-2xl">
					<div class="flex items-start gap-4">
						<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
							<Icon name="ph:trash-bold" size="23" />
						</div>
						<div>
							<h2 class="text-lg font-black text-slate-950">Hapus project?</h2>
							<p class="mt-2 text-sm leading-6 text-slate-600">
								Project <span class="font-bold text-slate-900">{{ projectPendingDelete.title }}</span>
								akan dihapus dari dashboard dan halaman publik.
							</p>
						</div>
					</div>

					<div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						<button
							@click="projectPendingDelete = null"
							:disabled="Boolean(portfolio.deletingProjectId)"
							class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Batal
						</button>
						<button
							@click="confirmDeleteProject"
							:disabled="Boolean(portfolio.deletingProjectId)"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
						>
							<Icon
								v-if="portfolio.deletingProjectId"
								name="ph:circle-notch-bold"
								class="animate-spin"
							/>
							<span>{{ portfolio.deletingProjectId ? "Menghapus..." : "Hapus Project" }}</span>
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
	opacity: 0;
	transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
