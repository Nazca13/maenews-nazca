// app/admin/category/page.tsx
// Premium side-by-side Category Management layout.
// Includes auto-slug generation, clear input hints, and modal-based inline editing.
"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/app/lib/adminApi";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { DataTable } from "@/app/components/ui/admin/DataTable";
import { ConfirmModal } from "@/app/components/ui/admin/ConfirmModal";
import { Trash2, Plus, FolderOpen, Pencil, X, Save } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type CategoryRow = { id: string; name: string; slug: string; count: number };

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  // Edit modal state
  const [editCategory, setEditCategory] = useState<CategoryRow | null>(null);
  const [editName, setEditName] = useState("");

  const loadCategories = () => {
    setLoading(true);
    adminApi.getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Auto-generate slug from name unless manually modified
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugManual) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "") // remove special characters
          .replace(/\s+/g, "-") // replace spaces with hyphens
          .replace(/-+/g, "-") // collapse consecutive hyphens
      );
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setIsSlugManual(true);
    if (val === "") {
      setIsSlugManual(false);
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    const finalSlug = slug.trim() || name.toLowerCase().replace(/\s+/g, "-");
    await adminApi.createCategory({ name: name.trim(), slug: finalSlug });
    setName("");
    setSlug("");
    setIsSlugManual(false);
    loadCategories();
  };

  const handleDelete = async () => {
    if (!deleteSlug) return;
    await adminApi.deleteCategory(deleteSlug);
    setDeleteSlug(null);
    loadCategories();
  };

  const handleOpenEdit = (cat: CategoryRow) => {
    setEditCategory(cat);
    setEditName(cat.name);
  };

  const handleSaveEdit = async () => {
    if (!editCategory || !editName.trim()) return;
    await adminApi.updateCategory(editCategory.slug, editName.trim());
    setEditCategory(null);
    setEditName("");
    loadCategories();
  };

  const columns: ColumnDef<CategoryRow, unknown>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-[#a6a6a6]" />
          <span className="font-semibold text-[#090909]">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ getValue }) => (
        <code className="text-[11px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: "count",
      header: "Articles",
      cell: ({ getValue }) => (
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {getValue() as number} posts
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => handleOpenEdit(row.original)}
            className="p-1.5 rounded-md text-[#a6a6a6] hover:text-[#FF6D00] hover:bg-orange-50 transition-colors cursor-pointer"
            title="Edit Category"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setDeleteSlug(row.original.slug)}
            className="p-1.5 rounded-md text-[#a6a6a6] hover:text-[#fb3604] hover:bg-red-50 transition-colors cursor-pointer"
            title="Delete Category"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FormPageHeader title="Category Management" backHref="/admin" />

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
        {/* Left Column — Add Category Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#090909] flex items-center gap-2">
              <Plus size={16} className="text-[#FF6D00]" />
              Add New Category
            </h3>
            <p className="text-xs text-[#a6a6a6] mt-1">
              Create a new category container for organizing articles.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Pop Culture"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 font-medium text-[#090909]"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-1">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. pop-culture"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 font-mono text-xs text-gray-600"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <p className="text-[10px] text-gray-400 mt-1">
                The slug is the URL-friendly version of the name.
              </p>
            </div>

            <button
              onClick={handleAdd}
              disabled={!name.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6D00] hover:bg-[#e56200] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors cursor-pointer mt-2"
            >
              <Plus size={16} />
              Add Category
            </button>
          </div>
        </div>

        {/* Right Column — DataTable Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#FF6D00] border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <DataTable<CategoryRow>
              data={categories}
              columns={columns}
              searchColumn="name"
              searchPlaceholder="Search categories..."
              pageSize={10}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="This category will be permanently removed. Articles in this category will not be deleted but may become uncategorized."
      />

      {/* Edit Category Modal (Pop-up Window) */}
      {editCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditCategory(null)} />

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-[420px] w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setEditCategory(null)}
              className="absolute top-4 right-4 p-1 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-1">Edit Category</h3>
            <p className="text-xs text-gray-500 mb-4">Update the name for category &quot;{editCategory.name}&quot;.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 font-medium text-[#090909]"
                  onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3 justify-end pt-2">
                <button
                  onClick={() => setEditCategory(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editName.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6D00] hover:bg-[#e56200] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
