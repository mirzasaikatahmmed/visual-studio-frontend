import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { AboutContent } from "@/components/about/about-content";
import { fetchAboutContent, fetchTeamMembers, type TeamMember } from "@/lib/aboutApi";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ReviewStrip } from "@/components/reviews/review-strip";

export const metadata: Metadata = {
  title: { absolute: "About Visual Studios & Events | South Asian Wedding Photographers NY" },
  description:
    "Meet the Visual Studios & Events team — South Asian & Muslim wedding photographers in Brooklyn, NY. Fluent in Bengali, Pakistani, Indian, and Arab traditions.",
  keywords: [
    "south asian wedding photographers ny",
    "muslim wedding photography team",
    "bengali photographer brooklyn",
    "about visual studio ny",
    "female photographer available",
    "wedding photography studio brooklyn",
    "visualstudioslens about",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Visual Studios & Events | South Asian Wedding Photographers NY",
    description:
      "Meet the Visual Studios & Events team — South Asian & Muslim wedding photographers in Brooklyn, NY. Fluent in Bengali, Pakistani, Indian, and Arab traditions.",
    url: "https://www.visualstudioslens.com/about",
  },
  twitter: {
    title: "About Visual Studios & Events | South Asian Wedding Photographers NY",
    description:
      "Meet the Visual Studios & Events team — South Asian & Muslim wedding photographers in Brooklyn, NY. Fluent in Bengali, Pakistani, Indian, and Arab traditions.",
  },
};

export default async function AboutPage() {
  const [content, rawTeam] = await Promise.all([
    fetchAboutContent().catch(() => null),
    fetchTeamMembers().catch((): TeamMember[] => []),
  ]);
  const team = [...rawTeam].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "About", path: "/about" }])) }}
      />
      <HeroSection
        subtitle="Behind The Lens"
        title={<>Our <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Story</span></>}
        desc="We are visual storytellers. From grand South Asian weddings to high-end corporate campaigns, we capture the essence of every moment."
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
      />

      <AboutContent content={content} team={team} />

      <ReviewStrip />

      {/* Partners & Services section */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Partners &amp; Services</h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10">
            Visual Studios &amp; Events works alongside a trusted network of wedding vendors so you can plan your
            entire event in one place. From stage &amp; decorations to catering, henna, DJs, and luxury
            transportation — all bookable together at bundle rates.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              "Stage & Decorations",
              "Henna / Mendhi",
              "DJ & MCs",
              "Cakes & Desserts",
              "360 & Photo Booths",
              "Bridal Makeup & Hair",
              "Catering",
              "Qaris & Imams",
              "Luxury Transportation",
              "Venue Bookings",
              "Album Books",
              "No-Photo Security",
            ].map((service) => (
              <div key={service} className="px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground/80">
                {service}
              </div>
            ))}
          </div>
          <a
            href="/more-services"
            className="inline-block px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
          >
            View All Partner Services →
          </a>
        </div>
      </section>
    </div>
  );
}
