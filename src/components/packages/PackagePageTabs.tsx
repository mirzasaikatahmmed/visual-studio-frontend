"use client";

import { useState } from "react";
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

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex justify-center py-10">
        <div className="inline-flex rounded-full border border-border bg-muted/30 p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
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
