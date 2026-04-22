"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/hero-section";

const storeItems = [
  { 
    id: 1,
    name: "The Signature Album", 
    category: "LAYFLAT ALBUM",
    desc: "Our most premium offering. Handcrafted leather cover, flush-mount thick archival pages, laying perfectly flat for stunning panoramic spreads. A true heirloom piece.", 
    price: "$999", 
    image: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 2,
    name: "Fine Art Photo Book", 
    category: "MATTE PAPER",
    desc: "Elegant and lightweight. Printed on museum-quality matte paper with exquisite color reproduction. Wrapped in a beautiful natural linen cover.", 
    price: "$499", 
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 3,
    name: "Gallery Framed Canvas", 
    category: "WALL ART",
    desc: "Your favorite moment turned into a masterpiece. Premium canvas stretched over a solid wood frame, ready to hang in your living room or bedroom.", 
    price: "$299", 
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" 
  },
];

export default function StorePage() {
  const [selectedItem, setSelectedItem] = useState<typeof storeItems[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; }
  }, [isDrawerOpen]);

  const openCheckout = (item: typeof storeItems[0]) => {
    setSelectedItem(item);
    setIsPurchased(false);
    setIsDrawerOpen(true);
  };

  const closeCheckout = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
      setIsPurchased(false);
    }, 300); // Wait for transition
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchased(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      closeCheckout();
    }, 3000);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      
      {/* Hero Section */}
      <HeroSection 
        subtitle="The Print Shop"
        title={<>Preserve Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Legacy</span></>}
        desc="Transform your digital memories into physical heirlooms. Museum-quality albums and prints crafted for a lifetime."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />

      {/* Main Store Area */}
      <section className="container mx-auto px-4 py-24 max-w-6xl overflow-hidden">
        <div className="flex flex-col gap-32">
          {storeItems.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 overflow-hidden relative aspect-[4/5] md:aspect-square bg-neutral-900 cursor-pointer rounded-2xl shadow-[0_0_40px_rgba(221,148,84,0.05)] hover:shadow-[0_0_60px_rgba(221,148,84,0.15)] transition-shadow" onClick={() => openCheckout(item)}>
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Text Container */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-xs tracking-[0.2em] text-brand-400/80 mb-4 font-bold">{item.category}</p>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">{item.name}</h2>
                <p className="text-white/70 font-light text-lg leading-relaxed mb-10 max-w-md">
                  {item.desc}
                </p>
                
                <div className="flex items-center gap-8">
                  <span className="text-2xl font-light tracking-wide">{item.price}</span>
                  <button 
                    onClick={() => openCheckout(item)}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.2em] font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all rounded-full"
                  >
                    Purchase <ArrowRight size={16} />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Checkout Drawer/Side Panel */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeCheckout}
        />
        
        {/* Slide-in Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 flex flex-col transform transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Checkout</h3>
            <button onClick={closeCheckout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {selectedItem && (
              <>
                {!isPurchased ? (
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     {/* Product Summary */}
                     <div className="flex gap-6 mb-10 pb-10 border-b border-white/10">
                       <div 
                         className="w-24 h-32 bg-cover bg-center shrink-0 border border-white/10 rounded-md" 
                         style={{ backgroundImage: `url('${selectedItem.image}')` }}
                       />
                       <div className="flex flex-col justify-center">
                         <p className="text-[10px] tracking-[0.2em] text-brand-400/80 mb-2">{selectedItem.category}</p>
                         <h4 className="text-lg font-bold uppercase tracking-tight mb-2 leading-tight">{selectedItem.name}</h4>
                         <span className="text-white/80">{selectedItem.price}</span>
                       </div>
                     </div>

                     {/* Form */}
                     <form onSubmit={handlePurchase} className="space-y-6">
                       <h5 className="text-xs uppercase tracking-[0.1em] text-white/50 mb-4">Shipping Information</h5>
                       
                       <div className="space-y-4">
                         <div>
                           <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Full Name</label>
                           <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors" placeholder="John Doe" />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Email Address</label>
                           <input required type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors" placeholder="john@example.com" />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Shipping Details</label>
                           <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors" placeholder="123 Luxury Ave, NY" />
                         </div>
                       </div>

                       <div className="pt-8 mt-8 border-t border-white/10">
                         <div className="flex justify-between items-center mb-8">
                           <span className="text-sm uppercase tracking-wider text-white/50">Total</span>
                           <span className="text-2xl font-light">{selectedItem.price}</span>
                         </div>
                         <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all rounded-full">
                           Complete Order
                         </button>
                       </div>
                     </form>
                   </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500 py-20">
                     <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                       <CheckCircle size={40} className="text-green-500" />
                     </div>
                     <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Order Received</h2>
                     <p className="text-white/50 font-light leading-relaxed max-w-sm">
                       Thank you for investing in your memories. We have sent a confirmation email with your order details.
                     </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}




