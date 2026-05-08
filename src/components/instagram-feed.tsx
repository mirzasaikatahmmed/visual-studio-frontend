"use client";

import { ArrowUpRight, Instagram } from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400",
];

export function InstagramFeed() {
  const images = FALLBACK_IMAGES.map((src) => ({
    src,
    href: "https://www.instagram.com/visualstudioofficial/",
  }));

  return (
    <div>
      <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
        <Instagram size={28} className="text-brand-400" /> @visualstudio
      </h3>

      <div className="grid grid-cols-3 gap-2 mt-8">
        {images.map((img, i) => (
          <a
                key={i}
                href={img.href}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-cover bg-center block grayscale hover:grayscale-0 transition-all hover:scale-105 duration-500 overflow-hidden"
                style={{ backgroundImage: `url('${img.src}')` }}
                aria-label={`View Visual Studios & Events wedding photo on Instagram — post ${i + 1}`}
              />
            ))}
      </div>

      <a
        href="https://www.instagram.com/visualstudioofficial/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 font-bold tracking-widest uppercase text-sm border-b border-foreground pb-1 hover:text-brand-400 hover:border-brand-400 transition-colors"
      >
        Follow on Instagram <ArrowUpRight size={16} />
      </a>
    </div>
  );
}