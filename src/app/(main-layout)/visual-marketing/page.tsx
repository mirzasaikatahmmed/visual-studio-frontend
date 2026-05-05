import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MarketingContent } from "@/components/visual-marketing/marketing-content";

export const metadata: Metadata = {
  title: { absolute: "Visual Marketing & Brand Photography NY | Visual Studio" },
  description:
    "Corporate branding photography, product shoots, and commercial video for NY businesses. High-impact visual assets that elevate your brand identity.",
  keywords: [
    "visual marketing ny",
    "brand photography ny",
    "corporate photography ny",
    "product photography ny",
    "social media content photography",
    "commercial video production ny",
    "business photography brooklyn",
    "brand identity photography",
    "visualstudioslens marketing",
  ],
  alternates: { canonical: "/visual-marketing" },
  openGraph: {
    title: "Visual Marketing & Brand Photography NY | Visual Studio",
    description:
      "Corporate branding photography, product shoots, and commercial video for NY businesses. High-impact visual assets by Visual Studio.",
    url: "https://www.visualstudioslens.com/visual-marketing",
  },
  twitter: {
    title: "Visual Marketing & Brand Photography NY | Visual Studio",
    description:
      "Brand photography, product shoots, and commercial video for NY businesses. Visual Studio elevates your brand identity.",
  },
};

export default function VisualMarketingPage() {
  return (
    <div className="dark bg-background text-foreground flex flex-col min-h-screen">
      <HeroSection
        subtitle="Corporate Branding"
        title={<>Visual <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 ml-1 md:ml-3">Marketing</span></>}
        desc="We don't just take pictures. We create visual assets that drive engagement, elevate your brand, and convert audiences into customers."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
      />

      {/* SEO content — crawlable text about commercial services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Commercial Photography &amp; Video for NY Businesses</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">
            Visual Studio&apos;s commercial arm serves New York businesses that need professional photography and video
            to compete in a visual-first market. We&apos;ve worked with startups, established brands, and everything in
            between — delivering imagery that&apos;s ready for websites, campaigns, social media, and print.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Brand Photography</h3>
              <p className="text-foreground/70 leading-relaxed">
                Your brand deserves a visual identity that matches the quality of your product or service. We produce
                clean, consistent, on-brand photography for websites, pitch decks, and advertising — shot in our
                Brooklyn studio or on location across New York City.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Product Photography</h3>
              <p className="text-foreground/70 leading-relaxed">
                Flat lays, lifestyle shots, and detailed close-ups optimized for e-commerce. Whether you&apos;re
                selling on Shopify, Amazon, or a custom DTC site, our product photography in Brooklyn is built to
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
              <h3 className="text-xl font-bold mb-3">Corporate Headshots &amp; Team Photography</h3>
              <p className="text-foreground/70 leading-relaxed">
                First impressions happen online. Our corporate headshot sessions across NY deliver consistent,
                polished portraits for LinkedIn profiles, company pages, and press kits. Group sessions available
                for full teams at your office or our Brooklyn studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarketingContent />
    </div>
  );
}



