"use client";

import { useState, useEffect } from "react";
import { Article } from "@/app/typing";
import { mockArticles } from "../data/mockData";

export function useArticles() {
  const [articles] = useState<Article[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (activeCategory !== "Semua") {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    articles: filteredArticles,
    activeCategory,
    handleCategoryChange,
    handleSearch
  };
}
