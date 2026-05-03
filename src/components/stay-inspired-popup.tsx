"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles, Gift } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const STORAGE_KEY = "vs_stay_inspired_dismissed";
const DISMISS_DAYS = 7;

async function subscribeEmail(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? "Subscription failed");
  return data;
}

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export function StayInspiredPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isDismissed()) return;
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    markDismissed();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await subscribeEmail(email);
      setStatus("success");
      setMessage(res.message);
      markDismissed();
      setTimeout(() => setVisible(false), 3000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Popup card */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto overflow-hidden rounded-3xl border border-border shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              {/* Background */}
              <div className="absolute inset-0 bg-background" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 via-transparent to-brand-400/3 dark:from-brand-900/40 dark:via-transparent dark:to-indigo-950/30" />
              {/* Glow orbs — visible in dark mode only */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand-500/10 dark:bg-brand-500/25 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-brand-700/8 dark:bg-brand-700/20 blur-[80px] rounded-full pointer-events-none" />

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-50 p-2 text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded-full transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 p-8 md:p-10">
                {/* Exclusive Offer badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-400/15 border border-brand-400/30 text-brand-500 dark:text-brand-400 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={10} /> Exclusive Offer
                  </span>
                </div>

                {/* 10% OFF box */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-brand-400/30 bg-brand-400/10 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/20 border border-brand-400/30 shrink-0">
                    <Gift size={22} className="text-brand-500 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-brand-600 dark:text-brand-300 font-extrabold text-2xl tracking-tight leading-none">10% OFF</p>
                    <p className="text-foreground/50 text-xs mt-1 font-medium">your first booking with us</p>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-foreground text-2xl md:text-3xl font-extrabold tracking-tight leading-snug mb-2">
                  New Customer Discount
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Subscribe below and we&apos;ll send your exclusive discount code directly to your inbox — ready to use on your first booking.
                </p>

                {/* Form or success */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={20} className="text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-foreground font-bold text-sm">{message}</p>
                    <p className="text-muted-foreground text-xs mt-1">Your exclusive discount is on its way. We look forward to working with you.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                        className="w-full bg-foreground/5 border border-border focus:border-brand-400 outline-none rounded-xl pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 transition-colors"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 dark:text-red-400 text-xs px-1">{message}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-500 text-white font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Claim Your Discount"
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={dismiss}
                      className="w-full text-center text-foreground/30 hover:text-foreground/60 text-xs transition-colors pt-2"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
