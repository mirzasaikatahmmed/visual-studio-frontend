"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Video Gallery", href: "/video-gallery" },
  { name: "Visual Marketing", href: "/visual-marketing" },
  { name: "More Services", href: "/more-services" },
  { name: "Store", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const isHidden = isScrolled && isScrolling && !isMenuOpen;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 pt-2 px-2 md:pt-6 md:px-4 ${
        isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className={`group container max-w-[95%] xl:max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 lg:px-10 rounded-full md:rounded-[2rem] relative z-50 transition-all duration-500 
          backdrop-blur-md border border-white/20
          bg-zinc-950/80
          shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
          ${isScrolled ? "py-2 md:py-3" : "py-3 md:py-5"}
        `}
      >
        {/* Background animation wrapper */}
        <div className="absolute inset-0 overflow-hidden rounded-full md:rounded-[2rem] pointer-events-none z-[-1]">
          {/* shine sweep */}
          <span
            className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-1000 ease-in-out"
            style={{
              background: "linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.35) 50%, transparent 75%)",
            }}
          />
          {/* glass tint brighten on hover */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
        </div>

        <Link href="/" className="flex items-center gap-2 md:gap-3 relative z-50 text-white">
          <Image 
            src="/logo.png" 
            alt="Visual Studio Logo" 
            width={40} 
            height={40} 
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <span className="hidden md:block text-xl md:text-2xl font-extrabold tracking-tighter uppercase">
            Visual Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0 xl:gap-1 relative z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center justify-center px-2 py-4 transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
              >
                <span className="text-xs font-bold tracking-wider uppercase">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-1 left-[15%] right-[15%] h-[3px] bg-brand-400 rounded-full"
                    style={{ boxShadow: "0 -4px 20px 8px rgba(221, 148, 84, 0.45)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 relative z-50">
          <ThemeToggle className="!text-white hover:!bg-white/10 hover:!text-white/80" />
          <Link
            href="/contact"
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-80 transition-opacity"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden relative z-50">
          <ThemeToggle className="!text-white hover:!bg-white/10 hover:!text-white/80" />
          <button
            className="p-2 text-white hover:text-white/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 min-h-screen bg-zinc-950 z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl tracking-widest uppercase transition-colors hover:text-white/80 ${pathname === link.href ? "text-white font-bold" : "text-white/70"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-white text-black text-lg font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

