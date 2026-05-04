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
    default: "South Asian & Muslim Wedding Photographer NYC | Visual Studio",
    template: "%s | Visual Studio",
  },
  description:
    "Visual Studio captures Bengali, Pakistani, Indian, Sikh, and Muslim weddings in NYC and the tri-state area. Cinematic films, female crew available, destination travel. Based in Brooklyn, NY.",
  keywords: [
    "south asian wedding photographer nyc",
    "muslim wedding photographer nyc",
    "bengali wedding photographer",
    "pakistani wedding photographer",
    "indian wedding photographer nyc",
    "sikh wedding photographer",
    "cinematic wedding videographer nyc",
    "female wedding photographer nyc",
    "nikkah photographer",
    "holud photographer",
    "baraat photographer",
    "wedding photographer brooklyn",
    "wedding photographer queens",
    "south asian wedding videography",
    "Visual Studio",
    "visualstudioslens",
  ],
  authors: [{ name: "Visual Studio" }],
  creator: "Visual Studio",
  publisher: "Visual Studio",
  metadataBase: new URL("https://www.visualstudioslens.com"),
  alternates: {
    canonical: "https://www.visualstudioslens.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.visualstudioslens.com",
    siteName: "Visual Studio",
    title: "South Asian & Muslim Wedding Photographer NYC | Visual Studio",
    description:
      "Cinematic wedding photography & videography for Bengali, Pakistani, Indian, Sikh, and Muslim weddings in NYC and the tri-state area. Female crew available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "South Asian wedding photography by Visual Studio NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Asian & Muslim Wedding Photographer NYC | Visual Studio",
    description:
      "Cinematic wedding photography & videography for Bengali, Pakistani, Indian, Sikh, and Muslim weddings in NYC. Female crew available.",
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
  "@type": "PhotographyBusiness",
  "@id": "https://www.visualstudioslens.com",
  "name": "Visual Studio",
  "alternateName": "Visual Studios & Events",
  "image": "https://www.visualstudioslens.com/logo.png",
  "url": "https://www.visualstudioslens.com",
  "telephone": "+1-347-306-6637",
  "email": "lens@visualstudioslens.com",
  "priceRange": "$$$",
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
  "areaServed": [
    { "@type": "City", "name": "New York City" },
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Queens" },
    { "@type": "City", "name": "Long Island" },
    { "@type": "State", "name": "New Jersey" },
    { "@type": "State", "name": "Connecticut" },
  ],
  "description": "South Asian and Muslim wedding photography and cinematography studio based in Brooklyn, NY. Bengali, Pakistani, Indian, Sikh, and Arab weddings. Female crew available on request.",
  "makesOffer": {
    "@type": "Offer",
    "name": "Photography Sessions",
    "price": "499.00",
    "priceCurrency": "USD",
  },
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
  ],
  "sameAs": [
    "https://www.instagram.com/visualstudioofficial/",
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
