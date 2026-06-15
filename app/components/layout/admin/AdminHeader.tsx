// app/components/layout/admin/AdminHeader.tsx
// Top bar matching the main site's clean white aesthetic.
// Uses Poppins, #FF6D00 accent, and the same search style as the user Header.
"use client";

import { useSession } from "next-auth/react";
import { Search, Bell } from "lucide-react";
import { useState } from "react";

export function AdminHeader() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Left — Search Bar (same border-radius pill style as main Header) */}
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
      <div className="flex items-center gap-4">
        {/* Bell with orange dot */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-[#a6a6a6] hover:text-[#090909] transition-colors cursor-pointer"
        >
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6D00] rounded-full" />
        </button>

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
