import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact & Booking | Visual Studio",
  description: "Get in touch to book a session or request a quote.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      
      {/* Header */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Get In Touch</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Whether you're ready to book a session, need a custom quote, or just have a few questions, our team is here to help.
        </p>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Info & Direct Connect */}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Direct Contact</h2>
                
                <div className="space-y-8 mb-12">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Call Us</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-foreground/50 mt-1">Mon-Fri, 9am - 6pm EST</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email Inquiry</h4>
                        <p className="text-muted-foreground">booking@visualstudio.com</p>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Studio Location</h4>
                        <p className="text-muted-foreground">123 Creative Avenue, Suite 100<br/>New York, NY 10001</p>
                      </div>
                   </div>
                </div>

                {/* WhatsApp Button */}
                <div className="p-8 border border-border bg-background">
                  <h3 className="text-xl font-bold mb-4">Fastest Response</h3>
                  <p className="text-muted-foreground mb-6">Text our team directly on WhatsApp for quick answers and simple bookings.</p>
                  <a 
                    href="https://wa.me/15551234567" 
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle size={24} /> Message on WhatsApp
                  </a>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-muted/30 p-8 md:p-10 border border-border">
                 <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Send an Inquiry</h2>
                 <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                         <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                         <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                       <input type="email" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" required />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Inquiry Type</label>
                       <select className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-foreground transition-colors appearance-none">
                          <option>Brand Photography</option>
                          <option>Event Decoration Setup</option>
                          <option>Portrait Session</option>
                          <option>Wedding Coverage</option>
                          <option>Other / General</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message Details</label>
                       <textarea rows={5} className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-foreground transition-colors resize-none" placeholder="Tell us about your date, location, and vision..." required></textarea>
                    </div>

                    <button type="submit" className="w-full bg-foreground text-background font-bold py-4 uppercase tracking-widest hover:opacity-90 transition-opacity">
                      Submit Inquiry
                    </button>
                 </form>
              </div>

           </div>
        </div>
      </section>

      {/* Google Map Section */}
       <section className="h-[400px] bg-muted w-full relative grayscale hover:grayscale-0 transition-all duration-1000">
         {/* Simple Map Placeholder */}
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280004554!2d-74.14448744594274!3d40.69763123335559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen={false} 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         />
       </section>

    </div>
  );
}
