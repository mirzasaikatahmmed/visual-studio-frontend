"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  contact: string;
  websiteDetails: string;
  purpose: string;
  hasUI: string;
  uiDetails: string;
  pages: string;
  budget: string;
  deadline: string;
  extras: string;
};

const EMPTY: FormData = {
  name: "",
  email: "",
  contact: "",
  websiteDetails: "",
  purpose: "",
  hasUI: "",
  uiDetails: "",
  pages: "",
  budget: "",
  deadline: "",
  extras: "",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function WebsiteInquiryModal({ open, onClose }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect API here
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(EMPTY); setSubmitted(false); }, 300);
  };

  const inputCls =
    "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-brand-500 transition-colors";
  const labelCls = "block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5";

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
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-0.5">Custom Site</p>
                <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">Build My Website</h2>
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
                    Thank you! We will review your website brief and get back to you within 24 hours.
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

                  {/* Purpose */}
                  <div>
                    <label className={labelCls}>Purpose of This Website <span className="text-brand-500">*</span></label>
                    <select required value={form.purpose} onChange={set("purpose")} className={inputCls}>
                      <option value="" disabled>Select a purpose…</option>
                      <option>Business / Brand</option>
                      <option>Photography / Portfolio</option>
                      <option>E-Commerce / Store</option>
                      <option>Event / Wedding</option>
                      <option>Blog / Personal</option>
                      <option>Non-Profit / Community</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Website Details */}
                  <div>
                    <label className={labelCls}>Website Details <span className="text-brand-500">*</span></label>
                    <textarea
                      required
                      rows={4}
                      value={form.websiteDetails}
                      onChange={set("websiteDetails")}
                      placeholder="Describe your business, what the website should do, key features you need…"
                      className={inputCls}
                    />
                  </div>

                  {/* Has UI */}
                  <div>
                    <label className={labelCls}>Do you have an existing UI / Design? <span className="text-brand-500">*</span></label>
                    <select required value={form.hasUI} onChange={set("hasUI")} className={inputCls}>
                      <option value="" disabled>Select…</option>
                      <option value="yes">Yes — I have a Figma / design file</option>
                      <option value="partial">Partial — rough wireframes or references</option>
                      <option value="no">No — starting from scratch</option>
                    </select>
                  </div>

                  {/* UI Details (conditional) */}
                  {(form.hasUI === "yes" || form.hasUI === "partial") && (
                    <div>
                      <label className={labelCls}>UI / Design Details</label>
                      <textarea
                        rows={3}
                        value={form.uiDetails}
                        onChange={set("uiDetails")}
                        placeholder="Share a Figma link, reference URLs, or describe your design…"
                        className={inputCls}
                      />
                    </div>
                  )}

                  {/* Pages */}
                  <div>
                    <label className={labelCls}>Pages / Sections Needed</label>
                    <input
                      value={form.pages}
                      onChange={set("pages")}
                      placeholder="e.g. Home, About, Portfolio, Contact, Booking…"
                      className={inputCls}
                    />
                  </div>

                  {/* Budget + Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Estimated Budget</label>
                      <input value={form.budget} onChange={set("budget")} placeholder="e.g. $1,000 or not set yet" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Launch Deadline</label>
                      <select value={form.deadline} onChange={set("deadline")} className={inputCls}>
                        <option value="">Flexible</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>1 – 3 months</option>
                        <option>3+ months</option>
                      </select>
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <label className={labelCls}>Anything Else?</label>
                    <textarea
                      rows={3}
                      value={form.extras}
                      onChange={set("extras")}
                      placeholder="Special requirements, integrations, inspirations, questions…"
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
