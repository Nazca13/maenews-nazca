"use client";

import { Article } from "@/app/typing";
import { ArticleHeader } from "./ArticleDetailPage/ArticleHeader";
import { ArticleContent } from "./ArticleDetailPage/ArticleContent";
import { AuthorCard } from "./ArticleDetailPage/AuthorCard";
import { TagList } from "./ArticleDetailPage/TagList";
import { ShareButtons } from "../ui/ShareButtons";
import { RelatedArticles } from "./ArticleDetailPage/RelatedArticles";
import { ReadingProgress } from "../ui/ReadingProgress";

export function ArticleDetailPage({ article, related }: { article: Article, related: Article[] }) {
  return (
    <main className="container mx-auto px-4 max-w-5xl py-12 relative">
      <ReadingProgress />
      <ArticleHeader article={article} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <ArticleContent htmlContent={article.content || article.description || ""} />
          <div className="mt-12 pt-10 border-t border-gray-100">
            <ShareButtons url={typeof window !== "undefined" ? window.location.href : ""} title={article.title} />
          </div>
          <AuthorCard author={article.author} />
          <TagList tags={article.tags} />
        </div>
        <aside className="lg:col-span-4">
          <RelatedArticles articles={related} />
        </aside>
      </div>
    </main>
  );
}