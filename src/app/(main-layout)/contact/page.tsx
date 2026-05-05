import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: { absolute: "Book Your Wedding Photographer NY | Visual Studio" },
  description:
    "Book Visual Studio for your South Asian or Muslim wedding in NY. Check availability, get a free consultation, or ask about our packages.",
  keywords: [
    "book wedding photographer ny",
    "south asian wedding photographer contact",
    "muslim wedding photography inquiry",
    "wedding photography consultation ny",
    "book bengali wedding photographer",
    "book pakistani wedding photographer",
    "wedding videographer booking ny",
    "visualstudioslens contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book Your Wedding Photographer NY | Visual Studio",
    description:
      "Contact Visual Studio to book your South Asian or Muslim wedding in NY. Free consultation — check availability today.",
    url: "https://www.visualstudioslens.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        subtitle="Book A Session"
        title={<>Get In <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Touch</span></>}
        desc="Whether you're ready to book a session, need a custom quote, or just have a few questions, our team is here to help."
        image="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2000&auto=format&fit=crop"
      />

      <ContactContent />
    </div>
  );
}



