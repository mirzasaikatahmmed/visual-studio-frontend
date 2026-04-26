"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ExpertiseSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const services = [
    {
      title: "Portfolio",
      desc: "Explore our curated collection of photography and creative works.",
      img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      href: "/portfolio"
    },
    {
      title: "Video Gallery",
      desc: "Cinematic storytelling through expertly crafted video productions.",
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
      href: "/video-gallery"
    },
    {
      title: "Visual Marketing",
      desc: "Corporate branding, product shoots, and campaign visuals.",
      img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
      href: "/visual-marketing"
    },
    {
      title: "More Services",
      desc: "Events decoration, premium albums, and much more to discover.",
      img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
      href: "/more-services"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">Where Vision Meets Craft</h2>
          <div className="w-24 h-1 bg-foreground mx-auto"></div>
        </motion.div>
        
        {/* Animated Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={service.href} className="group cursor-pointer block">
                <div className="aspect-video relative overflow-hidden bg-muted mb-6 w-full rounded-2xl">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.img}')` }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
