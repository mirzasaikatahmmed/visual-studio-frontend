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
        "text": "Every wedding package includes a lead photographer, a second shooter, full-day coverage, a pre-wedding consultation, and professionally edited high-resolution photos delivered through a private online gallery with printing rights. Cinematography, drone coverage, additional shooters, and same-day edits are available as add-ons. Detailed package breakdowns are sent after your consultation.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does wedding photography cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wedding photography packages at Visual Studios & Events start at $499 and scale based on hours of coverage, number of shooters, cinematography add-ons, and album options. We send a full pricing guide after a free 15-minute consultation so we can match the right package to your wedding's scope.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I reserve my date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your date is locked in with a signed contract and a non-refundable retainer of 30%–50% of the total package. The remaining balance is due closer to the event date. We accept Zelle, bank transfer, and major credit cards.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you offer payment plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer interest-free payment plans split across the months between booking and your wedding date. Talk to us during the consultation and we'll structure something that works for your budget.",
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
      "name": "What's your cancellation and rescheduling policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The retainer is non-refundable, but we'll honor it toward a rescheduled date within 12 months at no penalty. Full details are in the contract.",
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
        "text": "We regularly photograph and film Bengali, Pakistani, Indian, Sikh, Afghan, and Arab weddings. Our team is fluent in capturing Nikkah, Holud (Gaye Holud), Sangeet, Baraat, Vidaai, Rukhsati, Walima, Anand Karaj, Doodh Pilai, and reception traditions. We know the rhythm of these events — from when not to shoot during Nikkah to where to stand during Rukhsati.",
      },
    },
    {
      "@type": "Question",
      "name": "How many shooters are included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard wedding package includes a lead photographer and a second shooter. For weddings with 250+ guests, multi-day events, or simultaneous bride/groom prep coverage, we strongly recommend adding a third shooter. We can scale up to four-person crews for large weddings.",
      },
    },
    {
      "@type": "Question",
      "name": "How do you handle “Desi time” if the wedding runs late?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work on flat day rates for the package coverage window, not strict hourly meters. If the wedding is running long, we'll stay through the key moments you booked us for. Coverage that extends well past the contracted end time is billed at a transparent hourly overage rate disclosed in your contract — no surprises.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I see a full wedding gallery, including emotional moments like Vidaai or Rukhsati?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. During the consultation we'll share full galleries from past weddings so you can see how we capture the emotional arc of the day, not just the posed portraits. We're also happy to share Mehndi-only, Nikkah-only, or Walima-only galleries if you want to see how we handle a specific event.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens if a photographer gets sick on my wedding day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We have a vetted backup network of photographers and videographers we trust. In the rare case of an emergency, we replace the team member with someone of equal experience at no extra cost to you. Your day is covered.",
      },
    },
    {
      "@type": "Question",
      "name": "Will you coordinate with my wedding planner, decor team, and DJ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We send a shot list and timeline to your planner before the wedding and coordinate with decor, lighting, and DJ teams on-site so everyone is aligned. We've worked alongside many of the major South Asian wedding vendors in the tri-state area.",
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
      "name": "How many edited photos will I receive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on coverage hours, but a typical full-day wedding gallery includes 600–1,000+ professionally edited photos.",
      },
    },
    {
      "@type": "Question",
      "name": "Will my photos be color-corrected and retouched?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every delivered photo is color-graded and exposure-corrected. Detailed retouching (skin, blemish removal, object removal) is included on key portraits and available on additional images for an extra fee.",
      },
    },
    {
      "@type": "Question",
      "name": "How will I receive my photos and videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Through a private, password-protected online gallery (Pixieset) where you can download high-resolution files, share with family, and order prints. USB and printed albums are available as add-ons.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you offer engagement, Nikkah-only, or pre-wedding shoots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer standalone engagement sessions, Nikkah-only coverage, pre-wedding portrait shoots, and same-day Walima coverage. These can be booked individually or bundled with your wedding package at a discount.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you offer drone coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Licensed drone coverage is available as an add-on, subject to venue and FAA airspace restrictions.",
      },
    },
    {
      "@type": "Question",
      "name": "Are you insured? Can you provide a Certificate of Insurance for my venue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We carry liability insurance. A Certificate of Insurance for your venue is available on request — reach out at the time of booking and we'll confirm the details.",
      },
    },
    {
      "@type": "Question",
      "name": "Will my photos be used on your social media or website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We love sharing our work, but you control what's public. You can opt out entirely, restrict use to portfolio only (no social media), or grant full sharing rights — your choice, written into the contract.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I share a Pinterest board or specific shot list?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Please do. We encourage couples to send Pinterest boards, must-have family shot lists, and reference videos before the wedding. It helps us pre-plan and makes sure no key moment is missed.",
      },
    },
    {
      "@type": "Question",
      "name": "Where are you based and what areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're based in Brooklyn and Queens, NY, and serve the entire tri-state area — all five NY boroughs, Long Island, Westchester, New Jersey, and Connecticut. We also travel for destination weddings worldwide.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "Photography FAQ — Pricing & Female Crew | Visual Studios & Events" },
  description:
    "Everything about booking Visual Studios & Events for your South Asian or Muslim wedding — pricing, female crew, coverage area, and delivery timelines.",
  keywords: [
    "wedding photography FAQ",
    "south asian wedding photographer questions",
    "muslim wedding photography pricing",
    "female photographer NY",
    "wedding photography packages NY",
    "Bengali wedding photographer",
    "Pakistani wedding photographer",
    "Indian wedding photographer",
    "wedding photography turnaround",
    "visualstudioslens FAQ",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Photography FAQ — Pricing & Female Crew | Visual Studios & Events",
    description:
      "Everything you need to know about booking Visual Studios & Events for your South Asian or Muslim wedding.",
    url: "https://www.visualstudioslens.com/faq",
  },
  twitter: {
    title: "Photography FAQ — Pricing & Female Crew | Visual Studios & Events",
    description:
      "Pricing, female crew availability, coverage area, delivery timelines — everything about booking Visual Studios & Events for your wedding.",
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
        desc="Everything you need to know about booking Visual Studios & Events for your wedding, engagement, or event."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />
      <FaqContent />
    </div>
  );
}
