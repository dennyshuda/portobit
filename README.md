# 🚀 Portobit - Micro-SaaS Showcase Portfolio

**Portobit** adalah platform Micro-SaaS yang memungkinkan freelancer, developer, dan kreator untuk membangun portofolio profesional dalam hitungan detik. Dengan fitur _Live Preview_, pengguna dapat melihat perubahan tampilan secara real-time saat mereka mengisi data.

## 🛠️ Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue.js)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Deployment:** Vercel / Netlify

---

## 🏗️ Project Structure

```text
portobit/
├── components/          # Reusable UI Components
│   ├── dashboard/       # Editor & Input components
│   ├── preview/         # Live Preview components
│   └── shared/          # Global UI (Button, Input, etc)
├── layouts/             # Page Layouts (Default, Dashboard)
├── pages/               # Application Routes
│   ├── index.vue        # Landing Page
│   ├── dashboard/       # User Dashboard (Private)
│   └── [username].vue   # Public Portfolio (SSR)
├── server/              # Server Routes & API
├── stores/              # Pinia Stores (State Management)
└── supabase/            # Database Schema & Migrations
```

## 📋 Features & Roadmap

### Phase 1: Core Engine

- [x] Setup Nuxt 4 & Tailwind CSS
- [ ] Live Preview Editor (v-model & Pinia)
- [ ] Dynamic Routing /[username]

### Phase 2: Database & Auth

- [ ] Supabase Auth (Google & GitHub)
- [ ] CRUD Profile & Projects
- [ ] Image Upload (Supabase Storage)

### Phase 3: Customization

- [ ] Multi-template Support
- [ ] Custom Theme Color Picker
- [ ] Drag & Drop Reorder Projects

### Phase 4: Analytics & SEO

- [ ] SEO Meta Tags for each user
- [ ] Simple Visitor Analytics
- [ ] Export to PDF feature

## 🗄️ Skema Database (Overview)

| table         | keterangan                                             |
| ------------- | ------------------------------------------------------ |
| profiles      | Data utama user (username, bio, avatar, status PRO).   |
| projects      | Daftar karya (judul, deskripsi, thumbnail, urutan).    |
| plans         | Definisi paket harga (Free, Monthly, Yearly).          |
| subscriptions | Log transaksi, status langganan, & tanggal kadaluarsa. |
| analytics     | Data kunjungan profil (unique views, referer).         |
