"use client";

import { GalleryItem } from "@/app/typing";
import { Trash2, Eye, Video } from "lucide-react";

interface MediaGridProps {
  items: GalleryItem[];
  onView: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

export function MediaGrid({ items, onView, onDelete }: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Type badge */}
          {item.type === "video" && (
            <div className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded">
              <Video size={12} />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => onView(item)}
              className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-[11px] text-white font-medium line-clamp-1">{item.title}</p>
            <p className="text-[10px] text-white/60">{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
