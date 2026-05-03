import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Ready to book a photography or videography session? Contact Visual Studios & Events to request a quote, check availability, or ask about our packages for weddings, events, and corporate shoots.",
  keywords: [
    "book photography session",
    "contact Visual Studios & Events",
    "photography booking",
    "request a quote",
    "wedding photographer booking",
    "event photographer contact",
    "videography booking",
    "photo session inquiry",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Booking | Visual Studios & Events",
    description:
      "Book a photography or videography session, request a quote, or ask about our packages for weddings, events, and corporate shoots.",
    url: "https://visualstudioslens.com/contact",
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



