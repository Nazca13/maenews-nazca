import { GalleryItem } from "@/app/typing";

export const mockGallery: GalleryItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `g${i + 1}`,
  title: `Koleksi Cosplay Ke-${i + 1}`,
  type: i % 5 === 0 ? "video" : "image",
  url: i % 5 === 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : `https://picsum.photos/seed/gal${i}/1200/800`,
  thumbnailUrl: `https://picsum.photos/seed/gal${i}/400/600`,
  category: i % 2 === 0 ? "Cosplay" : "Event",
  uploadedAt: new Date().toISOString(),
}));