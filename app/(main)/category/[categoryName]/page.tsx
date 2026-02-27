import { getArticlesByCategory, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { Tag } from "lucide-react";
import { Article } from "@/app/typing";

// Tipe untuk params yang diterima oleh halaman
type Props = {
  params: {
    categoryName: string;
  };
};

// Fungsi untuk mengubah slug URL (mis: "content-creator") menjadi judul ("Content Creator")
function formatCategoryTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Halaman ini adalah Server Component
export default async function CategoryPage({ params }: Props) {
  // Mengambil dan mendekode nama kategori dari URL
  const categorySlug = decodeURIComponent(params.categoryName);

  // Mengambil data artikel untuk kategori ini dan data untuk sidebar dari API
  const [articles, trendingItems, upcomingEvents] = await Promise.all([
    getArticlesByCategory(categorySlug),
    getTrendingItems(),
    getUpcomingEvents(),
  ]);

  const title = formatCategoryTitle(categorySlug);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Konten Artikel Kategori */}
        <div className="lg:col-span-2">
          <section>
            {/* Judul Halaman Kategori */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <Tag className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">
                Kategori: {title}
              </h1>
            </div>

            {/* Daftar Artikel atau Pesan Jika Kosong */}
            {(articles ?? []).length > 0 ? (
              <div className="flex flex-col gap-6">
                {(articles as Article[]).map((article) => (
                  <LatestNewsArticle key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-700">Oops!</h2>
                <p className="text-gray-500 mt-2">
                  Belum ada artikel di kategori {title}.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Kolom Kanan: Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar
            trendingItems={trendingItems ?? []}
            upcomingEvents={upcomingEvents ?? []}
          />
        </div>
      </div>
    </main>
  );
}
