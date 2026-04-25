"use client";

import Link from "next/link";
import { Instagram, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
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
            <form className="flex max-w-md group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-foreground/50 flex-1 py-3 px-2 outline-none focus:border-brand-400 transition-colors placeholder:text-foreground/40"
                required
              />
              <button type="submit" className="border-b border-foreground font-bold tracking-widest uppercase text-sm hover:text-brand-400 hover:border-brand-400 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Instagram Teaser / Poster */}
          <motion.div variants={itemVariants}>
             <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
               <Instagram size={28} className="text-brand-400" /> @visualstudio
             </h3>
             <div className="grid grid-cols-3 gap-2 mt-8">
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer hover:scale-105 duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400')" }} />
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer hover:scale-105 duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400')" }} />
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer hover:scale-105 duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400')" }} />
             </div>
             <a href="#" className="inline-flex items-center gap-2 mt-6 font-bold tracking-widest uppercase text-sm border-b border-foreground pb-1 hover:text-brand-400 hover:border-brand-400 transition-colors">
               Follow on Instagram <ArrowUpRight size={16} />
             </a>
          </motion.div>

        </div>

        {/* Bottom Section: Links & Info */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
           <motion.div variants={itemVariants}>
              <Link href="/" className="text-2xl font-bold tracking-tighter uppercase mb-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Visual Studio</Link>
              <p className="text-foreground/60 text-sm max-w-xs">
                 Capturing Moments. Creating Experiences. Your premium partner in visual excellence.
              </p>
           </motion.div>
           
           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Explore</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li><Link href="/portfolio" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Portfolio</Link></li>
                 <li><Link href="/visual-marketing" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Visual Marketing</Link></li>
                 <li><Link href="/events" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Events & Decor</Link></li>
                 <li><Link href="/store" className="hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-300">Print Store</Link></li>
              </ul>
           </motion.div>
           
           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Contact</h4>
              <ul className="space-y-4 text-foreground/70">
                 <li className="flex items-start gap-3 hover:text-white transition-colors group cursor-pointer">
                   <MapPin size={18} className="shrink-0 mt-1 group-hover:text-brand-400 transition-colors" />
                   <span>Liberty Avenue Brooklyn, 1097<br/>New York, NY 11208</span>
                 </li>
                 <li className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer">
                   <Mail size={18} className="group-hover:text-brand-400 transition-colors" /> lens@visualstudioslens.com
                 </li>
                 <li className="flex items-center gap-3 hover:text-white transition-colors group cursor-pointer">
                   <Phone size={18} className="group-hover:text-brand-400 transition-colors" /> +1 (929) 627-5537
                 </li>
              </ul>
           </motion.div>

           <motion.div variants={itemVariants}>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-400">Resources</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 font-medium hover:translate-x-2 transform duration-300"><ArrowUpRight size={14} className="text-brand-400"/> Client Portal</a></li>
                 <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 font-medium hover:translate-x-2 transform duration-300"><ArrowUpRight size={14} className="text-brand-400"/> Download Pricing PDF</a></li>
                 <li><Link href="/faq" className="hover:text-white transition-colors flex items-center gap-2 font-medium hover:translate-x-2 transform duration-300"><ArrowUpRight size={14} className="text-brand-400"/> FAQ & Booking Guide</Link></li>
              </ul>
           </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-foreground/50">
           <p>© {new Date().getFullYear()} Visual Studio. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}

