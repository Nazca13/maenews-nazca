"use client";

import { motion } from "framer-motion";
import { Article } from "@/app/typing";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { User, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { slugify } from "@/app/lib/utils";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMMM yyyy", { locale: id })
    : "Tanggal tidak tersedia";

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Kategori */}
      <Badge
        variant="secondary"
        className="mb-4 bg-secondary text-white hover:bg-secondary/20 font-semibold"
      >
        {article.category}
      </Badge>

      {/* Judul Artikel */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {article.title}
      </h1>

      {/* Meta Info (Author & Tanggal) */}
      <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-gray-500 mb-6">
        <div className="flex items-center text-sm">
          <User className="w-4 h-4 mr-2 text-secondary" />
          <span className="font-medium text-secondary">{article.author}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Gambar Utama */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>

      {/* Konten Artikel */}
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead font-semibold">{article.excerpt}</p>
        <p>{article.description}</p>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {article.tags.map((tag) => (
              <Link key={tag} href={`/tag/${slugify(tag)}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-white hover:text-secondary bg-secondary text-white transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
