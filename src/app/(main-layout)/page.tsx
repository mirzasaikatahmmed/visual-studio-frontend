import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "Visual Studios & Events | Photography | Videography",
  description:
    "Visual Studios & Events is a professional photography and videography studio capturing weddings, events, portraits, and brand stories with cinematic quality. Book your session today.",
  keywords: [
    "Visual Studios & Events",
    "photography studio",
    "professional photographer",
    "wedding photography",
    "event photography",
    "portrait photography",
    "videography studio",
    "cinematic video",
    "visualstudioslens",
    "book photography session",
    "creative photography",
    "event videographer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Visual Studios & Events | Photography | Videography",
    description:
      "Capturing weddings, events, portraits, and brand stories with cinematic quality. Book your session today.",
    url: "https://visualstudioslens.com",
  },
};
import { ExpertiseSection } from "@/components/home/expertise-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BookingSection } from "@/components/home/booking-section";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <BookingSection />
      <FaqSection />
    </div>
  );
}


