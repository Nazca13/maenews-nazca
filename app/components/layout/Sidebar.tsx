"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, MapPin } from "lucide-react";
import { TrendingItem, Event } from "@/app/typing";
import { formatRelativeTime } from "@/app/utils/dateUtils";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  trendingItems: TrendingItem[];
  upcomingEvents: Event[];
}

export function Sidebar({ trendingItems, upcomingEvents }: SidebarProps) {
  return (
    <aside className="hidden lg:block sticky top-24 space-y-6">
      {/* Trending Section */}
      <motion.div
        className="bg-white rounded-2xl p-5 shadow-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-secondary mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Trending Sekarang</h3>
        </div>

        <div className="space-y-4">
          {trendingItems.slice(0, 5).map((item, index) => (
            <Link
              href={`/article/${item.slug}`}
              key={item.id}
              className="block group"
            >
              <motion.div
                className="flex gap-4 p-2 rounded-xl hover:bg-orange-50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden">
                  <Image
                    src={`https://placehold.co/100x100/ffedd5/fb923c?text=${item.category.charAt(
                      0
                    )}`}
                    alt={item.title}
                    width={64}
                    height={64}
                    unoptimized
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {formatRelativeTime(item.publishedAt)}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        className="bg-white rounded-2xl p-5 shadow-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-secondary mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Event Mendatang</h3>
        </div>

        <div className="space-y-4">
          {upcomingEvents.slice(0, 5).map((event, index) => (
            // PERBAIKAN: href sekarang menggunakan event.slug
            <Link
              href={`/event/${event.slug}`}
              key={event.id}
              className="block group"
            >
              <motion.div
                className="flex gap-4 p-2 rounded-xl hover:bg-orange-50 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden">
                  <Image
                    src={
                      event.imageUrl ||
                      `https://placehold.co/100x100/f3e8ff/c084fc?text=Event`
                    }
                    alt={event.title}
                    width={64}
                    height={64}
                    unoptimized
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-gray-500 text-xs">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
