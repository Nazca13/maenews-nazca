"use client";

import { GalleryItem } from "@/app/typing";
import { X, Calendar, Tag, Type } from "lucide-react";
import { formatShortDate } from "@/app/utils/dateUtils";

interface MediaDetailModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function MediaDetailModal({ item, onClose }: MediaDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[700px] w-full mx-4 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="aspect-video bg-gray-100">
          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Type size={14} />
              {item.type === "video" ? "Video" : "Image"}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={14} />
              {item.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatShortDate(item.uploadedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
