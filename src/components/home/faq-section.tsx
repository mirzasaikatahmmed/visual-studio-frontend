"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleQuestion, ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    id: 1,
    question: "Do you offer female-only photography and videography teams?",
    answer:
      "Yes. We provide all-female crews and female editors on request — for the bride's getting-ready, Mehndi, ladies-only events, and end-to-end editing of your photos and footage.",
  },
  {
    id: 2,
    question: "Our wedding spans 3 days (Mehndi, Baraat, Walima). Do you offer multi-day packages?",
    answer:
      "Absolutely. We specialize in multi-day South Asian weddings and offer custom packages to cover all your events seamlessly.",
  },
  {
    id: 3,
    question: "How soon will we receive our photos and videos?",
    answer:
      "Sneak peeks within 78 hours. Full edited photo gallery in 3–4 weeks. Cinematic wedding film in 1–2 months.",
  },
  {
    id: 4,
    question: "Do you know our specific cultural traditions?",
    answer:
      "Yes. With 1,000+ weddings shot, our team is fluent in Bengali, Pakistani, Indian, Sikh, Afghan, and Arab traditions — Nikkah, Mehndi, Holud, Sangeet, Baraat, Vidaai, Walima, and Anand Karaj.",
  },
  {
    id: 5,
    question: "What is the deposit, and do you offer venue insurance?",
    answer:
      "We require a 30%–50% deposit to secure your date. Liability coverage is available on request — let us know your venue's COI requirements when you book.",
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
                <motion.div
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground pb-6">{faq.answer}</p>
                </motion.div>
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
            View All FAQs →
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
