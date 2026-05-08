"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Plus, Minus, BadgeInfo } from "lucide-react";
import Link from "next/link";
import { submitQuote } from "@/lib/quotesApi";

// ─── Types ─────────────────────────────────────────────────────────────────

type Coverage = "photo" | "video" | "photo_video";
type AddonKey =
  | "drone"
  | "pre_wedding"
  | "post_wedding"
  | "same_day_edit"
  | "cinematic_film"
  | "live_stream";
type Crew = "standard" | "female" | "mixed";

interface Estimate {
  low: number;
  high: number;
}

// ─── Pricing (Section 3 — confirmed numbers) ───────────────────────────────

const BASE_PRICES: Record<number, number> = {
  4: 550,
  6: 750,
  8: 950,
  10: 1250,
  12: 1650, // Full Day
};

const BUNDLE_FACTOR: Record<number, number> = {
  1: 1.0,
  2: 0.9,
  3: 0.8333,
};

const ADDON_PRICES: Record<AddonKey, { low: number; high: number }> = {
  drone:          { low: 200, high: 350 },
  pre_wedding:    { low: 300, high: 300 },
  post_wedding:   { low: 300, high: 300 },
  same_day_edit:  { low: 250, high: 250 },
  cinematic_film: { low: 500, high: 500 },
  live_stream:    { low: 300, high: 300 },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function roundTo50(n: number): number {
  return Math.round(n / 50) * 50;
}

function formatEstimate(est: Estimate): string {
  if (est.low === est.high) return `$${est.low.toLocaleString()}`;
  return `$${est.low.toLocaleString()} – $${est.high.toLocaleString()}`;
}

function labelCoverage(c: Coverage): string {
  if (c === "photo") return "Photo only";
  if (c === "video") return "Video only";
  return "Photo + Video";
}

function labelHours(h: number): string {
  return h === 12 ? "Full day" : `${h} hours`;
}

function labelAddon(a: AddonKey): string {
  const map: Record<AddonKey, string> = {
    drone:          "Drone / aerial",
    pre_wedding:    "Pre-wedding shoot",
    post_wedding:   "Post-wedding shoot",
    same_day_edit:  "Same-day edit",
    cinematic_film: "Cinematic film",
    live_stream:    "Live streaming",
  };
  return map[a];
}



// ─── Sub-components ────────────────────────────────────────────────────────

function Section({ title, children, info }: { title: string; children: React.ReactNode; info?: React.ReactNode }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="border-b border-border pb-8">
      <div className="flex items-center gap-2 mb-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {title}
        </h3>
        {info && (
          <div className="relative">
            <button
              onClick={() => setShowInfo((v) => !v)}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="flex items-center justify-center text-muted-foreground/60 hover:text-brand-500 transition-colors shrink-0"
              aria-label="What counts as a day?"
            >
              <BadgeInfo size={14} />
            </button>
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  className="absolute left-0 top-full mt-2 z-20 bg-card border border-border rounded-xl shadow-xl p-4 w-72 text-left"
                >
                  {info}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function ToggleGroup<T extends string | number>({
  options,
  selected,
  onChange,
}: {
  options: { value: T; label: string; popular?: boolean }[];
  selected: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`relative px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
            selected === o.value
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground border-border hover:border-foreground/50"
          }`}
        >
          {o.label}
          {o.popular && (
            <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[9px] px-1.5 py-0.5 rounded-full leading-none font-bold tracking-wide">
              POPULAR
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function MultiToggle({
  options,
  selected,
  onToggle,
}: {
  options: { value: AddonKey; label: string }[];
  selected: AddonKey[];
  onToggle: (v: AddonKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onToggle(o.value)}
          className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
            selected.includes(o.value)
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground border-border hover:border-foreground/50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CounterRow({
  label,
  value,
  onChange,
  max,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  suffix: string;
  step?: number;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground/80">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - step))}
          disabled={value === 0}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground/50 disabled:opacity-30 transition"
        >
          <Minus size={13} />
        </button>
        <span className="w-16 text-center text-sm font-medium tabular-nums">
          {value} {suffix}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground/50 disabled:opacity-30 transition"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

function EstimatePanel({
  selectionSummary,
  estimate,
  revealed,
  onGetQuote,
}: {
  selectionSummary: string[];
  estimate: Estimate;
  revealed: boolean;
  onGetQuote: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* 10% off new client badge */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
        <span className="text-brand-600 dark:text-brand-400 font-extrabold text-sm">10% OFF</span>
        <span className="text-foreground/60 text-xs">new client discount — mention when you book</span>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">
        Your Estimate
      </p>

      <motion.p
        animate={{ filter: revealed ? "blur(0px)" : "blur(10px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-extrabold tracking-tight text-foreground mb-1 select-none pointer-events-none"
      >
        {formatEstimate(estimate)}
      </motion.p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
        Every wedding is unique — pricing is confirmed during your free consultation after we review your selections together.
      </p>

      <div className="border-t border-border/50 pt-4 mb-5">
        <ul className="space-y-1.5">
          {selectionSummary.map((item, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onGetQuote}
        className="w-full bg-foreground text-background font-bold py-3.5 uppercase tracking-widest rounded-full hover:opacity-90 transition text-xs"
      >
        See Your Estimate
      </button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export function PackageEstimator() {
  const [coverage, setCoverage] = useState<Coverage>("photo_video");
  const [days, setDays] = useState<number>(1);
  const [dayHours, setDayHours] = useState<number[]>([6]);

  useEffect(() => {
    setDayHours((prev) => {
      const next = [...prev];
      while (next.length < days) next.push(next[next.length - 1] ?? 6);
      return next.slice(0, days);
    });
  }, [days]);
  const [addons, setAddons] = useState<AddonKey[]>([]);
  const [secondPhotoHours, setSecondPhotoHours] = useState(0);
  const [secondVideoHours, setSecondVideoHours] = useState(0);
  const [crew, setCrew] = useState<Crew>("standard");
  const [usbCount, setUsbCount] = useState(0);
  const [printCount, setPrintCount] = useState(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.documentElement.style.overflow = "";
    };
  }, [showModal]);
  const [mName, setMName] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPhone, setMPhone] = useState("");
  const [mWeddingDate, setMWeddingDate] = useState("");
  const [mNotes, setMNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const estimate = useMemo<Estimate>(() => {
    let low = 0;
    let high = 0;

    const factor = BUNDLE_FACTOR[days] ?? 1;

    if (coverage === "photo" || coverage === "video") {
      const daySum = dayHours.reduce((s, h) => s + (BASE_PRICES[h] ?? 0), 0);
      low = high = daySum * factor;
    } else {
      const daySum = dayHours.reduce((s, h) => s + (BASE_PRICES[h] ?? 0) * 2, 0);
      const base = daySum * factor;
      low = base - 100;
      high = base;
    }

    for (const a of addons) {
      low += ADDON_PRICES[a].low;
      high += ADDON_PRICES[a].high;
    }

    low  += secondPhotoHours * 150;
    high += secondPhotoHours * 150;
    low  += secondVideoHours * 150;
    high += secondVideoHours * 150;

    low  += usbCount * 20;
    high += usbCount * 25;
    low  += printCount * 3;
    high += printCount * 3;

    return { low: roundTo50(low), high: roundTo50(high) };
  }, [coverage, dayHours, days, addons, secondPhotoHours, secondVideoHours, usbCount, printCount]);

  const toggleAddon = (a: AddonKey) =>
    setAddons((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitQuote({
        coverage,
        hours: dayHours[0] ?? 6,
        dayHours,
        days,
        addons,
        secondPhotographerHours: secondPhotoHours,
        secondVideographerHours: secondVideoHours,
        crewPreference: crew,
        usbCount,
        printCount,
        estimateLow:  estimate.low,
        estimateHigh: estimate.high,
        coupleName:   mName,
        email:        mEmail,
        phone:        mPhone   || undefined,
        weddingDate:  mWeddingDate || undefined,
        notes:        mNotes   || undefined,
      });
      setSubmitted(true);
      setRevealed(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => {
    setSubmitted(false);
    setSubmitError(null);
    setShowModal(true);
  };

  const resetAll = () => {
    setCoverage("photo_video");
    setDays(1);
    setDayHours([6]);
    setAddons([]);
    setSecondPhotoHours(0);
    setSecondVideoHours(0);
    setCrew("standard");
    setUsbCount(0);
    setPrintCount(0);
    setMName("");
    setMEmail("");
    setMPhone("");
    setMWeddingDate("");
    setMNotes("");
    setSubmitted(false);
    setRevealed(false);
    setContactSent(false);
    setShowModal(false);
  };

  const selectionSummary = [
    labelCoverage(coverage),
    `${days} day${days > 1 ? "s" : ""}`,
    ...dayHours.map((h, i) => `Day ${i + 1}: ${labelHours(h)}`),
    ...addons.map(labelAddon),
    ...(secondPhotoHours > 0 ? [`2nd photographer (${secondPhotoHours} hrs)`] : []),
    ...(secondVideoHours > 0 ? [`2nd videographer (${secondVideoHours} hrs)`] : []),
    ...(usbCount > 0 ? [`${usbCount} USB drive(s)`] : []),
    ...(printCount > 0 ? [`${printCount} prints`] : []),
    "Lighting setup (included)",
    "Online gallery (included)",
  ];

  return (
    <>
      {/* Page header */}
      <section className="border-b border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">
            Package Builder
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-3">
            Build Your Package
          </h2>
          <p className="text-muted-foreground text-lg">
            Configure your package and get a custom quote — final pricing confirmed during your free consultation.
          </p>
        </div>
      </section>

      {/* Estimator body */}
      <section className="py-12 px-4 pb-32 lg:pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Toggles — left 2/3 */}
            <div className="lg:col-span-2 space-y-8">

              <Section title="1 · What do you need?">
                <ToggleGroup<Coverage>
                  options={[
                    { value: "photo",       label: "Photo only" },
                    { value: "video",       label: "Video only" },
                    { value: "photo_video", label: "Photo + Video", popular: true },
                  ]}
                  selected={coverage}
                  onChange={setCoverage}
                />
              </Section>

              <Section
                title="2 · How many days? (e.g Mehndi, Nikkah, Baraat, Walima, Reception & more)"
                info={
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="font-bold text-foreground mb-1">Day 1 — Pre-Wedding</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Mehndi/Mehendi (Pakistani, Indian, Arab) · Gaye Holud/Holud (Bengali) · Mayun (Pakistani) · Sangeet (Indian) · Henna night (Arab/Afghan)
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Day 2 — Main Ceremony</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Nikkah · Akht (Bengali Muslim) · Pheras (Indian Hindu) · Anand Karaj (Sikh) · Baraat · Doodh Pilai · Vidaai/Rukhsati · Zaffa (Arab)
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Day 3 — Post-Wedding / Reception</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Walima · Bou Bhat (Bengali) · Reception · Doli (Sikh)
                      </p>
                    </div>
                  </div>
                }
              >
                <ToggleGroup<number>
                  options={[
                    { value: 1, label: "1 day" },
                    { value: 2, label: "2 days" },
                    { value: 3, label: "3 days" },
                  ]}
                  selected={days}
                  onChange={setDays}
                />
                <div className="mt-6 space-y-5">
                  {dayHours.map((h, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Day {i + 1} — Coverage hours
                      </p>
                      <ToggleGroup<number>
                        options={[
                          { value: 4,  label: "4 hrs" },
                          { value: 6,  label: "6 hrs" },
                          { value: 8,  label: "8 hrs" },
                          { value: 10, label: "10 hrs" },
                          { value: 12, label: "Full day" },
                        ]}
                        selected={h}
                        onChange={(v) =>
                          setDayHours((prev) => prev.map((x, idx) => idx === i ? v : x))
                        }
                      />
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="3 · Add-ons">
                <MultiToggle
                  options={[
                    { value: "drone",          label: "Drone / aerial" },
                    { value: "pre_wedding",    label: "Pre-wedding shoot" },
                    { value: "post_wedding",   label: "Post-wedding shoot" },
                    { value: "same_day_edit",  label: "Same-day edit" },
                    { value: "cinematic_film", label: "Cinematic film" },
                    { value: "live_stream",    label: "Live streaming" },
                  ]}
                  selected={addons}
                  onToggle={toggleAddon}
                />
                <div className="mt-4 divide-y divide-border/40">
                  <CounterRow
                    label="Second photographer"
                    value={secondPhotoHours}
                    onChange={setSecondPhotoHours}
                    max={10}
                    suffix="hrs"
                  />
                  <CounterRow
                    label="Second videographer"
                    value={secondVideoHours}
                    onChange={setSecondVideoHours}
                    max={10}
                    suffix="hrs"
                  />
                </div>
              </Section>

              <Section title="4 · Crew preference">
                <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                  No price difference — available for all coverage types
                </p>
                <ToggleGroup<Crew>
                  options={[
                    { value: "standard", label: "Standard crew" },
                    { value: "female",   label: "All-female crew" },
                    { value: "mixed",    label: "Mixed crew" },
                  ]}
                  selected={crew}
                  onChange={setCrew}
                />
              </Section>

              {/* Deliverables — no border-b since it's last */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5">
                  5 · Deliverables
                </h3>
                <div className="divide-y divide-border/40">
                  <CounterRow
                    label="USB drive"
                    value={usbCount}
                    onChange={setUsbCount}
                    max={10}
                    suffix="USB"
                  />
                  <CounterRow
                    label="Printed 4×6 prints"
                    value={printCount}
                    onChange={setPrintCount}
                    max={200}
                    suffix="prints"
                    step={1}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-5">
                  Looking for a physical wedding album?{" "}
                  <Link
                    href="/contact"
                    className="font-bold underline underline-offset-2 hover:text-foreground transition"
                  >
                    Contact us for a custom quote.
                  </Link>
                </p>
              </div>

              {/* What's Already Included */}
              <div className="rounded-2xl border border-border bg-muted/20 p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  What&apos;s Already Included
                </h3>
                <ul className="space-y-2">
                  {[
                    "Photo / Video Team",
                    "Online gallery included with every package",
                    "Flexible coverage: getting ready, ceremony, portraits, reception",
                    "Unlimited locations within booked hours",
                    "Pro cameras, lenses, lighting, audio",
                    "Artistic direction and posing",
                    "Consistent color grading",
                    "Web + full-res digital delivery",
                    "No watermarks",
                    "Personal use license",
                    "3 months cloud storage",
                    "Planning consults (phone, email, WhatsApp)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 size={14} className="text-brand-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Estimate panel — desktop sticky */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <EstimatePanel
                  selectionSummary={selectionSummary}
                  estimate={estimate}
                  revealed={revealed}
                  onGetQuote={openModal}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <p className="text-sm font-semibold text-muted-foreground">
            Ready for your custom quote?
          </p>
          <button
            onClick={openModal}
            className="px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition whitespace-nowrap"
          >
            See Estimate
          </button>
        </div>
      </div>

      {/* Quote request modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 overflow-hidden"
            data-lenis-prevent
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !submitting && setShowModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-background rounded-2xl border border-border w-full max-w-md max-h-[90vh] z-10 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 md:p-8 overflow-y-auto overscroll-contain h-full flex-1">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
                    <span className="text-brand-600 dark:text-brand-400 font-extrabold text-sm">10% OFF</span>
                    <span className="text-foreground/60 text-xs">new client discount — mention when you book</span>
                  </div>

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">
                        Get Your Custom Quote
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        We&apos;ll confirm pricing during your free consultation.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-2 hover:bg-muted rounded-full transition"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={(e) => void handleSubmitQuote(e)} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Couple&apos;s Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fatima & Imran"
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                        className="w-full bg-muted/50 border border-border px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={mEmail}
                        onChange={(e) => setMEmail(e.target.value)}
                        className="w-full bg-muted/50 border border-border px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Phone / WhatsApp{" "}
                        <span className="font-normal normal-case tracking-normal text-muted-foreground/60">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={mPhone}
                        onChange={(e) => setMPhone(e.target.value)}
                        className="w-full bg-muted/50 border border-border px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Event Date{" "}
                        <span className="font-normal normal-case tracking-normal text-muted-foreground/60">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="date"
                        value={mWeddingDate}
                        onChange={(e) => setMWeddingDate(e.target.value)}
                        className="w-full bg-muted/50 border border-border px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Notes{" "}
                        <span className="font-normal normal-case tracking-normal text-muted-foreground/60">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Anything else we should know?"
                        value={mNotes}
                        onChange={(e) => setMNotes(e.target.value)}
                        className="w-full bg-muted/50 border border-border px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition rounded-xl resize-none"
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-foreground text-background font-bold py-4 uppercase tracking-widest rounded-full hover:opacity-90 transition disabled:opacity-60 text-xs"
                    >
                      {submitting ? "Sending…" : "Reveal My Estimate"}
                    </button>
                  </form>
                </>
              ) : !contactSent ? (
                /* ── Step 2: Estimate reveal ── */
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col py-2"
                >
                  {/* 10% off badge */}
                  <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
                    <span className="text-brand-600 dark:text-brand-400 font-extrabold text-sm">10% OFF</span>
                    <span className="text-foreground/60 text-xs">new client discount — mention when you book</span>
                  </div>

                  {/* Price reveal */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 size={20} className="text-green-500" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Your Estimate
                    </p>
                    <motion.p
                      initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="text-5xl font-extrabold tracking-tight text-foreground mb-2"
                    >
                      {formatEstimate(estimate)}
                    </motion.p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Final pricing is confirmed during your free consultation.
                    </p>
                  </div>

                  {/* What you selected */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                      What You Selected
                    </p>
                    <ul className="space-y-1.5">
                      {selectionSummary
                        .filter((item) => !item.endsWith("(included)"))
                        .map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Already included */}
                  <div className="mb-6 rounded-xl bg-muted/30 border border-border/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                      Already Included
                    </p>
                    <ul className="space-y-1">
                      {[
                        "Online gallery",
                        "Pro cameras, lenses, lighting & audio",
                        "Artistic direction & posing",
                        "Web + full-res digital delivery",
                        "Personal use license",
                        "Planning consults (phone, email, WhatsApp)",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                          <CheckCircle2 size={11} className="text-brand-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={() => setContactSent(true)}
                      className="flex-1 bg-foreground text-background font-bold py-3 uppercase tracking-widest rounded-full hover:opacity-90 transition text-xs"
                    >
                      Contact Me Back
                    </button>
                    <button
                      onClick={resetAll}
                      className="flex-1 border border-border text-foreground font-bold py-3 uppercase tracking-widest rounded-full hover:bg-muted transition text-xs"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Step 3: Contact confirmation ── */
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">
                    Quote Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                    We&apos;ll be in touch within 24 hours to confirm your package and schedule your free consultation.
                  </p>
                  <button
                    onClick={resetAll}
                    className="px-10 py-3 bg-foreground text-background font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition text-xs"
                  >
                    Done
                  </button>
                </motion.div>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
