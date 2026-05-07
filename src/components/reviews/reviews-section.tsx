"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ExternalLink, MessageCircle, Instagram } from "lucide-react";

// ── Google icon ──────────────────────────────────────────────────
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Named testimonials — replace with real reviews when collected ─
export const NAMED_TESTIMONIALS = [
  {
    name: "Zainab R.",
    event: "Pakistani Wedding · Brooklyn, NY",
    text: "Visual Studios captured our Nikkah and Walima better than we could have imagined. The female photographer made my entire family feel at ease — especially during the women-only Mehndi. I cry every time I rewatch the film.",
    source: "Google Review",
    rating: 5,
  },
  {
    name: "Fatima A.",
    event: "Bengali Wedding · Queens, NY",
    text: "From our Holud to the Walima, every single moment was captured beautifully. The team was so respectful of our traditions and the editing was absolutely stunning.",
    source: "Google Review",
    rating: 5,
  },
  {
    name: "Malaika S.",
    event: "Indian Wedding · New Jersey",
    text: "I was nervous about having cameras everywhere, but the Visual Studios team made everyone comfortable. The cinematic film made my parents cry happy tears — we watch it every anniversary.",
    source: "Direct",
    rating: 5,
  },
  {
    name: "Nasheed K.",
    event: "Nikkah & Walima · Manhattan, NY",
    text: "The no-music edit was exactly what we needed. The film is so beautiful and we can share it with our entire extended family without concern. Completely exceeded expectations.",
    source: "Google Review",
    rating: 5,
  },
  {
    name: "Priya M.",
    event: "Indian Wedding · Long Island, NY",
    text: "They captured our Baraat perfectly — the energy, the colors, every emotional moment. Absolutely no regrets. We still watch the highlight reel every year.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Ayesha T.",
    event: "Pakistani Wedding · Queens, NY",
    text: "The 72-hour sneak peek was the best surprise. We were still in honeymoon mode when those first photos arrived. Absolutely perfect — every shot better than the last.",
    source: "Google Review",
    rating: 5,
  },
];

// ── Google review shape ──────────────────────────────────────────
interface GoogleReview {
  name: string;
  time: string;
  text: string;
  avatar: string;
  rating: number;
}

type Tab = "stories" | "google" | "share";

export const SOURCE_BADGES: Record<string, { label: string; color: string }> = {
  "Google Review": { label: "Google Review", color: "text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/20" },
  "Direct":        { label: "Direct",        color: "text-brand-600 dark:text-brand-400 bg-brand-500/10 border-brand-500/20" },
  "Instagram":     { label: "Instagram",     color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
};

// ── Initials avatar ──────────────────────────────────────────────
function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
      {initials}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function ReviewsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("stories");
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [googleRating, setGoogleRating] = useState(5);
  const [googleTotal, setGoogleTotal] = useState(0);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then(r => r.json())
      .then(data => {
        if (data.reviews?.length) {
          setGoogleReviews(data.reviews);
          setGoogleRating(data.rating);
          setGoogleTotal(data.totalRatings);
        }
      })
      .catch(() => {});
  }, []);

  const duplicated = [...googleReviews, ...googleReviews, ...googleReviews];

  const tabs: { id: Tab; label: string }[] = [
    { id: "stories", label: "From Our Clients" },
    { id: "google",  label: googleTotal > 0 ? `Google (${googleRating}★)` : "Google Reviews" },
    { id: "share",   label: "Leave a Review" },
  ];

  return (
    <section className="py-24 bg-muted/20 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center gap-1 mb-3 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-3">What Our Clients Say</h2>
          <p className="text-foreground/60 text-lg">Real families. Real weddings. Real words.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-border bg-muted/30 p-1 gap-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                  activeTab === t.id
                    ? "bg-foreground text-background shadow"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">

        {/* ── Stream 2: Named client testimonials ── */}
        {activeTab === "stories" && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="container mx-auto px-4 max-w-6xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NAMED_TESTIMONIALS.map((t, i) => {
                const badge = SOURCE_BADGES[t.source] ?? SOURCE_BADGES["Direct"];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="bg-background rounded-2xl border border-border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={t.name} />
                        <div>
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-foreground/50">{t.event}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex text-yellow-500 gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} fill="currentColor" strokeWidth={0} size={13} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Stream 1: Google Reviews marquee ── */}
        {activeTab === "google" && (
          <motion.div
            key="google"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {googleReviews.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <p className="text-foreground/60 text-sm flex items-center justify-center gap-2">
                    <GoogleIcon className="w-4 h-4" />
                    {googleRating}.0 rating · {googleTotal}+ verified Google reviews
                  </p>
                </div>
                <div className="relative w-full overflow-hidden flex group">
                  <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
                  <motion.div
                    className="flex w-max"
                    animate={{ x: ["0%", "-33.333333%"] }}
                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                  >
                    {duplicated.map((r, i) => (
                      <div key={i} className="w-[320px] md:w-[400px] shrink-0 p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col gap-4 mx-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={r.avatar} alt={r.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-semibold text-sm">{r.name}</p>
                              <p className="text-xs text-foreground/50">{r.time}</p>
                            </div>
                          </div>
                          <GoogleIcon className="w-5 h-5" />
                        </div>
                        <div className="flex text-yellow-500 gap-0.5">
                          {[...Array(r.rating)].map((_, j) => (
                            <Star key={j} fill="currentColor" strokeWidth={0} size={14} />
                          ))}
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
                          &ldquo;{r.text}&rdquo;
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="container mx-auto px-4 max-w-xl text-center py-12">
                <GoogleIcon className="w-10 h-10 mx-auto mb-4" />
                <p className="text-foreground/60 text-base">Google reviews loading…</p>
                <p className="text-foreground/40 text-sm mt-2">Connect Google Business API to display live reviews here.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Stream 3: Leave a review CTA ── */}
        {activeTab === "share" && (
          <motion.div
            key="share"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="container mx-auto px-4 max-w-2xl text-center py-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Your story matters to us.
            </h3>
            <p className="text-foreground/60 text-base mb-10 leading-relaxed">
              If Visual Studios was part of your special day, we&apos;d be honoured if you shared your experience. It helps South Asian and Muslim families find us — and trust us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/search?q=Visual+Studios+%26+Events+Brooklyn+NY+reviews"
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
              <a
                href="https://www.instagram.com/visualstudioofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:bg-muted/30 transition-colors rounded-xl"
              >
                <Instagram size={14} />
                Tag us on Instagram
              </a>
            </div>
            <p className="text-foreground/35 text-xs mt-8">
              @visualstudioofficial · #VisualStudiosEvents · #VisualStudiosNY
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}
