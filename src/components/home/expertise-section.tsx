"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchVisionCraftItems, type VisionCraftItem } from "@/lib/visionCraftApi";

export function ExpertiseSection() {
  const [items, setItems] = useState<VisionCraftItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisionCraftItems(true)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const colClass =
    items.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : items.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">
            Where Vision Meets Craft
          </h2>
          <div className="w-24 h-1 bg-foreground mx-auto" />
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-2xl mb-6" />
                <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-1" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Animated Grid */}
        {!loading && items.length > 0 && (
          <motion.div
            className={`grid ${colClass} gap-8`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="group">
                <div className="aspect-video relative overflow-hidden bg-muted mb-6 w-full rounded-2xl">
                  {item.imageUrl ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.imageUrl}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <span className="text-4xl font-bold uppercase tracking-tighter text-muted-foreground/30 select-none">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
