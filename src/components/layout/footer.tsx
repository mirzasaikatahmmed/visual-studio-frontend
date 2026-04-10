import Link from "next/link";
import { Instagram, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Instagram Embed & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 pb-24 border-b border-foreground/20">
          
          {/* Newsletter */}
          <div>
            <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Stay Inspired</h3>
            <p className="text-foreground/70 mb-8 max-w-md">
              Join our newsletter for the latest stories, special booking rates, and visual marketing insights.
            </p>
            <form className="flex max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-foreground/50 flex-1 py-3 px-2 outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
                required
              />
              <button type="submit" className="border-b border-foreground font-bold tracking-widest uppercase text-sm hover:text-foreground/80 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Instagram Teaser / Poster */}
          <div>
             <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
               <Instagram size={28} /> @visualstudio
             </h3>
             <div className="grid grid-cols-3 gap-2 mt-8">
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400')" }} />
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400')" }} />
                <div className="aspect-square bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400')" }} />
             </div>
             <a href="#" className="inline-flex items-center gap-2 mt-6 font-bold tracking-widest uppercase text-sm border-b border-foreground pb-1 hover:text-foreground/80">
               Follow on Instagram <ArrowUpRight size={16} />
             </a>
          </div>

        </div>

        {/* Bottom Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
           <div>
              <Link href="/" className="text-2xl font-bold tracking-tighter uppercase mb-6 inline-block">Visual Studio</Link>
              <p className="text-foreground/60 text-sm max-w-xs">
                 Capturing Moments. Creating Experiences. Your premium partner in visual excellence.
              </p>
           </div>
           
           <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Explore</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li><Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
                 <li><Link href="/visual-marketing" className="hover:text-foreground transition-colors">Visual Marketing</Link></li>
                 <li><Link href="/events" className="hover:text-foreground transition-colors">Events & Decor</Link></li>
                 <li><Link href="/store" className="hover:text-foreground transition-colors">Print Store</Link></li>
              </ul>
           </div>
           
           <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
              <ul className="space-y-4 text-foreground/70">
                 <li className="flex items-start gap-3">
                   <MapPin size={18} className="shrink-0 mt-1" />
                   <span>123 Creative Avenue, Suite 100<br/>New York, NY 10001</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <Mail size={18} /> hello@visualstudio.com
                 </li>
                 <li className="flex items-center gap-3">
                   <Phone size={18} /> +1 (555) 123-4567
                 </li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Resources</h4>
              <ul className="space-y-3 text-foreground/70">
                 <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-2 font-medium"><ArrowUpRight size={14}/> Client Portal</a></li>
                 <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-2 font-medium"><ArrowUpRight size={14}/> Download Pricing PDF</a></li>
                 <li><Link href="/faq" className="hover:text-foreground transition-colors flex items-center gap-2 font-medium"><ArrowUpRight size={14}/> FAQ & Booking Guide</Link></li>
              </ul>
           </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-foreground/50">
           <p>© {new Date().getFullYear()} Visual Studio. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
           </div>
        </div>

      </div>
    </footer>
  );
}
