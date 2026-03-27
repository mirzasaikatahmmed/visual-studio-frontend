import { HeroSection } from "@/components/home/hero-section";
import { Star, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Services Highlight */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">Our Expertise</h2>
            <div className="w-24 h-1 bg-foreground mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden bg-muted mb-6 w-full">
                 <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop')" }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Visual Marketing</h3>
              <p className="text-muted-foreground">Corporate branding, product shoots, and campaign visuals.</p>
            </div>
            
            {/* Service 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden bg-muted mb-6 w-full">
                 <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop')" }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Events Decoration</h3>
              <p className="text-muted-foreground">Transformative event setups powered by Dreams Decor.</p>
            </div>
            
            {/* Service 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden bg-muted mb-6 w-full">
                 <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554048665-8c34fbc46098?q=80&w=800&auto=format&fit=crop')" }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Premium Albums</h3>
              <p className="text-muted-foreground">High-quality physical album printing and modern wall arts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30 border-y border-border">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <div className="flex justify-center gap-1 mb-4 text-yellow-500">
                  <Star fill="currentColor" size={24} />
                  <Star fill="currentColor" size={24} />
                  <Star fill="currentColor" size={24} />
                  <Star fill="currentColor" size={24} />
                  <Star fill="currentColor" size={24} />
               </div>
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Client Love</h2>
               <p className="text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google" className="w-4 h-4" /> 
                 5.0 rating across 120+ reviews
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { name: "Emily & David", text: "Visual Studio captured our wedding beautifully. The album they delivered is breathtaking. A true masterpiece." },
                 { name: "Atlas Tech Corp", text: "Incredible corporate headshots and event coverages. Our marketing materials look 10x better now." },
                 { name: "Sophia R.", text: "The team at Dreams Decor transformed our simple hall into a royal palace. Highly recommend their integrated service." }
               ].map((review, i) => (
                 <div key={i} className="p-8 bg-background border border-border">
                    <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
                    <div className="font-bold uppercase tracking-widest text-sm">— {review.name}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
         <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
               <MessageCircleQuestion className="mx-auto block mb-6 text-muted-foreground" size={40} />
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
               {[
                 { q: "How far in advance should we book?", a: "For weddings and large events, we recommend booking 6-12 months in advance. For corporate projects, 3-4 weeks is ideal." },
                 { q: "Do you travel for shoots?", a: "Yes, we are available for destination weddings and international corporate campaigns. Travel fees apply." },
                 { q: "What is the turnaround time for photos?", a: "Portrait sessions are delivered within 2 weeks. Comprehensive weddings and event galleries typically take 6-8 weeks." }
               ].map((faq, idx) => (
                 <div key={idx} className="border-b border-border pb-6">
                    <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                 </div>
               ))}
            </div>
            <div className="mt-12 text-center">
               <Link href="/contact" className="font-bold uppercase tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors">
                 Have more questions? Contact Us
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
