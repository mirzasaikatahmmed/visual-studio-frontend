"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { createInquiry } from "@/lib/inquiriesApi";

const INQUIRY_TYPES = [
  "Brand Photography",
  "Event Decoration Setup",
  "Portrait Session",
  "Wedding Coverage",
  "Other / General",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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

export function ContactContent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await createInquiry({
        name: `${firstName} ${lastName}`.trim(),
        email,
        type: inquiryType,
        message,
        eventDate: eventDate || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                        <p className="text-muted-foreground">+1 (347) 306-6637</p>
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
                      href="https://wa.me/13473066637"
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

                 {submitted ? (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex flex-col items-center justify-center h-full text-center py-16 relative z-10"
                   >
                     <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                       <CheckCircle2 size={32} className="text-green-500" />
                     </div>
                     <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Inquiry Sent!</h3>
                     <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                       Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                     </p>
                     <button
                       onClick={() => { setSubmitted(false); setFirstName(""); setLastName(""); setEmail(""); setEventDate(""); setMessage(""); setInquiryType(INQUIRY_TYPES[0]); }}
                       className="mt-8 text-sm text-brand-400 hover:text-brand-500 font-bold uppercase tracking-widest"
                     >
                       Send Another Inquiry
                     </button>
                   </motion.div>
                 ) : (
                   <>
                     <motion.h2 variants={rightItemVariants} className="text-3xl font-bold uppercase tracking-tight mb-10">Send an Inquiry</motion.h2>
                     <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div variants={rightItemVariants} className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                             <input
                               type="text"
                               className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               required
                             />
                          </motion.div>
                          <motion.div variants={rightItemVariants} className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                             <input
                               type="text"
                               className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               required
                             />
                          </motion.div>
                        </div>

                        <motion.div variants={rightItemVariants} className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                           <input
                             type="email"
                             className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             required
                           />
                        </motion.div>

                        <motion.div variants={rightItemVariants} className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Inquiry Type</label>
                           <select
                             className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl appearance-none cursor-pointer"
                             value={inquiryType}
                             onChange={(e) => setInquiryType(e.target.value)}
                           >
                             {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                           </select>
                        </motion.div>

                        <motion.div variants={rightItemVariants} className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Event Date <span className="font-normal normal-case tracking-normal text-muted-foreground/60">(optional)</span></label>
                           <input
                             type="date"
                             className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl"
                             value={eventDate}
                             onChange={(e) => setEventDate(e.target.value)}
                           />
                        </motion.div>

                        <motion.div variants={rightItemVariants} className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message Details</label>
                           <textarea
                             rows={5}
                             className="w-full bg-muted/50 border border-border px-5 py-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all rounded-xl resize-none"
                             placeholder="Tell us about your date, location, and vision..."
                             value={message}
                             onChange={(e) => setMessage(e.target.value)}
                             required
                           />
                        </motion.div>

                        {submitError && (
                          <p className="text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl">{submitError}</p>
                        )}

                        <motion.button
                          variants={rightItemVariants}
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-foreground text-background font-bold py-5 uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all rounded-full mt-4 disabled:opacity-60 disabled:scale-100"
                        >
                          {submitting ? "Sending..." : "Submit Inquiry"}
                        </motion.button>
                     </form>
                   </>
                 )}
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
         <iframe
           src="https://maps.google.com/maps?q=40.678613,-73.868806&t=&z=17&ie=UTF8&iwloc=&output=embed"
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
