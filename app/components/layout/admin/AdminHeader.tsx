// app/components/layout/admin/AdminHeader.tsx
// Top bar matching the main site's clean white aesthetic.
// Features search and an interactive, real-time unread tracker notifications panel.
"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, MessageSquare, Calendar, ShieldAlert, FileText, Check } from "lucide-react";
import { useState } from "react";

interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "comment" | "system" | "article" | "event";
}

export function AdminHeader() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock initial notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "1",
      title: "Komentar Baru",
      description: 'Budi memberikan komentar di artikel "Studio Ghibli..."',
      time: "5 mtk",
      read: false,
      type: "comment",
    },
    {
      id: "2",
      title: "Event Mendatang",
      description: 'Event "Comic Frontier 17" akan dimulai besok pagi.',
      time: "2 jam",
      read: false,
      type: "event",
    },
    {
      id: "3",
      title: "Sistem Cadangan",
      description: "Cadangan database otomatis berhasil disimpan ke cloud.",
      time: "5 jam",
      read: true,
      type: "system",
    },
    {
      id: "4",
      title: "Draft Baru",
      description: 'Admin Redaksi membuat draft baru "Demon Slayer Season 4".',
      time: "1 hari",
      read: true,
      type: "article",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const getNotificationIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "comment":
        return <MessageSquare size={14} className="text-blue-500" />;
      case "event":
        return <Calendar size={14} className="text-emerald-500" />;
      case "system":
        return <ShieldAlert size={14} className="text-amber-500" />;
      case "article":
        return <FileText size={14} className="text-[#FF6D00]" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Left — Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-sm">
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 h-9 bg-white px-4 text-[12px] font-medium text-[#090909] placeholder:text-[#a6a6a6] outline-none"
          />
          <button
            aria-label="Search"
            className="h-9 w-9 flex items-center justify-center bg-[#FF6D00] hover:bg-[#e56200] flex-shrink-0 transition-colors cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon/search-icon.svg" alt="Search" width={13} height={13} />
          </button>
        </div>
      </div>

      {/* Right — Notifications + User */}
      <div className="flex items-center gap-4 relative">
        {/* Bell Button */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
          className="relative p-2 text-[#a6a6a6] hover:text-[#090909] transition-colors cursor-pointer rounded-full hover:bg-gray-50"
        >
          <Bell size={19} strokeWidth={1.8} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6D00] rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Notifications Popover Menu */}
        {showNotifications && (
          <>
            {/* Backdrop close capture */}
            <div
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setShowNotifications(false)}
            />
            {/* Dropdown Card */}
            <div className="absolute right-0 top-11 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Notifikasi</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {unreadCount} pesan belum dibaca
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#FF6D00] hover:text-[#e56200] transition-colors cursor-pointer"
                  >
                    <Check size={10} />
                    Tandai dibaca semua
                  </button>
                )}
              </div>

              {/* Notification Item list */}
              <div className="max-h-[280px] overflow-y-auto divide-y divide-gray-50">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleRead(item.id)}
                    className={`p-3 text-left transition-colors cursor-pointer flex gap-2.5 items-start ${
                      item.read ? "bg-white hover:bg-gray-50" : "bg-orange-50/20 hover:bg-orange-50/40"
                    }`}
                  >
                    {/* Icon bubble */}
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getNotificationIcon(item.type)}
                    </div>

                    {/* Text description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-[11px] truncate ${item.read ? "font-semibold text-gray-700" : "font-bold text-gray-900"}`}>
                          {item.title}
                        </p>
                        <span className="text-[9px] text-gray-400 flex-shrink-0">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-normal break-words">
                        {item.description}
                      </p>
                    </div>

                    {/* Unread Indicator */}
                    {!item.read && (
                      <span className="w-1.5 h-1.5 bg-[#FF6D00] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* View all footer */}
              <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] font-bold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>
          </>
        )}

        {/* User info */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#FF6D00]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-bold text-[#FF6D00] uppercase">
              {(session?.user?.name ?? "A").charAt(0)}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-bold text-[#090909] leading-tight">
              {session?.user?.name ?? "Admin"}
            </p>
            <p className="text-[11px] text-[#a6a6a6]">
              {session?.user?.email ?? "admin@maenews.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
