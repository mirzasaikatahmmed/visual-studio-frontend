import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MuslimFriendlyContent } from "@/components/muslim-friendly-services/content";

export const metadata: Metadata = {
  title: {
    absolute:
      "Muslim-Friendly Wedding Photography & Videography NY | Visual Studios & Events",
  },
  description:
    "No-music edits, female-only crews, Islamic-touch editing, and modesty-aware coverage for Muslim weddings in Brooklyn, NY. Serving Bengali, Pakistani, Arab, and Afghan families across NY, NJ, and CT.",
  keywords: [
    "muslim wedding photographer ny",
    "muslim wedding videographer ny",
    "female wedding photographer ny",
    "female crew wedding ny",
    "no music wedding video ny",
    "halal wedding photography",
    "hijabi bride photographer",
    "nikkah photographer brooklyn",
    "islamic wedding videography",
    "modest wedding photography ny",
    "female editor wedding video",
    "muslim friendly wedding photography",
    "south asian muslim wedding ny",
    "bengali wedding photographer ny",
    "arab wedding photographer brooklyn",
  ],
  alternates: { canonical: "/muslim-friendly-services" },
  openGraph: {
    title:
      "Muslim-Friendly Wedding Photography & Videography | Visual Studios & Events",
    description:
      "Female crews, no-music edits, Islamic-touch editing, and modesty-aware coverage for Muslim weddings in NY, NJ, and CT.",
    url: "https://www.visualstudioslens.com/muslim-friendly-services",
  },
  twitter: {
    title:
      "Muslim-Friendly Wedding Photography & Videography | Visual Studios & Events",
    description:
      "Female crews, no-music edits, and modesty-aware coverage for Muslim weddings in NY.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Muslim-Friendly Wedding Photography & Videography",
  name: "Muslim-Friendly Editing & Female Crew Services",
  provider: { "@id": "https://www.visualstudioslens.com/#business" },
  areaServed: ["New York", "New Jersey", "Connecticut"],
  description:
    "End-to-end female crew and female editor workflow, no-music edits, Islamic-touch editing, and modesty-aware coverage for Muslim and conservative families.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "1400",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "1400",
      priceCurrency: "USD",
    },
    availability: "https://schema.org/InStock",
    url: "https://www.visualstudioslens.com/packages",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you do no-music wedding edits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer full wedding films and highlight reels edited completely without music — safe to share in religious circles, on Islamic social media, and within conservative family groups. Just request a 'no-music edit' when you book.",
      },
    },
    {
      "@type": "Question",
      name: "Are female photographers available for hijabi brides?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide end-to-end female-only workflows on request: female photographers and videographers on the day, AND female editors handling all your photos and footage afterward. Your modesty is protected from capture to delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Can you accommodate gender separation at our wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We are experienced with fully gender-separated ceremonies and receptions. Our female crew covers the women's side completely, while a separate team handles the men's side if needed. Prayer-time breaks are also built into our shooting schedule.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer Islamic-touch video editing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Islamic-touch edits feature tasteful transitions, optional Quranic or duaa overlays where appropriate, and color grading that complements traditional Islamic dress and decor. Films are edited to reflect the spiritual and cultural tone of your event.",
      },
    },
    {
      "@type": "Question",
      name: "Which Muslim wedding traditions are you experienced with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We have covered 1,000+ weddings across Bengali, Pakistani, Indian, Arab, and Afghan Muslim traditions — including Nikkah, Walima, Mehndi, Holud, Akht, Bou Bhat, Sangeet, and multi-day wedding sequences. Our team knows the key moments, the prayers, and the cultural cues that matter most.",
      },
    },
  ],
};

export default function MuslimFriendlyServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection
        subtitle="Honoring Your Faith & Culture"
        title={
          <>
            Muslim-Friendly{" "}
            <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">
              Services
            </span>
          </>
        }
        desc="No-music edits, female-only crews, Islamic-touch editing, and modesty-aware coverage — built around your values, not just your timeline."
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />

      <MuslimFriendlyContent />

      {/* Static SEO section — crawlable without JS */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Muslim-Friendly Wedding Photography &amp; Videography in New York
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-8">
            Visual Studios &amp; Events is a Brooklyn-based wedding photography and cinematography
            studio with a dedicated operational track for Muslim and conservative families. This is
            not a marketing tagline — we have a separate editing team and female crew roster
            specifically for these bookings.
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed mb-8">
            We serve Bengali, Pakistani, Indian, Arab, and Afghan Muslim communities across New
            York, New Jersey, and Connecticut. Our team has covered over 1,000 weddings and
            understands the cultural and religious nuances that make each community unique — from
            the Nikkah ceremony to the Walima reception, from modest portrait framing to
            gender-separated coverage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div>
              <h3 className="text-xl font-bold mb-3">No-Music Video Editing</h3>
              <p className="text-foreground/70 leading-relaxed">
                Full wedding films and highlight reels delivered without background music. Safe to
                share on Islamic social platforms, in family WhatsApp groups, and within
                conservative religious communities. All transitions are clean and cinematic —
                beautiful without relying on music.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Female-Only Crew &amp; Editors</h3>
              <p className="text-foreground/70 leading-relaxed">
                End-to-end female workflow available on request: female photographers, female
                videographers, and female editors. Your photos and footage are handled exclusively
                by women from capture to final delivery. Especially important for Hijabi brides,
                ladies-only Mehndi events, and getting-ready coverage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Islamic-Touch Editing</h3>
              <p className="text-foreground/70 leading-relaxed">
                Videos styled with an Islamic aesthetic — tasteful transitions, optional Quranic or
                duaa overlays where appropriate, and color grading that complements traditional
                Islamic dress and venue decor. Films reflect the spiritual tone of your wedding, not
                just the visual.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Modesty-Aware Coverage</h3>
              <p className="text-foreground/70 leading-relaxed">
                Sensitivity to gender separation during ceremonies and receptions. Prayer-time
                accommodations built into the shooting schedule. Modest portrait framing that avoids
                angles and compositions that do not align with Islamic values.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Cultural &amp; Religious Fluency</h3>
              <p className="text-foreground/70 leading-relaxed">
                Deep familiarity with Nikkah ceremonies, Walima receptions, Mehndi nights, Holud,
                Akht, and Bou Bhat traditions. We know when to be present, when to step back, and
                which moments families will treasure for generations. Multi-day wedding packages
                available.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">
                Serving the Tri-State Muslim Community
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Based in Brooklyn, NY at 1097 Liberty Avenue. We regularly cover Muslim weddings
                across all five boroughs, New Jersey, Connecticut, and Long Island. Bengali,
                Pakistani, Arab, and Afghan communities have trusted us for over a decade.
              </p>
            </div>
          </div>

          <p className="mt-10 text-foreground/70 leading-relaxed">
            Ready to discuss your wedding? Book a free consultation via Calendly or reach us
            directly on WhatsApp. Let us know your requirements — including any specific Islamic or
            modesty-related needs — and we will put together a custom package for your event.
          </p>
        </div>
      </section>
    </div>
  );
}
