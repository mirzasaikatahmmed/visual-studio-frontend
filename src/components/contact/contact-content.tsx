"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export function ContactContent() {
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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };
  
  const rightItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const mapVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <>
      <section className="pb-24 overflow-hidden pt-12">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Info & Direct Connect */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-10">Direct Contact</motion.h2>
                
                <div className="space-y-8 mb-12">
                   <motion.div variants={itemVariants} className="flex gap-4 group">
                      <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                        <Phone size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-brand-400 transition-colors">Call Us</h4>
                        <p className="text-muted-foreground">+1 (929) 627-5537</p>
                        <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wider">Mon-Fri, 9am - 6pm EST</p>
                      </div>
                   </motion.div>
                   
                   <motion.div variants={itemVariants} className="flex gap-4 group">
                      <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                        <Mail size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-brand-400 transition-colors">Email Inquiry</h4>
                        <p className="text-muted-foreground">lens@visualstudioslens.com</p>
                      </div>
                   </motion.div>

                   <motion.div variants={itemVariants} className="flex gap-4 group">
                      <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                        <MapPin size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-brand-400 transition-colors">Studio Location</h4>
                        <p className="text-muted-foreground">Liberty Avenue Brooklyn, 1097<br/>New York, NY 11208</p>
                      </div>
                   </motion.div>
                </div>

                {/* Cards */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                  {/* WhatsApp Button */}
                  <div className="p-10 border border-border bg-muted/30 rounded-3xl relative overflow-hidden group hover:border-[#25D366]/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl group-hover:bg-[#25D366]/20 transition-colors" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Fastest Response</h3>
                    <p className="text-muted-foreground mb-8 text-lg relative z-10">Text our team directly on WhatsApp for quick answers and simple bookings.</p>
                    <a
                      href="https://wa.me/19296275537"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white font-bold uppercase tracking-widest hover:bg-[#20bd5a] hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all rounded-full relative z-10"
                    >
                      <MessageCircle size={24} /> Message on WhatsApp
                    </a>
                  </div>

                  {/* Calendly Appointment */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="p-10 border border-border bg-muted/30 rounded-3xl relative overflow-hidden group hover:border-foreground/30 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.05)]"
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-foreground/5 rounded-full blur-3xl group-hover:bg-foreground/10 transition-colors" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Make an Appointment</h3>
                    <p className="text-muted-foreground mb-8 text-lg relative z-10">Book a free 15-minute consultation to discuss your vision and requirements.</p>
                    <a
                      href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-foreground text-background font-bold uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all rounded-full relative z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      Book a Consultation
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Inquiry Form */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-background p-8 md:p-12 border border-border shadow-[0_0_40px_rgba(0,0,0,0.05)] rounded-3xl relative"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] pointer-events-none rounded-full" />
                 <motion.h2 variants={rightItemVariants} className="text-3xl font-bold uppercase tracking-tight mb-10">Send an Inquiry</motion.h2>
                 <form className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={rightItemVariants} className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                         <input type="text" className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl" required />
                      </motion.div>
                      <motion.div variants={rightItemVariants} className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                         <input type="text" className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl" required />
                      </motion.div>
                    </div>
                    
                    <motion.div variants={rightItemVariants} className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                       <input type="email" className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl" required />
                    </motion.div>

                    <motion.div variants={rightItemVariants} className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Inquiry Type</label>
                       <select className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl appearance-none cursor-pointer">
                          <option>Brand Photography</option>
                          <option>Event Decoration Setup</option>
                          <option>Portrait Session</option>
                          <option>Wedding Coverage</option>
                          <option>Other / General</option>
                       </select>
                    </motion.div>

                    <motion.div variants={rightItemVariants} className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message Details</label>
                       <textarea rows={5} className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl resize-none" placeholder="Tell us about your date, location, and vision..." required></textarea>
                    </motion.div>

                    <motion.button 
                      variants={rightItemVariants}
                      type="submit" 
                      className="w-full bg-foreground text-background font-bold py-5 uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all rounded-full mt-4"
                    >
                      Submit Inquiry
                    </motion.button>
                 </form>
              </motion.div>

           </div>
        </div>
      </section>

      {/* Google Map Section */}
       <motion.section 
        className="h-[500px] bg-muted w-full relative grayscale hover:grayscale-0 transition-all duration-[2s] border-t border-border"
        variants={mapVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
       >
         {/* Simple Map Placeholder */}
         <iframe 
           src="https://maps.google.com/maps?q=1097+Liberty+Ave,+Brooklyn,+NY+11208&t=&z=15&ie=UTF8&iwloc=&output=embed" 
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen={false} 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         />
       </motion.section>
    </>
  );
}

