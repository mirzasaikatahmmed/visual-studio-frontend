"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

const storeCategories = [
  { 
    id: 1,
    name: "Albums & Books", 
    image: "/images/album.png" 
  },
  { 
    id: 2,
    name: "Wall Art", 
    image: "/images/wall-art.png" 
  },
  { 
    id: 3,
    name: "Print Sets", 
    image: "/images/print-sets.png" 
  },
  { 
    id: 4,
    name: "Album Sets", 
    image: "/images/album-sets.png" 
  },
  { 
    id: 5,
    name: "Photo Prints", 
    image: "/images/photo-prints.png" 
  },
];

export default function StorePage() {
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const handleInquire = (itemName: string) => {
    // You can replace this phone number with the actual WhatsApp number of the admin/client
    const phoneNumber = "1234567890"; 
    const message = encodeURIComponent(`Hi, I'm interested in inquiring about ${itemName} from your store.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-background min-h-screen pb-24 selection:bg-brand-500/30">
      
      {/* Hero Section */}
      <HeroSection 
        subtitle="The Print Shop"
        title={<>Preserve Your <br/> <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Legacy</span></>}
        desc="Transform your digital memories into physical heirlooms. Explore our premium collection of albums, wall art, and prints crafted for a lifetime."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pt-12 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {storeCategories.map((category, idx) => (
            <motion.div 
              key={category.id} 
              variants={itemVariants} 
              onClick={() => handleInquire(category.name)}
              className={`group relative block aspect-[4/5] lg:aspect-square cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-muted col-span-1 md:col-span-1 ${idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" 
                style={{ backgroundImage: `url('${category.image}')` }} 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                
                <div className="transform transition-all duration-500 group-hover:-translate-y-6">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] px-4">
                    {category.name}
                  </h3>
                </div>
                
                {/* Hover Icon / Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 text-black font-bold uppercase tracking-widest text-xs bg-white backdrop-blur-md px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  Inquire Now <MessageCircle size={16} />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
    </div>
  );
}
