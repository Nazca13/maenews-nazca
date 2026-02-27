import { searchArticles, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { Search } from "lucide-react";

type Props = {
  params: { query: string };
};

export default async function SearchPage({ params }: Props) {
  // Mengambil dan mendekode query pencarian dari URL
  const query = decodeURIComponent(params.query);

  // Mengambil data hasil pencarian dan data untuk sidebar
  const [articles, trendingItems, upcomingEvents] = await Promise.all([
    searchArticles(query),
    getTrendingItems(),
    getUpcomingEvents(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Hasil Pencarian */}
        <div className="lg:col-span-2">
          <section>
            {/* Judul Halaman */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <Search className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Hasil pencarian untuk:</p>
                <h1 className="text-3xl font-bold text-gray-900">
                  {query}
                </h1>
              </div>
            </div>

            {/* Daftar Artikel atau Pesan Jika Kosong */}
            {articles && articles.length > 0 ? (
              <div className="flex flex-col gap-6">
                {articles.map((article) => (
                  <LatestNewsArticle key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-700">Tidak Ditemukan</h2>
                <p className="text-gray-500 mt-2">
                  Tidak ada artikel yang cocok dengan pencarian Anda. Coba kata kunci lain.
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
