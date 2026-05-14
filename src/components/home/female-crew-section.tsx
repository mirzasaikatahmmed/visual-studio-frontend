"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FemaleCrewSection() {
  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* ── Muslim-Friendly Services ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="bg-foreground text-background flex flex-col items-center justify-center text-center px-8 py-16 md:py-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-6">
            For Muslim &amp; Conservative Families
          </p>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-5 leading-tight">
            Muslim-Friendly{" "}
            <span className="opacity-60">Services</span>
          </h2>
          <p className="text-background/70 text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10">
            Halal-conscious coverage, no music film edits, female-only crew options, and
            culturally respectful workflows designed for Muslim brides and families.
          </p>
          <Link
            href="/muslim-friendly-services"
            className="inline-block px-8 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
          >
            Explore Muslim-Friendly Services →
          </Link>
        </motion.div>

        {/* ── Female Crew ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="bg-foreground text-background flex flex-col items-center justify-center text-center px-8 py-16 md:py-20 border-t md:border-t-0 md:border-l border-background/10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-6">
            Female Crews &amp; Female Editors
          </p>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-5 leading-tight">
            Female-Only{" "}
            <span className="opacity-60">Workflow</span>
          </h2>
          <p className="text-background/70 text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10">
            End-to-end female photographers, videographers, and editors — your
            modesty is protected from capture to delivery. Available on request.
          </p>
          <Link
            href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
          >
            Book a Free Consultation →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
