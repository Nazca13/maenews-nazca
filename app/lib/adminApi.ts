// app/lib/adminApi.ts — Admin CRUD operations (Strategy Pattern)
// Connects to the shared InMemoryDatabase `db` for fully synchronized mock execution.

import {
  ArticleWithStatus,
  ArticleFormData,
  ArticleStatus,
  EventFormData,
  GalleryUploadData,
  SiteSettings,
  AuthorProfile,
  CategoryFormData,
  TagFormData,
  DashboardStats,
} from "@/app/typing/Admin";
import { Event, GalleryItem } from "@/app/typing";
import { db } from "@/app/lib/db";

// ── Helpers ───────────────────────────────────────
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // collapse consecutive hyphens
}

// ── Admin API Interface ───────────────────────────
export interface AdminApiService {
  getDashboardStats: () => Promise<DashboardStats>;
  getAdminArticles: () => Promise<ArticleWithStatus[]>;
  getAdminArticleBySlug: (slug: string) => Promise<ArticleWithStatus | null>;
  createArticle: (data: ArticleFormData) => Promise<ArticleWithStatus>;
  updateArticle: (slug: string, data: Partial<ArticleFormData>) => Promise<ArticleWithStatus | null>;
  deleteArticle: (slug: string) => Promise<boolean>;
  getAdminEvents: () => Promise<Event[]>;
  getAdminEventBySlug: (slug: string) => Promise<Event | null>;
  createEvent: (data: EventFormData) => Promise<Event>;
  updateEvent: (slug: string, data: Partial<EventFormData>) => Promise<Event | null>;
  deleteEvent: (slug: string) => Promise<boolean>;
  getAdminGallery: () => Promise<GalleryItem[]>;
  uploadGalleryItem: (data: GalleryUploadData) => Promise<GalleryItem>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  getSiteSettings: () => Promise<SiteSettings>;
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<SiteSettings>;
  getAuthorProfile: () => Promise<AuthorProfile>;
  updateAuthorProfile: (data: Partial<AuthorProfile>) => Promise<AuthorProfile>;
  getCategories: () => Promise<{ id: string; name: string; slug: string; count: number }[]>;
  createCategory: (data: CategoryFormData) => Promise<void>;
  updateCategory: (slug: string, name: string) => Promise<boolean>;
  deleteCategory: (slug: string) => Promise<boolean>;
  getTags: () => Promise<{ id: string; name: string; slug: string; count: number }[]>;
  createTag: (data: TagFormData) => Promise<void>;
  updateTag: (slug: string, name: string) => Promise<boolean>;
  deleteTag: (slug: string) => Promise<boolean>;
  getTrendingManager: () => Promise<{ id: string; title: string; slug: string; pinned: boolean }[]>;
  toggleTrendingPin: (slug: string) => Promise<void>;
}

