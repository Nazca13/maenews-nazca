import Image from "next/image";
import { Article } from "@/app/typing";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { Badge } from "../../ui/badge";
import { Clock, User, BookOpen } from "lucide-react";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="mb-12">
      <Breadcrumb items={[{ label: article.category, href: "#" }, { label: "Detail", href: "#" }]} />
      <div className="mt-8 mb-8">
        <Badge className="mb-4 bg-secondary text-white font-bold">{article.category}</Badge>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] italic uppercase tracking-tighter">
          {article.title}
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-xs font-black text-gray-400 uppercase tracking-widest mb-10">
        <div className="flex items-center gap-2"><User size={14} className="text-primary" /> {article.author}</div>
        <div className="flex items-center gap-2"><Clock size={14} /> {new Date(article.publishedAt).toLocaleDateString()}</div>
        <div className="flex items-center gap-2"><BookOpen size={14} /> {article.readTimeMinutes} Min Read</div>
      </div>
      <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
        <Image src={article.thumbnailUrl || ""} alt={article.title} fill className="object-cover" priority />
      </div>
    </header>
  );
}