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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Us - Slides from Left */}
          <motion.div variants={leftItemVariants} className="p-8 border border-border flex flex-col items-center text-center bg-muted/20 hover:bg-muted/30 transition-colors">
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Contact Us</h3>
            <p className="text-muted-foreground mb-8">Have a question or want to discuss a project? We&apos;d love to hear from you.</p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border border-foreground text-foreground font-bold tracking-widest uppercase text-sm rounded-full hover:bg-muted transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Booking Calendar Placeholder - Slides from Bottom */}
          <motion.div variants={centerItemVariants} className="p-8 border border-border flex flex-col items-center text-center bg-muted/20 hover:bg-muted/30 transition-colors">
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Schedule a Call</h3>
            <p className="text-muted-foreground mb-8">Book a free 15-minute consultation to discuss your vision and requirements.</p>
            <Link 
              href="https://calendly.com/lens-xstudioslab/book-a-photography-session" 
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-foreground text-foreground font-bold tracking-widest uppercase text-sm rounded-full hover:bg-muted transition-colors"
            >
              Book a Session
            </Link>
          </motion.div>

          {/* Pricing Guide - Slides from Right */}
          <motion.div variants={rightItemVariants} className="p-8 border border-border flex flex-col items-center text-center bg-muted/20 hover:bg-muted/30 transition-colors">
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Pricing Guide</h3>
            <p className="text-muted-foreground mb-8">Download our comprehensive brochure detailing packages, add-ons, and process.</p>
            <a 
              href="#" 
              className="px-8 py-3 bg-foreground text-background font-bold tracking-widest uppercase text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              Download PDF
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
