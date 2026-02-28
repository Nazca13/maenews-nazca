"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
