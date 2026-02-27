"use client";

import { Article } from "@/app/typing";
import { LatestNewsArticle } from "./LatestNewsArticle";
import { Flame } from "lucide-react";

interface LatestNewsSectionProps {
  articles: Article[];
  title?: string; // Judul sekarang bersifat opsional
}

export function LatestNewsSection({ title, articles }: LatestNewsSectionProps) {
  return (
    <section>
      {/* Judul hanya akan ditampilkan jika prop 'title' diberikan */}
      {title && (
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-secondary" />
          <h2 className="text-xl font-bold text-secondary">{title}</h2>
        </div>
      )}
      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <LatestNewsArticle key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
