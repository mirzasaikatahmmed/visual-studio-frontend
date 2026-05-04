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
            Female Photographers &amp; Videographers —{" "}
            <span className="opacity-60">Available On Request</span>
          </h2>

          {/* Body */}
          <p className="text-background/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            We understand that for many Muslim and conservative families, having a female crew for the
            bride&apos;s getting-ready, Mehndi, and ladies-only events isn&apos;t optional — it&apos;s essential.
            Just let us know when you book, and we&apos;ll confirm a female lead for your date.
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
