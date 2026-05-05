"use client";

import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Yellowtail } from "next/font/google";
import { fetchPortfolios, fetchCategories, type Portfolio, type PortfolioCategory } from "@/lib/portfolioApi";
import { StayInspiredPopup } from "@/components/stay-inspired-popup";
import Link from "next/link";

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
});

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([fetchPortfolios(), fetchCategories()])
      .then(([imgs, cats]) => {
        const clientLogoCatId = cats.find(c => c.slug === "client-logos")?.id;
        const filteredCats = cats.filter(c => c.slug !== "client-logos");
        const filteredImgs = imgs.filter(i => i.categoryId !== clientLogoCatId);
        setCategories(filteredCats);
        setPortfolios(filteredImgs);
        if (filteredCats.length > 0) setActiveCategory(filteredCats[0].name);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      startX = e.clientX;
      scrollLeft = container.scrollLeft;
    };

    const onMouseUp = () => {
      isDown = false;
      setTimeout(() => { isDragging = false; }, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startX) * 2; // Scroll speed
      if (Math.abs(walk) > 5) {
        isDragging = true;
      }
      container.scrollLeft = scrollLeft - walk;
    };

    const onClick = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick, { capture: true });

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick, { capture: true });
    };
  }, [loading]);

  const filteredData = useMemo(() => {
    return portfolios.filter(item => item.category?.name === activeCategory);
  }, [portfolios, activeCategory]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % filteredData.length);
    }
  }, [selectedIndex, filteredData.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + filteredData.length) % filteredData.length);
    }
  }, [selectedIndex, filteredData.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Derive background image for the frosted effect
  const bgImage = useMemo(() => {
    return portfolios.find((item) => item.category?.name === activeCategory)?.url || "";
  }, [portfolios, activeCategory]);

  return (
    <div className="relative min-h-screen pb-24 selection:bg-brand-500/30">
      <StayInspiredPopup />
      {/* Background base layer to ensure consistent theme background */}
      <div className="fixed inset-0 z-[-2] bg-background" />

      <AnimatePresence mode="wait">
        {bgImage && (
          <motion.div
            key={bgImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[-1] pointer-events-none transition-transform dark:opacity-[0.4]"
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(6px) saturate(1.2)",
              transform: "scale(1.05)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 pt-32 mt-8">

        {/* Title and Filter Section - Elevated z-index to prevent image overlap */}
        <div className="relative z-50 flex flex-col items-center gap-0 mb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center text-center mb-8"
          >
            <span className="text-base md:text-2xl font-semibold tracking-[0.3em] uppercase text-foreground/80 mb-[-0.6rem] z-10">
              Our
            </span>
            <span
              className={`${yellowtail.className} text-6xl md:text-8xl text-foreground font-normal leading-none`}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Filter Pills */}
          {!loading && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-[#18181A]/80 backdrop-blur-3xl rounded-full border border-black/10 dark:border-white/20 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] mx-auto shrink-0 max-w-full overflow-hidden"
            >
              <div
                ref={scrollContainerRef}
                className="flex items-center gap-2 p-1.5 overflow-x-auto overscroll-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.name); setSelectedIndex(null); }}
                    className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors z-10 whitespace-nowrap ${activeCategory === cat.name ? "text-white dark:text-black" : "text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white"
                      }`}
                  >
                    {activeCategory === cat.name && (
                      <motion.div
                        layoutId="portfolio-filter"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredData.length === 0 && (
          <div className="text-center py-32 text-muted-foreground text-sm">
            No images in this category yet.
          </div>
        )}

        {/* Masonry Grid - Pure Fade Transition (layout removed to fix falling bug with CSS columns) */}
        {!loading && filteredData.length > 0 && (
          <div className="relative z-0">
            <div className="columns-2 lg:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
              <AnimatePresence mode="sync" initial={false}>
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="break-inside-avoid relative group overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer dark:border-white/5 bg-gray-100 dark:bg-[#111]"
                    onClick={() => setSelectedIndex(filteredData.indexOf(item))}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt || item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />

                    {/* Advanced Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <div className="translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-2 border border-brand-400/30 bg-brand-400/10 px-3 py-1 rounded-full inline-block backdrop-blur-md">
                          {item.category?.name}
                        </span>
                        <h3 className="text-white text-2xl font-bold tracking-tight">{item.title}</h3>
                      </div>
                      <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/20 hover:bg-white hover:text-black">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Cinematic Pixieset Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="mt-32 relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center border border-white/10"
        >
          {/* Glass background layers */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-black/50 to-indigo-900/20 backdrop-blur-3xl" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/30 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-600/20 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter text-white">
              Full Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-400">Galleries</span>
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="text-white/60 text-lg mb-10 leading-relaxed font-medium">
              We deliver all our final, high-resolution masterpieces through beautiful, private online galleries powered by Pixieset.
              View our complete, uncurated stories to witness our true consistency across entire events.
            </motion.p>
            <motion.a
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              href="https://gallery.visualstudioslens.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Explore Gallery <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Behind the Scenes CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
          className="mt-16 relative overflow-hidden rounded-[3rem] border border-white/10 grid grid-cols-1 md:grid-cols-2 min-h-[360px]"
        >
          {/* Dark background */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/40" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 blur-[100px] rounded-full" />

          {/* Left: Text */}
          <div className="relative z-10 flex flex-col justify-center p-10 md:p-14">
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4 block"
            >
              Unfiltered
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-white mb-5 leading-tight"
            >
              Behind the<br />Scenes
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-xs"
            >
              Meet our crew, female team members, and see the real moments that happen behind the lens.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <Link
                href="/behind-the-scenes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                Go Behind the Scenes
              </Link>
            </motion.div>
          </div>

          {/* Right: Photo grid preview */}
          <div className="relative z-10 grid grid-cols-2 gap-2 p-4 md:p-6">
            {[
              "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
            ].map((src, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.08 } } }}
                className="relative overflow-hidden rounded-2xl aspect-square bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover opacity-70" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Dynamic blurred background based on current image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url('${filteredData[selectedIndex].url}')`,
                  filter: "blur(25px) saturate(1.5)",
                }}
              />
            </AnimatePresence>

            {/* Extra darkening overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Close Button */}
            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 p-3 text-white/70 hover:text-white transition-all z-50 bg-white/10 hover:bg-white/20 hover:scale-110 rounded-full border border-white/20 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            {/* Left Nav Button */}
            <button
              className="flex absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/70 hover:text-white transition-all hover:scale-110 z-50 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full backdrop-blur-md shadow-2xl items-center justify-center"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft size={28} className="md:w-8 md:h-8" />
            </button>

            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none perspective-[1000px]">
              {filteredData.map((item, idx) => {
                // Calculate offset wrapping around the array
                let diff = idx - selectedIndex;
                const len = filteredData.length;
                if (diff > len / 2) diff -= len;
                if (diff < -len / 2) diff += len;

                const isVisible = Math.abs(diff) <= 1; // Show only -1, 0, 1

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      x: diff === 0 ? "0%" : diff > 0 ? "110%" : "-110%",
                      scale: diff === 0 ? 1 : 0.8,
                      opacity: diff === 0 ? 1 : 0.4,
                      zIndex: diff === 0 ? 40 : 30,
                      rotateY: diff === 0 ? 0 : diff > 0 ? -15 : 15,
                      filter: diff === 0 ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.7)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                    className={`absolute flex flex-col items-center justify-center ${diff === 0 ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "cursor-pointer pointer-events-auto"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (diff === 1) handleNext();
                      if (diff === -1) handlePrev();
                    }}
                    drag={diff === 0 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(e, { offset: dragOffset, velocity }) => {
                      if (dragOffset.x > 50 || velocity.x > 500) handlePrev();
                      else if (dragOffset.x < -50 || velocity.x < -500) handleNext();
                    }}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt || item.title}
                      width={1920}
                      height={1280}
                      className="max-w-[85vw] md:max-w-[65vw] max-h-[60vh] md:max-h-[75vh] w-auto h-auto object-contain shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-2xl border border-white/20 pointer-events-none select-none"
                    />

                    {/* Caption for active image */}
                    <AnimatePresence>
                      {diff === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="absolute -bottom-20 md:-bottom-24 text-center w-full"
                        >
                          <h3 className="text-white text-xl md:text-3xl font-extrabold tracking-widest uppercase drop-shadow-xl">{item.title}</h3>
                          <p className="text-brand-400 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mt-2 opacity-90 drop-shadow-md">{item.category?.name}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Nav Button */}
            <button
              className="flex absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/70 hover:text-white transition-all hover:scale-110 z-50 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full backdrop-blur-md shadow-2xl items-center justify-center"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={28} className="md:w-8 md:h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



