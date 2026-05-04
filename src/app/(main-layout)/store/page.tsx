import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { StoreCategoryGrid } from "@/components/store/store-grid";
import { fetchCategories, fetchSettings } from "@/lib/storeApi";

export const metadata: Metadata = {
  title: "Wedding Photo Albums & Prints | Visual Studio",
  description:
    "Order premium wedding photo albums, canvas wall art, and fine art prints from Visual Studio. Custom heirloom albums crafted to preserve your South Asian or Muslim wedding memories forever.",
  keywords: [
    "wedding photo album nyc",
    "south asian wedding album",
    "custom photo album",
    "canvas wall art wedding",
    "fine art wedding prints",
    "heirloom wedding album",
    "photo keepsakes nyc",
    "visualstudioslens store",
  ],
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Wedding Photo Albums & Prints | Visual Studio",
    description:
      "Premium wedding photo albums, canvas wall art, and fine art prints. Custom heirloom albums from Visual Studio NYC.",
    url: "https://www.visualstudioslens.com/store",
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
    </div>
  );
}
