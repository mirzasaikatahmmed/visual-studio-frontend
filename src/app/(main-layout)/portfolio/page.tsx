"use client";

import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Wedding Ceremony" | "Henna Ceremony" | "Group Pictures" | "Studio Photoshoot" | "Gender Reveal" | "Baby Shower Ceremony" | "Visual Studio Portfolio" | "Maternity Ceremony" | "Baby Photography" | "Birthday Ceremony";

const portfolioData = [
  // Wedding Ceremony (5 images)
  { src: "https://images.pixieset.com/980709211/960156bac1df4a84d0a1fe804b396447-large.JPG", title: "Nikkah Moment", category: "Wedding Ceremony", height: "150%" },
  { src: "https://images.pixieset.com/980709211/1fc436bff460bcc5cbf3d3983788ce82-large.JPG", title: "Nikkah Details", category: "Wedding Ceremony", height: "100%" },
  { src: "https://images.pixieset.com/980709211/16938d0b4fd71b0bc6c3a3683cdb5508-large.JPG", title: "Bridal Glow", category: "Wedding Ceremony", height: "120%" },
  { src: "https://images.pixieset.com/980709211/779c4f3e14f4a07ac3d96ec4a414ed7e-large.JPG", title: "Groom Portrait", category: "Wedding Ceremony", height: "80%" },
  { src: "https://images.pixieset.com/980709211/c3b22003dc849f84429033e6ccf9f81b-large.JPG", title: "The Venue", category: "Wedding Ceremony", height: "140%" },

  // Henna Ceremony (5 images)
  { src: "https://images.pixieset.com/280709211/64b65561c204c44f4c755e4f30fcfee6-large.jpeg", title: "Henna Art", category: "Henna Ceremony", height: "100%" },
  { src: "https://images.pixieset.com/280709211/5f406eb105621e23ce6e612503af6b12-large.jpeg", title: "Mehendi Details", category: "Henna Ceremony", height: "150%" },
  { src: "https://images.pixieset.com/280709211/d0dc590cbac40c8e50fa79e549f5aee1-large.jpeg", title: "Colorful Setup", category: "Henna Ceremony", height: "120%" },
  { src: "https://images.pixieset.com/280709211/889d6f373f7585926a76fbef9ffaf08b-large.jpeg", title: "Bride's Hands", category: "Henna Ceremony", height: "80%" },
  { src: "https://images.pixieset.com/280709211/b3e84eaf6daa48766a05693310dc0613-large.jpeg", title: "Traditional Attire", category: "Henna Ceremony", height: "140%" },

  // Group Pictures (5 images)
  { src: "https://images.pixieset.com/101709211/eeefa3e9e6745badab5fa7ff1582b56b-large.jpeg", title: "Family Portrait", category: "Group Pictures", height: "120%" },
  { src: "https://images.pixieset.com/101709211/852c1cc4853b815835fef08fd471edc8-large.jpeg", title: "Bridal Party", category: "Group Pictures", height: "80%" },
  { src: "https://images.pixieset.com/101709211/7ee4747acceddeca1a522ad89bb036bc-large.jpeg", title: "Groomsmen", category: "Group Pictures", height: "150%" },
  { src: "https://images.pixieset.com/101709211/aa719ad53821d2c8d72e294639f78b05-large.jpeg", title: "Friends Gathering", category: "Group Pictures", height: "100%" },
  { src: "https://images.pixieset.com/101709211/541b4c59005ed13119a399e3c981ada9-large.jpeg", title: "Celebration Toast", category: "Group Pictures", height: "140%" },

  // Studio Photoshoot (5 images)
  { src: "https://images.pixieset.com/961709211/fb615eb630269bcb7382ea6bf0b86733-large.jpg", title: "Studio Portrait", category: "Studio Photoshoot", height: "120%" },
  { src: "https://images.pixieset.com/961709211/9ab74318a660102bba3c06db54a66d43-large.jpg", title: "Creative Lighting", category: "Studio Photoshoot", height: "150%" },
  { src: "https://images.pixieset.com/961709211/9e9c12410ff70952e0649560b514933a-large.jpg", title: "Editorial Look", category: "Studio Photoshoot", height: "100%" },
  { src: "https://images.pixieset.com/961709211/71941056bbeed71bddb0dfad5c868755-large.jpg", title: "Fashion Vibes", category: "Studio Photoshoot", height: "140%" },
  { src: "https://images.pixieset.com/961709211/79a04435ae961823a06c8f830ae7f4c0-large.jpg", title: "Classic Pose", category: "Studio Photoshoot", height: "80%" },

  // Gender Reveal (5 images)
  { src: "https://images.pixieset.com/681709211/db21f350440acaf54bdf18a31d9f22f4-large.JPG", title: "The Big Reveal", category: "Gender Reveal", height: "120%" },
  { src: "https://images.pixieset.com/681709211/978b254c625d68df4368335c6dbdd173-large.JPG", title: "Joyful Tears", category: "Gender Reveal", height: "150%" },
  { src: "https://images.pixieset.com/681709211/118a6aca8408f27e179bcb190d21875e-large.JPG", title: "Pink or Blue", category: "Gender Reveal", height: "100%" },
  { src: "https://images.pixieset.com/681709211/6acc565616f7d86f000e7e0ea72831f1-large.JPG", title: "Family Excitement", category: "Gender Reveal", height: "140%" },
  { src: "https://images.pixieset.com/681709211/d59d4d19d96011ad64edab36d0a9ee90-large.JPG", title: "Confetti Pop", category: "Gender Reveal", height: "80%" },

  // Baby Shower Ceremony (5 images)
  { src: "https://images.pixieset.com/061709211/7090efa4eabf19f277862f4b881643df-large.JPG", title: "Baby Shower Joy", category: "Baby Shower Ceremony", height: "120%" },
  { src: "https://images.pixieset.com/061709211/75e7e038813b9a7a98ea1fbdc54297eb-large.JPG", title: "Beautiful Mom-to-be", category: "Baby Shower Ceremony", height: "150%" },
  { src: "https://images.pixieset.com/061709211/66edcd011f6be5ecb2d7ef1b0e8b0a95-large.JPG", title: "Expecting Parents", category: "Baby Shower Ceremony", height: "100%" },
  { src: "https://images.pixieset.com/061709211/8a33a82364945be588d3b6a4407711a0-large.JPG", title: "Celebration Decor", category: "Baby Shower Ceremony", height: "140%" },
  { src: "https://images.pixieset.com/061709211/694c2f2671544df7217e92fbb3d30f6f-large.JPG", title: "Smiles & Happiness", category: "Baby Shower Ceremony", height: "80%" },

  // Maternity Ceremony (5 images)
  { src: "https://images.pixieset.com/351709211/f95a42109a62df6ed75cfd6799369200-large.jpg", title: "Maternity Glow", category: "Maternity Ceremony", height: "120%" },
  { src: "https://images.pixieset.com/351709211/3a48a78f37057da321dd88ab33faa84f-large.jpg", title: "Expecting Love", category: "Maternity Ceremony", height: "150%" },
  { src: "https://images.pixieset.com/351709211/54d3e8a85da582fdbf44574ced40a5c4-large.jpg", title: "Baby Bump Focus", category: "Maternity Ceremony", height: "100%" },
  { src: "https://images.pixieset.com/351709211/c3c532996ea951899664b00c3c229d85-large.jpg", title: "Parents to Be", category: "Maternity Ceremony", height: "140%" },
  { src: "https://images.pixieset.com/351709211/c0ed9e1dbc90a530a3f82e59b068edc7-large.jpg", title: "Natural Beauty", category: "Maternity Ceremony", height: "80%" },

  // Baby Photography (5 images)
  { src: "https://images.pixieset.com/241709211/56d7d9450af048dc45e5c3603b28de88-large.jpg", title: "Innocence", category: "Baby Photography", height: "120%" },
  { src: "https://images.pixieset.com/241709211/c611126892950ed9f0a71d5ee24e87c6-large.jpg", title: "Little Toes", category: "Baby Photography", height: "150%" },
  { src: "https://images.pixieset.com/241709211/4e7ad889b1bd82407cc766aa3672bcb7-large.jpg", title: "Sleepy Smiles", category: "Baby Photography", height: "100%" },
  { src: "https://images.pixieset.com/241709211/1ba28598cb0f3367faa77741b242c7ae-large.jpg", title: "Baby Expressions", category: "Baby Photography", height: "140%" },
  { src: "https://images.pixieset.com/241709211/56996dfc74734cd8d209b8ccc85de63a-large.jpg", title: "Dreaming", category: "Baby Photography", height: "80%" },

  // Birthday Ceremony (5 images)
  { src: "https://images.pixieset.com/121709211/f2e8027e54140e8f9c07dbe0b052d65f-large.jpg", title: "Birthday Cake", category: "Birthday Ceremony", height: "120%" },
  { src: "https://images.pixieset.com/121709211/b2f9a21231042913678b9a805c34fb41-large.jpg", title: "Party Time", category: "Birthday Ceremony", height: "150%" },
  { src: "https://images.pixieset.com/121709211/8ae7dc5d0444ddeab3db162e6d92d764-large.jpg", title: "Blowing Candles", category: "Birthday Ceremony", height: "100%" },
  { src: "https://images.pixieset.com/121709211/39fe4c44ba2601d3890a6991ad4ba074-large.jpg", title: "Birthday Joy", category: "Birthday Ceremony", height: "140%" },
  { src: "https://images.pixieset.com/121709211/4b1389eeefa3020e96187fbf2d8743f4-large.jpg", title: "Friends & Fun", category: "Birthday Ceremony", height: "80%" }
];

