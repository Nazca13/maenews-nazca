"use client";
import { mockGallery } from "@/app/data/mocks-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-10 pb-4 border-b">
        <Camera className="text-primary w-7 h-7" />
        <h1 className="text-3xl font-bold">Gallery Animae</h1>
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {mockGallery.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-xl overflow-hidden group cursor-zoom-in"
          >
            <Image
              src={item.url}
              alt={item.title}
              width={600}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-white font-bold text-sm">{item.title}</p>
              <p className="text-tertiary text-xs">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}