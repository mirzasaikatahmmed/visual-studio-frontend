import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MarketingContent } from "@/components/visual-marketing/marketing-content";

export const metadata: Metadata = {
  title: { absolute: "Visual Marketing & Brand Photography NY | Visual Studio" },
  description:
    "Corporate branding photography, product shoots, and commercial video for NY businesses. High-impact visual assets that elevate your brand.",
  keywords: [
    "visual marketing ny",
    "brand photography ny",
    "corporate photography ny",
    "product photography ny",
    "social media content photography",
    "commercial video production ny",
    "business photography brooklyn",
    "brand identity photography",
    "visualstudioslens marketing",
  ],
  alternates: { canonical: "/visual-marketing" },
  openGraph: {
    title: "Visual Marketing & Brand Photography NY | Visual Studio",
    description:
      "Corporate branding photography, product shoots, and commercial video for NY businesses. High-impact visual assets by Visual Studio.",
    url: "https://www.visualstudioslens.com/visual-marketing",
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



