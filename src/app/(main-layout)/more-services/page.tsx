import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";
import { fetchServices } from "@/lib/servicesApi";

export const metadata: Metadata = {
  title: "More Services & Partners",
  description:
    "Discover additional photography and event services from Visual Studio and our trusted partner vendors — from drone photography and photo booths to décor and floral design for your dream event.",
  keywords: [
    "photography services",
    "event services",
    "partner vendors",
    "drone photography",
    "photo booth rental",
    "event planning",
    "wedding vendors",
    "event décor",
    "Visual Studios & Events services",
    "photography packages",
  ],
  alternates: { canonical: "/more-services" },
  openGraph: {
    title: "More Services & Partners | Visual Studios & Events",
    description:
      "Additional photography and event services from Visual Studios & Events and trusted partner vendors for your dream event.",
    url: "https://visualstudioslens.com/more-services",
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
