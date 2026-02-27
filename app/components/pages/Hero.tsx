"use client";

import { useState, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import { HeroCard } from "@/app/components/HeroCard";
import { Article } from "@/app/typing";

const gridLayoutClasses = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

type HeroProps = {
  featuredArticle?: Article;
  articles: Article[];
};

export const Hero: React.FC<HeroProps> = ({ featuredArticle, articles }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Gunakan hanya artikel dari props
  const heroDisplayArticles: Article[] = useMemo(() => {
    const slicedArticles = articles.slice(0, 3);
    return [featuredArticle, ...slicedArticles].filter(
      (article): article is Article => article !== undefined
    );
  }, [featuredArticle, articles]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveIndex((prev) =>
        Math.min(prev + 1, heroDisplayArticles.length - 1)
      );
    } else if (info.offset.x > swipeThreshold) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="container mx-auto py-3 sm:py-6">
      {/* Mobile Slider */}
      <div className="md:hidden">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {heroDisplayArticles.map((article) => (
              <div key={article.id} className="flex-shrink-0 w-full">
                <HeroCard article={article} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {heroDisplayArticles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out ${
                i === activeIndex
                  ? "w-6 bg-primary hover:bg-primary/80"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[550px]">
        {heroDisplayArticles.map((article, index) => (
          <HeroCard
            key={article.id}
            article={article}
            className={gridLayoutClasses[index]}
          />
        ))}
      </div>
    </section>
  );
};
