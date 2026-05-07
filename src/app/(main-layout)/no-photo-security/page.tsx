import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { NoPhotoSecurityContent } from "@/components/no-photo-security/content";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: {
    absolute:
      "No-Photo Security — Private Event Coverage NY | Visual Studios & Events",
  },
  description:
    "We control and block guest cameras at your event. No unauthorised photos leave your venue. Serving high-profile families, conservative weddings, hijabi brides, and corporate events across New York, NJ, and CT.",
  keywords: [
    "no photo wedding policy ny",
    "private wedding photographer ny",
    "no phone wedding ny",
    "guest camera control wedding",
    "event privacy security ny",
    "private event photography ny",
    "no camera wedding policy",
    "hijabi bride privacy ny",
    "conservative wedding privacy",
    "event privacy management",
    "corporate event privacy ny",
    "no photography event ny",
    "block guest cameras wedding",
    "women only section privacy wedding",
    "high profile event security ny",
  ],
  alternates: { canonical: "/no-photo-security" },
  openGraph: {
    title: "No-Photo Security — Private Event Coverage | Visual Studios & Events",
    description:
      "We control and block guest cameras at your event. No unauthorised photos leave your venue — for private weddings, high-profile families, and corporate events in NY.",
    url: "https://www.visualstudioslens.com/no-photo-security",
  },
  twitter: {
    title: "No-Photo Security — Private Event Coverage | Visual Studios & Events",
    description:
      "We control and block guest cameras at your event. Privacy-first event coverage in NY, NJ, and CT.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Event Privacy & No-Photo Security",
  name: "No-Photo Security — Guest Camera Control",
  provider: { "@id": "https://www.visualstudioslens.com/#business" },
  areaServed: ["New York", "New Jersey", "Connecticut"],
  description:
    "Standalone paid service: we control and block guest cameras at private events, preventing unauthorised photography. Serving high-profile families, conservative weddings, hijabi brides, and corporate clients.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.visualstudioslens.com/no-photo-security",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can you stop guests from taking photos at our event?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our No-Photo Security team actively manages guest cameras throughout your event — from entry briefings to on-site monitoring. We politely enforce the no-photo policy, request image deletion where needed, and coordinate with your venue security.",
      },
    },
    {
      "@type": "Question",
      name: "Is No-Photo Security a separate service from photography packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. No-Photo Security is a standalone paid service line, not bundled into our photography or videography packages. Some clients hire us specifically for this — without booking any photography at all.",
      },
    },
    {
      "@type": "Question",
      name: "Can you cover gender-separated sections of a wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deploy female staff to cover women's-only sections of the event, ensuring the privacy policy is enforced with full sensitivity and without violating the gender-separation requirement.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with other photographers we have already hired?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We regularly work alongside other photographers and video crews. We brief all authorised media on the policy at the start and ensure only credentialled staff photograph restricted areas.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a guest refuses to delete an unauthorised photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We escalate to venue security and, if required, to event management. We document every incident. Physical force is never used — our approach is professional de-escalation at all times.",
      },
    },
  ],
};

export default function NoPhotoSecurityPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "No-Photo Security", path: "/no-photo-security" }])) }}
      />

      <HeroSection
        subtitle="Privacy-First Event Coverage"
        title={
          <>
            No-Photo{" "}
            <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">
              Security
            </span>
          </>
        }
        desc="We control and block guest cameras at your event. No unauthorised photos leave your venue — from entry to exit."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
      />

      <NoPhotoSecurityContent />

      {/* Static SEO section — crawlable without JS */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            No-Photo Security for Private Events in New York
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-8">
            Visual Studios &amp; Events offers No-Photo Security as a standalone paid service for
            clients who require strict photographic privacy at their events. We are based in
            Brooklyn, NY and serve events across New York, New Jersey, and Connecticut.
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed mb-8">
            This is not bundled into wedding packages — some clients hire us specifically for
            camera control, without booking any photography. We deploy trained on-site staff to
            enforce a no-photo policy throughout your venue: managing guest cameras at entry,
            monitoring throughout the event, and preventing any unauthorised images from leaving.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div>
              <h3 className="text-xl font-bold mb-3">High-Profile &amp; Celebrity Events</h3>
              <p className="text-foreground/70 leading-relaxed">
                We regularly work with high-profile families, public figures, and their private
                events in the New York area. Our staff are trained in professional discretion and
                work seamlessly alongside private security teams.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Conservative &amp; Religious Weddings</h3>
              <p className="text-foreground/70 leading-relaxed">
                Events with a women&apos;s-only section where strict photographic privacy is required.
                Female staff are available to cover the ladies&apos; side of the event, enforcing the
                no-photo policy with full cultural sensitivity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Hijabi Bride Privacy Protection</h3>
              <p className="text-foreground/70 leading-relaxed">
                Brides whose photos must not circulate beyond approved family channels. We control
                exactly who photographs the bride throughout the event and ensure no candid or
                unauthorised shots leave the venue on any guest device.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Corporate &amp; IP-Sensitive Events</h3>
              <p className="text-foreground/70 leading-relaxed">
                Product launches, board meetings, and private corporate functions where guest
                photography poses a confidentiality risk. We provide structured, professional
                camera management without disrupting the event atmosphere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Search Terms That Reach Us</h3>
              <p className="text-foreground/70 leading-relaxed">
                Clients searching for &quot;no phone wedding policy NY&quot;, &quot;private wedding photographer
                NY&quot;, &quot;block guest cameras wedding&quot;, &quot;women-only wedding section privacy&quot;, and
                &quot;corporate event photography ban NY&quot; find us through this dedicated service page.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">How to Book</h3>
              <p className="text-foreground/70 leading-relaxed">
                Contact us via the inquiry form or WhatsApp with your event date, venue, guest
                count, and privacy requirements. Custom quotes are provided within 24 hours. This
                service is priced per event based on scope, duration, and staffing requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
