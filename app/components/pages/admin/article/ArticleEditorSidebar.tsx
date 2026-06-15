"use client";

import { ArticleFormData, ArticleStatus } from "@/app/typing/Admin";
import { ThumbnailUploader } from "./ThumbnailUploader";

interface ArticleEditorSidebarProps {
  form: ArticleFormData;
  onChange: (field: keyof ArticleFormData, value: unknown) => void;
  categories: string[];
}

export function ArticleEditorSidebar({ form, onChange, categories }: ArticleEditorSidebarProps) {
  return (
    <div className="space-y-5">
      {/* Publish Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Publish</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => onChange("status", e.target.value as ArticleStatus)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => onChange("featured", e.target.checked)}
              className="w-4 h-4 accent-[#FF6D00] cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 cursor-pointer">
              Featured Article
            </label>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Category</h3>
        <select
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Tags</h3>
        <input
          type="text"
          value={form.tags.join(", ")}
          onChange={(e) => onChange("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
          placeholder="tag1, tag2, tag3"
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
        />
        <p className="text-[11px] text-gray-400 mt-1">Separate with commas</p>
      </div>

      {/* Author */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Author</h3>
        <input
          type="text"
          value={form.author}
          onChange={(e) => onChange("author", e.target.value)}
          placeholder="Author name"
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
        />
      </div>

      {/* Thumbnail */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <ThumbnailUploader
          value={form.thumbnailUrl}
          onChange={(url) => onChange("thumbnailUrl", url)}
        />
      </div>

      {/* SEO */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">SEO</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">SEO Title</label>
            <input
              type="text"
              value={form.seoTitle || ""}
              onChange={(e) => onChange("seoTitle", e.target.value)}
              placeholder="SEO optimized title"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Description</label>
            <textarea
              value={form.seoDescription || ""}
              onChange={(e) => onChange("seoDescription", e.target.value)}
              placeholder="SEO meta description"
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
