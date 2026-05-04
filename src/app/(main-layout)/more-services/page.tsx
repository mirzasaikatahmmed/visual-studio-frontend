import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";
import { fetchServices } from "@/lib/servicesApi";

export const metadata: Metadata = {
  title: "Wedding Services — Photography, Cinematography & Add-Ons | Visual Studio",
  description:
    "Explore Visual Studio's full range of wedding services — drone coverage, engagement sessions, same-day edits, photo booths, décor, and trusted partner vendors for South Asian and Muslim weddings in NYC.",
  keywords: [
    "south asian wedding services nyc",
    "drone wedding photography nyc",
    "wedding add-on services",
    "engagement session nyc",
    "same day edit wedding",
    "nikkah only coverage",
    "photo booth wedding nyc",
    "wedding vendor nyc",
    "visualstudioslens services",
  ],
  alternates: { canonical: "/more-services" },
  openGraph: {
    title: "Wedding Services — Photography, Cinematography & Add-Ons | Visual Studio",
    description:
      "Drone coverage, engagement sessions, same-day edits, and partner vendors for South Asian and Muslim weddings in NYC.",
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
