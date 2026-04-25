"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const hide = () => {
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 1000);
      }, 800);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground"
        >
          <motion.div
            animate={
              exiting
                ? { scale: 1.4, opacity: 0 }
                : {
                    scale: [1.1, 0.75, 1.1],
                    opacity: [1, 0.5, 1],
                  }
            }
            transition={
              exiting
                ? { duration: 0.6, ease: "easeIn" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="flex flex-col items-center gap-3 select-none"
          >
            {/* Camera lens icon — uses currentColor to follow theme */}
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <circle cx="36" cy="36" r="34" stroke="currentColor" strokeWidth="2" />
              <circle cx="36" cy="36" r="22" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="36" cy="36" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="36" cy="36" r="4" fill="currentColor" />
              <line x1="36" y1="2" x2="36" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="36" y1="58" x2="36" y2="70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="36" x2="14" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="58" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-bold tracking-[0.4em] uppercase">
              Visual Studio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
