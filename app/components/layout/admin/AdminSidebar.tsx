// app/components/layout/admin/AdminSidebar.tsx
// Light-theme sidebar matching the main site's visual identity.
// Logo, font, and color palette are identical to the user-facing Header.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  ImageIcon,
  Settings,
  Tags,
  FolderOpen,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/admin",          Icon: LayoutDashboard },
  { label: "Articles",   href: "/admin/article",   Icon: FileText        },
  { label: "Events",     href: "/admin/event",     Icon: Calendar        },
  { label: "Gallery",    href: "/admin/gallery",   Icon: ImageIcon       },
  { label: "Categories", href: "/admin/category",  Icon: FolderOpen      },
  { label: "Tags",       href: "/admin/tag",       Icon: Tags            },
  { label: "Settings",   href: "/admin/settings",  Icon: Settings        },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-[240px] bg-white border-r border-gray-100 flex flex-col">
      {/* Logo — same as user Header */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logonya.svg"
            alt="Maenews"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-150 group ${
                active
                  ? "bg-[#FF6D00]/8 text-[#FF6D00]"
                  : "text-[#6b7280] hover:text-[#090909] hover:bg-gray-50"
              }`}
            >
              <Icon
                size={17}
                className={`flex-shrink-0 transition-colors ${
                  active ? "text-[#FF6D00]" : "text-[#a6a6a6] group-hover:text-[#090909]"
                }`}
              />
              <span>{label}</span>
              {/* Active indicator dot — same as main Header */}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider label */}
      <div className="px-6 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#a6a6a6]">
          Quick Access
        </p>
      </div>

      {/* Bottom — View Site & Logout */}
      <div className="p-3 border-t border-gray-100 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#6b7280] hover:text-[#090909] hover:bg-gray-50 rounded-lg transition-all"
        >
          <ExternalLink size={17} className="text-[#a6a6a6]" />
          <span>View Site</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#fb3604]/70 hover:text-[#fb3604] hover:bg-red-50 rounded-lg transition-all cursor-pointer"
        >
          <LogOut size={17} className="text-[#fb3604]/60" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
