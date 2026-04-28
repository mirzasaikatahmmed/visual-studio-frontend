"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const timer = setTimeout(() => setShowSuggestion(true), 500);
    const hideTimer = setTimeout(() => setShowSuggestion(false), 5500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const isLight = mounted && theme === "light";

  return (
    <div
      className="relative inline-flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
          setShowSuggestion(false);
          setIsHovered(false);
        }}
        className={`rounded-full transition-all duration-300 ${
          isLight
            ? "text-yellow-500 hover:bg-yellow-400/10"
            : "text-foreground hover:bg-foreground/10 hover:text-foreground/80"
        } ${className || ""}`}
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <AnimatePresence>
        {(showSuggestion || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-2 w-max z-50 flex flex-col items-center pointer-events-none"
          >
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-gray-800 dark:border-b-gray-200" />
            <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-[10px] sm:text-xs font-medium px-2 py-1 rounded shadow-md tracking-wide">
              {theme === "dark" ? "Try Light Mode" : "Try Dark Mode"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
