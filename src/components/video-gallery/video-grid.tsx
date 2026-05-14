"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  category: string;
  embedUrl: string;
  thumbnailUrl: string;
  featured: boolean;
}

const CATEGORY_ORDER = ["Wedding", "Commercial", "Social Content", "Same-Day Edit"];

const VIDEOS: VideoItem[] = [
  {
    id: 4,
    title: "Sandeep & Naina Nikkah Ceremony",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/adBzsDSdWWw",
    thumbnailUrl: "https://img.youtube.com/vi/adBzsDSdWWw/maxresdefault.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Yeasin & Nusrat Wedding Ceremony",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/iy1YPsod8zU",
    thumbnailUrl: "https://img.youtube.com/vi/iy1YPsod8zU/maxresdefault.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Tangirul Islam & Fatema Khuda Nikah",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/L-Ozl-L5RnU",
    thumbnailUrl: "https://img.youtube.com/vi/L-Ozl-L5RnU/maxresdefault.jpg",
    featured: true,
  },
  {
    id: 7,
    title: "Madha & Muaz Mehendi Ceremony Teaser",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/FDSpX5GQjCc",
    thumbnailUrl: "https://img.youtube.com/vi/FDSpX5GQjCc/maxresdefault.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Maisha & Mehedi Haldi Ceremony",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/OfMH0zXOdIU",
    thumbnailUrl: "https://img.youtube.com/vi/OfMH0zXOdIU/maxresdefault.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Promitee's Haldi Ceremony",
    category: "Wedding",
    embedUrl: "https://www.youtube.com/embed/5D8_XOnNDaE",
    thumbnailUrl: "https://img.youtube.com/vi/5D8_XOnNDaE/maxresdefault.jpg",
    featured: false,
  },
];

function withAutoplay(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    return url.toString();
  } catch {
    return embedUrl + (embedUrl.includes("?") ? "&" : "?") + "autoplay=1";
  }
}

function groupByCategory(videos: VideoItem[]): [string, VideoItem[]][] {
  const map = new Map<string, VideoItem[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const v of videos) {
    if (!map.has(v.category)) map.set(v.category, []);
    map.get(v.category)!.push(v);
  }
  return Array.from(map.entries()).filter(([, arr]) => arr.length > 0);
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function VideoGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev + 1) % VIDEOS.length : null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev - 1 + VIDEOS.length) % VIDEOS.length : null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, handleNext, handlePrev]);

  const grouped = groupByCategory(VIDEOS);

  return (
    <section className="pb-24 overflow-hidden">
      <div className="container mx-auto px-4 space-y-20">
        {grouped.map(([category, categoryVideos]) => (
          <div key={category}>
            {/* Category heading */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[10.5px] font-bold tracking-[0.25em] uppercase text-brand-400 whitespace-nowrap">
                {category}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>

            {/* Video grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
              }}
            >
              {categoryVideos.map((video) => {
                const globalIdx = VIDEOS.findIndex(v => v.id === video.id);
                return (
                  <motion.div
                    key={video.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredId(video.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedIndex(globalIdx)}
                  >
                    <div className="relative aspect-video bg-muted mb-4 overflow-hidden rounded-2xl border border-white/5">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hoveredId === video.id ? "scale-105" : "scale-100"}`}
                        style={{ backgroundImage: `url('${video.thumbnailUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 ${hoveredId === video.id ? "opacity-0 scale-75" : "opacity-100 scale-100 shadow-[0_0_30px_rgba(255,255,255,0.3)]"}`}
                        >
                          <Play fill="currentColor" className="ml-1" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">{video.title}</h3>
                    <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mt-1">{video.category}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}

        <motion.div
          className="pt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://www.youtube.com/@visualstudioslens"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-full hover:scale-105 inline-block transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            View Full Channel on YouTube
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            <button
              className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/20 rounded-full border border-white/10"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            <button
              className="hidden md:block absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-transform hover:scale-110 z-50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft size={32} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                className="relative w-[90vw] max-w-6xl aspect-video shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl border border-white/10 overflow-hidden bg-black"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 50 || velocity.x > 500) handlePrev();
                  else if (offset.x < -50 || velocity.x < -500) handleNext();
                }}
              >
                <iframe
                  src={withAutoplay(VIDEOS[selectedIndex].embedUrl)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </AnimatePresence>

            <button
              className="hidden md:block absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-transform hover:scale-110 z-50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
              <h3 className="text-white text-xl font-bold tracking-widest uppercase">
                {VIDEOS[selectedIndex].title}
              </h3>
              <p className="text-brand-400 text-sm tracking-widest uppercase mt-1 opacity-80">
                {VIDEOS[selectedIndex].category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
