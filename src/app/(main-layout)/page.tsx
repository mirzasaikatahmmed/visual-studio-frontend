import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "South Asian & Muslim Wedding Photographer NYC | Visual Studio",
  description:
    "Bengali, Pakistani, Indian, and Muslim wedding photography and cinematography in NYC. Female crew available. Serving all five boroughs, Long Island, NJ, CT, and destination worldwide.",
  keywords: [
    "south asian wedding photographer nyc",
    "muslim wedding photographer nyc",
    "bengali wedding photographer",
    "pakistani wedding photographer",
    "indian wedding photographer nyc",
    "female wedding photographer",
    "nikkah photographer nyc",
    "holud photographer",
    "cinematic wedding film nyc",
    "wedding photographer brooklyn",
    "wedding photographer queens",
    "visualstudioslens",
  ],
  alternates: { canonical: "https://www.visualstudioslens.com" },
  openGraph: {
    title: "South Asian & Muslim Wedding Photographer NYC | Visual Studio",
    description:
      "Bengali, Pakistani, Indian, and Muslim wedding photography and cinematography in NYC. Female crew available.",
    url: "https://www.visualstudioslens.com",
  },
};
import { UspStrip } from "@/components/home/usp-strip";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { CulturesSection } from "@/components/home/cultures-section";
import { FemaleCrewSection } from "@/components/home/female-crew-section";
import { WhatsIncludedSection } from "@/components/home/whats-included-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BookingSection } from "@/components/home/booking-section";
import { FaqSection } from "@/components/home/faq-section";
import { InstagramSection } from "@/components/home/instagram-section";
import { TrustSignalsSection } from "@/components/home/trust-signals-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <UspStrip />
      <ExpertiseSection />
      <CulturesSection />
      <FemaleCrewSection />
      <WhatsIncludedSection />
      <TestimonialsSection />
      <BookingSection />
      <FaqSection />
      <InstagramSection />
      <TrustSignalsSection />
    </div>
  );
}


