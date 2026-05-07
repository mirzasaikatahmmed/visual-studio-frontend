import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MarketingContent } from "@/components/visual-marketing/marketing-content";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const visualMarketingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Visual Marketing & Commercial Photo and Video",
  "name": "Visual Marketing — Brand Photo, Video & Website Build",
  "provider": { "@id": "https://www.visualstudioslens.com/#business" },
  "areaServed": ["New York", "New Jersey", "Connecticut"],
  "description": "Commercial branding photo and video, product shoots, social content, corporate headshots, and custom website builds for New York businesses.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.visualstudioslens.com/visual-marketing",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Visual Marketing Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Brand Photo & Video Package" },
      { "@type": "Offer", "name": "Product Photography" },
      { "@type": "Offer", "name": "Social Media Content (Reels, TikTok)" },
      { "@type": "Offer", "name": "Corporate Headshots & Team Photos" },
      { "@type": "Offer", "name": "Custom Website Build (Next.js)" },
      { "@type": "Offer", "name": "Google Business Setup & Branding" },
    ],
  },
};

export const metadata: Metadata = {
  title: { absolute: "Visual Marketing & Brand Photo and Video NY | Visual Studios & Events" },
  description:
    "Corporate branding photo and video, product shoots, and commercial content for NY businesses. High-impact visual assets that elevate your brand identity.",
  keywords: [
    "visual marketing ny",
    "brand photo and video ny",
    "corporate photo and video ny",
    "product photo ny",
    "social media content photo and video",
    "commercial video production ny",
    "business photo and video brooklyn",
    "brand identity photo and video",
    "visualstudioslens marketing",
  ],
  alternates: { canonical: "/visual-marketing" },
  openGraph: {
    title: "Visual Marketing & Brand Photo and Video NY | Visual Studios & Events",
    description:
      "Corporate branding photo and video, product shoots, and commercial content for NY businesses. High-impact visual assets by Visual Studios & Events.",
    url: "https://www.visualstudioslens.com/visual-marketing",
  },
  twitter: {
    title: "Visual Marketing & Brand Photo and Video NY | Visual Studios & Events",
    description:
      "Brand photo and video, product shoots, and commercial content for NY businesses. Visual Studios & Events elevates your brand identity.",
  },
};

const websiteBuildServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Custom Website Design and Development",
  "name": "Custom Website Build — New York Businesses",
  "provider": { "@id": "https://www.visualstudioslens.com/#business" },
  "areaServed": ["New York", "New Jersey", "Connecticut"],
  "description": "Custom Next.js website builds for New York small businesses, restaurants, service providers, and event companies. SEO-optimised, mobile-first, with structured data and schema markup. Delivered alongside brand photography and video assets.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.visualstudioslens.com/visual-marketing",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Website Build Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Single-Page Business Website (Next.js)" },
      { "@type": "Offer", "name": "Multi-Page Brand Website with CMS" },
      { "@type": "Offer", "name": "E-Commerce Website (Shopify / Next.js)" },
      { "@type": "Offer", "name": "SEO Optimisation & Schema Markup" },
      { "@type": "Offer", "name": "Website + Brand Photo & Video Bundle" },
    ],
  },
};

const businessSetupServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Google Business Profile Setup and Brand Identity",
  "name": "Google Business Setup & Branding — New York",
  "provider": { "@id": "https://www.visualstudioslens.com/#business" },
  "areaServed": ["New York", "New Jersey", "Connecticut"],
  "description": "Google Business Profile setup, optimisation, and brand identity packages for New York small businesses. Includes logo design, brand color guidelines, professional business photography, and review management setup.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.visualstudioslens.com/visual-marketing",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Setup Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Google Business Profile Setup & Optimisation" },
      { "@type": "Offer", "name": "Logo Design & Brand Identity Kit" },
      { "@type": "Offer", "name": "Professional Business Photography" },
      { "@type": "Offer", "name": "Review Management Setup" },
      { "@type": "Offer", "name": "Social Media Profile Branding" },
    ],
  },
};

export default function VisualMarketingPage() {
  return (
    <div className="dark bg-background text-foreground flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visualMarketingServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteBuildServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSetupServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Visual Marketing", path: "/visual-marketing" }])) }}
      />
      <HeroSection
        subtitle="Corporate Branding"
        title={<>Visual <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 ml-1 md:ml-3">Marketing</span></>}
        desc="We don't just take pictures. We create visual assets that drive engagement, elevate your brand, and convert audiences into customers."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
      />

      {/* SEO content — crawlable text about commercial services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Commercial Photo &amp; Video for NY Businesses</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">
            Visual Studio&apos;s commercial arm serves New York businesses that need professional photo and video
            to compete in a visual-first market. We&apos;ve worked with startups, established brands, and everything in
            between — delivering imagery that&apos;s ready for websites, campaigns, social media, and print.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Brand Photo &amp; Video</h3>
              <p className="text-foreground/70 leading-relaxed">
                Your brand deserves a visual identity that matches the quality of your product or service. We produce
                clean, consistent, on-brand photo and video for websites, pitch decks, and advertising — shot in our
                Brooklyn studio or on location across New York City.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Product Photo</h3>
              <p className="text-foreground/70 leading-relaxed">
                Flat lays, lifestyle shots, and detailed close-ups optimized for e-commerce. Whether you&apos;re
                selling on Shopify, Amazon, or a custom DTC site, our product photo in Brooklyn is built to
                convert browsers into buyers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Commercial Video &amp; Social Content</h3>
              <p className="text-foreground/70 leading-relaxed">
                Short-form video for Instagram Reels and TikTok. Long-form brand films. Testimonial videos. We handle
                scripting, shooting, and editing — delivering ready-to-post content tailored to your platform and
                audience in the New York market.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Corporate Headshots &amp; Team Photos</h3>
              <p className="text-foreground/70 leading-relaxed">
                First impressions happen online. Our corporate headshot sessions across NY deliver consistent,
                polished portraits for LinkedIn profiles, company pages, and press kits. Group sessions available
                for full teams at your office or our Brooklyn studio.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">What&apos;s Included in Every Commercial Project</h3>
              <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
                <li>✓ Pre-production planning and shot list</li>
                <li>✓ Professional lighting and audio setup</li>
                <li>✓ On-site art direction</li>
                <li>✓ Post-production editing and color grading</li>
                <li>✓ Web-optimized and full-resolution file delivery</li>
                <li>✓ Commercial use license</li>
                <li>✓ Revisions included</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Visual Marketing Services</h3>
              <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
                <li>✓ Brand photo &amp; video packages</li>
                <li>✓ Product photography — e-commerce, lifestyle, studio</li>
                <li>✓ Short-form social content (Reels, TikTok, YouTube Shorts)</li>
                <li>✓ Corporate headshots &amp; team photos</li>
                <li>✓ Testimonial video production</li>
                <li>✓ Custom website build (Next.js, SEO &amp; schema)</li>
                <li>✓ Google Business setup &amp; branding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <MarketingContent />
    </div>
  );
}



