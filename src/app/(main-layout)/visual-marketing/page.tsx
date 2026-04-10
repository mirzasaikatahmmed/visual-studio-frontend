import { HeroSection } from "@/components/hero-section";
import { MarketingContent } from "@/components/visual-marketing/marketing-content";

export const metadata = {
  title: "Visual Marketing | Visual Studio",
  description: "Corporate branding, product shoots, and high-impact visual campaigns.",
};

export default function VisualMarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        subtitle="Corporate Branding"
        title={<>Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">Marketing</span></>}
        desc="We don't just take pictures. We create visual assets that drive engagement, elevate your brand, and convert audiences into customers."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
      />

      <MarketingContent />
    </div>
  );
}
