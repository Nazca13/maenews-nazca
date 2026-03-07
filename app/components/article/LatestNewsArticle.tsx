"use client";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/typing";
import { formatRelativeTime } from "@/app/utils/dateUtils";

export function LatestNewsArticle({ article, priority = false }: { article: Article; priority?: boolean }) {
  const displayImg = article.thumbnailUrl || article.imageUrl || "https://placehold.co/400x300?text=No+Image";

  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <motion.article
        className="flex flex-row-reverse sm:flex-row items-center gap-4 p-4 bg-white rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {/* FIX: Parent Image harus punya class 'relative' */}
        <div className="relative w-32 h-24 sm:w-56 sm:h-36 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={displayImg}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 30vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
            priority={priority}
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
            <User size={12} /> {article.category}
          </div>
          <h3 className="text-sm sm:text-xl font-black leading-tight text-gray-900 group-hover:text-primary transition-colors italic uppercase line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center text-[10px] text-gray-400 font-bold gap-2">
            <Clock size={12} /> {formatRelativeTime(article.publishedAt)}
          </div>
          <p className="hidden md:line-clamp-2 text-xs text-gray-500 font-medium leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}