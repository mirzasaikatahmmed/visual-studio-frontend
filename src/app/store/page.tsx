"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, HelpCircle } from "lucide-react";

const albumPackages = [
  { name: "Silver Album", size: "8x8 or 10x10", desc: "Fine Art Paper, 20 Pages, Linen Cover", price: "$299" },
  { name: "Gold Album", size: "10x10 or 12x12", desc: "Archival Quality, 40 Pages, Leather Cover, Premium Debossing", price: "$599" },
  { name: "Premium Heirloom", size: "12x12 or 11x14", desc: "Museum Quality, 60 Pages, Crystal/Wood Cover, Custom Box", price: "$999" },
];

export default function StorePage() {
  const [queryStep, setQueryStep] = useState(1);

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <div className="inline-flex justify-center mb-6 text-muted-foreground">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Print Store</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Turn your digital memories into physical heirlooms. Premium photo albums, wall art, and framed prints.
        </p>
      </section>

      {/* Album Packages */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">Preset Album Packages</h2>
            <div className="w-16 h-1 bg-foreground mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albumPackages.map((pkg, idx) => (
              <div key={idx} className="group relative bg-background border border-border p-8 hover:border-foreground transition-colors cursor-pointer">
                <div className="aspect-square bg-muted mb-6 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544377193-33dce4ea9a78?q=80&w=800&auto=format&fit=crop')` }}
                  />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2">{pkg.name}</h3>
                <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-2">{pkg.size}</p>
                <p className="text-muted-foreground mb-6">{pkg.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-2xl font-bold">{pkg.price}</span>
                   <button className="text-sm font-bold uppercase tracking-widest border-b border-foreground hover:text-muted-foreground transition-colors">Select</button>
                </div>
              </div>
            ))}
          </div>

          {/* Video Placeholder (Album Flipping) */}
          <div className="mt-24 p-8 md:p-16 border border-border bg-background text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">See The Quality (Video)</h3>
            <div className="w-full max-w-3xl aspect-video bg-muted relative flex items-center justify-center cursor-pointer group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
               <div className="bg-white/90 text-black w-20 h-20 rounded-full flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                 <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-black border-b-[12px] border-b-transparent ml-2" />
               </div>
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200')" }} />
            </div>
            <p className="mt-6 text-muted-foreground">Watch a quick walkthrough of our Premium Heirloom Album.</p>
          </div>
        </div>
      </section>

      {/* Album Query Builder */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
              <HelpCircle size={28} /> Custom Album Query
            </h2>
            <p className="text-muted-foreground">Need a specific size or page count? Build your query below.</p>
          </div>

          <div className="bg-muted p-8 md:p-12 border border-border rounded-lg">
            {queryStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold mb-6">Step 1: Album Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['8x8', '10x10', '12x12', '11x14'].map(size => (
                    <button key={size} onClick={() => setQueryStep(2)} className="p-4 border border-border bg-background hover:border-foreground transition-colors uppercase font-bold tracking-widest text-sm">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {queryStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4">
                <h3 className="text-xl font-bold mb-6">Step 2: Number of Pages</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {['20', '30', '40', '50+'].map(pages => (
                     <button key={pages} onClick={() => setQueryStep(3)} className="p-4 border border-border bg-background hover:border-foreground transition-colors uppercase font-bold tracking-widest text-sm">
                      {pages} Pages
                    </button>
                  ))}
                </div>
              </div>
            )}
            {queryStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                <h3 className="text-xl font-bold mb-4">Step 3: Contact Details</h3>
                <input type="text" placeholder="Your Name" className="w-full p-4 bg-background border border-border focus:border-foreground outline-none transition-colors" />
                <input type="email" placeholder="Your Email" className="w-full p-4 bg-background border border-border focus:border-foreground outline-none transition-colors" />
                <button className="w-full p-4 bg-foreground text-background font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Get Estimation
                </button>
                <button onClick={() => setQueryStep(1)} className="w-full text-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wall Art */}
       <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Wall Art & Framed Prints</h2>
            <div className="w-24 h-1 bg-foreground mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">Archival quality prints mounted in premium, gallery-grade frames to adorn your home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Modern Metal Prints</h3>
                    <span className="text-white/80 uppercase text-sm tracking-widest">Starting at $150</span>
                  </div>
                </div>
             </div>
             <div className="aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549891040-af8ff6d519be?q=80&w=800&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Classic Framed Canvas</h3>
                    <span className="text-white/80 uppercase text-sm tracking-widest">Starting at $200</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
       </section>

    </div>
  );
}
