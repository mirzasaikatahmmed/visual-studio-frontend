"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const DAY_MULTIPLIERS: Record<number, number> = {
  1: 1.0,
  2: 1.8,
  3: 2.5,
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5">
        {title}
      </h3>
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
  estimate,
  selectionSummary,
  onGetQuote,
}: {
  estimate: Estimate;
  selectionSummary: string[];
  onGetQuote: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">
        Your Estimate
      </p>
      <p className="text-4xl font-light tabular-nums leading-tight mb-4">
        {formatEstimate(estimate)}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
        This is an estimate, not a final price. Every wedding is unique, and we
        work with each couple to fit their vision and budget. Schedule your free
        consultation and we&apos;ll lock in the exact package together.
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
        Get Your Custom Quote
      </button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export function PackageEstimator() {
  const router = useRouter();

  const [coverage, setCoverage] = useState<Coverage>("photo_video");
  const [hours, setHours] = useState<number>(6);
  const [days, setDays] = useState<number>(1);
  const [addons, setAddons] = useState<AddonKey[]>([]);
  const [secondPhotoHours, setSecondPhotoHours] = useState(0);
  const [secondVideoHours, setSecondVideoHours] = useState(0);
  const [crew, setCrew] = useState<Crew>("standard");
  const [usbCount, setUsbCount] = useState(0);
  const [printCount, setPrintCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [mName, setMName] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPhone, setMPhone] = useState("");
  const [mWeddingDate, setMWeddingDate] = useState("");
  const [mNotes, setMNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const estimate = useMemo<Estimate>(() => {
    let low = 0;
    let high = 0;

    if (coverage === "photo" || coverage === "video") {
      low = high = BASE_PRICES[hours];
    } else {
      const combined = BASE_PRICES[hours] * 2;
      low = combined - 100;
      high = combined;
    }

    const mult = DAY_MULTIPLIERS[days];
    low *= mult;
    high *= mult;

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
  }, [coverage, hours, days, addons, secondPhotoHours, secondVideoHours, usbCount, printCount]);

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
        hours,
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
      setTimeout(() => {
        const params = new URLSearchParams({
          estimate: `${estimate.low}-${estimate.high}`,
          ...(mWeddingDate ? { wedding_date: mWeddingDate } : {}),
        });
        router.push(`/contact?${params.toString()}`);
      }, 2500);
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

  const selectionSummary = [
    labelCoverage(coverage),
    labelHours(hours),
    `${days} day${days > 1 ? "s" : ""}`,
    ...addons.map(labelAddon),
    ...(secondPhotoHours > 0 ? [`2nd photographer (${secondPhotoHours} hrs)`] : []),
    ...(secondVideoHours > 0 ? [`2nd videographer (${secondVideoHours} hrs)`] : []),
    ...(usbCount > 0 ? [`${usbCount} USB drive(s)`] : []),
    ...(printCount > 0 ? [`${printCount} prints`] : []),
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
            Estimates start at $499 · Final pricing confirmed during your free consultation.
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

              <Section title="2 · Coverage hours">
                <ToggleGroup<number>
                  options={[
                    { value: 4,  label: "4 hrs" },
                    { value: 6,  label: "6 hrs" },
                    { value: 8,  label: "8 hrs" },
                    { value: 10, label: "10 hrs" },
                    { value: 12, label: "Full day" },
                  ]}
                  selected={hours}
                  onChange={setHours}
                />
              </Section>

              <Section title="3 · How many days?">
                <ToggleGroup<number>
                  options={[
                    { value: 1, label: "1 day" },
                    { value: 2, label: "2 days  (e.g. Mehndi + Wedding)" },
                    { value: 3, label: "3 days  (Mehndi + Wedding + Walima)" },
                  ]}
                  selected={days}
                  onChange={setDays}
                />
              </Section>

              <Section title="4 · Add-ons">
                <MultiToggle
                  options={[
                    { value: "drone",          label: "Drone / aerial ($200+)" },
                    { value: "pre_wedding",    label: "Pre-wedding shoot ($300)" },
                    { value: "post_wedding",   label: "Post-wedding shoot ($300)" },
                    { value: "same_day_edit",  label: "Same-day edit ($250)" },
                    { value: "cinematic_film", label: "Cinematic film ($500)" },
                    { value: "live_stream",    label: "Live streaming ($300)" },
                  ]}
                  selected={addons}
                  onToggle={toggleAddon}
                />
                <div className="mt-4 divide-y divide-border/40">
                  <CounterRow
                    label="Second photographer ($150 / hr)"
                    value={secondPhotoHours}
                    onChange={setSecondPhotoHours}
                    max={10}
                    suffix="hrs"
                  />
                  <CounterRow
                    label="Second videographer ($150 / hr)"
                    value={secondVideoHours}
                    onChange={setSecondVideoHours}
                    max={10}
                    suffix="hrs"
                  />
                </div>
              </Section>

              <Section title="5 · Crew preference">
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
                  6 · Deliverables
                </h3>
                <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                  Online gallery included with every package
                </p>
                <div className="divide-y divide-border/40">
                  <CounterRow
                    label="USB drive ($20–$25 each)"
                    value={usbCount}
                    onChange={setUsbCount}
                    max={10}
                    suffix="USB"
                  />
                  <CounterRow
                    label="Printed 4×6 prints ($3 each)"
                    value={printCount}
                    onChange={setPrintCount}
                    max={200}
                    suffix="prints"
                    step={10}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-5">
                  Looking for a physical wedding album?{" "}
                  <Link
                    href="/contact"
                    className="underline underline-offset-2 hover:text-foreground transition"
                  >
                    Contact us for a custom quote.
                  </Link>
                </p>
              </div>
            </div>

            {/* Estimate panel — desktop sticky */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <EstimatePanel
                  estimate={estimate}
                  selectionSummary={selectionSummary}
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
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Your Estimate
            </p>
            <p className="text-xl font-light tabular-nums">{formatEstimate(estimate)}</p>
          </div>
          <button
            onClick={openModal}
            className="px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition whitespace-nowrap"
          >
            Get Quote
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
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
              className="relative bg-background rounded-2xl border border-border p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
            >
              {!submitted ? (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">
                        Get Your Custom Quote
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Estimate:{" "}
                        <span className="text-foreground font-semibold">
                          {formatEstimate(estimate)}
                        </span>
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
                        Phone / WhatsApp
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
                        Wedding Date{" "}
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
                      {submitting ? "Sending…" : "Send Quote Request"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
                    Quote Sent!
                  </h3>
                  <p className="text-muted-foreground mb-1">
                    We&apos;ll reach out within 24 hours to confirm your package.
                  </p>
                  <p className="text-sm text-muted-foreground/60">
                    Redirecting you to our contact page&hellip;
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
