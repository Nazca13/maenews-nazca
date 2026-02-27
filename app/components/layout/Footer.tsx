
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "AnimeFeed",
      content: "Portal berita anime dan industri kreatif terdepan di Indonesia. Dapatkan informasi terkini seputar anime, content creators, dan event otaku."
    },
    {
      title: "Kategori",
      links: [
        "Anime Terbaru",
        "Content Creator", 
        "Event & Convention",
        "Gaming",
        "Cosplay"
      ]
    },
    {
      title: "Ikuti Kami",
      links: [
        "Twitter",
        "Instagram", 
        "YouTube",
        "TikTok",
        "Discord"
      ]
    },
    {
      title: "Kontak",
      links: [
        "Tentang Kami",
        "Kontak",
        "Kebijakan Privasi", 
        "Syarat & Ketentuan"
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-orange-400">
                {section.title}
              </h4>
              
              {section.content ? (
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {section.content}
                </p>
              ) : (
                <ul className="space-y-1 sm:space-y-2">
                  {section.links?.map((link, linkIndex) => (
                    <motion.li key={link}>
                      <motion.a
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base block"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (linkIndex * 0.05) }}
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-700 pt-6 sm:pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 gap-2">
            <motion.div
              className="flex items-center text-gray-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
            >
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 mx-2 text-red-500" fill="currentColor" />
              <span className="text-center sm:text-left">untuk komunitas anime Indonesia</span>
            </motion.div>
          </div>
          
          <p className="text-gray-400 text-xs sm:text-sm">
            &copy; 2024 AnimeFeed. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
