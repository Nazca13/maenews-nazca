import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-black italic text-primary">MAE<span className="text-gray-900">NEWS</span></Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">Portal berita anime, manga, dan kultur pop Jepang terpercaya untuk komunitas Indonesia.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider">
              <Link href="/about" className="hover:text-primary">Tentang Kami</Link>
              <Link href="/contact" className="hover:text-primary">Kontak</Link>
            </div>
            <div className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider">
              <Link href="/privacy" className="hover:text-primary">Privasi</Link>
              <Link href="/terms" className="hover:text-primary">Syarat & Ketentuan</Link>
            </div>
          </div>
          <div className="flex gap-4 md:justify-end">
            {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
              <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border hover:bg-primary hover:text-white transition-all shadow-sm">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          © 2026 MAENEWS NETWORK. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}