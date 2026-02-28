"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GalleryItem } from "@/app/typing";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button 
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]" 
          onClick={onClose}
        >
          <X size={48} />
        </button>
        
        {/* Navigation Buttons */}
        <button 
          className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-4" 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={64} />
        </button>
        
        <button 
          className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-4" 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={64} />
        </button>

        {/* Media Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-6xl aspect-video flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "image" ? (
            <Image 
              src={item.url} 
              alt={item.title} 
              fill 
              className="object-contain" 
            />
          ) : (
            <iframe 
              src={item.url.replace("watch?v=", "embed/")} 
              className="w-full h-full rounded-2xl shadow-2xl border-0" 
              allowFullScreen 
            />
          )}
          
          {/* Caption */}
          <div className="absolute -bottom-16 left-0 right-0 text-center">
            <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">
              {item.title}
            </h4>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}