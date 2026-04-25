"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";

interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400",
];

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts ?? []);
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const images =
    posts.length > 0
      ? posts.map((p) => ({ src: p.imageUrl, href: p.permalink }))
      : FALLBACK_IMAGES.map((src) => ({
          src,
          href: "https://www.instagram.com/visualstudioofficial/",
        }));

  return (
    <div>
      <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
        <Instagram size={28} className="text-brand-400" /> @visualstudio
      </h3>

      <div className="grid grid-cols-3 gap-2 mt-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/10 animate-pulse"
              />
            ))
          : images.map((img, i) => (
              <a
                key={i}
                href={img.href}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-cover bg-center block grayscale hover:grayscale-0 transition-all hover:scale-105 duration-500 overflow-hidden"
                style={{ backgroundImage: `url('${img.src}')` }}
                aria-label={`Instagram post ${i + 1}`}
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
