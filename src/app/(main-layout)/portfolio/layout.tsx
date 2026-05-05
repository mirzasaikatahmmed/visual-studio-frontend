import type { Metadata } from "next";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Photography and Cinematography",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Visual Studios & Events",
    "url": "https://www.visualstudioslens.com",
  },
  "areaServed": "New York Tri-State Area",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Photography Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bengali Wedding Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pakistani Wedding Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Indian Wedding Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Muslim Nikkah Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mehndi & Holud Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Walima Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Anand Karaj Photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cinematic Wedding Filmmaking" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drone Wedding Coverage" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Engagement & Pre-Wedding Sessions" } },
    ],
  },
};

export const metadata: Metadata = {
  title: { absolute: "South Asian Wedding Photography Portfolio | Visual Studios & Events" },
  description:
    "Browse Visual Studios & Events' portfolio — Bengali, Pakistani, Indian, Sikh & Muslim weddings in NY. Cinematic and documentary wedding photography.",
  keywords: [
    "south asian wedding photography portfolio",
    "bengali wedding photos ny",
    "pakistani wedding photography portfolio",
    "indian wedding photographer portfolio",
    "muslim wedding photography ny",
    "sikh wedding photos",
    "holud photography",
    "nikkah photography",
    "baraat photos ny",
    "wedding photographer brooklyn portfolio",
    "cinematic wedding photography",
    "visualstudioslens portfolio",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "South Asian Wedding Photography Portfolio | Visual Studios & Events",
    description:
      "Cinematic wedding photography portfolio featuring Bengali, Pakistani, Indian, Sikh, and Muslim weddings across NY and the tri-state area.",
    url: "https://www.visualstudioslens.com/portfolio",
  },
  twitter: {
    title: "South Asian Wedding Photography Portfolio | Visual Studios & Events",
    description:
      "Bengali, Pakistani, Indian, Sikh & Muslim wedding photography portfolio. Cinematic and documentary style — Visual Studios & Events NY.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
