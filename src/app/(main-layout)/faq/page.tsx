import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { FaqContent } from "@/components/faq/faq-content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's included in your wedding photography packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every package includes a lead photographer, a second shooter, full-day coverage, a pre-wedding consultation, and professionally edited high-resolution photos delivered through a private online gallery with printing rights. Cinematography, drone coverage, and same-day edits are available as add-ons.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you have female photographers and videographers available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We have female photographers and videographers available on request for the bride's getting-ready, Mehndi, Holud, ladies-only Sangeet, and any segment of the wedding where a female crew is required. Please mention this when you book so we can confirm availability for your date.",
      },
    },
    {
      "@type": "Question",
      "name": "Which South Asian and Muslim wedding traditions do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We regularly photograph and film Bengali, Pakistani, Indian, Sikh, Afghan, and Arab weddings. Our team is fluent in capturing Nikkah, Holud, Sangeet, Baraat, Vidaai, Rukhsati, Walima, Anand Karaj, and reception traditions.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does wedding photography cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wedding photography packages at Visual Studio start at $499 and scale based on hours of coverage, number of shooters, and add-ons such as cinematography and drone. We send a full pricing guide after a free 15-minute consultation.",
      },
    },
    {
      "@type": "Question",
      "name": "How many shooters are included in your wedding package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard wedding package includes a lead photographer and a second shooter. For weddings with 250+ guests, multi-day events, or simultaneous bride/groom prep coverage, we strongly recommend adding a third shooter. We can scale up to four-person crews for large weddings.",
      },
    },
    {
      "@type": "Question",
      "name": "How do you handle Desi time if the wedding runs late?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work on flat day rates for the contracted coverage window, not strict hourly meters. If the wedding is running long, we'll stay through the key moments you booked us for. Coverage that extends well past the contracted end time is billed at a transparent hourly overage rate disclosed in your contract — no surprises.",
      },
    },
    {
      "@type": "Question",
      "name": "When do I get sneak peeks for social media?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We deliver 15–25 sneak peek photos within 78 hours of your wedding so you can post while the buzz is fresh. Same-day edit highlight videos are available as an add-on.",
      },
    },
    {
      "@type": "Question",
      "name": "What's the full turnaround time for the gallery and wedding film?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full edited photo galleries are delivered in 3–4 weeks. Cinematic wedding films are delivered in 1–2 months. Rush delivery is available as an add-on.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you travel for destination weddings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We cover the full tri-state area (NY, NJ, CT) at no travel charge, and we travel internationally and across the US for destination weddings. Travel and lodging costs are billed at cost with no markup.",
      },
    },
    {
      "@type": "Question",
      "name": "Are you insured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We carry liability insurance. A Certificate of Insurance for your venue is available on request — reach out at the time of booking and we'll confirm the details.",
      },
    },
    {
      "@type": "Question",
      "name": "Where are you based and what areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're based in Brooklyn and Queens, NY, and serve the entire tri-state area — all five NYC boroughs, Long Island, Westchester, New Jersey, and Connecticut. We also travel for destination weddings worldwide.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Wedding Photography FAQ — Pricing, Coverage, Female Crew | Visual Studio",
  description:
    "Everything you need to know about booking Visual Studio for your South Asian or Muslim wedding. Pricing, female crew availability, coverage area, delivery timelines, and more.",
  keywords: [
    "wedding photography FAQ",
    "south asian wedding photographer questions",
    "muslim wedding photography pricing",
    "female photographer NYC",
    "wedding photography packages NYC",
    "Bengali wedding photographer",
    "Pakistani wedding photographer",
    "Indian wedding photographer",
    "wedding photography turnaround",
    "visualstudioslens FAQ",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Wedding Photography FAQ | Visual Studio",
    description:
      "Everything you need to know about booking Visual Studio for your South Asian or Muslim wedding.",
    url: "https://visualstudioslens.com/faq",
  },
};

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection
        subtitle="Got Questions?"
        title={
          <>
            FAQ &amp;{" "}
            <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">
              Booking Guide
            </span>
          </>
        }
        desc="Everything you need to know about booking Visual Studio for your wedding, engagement, or event."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />
      <FaqContent />
    </div>
  );
}
