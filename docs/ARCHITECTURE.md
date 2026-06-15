# 🏛️ Maenews — Architecture & Development Guidelines
This document defines the architecture of **Maenews** (Frontend Next.js 14 App Router) and guidelines for both frontend developers and backend developers transitioning the application from **Mock Mode** to a **Real REST API Backend**.

---

## 📁 Folder Structure

Here is the folder mapping for both the public-facing site and the CMS Admin Panel inside the `app/` directory:

| Folder | Description |
|---|---|
| `app/(admin)/` | **CMS Admin Routing Group**: Isolated routing group protected by NextAuth middleware. |
| `app/admin/category/` | Category management featuring a bento layout and inline editing modals. |
| `app/admin/tag/` | Tag management featuring a bento layout and inline editing modals. |
| `app/components/layout/` | Public layout components (`Header`, `Footer`, `Sidebar`, `ClientLayout`). |
| `app/components/layout/admin/` | Admin-specific layout components (`AdminSidebar`, `AdminHeader`). |
| `app/components/ui/admin/` | Admin reusable UI items (`DataTable`, `ConfirmModal`, `FormPageHeader`). |
| `app/components/pages/admin/` | Modular admin sub-pages (Article Editor, Event Forms, Gallery Grid, Settings Forms). |
| `app/typing/` | TypeScript types per entity (`Article.ts`, `Event.ts`, `Admin.ts`, etc.) re-exported via `index.ts`. |
| `app/lib/db.ts` | **Shared In-Memory Database**: Singleton state orchestrating mock mutations across frontend & admin. |
| `app/lib/api.ts` | Public-facing fetcher supporting Strategy Pattern (Mock / Live mode). |
| `app/lib/adminApi.ts` | Admin CMS CRUD fetcher supporting Strategy Pattern (Mock / Live mode). |
| `app/lib/auth.ts` | Credentials authentication logic and local validation rules for NextAuth. |
| `app/query/` | TanStack Query v5 hooks/queries for client-side asynchronous state fetching. |
| `app/data/` | Static navigations and configuration arrays (`Navigation.ts`, `mocks-data.ts`). |

---

## 🔌 API Layer & Strategy Pattern

Both the client API (`app/lib/api.ts`) and CMS API (`app/lib/adminApi.ts`) implement the **Strategy Pattern**. You can switch the entire application between offline/mock and live backend modes by altering the environment variables in `.env.local`:

```env
# Mode: 'mock' (local testing) or 'live' (real backend API)
NEXT_PUBLIC_API_MODE=mock

# Live API endpoint (Golang backend)
NEXT_PUBLIC_API_BASE_URL=https://golang-maenews-animae-id2569-ksgm0g96.leapcell.dev/api/v1
```

### Data Flow diagram (Mock vs Live)

```
[ CMS Admin Actions ]           [ Public Viewers ]
        │                               │
        ▼                               ▼
 [ lib/adminApi.ts ]             [ lib/api.ts ]
        │                               │
        ├─────────► (If "mock") ◄───────┤
        │        [ Shared db.ts ]       │
        │      (InMemory Database)      │
        │                               │
        └─────────► (If "live") ◄───────┘
                 [ Real Golang ]
                 [ REST Backend]
```

---

## 🔒 Authentication Flow (Admin Panel)

* **Route Protection:** Access to any `/admin` route (excluding `/admin/login`) is guarded by NextAuth middleware defined in `middleware.ts`. Unauthorized traffic is redirected to `/admin/login`.
* **Local Credentials (Mock Mode):**
  * **Email:** `admin@maenews.com`
  * **Password:** `admin123`
* Credentials authorization occurs offline in the `authorize` callback within `app/lib/auth.ts`. When moving to a live backend, this should execute a fetch call to verify credentials with the backend JWT server.

---

## 💾 Shared In-Memory Database (`app/lib/db.ts`)

To prevent the CMS mutations from being isolated from the user-facing side during mock development, `db.ts` exports a singleton state instance. 
* Any edits (e.g. updating an article, renaming a category, removing a tag, changing site names, toggling featured articles) mutate the singleton array.
* The public pages immediately read from this modified state, providing a full, realistic, zero-database local experience.
* **Inline Edit Modals:** Category and Tag page rows contain inline Edit modals. Updating their name triggers a cascade rename across the `db.articles` arrays to ensure integrity.

---

## 🛠️ Backend Handoff Guide (Transitioning to Real REST Backend)

To swap the offline mock data for a live Golang/REST API, the backend developer and frontend developer must do the following:

### 1. Database Schema DDL
The backend developer should use the provided index-optimized PostgreSQL DDL schema located in `docs/schema.sql` to initialize their database tables:
* `categories`, `tags`, `author_profiles`, `articles`, `article_tags` (many-to-many junction), `events`, `gallery_items`, and `site_settings`.

### 2. Implementing OpenAPI/Swagger Endpoints
The backend developer must build REST endpoints matching the specifications in `docs/openapi.yaml`:
* **Public Client endpoints:**
  * `GET /articles` - List all published articles.
  * `GET /articles/{slug}` - Fetch single published article.
  * `POST /articles/{slug}/view` - Increment article view counter.
  * `GET /category/{categoryName}` - List articles by category.
  * `GET /tag/{tagName}` - List articles by tag.
  * `GET /events/upcoming` - Get upcoming events list.
  * `GET /events/{slug}` - Fetch single event details.
  * `GET /trending` - List trending/featured articles.
  * `GET /search/{query}` - Keyword article search.
* **CMS Admin endpoints (Require Bearer Authentication):**
  * `POST /articles` - Create new article.
  * `PUT /articles/{slug}` - Update article.
  * `DELETE /articles/{slug}` - Delete article.
  * `GET /categories` - List categories (with post counts).
  * `POST /categories` - Create category.
  * `PUT /categories/{slug}` - Rename category.
  * `DELETE /categories/{slug}` - Delete category.
  * `GET /tags` - List tags.
  * `POST /tags` - Create tag.
  * `PUT /tags/{slug}` - Update tag.
  * `DELETE /tags/{slug}` - Delete tag.
  * `GET/POST/DELETE /gallery` - Manage media uploads.
  * `GET/PUT /settings/site` - Config site meta.
  * `GET/PUT /settings/author` - Config author info.

### 3. Integrating endpoints on Frontend
Once the REST server is ready:
1. Update `.env.local` to:
   ```env
   NEXT_PUBLIC_API_MODE=live
   NEXT_PUBLIC_API_BASE_URL=https://your-real-backend-api.com/api/v1
   ```
2. In `app/lib/auth.ts`, update `authorize()` to verify credentials with the backend JWT login endpoint and return the JWT token.
3. Replace the mock return values in `app/lib/adminApi.ts` with real `fetch` or `apiClient` Axios calls to the admin endpoints. The public `app/lib/api.ts` is already wired to fetch from the live server endpoints when `live` mode is selected.