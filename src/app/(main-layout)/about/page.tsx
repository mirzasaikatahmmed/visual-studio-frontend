import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { AboutContent } from "@/components/about/about-content";
import { fetchAboutContent, fetchTeamMembers, type TeamMember } from "@/lib/aboutApi";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the passionate team behind Visual Studios & Events — a creative photography and videography studio dedicated to capturing authentic moments and telling compelling visual stories.",
  keywords: [
    "about Visual Studios & Events",
    "photography team",
    "professional photographers",
    "creative studio team",
    "videography team",
    "our story",
    "photography studio about",
    "visualstudioslens team",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Visual Studios & Events",
    description:
      "Meet the passionate team behind Visual Studios & Events — dedicated to capturing authentic moments and telling compelling visual stories.",
    url: "https://visualstudioslens.com/about",
  },
};

export default async function AboutPage() {
  const [content, rawTeam] = await Promise.all([
    fetchAboutContent().catch(() => null),
    fetchTeamMembers().catch((): TeamMember[] => []),
  ]);
  const team = [...rawTeam].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Behind The Lens"
        title={<>Our <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Story</span></>}
        desc="We are visual storytellers. From grand South Asian weddings to high-end corporate campaigns, we capture the essence of every moment."
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
      />

      <AboutContent content={content} team={team} />
    </div>
  );
}
