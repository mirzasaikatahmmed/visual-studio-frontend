"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1], // Ultra-smooth horizontal slide-in
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
