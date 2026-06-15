// app/lib/api.ts
// ===================================================================
// API Service — Strategy Pattern (Mock / Live)
// Connects the mock service directly to the shared InMemoryDatabase `db`.
// Changes in the CMS admin panel are dynamically reflected on the client site.
// ===================================================================

import { Article, TrendingItem, Event, ApiMode, ApiConfig } from "@/app/typing";
import { db } from "./db";

// --------------- Configuration ---------------

const API_CONFIG: ApiConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://golang-maenews-animae-id2569-ksgm0g96.leapcell.dev/api/v1",
  mode: (process.env.NEXT_PUBLIC_API_MODE as ApiMode) || "mock",
};

// --------------- Service Interface ---------------

interface ArticleService {
  getAllArticles: () => Promise<Article[] | null>;
  getArticleBySlug: (slug: string) => Promise<Article | null>;
  getArticlesByCategory: (categoryName: string) => Promise<Article[] | null>;
  getArticlesByTag: (tagName: string) => Promise<Article[] | null>;
  searchArticles: (query: string) => Promise<Article[] | null>;
  incrementArticleView: (slug: string) => void;
  getTrendingItems: () => Promise<TrendingItem[] | null>;
  getUpcomingEvents: () => Promise<Event[] | null>;
  getEventBySlug: (slug: string) => Promise<Event | null>;
}

// --------------- Live API Service ---------------

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`API Error on ${endpoint}: ${res.statusText}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
}

const liveService: ArticleService = {
  getAllArticles: () => fetchAPI<Article[]>("/articles"),
  getArticleBySlug: (slug) => fetchAPI<Article>(`/articles/${slug}`),
  getArticlesByCategory: (categoryName) =>
    fetchAPI<Article[]>(`/category/${categoryName}`),
  getArticlesByTag: (tagName) => fetchAPI<Article[]>(`/tag/${tagName}`),
  searchArticles: (query) => fetchAPI<Article[]>(`/search/${query}`),
  incrementArticleView: (slug) => {
    fetch(`${API_CONFIG.baseUrl}/articles/${slug}/view`, { method: "POST" });
  },
  getTrendingItems: () => fetchAPI<TrendingItem[]>("/trending"),
  getUpcomingEvents: () => fetchAPI<Event[]>("/events/upcoming"),
  getEventBySlug: (slug) => fetchAPI<Event>(`/events/${slug}`),
};

// --------------- Mock Service (Connected to shared db) ---------------

/** Normalizes a URL slug (e.g. "content-creator") to title case ("Content Creator"). */
function normalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const mockService: ArticleService = {
  getAllArticles: async () => {
    // Only return published articles to public users
    return db.articles.filter((a) => a.status === "published");
  },

  getArticleBySlug: async (slug) => {
    return db.articles.find((a) => a.slug === slug && a.status === "published") ?? null;
  },

  getArticlesByCategory: async (categoryName) => {
    const normalized = normalizeSlug(categoryName);
    return db.articles.filter(
      (a) =>
        a.status === "published" &&
        a.category.toLowerCase() === normalized.toLowerCase()
    );
  },

  getArticlesByTag: async (tagName) => {
    const normalized = normalizeSlug(tagName);
    return db.articles.filter(
      (a) =>
        a.status === "published" &&
        a.tags.some((t) => t.toLowerCase() === normalized.toLowerCase())
    );
  },

  searchArticles: async (query) => {
    const q = query.toLowerCase();
    return db.articles.filter(
      (a) =>
        a.status === "published" &&
        (a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  },

  incrementArticleView: (slug) => {
    const article = db.articles.find((a) => a.slug === slug);
    if (article) {
      article.views = (article.views || 0) + 1;
      console.log(`[MOCK] View tracked. Current views for ${slug}: ${article.views}`);
    }
  },

  getTrendingItems: async () => {
    // Return published articles that are flagged as featured/trending
    return db.articles
      .filter((a) => a.status === "published" && a.featured)
      .map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description || "",
        slug: a.slug,
        category: a.category,
        publishedAt: a.publishedAt,
        imageUrl: a.imageUrl,
      }));
  },

  getUpcomingEvents: async () => {
    return db.events;
  },

  getEventBySlug: async (slug) => {
    return db.events.find((e) => e.slug === slug) ?? null;
  },
};

// --------------- Export Active Service ---------------

const activeService: ArticleService =
  API_CONFIG.mode === "live" ? liveService : mockService;

export const getAllArticles = activeService.getAllArticles;
export const getArticleBySlug = activeService.getArticleBySlug;
export const getArticlesByCategory = activeService.getArticlesByCategory;
export const getArticlesByTag = activeService.getArticlesByTag;
export const searchArticles = activeService.searchArticles;
export const incrementArticleView = activeService.incrementArticleView;
export const getTrendingItems = activeService.getTrendingItems;
export const getUpcomingEvents = activeService.getUpcomingEvents;
export const getEventBySlug = activeService.getEventBySlug;