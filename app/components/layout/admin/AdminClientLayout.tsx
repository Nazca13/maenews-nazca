// app/components/layout/admin/AdminClientLayout.tsx
// Wraps all admin pages with SessionProvider, sidebar, header, and main content area.
"use client";

import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export function AdminClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* bg-[#F5F5F5] = var(--admin-bg) from globals.css */}
      <div className="min-h-screen bg-[#F5F5F5]">
        <AdminSidebar />
        <div className="ml-[240px] min-h-screen flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 max-w-[1600px]">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
