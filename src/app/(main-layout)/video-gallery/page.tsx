import { Play } from "lucide-react";

export const metadata = {
  title: "Video Gallery | Visual Studio",
  description: "Cinematic videos and event coverage.",
};

export default function VideoGalleryPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Video Portfolio</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Cinematic storytelling, commercial reels, and breathtaking event coverage. 
        </p>
      </section>

      {/* Video Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Artisan Coffee Commercial", category: "Commercial", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800" },
              { title: "Emily & David Wedding", category: "Event Coverage", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800" },
              { title: "Atlas Tech Summit", category: "Corporate", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800" },
              { title: "Luxury Fashion Campaign", category: "Fashion", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800" }
            ].map((video, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-video bg-muted mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${video.img}')` }} />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                      <Play fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{video.title}</h3>
                <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mt-1">{video.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-foreground text-background font-bold tracking-widest uppercase text-sm rounded-full hover:opacity-90 inline-block transition-opacity"
            >
              View Full Channel on YouTube
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
