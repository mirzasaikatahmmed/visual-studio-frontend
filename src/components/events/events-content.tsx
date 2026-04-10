"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Star, MoveRight } from "lucide-react";

const packages = [
  {
    name: "Classic Elegance",
    price: "$499",
    features: ["Floral Archway Setup", "Aisle Decorations", "Premium Lighting", "2 Hours Consultation"],
    popular: false,
  },
  {
    name: "Luxury Dream",
    price: "$999",
    features: ["Full Venue Styling", "Custom Centerpieces", "Stage Setup", "Chandeliers & Draping", "Dedicated Coordinator"],
    popular: true,
  },
  {
    name: "Custom Grandeur",
    price: "Custom Quote",
    features: ["End-to-end Conceptualization", "Bespoke Installations", "Luxury Floral Arrangements", "Site Transformation", "Rehearsal Dinner Decor"],
    popular: false,
  }
];

export function EventsContent() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <>
      <motion.div 
        className="flex justify-center mt-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link 
          href="/contact" 
          className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-all uppercase tracking-widest text-sm inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          Book Consultation <MoveRight size={18} />
        </Link>
      </motion.div>

      {/* Before / After Transformation */}
      <section className="py-20 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">The Transformation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From an empty warehouse to a luxurious reception.</p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="relative aspect-[4/3] bg-muted overflow-hidden group rounded-2xl border border-white/5">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop')" }} />
               <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 text-sm font-bold uppercase tracking-widest border border-white/10 rounded-full">Before Setup</div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative aspect-[4/3] bg-muted overflow-hidden group rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(217,70,239,0.1)] hover:shadow-[0_0_60px_rgba(217,70,239,0.2)] transition-shadow">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')" }} />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black px-4 py-2 text-sm font-bold uppercase tracking-widest border border-black/10 rounded-full">After Dreams Decor</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mood Boards */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Inspiration Boards
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
             <motion.div variants={itemVariants} className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-[1s] rounded-2xl overflow-hidden cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop')" }}>
               <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider transform translate-y-4 hover:translate-y-0 transition-transform duration-500">Aesthetic Rustic</h3>
               </div>
             </motion.div>
             <motion.div variants={itemVariants} className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-[1s] rounded-2xl overflow-hidden cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop')" }}>
                <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider transform translate-y-4 hover:translate-y-0 transition-transform duration-500">Modern Minimal</h3>
               </div>
             </motion.div>
             <motion.div variants={itemVariants} className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-[1s] rounded-2xl overflow-hidden cursor-pointer" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop')" }}>
                <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider transform translate-y-4 hover:translate-y-0 transition-transform duration-500">Grand Opulence</h3>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Packaging / Pricing */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
           <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
           >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Investment Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Transparent pricing starting at $499.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className={`p-8 border rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-2 ${pkg.popular ? "border-fuchsia-500/50 shadow-[0_0_40px_rgba(217,70,239,0.15)] bg-background relative" : "border-border bg-transparent"}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{pkg.price}</div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className={pkg.popular ? "text-fuchsia-400 shrink-0 mt-0.5" : "text-muted-foreground shrink-0 mt-0.5"} />
                      <span className={pkg.popular ? "text-foreground" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className={`w-full py-4 text-center font-bold rounded-full uppercase tracking-widest text-sm transition-all ${
                    pkg.popular ? "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]" : "bg-transparent border border-border hover:bg-muted hover:scale-105"
                  }`}
                >
                  Inquire Now
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-black to-indigo-900/20" />
         <motion.div 
            className="container relative z-10 mx-auto px-4 max-w-4xl"
            variants={scaleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
         >
            <div className="flex justify-center gap-1 mb-8 text-fuchsia-400">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <h4 className="text-2xl md:text-4xl font-medium leading-relaxed mb-8 text-white">
              "Dreams Decor completely blew us away. They took our vague ideas and Pinterest boards and created a venue that looked like it was out of a magazine. Absolutely stunning work!"
            </h4>
            <div className="uppercase tracking-widest font-bold text-white/50">— Sarah & Michael</div>
         </motion.div>
      </section>
    </>
  );
}
