"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const CREW_PHOTOS = [
  { id: 1, url: "https://visualstudioslens.saikat.com.bd/api/uploads/16a39ee1-5e8a-4737-8409-815c13a868ab.PNG", caption: "On Set — Pre-Shoot Setup" },
  { id: 2, url: "https://visualstudioslens.saikat.com.bd/api/uploads/4003aaf6-3e2e-4815-b1e2-10346e5ee34b.PNG", caption: "Locking the Shot" },
  { id: 3, url: "https://visualstudioslens.saikat.com.bd/api/uploads/a1b7ab26-fbfe-411f-bea1-2ec5e1da459d.PNG", caption: "Crew Coordination" },
  { id: 4, url: "https://visualstudioslens.saikat.com.bd/api/uploads/11ab3b28-13e9-4a30-aced-623120a3cad3.PNG", caption: "Behind the Lens" },
  { id: 5, url: "https://visualstudioslens.saikat.com.bd/api/uploads/b98f8827-13eb-4dd7-b56a-467858b979b4.PNG", caption: "Team Briefing" },
  { id: 6, url: "https://visualstudioslens.saikat.com.bd/api/uploads/86ecd491-b24d-475e-bd0d-089ca5ac0249.PNG", caption: "Full Crew — Event Day" },
  { id: 7, url: "https://visualstudioslens.saikat.com.bd/api/uploads/d2f85c4a-fee5-4214-9003-94c3f36931dc.PNG", caption: "Setting Up the Scene" },
  { id: 8, url: "https://visualstudioslens.saikat.com.bd/api/uploads/a28e7f0d-3e07-4dc1-847a-7a2c26c24e2c.PNG", caption: "In Action" },
  { id: 9, url: "https://visualstudioslens.saikat.com.bd/api/uploads/2e1c3295-01ad-43fe-897c-06891c3622fc.PNG", caption: "Capturing the Moment" },
  { id: 10, url: "https://visualstudioslens.saikat.com.bd/api/uploads/ff5da3e9-d252-483a-a73e-68718a098af3.PNG", caption: "The Creative Process" },
  { id: 11, url: "https://visualstudioslens.saikat.com.bd/api/uploads/9c1f65cb-5139-4b80-b245-87e48e153527.jpeg", caption: "Behind the Camera" },
];

const FEMALE_CREW_PHOTOS = [
  { id: 1, url: "https://visualstudioslens.saikat.com.bd/api/uploads/04b389fd-6b90-401f-a009-75431d5d0fbd.PNG", caption: "In Her Element" },
  { id: 2, url: "https://visualstudioslens.saikat.com.bd/api/uploads/f0e35148-6a92-49ff-a502-3b43b5bf412c.PNG", caption: "Getting the Perfect Angle" },
  { id: 3, url: "https://visualstudioslens.saikat.com.bd/api/uploads/ad2a60a0-1ad1-4188-9735-e02861bc828c.PNG", caption: "Framing the Moment" },
  { id: 4, url: "https://visualstudioslens.saikat.com.bd/api/uploads/657e6542-e76f-4ec8-966e-bc1996e336f3.PNG", caption: "Eye for Detail" },
  { id: 5, url: "https://visualstudioslens.saikat.com.bd/api/uploads/3d61ffef-4b3a-4be0-936f-ef64bd14a6b1.jpeg", caption: "Behind the Lens" },
  { id: 6, url: "https://visualstudioslens.saikat.com.bd/api/uploads/dd1623c3-62f1-4e3a-8541-6e1c912f8e1a.jpg", caption: "Capturing Every Detail" },
];

const CUSTOMER_PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", caption: "The Big Day" },
  { id: 2, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", caption: "Pure Joy" },
  { id: 3, url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop", caption: "Candid Moments" },
  { id: 4, url: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=800&auto=format&fit=crop", caption: "Family First" },
  { id: 5, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop", caption: "Cherished Together" },
  { id: 6, url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop", caption: "Celebration" },
];

const YOUTUBE_VIDEOS = [
  { id: 1, title: "Wedding Day BTS — Brooklyn Ceremony", embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U" },
  { id: 2, title: "Behind the Shoot — Visual Studios Crew", embedUrl: "https://www.youtube.com/embed/pO4B8rBGaBM" },
];

// ─────────────────────────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <span className="h-px w-10 bg-brand-400 shrink-0" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-400">{subtitle}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter">{title}</h2>
    </motion.div>
  );
}

function PhotoGrid({ photos }: { photos: { id: number; url: string; caption: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selected !== null) setSelected(prev => (prev! + 1) % photos.length);
  }, [selected, photos.length]);

  const handlePrev = useCallback(() => {
    if (selected !== null) setSelected(prev => (prev! - 1 + photos.length) % photos.length);
  }, [selected, photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, handleNext, handlePrev]);

  return (
    <>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-muted"
            onClick={() => setSelected(idx)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 p-3 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 rounded-full border border-white/10 z-50 transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>
            <button
              className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white bg-white/5 border border-white/10 rounded-full z-50 transition-colors"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft size={28} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={selected}
                src={photos[selected].url}
                alt={photos[selected].caption}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="max-w-[90vw] max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button
              className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white bg-white/5 border border-white/10 rounded-full z-50 transition-colors"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={28} />
            </button>
            <p className="absolute bottom-6 text-white/60 text-xs font-bold tracking-widest uppercase">
              {photos[selected].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function YouTubeSection() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {YOUTUBE_VIDEOS.map((video, idx) => (
        <motion.div key={video.id} variants={itemVariants}>
          <div
            className="group relative aspect-video bg-muted rounded-2xl overflow-hidden border border-white/5 cursor-pointer"
            onClick={() => setPlaying(playing === idx ? null : idx)}
          >
            {playing === idx ? (
              <iframe
                src={`${video.embedUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${video.embedUrl.match(/embed\/([^?/]+)/)?.[1]}/maxresdefault.jpg)`,
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <Play fill="currentColor" size={20} className="ml-1" />
                  </div>
                </div>
              </>
            )}
          </div>
          <h3 className="mt-4 text-base md:text-lg font-bold uppercase tracking-tight">{video.title}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function BtsContent() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 max-w-7xl py-20 md:py-28">

        <div className="space-y-20 md:space-y-28">

          {/* Our Crew */}
          <section>
            <SectionHeading title="Our Crew" subtitle="The Team" />
            <PhotoGrid photos={CREW_PHOTOS} />
          </section>

          <div className="border-t border-border" />

          {/* Female Crew */}
          <section>
            <SectionHeading title="Female Crew" subtitle="Behind the Lens" />
            <PhotoGrid photos={FEMALE_CREW_PHOTOS} />
          </section>

          <div className="border-t border-border" />

          {/* Customer Moments */}
          <section>
            <SectionHeading title="Customer Moments" subtitle="Real People" />
            <PhotoGrid photos={CUSTOMER_PHOTOS} />
          </section>

          <div className="border-t border-border" />

          {/* YouTube */}
          <section>
            <SectionHeading title="On YouTube" subtitle="Watch Us Work" />
            <YouTubeSection />
          </section>

        </div>
      </div>
    </div>
  );
}
