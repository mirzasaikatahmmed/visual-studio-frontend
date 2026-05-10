import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";

export const metadata: Metadata = {
  title: { absolute: "Client Testimonials | Visual Studios & Events" },
  description:
    "Real reviews from South Asian & Muslim families who trusted Visual Studios & Events for their wedding photography and videography in New York.",
  keywords: [
    "visual studios reviews",
    "south asian wedding photographer reviews",
    "muslim wedding photographer testimonials",
    "visual studios events testimonials",
    "wedding photographer brooklyn reviews",
  ],
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials | Visual Studios & Events",
    description:
      "Real reviews from South Asian & Muslim families who trusted Visual Studios & Events for their wedding photography and videography in New York.",
    url: "https://www.visualstudioslens.com/testimonials",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
