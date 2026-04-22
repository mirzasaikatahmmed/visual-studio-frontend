"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
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
        className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.5]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        
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
          <Link 
            href="/portfolio" 
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            View Portfolio <ArrowRight size={16} />
          </Link>
          <Link 
            href="/#services" 
            className="px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center"
          >
            Explore Services
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-transparent border border-white/50 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll Explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white" 
            />
        </div>
      </motion.div>
    </section>
  );
}


