"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CULTURES = [
  {
    id: "bengali",
    title: "Bengali Weddings",
    traditions: "Gaye Holud · Akht · Bou Bhat",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pakistani",
    title: "Pakistani Weddings",
    traditions: "Mayun · Mehndi · Baraat · Walima",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "indian",
    title: "Indian Weddings",
    traditions: "Sangeet · Pheras · Vidaai",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sikh",
    title: "Sikh Weddings",
    traditions: "Anand Karaj · Doli",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "arab",
    title: "Arab & Afghan Weddings",
    traditions: "Nikkah · Henna Night · Zaffa",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fusion",
    title: "Multi-Cultural Weddings",
    traditions: "Fusion · Interfaith · Cross-cultural",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function CulturesSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Weddings, Across Every Tradition
          </h2>
          <div className="w-24 h-1 bg-foreground mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            From Nikkah to Anand Karaj, we know the rhythm of your day.
          </p>
        </motion.div>

        {/* Culture Tiles */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CULTURES.map((culture) => (
            <motion.div
              key={culture.id}
              variants={tileVariants}
              className="group relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                style={{ backgroundImage: `url('${culture.image}')` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-bold text-base md:text-xl uppercase tracking-tight leading-tight mb-1">
                  {culture.title}
                </h3>
                <p className="text-white/60 text-[10px] md:text-xs tracking-wider">
                  {culture.traditions}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            View Full Portfolio <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
