"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestion, ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    id: 1,
    question: "What's included in your wedding photography packages?",
    answer:
      "Every package includes a lead photographer, a second shooter, full-day coverage, a pre-wedding consultation, and professionally edited high-resolution photos delivered through a private online gallery with printing rights. Cinematography, drone coverage, and same-day edits are available as add-ons.",
  },
  {
    id: 2,
    question: "Do you have female photographers and videographers available?",
    answer:
      "Yes. We have female photographers and videographers available on request for the bride's getting-ready, Mehndi, Holud, ladies-only Sangeet, and any segment of the wedding where a female crew is required. Please mention this when you book so we can confirm availability for your date.",
  },
  {
    id: 3,
    question: "Which South Asian and Muslim wedding traditions do you cover?",
    answer:
      "We regularly photograph and film Bengali, Pakistani, Indian, Sikh, Afghan, and Arab weddings. Our team is fluent in capturing Nikkah, Holud, Sangeet, Baraat, Vidaai, Rukhsati, Walima, Anand Karaj, and reception traditions. We know the rhythm of these events — from when not to shoot during Nikkah to where to stand during Rukhsati.",
  },
  {
    id: 4,
    question: "Do you travel for destination weddings?",
    answer:
      "Yes. We cover the full tri-state area (NY, NJ, CT) at no travel charge, and we travel internationally and across the US for destination weddings. Travel and lodging costs are billed at cost with no markup.",
  },
  {
    id: 5,
    question: "When will I receive my photos and videos?",
    answer:
      "You'll receive 15–25 sneak peek photos within 48–72 hours. Full edited galleries are delivered in 4–6 weeks. Cinematic wedding films are delivered in 8–10 weeks. Rush delivery is available as an add-on.",
  },
  {
    id: 6,
    question: "Are you insured? Can you provide a Certificate of Insurance for my venue?",
    answer:
      "Yes. We carry full liability insurance and provide Certificates of Insurance to venues on request at no extra charge.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
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
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div key={faq.id} variants={itemVariants} className="border-b border-border">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl font-bold pr-4">{faq.question}</h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <ChevronDown size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground pb-6">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom links */}
        <motion.div
          className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/faq"
            className="font-bold uppercase tracking-widest text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            See All Questions →
          </Link>
          <span className="hidden sm:block text-border">|</span>
          <Link
            href="/contact"
            className="font-bold uppercase tracking-widest text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Have More Questions? Contact Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
