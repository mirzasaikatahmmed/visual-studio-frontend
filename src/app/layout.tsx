import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { Preloader } from "@/components/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events",
    template: "%s | Visual Studios & Events",
  },
  description:
    "South Asian & Muslim wedding photographers in NY. Cinematic films, female crew available. Bengali, Pakistani, Indian, Sikh & Nikkah. Brooklyn-based.",
  keywords: [
    "south asian wedding photographer ny",
    "muslim wedding photographer ny",
    "bengali wedding photographer",
    "pakistani wedding photographer",
    "indian wedding photographer ny",
    "sikh wedding photographer",
    "cinematic wedding videographer ny",
    "female wedding photographer ny",
    "nikkah photographer",
    "holud photographer",
    "baraat photographer",
    "wedding photographer brooklyn",
    "wedding photographer queens",
    "south asian wedding videography",
    "Visual Studios & Events",
    "visualstudioslens",
  ],
  authors: [{ name: "Visual Studios & Events" }],
  creator: "Visual Studios & Events",
  publisher: "Visual Studios & Events",
  metadataBase: new URL("https://www.visualstudioslens.com"),
  alternates: {
    canonical: "https://www.visualstudioslens.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.visualstudioslens.com",
    siteName: "Visual Studios & Events",
    title: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events",
    description:
      "Cinematic wedding photography & videography for Bengali, Pakistani, Indian, Sikh, and Muslim weddings in NY and the tri-state area. Female crew available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "South Asian wedding photography by Visual Studios & Events NY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Asian & Muslim Wedding Photographer NY | Visual Studios & Events",
    description:
      "Cinematic wedding photography & videography for Bengali, Pakistani, Indian, Sikh, and Muslim weddings in NY. Female crew available.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.visualstudioslens.com/#business",
  "name": "Visual Studios & Events",
  "legalName": "Visual Inked LLC",
  "alternateName": "Visual Studios",
  "image": "https://www.visualstudioslens.com/logo.png",
  "logo": "https://www.visualstudioslens.com/logo.png",
  "url": "https://www.visualstudioslens.com",
  "telephone": "+1-347-306-6637",
  "email": "lens@visualstudioslens.com",
  "priceRange": "$$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Zelle, Venmo",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1097 Liberty Avenue",
    "addressLocality": "Brooklyn",
    "addressRegion": "NY",
    "postalCode": "11208",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.678613,
    "longitude": -73.868806,
  },
  "hasMap": "https://www.google.com/maps/place/Visual+Studios+%26+Events+%7C+Photography+%7C+Videography/@40.678613,-73.868806,17z",
  "areaServed": [
    { "@type": "City", "name": "New York City" },
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Queens" },
    { "@type": "City", "name": "Manhattan" },
    { "@type": "City", "name": "Long Island" },
    { "@type": "State", "name": "New Jersey" },
    { "@type": "State", "name": "Connecticut" },
  ],
  "description": "South Asian and Muslim wedding photography and cinematography studio based in Brooklyn, NY. Bengali, Pakistani, Indian, Sikh, and Arab weddings. Female crew available on request.",
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Event Session Photography",
      "price": "499.00",
      "priceCurrency": "USD",
    },
    {
      "@type": "Offer",
      "name": "1-Day Wedding Coverage",
      "price": "1400.00",
      "priceCurrency": "USD",
    },
  ],
  "knowsAbout": [
    "Muslim Weddings",
    "South Asian Weddings",
    "Bengali Weddings",
    "Pakistani Weddings",
    "Indian Weddings",
    "Sikh Weddings",
    "Afghan Weddings",
    "Arab Weddings",
    "Nikkah Photography",
    "Mehndi Photography",
    "Walima Photography",
    "No-Photo Security",
    "Visual Marketing",
  ],
  "sameAs": [
    "https://www.instagram.com/visualstudioofficial/",
    "https://www.facebook.com/visualstudioslens",
    "https://www.youtube.com/@visualstudioslens",
    "https://www.tiktok.com/@visualstudioslens",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "6",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Zainab R." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Visual Studios captured our Nikkah and Walima better than we could have imagined. The female photographer made my entire family feel at ease — especially during the women-only Mehndi. I cry every time I rewatch the film.",
      "datePublished": "2025-02-14",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Fatima A." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "From our Holud to the Walima, every single moment was captured beautifully. The team was so respectful of our traditions and the editing was absolutely stunning.",
      "datePublished": "2025-03-08",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Malaika S." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "I was nervous about having cameras everywhere, but the Visual Studios team made everyone comfortable. The cinematic film made my parents cry happy tears — we watch it every anniversary.",
      "datePublished": "2025-04-20",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Nasheed K." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "The no-music edit was exactly what we needed. The film is so beautiful and we can share it with our entire extended family without concern. Completely exceeded expectations.",
      "datePublished": "2025-05-03",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "They captured our Baraat perfectly — the energy, the colors, every emotional moment. Absolutely no regrets. We still watch the highlight reel every year.",
      "datePublished": "2025-06-11",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ayesha T." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "The 72-hour sneak peek was the best surprise. We were still in honeymoon mode when those first photos arrived. Absolutely perfect — every shot better than the last.",
      "datePublished": "2025-07-19",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.visualstudioslens.com/#organization",
  "name": "Visual Studios & Events",
  "legalName": "Visual Inked LLC",
  "url": "https://www.visualstudioslens.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.visualstudioslens.com/logo.png",
    "width": 200,
    "height": 200,
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-347-306-6637",
    "contactType": "customer service",
    "email": "lens@visualstudioslens.com",
    "areaServed": ["US"],
    "availableLanguage": ["English", "Bengali", "Urdu"],
  },
  "sameAs": [
    "https://www.instagram.com/visualstudioofficial/",
    "https://www.facebook.com/visualstudioslens",
    "https://www.youtube.com/@visualstudioslens",
    "https://www.tiktok.com/@visualstudioslens",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          <LenisProvider>

            <main className="">{children}</main>

          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
