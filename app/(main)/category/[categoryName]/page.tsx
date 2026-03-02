import { getArticlesByCategory, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { Tag } from "lucide-react";

export default async function CategoryPage({ params }: { params: { categoryName: string } }) {
  const categorySlug = decodeURIComponent(params.categoryName);

  const [articles, trending, events] = await Promise.all([
    getArticlesByCategory(categorySlug),
    getTrendingItems(),
    getUpcomingEvents(),
  ]);

  // Format Judul (misal: "content-creator" -> "Content Creator")
  const title = categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-10 pb-5 border-b-2 border-gray-100">
            <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20 text-white">
              <Tag className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic uppercase">
              Kategori: <span className="text-primary">{title}</span>
            </h1>
          </div>

          {/* Content Logic */}
          {articles && articles.length > 0 ? (
            <div className="flex flex-col gap-8">
              {articles.map((article) => (
                <LatestNewsArticle key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Kategori Kosong"
              message={`Belum ada berita di kategori ${title}. Tim redaksi kami sedang bekerja keras!`}
            />
          )}
        </div>

        {/* Sidebar Global */}
        <Sidebar trendingItems={trending ?? []} upcomingEvents={events ?? []} />
      </div>
    </main>
  );
}