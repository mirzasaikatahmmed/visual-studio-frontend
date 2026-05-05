"use client";

import { motion } from "framer-motion";
import { Camera, Zap, Tag, Users } from "lucide-react";

const ITEMS = [
  { icon: Camera, label: "1,000+ Weddings Photographed" },
  { icon: Zap,    label: "72-Hour Sneak Peeks" },
  { icon: Tag,    label: "Starting at $499" },
  { icon: Users,  label: "Female Crews Available" },
];

export function UspStrip() {
  return (
    <section className="border-b border-border bg-background overflow-hidden">
      <motion.div
        className="container mx-auto px-4 py-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border max-w-4xl mx-auto">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2.5 md:px-6 text-center md:text-left"
            >
              <Icon size={16} className="shrink-0 text-foreground/50" strokeWidth={1.5} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
