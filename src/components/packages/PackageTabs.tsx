"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Star, Users } from "lucide-react";
import Link from "next/link";


type Feature = { label: string; value: string; highlight?: boolean; exclusive?: boolean };
type Pkg = { num: string; name: string; hours: number; guests: string; tagline?: string; features: Feature[]; popular?: boolean };
type Tab = { id: string; label: string; includes: string[]; packages: Pkg[]; addons: string[]; deliveryNote: string };

const COUPLE_SESSION: Feature = {
  label: "Free Bonus",
  value: "Pre-wedding couple session — 1 hr, booked before your wedding day",
  highlight: true,
};

const TABS: Tab[] = [
  {
    id: "photography",
    label: "Photography",
    includes: [
      "Professional photographer",
      "Pre-shoot consultation",
      "Backdrop & lighting setup",
      "High-resolution digital delivery via Pixieset",
      "Online gallery client access",
    ],
    packages: [
      {
        num: "01", name: "Essentials", hours: 4, guests: "Up to 100 guests",
        features: [
          { label: "Coverage",   value: "4 hours of photography" },
          { label: "Edited",     value: "300 professionally edited high-res photos" },
          { label: "Retouched",  value: "75 hand-retouched portraits" },
          { label: "Lighting",   value: "Professional lighting setup" },
          { label: "Delivery",   value: "Pixieset gallery with digital download" },
        ],
      },
      {
        num: "02", name: "Classic", hours: 8, guests: "Up to 200 guests",
        features: [
          { label: "Coverage",   value: "8 hours of photography" },
          { label: "Edited",     value: "600 professionally edited high-res photos" },
          { label: "Retouched",  value: "150 hand-retouched portraits" },
          { label: "Lighting",   value: "Professional lighting setup" },
          { label: "Delivery",   value: "Pixieset gallery with digital download" },
        ],
      },
      {
        num: "03", name: "Signature", hours: 12, guests: "Up to 300 guests", popular: true,
        features: [
          { label: "Coverage",   value: "12 hours of photography" },
          { label: "Edited",     value: "900 professionally edited high-res photos" },
          { label: "Retouched",  value: "225 hand-retouched portraits" },
          { label: "Support",    value: "Professional lighting + on-site assistant" },
          { label: "Gallery",    value: "Pixieset gallery with client proofing" },
          { label: "Delivery",   value: "High-resolution digital download" },
        ],
      },
      {
        num: "04", name: "Elite", hours: 16, guests: "Up to 500+ guests",
        tagline: "Our most complete photography experience — including the fine art album available nowhere else.",
        features: [
          { label: "Exclusive",  value: "Fine Art Hardcover Album (20×20, 40 pages)", exclusive: true },
          { label: "Coverage",   value: "16 hours of full-day photography" },
          { label: "Edited",     value: "1,200 professionally edited high-res photos" },
          { label: "Retouched",  value: "300 hand-retouched portraits" },
          { label: "Team",       value: "2-photographer team + on-site assistant" },
          { label: "Lighting",   value: "Professional lighting, full cinematic style" },
          { label: "Delivery",   value: "Priority turnaround, Pixieset gallery" },
        ],
      },
    ],
    addons: [
      "Extra hour of coverage",
      "Drone / aerial coverage",
      "Pre-wedding or engagement shoot",
      "Post-wedding shoot",
      "Same-day highlight edit",
      "2nd photographer",
      "Female-only crew & editor",
      "Magazine-style booklet (12 pages)",
      "Engagement photoshoot session",
      "Wedding photo puzzle",
      "Premium hardcover photo album (included free in Elite)",
      "QR code table cards for gallery",
      "Framed print (16×20 inches)",
      "Rush delivery (48-hr turnaround)",
      "Canvas wall art (20×30 inches)",
      "USB drive delivery",
      "Fine art prints",
      "Live streaming",
    ],
    deliveryNote: "All photos delivered via your private Pixieset gallery with high-resolution digital download access.",
  },
  {
    id: "videography",
    label: "Videography",
    includes: [
      "Professional videographer",
      "Pre-shoot consultation",
      "Backdrop & lighting setup",
      "Full cinematic color grading",
      "Digital delivery via private link",
    ],
    packages: [
      {
        num: "01", name: "Essentials", hours: 4, guests: "Up to 100 guests",
        features: [
          { label: "Coverage",       value: "1 videographer, 4 hours of footage" },
          { label: "Highlight Reel", value: "Cinematic highlight reel — 2–3 min, color-graded, music-licensed" },
          { label: "Ceremony Film",  value: "Full edited ceremony film — 10–15 min" },
          { label: "Raw Footage",    value: "Backup delivered via private link" },
          { label: "Delivery",       value: "6–8 weeks via private streaming link" },
        ],
      },
      {
        num: "02", name: "Classic", hours: 8, guests: "Up to 200 guests",
        features: [
          { label: "Coverage",       value: "1 videographer, 8 hours of footage" },
          { label: "Highlight Reel", value: "Cinematic highlight reel — 4–5 min" },
          { label: "Full Film",      value: "Full edited ceremony + reception film — 25–35 min" },
          { label: "Social Cut",     value: "60-second vertical reel for Instagram/TikTok" },
          { label: "Raw Footage",    value: "Backup delivered via private link" },
          { label: "Delivery",       value: "6–8 weeks via private streaming link" },
        ],
      },
      {
        num: "03", name: "Signature", hours: 12, guests: "Up to 300 guests", popular: true,
        features: [
          { label: "Coverage",       value: "2 videographers, 12 hours of footage" },
          { label: "Highlight Reel", value: "Cinematic highlight reel — 6–8 min" },
          { label: "Full Film",      value: "Full edited wedding film — 45–60 min" },
          { label: "Social Cut",     value: "60-second reel + 30-second teaser" },
          { label: "Documentary",    value: "Full ceremony documentary cut (Nikkah/ceremony in full)" },
          { label: "Raw Footage",    value: "Backup delivered via private link" },
          { label: "Delivery",       value: "6–8 weeks priority via private streaming link" },
        ],
      },
      {
        num: "04", name: "Elite", hours: 16, guests: "Up to 500+ guests",
        tagline: "Our most complete wedding film experience — including the full documentary available nowhere else.",
        features: [
          { label: "Exclusive",      value: "Full Documentary Film (60–90 min)", exclusive: true },
          { label: "Coverage",       value: "2 videographers + drone operator, 16 hours of footage" },
          { label: "Highlight Reel", value: "Cinematic highlight reel — 8–10 min" },
          { label: "Full Film",      value: "Full edited wedding film — 60–75 min" },
          { label: "Social Cut",     value: "60-second reel + 30-second teaser + 15-second teaser" },
          { label: "Documentary",    value: "Full ceremony documentary cut" },
          { label: "Drone",          value: "Drone aerial footage section" },
          { label: "Same-Day Edit",  value: "90-second teaser delivered the night of the wedding" },
          { label: "Raw Footage",    value: "Backup delivered via private link" },
          { label: "Delivery",       value: "4–6 weeks priority turnaround" },
        ],
      },
    ],
    addons: [
      "Extra hour of coverage",
      "Drone / aerial coverage",
      "Pre-wedding or engagement shoot",
      "Post-wedding shoot",
      "Same-day highlight edit",
      "Live streaming",
      "2nd videographer",
      "Female-only crew & editor",
      "USB drive delivery",
      "Reception edit (separate cut)",
      "QR code table cards for video links",
      "Teaser reel for social media",
    ],
    deliveryNote: "All films delivered via private secure link provided after editing is complete.",
  },
  {
    id: "bundle",
    label: "Photo + Video",
    includes: [
      "Professional photographer & videographer",
      "Pre-event consultation",
      "Backdrop & lighting setup",
      "Full cinematic color grading",
      "Pixieset gallery + private video link delivery",
    ],
    packages: [
      {
        num: "01", name: "Essentials", hours: 4, guests: "Up to 100 guests",
        features: [
          { label: "Coverage",  value: "4 hours photo + video" },
          { label: "Films",     value: "1 edited highlight film" },
          { label: "Edited",    value: "300 professionally edited high-res photos" },
          { label: "Retouched", value: "75 hand-retouched portraits" },
          { label: "Lighting",  value: "Professional lighting setup" },
          { label: "Delivery",  value: "Pixieset gallery + private video link" },
        ],
      },
      {
        num: "02", name: "Classic", hours: 8, guests: "Up to 200 guests",
        features: [
          { label: "Coverage",  value: "8 hours photo + video" },
          { label: "Films",     value: "2 edited highlight films" },
          { label: "Edited",    value: "600 professionally edited high-res photos" },
          { label: "Retouched", value: "150 hand-retouched portraits" },
          { label: "Editing",   value: "Full photo & video editing" },
          { label: "Lighting",  value: "Professional lighting setup" },
          { label: "Delivery",  value: "Pixieset gallery + private video link" },
        ],
      },
      {
        num: "03", name: "Signature", hours: 12, guests: "Up to 300 guests", popular: true,
        features: [
          { label: "Coverage",  value: "12 hours photo + video" },
          { label: "Films",     value: "3 edited films — ceremony, reception & trailer" },
          { label: "Edited",    value: "900 professionally edited high-res photos" },
          { label: "Retouched", value: "225 hand-retouched portraits" },
          { label: "Support",   value: "Professional lighting + on-site assistant" },
          { label: "Editing",   value: "Full photo & video editing" },
          { label: "Delivery",  value: "Pixieset gallery + private video link" },
        ],
      },
      {
        num: "04", name: "Elite", hours: 16, guests: "Up to 500+ guests",
        tagline: "Our most complete wedding experience — including the full documentary film available nowhere else.",
        features: [
          { label: "Exclusive",  value: "Full Documentary Film (60–90 min) + Fine Art Hardcover Album (20×20, 40 pages)", exclusive: true },
          { label: "Coverage",   value: "16 hours full-day photo + video" },
          { label: "Films",      value: "4 edited films — ceremony, reception, couple highlight & trailer" },
          { label: "Edited",     value: "1,200 professionally edited high-res photos" },
          { label: "Retouched",  value: "300 hand-retouched portraits" },
          { label: "Team",       value: "2-photographer team + videography assistant" },
          { label: "Editing",    value: "Premium editing, cinematic coverage & lighting" },
          { label: "Delivery",   value: "Pixieset gallery + private video link, priority delivery" },
        ],
      },
    ],
    addons: [
      "Extra hour of coverage",
      "Drone / aerial coverage",
      "Pre-wedding or engagement shoot",
      "Post-wedding shoot",
      "Same-day highlight edit",
      "Live streaming",
      "2nd photographer or videographer",
      "Female-only crew & editor",
      "USB drive delivery",
      "Fine art prints",
      "Engagement photo + video session",
      "Teaser reel for social media",
      "Premium hardcover photo album",
      "Framed print (16×20 inches)",
      "Canvas wall art (20×30 inches)",
      "QR code table cards (gallery + video)",
      "Magazine-style booklet (12 pages)",
      "Rush delivery upgrade",
    ],
    deliveryNote: "Photos via Pixieset gallery · Films via private secure link · Both delivered after editing is complete.",
  },
];

