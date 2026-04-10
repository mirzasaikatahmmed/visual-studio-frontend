"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface HeroSectionProps {
  title: ReactNode;
  subtitle: ReactNode;
  desc: string;
  image: string;
}

export function HeroSection({ title, subtitle, desc, image }: HeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-[60vh] md:h-[65vh] w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="w-full h-full bg-cover bg-center transform"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Gradient that fades to the page's background color at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Dark overlay at top for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
      </div>
      
      <motion.div 
        className="relative z-10 text-center px-4 max-w-3xl mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase mb-4">{subtitle}</motion.p>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-tight text-white">{title}</motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto">
          {desc}
        </motion.p>
      </motion.div>
    </section>
  );
}
