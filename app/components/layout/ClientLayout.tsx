"use client";

import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
// PERBAIKAN: Menghapus impor 'useArticles' yang tidak lagi digunakan

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // PERBAIKAN: Menghapus hook 'useArticles' dan 'handleSearch'
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      <main className="container mx-auto lg:px-[150px] md:py-4">
        {children}
      </main>
      <Footer />
    </motion.div>
  );
}
