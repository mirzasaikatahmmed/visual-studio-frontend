import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { StoreCategoryGrid } from "@/components/store/store-grid";
import { fetchCategories, fetchSettings } from "@/lib/storeApi";

export const metadata: Metadata = {
  title: "Print Store",
  description:
    "Shop Visual Studios & Events print store for premium photo albums, canvas wall art, fine art prints, and custom photo products — beautifully crafted keepsakes designed to last a lifetime.",
  keywords: [
    "photo print store",
    "premium photo albums",
    "canvas wall art",
    "fine art prints",
    "custom photo products",
    "wedding photo album",
    "photo gifts",
    "wall art prints",
    "photo keepsakes",
    "Visual Studios & Events print store",
  ],
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Print Store | Visual Studios & Events",
    description:
      "Premium photo albums, canvas wall art, fine art prints, and custom photo products crafted to last a lifetime.",
    url: "https://visualstudioslens.com/store",
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
