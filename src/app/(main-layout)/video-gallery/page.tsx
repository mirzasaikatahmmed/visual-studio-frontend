import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { VideoGrid } from "@/components/video-gallery/video-grid";

export const metadata: Metadata = {
  title: "Video Gallery",
  description:
    "Explore Visual Studios & Events video gallery — cinematic wedding films, event coverage, commercial reels, and breathtaking videography that tell your story beautifully.",
  keywords: [
    "video gallery",
    "cinematic wedding films",
    "event videography",
    "commercial video production",
    "wedding video",
    "event coverage video",
    "videography portfolio",
    "cinematic reels",
    "corporate video",
    "Visual Studios & Events videography",
  ],
  alternates: { canonical: "/video-gallery" },
  openGraph: {
    title: "Video Gallery | Visual Studios & Events",
    description:
      "Cinematic wedding films, event coverage, commercial reels, and breathtaking videography from Visual Studios & Events.",
    url: "https://visualstudioslens.com/video-gallery",
  },
};

export default function VideoGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Our Films"
        title={<>Video <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Gallary</span></>}
        desc="Cinematic storytelling, commercial reels, and breathtaking event coverage."
        image="https://images.unsplash.com/photo-1528697203043-733dafdaa316?q=80&w=2000&auto=format&fit=crop"
      />

      <VideoGrid />
    </div>
  );
}



