import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "../lib/api";
import { upcomingEvents } from "../data/mocks-data";

interface SearchFilters {
  type: string;
  category: string;
}

export const useApiSearch = (query: string, filters?: SearchFilters) => {
  return useQuery({
    queryKey: ["search", query, filters],
    queryFn: async () => {
      // Gunakan searchArticles dari api.ts (mendukung mock + live)
      const articles = await searchArticles(query) ?? [];

      // Filter event dari mock data berdasarkan query
      const q = query.toLowerCase();
      const events = upcomingEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );

      return { articles, events };
    },
    enabled: query.length > 0,
  });
};