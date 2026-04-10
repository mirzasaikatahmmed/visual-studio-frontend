"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Video Gallery", href: "/video-gallery" },
  { name: "Visual Marketing", href: "/visual-marketing" },
  { name: "Events & Decor", href: "/events" },
  { name: "Store", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 pt-4 px-4 md:pt-6">
      <div
        className={`container max-w-[95%] xl:max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 rounded-full relative z-50 transition-all duration-500 
          bg-[#18181A]/80 backdrop-blur-[40px]
          shadow-[inset_2px_2px_4px_-1px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_-1px_rgba(255,255,255,0.15),0_15px_30px_rgba(0,0,0,0.6)]
          ${isScrolled ? "py-3" : "py-5"}
        `}
      >
        <Link href="/" className="text-xl md:text-2xl font-extrabold tracking-tighter uppercase relative z-50 text-white">
          Visual Studio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0 xl:gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center justify-center px-2 py-4 transition-colors ${isActive ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
              >
                <span className="text-xs font-bold tracking-wider uppercase">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-1 left-[15%] right-[15%] h-[3px] bg-fuchsia-300 rounded-full"
                    style={{ boxShadow: "0 -4px 20px 8px rgba(232, 121, 249, 0.45)" }}
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
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-opacity"
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
            className="fixed inset-0 min-h-screen bg-background z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl tracking-widest uppercase transition-colors hover:text-foreground/80 ${pathname === link.href ? "text-foreground font-bold" : "text-foreground/70"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-foreground text-background text-lg font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
