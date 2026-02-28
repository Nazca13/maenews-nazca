import Link from "next/link";
import { Article } from "@/app/typing";
import Image from "next/image"; // Impor komponen Image

interface HeroCardProps {
  article: Article;
  className?: string;
}

export function HeroCard({ article, className }: HeroCardProps) {
  const categoryStyles: { [key: string]: string } = {
    Anime: "bg-secondary hover:bg-primary",
    "Content Creator": "bg-secondary hover:bg-primary",
    Event: "bg-secondary hover:bg-primary",
    Gaming: "bg-secondary hover:bg-primary",
    Cosplay: "bg-secondary hover:bg-primary",
    Japanese: "bg-secondary hover:bg-primary",
    default: "bg-secondary hover:bg-primary",
  };

  return (
    // PERBAIKAN: Menggunakan article.slug dan path yang benar (/article/)
    <Link
      href={`/article/${article.slug}`}
      className={`${className} relative md:rounded-2xl overflow-hidden group cursor-pointer h-64 md:h-auto shadow-lg block`}
    >
      {/* PERBAIKAN: Menggunakan komponen Image dari Next.js untuk optimasi */}
      <Image
        src={article.thumbnailUrl || article.imageUrl || ""}
        alt={article.title}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5 sm:p-6 text-white w-full flex flex-col items-start">
        <span
          className={`text-xs font-semibold uppercase px-3 py-1.5 rounded-full mb-3 transition-colors duration-300 ${categoryStyles[article.category] || categoryStyles.default
            }`}
        >
          {article.category}
        </span>
        <h3 className="text-lg sm:text-xl font-bold leading-tight drop-shadow-md text-balance">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}
