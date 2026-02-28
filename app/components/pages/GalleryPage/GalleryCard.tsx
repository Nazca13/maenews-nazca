import Image from "next/image";
import { Play, Camera } from "lucide-react";
import { GalleryItem } from "@/app/typing";

export function GalleryCard({ item, onClick }: { item: GalleryItem, onClick: () => void }) {
  return (
    <div 
      className="relative rounded-[2.5rem] overflow-hidden cursor-zoom-in group bg-gray-100 aspect-square md:aspect-video" 
      onClick={onClick}
    >
      <Image 
        src={item.thumbnailUrl} 
        alt={item.title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
        {item.type === "video" ? (
          <div className="bg-primary p-5 rounded-full text-white shadow-xl scale-75 group-hover:scale-100 transition-transform">
            <Play fill="currentColor" size={32} />
          </div>
        ) : (
          <div className="bg-white/20 p-5 rounded-full text-white backdrop-blur-md scale-75 group-hover:scale-100 transition-transform">
            <Camera size={32} />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
          <p className="text-white font-black italic uppercase text-lg leading-tight tracking-tighter">
            {item.title}
          </p>
          <span className="text-primary text-[10px] font-black uppercase tracking-widest mt-2 block">
            #{item.category}
          </span>
        </div>
      </div>
    </div>
  );
}