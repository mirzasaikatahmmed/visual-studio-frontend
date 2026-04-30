import { Sparkles } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { EventsContent } from "@/components/events/events-content";

export const metadata = {
  title: "Events & Decorations | Visual Studio",
  description: "Breathtaking event setups powered by Dreams Decor. Starting at $499.",
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection 
        subtitle={
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={16} /> POWERED BY DREAMS DECOR
          </span>
        }
        title={<>Unforgettable <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Events</span></>}
        desc="Transforming ordinary spaces into breathtaking atmospheres. Watch your visions come to life with our premium event decoration services."
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />
      
      <EventsContent />
    </div>
  );
}



