"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/app/lib/adminApi";
import { DashboardStats } from "@/app/typing/Admin";
import { FileText, Calendar, Image, Eye, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatShortDate } from "@/app/utils/dateUtils";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    adminApi.getDashboardStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Articles", value: stats.totalArticles, icon: FileText, color: "#FF6D00" },
    { label: "Total Events", value: stats.totalEvents, icon: Calendar, color: "#3B82F6" },
    { label: "Gallery Items", value: stats.totalGallery, icon: Image, color: "#8B5CF6" },
    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, here&apos;s your overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}10` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <TrendingUp size={14} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Two columns — Recent Articles + Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Recent Articles</h3>
            <Link
              href="/admin/article"
              className="text-xs text-[#FF6D00] hover:text-[#e56200] font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/article/${article.slug}/edit`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{article.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {article.category} &middot; {article.status}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatShortDate(article.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Upcoming Events</h3>
            <Link
              href="/admin/event"
              className="text-xs text-[#FF6D00] hover:text-[#e56200] font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentEvents.map((event) => (
              <Link
                key={event.id}
                href={`/admin/event/${event.slug}/edit`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{event.location}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatShortDate(event.startDate)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
