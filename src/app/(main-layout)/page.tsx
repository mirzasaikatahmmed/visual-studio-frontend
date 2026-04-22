import { HeroSection } from "@/components/home/hero-section";
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


