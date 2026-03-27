import Link from "next/link";
import { CheckCircle2, Star, Sparkles, MoveRight } from "lucide-react";

export const metadata = {
  title: "Events & Decorations | Visual Studio",
  description: "Breathtaking event setups powered by Dreams Decor. Starting at $499.",
};

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

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center max-w-4xl mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border mb-6">
          <Sparkles size={16} />
          <span className="text-sm font-medium tracking-widest uppercase">Powered by Dreams Decor</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-6">Unforgettable Events</h1>
        <p className="text-xl text-muted-foreground mb-10">
          Transforming ordinary spaces into breathtaking atmospheres. Watch your visions come to life with our premium event decoration services.
        </p>
        <Link 
          href="/contact" 
          className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-opacity uppercase tracking-widest text-sm inline-flex items-center gap-2"
        >
          Book Consultation <MoveRight size={18} />
        </Link>
      </section>

      {/* Before / After Transformation */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">The Transformation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From an empty warehouse to a luxurious reception.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative">
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop')" }} />
               <div className="absolute top-4 left-4 bg-background px-4 py-2 text-sm font-bold uppercase tracking-widest border border-border">Before Setup</div>
            </div>
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')" }} />
               <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 text-sm font-bold uppercase tracking-widest">After Dreams Decor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Boards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center">Inspiration Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop')" }}>
               <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider">Aesthetic Rustic</h3>
               </div>
             </div>
             <div className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop')" }}>
                <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider">Modern Minimal</h3>
               </div>
             </div>
             <div className="aspect-[3/4] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop')" }}>
                <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wider">Grand Opulence</h3>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Packaging / Pricing */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Investment Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Transparent pricing starting at $499.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`p-8 border flex flex-col ${pkg.popular ? "border-foreground shadow-2xl bg-background relative" : "border-border bg-transparent"}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6">{pkg.price}</div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-muted-foreground shrink-0 mt-0.5" />
                      <span className={pkg.popular ? "text-foreground" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className={`w-full py-4 text-center font-medium rounded-full uppercase tracking-widest text-sm transition-opacity ${
                    pkg.popular ? "bg-foreground text-background hover:opacity-90" : "bg-transparent border border-border hover:bg-muted"
                  }`}
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-foreground text-background text-center">
         <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-center gap-1 mb-8 text-background">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <h4 className="text-2xl md:text-4xl font-medium leading-relaxed mb-8">
              "Dreams Decor completely blew us away. They took our vague ideas and Pinterest boards and created a venue that looked like it was out of a magazine. Absolutely stunning work!"
            </h4>
            <div className="uppercase tracking-widest font-bold">— Sarah & Michael</div>
         </div>
      </section>

    </div>
  );
}