export function PackageTabs() {
  const [activeTab, setActiveTab] = useState("photography");
  const [addonsOpen, setAddonsOpen] = useState(false);
  const [includesOpen, setIncludesOpen] = useState(false);

  const WHATS_INCLUDED = [
    "Professional photo and/or video team",
    "Online gallery with web & full-resolution digital files",
    "Flexible coverage — getting ready, ceremony, portraits, reception",
    "Unlimited locations within booked hours",
    "Pro cameras, lenses, lighting, and audio equipment",
    "Artistic direction and posing guidance",
    "Consistent color grading",
    "No watermarks — personal use license",
    "3 months cloud storage",
    "Planning consultations via phone, email, and WhatsApp",
    "Free pre-wedding couple session — 1 hour, booked before your wedding day",
  ];

  const tab = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block text-brand-500">
            2026 Service Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Photography &amp; Videography Packages
          </h2>
          <p className="text-foreground/60 text-base max-w-xl mx-auto">
            All packages are tailored for South Asian and Muslim weddings. Every couple receives a pre-event consultation to customize coverage to their specific needs.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-border bg-muted/30 p-1 gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setAddonsOpen(false); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* All packages include */}
            <div className="mb-8 rounded-2xl p-5 border border-brand-500/20 bg-brand-500/5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest mb-3 text-brand-500">
                All Packages Include
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {tab.includes.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check size={13} className="text-brand-500" strokeWidth={2.5} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Retouching explainer — photo tabs only */}
            {activeTab !== "videography" && (
              <p className="text-xs text-foreground/50 text-center mb-6 leading-relaxed">
                <span className="font-semibold text-foreground/70">Edited photos</span> = color-graded, cropped, and corrected.{" "}
                <span className="font-semibold text-foreground/70">Retouched portraits</span> = individual work on skin tone, lighting, blemishes, and fine detail.{" "}
                Every package includes both.
              </p>
            )}

            {/* Package cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
              {tab.packages.map((pkg) => (
                <div
                  key={pkg.num}
                  className={`relative rounded-2xl flex flex-col p-6 transition-all duration-300 ${
                    pkg.popular
                      ? "border-[1.5px] border-brand-500 bg-brand-500/5 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                      : "border border-border bg-card"
                  }`}
                >
                  {/* Most Popular badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap bg-brand-500 text-white">
                      <Star size={9} fill="currentColor" />
                      Most Popular
                    </div>
                  )}

                  {/* Package label */}
                  <span className="text-[10px] font-extrabold uppercase tracking-widest mb-2 text-brand-500">
                    Package {pkg.num}
                  </span>

                  {/* Name + hours */}
                  <h3 className="text-xl font-extrabold tracking-tight leading-tight mb-0.5">{pkg.name}</h3>
                  <p className="text-sm text-foreground/45 mb-3">{pkg.hours}-Hour Coverage</p>

                  {/* Guest count */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/8 border border-brand-500/15 text-[11px] font-semibold text-brand-600 dark:text-brand-400 mb-3">
                    <Users size={11} strokeWidth={2.5} />
                    {pkg.guests}
                  </span>

                  {/* Elite tagline */}
                  {pkg.tagline && (
                    <p className="text-[11px] text-foreground/50 leading-snug italic mb-5">{pkg.tagline}</p>
                  )}

                  {/* Feature list */}
                  <ul className="space-y-3 flex-1 mb-6">
                    {[...pkg.features, COUPLE_SESSION].map((f) => (
                      <li
                        key={f.label}
                        className={`text-sm ${
                          f.exclusive ? "-mx-2 px-2.5 py-2 rounded-xl bg-brand-500/10 border border-brand-500/25" :
                          f.highlight  ? "mt-2 pt-3 border-t border-brand-500/20" : ""
                        }`}
                      >
                        {f.exclusive && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500 text-white text-[9px] font-extrabold uppercase tracking-widest mb-1.5">
                            <Star size={8} fill="currentColor" strokeWidth={0} />
                            Elite Exclusive
                          </span>
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-wider block leading-none mb-0.5 ${
                          f.exclusive ? "text-brand-500" :
                          f.highlight  ? "text-brand-500" : "text-foreground/35"
                        }`}>
                          {f.label}
                        </span>
                        <span className={`leading-snug flex items-start gap-1.5 ${
                          f.exclusive ? "text-brand-600 dark:text-brand-400 font-semibold" :
                          f.highlight  ? "text-brand-600 dark:text-brand-400 font-medium" : "text-foreground/80"
                        }`}>
                          {f.highlight && <Check size={13} className="text-brand-500 mt-0.5 shrink-0" strokeWidth={2.5} />}
                          {f.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/contact?package=${activeTab}&tier=${pkg.name.toLowerCase()}`}
                    className={`block text-center py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all hover:opacity-85 active:scale-[0.98] ${
                      pkg.popular
                        ? "bg-brand-500 text-white"
                        : "border border-brand-500/30 text-brand-500"
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              ))}
            </div>

            {/* Delivery note */}
            <p className="text-center text-foreground/40 text-xs mb-8">{tab.deliveryNote}</p>

            {/* What's Included accordion */}
            <div className="rounded-2xl border border-border overflow-hidden mb-3">
              <button
                onClick={() => setIncludesOpen((o) => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest">What&apos;s Included in Every Package</span>
                <ChevronDown
                  size={17}
                  className="transition-transform duration-200 text-foreground/50"
                  style={includesOpen ? { transform: "rotate(180deg)" } : {}}
                />
              </button>
              <AnimatePresence>
                {includesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                      {WHATS_INCLUDED.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="font-bold mt-px leading-none text-brand-500">✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add-ons accordion */}
            <div className="rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => setAddonsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest">Add-On Services</span>
                <ChevronDown
                  size={17}
                  className="transition-transform duration-200 text-foreground/50"
                  style={addonsOpen ? { transform: "rotate(180deg)" } : {}}
                />
              </button>
              <AnimatePresence>
                {addonsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
                      {tab.addons.map((addon) => (
                        <div key={addon} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="font-bold mt-px leading-none text-brand-500">＋</span>
                          {addon}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <p className="text-center text-foreground/35 text-xs mt-8 leading-relaxed">
          Travel fees apply for locations outside Brooklyn / Queens area &nbsp;·&nbsp;{" "}
          <a
            href="mailto:lens@visualstudioslens.com"
            className="underline underline-offset-2 hover:text-foreground/60 transition-colors"
          >
            lens@visualstudioslens.com
          </a>
          &nbsp;·&nbsp; Tailored for South Asian &amp; Muslim weddings
        </p>
      </div>
    </section>
  );
}
