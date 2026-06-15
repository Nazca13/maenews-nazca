// app/typing/Admin.ts — CMS Admin types

import { Article, Event, GalleryItem } from "./index";

// ── Auth ──────────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatarUrl?: string;
}

// ── Article CRUD ──────────────────────────────────
export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  author: string;
  status: ArticleStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ArticleWithStatus extends Article {
  status: ArticleStatus;
  updatedAt?: string;
}

// ── Event CRUD ────────────────────────────────────
export type EventType = "online" | "offline" | "hybrid";

export interface EventFormData {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  location: string;
  startDate: string;
  endDate: string;
  status: Event["status"];
  organizer: string;
  tags: string[];
  eventType: EventType;
  registrationUrl?: string;
}

// ── Gallery CRUD ──────────────────────────────────
export interface GalleryUploadData {
  title: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl: string;
  category: string;
  caption?: string;
  altText?: string;
}

// ── Settings ──────────────────────────────────────
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface AuthorProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

// ── Category & Tag ────────────────────────────────
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
}

export interface TagFormData {
  name: string;
  slug: string;
}

// ── Dashboard Stats ───────────────────────────────
export interface DashboardStats {
  totalArticles: number;
  totalEvents: number;
  totalGallery: number;
  totalViews: number;
  recentArticles: ArticleWithStatus[];
  recentEvents: Event[];
}
