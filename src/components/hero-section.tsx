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
    <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[65vh] max-h-[700px] flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute -inset-1 bg-cover bg-center transform"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Dark overlay to ensure white text is always readable */}
        <div className="absolute -inset-1 bg-black/40" />
        {/* Gradient that fades to the page's background color only at the very bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 xl:h-48 bg-gradient-to-t from-background to-transparent" />
        {/* Extra solid block at the bottom to guarantee no 1px gap bleeding */}
        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-background" />
        {/* Dark overlay at top for navbar contrast */}
        <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 text-center mb-20 md:mb-0 px-4 max-w-3xl mt-30 md:mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="text-xs md:text-sm tracking-[0.3em] text-white font-semibold uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{subtitle}</motion.p>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-tight text-white text-shadow-lg drop-shadow-lg">{title}</motion.h1>
        <motion.p variants={itemVariants} className="text-sm md:text-xl text-white font-medium max-w-xl mx-auto text-shadow-lg">
          {desc}
        </motion.p>
      </motion.div>
    </section>
  );
}


