"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  VolumeX,
  Sparkles,
  Users,
  Shield,
  Globe,
  MessageCircleQuestion,
} from "lucide-react";
import Link from "next/link";

const SERVICE_TRACKS = [
  {
    id: 1,
    icon: VolumeX,
    title: "No-Music Edits",
    description:
      "Full wedding films and highlight reels edited without music — safe to share in religious circles, on Islamic social media, and within conservative family groups. All transitions are clean and cinematic. Available for full films and short reels.",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Islamic-Touch Editing",
    description:
      "Videos styled with an Islamic aesthetic: tasteful transitions, optional Quranic or duaa overlays where appropriate, and color grading that complements traditional Islamic dress and decor. Films reflect the spiritual tone of your wedding.",
  },
  {
    id: 3,
    icon: Users,
    title: "Female-Only Crew & Editor Workflow",
    description:
      "End-to-end female workflow on request: female photographers and videographers on the day, AND female editors handling all your photos and footage afterward. Modesty protected from capture to final delivery.",
  },
  {
    id: 4,
    icon: Shield,
    title: "Modesty-Aware Coverage",
    description:
      "Sensitivity to gender separation during ceremonies and receptions. Prayer-time accommodations built into the shooting schedule. Modest portrait framing that avoids compositions that conflict with Islamic values.",
  },
  {
    id: 5,
    icon: Globe,
    title: "Cultural & Religious Fluency",
    description:
      "1,000+ weddings covered across Bengali, Pakistani, Indian, Arab, and Afghan Muslim traditions — Nikkah, Walima, Mehndi, Holud, Akht, Bou Bhat, and multi-day sequences. Our team knows the key moments, prayers, and cultural cues that matter most.",
  },
];

const FAQS = [
  {
    id: 1,
    question: "Do you do no-music wedding edits?",
    answer:
      "Yes. We offer full wedding films and highlight reels edited completely without music — safe to share in religious circles, on Islamic social media, and within conservative family groups. Just request a 'no-music edit' when you book.",
  },
  {
    id: 2,
    question: "Are female photographers available for hijabi brides?",
    answer:
      "Yes. We provide end-to-end female-only workflows on request: female photographers and videographers on the day, AND female editors handling all your photos and footage afterward. Your modesty is protected from capture to delivery.",
  },
  {
    id: 3,
    question: "Can you accommodate gender separation at our wedding?",
    answer:
      "Absolutely. We are experienced with fully gender-separated ceremonies and receptions. Our female crew covers the women's side completely, while a separate team handles the men's side if needed. Prayer-time breaks are also built into our shooting schedule.",
  },
  {
    id: 4,
    question: "Do you offer Islamic-touch video editing?",
    answer:
      "Yes. Islamic-touch edits feature tasteful transitions, optional Quranic or duaa overlays where appropriate, and color grading that complements traditional Islamic dress and decor. Films are edited to reflect the spiritual and cultural tone of your event.",
  },
  {
    id: 5,
    question: "Which Muslim wedding traditions are you experienced with?",
    answer:
      "We have covered 1,000+ weddings across Bengali, Pakistani, Indian, Arab, and Afghan Muslim traditions — including Nikkah, Walima, Mehndi, Holud, Akht, Bou Bhat, Sangeet, and multi-day wedding sequences. Our team knows the key moments, the prayers, and the cultural cues that matter most.",
  },
];

const CULTURES = [
  "Nikkah",
  "Walima",
  "Mehndi / Henna Night",
  "Holud",
  "Akht",
  "Bou Bhat",
  "Bengali Muslim Weddings",
  "Pakistani Weddings",
  "Arab Weddings",
  "Afghan Weddings",
  "Multi-Day South Asian Weddings",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function FaqBlock() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <MessageCircleQuestion
              className="mx-auto block mb-6 text-muted-foreground"
              size={40}
            />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Everything families usually ask before booking our Muslim-friendly services.
          </p>
        </motion.div>

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
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="border-b border-border"
              >
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

export function MuslimFriendlyContent() {
  return (
    <>
      {/* Service Tracks */}
      <section className="py-24 overflow-hidden bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4">
              Operational Service Tracks
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              A dedicated editing team and female crew roster — not a checkbox on a standard package.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {SERVICE_TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.id}
                  variants={itemVariants}
                  className="border border-border rounded-sm p-8 hover:border-foreground/40 transition-colors duration-300"
                >
                  <Icon className="mb-5 text-brand-500" size={28} strokeWidth={1.5} />
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{track.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{track.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Female Crew dark callout */}
      <section className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="bg-foreground text-background"
        >
          <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-6">
              For Hijabi Brides &amp; Conservative Families
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
              Female Crew. Female Editor.{" "}
              <span className="opacity-60">End to End.</span>
            </h2>
            <p className="text-background/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
              From the moment we arrive to the final file delivered to your inbox — every person who
              sees your footage is a woman. Female photographer on the day. Female videographer on
              the day. Female editor in post-production. This is a real operational workflow we have
              built, not a marketing promise.
            </p>
            <Link
              href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
            >
              Book a Free Consultation →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Cultural Events Covered */}
      <section className="py-20 overflow-hidden bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4">
              Cultural Fluency
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">
              Traditions We Know &amp; Cover
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {CULTURES.map((culture, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="px-4 py-2 border border-border text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors duration-200"
              >
                {culture}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FaqBlock />

      {/* CTA */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4">
              Ready to Book?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">
              Let&apos;s Talk About Your Wedding
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Book a free 15-minute consultation. Tell us your date, your requirements, and any
              specific Islamic or modesty-related needs — we will build a custom package around you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
              >
                Book a Consultation →
              </Link>
              <Link
                href="/packages"
                className="inline-block px-8 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:border-foreground/60 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
