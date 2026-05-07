import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Photography & Videography",
  "name": "South Asian & Muslim Wedding Photography and Videography",
  "provider": { "@id": "https://www.visualstudioslens.com/#business" },
  "areaServed": ["New York", "New Jersey", "Connecticut"],
  "description": "Full-service wedding photography and videography for South Asian and Muslim weddings in New York. Bengali, Pakistani, Indian, Sikh, Arab, and Afghan weddings. Female crew available on request.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "499",
    "availability": "https://schema.org/InStock",
    "url": "https://www.visualstudioslens.com/packages",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Coverage Packages",
    "itemListElement": [
      { "@type": "Offer", "name": "Event Session", "price": "499", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "1-Day Wedding Coverage", "price": "1400", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Multi-Day Wedding Coverage", "price": "3500", "priceCurrency": "USD" },
    ],
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you offer female-only photography and videography teams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We provide all-female crews and female editors on request — for the bride's getting-ready, Mehndi, ladies-only events, and end-to-end editing of your photos and footage.",
      },
    },
    {
      "@type": "Question",
      "name": "Our wedding spans 3 days (Mehndi, Baraat, Walima). Do you offer multi-day packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We specialize in multi-day South Asian weddings and offer custom packages to cover all your events seamlessly.",
      },
    },
    {
      "@type": "Question",
      "name": "How soon will we receive our photos and videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sneak peeks within 72 hours. Full edited photo gallery in 3–4 weeks. Cinematic wedding film in 1–2 months.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you know our specific cultural traditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. With 1,000+ weddings shot, our team is fluent in Bengali, Pakistani, Indian, Sikh, Afghan, and Arab traditions — Nikkah, Mehndi, Holud, Sangeet, Baraat, Vidaai, Walima, and Anand Karaj.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the deposit, and do you offer venue insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We require a 30%–50% deposit to secure your date. Liability coverage is available on request — let us know your venue's COI requirements when you book.",
      },
    },
  ],
};

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
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { BookingSection } from "@/components/home/booking-section";
import { FaqSection } from "@/components/home/faq-section";
import { InstagramSection } from "@/components/home/instagram-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <HeroSection />
      <UspStrip />
      <ExpertiseSection />
      <CulturesSection />
      <FemaleCrewSection />
      <WhatsIncludedSection />
      <ReviewsSection />
      <BookingSection />
      <FaqSection />
      <InstagramSection />
    </div>
  );
}


