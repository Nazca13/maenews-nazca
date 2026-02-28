import { getArticleBySlug, getAllArticles, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { ArticleDetailPage } from "@/app/components/pages/ArticleDetailPage";
import { notFound } from "next/navigation";
import { ArticleViewTracker } from "@/app/components/ArticleViewTracker";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

// Task #76: Dynamic Metadata — judul tab browser berubah sesuai artikel
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Artikel Tidak Ditemukan — Maenews" };
  }
  return {
    title: `${article.title} — Maenews`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Ambil semua artikel untuk cari yang terkait (kategori sama, bukan artikel ini)
  const allArticles = await getAllArticles();
  const related = (allArticles ?? [])
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 4);

  return (
    <>
      <ArticleViewTracker slug={params.slug} />
      <ArticleDetailPage article={article} related={related} />
    </>
  );
}

