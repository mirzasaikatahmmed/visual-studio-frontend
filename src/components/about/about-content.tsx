"use client";

import { motion, Variants } from "framer-motion";
import { Camera, Award } from "lucide-react";

export function AboutContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      {/* Main Content */}
      <section className="container mx-auto px-4 max-w-6xl mb-24 mt-20 overflow-hidden">
         <motion.div 
           className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
         >
            <motion.div variants={itemVariants} className="aspect-[4/5] bg-muted relative overflow-hidden rounded-2xl group shadow-[0_0_40px_rgba(217,70,239,0.1)]">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop')" }} />
               {/* Touch of Desi aesthetic via description of the team and styling */}
               <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-6 border border-white/10 rounded-xl transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">The Creators</h3>
               </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Redefining Visual Arts</h2>
               <p className="text-muted-foreground leading-relaxed text-lg">
                 Visual Studio began with a simple mission: to preserve memories in their truest, most beautiful form. Over the years, we have grown into a multi-disciplinary creative studio spanning luxury weddings, brand marketing, and event design.
               </p>
               <p className="text-muted-foreground leading-relaxed text-lg">
                 Our roots in the South Asian community deeply influence our vibrant, rich, and detailed approach to photography. We know how to capture the grandeur, the emotions, and the intricate details that make these events special.
               </p>
               
               <motion.div 
                className="grid grid-cols-2 gap-8 pt-8 border-t border-border mt-8"
                variants={containerVariants}
               >
                  <motion.div variants={itemVariants} className="group">
                    <Camera size={32} className="mb-4 text-fuchsia-400 group-hover:scale-110 group-hover:text-fuchsia-300 transition-all duration-300" />
                    <h4 className="text-4xl font-bold mb-2">500+</h4>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold group-hover:text-foreground transition-colors">Weddings Captured</p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="group">
                    <Award size={32} className="mb-4 text-fuchsia-400 group-hover:scale-110 group-hover:text-fuchsia-300 transition-all duration-300" />
                    <h4 className="text-4xl font-bold mb-2">10 Yrs</h4>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold group-hover:text-foreground transition-colors">Of Excellence</p>
                  </motion.div>
               </motion.div>
            </motion.div>
         </motion.div>
      </section>

      {/* Philosophy */}
      <section className="bg-black text-white py-32 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-black to-indigo-900/20" />
         <motion.div 
           className="container mx-auto px-4 max-w-4xl relative z-10"
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
         >
           <h2 className="text-3xl font-bold uppercase tracking-widest mb-12 text-fuchsia-400">Our Philosophy</h2>
           <p className="text-2xl md:text-4xl leading-relaxed font-light text-white/90">
             "We don't just use our cameras to take pictures; we use them to see the world completely. Every client, every event, and every brand has a unique soul waiting to be unveiled."
           </p>
         </motion.div>
      </section>
    </>
  );
}
