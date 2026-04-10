"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const starVariants = {
    hidden: { opacity: 0, rotate: -45, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 10 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const reviews = [
    { name: "Emily & David", text: "Visual Studio captured our wedding beautifully. The album they delivered is breathtaking. A true masterpiece." },
    { name: "Atlas Tech Corp", text: "Incredible corporate headshots and event coverages. Our marketing materials look 10x better now." },
    { name: "Sophia R.", text: "The team at Dreams Decor transformed our simple hall into a royal palace. Highly recommend their integrated service." }
  ];

  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <motion.div 
            className="flex justify-center gap-1 mb-4 text-yellow-500"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} variants={starVariants}>
                <Star fill="currentColor" size={24} />
              </motion.div>
            ))}
          </motion.div>
          <motion.h2 variants={headerVariants} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Client Love</motion.h2>
          <motion.p variants={headerVariants} className="text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google" className="w-4 h-4" /> 
            5.0 rating across 120+ reviews
          </motion.p>
        </motion.div>
        
        {/* Animated Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reviews.map((review, i) => (
            <motion.div key={i} variants={itemVariants} className="p-8 bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
              <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
              <div className="font-bold uppercase tracking-widest text-sm">— {review.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
