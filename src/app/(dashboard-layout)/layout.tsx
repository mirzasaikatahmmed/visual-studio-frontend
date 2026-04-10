"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/inquiries", label: "Inquiries" },
    { href: "/admin/portfolios", label: "Portfolios" },
    { href: "/admin/videos", label: "Videos" },
    { href: "/admin/events", label: "Events & Decor" },
    { href: "/admin/store", label: "Print Store" },
    { href: "/admin/testimonials", label: "Testimonials" },
    { href: "/admin/settings", label: "Settings" }
  ];

  const renderNavLinks = () => (
    <nav className="space-y-2">
      {links.map(link => {
        const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
        return (
          <Link 
            key={link.href}
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-4 py-3 font-bold text-sm uppercase tracking-widest rounded-md transition-colors border ${
              isActive 
                ? "bg-foreground text-background border-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted border-transparent hover:border-border"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <div className="pt-8 block">
        <Link href="/" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-medium text-sm transition-colors rounded-md border border-transparent hover:border-border">Back to Website</Link>
      </div>
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border py-4 px-4 md:px-8 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 md:hidden hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="font-bold uppercase tracking-widest text-lg">VS Admin</div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="w-8 h-8 bg-foreground rounded-full"></div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border p-6 z-40 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold uppercase tracking-widest text-lg">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {renderNavLinks()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-background border-r border-border p-6 hidden md:block shrink-0 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          {renderNavLinks()}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;