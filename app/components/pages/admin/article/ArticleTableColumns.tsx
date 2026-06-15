"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArticleWithStatus } from "@/app/typing/Admin";
import { Pencil, Trash2, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatShortDate } from "@/app/utils/dateUtils";

interface ColumnOptions {
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
}

export function getArticleColumns({ onEdit, onDelete }: ColumnOptions): ColumnDef<ArticleWithStatus, unknown>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const article = row.original;
        return (
          <div className="flex items-center gap-3">
            {article.thumbnailUrl && (
              <img
                src={article.thumbnailUrl}
                alt=""
                className="w-12 h-9 rounded object-cover bg-gray-100 flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <Link
                href={`/admin/article/${article.slug}/edit`}
                className="text-sm font-medium text-gray-800 hover:text-[#FF6D00] transition-colors line-clamp-1"
              >
                {article.title}
              </Link>
              <p className="text-[11px] text-gray-400 mt-0.5">{article.category}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const colors: Record<string, string> = {
          published: "bg-green-50 text-green-700 border-green-200",
          draft: "bg-amber-50 text-amber-700 border-amber-200",
          archived: "bg-gray-50 text-gray-500 border-gray-200",
        };
        return (
          <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded-md border ${colors[status] || colors.draft}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "views",
      header: "Views",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">{(getValue() as number)?.toLocaleString() || "0"}</span>
      ),
    },
    {
      accessorKey: "publishedAt",
      header: "Published",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-500">{formatShortDate(getValue() as string)}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const article = row.original;
        return (
          <div className="flex items-center gap-1 justify-end">
            <Link
              href={`/article/${article.slug}`}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Preview"
            >
              <ExternalLink size={14} />
            </Link>
            <button
              onClick={() => onEdit(article.slug)}
              className="p-1.5 rounded-md text-gray-400 hover:text-[#FF6D00] hover:bg-orange-50 transition-colors cursor-pointer"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(article.slug)}
              className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      },
    },
  ];
}
