"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { navItems } from "@/app/data/Navigation";
import { Button } from "../ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchSubmit = () => {
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search/${encodeURIComponent(q)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchSubmit();
    if (e.key === "Escape") {
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black italic text-primary">MAE<span className="text-gray-900">NEWS</span></Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          {showSearch ? (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-200">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cari berita..."
                className="w-40 md:w-64 h-9 rounded-full bg-gray-100 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-white p-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase italic">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}