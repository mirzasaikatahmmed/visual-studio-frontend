import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { PackageEstimator } from "@/components/packages/PackageEstimator";

export const metadata: Metadata = {
  title: {
    absolute:
      "Wedding Photography Packages & Pricing NYC | Visual Studio",
  },
  description:
    "Build your custom wedding photography or videography package online. Photo only, video only, or photo + video — toggle your hours, days, add-ons, and see a live price estimate. South Asian & Muslim wedding specialists in NYC.",
  keywords: [
    "wedding photography packages nyc",
    "wedding photography pricing nyc",
    "south asian wedding photography cost",
    "muslim wedding photography packages",
    "bengali wedding photography price",
    "pakistani wedding photography nyc",
    "wedding videography packages nyc",
    "photo video wedding package nyc",
    "visualstudioslens pricing",
    "wedding photographer quote nyc",
  ],
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Wedding Photography Packages & Pricing NYC | Visual Studio",
    description:
      "Build your custom wedding package online and see a live estimate. Photo, video, or both — South Asian & Muslim wedding specialists in NYC.",
    url: "https://www.visualstudioslens.com/packages",
  },
  twitter: {
    title: "Wedding Photography Packages & Pricing NYC | Visual Studio",
    description:
      "Build your custom wedding package and see live pricing. South Asian & Muslim wedding photographers in NYC.",
  },
};

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        subtitle="Pricing & Packages"
        title={
          <>
            Build Your{" "}
            <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">
              Package
            </span>
          </>
        }
        desc="Toggle the options you need and see a live price estimate. Every package is finalized during your free consultation."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />

      <PackageEstimator />
    </div>
  );
}
