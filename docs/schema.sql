-- docs/schema.sql
-- Database Schema DDL for Maenews CMS.
-- Target Database: PostgreSQL (Can be easily adapted to MySQL or SQLite).
-- Defines tables, relationships, constraints, and indexes.

-- ─────────────────────────────────────────────────────────────
-- ENUM TYPES
-- ─────────────────────────────────────────────────────────────

CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'ended');
CREATE TYPE media_type AS ENUM ('image', 'video');

-- ─────────────────────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────────────────────

-- 1. Categories Table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY, -- Slug-based ID
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tags Table
CREATE TABLE tags (
    id VARCHAR(50) PRIMARY KEY, -- Slug-based ID
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Author Profiles Table
CREATE TABLE author_profiles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '{}'::jsonb, -- Store social platforms (Instagram, Twitter, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Articles Table
CREATE TABLE articles (
    id VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL, -- Rich-text (Tiptap HTML)
    image_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    author_id VARCHAR(50) REFERENCES author_profiles(id) ON DELETE SET NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE RESTRICT,
    status article_status DEFAULT 'draft'::article_status,
    featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Article Tags Junction Table (Many-to-Many)
CREATE TABLE article_tags (
    article_id VARCHAR(50) REFERENCES articles(id) ON DELETE CASCADE,
    tag_id VARCHAR(50) REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- 6. Events Table
CREATE TABLE events (
    id VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    location VARCHAR(255) NOT NULL, -- "ICE BSD", "Online", etc.
    location_type VARCHAR(50) NOT NULL DEFAULT 'offline', -- 'offline', 'online', 'hybrid'
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status event_status DEFAULT 'upcoming'::event_status,
    organizer VARCHAR(100) NOT NULL DEFAULT 'Redaksi Maenews',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Gallery / Media Items Table
CREATE TABLE gallery_items (
    id VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    type media_type DEFAULT 'image'::media_type,
    url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g. "Anime", "Cosplay"
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Site Settings Table (Single-row Configuration)
CREATE TABLE site_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1), -- Ensures only one configuration row can exist
    site_name VARCHAR(150) NOT NULL DEFAULT 'Maenews',
    site_description TEXT NOT NULL DEFAULT 'Portal berita anime, manga, dan kultur pop Jepang',
    logo_url TEXT NOT NULL DEFAULT '/logo/logonya.svg',
    favicon_url TEXT NOT NULL DEFAULT '/favicon/favicon.ico',
    social_links JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────
-- INDEXES & OPTIMIZATIONS
-- ─────────────────────────────────────────────────────────────

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status_published ON articles(status) WHERE status = 'published';
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_gallery_type ON gallery_items(type);

-- ─────────────────────────────────────────────────────────────
-- INITIAL DATA SEEDING
-- ─────────────────────────────────────────────────────────────

-- Seed Settings
INSERT INTO site_settings (id, site_name, site_description, logo_url, favicon_url, social_links)
VALUES (
    1,
    'Maenews',
    'Portal berita anime, manga, dan kultur pop Jepang',
    '/logo/logonya.svg',
    '/favicon/favicon.ico',
    '{"instagram": "https://instagram.com/maenews", "facebook": "https://facebook.com/maenews"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Seed Author
INSERT INTO author_profiles (id, name, email, bio)
VALUES (
    'admin-1',
    'Redaksi AnimeFeed',
    'admin@maenews.com',
    'Tim redaksi Maenews yang menyajikan berita anime & manga terbaru.'
) ON CONFLICT (id) DO NOTHING;
