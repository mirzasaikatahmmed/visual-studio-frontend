import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MarketingContent } from "@/components/visual-marketing/marketing-content";

export const metadata: Metadata = {
  title: "Visual Marketing",
  description:
    "Elevate your brand with Visual Studios & Events visual marketing services — corporate branding photography, product shoots, social media content, and high-impact visual campaigns that convert audiences into customers.",
  keywords: [
    "visual marketing",
    "corporate branding photography",
    "product photography",
    "brand photography",
    "commercial photography",
    "social media content photography",
    "marketing photography",
    "business photography",
    "product shoot",
    "brand identity photography",
    "Visual Studios & Events marketing",
  ],
  alternates: { canonical: "/visual-marketing" },
  openGraph: {
    title: "Visual Marketing | Visual Studios & Events",
    description:
      "Corporate branding photography, product shoots, and high-impact visual campaigns that elevate your brand and drive engagement.",
    url: "https://visualstudioslens.com/visual-marketing",
  },
};

export default function VisualMarketingPage() {
  return (
    <div className="dark bg-background text-foreground flex flex-col min-h-screen">
      <HeroSection
        subtitle="Corporate Branding"
        title={<>Visual <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 ml-1 md:ml-3">Marketing</span></>}
        desc="We don't just take pictures. We create visual assets that drive engagement, elevate your brand, and convert audiences into customers."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
      />

      <MarketingContent />
    </div>
  );
}



