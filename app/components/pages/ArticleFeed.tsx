"use client";

import { useState, useRef, useCallback } from "react";
import { Article } from "@/app/typing";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";
import { Loader2, Flame } from "lucide-react";

const ARTICLES_PER_PAGE = 5;

interface ArticleFeedProps {
  initialArticles: Article[];
  articlesToLoad: Article[];
}

export function ArticleFeed({ initialArticles, articlesToLoad }: ArticleFeedProps) {
  const [page, setPage] = useState(0);
  const [loadedArticles, setLoadedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articlesToLoad.length > 0);

  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreArticles = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulasi jeda jaringan untuk efek loading
    setTimeout(() => {
      const start = page * ARTICLES_PER_PAGE;
      const end = start + ARTICLES_PER_PAGE;
      const newArticles = articlesToLoad.slice(start, end);

      if (newArticles.length > 0) {
        setLoadedArticles((prev) => [...prev, ...newArticles]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000); // Jeda 1 detik
  }, [page, isLoading, hasMore, articlesToLoad]);

  const lastArticleElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreArticles();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMoreArticles]
  );

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-secondary" />
        <h2 className="text-xl font-bold text-secondary">Berita Terbaru</h2>
      </div>
      <div className="flex flex-col gap-6">
        {/* Menampilkan artikel awal dari server */}
        {initialArticles.map((article) => (
          <LatestNewsArticle key={article.id} article={article} />
        ))}
        {/* Menampilkan artikel yang di-load secara dinamis */}
        {loadedArticles.map((article, index) => {
          if (loadedArticles.length === index + 1) {
            return (
              <div ref={lastArticleElementRef} key={article.id}>
                <LatestNewsArticle article={article} />
              </div>
            );
          }
          return <LatestNewsArticle key={article.id} article={article} />;
        })}
      </div>

      {/* Indikator Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Memuat lebih banyak...</span>
        </div>
      )}
    </section>
  );
}
