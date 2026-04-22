"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

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
    { name: "Emily & David", time: "2 weeks ago", text: "Visual Studio captured our wedding beautifully. The album they delivered is breathtaking. A true masterpiece.", avatar: "https://i.pravatar.cc/150?u=1" },
    { name: "Atlas Tech Corp", time: "1 month ago", text: "Incredible corporate headshots and event coverages. Our marketing materials look 10x better now.", avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Sophia R.", time: "3 months ago", text: "The team at Dreams Decor transformed our simple hall into a royal palace. Highly recommend their integrated service.", avatar: "https://i.pravatar.cc/150?u=3" },
    { name: "James & Sarah", time: "4 months ago", text: "Amazing cinematography! They made our special day look like a movie. The team was extremely professional and creative.", avatar: "https://i.pravatar.cc/150?u=4" },
    { name: "The Grand Hotel", time: "5 months ago", text: "We use Visual Studio for all our corporate events. Always punctual, professional, and they deliver absolutely stunning photos.", avatar: "https://i.pravatar.cc/150?u=5" }
  ];

  const duplicatedReviews = [...reviews, ...reviews, ...reviews]; // Tripled to ensure smooth infinite scroll

  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        {/* Animated Header */}
        <motion.div 
          className="text-center"
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
            <GoogleIcon className="w-4 h-4" /> 
            5.0 rating across 120+ reviews
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee Effect */}
      <div className="relative w-full overflow-hidden flex py-4 group">
        {/* Adding gradient masks to fade the edges smoothly */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-33.333333%"] }} 
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {duplicatedReviews.map((review, i) => (
            <div key={i} className="w-[320px] md:w-[400px] shrink-0 p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col gap-4 mx-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.time}</div>
                  </div>
                </div>
                <GoogleIcon className="w-5 h-5" />
              </div>
              <div className="flex text-yellow-500 gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} fill="currentColor" strokeWidth={0} size={14} />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
                "{review.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
