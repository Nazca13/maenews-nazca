// app/components/layout/admin/AdminHeader.tsx
"use client";

import { useSession } from "next-auth/react";
import {
  Search,
  Bell,
  MessageSquare,
  Calendar,
  ShieldAlert,
  FileText,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "comment" | "system" | "article" | "event";
}

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
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
    description: '"Comic Frontier 17" akan dimulai besok pagi.',
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
    description: 'Admin Redaksi membuat draft "Demon Slayer Season 4".',
    time: "1 hari",
    read: true,
    type: "article",
  },
];

function NotifIcon({ type }: { type: AdminNotification["type"] }) {
  switch (type) {
    case "comment":
      return <MessageSquare size={13} className="text-blue-500" />;
    case "event":
      return <Calendar size={13} className="text-emerald-500" />;
    case "system":
      return <ShieldAlert size={13} className="text-amber-500" />;
    case "article":
      return <FileText size={13} className="text-[#FF6D00]" />;
  }
}

export function AdminHeader() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);

  // Ref wrapping the bell button + dropdown panel for click-outside detection
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const toggleRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-sm">
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

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Bell + Dropdown — wrapped in single ref div */}
        <div ref={panelRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Notifikasi"
            className="relative p-2 rounded-full text-[#a6a6a6] hover:text-[#090909] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Bell size={19} strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6D00] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Dropdown panel */}
          {open && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
              style={{ zIndex: 9999 }}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-gray-900">Notifikasi</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {unreadCount} belum dibaca
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#FF6D00] hover:text-[#e56200] transition-colors cursor-pointer"
                  >
                    <Check size={10} />
                    Tandai semua dibaca
                  </button>
                )}
              </div>

              {/* List */}
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleRead(item.id)}
                    className={`w-full text-left px-4 py-3 flex gap-3 items-start transition-colors cursor-pointer ${
                      item.read
                        ? "bg-white hover:bg-gray-50"
                        : "bg-orange-50/40 hover:bg-orange-50/70"
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-7 h-7 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <NotifIcon type={item.type} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-[11px] truncate ${
                            item.read ? "font-medium text-gray-600" : "font-bold text-gray-900"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[9px] text-gray-400 flex-shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {!item.read && (
                      <span className="w-1.5 h-1.5 bg-[#FF6D00] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-center">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
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
