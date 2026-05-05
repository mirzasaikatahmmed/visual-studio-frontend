import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { StoreCategoryGrid } from "@/components/store/store-grid";
import { fetchCategories, fetchSettings } from "@/lib/storeApi";

export const metadata: Metadata = {
  title: { absolute: "Wedding Photo Albums & Prints | Visual Studios & Events" },
  description:
    "Premium wedding photo albums, canvas wall art, and fine art prints from Visual Studios & Events. Heirloom albums for South Asian & Muslim wedding memories.",
  keywords: [
    "wedding photo album ny",
    "south asian wedding album",
    "custom photo album",
    "canvas wall art wedding",
    "fine art wedding prints",
    "heirloom wedding album",
    "photo keepsakes ny",
    "visualstudioslens store",
  ],
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Wedding Photo Albums & Prints | Visual Studios & Events",
    description:
      "Premium wedding photo albums, canvas wall art, and fine art prints. Custom heirloom albums from Visual Studios & Events NY.",
    url: "https://www.visualstudioslens.com/store",
  },
  twitter: {
    title: "Wedding Photo Albums & Prints | Visual Studios & Events",
    description:
      "Premium wedding albums, canvas wall art, and fine art prints for South Asian & Muslim weddings. Heirloom quality from Visual Studios & Events NY.",
  },
};

export default async function StorePage() {
  const [categories, settings] = await Promise.all([
    fetchCategories().catch(() => []),
    fetchSettings().catch(() => ({ whatsappNumber: "" })),
  ]);

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="bg-background min-h-screen pb-24 selection:bg-brand-500/30">
      <HeroSection
        subtitle="The Print Shop"
        title={
          <>
            Preserve Your <br />
            <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">
              Legacy
            </span>
          </>
        }
        desc="Transform your digital memories into physical heirlooms. Explore our premium collection of albums, wall art, and prints crafted for a lifetime."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
      />

      <StoreCategoryGrid
        categories={sorted}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* SEO content — crawlable product descriptions */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Heirloom Quality, Built to Last</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">
            Your wedding gallery deserves more than a hard drive. Visual Studio&apos;s print shop transforms your edited
            photos into physical heirlooms — beautifully bound albums, large-format wall art, and keepsakes designed to
            last a lifetime and be passed down through generations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Wedding Photo Albums</h3>
              <p className="text-foreground/70 leading-relaxed">
                Our handcrafted lay-flat wedding albums are designed for South Asian and Muslim weddings, where a single
                event often spans multiple days and hundreds of moments. Each album is custom-designed page by page
                using your edited gallery, printed on archival-quality paper, and bound in premium linen, leather, or
                velvet covers. Starting from 20 spreads.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Canvas &amp; Metal Wall Art</h3>
              <p className="text-foreground/70 leading-relaxed">
                Turn your favorite portraits and ceremony shots into statement pieces for your home. Available in custom
                sizes from 8×10 to 40×60 inches. Options include canvas gallery wraps, acrylic face mounts, and metal
                prints — all color-matched to your edited gallery.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Fine Art Prints</h3>
              <p className="text-foreground/70 leading-relaxed">
                Individually printed on Fuji Crystal Archive paper, our fine art prints are ready for framing and sold
                as individual prints or curated sets. Perfect for displaying Bengali wedding portraits, Nikkah ceremony
                moments, or Holud candids in your home.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Coming Soon: Framing &amp; Custom Gifts</h3>
              <p className="text-foreground/70 leading-relaxed">
                We&apos;re expanding with pre-framed wall art, custom photo books, and branded wedding gift sets for
                South Asian and Muslim couples. Every product ships with a branded USB drive containing your full
                high-resolution gallery as a physical backup. Join our mailing list to be notified when new products
                launch.
              </p>
            </div>
          </div>

          <p className="mt-10 text-foreground/70 leading-relaxed">
            All orders ship within 4–6 weeks. Rush options available — inquire via WhatsApp at{" "}
            <a href="https://wa.me/13473066637" className="underline underline-offset-4 hover:text-foreground transition-colors">
              +1 (347) 306-6637
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
