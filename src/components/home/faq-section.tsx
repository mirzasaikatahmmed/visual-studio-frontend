"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export function FaqSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } },
  };

  const faqs = [
    { q: "How far in advance should we book?", a: "For weddings and large events, we recommend booking 6-12 months in advance. For corporate projects, 3-4 weeks is ideal." },
    { q: "Do you travel for shoots?", a: "Yes, we are available for destination weddings and international corporate campaigns. Travel fees apply." },
    { q: "What is the turnaround time for photos?", a: "Portrait sessions are delivered within 2 weeks. Comprehensive weddings and event galleries typically take 6-8 weeks." }
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <MessageCircleQuestion className="mx-auto block mb-6 text-muted-foreground" size={40} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
        </motion.div>
        
        {/* Animated FAQ List */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, idx) => (
            <motion.div key={idx} variants={itemVariants} className="border-b border-border pb-6">
              <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated Link Bottom */}
        <motion.div 
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={linkVariants}
        >
          <Link href="/contact" className="font-bold uppercase tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors">
            Have more questions? Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
