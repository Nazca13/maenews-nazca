"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { navItems } from "@/app/data/Navigation";
import { SearchComponent } from "@/app/components/SearchComponent"; // Impor komponen pencarian

// --- Sub-komponen ---

const DesktopNav = () => (
  <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
    {navItems.map((item, index) => (
      <motion.a
        key={item.label}
        href={item.href}
        className="text-white hover:text-orange-200 font-medium transition-colors relative text-sm xl:text-base"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -2 }}
      >
        {item.label}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-200"
          style={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.a>
    ))}
  </div>
);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="text-white hover:bg-orange-700 p-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-full w-full bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-orange-200 font-medium py-2 px-4 rounded-lg hover:bg-orange-700/50 transition-colors text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-3 mt-3 border-t border-orange-500">
                <SearchComponent />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Komponen Header Utama ---
// PERBAIKAN: Header tidak lagi menerima props
export function Header() {
  return (
    <motion.header
      className="bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-[150px] py-3 sm:py-4">
        <motion.a
          href="/"
          className="text-xl sm:text-2xl font-bold text-white hover:text-orange-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MaeNews
        </motion.a>

        <DesktopNav />

        <div className="hidden lg:flex w-56">
          <SearchComponent />
        </div>

        <MobileNav />
      </div>
    </motion.header>
  );
}
