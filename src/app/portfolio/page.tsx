import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Portfolio | Visual Studio",
  description: "Explore our collection of captured moments and visual experiences.",
};

const images = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541250848049-b4f714ade222?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505932646249-14a80e159670?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
];

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Our Portfolio</h1>
        <p className="text-muted-foreground text-lg">
          A curated selection of our finest work. From intimate weddings to grand corporate campaigns, 
          every photograph tells a story.
        </p>
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, idx) => (
          <div key={idx} className="break-inside-avoid relative group overflow-hidden bg-muted rounded-md">
             <div 
              className="w-full aspect-auto h-[300px] md:h-auto min-h-[250px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${src}')`, paddingBottom: idx % 3 === 0 ? "120%" : idx % 2 === 0 ? "80%" : "150%" }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white font-medium uppercase tracking-wider">View</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pixieset CTA */}
      <div className="mt-24 text-center p-12 bg-white text-black rounded-lg">
        <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Full Client Galleries</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          We deliver all our final, high-resolution images through beautiful, private online galleries powered by Pixieset. 
          View our complete, uncurated client galleries to see full event coverage.
        </p>
        <a 
          href="https://visualstudionyc.pixieset.com/portfolio/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-black/80 transition-colors uppercase tracking-widest text-sm"
        >
          Open Pixieset <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
