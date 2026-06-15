"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/app/lib/adminApi";
import { GalleryItem } from "@/app/typing";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { ConfirmModal } from "@/app/components/ui/admin/ConfirmModal";
import { MediaGrid } from "./MediaGrid";
import { MediaUploadDropzone } from "./MediaUploadDropzone";
import { MediaDetailModal } from "./MediaDetailModal";
import { Search } from "lucide-react";

export function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getAdminGallery().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await adminApi.deleteGalleryItem(deleteId);
    setItems((prev) => prev.filter((g) => g.id !== deleteId));
    setDeleteId(null);
  };

  const handleUpload = (files: File[]) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const newItem = await adminApi.uploadGalleryItem({
          title: file.name.replace(/\.[^.]+$/, ""),
          type: "image",
          url: reader.result as string,
          thumbnailUrl: reader.result as string,
          category: "Upload",
        });
        setItems((prev) => [newItem, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const filteredItems = search
    ? items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div>
      <FormPageHeader title="Gallery Management" backHref="/admin" />

      {/* Upload Zone */}
      <div className="mb-6">
        <MediaUploadDropzone onUpload={handleUpload} />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-sm bg-white border border-gray-200 rounded-lg px-3 py-2 mb-4">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media..."
          className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#FF6D00] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
          No media found
        </div>
      ) : (
        <MediaGrid
          items={filteredItems}
          onView={setViewItem}
          onDelete={setDeleteId}
        />
      )}

      <MediaDetailModal item={viewItem} onClose={() => setViewItem(null)} />
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Media"
        message="This media item will be permanently removed."
      />
    </div>
  );
}
