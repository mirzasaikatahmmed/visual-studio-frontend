"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
export function HeroSection() {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowSuggestion(true), 2500);
    const hideTimer = setTimeout(() => setShowSuggestion(false), 7500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  const line1 = "Capturing Moments.";
  const line2 = "Creating Experiences.";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 }
    }
  };

  const letterAnim: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 10 } }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as const }}
        className="absolute -inset-1 z-0 bg-cover bg-center brightness-[0.45]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.5) 100%)"
      }} />
      
      <div className="container relative z-[2] mx-auto px-4 flex flex-col items-center text-center">

        {/* SEO H1 — visible but subtle, Google-readable */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-5"
        >
          Premier South Asian &amp; Muslim Wedding Photographers in NY
        </motion.h1>

        {/* Brand line H2 — animated hover mask */}
        <h2
          role="presentation"
          className="relative group cursor-default mx-auto inline-block text-center flex-col items-center justify-start max-w-[90vw]"
        >
          {/* Background Masked Layer (Fades IN on hover) */}
          <div 
            className="absolute inset-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 uppercase flex flex-col items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none"
            style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1500&auto=format&fit=crop')", // Gorgeous bright wedding details
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundClip: "text",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               color: "transparent"
            }}
          >
            <div className="w-full leading-[1.1] sm:leading-tight">Capturing Moments.</div>
            <div className="w-full leading-[1.1] sm:leading-tight">Creating Experiences.</div>
          </div>

          {/* Foreground Animated Layer (Fades OUT on hover) */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center justify-start text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight sm:tracking-tighter mb-4 sm:mb-6 uppercase group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
          >
            <div className="text-white w-full leading-[1.1] sm:leading-tight flex flex-wrap justify-center">
              {line1.split("").map((char, index) => (
                <motion.span variants={letterAnim} key={`l1-${index}`} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="text-white opacity-80 w-full leading-[1.1] sm:leading-tight flex flex-wrap justify-center mt-1 sm:mt-0">
              {line2.split("").map((char, index) => (
                <motion.span variants={letterAnim} key={`l2-${index}`} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-sm md:text-xl text-gray-200 max-w-2xl mb-4 font-medium px-6 md:px-4 leading-relaxed"
        >
          Cinematic storytelling for every culture, every love, every moment.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-white/50 text-xs md:text-sm tracking-widest uppercase mb-8 md:mb-12"
        >
          Packages from $499 · Free 15-min consultation
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-10 sm:w-auto sm:px-0 mt-4"
        >
          {/* Primary CTA: View Portfolio */}
          <div
            className="relative w-full sm:w-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {(isHovered || showSuggestion) && (
                <motion.div
                  key="suggestion"
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-20 pointer-events-none"
                >
                  <div className="relative bg-black/85 backdrop-blur-sm text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap border border-white/10">
                    {/* triangle pointer */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-black/85" />
                    Check out our latest work
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(255,255,255,0.18), 0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-sm overflow-hidden w-full sm:w-auto"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <Link
                href="/portfolio"
                className="relative z-10 px-6 md:px-8 py-3.5 md:py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] md:text-xs text-white"
              >
                <span>View Portfolio</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Secondary CTA: Book Session */}
          <Link 
            href="/contact" 
            className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-transparent border border-white/40 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            Book a Session
          </Link>

          {/* Tertiary Link: Explore */}
          <Link 
            href="/#services" 
            className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            Explore More
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[2]"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-1">Scroll Explore</span>
        <div className="flex flex-col items-center text-white/50">
          <ChevronUp size={16} />
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden my-1">
              <motion.div 
                animate={{ y: [0, 24, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white" 
              />
          </div>
          <ChevronDown size={16} />
        </div>
      </motion.div>
    </section>
  );
}


