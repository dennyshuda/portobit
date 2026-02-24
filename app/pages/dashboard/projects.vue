div
<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

const portfolio = usePortfolioStore();

function handleProjectImageUpload(event: any, index: number) {
	const file = event.target.files[0];
	if (!file) return;

	(portfolio.projects[index] as any).pendingImageFile = file;

	if (portfolio.projects[index]) {
		portfolio.projects[index].image_url = URL.createObjectURL(file);
	}

	// 3. Tandai ada perubahan
	portfolio.hasUnsavedChanges = true;
}
</script>

<template>
	<div class="relative">
		<div class="flex h-[calc(100vh-160px)] gap-10">
			<div class="flex-1 overflow-y-auto pr-4 no-scrollbar pb-20">
				<div class="flex justify-between items-center mb-8">
					<div>
						<h1 class="text-3xl font-black tracking-tight">Project Saya</h1>
						<p class="text-slate-500 mt-1">Pamerkan karya terbaikmu di sini.</p>
					</div>
					<button
						@click="portfolio.addProject"
						class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
					>
						<Icon name="ph:plus-bold" /> Tambah Project
					</button>
				</div>

				<div
					v-if="portfolio.projects.length === 0"
					class="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center"
				>
					<div
						class="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
					>
						📁
					</div>
					<h3 class="font-bold text-slate-900">Belum ada project</h3>
					<p class="text-slate-400 text-sm mt-1">
						Klik tombol di atas untuk mulai memamerkan karyamu.
					</p>
				</div>

				<div class="space-y-6">
					<div
						v-for="(project, index) in portfolio.projects"
						:key="index"
						class="group relative bg-white border border-slate-200 rounded-[2rem] p-6 hover:border-emerald-300 transition-all shadow-sm"
					>
						<button
							@click="portfolio.deleteProject(index, project.image_url)"
							class="absolute top-4 right-4 z-10 p-2 text-slate-400 opacity-0 transition-colors group-hover:opacity-100 hover:text-red-500"
							title="Hapus Project"
						>
							<Icon name="ph:trash-bold" size="20" />
						</button>

						<div class="flex flex-col md:flex-row gap-6">
							<div class="w-full shrink-0 md:w-40">
								<div
									class="relative aspect-video md:aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group"
								>
									<img
										v-if="project.image_url"
										:src="project.image_url"
										class="w-full h-full object-cover"
									/>
									<div
										v-else
										class="w-full h-full flex flex-col items-center justify-center text-slate-300 text-[10px] font-bold"
									>
										<Icon name="ph:image-square-bold" size="24" class="mb-1" />
										NO IMAGE
									</div>

									<label
										class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-300"
									>
										<input
											type="file"
											class="hidden"
											accept="image/*"
											@change="handleProjectImageUpload($event, index)"
										/>
										<span
											class="text-white text-[10px] font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30"
										>
											{{ project.image_url ? "GANTI" : "UPLOAD" }}
										</span>
									</label>
								</div>
							</div>

							<div class="flex-1 space-y-4">
								<div>
									<input
										v-model="project.title"
										placeholder="Judul Project (Contoh: E-Commerce App)"
										class="w-full bg-transparent text-xl font-black text-slate-800 outline-none transition-colors focus:text-emerald-600"
										@input="portfolio.hasUnsavedChanges = true"
									/>
								</div>

								<textarea
									v-model="project.description"
									placeholder="Ceritakan sedikit tentang project ini..."
									rows="2"
									class="w-full text-sm text-slate-500 outline-none resize-none bg-transparent border-none p-0 focus:ring-0"
									@input="portfolio.hasUnsavedChanges = true"
								></textarea>

								<div
									class="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"
								>
									<Icon name="ph:link-bold" class="text-slate-400" />
									<input
										v-model="project.link_url"
										placeholder="https://project-kamu.com"
										class="bg-transparent text-xs font-mono w-full outline-none text-emerald-600"
										@input="portfolio.hasUnsavedChanges = true"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden xl:flex w-[380px] flex-col">
				<div
					class="relative w-full aspect-[9/18.5] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[8px] border-slate-800"
				>
					<div class="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col">
						<div class="flex-1 overflow-y-auto no-scrollbar p-6">
							<div
								class="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-3 overflow-hidden border-2 border-white shadow-sm"
							>
								<img
									:src="portfolio.profile.avatar_url"
									v-if="portfolio.profile.avatar_url"
									class="w-full h-full object-cover"
								/>
							</div>
							<p class="text-[10px] font-black text-center uppercase tracking-tighter">
								{{ portfolio.profile.full_name || "Your Name" }}
							</p>

							<div class="mt-8 space-y-4">
								<div
									v-for="p in portfolio.projects"
									:key="p.id"
									class="overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
								>
									<div class="aspect-video bg-slate-50">
										<img v-if="p.image_url" :src="p.image_url" class="w-full h-full object-cover" />
									</div>
									<div class="p-3">
										<p class="text-[10px] font-black truncate">{{ p.title || "Project Title" }}</p>
										<p class="text-[8px] text-slate-400 line-clamp-1 mt-1">
											{{ p.description || "Description goes here..." }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						class="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-800 rounded-b-3xl"
					></div>
				</div>
				<p class="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
					Preview Mode
				</p>
			</div>
		</div>

		<!-- Save Changes Bar -->
		<Transition name="slide-up">
			<div
				v-if="portfolio.hasUnsavedChanges"
				class="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/80 p-4 backdrop-blur-sm md:left-64"
			>
				<div class="mx-auto flex max-w-4xl items-center justify-between">
					<p class="text-sm font-medium text-slate-600">
						Kamu punya perubahan yang belum disimpan.
					</p>
					<button
						@click="portfolio.saveProjects"
						class="flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-emerald-600 disabled:bg-slate-300"
						:disabled="portfolio.isLoading"
					>
						<Icon v-if="portfolio.isLoading" name="ph:circle-notch-bold" class="animate-spin" />
						<span v-else>Simpan Perubahan</span>
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform 0.3s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
	transform: translateY(100%);
}
</style>
