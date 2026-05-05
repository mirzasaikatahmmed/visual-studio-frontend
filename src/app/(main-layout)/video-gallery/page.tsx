import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { VideoGrid } from "@/components/video-gallery/video-grid";

export const metadata: Metadata = {
  title: { absolute: "Cinematic Wedding Films NY | Visual Studios & Events" },
  description:
    "Watch cinematic wedding films from Bengali, Pakistani, Indian, Sikh & Muslim weddings across NY. Same-day edits and highlight reels available.",
  keywords: [
    "cinematic wedding films ny",
    "south asian wedding videographer",
    "muslim wedding video",
    "bengali wedding film",
    "pakistani wedding videographer",
    "wedding highlight reel ny",
    "same day edit wedding",
    "nikkah videographer",
    "wedding cinematography brooklyn",
    "wedding video queens",
  ],
  alternates: { canonical: "/video-gallery" },
  openGraph: {
    title: "Cinematic Wedding Films NY | Visual Studios & Events",
    description:
      "Cinematic wedding films for South Asian and Muslim weddings in NY. Same-day edits and highlight reels available.",
    url: "https://www.visualstudioslens.com/video-gallery",
  },
  twitter: {
    title: "Cinematic Wedding Films NY | Visual Studios & Events",
    description:
      "South Asian & Muslim wedding videography in NY. Cinematic highlight reels, same-day edits, and full ceremony films.",
  },
};

export default function VideoGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Our Films"
        title={<>Video <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Gallery</span></>}
        desc="Cinematic storytelling, commercial reels, and breathtaking event coverage."
        image="https://images.unsplash.com/photo-1528697203043-733dafdaa316?q=80&w=2000&auto=format&fit=crop"
      />

      <VideoGrid />
    </div>
  );
}



