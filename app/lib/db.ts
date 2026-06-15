// app/lib/db.ts
// Shared mutable in-memory database for local/mock development.
// This links the CMS admin dashboard mutations directly to the user-facing pages.

import {
  featuredArticle,
  mockArticles,
  mockCategories,
  mockTags,
  upcomingEvents,
  mockGallery,
} from "@/app/data/mocks-data";
import { Article, Event, GalleryItem } from "@/app/typing";
import { ArticleWithStatus, ArticleStatus, SiteSettings, AuthorProfile } from "@/app/typing/Admin";

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface TagRow {
  id: string;
  name: string;
  slug: string;
  count: number;
}

class InMemoryDatabase {
  articles: ArticleWithStatus[];
  events: Event[];
  gallery: GalleryItem[];
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  siteSettings: SiteSettings;
  authorProfile: AuthorProfile;

  constructor() {
    this.articles = [
      { ...featuredArticle, status: "published" as ArticleStatus },
      ...mockArticles.map((a, i) => ({
        ...a,
        status: (i % 4 === 0 ? "draft" : "published") as ArticleStatus,
      })),
    ];
    this.events = [...upcomingEvents];
    this.gallery = [...mockGallery];
    this.categories = mockCategories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    }));
    this.tags = mockTags.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
    }));
    this.siteSettings = {
      siteName: "Maenews",
      siteDescription: "Portal berita anime, manga, dan kultur pop Jepang",
      logoUrl: "/logo/logonya.svg",
      faviconUrl: "/favicon/favicon.ico",
      socialLinks: {
        instagram: "https://instagram.com/maenews",
        facebook: "https://facebook.com/maenews",
      },
    };
    this.authorProfile = {
      id: "admin-1",
      name: "Redaksi AnimeFeed",
      email: "admin@maenews.com",
      avatarUrl: "",
      bio: "Tim redaksi Maenews yang menyajikan berita anime & manga terbaru.",
      socialLinks: {},
    };
  }
}

// Global singleton instance so that it persists during hot reloads as much as possible
const globalForDb = global as unknown as { dbInstance?: InMemoryDatabase };

export const db = globalForDb.dbInstance || new InMemoryDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbInstance = db;
}
