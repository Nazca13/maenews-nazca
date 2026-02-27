// app/typing/Article.ts

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    description: string;
    category: string;
    author: string;
    publishedAt: string;
    imageUrl: string;
    tags: string[];
    featured: boolean;
    views: number;
}
