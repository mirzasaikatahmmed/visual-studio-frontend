"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FemaleCrewSection() {
  return (
    <section className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        className="bg-foreground text-background"
      >
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl text-center">

          {/* Label */}
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-6">
            For Muslim &amp; Conservative Families
          </p>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
            Female Crews &amp; Female Editors —{" "}
            <span className="opacity-60">Available On Request</span>
          </h2>

          {/* Body */}
          <p className="text-background/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            For Hijabi brides, conservative families, and any couple who needs it, we offer
            end-to-end female-only workflows: female photographers and videographers on the day,
            AND female editors handling all your photos and footage afterward. Your modesty is
            protected from capture to delivery. Just let us know when you book.
          </p>

          {/* CTA */}
          <Link
            href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
          >
            Book a Consultation →
          </Link>

        </div>
      </motion.div>
    </section>
  );
}
