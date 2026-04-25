"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MoreServicesGrid() {
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const services = [
    {
      title: "Stage & Decorations",
      url: "https://www.instagram.com/neonskiesdecor/",
      img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      label: "View Partner"
    },
    {
      title: "Henna/Mendhi",
      url: "https://www.instagram.com/sumiyashennaart/",
      img: "/images/henna.png",
      label: "View Partner"
    },
    {
      title: "DJ & MCs",
      url: "https://www.instagram.com/neonskiesdecor/",
      img: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=800&auto=format&fit=crop",
      label: "View Partner"
    },
    {
      title: "Cakes & Deserts",
      url: "https://www.instagram.com/sweetzbyluckyllc/",
      img: "/images/cake.png",
      label: "View Partner"
    },
    {
      title: "Album Books",
      url: "/store",
      img: "/images/album.png",
      label: "Visit Store"
    },
    {
      title: "360 & Photo Booths",
      url: "https://www.instagram.com/neonskiesdecor/",
      img: "/images/photobooth.png",
      label: "View Partner"
    }
  ];

  return (
    <section className="pb-24 pt-12 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => {
            const isExternal = service.url.startsWith("http");
            
            const content = (
              <>
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" 
                  style={{ backgroundImage: `url('${service.img}')` }} 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  
                  <div className="transform transition-all duration-500 group-hover:-translate-y-6">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Hover Icon / Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 text-black font-bold uppercase tracking-widest text-xs bg-white backdrop-blur-md px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    {service.label}
                    {isExternal ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                  </div>

                </div>
              </>
            );

            if (isExternal) {
              return (
                <motion.a
                  key={idx}
                  href={service.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="group relative block aspect-[16/10] md:aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-muted"
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <Link key={idx} href={service.url} passHref legacyBehavior>
                <motion.a
                  variants={itemVariants}
                  className="group relative block aspect-[16/10] md:aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-muted"
                >
                  {content}
                </motion.a>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
