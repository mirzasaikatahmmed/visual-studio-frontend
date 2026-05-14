"use client";

import { motion } from "framer-motion";
import { ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import { GoogleIcon } from "@/components/reviews/reviews-section";

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS DATA
// To add a real customer: copy one object, fill in the fields, set photo to the
// image path (place the file in /public/testimonials/) or leave as null.
// ─────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS: {
  names: string;
  event: string;
  photo: string | null;
  text: string;
}[] = [
  {
    names: "Zainab & Ahmed",
    event: "Pakistani Wedding · Brooklyn, NY",
    photo: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=400&h=400&fit=crop&crop=faces",
    text: "Visual Studios captured our Nikkah and Walima better than we could have ever imagined. The female photographer made my entire family feel completely at ease — especially during our ladies-only Mehndi. I cry every single time I rewatch the film.",
  },
  {
    names: "Fatima & Bilal",
    event: "Bengali Wedding · Queens, NY",
    photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop&crop=faces",
    text: "From our Holud to the Walima, every single moment was captured beautifully. The team was so respectful of our traditions and the cinematic editing was absolutely stunning. We couldn't have asked for a better studio.",
  },
  {
    names: "Priya & Rohan",
    event: "Indian Wedding · Long Island, NY",
    photo: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop&crop=faces",
    text: "They captured our Baraat perfectly — the energy, the colours, and every emotional moment. The highlight reel still gives us chills every time we watch it. Absolutely no regrets choosing Visual Studios.",
  },
  {
    names: "Ayesha & Omar",
    event: "Pakistani Wedding · Queens, NY",
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop&crop=faces",
    text: "The 72-hour sneak peek was the best surprise. We were still in honeymoon mode when those first photos arrived — every shot was better than the last. The full gallery left us completely speechless.",
  },
  {
    names: "Malaika & Sanjay",
    event: "Indian Wedding · New Jersey",
    photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop&crop=faces",
    text: "I was nervous about having cameras everywhere but the Visual Studios team put everyone at ease immediately. The cinematic film made my parents cry happy tears. We watch it every single anniversary.",
  },
  {
    names: "Nasheed & Kareem",
    event: "Nikkah & Walima · Manhattan, NY",
    photo: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop&crop=faces",
    text: "The no-music edit was exactly what we needed for our family. The film is so beautiful and we can share it with our entire extended family without any concern. Completely exceeded our expectations.",
  },
  {
    names: "Amina & Tariq",
    event: "Arab Wedding · Bronx, NY",
    photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=400&fit=crop&crop=faces",
    text: "The Zaffa was captured so powerfully — the energy, the drums, every step of the procession. Visual Studios understood our culture from the very first conversation. We felt truly seen and celebrated.",
  },
  {
    names: "Simran & Harpreet",
    event: "Sikh Wedding · New Jersey",
    photo: "https://images.unsplash.com/photo-1525772764200-be829a350797?w=400&h=400&fit=crop&crop=faces",
    text: "Our Anand Karaj was the most sacred moment of our lives and Visual Studios treated it with the utmost respect and sensitivity. The photography is timeless. Every photo tells a story.",
  },
  {
    names: "Nadia & Hassan",
    event: "Multi-Day Wedding · Brooklyn, NY",
    photo: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop&crop=faces",
    text: "Three days, three events — and Visual Studios were there for every single moment. The consistency of quality across the Mehndi, Nikkah, and Walima was remarkable. Truly a world-class studio.",
  },
];

function Avatar({ names, photo }: { names: string; photo: string | null }) {
  if (photo) {
    return (
      <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mx-auto border-4 border-border shadow-lg">
        <Image src={photo} alt={names} width={176} height={176} className="w-full h-full object-cover" />
      </div>
    );
  }
  const initials = names.split("&").map((n) => n.trim()[0]).join("").toUpperCase();
  return (
    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mx-auto border-4 border-border shadow-lg bg-brand-500/10 flex items-center justify-center">
      <span className="text-3xl font-black text-brand-500 tracking-tight">{initials}</span>
    </div>
  );
}

export function TestimonialsContent() {
  return (
    <div className="bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="pt-36 md:pt-44 pb-16 text-center border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-foreground/40 mb-5">
            Visual Studios &amp; Events
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Testimonials
          </h1>
          <p className="text-foreground/50 text-base max-w-xl mx-auto leading-relaxed italic">
            Words from the families we have had the honour of documenting.
          </p>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Photo */}
                <Avatar names={t.names} photo={t.photo} />

                {/* Name */}
                <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {t.names}
                </h2>

                {/* Event */}
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium">
                  {t.event}
                </p>

                {/* Text */}
                <p className="mt-4 text-foreground/70 text-base md:text-lg leading-relaxed">
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container mx-auto px-6 max-w-6xl">
        <hr className="border-border" />
      </div>

      {/* ── CTA ── */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Your story matters to us.
          </h2>
          <p className="text-foreground/55 text-base mb-10 leading-relaxed">
            If Visual Studios was part of your special day, we&apos;d be honoured
            if you shared your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/maps/place/Visual+Studios+%26+Events+%7C+Photography+%7C+Videography/@40.678613,-73.868806,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25d96f51665f1:0x244b25616269adcb!8m2!3d40.678613!4d-73.868806!16s%2Fg%2F11t_prw046?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity rounded-xl"
            >
              <GoogleIcon className="w-4 h-4" />
              Leave a Google Review
              <ExternalLink size={14} />
            </a>
            <a
              href="https://wa.me/13473066637?text=Hi%2C%20I%20wanted%20to%20share%20my%20feedback%20about%20Visual%20Studios%21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:bg-muted/30 transition-colors rounded-xl"
            >
              <MessageCircle size={14} />
              Send via WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