// ── Mock Service ──────────────────────────────────
const mockAdminService: AdminApiService = {
  getDashboardStats: async () => ({
    totalArticles: db.articles.length,
    totalEvents: db.events.length,
    totalGallery: db.gallery.length,
    totalViews: db.articles.reduce((sum, a) => sum + (a.views || 0), 0),
    recentArticles: db.articles.slice(0, 5),
    recentEvents: db.events.slice(0, 3),
  }),

  // Articles
  getAdminArticles: async () => db.articles,
  getAdminArticleBySlug: async (slug) =>
    db.articles.find((a) => a.slug === slug) ?? null,
  createArticle: async (data) => {
    const article: ArticleWithStatus = {
      id: generateId(),
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt,
      description: data.description,
      content: data.content,
      imageUrl: data.imageUrl,
      thumbnailUrl: data.thumbnailUrl || data.imageUrl,
      author: data.author,
      tags: data.tags,
      category: data.category,
      publishedAt: new Date().toISOString(),
      featured: data.featured,
      views: 0,
      status: data.status,
    };
    db.articles.unshift(article);
    return article;
  },
  updateArticle: async (slug, data) => {
    const idx = db.articles.findIndex((a) => a.slug === slug);
    if (idx === -1) return null;
    db.articles[idx] = { ...db.articles[idx], ...data, updatedAt: new Date().toISOString() };
    return db.articles[idx];
  },
  deleteArticle: async (slug) => {
    const idx = db.articles.findIndex((a) => a.slug === slug);
    if (idx === -1) return false;
    db.articles.splice(idx, 1);
    return true;
  },

  // Events
  getAdminEvents: async () => db.events,
  getAdminEventBySlug: async (slug) =>
    db.events.find((e) => e.slug === slug) ?? null,
  createEvent: async (data) => {
    const event: Event = {
      id: generateId(),
      title: data.title,
      slug: data.slug || slugify(data.title),
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      organizer: data.organizer,
      tags: data.tags,
    };
    db.events.push(event);
    return event;
  },
  updateEvent: async (slug, data) => {
    const idx = db.events.findIndex((e) => e.slug === slug);
    if (idx === -1) return null;
    db.events[idx] = { ...db.events[idx], ...data };
    return db.events[idx];
  },
  deleteEvent: async (slug) => {
    const idx = db.events.findIndex((e) => e.slug === slug);
    if (idx === -1) return false;
    db.events.splice(idx, 1);
    return true;
  },

  // Gallery
  getAdminGallery: async () => db.gallery,
  uploadGalleryItem: async (data) => {
    const item: GalleryItem = {
      id: generateId(),
      title: data.title,
      type: data.type,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl || data.url,
      category: data.category,
      uploadedAt: new Date().toISOString(),
    };
    db.gallery.unshift(item);
    return item;
  },
  deleteGalleryItem: async (id) => {
    const idx = db.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return false;
    db.gallery.splice(idx, 1);
    return true;
  },

  // Settings
  getSiteSettings: async () => db.siteSettings,
  updateSiteSettings: async (data) => {
    db.siteSettings = { ...db.siteSettings, ...data };
    return db.siteSettings;
  },
  getAuthorProfile: async () => db.authorProfile,
  updateAuthorProfile: async (data) => {
    db.authorProfile = { ...db.authorProfile, ...data };
    return db.authorProfile;
  },

  // Categories
  getCategories: async () =>
    db.categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: db.articles.filter((a) => a.category.toLowerCase() === c.name.toLowerCase()).length,
    })),
  createCategory: async (data) => {
    const finalSlug = data.slug || slugify(data.name);
    // Avoid duplicates
    if (!db.categories.some((c) => c.slug === finalSlug)) {
      db.categories.push({
        id: finalSlug,
        name: data.name,
        slug: finalSlug,
      });
    }
  },
  updateCategory: async (slug, name) => {
    const cat = db.categories.find((c) => c.slug === slug);
    if (!cat) return false;
    
    // Update matching category name in articles to keep them aligned
    db.articles.forEach((art) => {
      if (art.category.toLowerCase() === cat.name.toLowerCase()) {
        art.category = name;
      }
    });

    cat.name = name;
    cat.slug = slugify(name);
    return true;
  },
  deleteCategory: async (slug) => {
    const idx = db.categories.findIndex((c) => c.slug === slug);
    if (idx === -1) return false;
    db.categories.splice(idx, 1);
    return true;
  },

  // Tags
  getTags: async () =>
    db.tags.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      count: db.articles.filter((a) => a.tags.some((tag) => tag.toLowerCase() === t.name.toLowerCase())).length,
    })),
  createTag: async (data) => {
    const finalSlug = data.slug || slugify(data.name);
    if (!db.tags.some((t) => t.slug === finalSlug)) {
      db.tags.push({
        id: finalSlug,
        name: data.name,
        slug: finalSlug,
      });
    }
  },
  updateTag: async (slug, name) => {
    const tag = db.tags.find((t) => t.slug === slug);
    if (!tag) return false;

    // Update tags array in articles to keep them aligned
    db.articles.forEach((art) => {
      art.tags = art.tags.map((t) => (t.toLowerCase() === tag.name.toLowerCase() ? name : t));
    });

    tag.name = name;
    tag.slug = slugify(name);
    return true;
  },
  deleteTag: async (slug) => {
    const idx = db.tags.findIndex((t) => t.slug === slug);
    if (idx === -1) return false;
    db.tags.splice(idx, 1);
    return true;
  },

  // Trending
  getTrendingManager: async () =>
    db.articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      pinned: a.featured === true,
    })),
  toggleTrendingPin: async (slug) => {
    const article = db.articles.find((a) => a.slug === slug);
    if (article) {
      article.featured = !article.featured;
    }
  },
};

// ── Export ─────────────────────────────────────────
export const adminApi = mockAdminService;
