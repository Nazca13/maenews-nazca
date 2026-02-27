# 🏛️ Maenews Architecture & Guidelines

## 📁 Struktur Folder

Berikut adalah peta folder utama di dalam direktori `app/` (Tanpa folder src):

* **app/components/layout/**: Komponen global yang membungkus konten — `Header`, `Footer`, `Sidebar`, `ClientLayout`.
* **app/components/ui/**: Komponen atomik (kecil) yang reusable — `Button`, `Input`, `Badge`.
* **app/components/pages/**: Komponen besar yang spesifik untuk bagian halaman tertentu — `Hero`, `FeaturedRow`, `ArticleFeed`.
* **app/components/article/**: Komponen terkait tampilan artikel — `ArticleDetail`, `LatestNewsArticle`, `LatestNewsSection`.
* **app/components/slider/**: Komponen slider/carousel — `SliderNews`.
* **app/typing/**: Pusat definisi tipe data TypeScript, di-split per entitas:
  * `Article.ts`, `Event.ts`, `TrendingItem.ts`, `Navigation.ts`, `Api.ts`
  * `index.ts` — barrel file yang re-export semua types.
* **app/lib/**: Fungsi utilitas, konfigurasi API fetcher (`api.ts`), dan helper (`utils.ts`).
* **app/data/mocks/**: Mock/fixture data per entitas — `articles.ts`, `trending.ts`, `events.ts`.
* **app/data/**: Data statis konfigurasi — `Navigation.ts`.
* **app/hooks/**: Custom React hooks — `useArticles.ts`, `use-mobile.tsx`.
* **app/utils/**: Pure utility functions — `dateUtils.ts`.

---

## 🔌 API Layer (`app/lib/api.ts`)

API service menggunakan **strategy pattern** untuk switch antara mock dan live mode:

```
NEXT_PUBLIC_API_MODE=mock  →  Data dari app/data/mocks/
NEXT_PUBLIC_API_MODE=live  →  Fetch dari REST API
```

Lihat `.env.example` untuk konfigurasi dan `docs/openapi.yaml` untuk API contract.

---

## 🚦 Aturan Per Folder

* **UI Components**: **DILARANG** fetch API atau logic bisnis; hanya menerima data lewat props.
* **Lib & API**: **DILARANG** memasukkan JSX/UI; hanya fungsi murni (utility).
* **Typing**: **WAJIB** menamai file sesuai entitas data (`Article.ts`, `Event.ts`).
* **Data/Mocks**: Hanya berisi data statis dan fixture; tidak boleh ada logic.

---

## ✅ Do's

* **PascalCase** untuk file komponen (`HeroCard.tsx`).
* **Modularitas** — Pecah komponen > 150 baris menjadi sub-komponen.
* **Type Safety** — Gunakan interface dari `typing/`; hindari `any`.
* **Semantic HTML** — Tag yang sesuai untuk SEO portal berita.
* **Environment Variables** — Simpan konfigurasi di `.env.local`, dokumentasikan di `.env.example`.

---

## ❌ Don'ts

* **Avoid `any`** — Gunakan types dari `typing/`.
* **Inline Styles** — Gunakan Tailwind CSS utility classes.
* **Hardcoded Values** — Jangan simpan API Key/URL di komponen; gunakan `.env`.
* **Direct State Mutation** — Gunakan setter dari `useState`.
* **Comment/Uncomment Switching** — Gunakan env-based strategy pattern di `api.ts`.