const categories: Category[] = ["Wedding Ceremony", "Henna Ceremony", "Group Pictures", "Studio Photoshoot", "Gender Reveal", "Baby Shower Ceremony", "Visual Studio Portfolio", "Maternity Ceremony", "Baby Photography", "Birthday Ceremony"];

import { HeroSection } from "@/components/hero-section";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Wedding Ceremony");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
  }, []);

  const filteredData = useMemo(() => {
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
    <div className="min-h-screen pb-24 bg-background selection:bg-brand-500/30">
      <HeroSection 
        subtitle="Our Work"
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Portfolio</span></>}
        desc="A curated exhibition of our finest visual stories. Explore the moments we've frozen in time across luxury weddings, brand campaigns, and creative events."
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="container max-w-7xl mx-auto px-4 mt-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-12 w-full">
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tighter uppercase text-foreground"
          >
            Portfolio
          </motion.h2>

          {/* Filter Pills */}
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
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors z-10 whitespace-nowrap ${
                    activeCategory === cat ? "text-white dark:text-black" : "text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="portfolio-filter"
                      className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-2 lg:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                custom={idx}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid relative group overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer border border-transparent dark:border-white/5 bg-gray-100 dark:bg-[#111]"
                onClick={() => setSelectedIndex(idx)}
              >
                <div 
                  className="w-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.src}')`, paddingBottom: item.height }}
                />
                
                {/* Advanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-2 border border-brand-400/30 bg-brand-400/10 px-3 py-1 rounded-full inline-block backdrop-blur-md">
                      {item.category}
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
        </motion.div>

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
                className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center touch-none cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  if (offset.x > 50 || velocity.x > 500) {
                    handlePrev();
                  } else if (offset.x < -50 || velocity.x < -500) {
                    handleNext();
                  }
                }}
              >
                <Image
                  src={filteredData[selectedIndex].src}
                  alt={filteredData[selectedIndex].title}
                  width={1920}
                  height={1280}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-lg border border-white/10 pointer-events-none"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-white text-xl font-bold tracking-widest uppercase">{filteredData[selectedIndex].title}</h3>
                  <p className="text-brand-400 text-sm tracking-widest uppercase mt-1 opacity-80">{filteredData[selectedIndex].category}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              className="hidden md:block absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-transform hover:scale-110 z-50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
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



