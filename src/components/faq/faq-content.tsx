"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSection {
  label: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    label: "Booking & Pricing",
    items: [
      {
        id: "a1",
        question: "What's included in your wedding photography packages?",
        answer:
          "Every wedding package includes a lead photographer, a second shooter, full-day coverage, a pre-wedding consultation, and professionally edited high-resolution photos delivered through a private online gallery with printing rights. Cinematography, drone coverage, additional shooters, and same-day edits are available as add-ons. Detailed package breakdowns are sent after your consultation.",
      },
      {
        id: "a2",
        question: "How much does wedding photography cost?",
        answer:
          "Wedding photography packages at Visual Studios & Events start at $499 and scale based on hours of coverage, number of shooters, cinematography add-ons, and album options. We send a full pricing guide after a free 15-minute consultation so we can match the right package to your wedding's scope.",
      },
      {
        id: "a3",
        question: "How do I reserve my date?",
        answer:
          "Your date is locked in with a signed contract and a non-refundable retainer of 30%–50% of the total package. The remaining balance is due closer to the event date. We accept Zelle, bank transfer, and major credit cards.",
      },
      {
        id: "a4",
        question: "Do you offer payment plans?",
        answer:
          "Yes. We offer interest-free payment plans split across the months between booking and your wedding date. Talk to us during the consultation and we'll structure something that works for your budget.",
      },
      {
        id: "a5",
        question: "Do you travel for destination weddings?",
        answer:
          "Yes. We cover the full tri-state area (NY, NJ, CT) at no travel charge, and we travel internationally and across the US for destination weddings. Travel and lodging costs are billed at cost with no markup.",
      },
      {
        id: "a6",
        question: "What's your cancellation and rescheduling policy?",
        answer:
          "The retainer is non-refundable, but we'll honor it toward a rescheduled date within 12 months at no penalty. Full details are in the contract.",
      },
    ],
  },
  {
    label: "Cultural Coverage & The Day Itself",
    items: [
      {
        id: "b1",
        question: "Do you have female photographers and videographers available?",
        answer:
          "Yes. We have female photographers and videographers available on request for the bride's getting-ready, Mehndi, Holud, ladies-only Sangeet, and any segment of the wedding where a female crew is required. Please mention this when you book so we can confirm availability for your date.",
      },
      {
        id: "b2",
        question: "Which South Asian and Muslim wedding traditions do you cover?",
        answer:
          "We regularly photograph and film Bengali, Pakistani, Indian, Sikh, Afghan, and Arab weddings. Our team is fluent in capturing Nikkah, Holud (Gaye Holud), Sangeet, Baraat, Vidaai, Rukhsati, Walima, Anand Karaj, Doodh Pilai, and reception traditions. We know the rhythm of these events — from when not to shoot during Nikkah to where to stand during Rukhsati.",
      },
      {
        id: "b3",
        question: "How many shooters are included?",
        answer:
          "Our standard wedding package includes a lead photographer and a second shooter. For weddings with 250+ guests, multi-day events, or simultaneous bride/groom prep coverage, we strongly recommend adding a third shooter. We can scale up to four-person crews for large weddings.",
      },
      {
        id: "b4",
        question: "How do you handle “Desi time” if the wedding runs late?",
        answer:
          "We work on flat day rates for the package coverage window, not strict hourly meters. If the wedding is running long, we'll stay through the key moments you booked us for. Coverage that extends well past the contracted end time is billed at a transparent hourly overage rate disclosed in your contract — no surprises.",
      },
      {
        id: "b5",
        question: "Can I see a full wedding gallery, including emotional moments like Vidaai or Rukhsati?",
        answer:
          "Absolutely. During the consultation we'll share full galleries from past weddings so you can see how we capture the emotional arc of the day, not just the posed portraits. We're also happy to share Mehndi-only, Nikkah-only, or Walima-only galleries if you want to see how we handle a specific event.",
      },
      {
        id: "b6",
        question: "What happens if a photographer gets sick on my wedding day?",
        answer:
          "We have a vetted backup network of photographers and videographers we trust. In the rare case of an emergency, we replace the team member with someone of equal experience at no extra cost to you. Your day is covered.",
      },
      {
        id: "b7",
        question: "Will you coordinate with my wedding planner, decor team, and DJ?",
        answer:
          "Yes. We send a shot list and timeline to your planner before the wedding and coordinate with decor, lighting, and DJ teams on-site so everyone is aligned. We've worked alongside many of the major South Asian wedding vendors in the tri-state area.",
      },
    ],
  },
  {
    label: "Delivery & Editing",
    items: [
      {
        id: "c1",
        question: "When do I get sneak peeks for social media?",
        answer:
          "We deliver 15–25 sneak peek photos within 78 hours of your wedding so you can post while the buzz is fresh. Same-day edit highlight videos are available as an add-on.",
      },
      {
        id: "c2",
        question: "What's the full turnaround time for the gallery and wedding film?",
        answer:
          "Full edited photo galleries are delivered in 3–4 weeks. Cinematic wedding films are delivered in 1–2 months. Rush delivery is available as an add-on.",
      },
      {
        id: "c3",
        question: "How many edited photos will I receive?",
        answer:
          "It depends on coverage hours, but a typical full-day wedding gallery includes 600–1,000+ professionally edited photos.",
      },
      {
        id: "c4",
        question: "Will my photos be color-corrected and retouched?",
        answer:
          "Every delivered photo is color-graded and exposure-corrected. Detailed retouching (skin, blemish removal, object removal) is included on key portraits and available on additional images for an extra fee.",
      },
      {
        id: "c5",
        question: "How will I receive my photos and videos?",
        answer:
          "Through a private, password-protected online gallery (Pixieset) where you can download high-resolution files, share with family, and order prints. USB and printed albums are available as add-ons.",
      },
    ],
  },
  {
    label: "Logistics & Extras",
    items: [
      {
        id: "d1",
        question: "Do you offer engagement, Nikkah-only, or pre-wedding shoots?",
        answer:
          "Yes. We offer standalone engagement sessions, Nikkah-only coverage, pre-wedding portrait shoots, and same-day Walima coverage. These can be booked individually or bundled with your wedding package at a discount.",
      },
      {
        id: "d2",
        question: "Do you offer drone coverage?",
        answer:
          "Yes. Licensed drone coverage is available as an add-on, subject to venue and FAA airspace restrictions.",
      },
      {
        id: "d3",
        question: "Are you insured? Can you provide a Certificate of Insurance for my venue?",
        answer:
          "We carry liability insurance. A Certificate of Insurance for your venue is available on request — reach out at the time of booking and we'll confirm the details.",
      },
      {
        id: "d4",
        question: "Will my photos be used on your social media or website?",
        answer:
          "We love sharing our work, but you control what's public. You can opt out entirely, restrict use to portfolio only (no social media), or grant full sharing rights — your choice, written into the contract.",
      },
      {
        id: "d5",
        question: "Can I share a Pinterest board or specific shot list?",
        answer:
          "Please do. We encourage couples to send Pinterest boards, must-have family shot lists, and reference videos before the wedding. It helps us pre-plan and makes sure no key moment is missed.",
      },
      {
        id: "d6",
        question: "Where are you based and what areas do you serve?",
        answer:
          "We're based in Brooklyn and Queens, NY, and serve the entire tri-state area — all five NY boroughs, Long Island, Westchester, New Jersey, and Connecticut. We also travel for destination weddings worldwide.",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div variants={itemVariants} className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-semibold pr-4 leading-snug">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">{item.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FaqContent() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 text-sm md:text-base"
        >
          Everything you need to know about booking Visual Studios & Events for your wedding, engagement, or event.{" "}
          Don&apos;t see your question?{" "}
          <Link href="/contact" className="font-semibold underline underline-offset-4 hover:text-foreground transition-colors">
            Contact us
          </Link>
          .
        </motion.p>

        {/* Sections */}
        <div className="space-y-16">
          {FAQ_SECTIONS.map((section) => (
            <motion.div
              key={section.label}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Section label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                  {section.label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Accordion items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {section.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 text-center space-y-4"
        >
          <p className="text-muted-foreground text-sm">
            Still have questions? We&apos;re happy to walk you through everything.
          </p>
          <Link
            href="/contact"
            className="inline-block font-bold uppercase tracking-widest text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Book a Free Consultation →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
