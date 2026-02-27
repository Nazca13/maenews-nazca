// app/data/mockData.ts
// ===================================================================
// Backward-compatibility barrel — re-exports from per-entity mocks.
// New code should import directly from "@/app/data/mocks".
// ===================================================================

export {
  featuredArticle,
  mockArticles,
} from "./mocks/articles";

export { trendingItems } from "./mocks/trending";

export { upcomingEvents } from "./mocks/events";
