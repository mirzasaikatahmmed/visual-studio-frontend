"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Shield,
  EyeOff,
  Briefcase,
  Star,
  MessageCircleQuestion,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const USE_CASES = [
  {
    id: 1,
    icon: Star,
    title: "High-Profile Families & Public Figures",
    description:
      "Executives, politicians, celebrities, and their families who require strict photographic privacy at private events. We ensure no unauthorised images leave the venue.",
  },
  {
    id: 2,
    icon: Shield,
    title: "Religious & Conservative Weddings",
    description:
      "Events with a women's-only section where strict privacy is required. Guest cameras and phones are managed so that no images from the ladies' area circulate without consent.",
  },
  {
    id: 3,
    icon: EyeOff,
    title: "Hijabi Brides & Modest Events",
    description:
      "Brides whose photos must not circulate beyond approved family channels. We control exactly who photographs the bride and ensure no candid shots leave the event.",
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Corporate Events & IP Protection",
    description:
      "Product launches, board meetings, and private corporate functions where guest photography poses an intellectual property or confidentiality risk.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pre-Event Briefing",
    description:
      "We review your event layout, guest count, and privacy requirements. A coverage plan is prepared — identifying high-sensitivity areas, entry points, and enforcement zones.",
  },
  {
    step: "02",
    title: "On-Site Deployment",
    description:
      "Our team positions at entry points and throughout the event. We politely communicate the no-photo policy to guests on arrival and monitor throughout.",
  },
  {
    step: "03",
    title: "Active Camera Management",
    description:
      "We identify and approach guests who attempt unauthorised photography, request deletion of images where necessary, and coordinate with security staff if needed.",
  },
  {
    step: "04",
    title: "Post-Event Confirmation",
    description:
      "A brief debrief confirming coverage, any incidents handled, and recommendations for future events. All our own event documentation remains fully under your control.",
  },
];

const FAQS = [
  {
    id: 1,
    question: "Can you stop guests from taking photos at our event?",
    answer:
      "Yes. Our No-Photo Security team actively manages guest cameras throughout your event — from entry briefings to on-site monitoring. We politely enforce the no-photo policy, request image deletion where needed, and coordinate with your venue security.",
  },
  {
    id: 2,
    question: "Is this a separate service from your photography packages?",
    answer:
      "Yes. No-Photo Security is a standalone paid service line, not bundled into our photography or videography packages. Some clients hire us specifically for this — without booking any photography at all.",
  },
  {
    id: 3,
    question: "Do you work with other photographers and videographers we have already hired?",
    answer:
      "Absolutely. We regularly work alongside other photographers and video crews. We brief all authorised media on the policy at the start and ensure only credentialled staff photograph restricted areas.",
  },
  {
    id: 4,
    question: "Can you cover gender-separated sections of a wedding?",
    answer:
      "Yes. We deploy female staff to cover women's-only sections of the event, ensuring the privacy policy is enforced with full sensitivity and without violating the gender-separation requirement.",
  },
  {
    id: 5,
    question: "What happens if a guest refuses to delete an unauthorised photo?",
    answer:
      "We escalate to venue security and, if required, to event management. We document every incident. Physical force is never used — our approach is professional de-escalation at all times. We advise clients on legal options in advance for high-risk events.",
  },
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
            What clients ask before booking No-Photo Security.
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
            href="/contact"
            className="font-bold uppercase tracking-widest text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Still have questions? Contact Us →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function NoPhotoSecurityContent() {
  return (
    <>
      {/* What We Do */}
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
              Service Definition
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
              We Control &amp; Block{" "}
              <span className="opacity-60">Guest Cameras.</span>
            </h2>
            <p className="text-background/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
              Clients hire us to ensure no one else photographs their event. We deploy trained staff
              to manage guest cameras, enforce a no-photo policy throughout the venue, prevent
              candid shots from leaking, and protect privacy end-to-end — from entry to exit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
              >
                Get a Quote →
              </Link>
              <Link
                href="/packages"
                className="inline-block px-8 py-4 border border-background/30 text-background font-bold uppercase tracking-widest text-xs hover:border-background/70 transition-colors"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Use Cases */}
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
              Who Hires Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
              Common Use Cases
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Privacy is a real need — not a niche one. These are the clients who book us most often.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {USE_CASES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="border border-border rounded-sm p-8 hover:border-foreground/40 transition-colors duration-300"
                >
                  <Icon className="mb-5 text-brand-500" size={28} strokeWidth={1.5} />
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 overflow-hidden bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">
              How It Works
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {HOW_IT_WORKS.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-12 h-12 rounded-sm border border-border flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground tracking-widest">
                    {step.step}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key guarantees */}
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
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">
              What&apos;s Included
            </h2>
          </motion.div>

          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              "Trained on-site privacy staff for the full event duration",
              "Pre-event briefing & customised coverage plan",
              "Entry-point camera policy enforcement",
              "Active monitoring throughout venue & restricted areas",
              "Female staff available for women's-only sections",
              "Coordination with venue security team",
              "Incident documentation & post-event debrief",
              "Standalone booking — no photography package required",
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
              >
                <CheckCircle2
                  className="shrink-0 mt-0.5 text-brand-500"
                  size={18}
                  strokeWidth={2}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
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
              Get a Quote
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">
              Ready to Protect Your Event?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Tell us your event date, venue, guest count, and any specific privacy requirements.
              We will put together a custom quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
              >
                Request a Quote →
              </Link>
              <Link
                href="/more-services"
                className="inline-block px-8 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:border-foreground/60 transition-colors"
              >
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
