import Link from "next/link";
import { ArrowRight, BarChart3, Target, TrendingUp } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

export const metadata = {
  title: "Visual Marketing | Visual Studio",
  description: "Corporate branding, product shoots, and high-impact visual campaigns.",
};

export default function VisualMarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        subtitle="Corporate Branding"
        title="Visual Marketing"
        desc="We don't just take pictures. We create visual assets that drive engagement, elevate your brand, and convert audiences into customers."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
      />

      <div className="flex justify-center gap-4 mt-12 mb-8">
        <Link
          href="/contact"
          className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-opacity uppercase tracking-widest text-sm"
        >
          Start a Project
        </Link>
        <a
          href="https://visualstudionyc.pixieset.com/portfolio/"
          target="_blank" rel="noopener noreferrer"
          className="px-8 py-3 bg-transparent border border-border text-foreground font-medium rounded-full hover:bg-muted transition-colors uppercase tracking-widest text-sm"
        >
          Studio Portfolio
        </a>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 border border-border bg-background">
              <Target className="w-12 h-12 mb-6 text-muted-foreground" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Brand Photography</h3>
              <p className="text-muted-foreground">Professional headshots, team culture coverage, and narrative-driven brand stories.</p>
            </div>
            <div className="p-8 border border-border bg-background">
              <TrendingUp className="w-12 h-12 mb-6 text-muted-foreground" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Product Shoots</h3>
              <p className="text-muted-foreground">Crisp e-commerce white background imagery and styled lifestyle product shots.</p>
            </div>
            <div className="p-8 border border-border bg-background">
              <BarChart3 className="w-12 h-12 mb-6 text-muted-foreground" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Campaign Visuals</h3>
              <p className="text-muted-foreground">High-end stylized imagery tailored for ad spend, billboards, and print media.</p>
            </div>
            <div className="p-8 border border-border bg-background">
              <div className="w-12 h-12 mb-6 flex items-center justify-center font-bold text-2xl border-2 border-muted-foreground text-muted-foreground rounded-full">@</div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Social Content</h3>
              <p className="text-muted-foreground">Short-form video loops, Instagram reels, and batch-created engaging content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Case Studies</h2>
            <p className="text-muted-foreground max-w-2xl">Real results. We focus on impact, metrics, and transformation.</p>
          </div>

          <div className="space-y-24">
            {/* Case Study 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video bg-muted border border-border overflow-hidden group">
                <div className="absolute inset-0 w-1/2 border-r-2 border-white z-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800')" }} />
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=800')" }} />
                <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase z-30 tracking-widest">Before</div>
                <div className="absolute bottom-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase z-30 tracking-widest">After</div>
              </div>
              <div>
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Artisan Coffee Co.</h3>
                <p className="text-muted-foreground mb-6">
                  Revamped the entire social media aesthetic for an emerging coffee brand. Transitioned from smartphone shots to a cohesive, dark-mood styled campaign.
                </p>
                <ul className="space-y-3 font-medium">
                  <li className="flex items-center gap-3"><ArrowRight className="text-muted-foreground" size={16} /> 150% Increase in Instagram Engagement</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-muted-foreground" size={16} /> 45% Higher Ad Conversion Rate</li>
                </ul>
              </div>
            </div>

            {/* Sub-Showcase: YouTube / Video */}
            <div className="mt-20 p-12 bg-white text-black text-center">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 border-b-2 border-black inline-block pb-2">Video Production Showcase</h3>
              <p className="max-w-2xl mx-auto mb-8 mt-6">
                Dynamic, story-driven commercial videos that stop the scroll. Check out our latest commercial reel on YouTube.
              </p>
              <a
                href="https://www.youtube.com/"
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
