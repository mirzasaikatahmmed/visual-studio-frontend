import Link from "next/link";
import { Camera, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Visual Studio",
  description: "Learn more about the team behind Visual Studio and Dreams Decor.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <section className="container mx-auto px-4 max-w-4xl pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Our Story</h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          We are visual storytellers. From grand South Asian weddings to high-end corporate campaigns, we capture the essence of every moment.
        </p>
        <div className="w-24 h-1 bg-foreground mx-auto"></div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554048665-8c34fbc46098?q=80&w=800')" }} />
               {/* Touch of Desi aesthetic via description of the team and styling */}
               <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-6 border border-border">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-center">The Creators</h3>
               </div>
            </div>
            <div className="space-y-8">
               <h2 className="text-3xl font-bold uppercase tracking-tight">Redefining Visual Arts</h2>
               <p className="text-muted-foreground leading-relaxed">
                 Visual Studio began with a simple mission: to preserve memories in their truest, most beautiful form. Over the years, we have grown into a multi-disciplinary creative studio spanning luxury weddings, brand marketing, and event design.
               </p>
               <p className="text-muted-foreground leading-relaxed">
                 Our roots in the South Asian community ("Desi touch") deeply influence our vibrant, rich, and detailed approach to photography. We know how to capture the grandeur, the emotions, and the intricate details that make these events special.
               </p>
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border mt-8">
                  <div>
                    <Camera size={32} className="mb-4 text-foreground" />
                    <h4 className="text-3xl font-bold mb-2">500+</h4>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Weddings Captured</p>
                  </div>
                  <div>
                    <Award size={32} className="mb-4 text-foreground" />
                    <h4 className="text-3xl font-bold mb-2">10 Yrs</h4>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Of Excellence</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Philosophy */}
      <section className="bg-foreground text-background py-24 text-center">
         <div className="container mx-auto px-4 max-w-3xl">
           <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8">Our Philosophy</h2>
           <p className="text-xl md:text-2xl leading-relaxed italic text-background/80">
             "We don't just use our cameras to take pictures; we use them to see the world completely. Every client, every event, and every brand has a unique soul waiting to be unveiled."
           </p>
         </div>
      </section>

    </div>
  );
}
