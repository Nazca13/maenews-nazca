"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/app/lib/adminApi";
import { ArticleWithStatus } from "@/app/typing/Admin";
import { DataTable } from "@/app/components/ui/admin/DataTable";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { ConfirmModal } from "@/app/components/ui/admin/ConfirmModal";
import { ArticleFilterToolbar } from "./ArticleFilterToolbar";
import { getArticleColumns } from "./ArticleTableColumns";

export function ArticleManagementPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getAdminArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => [...new Set(articles.map((a) => a.category))],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || a.status === statusFilter;
      const matchCategory = !categoryFilter || a.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [articles, search, statusFilter, categoryFilter]);

  const columns = getArticleColumns({
    onEdit: (slug) => router.push(`/admin/article/${slug}/edit`),
    onDelete: (slug) => setDeleteSlug(slug),
  });

  const handleDelete = async () => {
    if (!deleteSlug) return;
    await adminApi.deleteArticle(deleteSlug);
    setArticles((prev) => prev.filter((a) => a.slug !== deleteSlug));
    setDeleteSlug(null);
  };

  return (
    <div>
      <FormPageHeader
        title="Article Management"
        backHref="/admin"
        actionLabel="New Article"
        actionHref="/admin/article/create"
      />

      <ArticleFilterToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
      />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#FF6D00] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <DataTable<ArticleWithStatus>
          data={filteredArticles}
          columns={columns}
          pageSize={10}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="This action cannot be undone. The article will be permanently removed."
        confirmLabel="Delete Article"
      />
    </div>
  );
}
