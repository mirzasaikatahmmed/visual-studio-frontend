"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { StoreCategory } from "@/lib/storeApi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function StoreCategoryGrid({
  categories,
  whatsappNumber,
}: {
  categories: StoreCategory[];
  whatsappNumber: string;
}) {
  const handleInquire = (cat: StoreCategory) => {
    if (!whatsappNumber) return;
    const message =
      cat.whatsappMessage ||
      `Hi, I'm interested in inquiring about ${cat.name} from your store.`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (categories.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pt-12 max-w-7xl">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            onClick={() => handleInquire(cat)}
            className={`group relative block aspect-[4/5] lg:aspect-square cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-muted col-span-1 md:col-span-1 ${idx < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
              style={{ backgroundImage: `url('${cat.image}')` }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="transform transition-all duration-500 group-hover:-translate-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] px-4">
                  {cat.name}
                </h3>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 text-black font-bold uppercase tracking-widest text-xs bg-white backdrop-blur-md px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Inquire Now <MessageCircle size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
