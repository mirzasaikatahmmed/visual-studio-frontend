"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Star, MapPin } from "lucide-react";

const SIGNALS = [
  {
    icon: ShieldCheck,
    label: "Fully Insured",
    sub: "COI Available",
  },
  {
    icon: Users,
    label: "Female Crew Available",
    sub: "On Request",
  },
  {
    icon: Star,
    label: "5+ Years Experience",
    sub: "1,000+ Weddings",
  },
  {
    icon: MapPin,
    label: "NY, NJ, CT",
    sub: "& Destination",
  },
];

export function TrustSignalsSection() {
  return (
    <section className="border-t border-border bg-muted/10 py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {SIGNALS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 md:px-8"
            >
              <Icon size={22} className="text-foreground/60 mb-1" strokeWidth={1.5} />
              <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
              <span className="text-[10px] text-muted-foreground tracking-wider">{sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
