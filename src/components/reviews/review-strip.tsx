"use client";

import { motion } from "framer-motion";
import { Star, Globe } from "lucide-react";
import Link from "next/link";
import { NAMED_TESTIMONIALS, GoogleIcon, InstagramIcon } from "./reviews-section";

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
      {initials}
    </div>
  );
}

export function ReviewStrip() {
  const duplicatedStories = [...NAMED_TESTIMONIALS, ...NAMED_TESTIMONIALS, ...NAMED_TESTIMONIALS];

  return (
    <section className="py-16 bg-muted/20 border-t border-border overflow-hidden">
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
      </div>

      <div className="relative w-full overflow-hidden flex group mt-4">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ ease: "linear", duration: 80, repeat: Infinity }}
        >
          {duplicatedStories.map((t, i) => {
            return (
              <div
                key={i}
                className="w-[280px] md:w-[350px] shrink-0 p-5 bg-background rounded-2xl border border-border shadow-sm flex flex-col gap-3 mx-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <InitialsAvatar name={t.name} />
                    <div>
                      <p className="font-semibold text-sm leading-none">{t.name}</p>
                      <p className="text-[11px] text-foreground/50 mt-0.5">{t.event}</p>
                    </div>
                  </div>
                  {t.source === "Google Review" ? (
                    <GoogleIcon className="w-4 h-4 shrink-0" />
                  ) : t.source === "Instagram" ? (
                    <InstagramIcon className="w-4 h-4 shrink-0" />
                  ) : (
                    <Globe size={16} className="shrink-0 text-brand-500 dark:text-brand-400" />
                  )}
                </div>

                <div className="flex text-yellow-500 gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} fill="currentColor" strokeWidth={0} size={11} />
                  ))}
                </div>

                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
