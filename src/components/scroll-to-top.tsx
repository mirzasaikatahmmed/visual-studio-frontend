"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when scrolling past 5% of the page
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-[60] flex items-center justify-center rounded-full bg-[#18181A]/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group overflow-hidden"
          style={{ width: "44px", height: "44px" }}
          aria-label="Scroll to top"
        >
          {/* Animated SVG Progress Ring */}
          <svg 
            width="44" 
            height="44" 
            viewBox="0 0 100 100" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none"
          >
            {/* Background Track */}
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              className="text-white/10" 
            />
            {/* Interactive Progress Indicator */}
            <motion.circle
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="url(#brandGradient)" 
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(221,148,84,0.8)]"
              style={{ pathLength: scrollYProgress }}
            />
            {/* Gradient Definition for the line */}
            <defs>
              <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dd9454" />
                <stop offset="100%" stopColor="#b07d4a" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Content Component */}
          <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/5 group-hover:bg-brand-500/20 group-hover:border-brand-400/50 transition-all duration-300">
            <ArrowUp size={16} className="text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          
          {/* Subtle Glow beneath the button */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}



