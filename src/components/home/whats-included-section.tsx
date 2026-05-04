"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const COLUMNS = [
  {
    id: "photography",
    label: "Photography",
    items: [
      "Lead photographer + second shooter",
      "Full-day coverage",
      "600–1,000+ edited photos",
      "Private online gallery",
      "Print rights included",
    ],
  },
  {
    id: "cinematography",
    label: "Cinematography",
    badge: "Add-On",
    items: [
      "4K cinematic wedding film",
      "Highlight reel (3–5 min)",
      "Full ceremony edit",
      "Drone coverage available",
      "Same-day edit option",
    ],
  },
  {
    id: "extras",
    label: "Extras",
    items: [
      "Engagement & Nikkah-only sessions",
      "Custom albums & prints",
      "USB delivery",
      "Rush turnaround",
      "Destination travel",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function WhatsIncludedSection() {
  return (
    <section className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            What&apos;s Included
          </h2>
          <div className="w-24 h-1 bg-foreground mx-auto" />
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {COLUMNS.map((col) => (
            <motion.div
              key={col.id}
              variants={colVariants}
              className="bg-background p-8 md:p-10 flex flex-col"
            >
              {/* Column label */}
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{col.label}</h3>
                {col.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
                    {col.badge}
                  </span>
                )}
              </div>

              {/* Items */}
              <ul className="space-y-4 flex-1">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={14} className="text-foreground shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
