// app/components/pages/admin/settings/TrendingManagerPanel.tsx
// Displays a list of articles and allows pinning/unpinning from the trending section.
"use client";

import { adminApi } from "@/app/lib/adminApi";

type TrendingItem = { id: string; title: string; slug: string; pinned: boolean };

interface TrendingManagerPanelProps {
  items: TrendingItem[];
  onToggle: (slug: string) => void;
}

export function TrendingManagerPanel({ items, onToggle }: TrendingManagerPanelProps) {
  async function handleToggle(slug: string) {
    await adminApi.toggleTrendingPin(slug);
    onToggle(slug);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Pinned Trending Articles</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Toggle which articles appear in the trending section.
        </p>
      </div>

      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
              <p className="text-[11px] text-gray-400">{item.slug}</p>
            </div>
            <button
              onClick={() => handleToggle(item.slug)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                item.pinned
                  ? "bg-[#FF6D00]/10 text-[#FF6D00]"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              {item.pinned ? "Pinned" : "Pin"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
