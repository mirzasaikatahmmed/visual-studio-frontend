"use client";

import { motion } from "framer-motion";
import { InstagramFeed } from "@/components/instagram-feed";

export function InstagramSection() {
  return (
    <section className="py-24 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <InstagramFeed />
        </motion.div>
      </div>
    </section>
  );
}
