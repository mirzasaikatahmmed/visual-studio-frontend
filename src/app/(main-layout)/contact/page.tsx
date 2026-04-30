import { HeroSection } from "@/components/hero-section";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata = {
  title: "Contact & Booking | Visual Studio",
  description: "Get in touch to book a session or request a quote.",
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



