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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase relative z-50 text-foreground">
          Visual Studio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-foreground ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 relative z-50">
          <ThemeToggle />
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden relative z-50">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
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
                className={`text-2xl tracking-widest uppercase transition-colors hover:text-foreground/80 ${
                   pathname === link.href ? "text-foreground font-bold" : "text-foreground/70"
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
