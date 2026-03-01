import { useQuery } from "@tanstack/react-query";
import { searchArticles, getUpcomingEvents } from "../lib/api";

export const useApiSearch = (query: string, filters?: { type: string; category: string }) => {
  return useQuery({
    queryKey: ["search", query, filters],
    queryFn: async () => {
      const q = query.toLowerCase();

      // Ambil data dari service (mendukung mock/live)
      const [articlesData, eventsData] = await Promise.all([
        searchArticles(query),
        getUpcomingEvents()
      ]);

      // Filter logic yang robust
      const filteredArticles = (articlesData ?? []).filter(a => {
        const matchQuery = a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
        const matchCat = !filters?.category || a.category === filters.category;
        return matchQuery && matchCat;
      });

      // Event tidak punya field "category", jadi kita match berdasarkan tags
      const filteredEvents = (eventsData ?? []).filter(e => {
        const matchQuery = e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
        const matchCat = !filters?.category || e.tags.some(t => t === filters.category);
        return matchQuery && matchCat;
      });

      return {
        articles: filteredArticles,
        events: filteredEvents
      };
    },
    enabled: query.length > 0,
  });
};