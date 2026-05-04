"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { subscribe } from "@/lib/newsletterApi";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await subscribe(email);
      setMessage(res.message);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <footer className="dark bg-background text-foreground pt-24 pb-12 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Top Section: Instagram Embed & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 pb-24 border-b border-foreground/20">
          
          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Stay Inspired</h3>
            <p className="text-foreground/70 mb-8 max-w-md">
              Join our newsletter for the latest stories, special booking rates, and visual marketing insights.
            </p>
            <form className="flex max-w-md group" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="bg-transparent border-b border-foreground/50 flex-1 py-3 px-2 outline-none focus:border-brand-400 transition-colors placeholder:text-foreground/40 disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="border-b border-foreground font-bold tracking-widest uppercase text-sm hover:text-brand-400 hover:border-brand-400 transition-colors disabled:opacity-50 ml-3 whitespace-nowrap"
              >
                {status === "loading" ? "..." : status === "success" ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-xs font-medium ${status === "success" ? "text-brand-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </motion.div>

        </div>

        {/* Bottom Section: Links & Info */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
           <motion.div variants={itemVariants}>
              <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
                <Image 
                  src="/logo.png" 
                  alt="Visual Studio Logo" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-2xl font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  Visual Studio
                </span>
              </Link>
              <p className="text-foreground/60 text-sm max-w-xs">
                 Capturing Moments. Creating Experiences. Your premium partner in visual excellence.
              </p>
           </motion.div>
           
           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Explore</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li><Link href="/portfolio" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Portfolio</Link></li>
                 <li><Link href="/visual-marketing" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Visual Marketing</Link></li>
<li><Link href="/store" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Print Store</Link></li>
              </ul>
           </motion.div>
           
           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Contact</h4>
              <ul className="space-y-4 text-foreground/70">
                 <li>
                   <a href="https://www.google.com/maps/place/Visual+Studios+%26+Events+%7C+Photography+%7C+Videography/@40.678613,-73.868806,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25d96f51665f1:0x244b25616269adcb!8m2!3d40.678613!4d-73.868806!16s%2Fg%2F11t_prw046" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors group cursor-pointer">
                     <MapPin size={18} className="shrink-0 mt-1 group-hover:text-brand-400 transition-colors" />
                     <span>1097 Liberty Avenue, Brooklyn, NY 11208</span>
                   </a>
                 </li>
                 <li>
                   <a href="mailto:lens@visualstudioslens.com" className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer">
                     <Mail size={18} className="group-hover:text-brand-400 transition-colors" /> lens@visualstudioslens.com
                   </a>
                 </li>
                 <li>
                   <a href="tel:+13473066637" className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer">
                     <Phone size={18} className="group-hover:text-brand-400 transition-colors" /> +1 (347) 306-6637
                   </a>
                 </li>
              </ul>
           </motion.div>

           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Resources</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li className="flex items-center gap-2 font-medium opacity-40 cursor-not-allowed"><ArrowUpRight size={14} className="text-brand-400"/> Download Pricing PDF <span className="text-[9px] uppercase tracking-widest border border-current px-1.5 py-0.5">Soon</span></li>
                 <li><Link href="/faq" className="hover:text-white transition-colors flex items-center gap-2 font-medium hover:translate-x-2 transform duration-300"><ArrowUpRight size={14} className="text-brand-400"/> FAQ & Booking Guide</Link></li>
              </ul>
           </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-foreground/50">
           <p>© {new Date().getFullYear()} Visual Studio. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}

