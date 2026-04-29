"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, MessageSquare, Camera, Video,
  Settings, Menu, X, ExternalLink,
  Bell, LogOut, Aperture,
  HelpCircle, Image, Grid, BookOpen, ShoppingBag, FileImage
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, badge: 3 },
  { href: "/admin/portfolios", label: "Portfolios", icon: Camera },
  { href: "/admin/media", label: "Media", icon: FileImage },
  { href: "/admin/videos", label: "Videos", icon: Video },
  // { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/store", label: "Store", icon: ShoppingBag },
  // { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/visual-marketing", label: "Visual Mktg", icon: Image },
  { href: "/admin/more-services", label: "Services", icon: Grid },
  { href: "/admin/our-story", label: "Our Story", icon: BookOpen },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type SidebarProps = {
  pathname: string | null;
  onLinkClick: () => void;
};

function SidebarContent({ pathname, onLinkClick }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 bg-brand-400 flex items-center justify-center shrink-0">
          <Aperture size={18} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-sm uppercase tracking-widest leading-tight">Visual Studio</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 mb-3">Main Menu</div>
        {navLinks.map(link => {
          const isActive = link.href === "/admin"
            ? pathname === "/admin"
            : pathname?.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-md transition-all relative ${
                isActive
                  ? "bg-brand-400 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              <span className="tracking-wide">{link.label}</span>
              {link.badge && !isActive && (
                <span className="ml-auto bg-brand-400 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 pb-1">
          <div className="h-px bg-border" />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-all"
        >
          <ExternalLink size={16} />
          <span className="tracking-wide">Back to Website</span>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            VS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold uppercase tracking-widest truncate">Admin</div>
            <div className="text-[10px] text-muted-foreground truncate">lens@visualstudioslens.com</div>
          </div>
          <LogOut size={14} className="text-muted-foreground shrink-0" />
        </div>
      </div>
    </div>
  );
}

type Notification = {
  id: number;
  type: "inquiry" | "booking" | "store" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: 1, type: "inquiry", title: "New Inquiry", message: "David & Emily sent a wedding coverage inquiry.", time: "2 min ago", read: false },
  { id: 2, type: "booking", title: "Booking Confirmed", message: "Sophia R. booked the Luxury Dream package.", time: "1 hr ago", read: false },
  { id: 3, type: "inquiry", title: "New Inquiry", message: "The Grand Hotel asked about corporate event coverage.", time: "3 hr ago", read: false },
  { id: 4, type: "store", title: "Store Query", message: "Adam Smith submitted a custom album request.", time: "Yesterday", read: true },
  { id: 5, type: "system", title: "System", message: "Your Pixieset gallery link was updated successfully.", time: "Yesterday", read: true },
];

const notifIconColor: Record<Notification["type"], string> = {
  inquiry: "bg-brand-400/15 text-brand-400",
  booking: "bg-blue-500/15 text-blue-500",
  store: "bg-purple-500/15 text-purple-500",
  system: "bg-muted text-muted-foreground",
};

const notifDot: Record<Notification["type"], string> = {
  inquiry: "bg-brand-400",
  booking: "bg-blue-500",
  store: "bg-purple-500",
  system: "bg-muted-foreground",
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentPage = navLinks.find(l =>
    l.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(l.href)
  )?.label ?? "Dashboard";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border py-3 px-4 md:px-6 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="p-2 md:hidden hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Admin</span>
            <span className="text-xs text-muted-foreground mx-2">/</span>
            <span className="text-xs font-bold uppercase tracking-widest">{currentPage}</span>
          </div>
          <div className="font-bold uppercase tracking-widest text-sm md:hidden">VS Admin</div>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(prev => !prev)}
              className="p-2 hover:bg-muted rounded-md transition-colors relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-400 rounded-full flex items-center justify-center text-white text-[9px] font-bold leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-background border border-border shadow-xl rounded-md overflow-hidden z-50"
                >
                  {/* Panel Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold uppercase tracking-widest">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="bg-brand-400 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[10px] font-bold uppercase tracking-widest text-brand-400 hover:text-brand-500 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-border">
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center text-muted-foreground">
                        <Bell size={24} className="mx-auto mb-2 opacity-30" />
                        <p className="text-xs font-medium">No notifications</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markRead(n.id)}
                          className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors group ${!n.read ? "bg-brand-400/5" : ""}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${notifIconColor[n.type]}`}>
                            <span className={`w-2 h-2 rounded-full ${notifDot[n.type]}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold uppercase tracking-widest">{n.title}</span>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                            className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all rounded shrink-0"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Panel Footer */}
                  <div className="px-4 py-2.5 border-t border-border">
                    <button
                      onClick={() => setNotifications([])}
                      className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            VS
          </div>
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
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border p-5 z-40 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent pathname={pathname} onLinkClick={() => setIsMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-background border-r border-border p-5 hidden md:flex flex-col shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <SidebarContent pathname={pathname} onLinkClick={() => {}} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
