import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { BtsContent } from "@/components/behind-the-scenes/bts-content";

export const metadata: Metadata = {
  title: { absolute: "Behind the Scenes | Visual Studios & Events" },
  description:
    "Go behind the lens with Visual Studios & Events. Meet our crew, female team members, and see real moments from our shoots and events in NY.",
  keywords: [
    "behind the scenes photography ny",
    "visual studios crew",
    "wedding photography behind scenes",
    "visual studios team ny",
    "south asian wedding bts",
    "visualstudioslens behind scenes",
  ],
  alternates: { canonical: "/behind-the-scenes" },
  openGraph: {
    title: "Behind the Scenes | Visual Studios & Events",
    description:
      "Meet the crew and go behind the lens with Visual Studios & Events — NY's premier wedding photo and video team.",
    url: "https://www.visualstudioslens.com/behind-the-scenes",
  },
  twitter: {
    title: "Behind the Scenes | Visual Studios & Events",
    description:
      "Meet our crew, female team members, and see real BTS moments from Visual Studios & Events in NY.",
  },
};

export default function BehindTheScenesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        subtitle="The Real Us"
        title={<>Behind the <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Scenes</span></>}
        desc="A raw, unfiltered look at the people, energy, and work that goes into every event we cover."
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
      />
      <BtsContent />
    </div>
  );
}
