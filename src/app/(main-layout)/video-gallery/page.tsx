import { HeroSection } from "@/components/hero-section";
import { VideoGrid } from "@/components/video-gallery/video-grid";

export const metadata = {
  title: "Video Gallery | Visual Studio",
  description: "Cinematic videos and event coverage.",
};

export default function VideoGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection 
        subtitle="Our Films"
        title={<>Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">Portfolio</span></>}
        desc="Cinematic storytelling, commercial reels, and breathtaking event coverage."
        image="https://images.unsplash.com/photo-1528697203043-733dafdaa316?q=80&w=2000&auto=format&fit=crop"
      />

      <VideoGrid />
    </div>
  );
}
