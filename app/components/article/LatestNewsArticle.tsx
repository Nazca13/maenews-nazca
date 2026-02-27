"use client";

import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/typing";
import { formatRelativeTime } from "@/app/utils/dateUtils";

interface LatestNewsArticleProps {
  article: Article;
}

export function LatestNewsArticle({ article }: LatestNewsArticleProps) {
  return (
    // Seluruh kartu sekarang dibungkus oleh SATU Link dengan kelas 'group'
    <Link href={`/article/${article.slug}`} className="block group">
      <motion.article
        // Gaya responsif tetap sama
        className="flex flex-row-reverse sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-sm 
                   sm:items-start sm:p-0 sm:bg-transparent sm:shadow-none sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gambar Artikel (Link terpisah DIHAPUS) */}
        <div className="flex-shrink-0">
          <div className="w-34 h-24 md:h-34 sm:w-56 md:w-64">
            <Image
              src={
                article.imageUrl ||
                "https://placehold.co/400x300/e2e8f0/64748b?text=Img"
              }
              alt={article.title}
              width={256}
              height={170}
              unoptimized 
              className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Konten Teks Artikel */}
        <div className="flex-1">
          {/* Judul (Link terpisah DIHAPUS) */}
          <motion.h2
            // Menggunakan 'group-hover' untuk mengubah warna saat seluruh kartu di-hover
            className="text-base md:text-lg font-bold text-gray-800 hover:text-secondary group-hover:text-secondary leading-tight mb-2 line-clamp-3 transition-colors duration-200"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {article.title}
          </motion.h2>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5 text-red-500" />
              <span className="font-bold text-red-600">{article.category}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{formatRelativeTime(article.publishedAt)}</span>
              </div>
            </div>
          </div>

          {/* Excerpt hanya tampil di desktop */}
          <p className="hidden sm:block text-gray-600 text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
