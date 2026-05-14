"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageTabs } from "./PackageTabs";
import { PackageEstimator } from "./PackageEstimator";

const TABS = [
  { id: "packages", label: "Our Packages" },
  { id: "builder", label: "Package Builder" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PackagePageTabs() {
  const [active, setActive] = useState<TabId>("packages");
  const [showBuilderTip, setShowBuilderTip] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowBuilderTip(false), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex justify-center py-10">
        <div className="inline-flex rounded-full border border-border bg-muted/30 p-1 gap-1">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              className="relative"
            >
              <button
                onClick={() => setActive(tab.id)}
                className={`relative px-7 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                  active === tab.id
                    ? "bg-foreground text-background shadow"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {active === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-foreground"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>

              {/* Popup tooltip for Package Builder */}
              {tab.id === "builder" && (
                <AnimatePresence>
                  {showBuilderTip && (
                    <motion.div
                      key="builder-tip"
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-20 pointer-events-none"
                    >
                      <div className="relative bg-zinc-900 text-white border-zinc-700 dark:bg-white dark:text-zinc-900 dark:border-zinc-200 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap border shadow-md">
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-700 dark:border-b-zinc-200" />
                        Build your package
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {active === "packages" && <PackageTabs />}
          {active === "builder" && <PackageEstimator />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
