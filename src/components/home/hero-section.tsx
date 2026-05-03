"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const line1 = "Capturing Moments.";
  const line2 = "Creating Experiences.";
  const [isHovered, setIsHovered] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuggestion(true), 2500);
    const hideTimer = setTimeout(() => setShowSuggestion(false), 7500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

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
        
        {/* Animated Hover Mask Title */}
        <div className="relative group cursor-default mx-auto inline-block text-center flex-col items-center justify-start">
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
            <div className="w-full leading-tight">Capturing Moments.</div>
            <div className="w-full leading-tight">Creating Experiences.</div>
          </div>

          {/* Foreground Animated Layer (Fades OUT on hover) */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center justify-start text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 uppercase group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
          >
            <div className="text-white w-full leading-tight flex flex-wrap justify-center">
              {line1.split("").map((char, index) => (
                <motion.span variants={letterAnim} key={`l1-${index}`} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="text-white opacity-80 w-full leading-tight flex flex-wrap justify-center">
              {line2.split("").map((char, index) => (
                <motion.span variants={letterAnim} key={`l2-${index}`} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-base md:text-xl text-gray-200 max-w-2xl mb-10 font-medium px-4"
        >
          Cinematic storytelling for every culture, every love, every moment.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full px-8 sm:w-auto sm:px-0"
        >
          <div
            className="relative inline-flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(255,255,255,0.18), 0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-sm overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* shine sweep */}
              <span
                className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out z-0"
                style={{
                  background: "linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.35) 50%, transparent 75%)",
                }}
              />
              {/* glass tint brighten on hover */}
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <Link
                href="/portfolio"
                className="relative z-10 px-8 py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs text-white"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">View Portfolio</span>
                <motion.span
                  className="flex items-center"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.span>
              </Link>
            </motion.div>
            <AnimatePresence>
              {(isHovered || showSuggestion) && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full mt-2 w-max z-50 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-gray-800 dark:border-b-gray-200" />
                  <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-[10px] sm:text-xs font-medium px-2 py-1 rounded shadow-md tracking-wide">
                    check out our latest work
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-transparent border border-white/50 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center"
          >
            Book a Session
          </Link>
          <Link 
            href="/#services" 
            className="px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center"
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


