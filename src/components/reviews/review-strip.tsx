"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import { NAMED_TESTIMONIALS, SOURCE_BADGES } from "./reviews-section";

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
      {initials}
    </div>
  );
}

const STRIP_PICKS = [0, 1, 3]; // Zainab (Pakistani), Fatima (Bengali), Nasheed (Nikkah)

export function ReviewStrip() {
  const reviews = STRIP_PICKS.map(i => NAMED_TESTIMONIALS[i]);

  return (
    <section className="py-16 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex gap-0.5 text-yellow-500 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" strokeWidth={0} size={14} />)}
            </div>
            <h2 className="text-xl font-bold tracking-tight">What Our Clients Say</h2>
            <p className="text-foreground/50 text-sm mt-0.5">Real families. Real weddings. Real words.</p>
          </div>
          <Link
            href="/#reviews"
            className="text-xs font-bold uppercase tracking-widest text-brand-500 hover:underline underline-offset-4 transition-colors"
          >
            Read all reviews →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((t, i) => {
            const badge = SOURCE_BADGES[t.source] ?? SOURCE_BADGES["Direct"];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-background rounded-2xl border border-border p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <InitialsAvatar name={t.name} />
                    <div>
                      <p className="font-semibold text-sm leading-none">{t.name}</p>
                      <p className="text-[11px] text-foreground/50 mt-0.5">{t.event}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider border px-1.5 py-0.5 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                <div className="flex text-yellow-500 gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} fill="currentColor" strokeWidth={0} size={11} />
                  ))}
                </div>

                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  &ldquo;{t.text}&rdquo;
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
