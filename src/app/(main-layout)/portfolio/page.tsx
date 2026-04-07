"use client";

import Link from "next/link";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", // Wedding Couple
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop", // Elegant Setup
  "https://images.unsplash.com/photo-1554048665-8c34fbc46098?q=80&w=800&auto=format&fit=crop", // Albums/Detail
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop", // Luxury Hero View
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", // Floral Decor
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", // Wedding Lighting
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop", // Aesthetic Rustic
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", // Modern Minimal Event
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"  // Corporate Coffee Style
];

export default function PortfolioPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [selectedIndex]);

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
    <>
      <div className="pt-24 pb-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Our Portfolio</h1>
          <p className="text-muted-foreground text-lg">
            A curated selection of our finest work. From intimate weddings to grand corporate campaigns, 
            every photograph tells a story.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid relative group overflow-hidden bg-muted rounded-md cursor-pointer"
              onClick={() => setSelectedIndex(idx)}
            >
               <div 
                className="w-full aspect-auto h-[300px] md:h-auto min-h-[250px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${src}')`, paddingBottom: idx % 3 === 0 ? "120%" : idx % 2 === 0 ? "80%" : "150%" }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                 <span className="text-white font-medium uppercase tracking-wider border-b border-white pb-1">View Full</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pixieset CTA */}
        <div className="mt-24 text-center p-12 bg-white text-black rounded-lg">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Full Client Galleries</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We deliver all our final, high-resolution images through beautiful, private online galleries powered by Pixieset. 
            View our complete, uncurated client galleries to see full event coverage.
          </p>
          <a 
            href="https://visualstudionyc.pixieset.com/portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-black/80 transition-colors uppercase tracking-widest text-sm"
          >
            Open Pixieset <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-50 bg-black/20 rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors z-50 bg-black/10 hover:bg-black/40 rounded-full"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft size={48} />
            </button>
            
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedIndex}
                src={images[selectedIndex]} 
                alt="Portfolio view" 
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl" 
              />
            </AnimatePresence>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors z-50 bg-black/10 hover:bg-black/40 rounded-full"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={48} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 tracking-widest text-sm font-medium bg-black/20 px-4 py-1 rounded-full backdrop-blur-md">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
