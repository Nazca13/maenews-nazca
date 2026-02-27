"use client";

import { useState, useEffect, useRef } from "react";
import { Article } from "@/app/typing"; // Pastikan path ini benar
import { NewsCard } from "../NewsCard"; // Menggunakan NewsCard yang sudah diperbarui
import { Flame } from "lucide-react"; // Menggunakan ikon baru untuk judul

interface SliderNewsProps {
  articles: Article[];
  title: string;
}

export function SliderNews({ articles, title }: SliderNewsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const cardWidth = sliderRef.current.children[0]?.clientWidth || 0;
        const gap = 16;

        let newScrollLeft = scrollLeft + cardWidth + gap;

        if (newScrollLeft >= scrollWidth - clientWidth) {
          newScrollLeft = 0;
        }

        sliderRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section>
      {/* Judul Section yang Disesuaikan */}
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-secondary" />
        <h2 className="text-xl font-bold text-secondary">{title}</h2>
      </div>

      {/* Kontainer Slider dengan Snap dan Autoplay */}
      <div
        ref={sliderRef}
        className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start"
          >
            <NewsCard article={article} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
