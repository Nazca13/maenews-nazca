import { Article } from "@/app/typing";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

export function HeroSection({ article }: { article: Article }) {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-2xl bg-gray-900">
      <Image
        src={article.thumbnailUrl || ""}
        alt={article.title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
        <span className="bg-primary text-white px-4 py-1 rounded-lg font-black italic uppercase text-xs mb-4 inline-block">HOT NEWS</span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 italic uppercase tracking-tighter">{article.title}</h1>
        <p className="text-gray-200 text-lg mb-8 line-clamp-2 max-w-2xl font-medium">{article.excerpt}</p>
        <Link href={`/article/${article.slug}`}>
          <Button size="lg" className="rounded-full bg-white text-gray-900 hover:bg-primary hover:text-white font-black px-10 py-7 text-lg uppercase transition-all">Baca Selengkapnya</Button>
        </Link>
      </div>
    </section>
  );
}