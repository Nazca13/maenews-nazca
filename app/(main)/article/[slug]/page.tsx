import { getArticleBySlug, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { ArticleDetail } from "@/app/components/article/ArticleDetail";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { notFound } from "next/navigation";
import { ArticleViewTracker } from "@/app/components/ArticleViewTracker"; // Impor pemicu

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const [trendingItemsRaw, upcomingEventsRaw] = await Promise.all([
    getTrendingItems(),
    getUpcomingEvents(),
  ]);
  const trendingItems = trendingItemsRaw ?? [];
  const upcomingEvents = upcomingEventsRaw ?? [];

  return (
    <>
      {/* Tempatkan pemicu di sini, ia akan berjalan di client */}
      <ArticleViewTracker slug={params.slug} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleDetail article={article} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar
              trendingItems={trendingItems}
              upcomingEvents={upcomingEvents}
            />
          </div>
        </div>
      </main>
    </>
  );
}
