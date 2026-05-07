import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { VideoGrid } from "@/components/video-gallery/video-grid";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const cinematographyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Cinematography",
  "name": "Cinematic Wedding Films — South Asian & Muslim Weddings NY",
  "provider": { "@id": "https://www.visualstudioslens.com/#business" },
  "areaServed": ["New York", "New Jersey", "Connecticut"],
  "description": "Full-length and highlight wedding films for South Asian and Muslim weddings in New York. Cinematic color grading, no-music edits available, same-day highlight reels, and drone aerial footage. Bengali, Pakistani, Indian, Sikh, Arab, and Afghan ceremonies covered.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "800",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "800",
      "priceCurrency": "USD",
    },
    "availability": "https://schema.org/InStock",
    "url": "https://www.visualstudioslens.com/packages",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Videography Packages",
    "itemListElement": [
      { "@type": "Offer", "name": "4-Hour Essentials Highlight Film" },
      { "@type": "Offer", "name": "8-Hour Classic Film — Ceremony & Reception" },
      { "@type": "Offer", "name": "12-Hour Signature Film — 3 Edited Films" },
      { "@type": "Offer", "name": "16-Hour Elite Full-Day Film — 4 Edited Films" },
      { "@type": "Offer", "name": "Same-Day Highlight Edit Add-On" },
      { "@type": "Offer", "name": "No-Music Cinematic Edit" },
      { "@type": "Offer", "name": "Drone Aerial Wedding Footage" },
    ],
  },
};

export const metadata: Metadata = {
  title: { absolute: "Cinematic Wedding Films NY | Visual Studios & Events" },
  description:
    "Watch cinematic wedding films from Bengali, Pakistani, Indian, Sikh & Muslim weddings across NY. Same-day edits and highlight reels available.",
  keywords: [
    "cinematic wedding films ny",
    "south asian wedding videographer",
    "muslim wedding video",
    "bengali wedding film",
    "pakistani wedding videographer",
    "wedding highlight reel ny",
    "same day edit wedding",
    "nikkah videographer",
    "wedding cinematography brooklyn",
    "wedding video queens",
  ],
  alternates: { canonical: "/video-gallery" },
  openGraph: {
    title: "Cinematic Wedding Films NY | Visual Studios & Events",
    description:
      "Cinematic wedding films for South Asian and Muslim weddings in NY. Same-day edits and highlight reels available.",
    url: "https://www.visualstudioslens.com/video-gallery",
  },
  twitter: {
    title: "Cinematic Wedding Films NY | Visual Studios & Events",
    description:
      "South Asian & Muslim wedding videography in NY. Cinematic highlight reels, same-day edits, and full ceremony films.",
  },
};

export default function VideoGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cinematographyServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Video Gallery", path: "/video-gallery" }])) }}
      />
      <HeroSection
        subtitle="Our Films"
        title={<>Video <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Gallery</span></>}
        desc="Cinematic storytelling, commercial reels, and breathtaking event coverage."
        image="https://images.unsplash.com/photo-1528697203043-733dafdaa316?q=80&w=2000&auto=format&fit=crop"
      />

      <VideoGrid />
    </div>
  );
}



