"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  contact: string;
  businessName: string;
  industry: string;
  stage: string;
  targetAudience: string;
  alreadyHave: string[];
  needBuilt: string[];
  budget: string;
  deadline: string;
  extras: string;
};

const EMPTY: FormData = {
  name: "",
  email: "",
  contact: "",
  businessName: "",
  industry: "",
  stage: "",
  targetAudience: "",
  alreadyHave: [],
  needBuilt: [],
  budget: "",
  deadline: "",
  extras: "",
};

const ALREADY_HAVE_OPTIONS = [
  "Logo / Branding",
  "Website",
  "Google Business Profile",
  "Social Media Accounts",
  "Business Email",
  "Brand Photos / Video",
  "None of the above",
];

const NEED_BUILT_OPTIONS = [
  "Logo & Brand Identity",
  "Google Business Profile Setup",
  "Social Media Account Setup",
  "Brand Photography",
  "Brand Video / Reel",
  "Business Systems & Tools",
  "Content Creation",
  "Everything — full build",
];

function CheckboxGroup({
  selected,
  options,
  onToggle,
}: {
  selected: string[];
  options: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-colors ${
              checked
                ? "border-brand-500 bg-brand-500/10 text-zinc-900 dark:text-zinc-100"
                : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            <span className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-brand-500 border-brand-500" : "border-zinc-300 dark:border-zinc-600"}`}>
              {checked && (
                <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BusinessSetupModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleCheckbox = (field: "alreadyHave" | "needBuilt", value: string) => {
    setForm((prev) => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect API here — tag inquiry as 'Business Setup'
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(EMPTY); setSubmitted(false); }, 300);
  };

  const inputCls =
    "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-brand-500 transition-colors";
  const labelCls =
    "block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-8 py-5 flex items-center justify-between rounded-t-3xl">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-0.5">Full Build</p>
                <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">Set Up My Business</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Inquiry Sent!</h3>
                  <p className="text-foreground/55 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    Thank you! We will review your business brief and get back to you within 24 hours to discuss next steps.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs rounded-xl hover:opacity-80 transition-opacity"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name <span className="text-brand-500">*</span></label>
                      <input required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email <span className="text-brand-500">*</span></label>
                      <input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className={labelCls}>Phone / WhatsApp <span className="text-foreground/30 font-normal normal-case tracking-normal">(optional)</span></label>
                    <input type="tel" value={form.contact} onChange={set("contact")} placeholder="+1 (347) 000 0000" className={inputCls} />
                  </div>

                  {/* Business Name + Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Business Name <span className="text-brand-500">*</span></label>
                      <input required value={form.businessName} onChange={set("businessName")} placeholder="Your business name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Industry / Type <span className="text-brand-500">*</span></label>
                      <input required value={form.industry} onChange={set("industry")} placeholder="e.g. Catering, Boutique, Salon…" className={inputCls} />
                    </div>
                  </div>

                  {/* Business Stage */}
                  <div>
                    <label className={labelCls}>What stage is your business at? <span className="text-brand-500">*</span></label>
                    <select required value={form.stage} onChange={set("stage")} className={inputCls}>
                      <option value="" disabled>Select a stage…</option>
                      <option>Idea / Pre-launch — not yet open</option>
                      <option>Just launched — open but not established</option>
                      <option>Growing — established but needs a stronger presence</option>
                      <option>Rebranding — existing business, new direction</option>
                    </select>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label className={labelCls}>Who is your target customer?</label>
                    <input value={form.targetAudience} onChange={set("targetAudience")} placeholder="e.g. South Asian families in Brooklyn, local brides, small business owners…" className={inputCls} />
                  </div>

                  {/* Already Have */}
                  <div>
                    <label className={labelCls}>What do you already have in place?</label>
                    <CheckboxGroup
                      selected={form.alreadyHave}
                      options={ALREADY_HAVE_OPTIONS}
                      onToggle={(opt) => toggleCheckbox("alreadyHave", opt)}
                    />
                  </div>

                  {/* Need Built */}
                  <div>
                    <label className={labelCls}>What do you need built or set up? <span className="text-brand-500">*</span></label>
                    <CheckboxGroup
                      selected={form.needBuilt}
                      options={NEED_BUILT_OPTIONS}
                      onToggle={(opt) => toggleCheckbox("needBuilt", opt)}
                    />
                  </div>

                  {/* Budget + Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Estimated Budget</label>
                      <input value={form.budget} onChange={set("budget")} placeholder="e.g. $2,000 or flexible" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Target Launch / Deadline</label>
                      <select value={form.deadline} onChange={set("deadline")} className={inputCls}>
                        <option value="">Flexible</option>
                        <option>ASAP — within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>1 – 3 months</option>
                        <option>3+ months</option>
                      </select>
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <label className={labelCls}>Anything else we should know?</label>
                    <textarea
                      rows={3}
                      value={form.extras}
                      onChange={set("extras")}
                      placeholder="Competitors, inspirations, special requirements, questions…"
                      className={inputCls}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded-xl hover:opacity-80 transition-opacity mt-2"
                  >
                    Submit Inquiry →
                  </button>

                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
