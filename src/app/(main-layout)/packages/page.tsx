import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { PackageTabs } from "@/components/packages/PackageTabs";
import { PackageEstimator } from "@/components/packages/PackageEstimator";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const packagesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a 3-day Bengali wedding cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-day wedding photography packages (2–3 days covering Mehndi/Holud, Baraat, and Walima) start from $3,500. Photo + Video bundles for multi-day South Asian weddings are priced via a free consultation based on your event location, number of ceremonies, and crew preferences. Travel fees apply for venues outside Brooklyn and Queens."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in Visual Studios' wedding photography packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All photography packages include a professional photographer, pre-shoot consultation, backdrop and lighting setup, and high-resolution digital delivery via a private Pixieset gallery. The Signature 12-hour package adds an on-site assistant and client proofing. The Elite 16-hour package includes a 2-photographer team."
      }
    },
    {
      "@type": "Question",
      "name": "How many photos do I receive from a 12-hour wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Signature 12-hour photography package delivers 60 professionally edited high-resolution photos. The Elite 16-hour package delivers 100 photos. Photo + Video Bundle packages deliver 150 edited photos at 12 hours and 200 at 16 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Is a female photographer or videographer available for Muslim or hijabi brides?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A dedicated female photographer, videographer, and editor is available for all packages at no extra charge. We serve hijabi brides, conservative Muslim families, and gender-separated events. Our female crew maintains full modesty-aware coverage throughout your event."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to receive my wedding photos and videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Photos are typically delivered within 3–4 weeks. Cinematic wedding films take 6–8 weeks. We also offer a 72-Hour Sneak Peek of 10–15 edited photos delivered within 3 days of your wedding, and a Rush Delivery add-on for 48-hour turnaround."
      }
    },
    {
      "@type": "Question",
      "name": "Do you cover Bengali, Pakistani, Indian, and Muslim wedding ceremonies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Visual Studios specializes in South Asian and Muslim weddings including Bengali, Pakistani, Indian, Sikh, Arab, and Afghan ceremonies. We cover Nikkah, Walima, Mehndi, Holud, Baraat, Akht, Bou Bhat, and multi-day wedding formats across New York, New Jersey, and Connecticut."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book photography and videography together in one package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Photo + Video Bundle packages are available starting at 4-hour Essentials coverage up to 16-hour Elite full-day coverage. Bundles include a photographer, videographer, lighting setup, cinematic color grading, and delivery via Pixieset gallery and private video link."
      }
    }
  ]
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Packages & Pricing", path: "/packages" }])) }}
      />
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

      <PackageTabs />

      <PackageEstimator />

      {/* Pricing disclaimer */}
      <section className="py-14 bg-brand-500/5 border-y border-brand-500/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-500 mb-3">Every Wedding Is Different</p>
          <p className="text-foreground/80 text-base leading-relaxed mb-2">
            The pricing shown reflects typical starting points. Final pricing varies based on your event location, number of days, crew preferences, and specific deliverables.{" "}
            <strong>We never surprise you with hidden fees.</strong>
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed mb-8">
            To get your custom quote, reach out with your wedding date, location, and what you have in mind — and we&apos;ll build your package together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-85 transition-opacity"
            >
              Get a Custom Quote
            </a>
            <a
              href="https://wa.me/13473066637?text=Hi%2C%20I%27d%20like%20to%20get%20a%20custom%20quote%20for%20my%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-brand-500/30 text-brand-500 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-brand-500/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Static pricing block — crawlable without JS */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Wedding Photography &amp; Videography Pricing — New York
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10">
            Visual Studios &amp; Events offers custom wedding photography and videography packages for events
            across New York, New Jersey, and Connecticut. All prices shown are starting-from estimates;
            final pricing is confirmed during your free consultation based on your event details.
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 font-bold uppercase tracking-wider text-xs text-muted-foreground">Package Tier</th>
                  <th className="py-3 pr-6 font-bold uppercase tracking-wider text-xs text-muted-foreground">Coverage</th>
                  <th className="py-3 font-bold uppercase tracking-wider text-xs text-muted-foreground">Starting From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 pr-6 font-semibold">Event Session</td>
                  <td className="py-4 pr-6 text-foreground/70">Portrait, engagement, small events (4 hrs)</td>
                  <td className="py-4 font-bold text-brand-500">$499</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-semibold">1-Day Wedding</td>
                  <td className="py-4 pr-6 text-foreground/70">Single-day full wedding coverage (8–12 hrs)</td>
                  <td className="py-4 font-bold text-brand-500">$1,400</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-semibold">Multi-Day Wedding</td>
                  <td className="py-4 pr-6 text-foreground/70">Mehndi, Baraat, Walima — 2 to 3 days</td>
                  <td className="py-4 font-bold text-brand-500">$3,500</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-semibold">Cinematic Film Add-On</td>
                  <td className="py-4 pr-6 text-foreground/70">Full cinematic wedding film, professionally scored</td>
                  <td className="py-4 font-bold text-brand-500">$800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">What&apos;s Included in Every Package</h3>
              <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
                <li>✓ Professional photo and/or video team</li>
                <li>✓ Online gallery with web &amp; full-resolution digital files</li>
                <li>✓ Flexible coverage — getting ready, ceremony, portraits, reception</li>
                <li>✓ Unlimited locations within booked hours</li>
                <li>✓ Pro cameras, lenses, lighting, and audio equipment</li>
                <li>✓ Artistic direction and posing guidance</li>
                <li>✓ Consistent color grading</li>
                <li>✓ No watermarks — personal use license</li>
                <li>✓ 3 months cloud storage</li>
                <li>✓ Planning consultations via phone, email, and WhatsApp</li>
                <li className="font-semibold text-brand-500">✓ Free pre-wedding couple session — 1 hour, booked before your wedding day</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Popular Add-Ons</h3>
              <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
                <li>✓ Drone / aerial coverage</li>
                <li>✓ Pre-wedding or engagement shoot</li>
                <li>✓ Post-wedding shoot</li>
                <li>✓ Same-day highlight edit</li>
                <li>✓ Live streaming</li>
                <li>✓ 2nd photographer or videographer</li>
                <li>✓ USB drive delivery</li>
                <li>✓ Fine art prints</li>
                <li>✓ Female-only crew &amp; editor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Question-anchored FAQ — AI crawler optimized */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Common Questions About Our Packages
          </h2>
          <p className="text-foreground/60 text-lg mb-10">
            Answers to what South Asian and Muslim families ask most before booking.
          </p>
          <dl className="space-y-8">
            {[
              {
                q: "How much does a 3-day Bengali wedding cost?",
                a: "Multi-day wedding photography packages covering Mehndi/Holud, Baraat, and Walima start from $3,500. Photo + Video bundles for multi-day South Asian weddings are priced via a free consultation based on location, number of ceremonies, and crew preferences. Travel fees apply for venues outside Brooklyn and Queens.",
              },
              {
                q: "What is included in every photography or videography package?",
                a: "All packages include a professional photographer or videographer, pre-shoot consultation, backdrop and lighting setup, and digital delivery via Pixieset gallery or private video link. The Signature 12-hour package adds an on-site assistant. The Elite 16-hour package includes a 2-photographer team.",
              },
              {
                q: "How many photos do I receive from a 12-hour wedding?",
                a: "The Signature 12-hour photography package delivers 60 professionally edited high-resolution photos. The Elite 16-hour package delivers 100. Photo + Video Bundle packages deliver 150 edited photos at 12 hours and 200 at 16 hours.",
              },
              {
                q: "Is a female photographer or videographer available for Muslim or hijabi brides?",
                a: "Yes. A dedicated female photographer, videographer, and editor is available for all packages at no extra charge. We serve hijabi brides, conservative Muslim families, and gender-separated events with full modesty-aware coverage.",
              },
              {
                q: "How long does it take to receive my wedding photos and videos?",
                a: "Photos are typically delivered within 3–4 weeks. Cinematic wedding films take 6–8 weeks. We also offer a 72-Hour Sneak Peek of 10–15 edited photos within 3 days of your wedding, and a Rush Delivery add-on for 48-hour turnaround.",
              },
              {
                q: "Do you cover Bengali, Pakistani, Indian, and Muslim wedding ceremonies?",
                a: "Yes. We specialize in South Asian and Muslim weddings including Bengali, Pakistani, Indian, Sikh, Arab, and Afghan ceremonies. We cover Nikkah, Walima, Mehndi, Holud, Baraat, Akht, Bou Bhat, and multi-day wedding formats across New York, New Jersey, and Connecticut.",
              },
              {
                q: "Can I book photography and videography together as a bundle?",
                a: "Yes. Photo + Video Bundle packages run from 4-hour Essentials to 16-hour Elite full-day coverage. Every bundle includes a photographer, videographer, lighting setup, cinematic color grading, and delivery via Pixieset gallery and private video link.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                <dt className="text-lg font-bold mb-2">{q}</dt>
                <dd className="text-foreground/70 text-base leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
