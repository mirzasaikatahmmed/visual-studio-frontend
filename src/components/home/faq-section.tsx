"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleQuestion, ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    id: 1,
    question: "How many photos will we receive?",
    answer:
      "The number of edited photos depends on the package you select and the length of coverage. On average, you can expect 50–75 professionally edited images per hour of shooting. For full-day weddings, this typically translates to 400–800+ final edited photos. We focus on quality over quantity — every image we deliver is carefully selected and edited to tell your story beautifully.",
  },
  {
    id: 2,
    question: "These packages don't really fit my needs. Do you have any customizable packages?",
    answer:
      "Absolutely. Every event is different, and we understand that our standard packages won't fit every vision or budget. We're happy to build a custom package tailored to your specific needs — whether that's adjusting coverage hours, adding a second shooter, including drone footage, or combining services in a unique way. Just reach out through our contact form and let us know what you're looking for, and we'll put together a personalized quote for you.",
  },
  {
    id: 3,
    question: "Will you send us unedited photos? Or are all photos sent edited?",
    answer:
      "All photos delivered to you are professionally edited — color-corrected, retouched, and polished to match our signature style. We don't release unedited or RAW files, as they don't represent the finished quality of our work. This ensures every image you receive is gallery-ready and consistent with the portfolio you booked us for.",
  },
  {
    id: 4,
    question: "What is the average wait time to receive photos back?",
    answer:
      "Our standard turnaround time is 4–6 weeks for edited photos and 6–8 weeks for edited videos and films. For weddings and larger events, delivery may take up to 8–10 weeks during peak season. We also deliver a 72-hour sneak peek of 15–25 select images so you have something to share right away. Need it sooner? Rush delivery is available for an additional fee — just ask.",
  },
  {
    id: 5,
    question: "Are you able to create films longer than 45 minutes, as stated in your packages?",
    answer:
      "Yes, we can. The 45-minute runtime in our standard packages reflects what most clients prefer for a polished, engaging film. However, if you'd like a longer cinematic feature, an extended documentary-style film, or full ceremony coverage, we offer this as a custom add-on. Pricing depends on the additional editing time required, and we're happy to discuss what works best for your event.",
  },
  {
    id: 6,
    question: "Do you offer photo albums?",
    answer:
      "Yes, we offer beautifully crafted, premium-quality photo albums and keepsake books, designed to preserve your memories for generations. Options range from classic linen-bound albums to luxury leather finishes, with various sizes and page counts available. Album design and printing are offered as add-ons to any package — please ask us for our album catalog and pricing.",
  },
  {
    id: 7,
    question: "How do you prefer payments?",
    answer:
      "We accept payments via Zelle, bank transfer, check, and major credit/debit cards. Zelle and bank transfers are our preferred methods, as they're the fastest and incur no processing fees. Credit card payments may include a small processing surcharge.",
  },
  {
    id: 8,
    question: "When are payments due? Can we send the payment after receiving the photos/videos?",
    answer:
      "To secure your booking, we require a non-refundable retainer of 30% at the time of contract signing. The remaining balance is due on or before the event date. We do not release final edited photos or videos until the full balance has been paid. This policy protects both you and us, and ensures your booking is fully reserved on our calendar.",
  },
  {
    id: 9,
    question: "How much of the deposit is refundable? With ongoing uncertainty around events, things can change quickly.",
    answer:
      "We completely understand that life can be unpredictable. The booking retainer (30%) is non-refundable, as it secures your date and prevents us from accepting other bookings for that time. However, in the event of a postponement — whether due to illness, emergencies, or unforeseen circumstances — we will gladly transfer your retainer to a new date within 12 months, subject to availability. We always aim to work with our clients with compassion and flexibility, so please reach out to us directly if your situation changes.",
  },
  {
    id: 10,
    question: "Do you charge traveling fees?",
    answer:
      "Travel within the NYC metro area (Manhattan, Brooklyn, Queens, Bronx, Staten Island) is included in all our packages at no additional cost. For events in Long Island, Westchester, New Jersey, and Connecticut, a small travel fee may apply depending on distance. For destination weddings or out-of-state events, we offer custom travel packages that include flights, accommodations, and transportation. Just let us know your event location and we'll provide a transparent quote.",
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
