import { Article } from "@/app/typing";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";

export function RelatedArticles({ articles }: { articles: Article[] }) {
    if (!articles || articles.length === 0) return null;
    return (
        <section className="mt-16 pt-10 border-t border-gray-100">
            <h3 className="text-2xl font-black italic uppercase mb-8">Artikel Terkait</h3>
            <div className="flex flex-col gap-6">
                {articles.map(article => (
                    <LatestNewsArticle key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
