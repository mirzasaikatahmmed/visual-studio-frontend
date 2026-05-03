'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 blur-[2px]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-zinc-950" />

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/" className="inline-block">
            <Image 
              src="/logo.png" 
              alt="Visual Studio Logo" 
              width={80} 
              height={80} 
              className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl grayscale"
            />
          </Link>
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group cursor-default mb-6"
        >
           <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Unexpected Cut
           </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-xl text-gray-300 max-w-2xl mb-10 font-medium px-4 tracking-wide"
        >
          Something went wrong behind the scenes. We&apos;re working on fixing the reel.
        </motion.p>

        {/* Cinematic Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(255,255,255,0.18), 0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-sm overflow-hidden inline-block"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out z-0"
              style={{
                background: "linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.35) 50%, transparent 75%)",
              }}
            />
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <div className="relative z-10 px-8 py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs text-white">
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Try Again</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
