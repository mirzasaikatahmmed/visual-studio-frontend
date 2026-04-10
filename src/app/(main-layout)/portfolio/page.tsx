"use client";

import Link from "next/link";
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "All" | "Weddings" | "Corporate" | "Events";

const portfolioData = [
  { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", title: "Rohan & Zara's Wedding", category: "Weddings", height: "150%" },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop", title: "Tech Summit 2026", category: "Corporate", height: "100%" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", title: "Royal Floral Setup", category: "Events", height: "120%" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop", title: "Ayesha's Mehendi", category: "Weddings", height: "80%" },
  { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop", title: "Bridal Details", category: "Weddings", height: "140%" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop", title: "Luxury Gala Dinner", category: "Corporate", height: "120%" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", title: "The First Dance", category: "Weddings", height: "100%" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", title: "Minimalist Soiree", category: "Events", height: "150%" },
  { src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop", title: "Rustic Aesthetic", category: "Events", height: "80%" }
];

const categories: Category[] = ["All", "Weddings", "Corporate", "Events"];

import { HeroSection } from "@/components/hero-section";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    if (activeCategory === "All") return portfolioData;
    return portfolioData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

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

  return (
    <div className="min-h-screen pb-24 bg-background selection:bg-fuchsia-500/30">
      <HeroSection 
        subtitle="Our Work"
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">Portfolio</span></>}
        desc="A curated exhibition of our finest visual stories. Explore the moments we've frozen in time across luxury weddings, brand campaigns, and creative events."
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="container max-w-7xl mx-auto px-4 mt-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 bg-[#18181A]/80 backdrop-blur-3xl p-1.5 rounded-full border border-white/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.5)] self-start md:self-auto shrink-0"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors z-10 ${
                  activeCategory === cat ? "text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="portfolio-filter"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group overflow-hidden rounded-[2rem] cursor-pointer border border-white/5 bg-[#111]"
                onClick={() => setSelectedIndex(idx)}
              >
                <div 
                  className="w-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.src}')`, paddingBottom: item.height }}
                />
                
                {/* Advanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-2 border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 rounded-full inline-block backdrop-blur-md">
                      {item.category}
                    </span>
                    <h3 className="text-white text-2xl font-bold tracking-tight">{item.title}</h3>
                  </motion.div>
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/20 hover:bg-white hover:text-black">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Cinematic Pixieset Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center border border-white/10"
        >
          {/* Glass background layers */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-black/50 to-indigo-900/20 backdrop-blur-3xl" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-600/30 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter text-white">
              Full Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Galleries</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed font-medium">
              We deliver all our final, high-resolution masterpieces through beautiful, private online galleries powered by Pixieset. 
              View our complete, uncurated stories to witness our true consistency across entire events.
            </p>
            <a 
              href="https://visualstudionyc.pixieset.com/portfolio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Explore Pixieset <ExternalLink size={18} />
            </a>
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            <button 
              className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/20 rounded-full border border-white/10"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-transform hover:scale-110 z-50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
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
                className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
              >
                <img 
                  src={filteredData[selectedIndex].src} 
                  alt={filteredData[selectedIndex].title} 
                  className="max-w-full max-h-[80vh] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-lg border border-white/10" 
                />
                <div className="mt-6 text-center">
                  <h3 className="text-white text-xl font-bold tracking-widest uppercase">{filteredData[selectedIndex].title}</h3>
                  <p className="text-fuchsia-400 text-sm tracking-widest uppercase mt-1 opacity-80">{filteredData[selectedIndex].category}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-transform hover:scale-110 z-50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
