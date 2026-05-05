import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";
import { fetchServices } from "@/lib/servicesApi";

export const metadata: Metadata = {
  title: { absolute: "Wedding Services — Photography & Cinematography | Visual Studio" },
  description:
    "Visual Studio's wedding services: drone coverage, engagement sessions, same-day edits, and photo booths for South Asian & Muslim weddings in NY.",
  keywords: [
    "south asian wedding services ny",
    "drone wedding photography ny",
    "wedding add-on services",
    "engagement session ny",
    "same day edit wedding",
    "nikkah only coverage",
    "photo booth wedding ny",
    "wedding vendor ny",
    "visualstudioslens services",
  ],
  alternates: { canonical: "/more-services" },
  openGraph: {
    title: "Wedding Services — Photography & Cinematography | Visual Studio",
    description:
      "Drone coverage, engagement sessions, same-day edits, and partner vendors for South Asian and Muslim weddings in NY.",
    url: "https://www.visualstudioslens.com/more-services",
  },
};

export default async function MoreServicesPage() {
  const services = await fetchServices().catch(() => []);
  const sorted = [...services].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Additional Options"
        title={<>More <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Services</span></>}
        desc="Here are some of our additional options from our partners! We have some of the best teams & vendors to make your dream come true! Get our full packages with unbeatable prices when booked all together!"
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />

      <MoreServicesGrid services={sorted} />
    </div>
  );
}
