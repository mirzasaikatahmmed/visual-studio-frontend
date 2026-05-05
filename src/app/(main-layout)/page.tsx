import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: { absolute: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events" },
  description:
    "Bengali, Pakistani, Indian & Muslim wedding photography in NY. Female crew available. All five boroughs, Long Island, NJ, CT and destination.",
  keywords: [
    "south asian wedding photographer ny",
    "muslim wedding photographer ny",
    "bengali wedding photographer",
    "pakistani wedding photographer",
    "indian wedding photographer ny",
    "female wedding photographer",
    "nikkah photographer ny",
    "holud photographer",
    "cinematic wedding film ny",
    "wedding photographer brooklyn",
    "wedding photographer queens",
    "visualstudioslens",
  ],
  alternates: { canonical: "https://www.visualstudioslens.com" },
  openGraph: {
    title: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events",
    description:
      "Bengali, Pakistani, Indian & Muslim wedding photography in NY. Female crew available.",
    url: "https://www.visualstudioslens.com",
  },
  twitter: {
    title: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events",
    description:
      "Bengali, Pakistani, Indian & Muslim wedding photography in NY. Female crew available. All five boroughs, Long Island, NJ & CT.",
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
    </div>
  );
}


