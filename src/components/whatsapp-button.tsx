"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POINTS = [
  "Want a quick answer?",
  "Need more help?",
  "Looking for clear direction?",
];

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-0">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mb-3 bg-white text-gray-800 rounded-2xl shadow-2xl px-5 py-4 w-56"
          >
            {/* Dismiss */}
            <button
              onClick={() => { setVisible(false); setDismissed(true); }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <p className="text-[11px] font-bold uppercase tracking-widest text-[#25D366] mb-3">
              We&apos;re here for you
            </p>

            <ul className="space-y-2 mb-4">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[13px] text-gray-700">
                  <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5 text-[#25D366] font-bold text-[12px]">
              <span>Click here to chat</span>
              <span className="text-base leading-none">↓</span>
            </div>

            {/* Arrow pointing down to button */}
            <div className="absolute -bottom-[9px] right-7 w-4 h-4 bg-white rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.08)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/13473066637"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setVisible(false)}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Chat with Visual Studios & Events on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}
