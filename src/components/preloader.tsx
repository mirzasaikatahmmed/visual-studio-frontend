"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
            {/* Custom Logo */}
            <Image
              src="/logo.png"
              alt="Visual Studios & Events Logo"
              width={96}
              height={96}
              priority
              className="w-20 h-20 md:w-24 md:h-24 object-contain invert dark:invert-0 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            />
            <p className="text-xs font-bold tracking-[0.4em] uppercase">
              Visual Studios & Events
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
