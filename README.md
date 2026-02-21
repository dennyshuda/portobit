# 🚀 Portobit - Micro-SaaS Portfolio Builder

**Portobit** adalah aplikasi Software‑as‑a‑Service (SaaS) untuk membuat portofolio online instan. Pengguna mendaftar (gratis atau berlangganan) lalu mengisi data proyek, bio dan tema; perubahan langsung terlihat melalui _Live Preview_. Portobit ditujukan bagi freelancer, developer, dan kreator yang ingin showcase karya tanpa repot setup.

> 📝 Backend multi‑tenant dengan model free/paid, _upgrade ke PRO_ akan membuka fitur kustomisasi dan statistik.

## 🛠️ Tech Stack

_Portobit dibangun dengan fokus skalabilitas dan pengembangan cepat; seluruh komponen cocok untuk multi‑tenant SaaS._

- **Framework:** [Nuxt](https://nuxt.com/) (Vue.js)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Deployment:** Vercel

---

## 🚀 Quickstart (Development)

1. Pastikan Node.js 18+ dan pnpm atau npm terpasang.
2. Clone repositori dan install dependensi:
   ```bash
   git clone https://github.com/dennyshuda/portobit.git
   cd portobit
   pnpm install
   ```
3. Siapkan variabel lingkungan (`.env`) berbasis `.env.example` dengan kredensial Supabase.
4. Jalankan server lokal:
   ```bash
   pnpm dev
   ```
5. Buka http://localhost:3000 dan daftar akun baru untuk mencoba alur SaaS.

## 💡 How It Works (SaaS Flow)

1. **User Sign‑Up:** Pengguna membuat akun via Google atau email.
2. **Portfolio Editor:** Di dashboard, mereka memasukkan info profil, menambahkan proyek, memilih template.
3. **Live Preview:** Setiap perubahan langsung tampil di pratinjau; halaman publik di `/<username>`.
4. **Subscription:** Akun default gratis; opsi `PRO` tersedia untuk fitur tambahan.
5. **Admin & Monitoring:** Backend menyimpan data multi‑tenant; ada tabel `plans`, `subscriptions`, dan `analytics`.

---

## 🤝 Cara Kontribusi

Terima kasih telah berminat berkontribusi pada **Portobit**! Berikut beberapa langkah sederhana untuk membantu kamu memulai:

1. **Fork** repositori ini ke akun GitHub-mu.
2. **Clone** hasil fork ke mesin lokal:
   ```bash
   git clone https://github.com/<username>/portobit.git
   ```
3. **Buat branch** baru berdasarkan fitur/bug yang ingin kamu kerjakan:
   ```bash
   git checkout -b fitur/nama-fitur-atau-bugfix
   ```
4. **Kerjakan perubahan** di branch tersebut. Pastikan untuk menambahkan atau mengupdate dokumen bila diperlukan.
5. **Commit** dengan pesan jelas dan bermakna:
   ```bash
   git add .
   git commit -m "Deskripsi singkat perubahan"
   ```
6. **Push** branch ke GitHub fork-mu:
   ```bash
   git push origin fitur/nama-fitur-atau-bugfix
   ```
7. Buat **Pull Request** ke branch `main` di repositori utama. Jelaskan apa yang kamu ubah dan alasannya.

> ⚠️ Sebelum mengirim PR, pastikan semua perubahan lulus pengecekan (lint/test) dan bahwa kode tetap mengikuti gaya proyek.

### 📌 Aturan tambahan

- Jaga agar commit kecil dan fokus pada satu perubahan.
- Sertakan screenshot atau video jika kontribusimu berhubungan dengan UI.
- Gunakan bahasa Indonesia atau Inggris yang mudah dimengerti.

Kami sangat menghargai setiap kontribusi — baik itu perbaikan bug, fitur baru, dokumentasi, atau ide!
