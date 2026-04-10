import { HeroSection } from "@/components/hero-section";
import { AboutContent } from "@/components/about/about-content";

export const metadata = {
  title: "About Us | Visual Studio",
  description: "Learn more about the team behind Visual Studio and Dreams Decor.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection 
        subtitle="Behind The Lens"
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">Story</span></>}
        desc="We are visual storytellers. From grand South Asian weddings to high-end corporate campaigns, we capture the essence of every moment."
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
      />

      <AboutContent />
    </div>
  );
}
