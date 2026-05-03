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
    default: "Visual Studios & Events | Photography | Videography",
    template: "%s | Visual Studios & Events",
  },
  description:
    "Visual Studios & Events is a professional photography and videography studio specializing in wedding photography, event coverage, corporate branding, portrait sessions, and cinematic video production. Capturing moments. Creating experiences.",
  keywords: [
    "Visual Studios & Events",
    "visualstudioslens",
    "professional photography",
    "wedding photography",
    "event photography",
    "videography",
    "cinematic video",
    "portrait photography",
    "corporate photography",
    "commercial photography",
    "visual marketing",
    "product photography",
    "event coverage",
    "photo studio",
    "creative studio",
    "photography studio",
    "professional photographer",
    "wedding videographer",
    "branding photography",
    "event videographer",
  ],
  authors: [{ name: "Visual Studios & Events" }],
  creator: "Visual Studios & Events",
  publisher: "Visual Studios & Events",
  metadataBase: new URL("https://visualstudioslens.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://visualstudioslens.com",
    siteName: "Visual Studios & Events",
    title: "Visual Studios & Events | Photography | Videography",
    description:
      "Professional photography & videography studio specializing in weddings, events, portraits, corporate branding, and cinematic video production.",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Visual Studios & Events – Professional Photography & Videography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Studios & Events | Photography | Videography",
    description:
      "Professional photography & videography studio specializing in weddings, events, portraits, corporate branding, and cinematic video production.",
    images: ["/hero-bg.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
