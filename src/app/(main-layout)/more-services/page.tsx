import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";

export const metadata = {
  title: "More Services & Partners | Visual Studio",
  description: "Additional options and partner vendors for your dream event.",
};

export default function MoreServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection 
        subtitle="Additional Options"
        title={<>More <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Services</span></>}
        desc="Here are some of our additional options from our partners! We have some of the best teams & vendors to make your dream come true! Get our full packages with unbeatable prices when booked all together!"
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />

      <MoreServicesGrid />
    </div>
  );
}
