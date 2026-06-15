"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/app/lib/adminApi";
import { ArticleFormData, ArticleStatus } from "@/app/typing/Admin";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { RichTextEditor } from "./RichTextEditor";
import { ArticleEditorSidebar } from "./ArticleEditorSidebar";

interface ArticleEditorPageProps {
  slug?: string; // undefined = create mode, string = edit mode
}

const emptyForm: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  content: "",
  imageUrl: "",
  thumbnailUrl: "",
  category: "",
  tags: [],
  author: "Redaksi AnimeFeed",
  status: "draft",
  featured: false,
  seoTitle: "",
  seoDescription: "",
};

export function ArticleEditorPage({ slug }: ArticleEditorPageProps) {
  const router = useRouter();
  const isEdit = !!slug;
  const [form, setForm] = useState<ArticleFormData>(emptyForm);
  const [categories, setCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getCategories().then((cats) => setCategories(cats.map((c) => c.name)));
    if (slug) {
      adminApi.getAdminArticleBySlug(slug).then((article) => {
        if (article) {
          setForm({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            description: article.description || "",
            content: article.content || "",
            imageUrl: article.imageUrl || "",
            thumbnailUrl: article.thumbnailUrl || "",
            category: article.category,
            tags: article.tags,
            author: article.author,
            status: article.status,
            featured: article.featured || false,
          });
        }
      });
    }
  }, [slug]);

  const handleChange = (field: keyof ArticleFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (isEdit) {
        await adminApi.updateArticle(slug!, form);
      } else {
        await adminApi.createArticle(form);
      }
      router.push("/admin/article");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <FormPageHeader
        title={isEdit ? "Edit Article" : "Create Article"}
        backHref="/admin/article"
        actionLabel={saving ? "Saving..." : isEdit ? "Update" : "Publish"}
        onAction={handleSave}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main Content */}
        <div className="space-y-5">
          {/* Title */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Article title..."
              className="w-full text-xl font-bold text-gray-900 placeholder:text-gray-300 outline-none"
            />
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="article-slug"
              className="w-full text-sm text-gray-500 placeholder:text-gray-300 outline-none mt-2"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              placeholder="Short summary of the article..."
              rows={2}
              className="w-full text-sm text-gray-700 placeholder:text-gray-300 outline-none resize-none"
            />
          </div>

          {/* Rich Text Content */}
          <RichTextEditor
            content={form.content}
            onChange={(html) => handleChange("content", html)}
          />
        </div>

        {/* Sidebar */}
        <ArticleEditorSidebar
          form={form}
          onChange={handleChange}
          categories={categories}
        />
      </div>
    </div>
  );
}
