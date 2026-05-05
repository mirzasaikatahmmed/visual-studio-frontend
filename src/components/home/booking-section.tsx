"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export function BookingSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const centerItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const rightItemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Book a Consultation — secondary */}
          <motion.div variants={leftItemVariants} className="p-8 border border-border flex flex-col items-center text-center bg-muted/20 hover:bg-muted/30 transition-colors">
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Book a Consultation</h3>
            <p className="text-muted-foreground mb-8 flex-1">Book a free 15-minute call to discuss your date, traditions, and package options. No commitment required.</p>
            <Link
              href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-foreground text-foreground font-bold tracking-widest uppercase text-sm rounded-full hover:bg-muted transition-colors"
            >
              Schedule on Calendly
            </Link>
          </motion.div>

          {/* Contact Us — PRIMARY */}
          <motion.div
            variants={centerItemVariants}
            className="p-8 border-2 border-foreground flex flex-col items-center text-center bg-foreground text-background relative"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest px-4 py-1 border border-background/20">
              Recommended
            </span>
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Contact Us</h3>
            <p className="mb-8 flex-1 opacity-80">Have a question or want to discuss your wedding? Send us a message and we&apos;ll get back to you.</p>
            <div className="flex flex-col gap-3 w-full items-center">
              <Link
                href="tel:+13473066637"
                className="px-8 py-3 bg-background text-foreground font-bold tracking-widest uppercase text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                Call Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border border-background/40 text-background font-bold tracking-widest uppercase text-sm rounded-full hover:bg-background/10 transition-colors"
              >
                Send a Message
              </Link>
            </div>
          </motion.div>

          {/* Pricing Guide — disabled until PDF is ready */}
          <motion.div variants={rightItemVariants} className="p-8 border border-border flex flex-col items-center text-center bg-muted/20">
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Pricing Guide</h3>
            <p className="text-muted-foreground mb-8 flex-1">A full breakdown of packages, add-ons, and what&apos;s included — sent after your free consultation.</p>
            <span className="px-8 py-3 border border-border text-muted-foreground font-bold tracking-widest uppercase text-sm rounded-full cursor-not-allowed select-none">
              Coming Soon
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
