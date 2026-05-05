import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";
import { fetchServices } from "@/lib/servicesApi";

export const metadata: Metadata = {
  title: { absolute: "Wedding Services: Photography & Video | Visual Studio" },
  description:
    "Visual Studio's wedding services: drone coverage, engagement sessions, same-day edits, and photo booths for South Asian & Muslim weddings in NY.",
  keywords: [
    "south asian wedding services ny",
    "drone wedding photography ny",
    "wedding add-on services",
    "engagement session ny",
    "same day edit wedding",
    "nikkah only coverage",
    "photo booth wedding ny",
    "wedding vendor ny",
    "visualstudioslens services",
  ],
  alternates: { canonical: "/more-services" },
  openGraph: {
    title: "Wedding Services: Photography & Video | Visual Studio",
    description:
      "Drone coverage, engagement sessions, same-day edits, and partner vendors for South Asian and Muslim weddings in NY.",
    url: "https://www.visualstudioslens.com/more-services",
  },
  twitter: {
    title: "Wedding Services: Photography & Video | Visual Studio",
    description:
      "Drone coverage, engagement sessions, same-day edits, and partner vendors for South Asian & Muslim weddings in NY.",
  },
};

export default async function MoreServicesPage() {
  const services = await fetchServices().catch(() => []);
  const sorted = [...services].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Additional Options"
        title={<>More <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Services</span></>}
        desc="Here are some of our additional options from our partners! We have some of the best teams & vendors to make your dream come true! Get our full packages with unbeatable prices when booked all together!"
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />

      <MoreServicesGrid services={sorted} />

      {/* SEO content — crawlable text about non-wedding services */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Beyond the Wedding Day</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">
            Visual Studio captures more than weddings. From the first flutter of a maternity shoot to the joyful chaos
            of a first birthday, we bring the same cinematic eye and cultural sensitivity to every milestone in between.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Maternity &amp; Baby Showers</h3>
              <p className="text-foreground/70 leading-relaxed">
                Pregnancy is a story worth telling beautifully. Our maternity sessions are designed for South Asian and
                Muslim families who want to honor this chapter with imagery that feels personal, not generic. We also
                photograph baby shower celebrations — from intimate gatherings to elaborate Godh Bharai ceremonies —
                with full photo and video coverage available across Brooklyn, Queens, and the tri-state area.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Birthday &amp; Milestone Events</h3>
              <p className="text-foreground/70 leading-relaxed">
                Whether it&apos;s a first birthday Ameen, a sweet sixteen, or a milestone anniversary party, we treat
                every event like a full production. We cover the décor, the cake cutting, the speeches, and the candid
                moments in between — delivered through a private online gallery with print rights included.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Corporate Events &amp; Headshots</h3>
              <p className="text-foreground/70 leading-relaxed">
                Looking for professional event photography or executive headshots in Brooklyn or Queens? Visual Studio
                provides polished, on-brand imagery for business conferences, product launches, company parties, and
                LinkedIn-ready headshot sessions. Group team sessions available on location or in our studio.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Family &amp; Portrait Sessions</h3>
              <p className="text-foreground/70 leading-relaxed">
                We offer standalone family portrait sessions at locations across New York — from Prospect Park to
                outdoor studio setups. Sessions are available year-round and can be styled around cultural dress,
                religious attire, or a look you love. Perfect for Eid portraits, holiday cards, and family reunions.
              </p>
            </div>
          </div>

          <p className="mt-10 text-foreground/70 leading-relaxed">
            All sessions include professional editing, a private online gallery, and printing rights. Packages start
            at $499. Contact us to build a custom quote for your event.
          </p>
        </div>
      </section>
    </div>
  );
}
