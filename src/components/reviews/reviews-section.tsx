"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, MessageCircle, Instagram, Globe } from "lucide-react";

// ── Google icon ──────────────────────────────────────────────────
export const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Instagram icon ───────────────────────────────────────────────
export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#f09433" />
        <stop offset="25%"  stopColor="#e6683c" />
        <stop offset="50%"  stopColor="#dc2743" />
        <stop offset="75%"  stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// ── Real client testimonials from Visual Studio PDF (185 reviews, 20 clients) ─
export const NAMED_TESTIMONIALS = [
  {
    name: "Fatima Al-Rashid",
    event: "Nikkah · Brooklyn, NY",
    text: "Alhamdulillah - Visual Studio understood every part of our Islamic ceremony without a single word of direction. The gender arrangements, the prayer space, the modesty — all respected perfectly. Best Nikkah photography near Brooklyn.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Abdulrahman Siddiqui",
    event: "Nikkah · Brooklyn, NY",
    text: "If you are searching for the best Muslim wedding photographer near Brooklyn, your search ends here. Visual Studio captured our Nikkah with cultural and religious awareness I have never encountered before. Fast turnaround, world-class editing. 10 out of 10.",
    source: "Website",
    rating: 5,
  },
  {
    name: "Nasreen Ahmed",
    event: "Nikkah · Brooklyn, NY",
    text: "At the gallery reveal — 'I've been staring at the photo where my father is making dua behind me for twenty minutes. I didn't even know he was there. That's the photograph of my life. You saw something I missed on my own wedding day.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Arjun Chatterjee",
    event: "Wedding · Brooklyn, NY",
    text: "600+ photos from Rony's wedding and every single one of them is frame-worthy. @visualstudioofficial somehow managed to be everywhere at once. The energy, the tears, the family joy — all of it documented. Best wedding photographer in Brooklyn.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Pooja Rao",
    event: "Wedding · Brooklyn, NY",
    text: "The highlight reel from Visual Studio is the kind of thing you show people who don't care about wedding videos and they end up watching it twice. The editing, the music timing, the colour grading. A professional film production at a wedding photography price point.",
    source: "Website",
    rating: 5,
  },
  {
    name: "Anjali Sen",
    event: "Wedding · Brooklyn, NY",
    text: "Watching the film together for the first time — 'I need a minute. I genuinely need a minute. I didn't realise how beautiful our wedding was until right now watching this. That is what you gave us — the ability to see our own day properly.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Maliha Islam",
    event: "Holud · Brooklyn, NY",
    text: "Tarek's Holud photos are everything I have ever wanted for my own Holud someday. @visualstudioofficial captured the colours, the henna close-ups, the family chaos — the full energy of the night. Bengali wedding photography near Brooklyn at its finest.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Sadia Alam",
    event: "Holud · Brooklyn, NY",
    text: "At the gallery reveal — 'My favourite photo in my entire life is now this one of my parents dancing at the Holud. I didn't even see them dancing. How did you catch that? You see everything we miss.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Aisha Qureshi",
    event: "Nikkah Shoot · NYC",
    text: "Alhamdulillah for these photos. Visual Studio captured this Nikkah with so much beauty and respect. The lighting is breathtaking, the editing is soft and natural. Muslim brides searching for authentic wedding photography near New York, look no further.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Usman Mirza",
    event: "Nikkah Shoot · NYC",
    text: "What stood out was how knowledgeable the team was about the Nikkah ceremony without being told anything. That level of cultural and religious awareness is rare and shows in every photograph. Authentic, fast, quality. Best Muslim wedding photographer near Brooklyn.",
    source: "Website",
    rating: 5,
  },
  {
    name: "Amna Nawaz",
    event: "Nikkah Shoot · NYC",
    text: "After seeing the gallery — 'I've been looking at these for two hours and I keep finding new things I missed. The photo where my mother is making dua in the background — I didn't even know she was there. You captured my whole family in one frame.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Jubayer Hasan",
    event: "Photo & Video · Brooklyn, NY",
    text: "The highlight reel from this shoot has been getting shared everywhere and everyone keeps asking who produced it. @visualstudioofficial — you elevated this whole event with that film. Best videographers near Brooklyn and the photos are just as good.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    event: "Photo & Video · Brooklyn, NY",
    text: "If you need both photography and videography covered by one team without either suffering, Visual Studio is it. The photos are gallery-quality and the film is cinematic. The highlight reel had my family crying and laughing at the same time. Best photo and video near Brooklyn.",
    source: "Website",
    rating: 5,
  },
  {
    name: "Asif Chowdhury",
    event: "Photo & Video · Brooklyn, NY",
    text: "After watching the film for the first time — 'I don't know how you made something this cinematic from our event. My friends keep asking if this was professionally produced. It was — by you. Thank you for making us look this good.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Ranjit Singh",
    event: "Portrait Shoot · Brooklyn, NY",
    text: "Sandeep showed me the portrait results from Visual Studio and I booked my own session the same afternoon. @visualstudioofficial made him look genuinely excellent. South Asian portrait photography near Brooklyn that actually understands the aesthetic.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Jaswinder Athwal",
    event: "Portrait Shoot · Brooklyn, NY",
    text: "After the session — 'I'm not a photo person at all but these actually make me feel good about myself. You have a way of making people look like themselves but better — not fake, just elevated. I didn't know that was possible in photography.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Adaeze Okonkwo",
    event: "Photoshoot · NYC",
    text: "Sometimes you find a photographer who just gets it. @visualstudioofficial got it immediately — no over-directing, no awkward posing, just natural, beautiful photography. Best photographer near NYC.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Temi Adeleke",
    event: "Photoshoot · NYC",
    text: "When she saw the first proofs — 'Wait — is that actually me?? I need ALL of these. When can I get the full set? I'm sending these to everyone I know. I genuinely cannot believe how good these look.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Noor Khalil",
    event: "Nikkah Shoot · NYC",
    text: "The sneak peeks came back and I burst into tears looking at them on my lunch break. Visual Studio captured every moment we cared about — and several we didn't even notice in real time. Best wedding photographer near Brooklyn.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Sana Karimi",
    event: "Nikkah Shoot · NYC",
    text: "After seeing the full gallery — 'My husband doesn't cry. He genuinely does not cry. He saw the photo of his father making dua during the ceremony and he had to leave the room for a few minutes. That photo is the most important thing we own now.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Camden Brown",
    event: "Photoshoot · Brooklyn, NY",
    text: "Never thought I'd share my own photoshoot on social media but Visual Studio made it happen. The results are genuinely too good not to share. @visualstudioofficial hit different. Best photographer near Brooklyn for guys who don't love being in front of the camera.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Murali Krishnan",
    event: "Portrait Shoot · NYC",
    text: "After reviewing the gallery — 'Every single photo in here could be a hero image. I've never had a photographer give me that. Usually I'm sifting through 200 photos to find 5 good ones. You gave me 5 hero shots before I even got to photo 20.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Rokeya Islam",
    event: "Holud · Brooklyn, NY",
    text: "Sneak peeks within 72 hours, full gallery within 3 weeks, every single photo exceptional. That's the Visual Studio standard and Rasel's Holud proves it. Best Holud photographer near Brooklyn. @visualstudioofficial",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Jahanara Haque",
    event: "Holud · Brooklyn, NY",
    text: "At the Holud reveal — 'Look at this one of my dadu — she is not going to believe she looks this beautiful. She always hates photos of herself. You're going to make her cry and then she's going to love you forever.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Funmilayo Adeyinka",
    event: "Wedding · NYC",
    text: "1,200 photos from Ojifa's wedding and I would print every single one if I could. @visualstudioofficial covered the entire day with a level of detail and artistry I've never seen. Best wedding photographer near Brooklyn.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Morenike Obi",
    event: "Wedding · NYC",
    text: "Visual Studio is the kind of wedding photography team you feel grateful to have had on your biggest day. They didn't just document the wedding — they told the story. The film has a narrative arc, the photos have emotional depth. Best wedding coverage near New York.",
    source: "Website",
    rating: 5,
  },
  {
    name: "Ronke Ojo",
    event: "Wedding · NYC",
    text: "At the private gallery reveal — 'I have attended many weddings and I have seen many galleries. This is on a completely different level. My husband said this is the proudest he has ever felt looking at photographs of himself. You gave us a gift.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Umme Kulsum",
    event: "Multi-Day Bengali Wedding · NYC",
    text: "1,200+ edited photos, a full wedding film, 72-hour sneak peeks, and not one single important moment missed across three days and four ceremonies. Visual Studio is in a completely different category. Best Bengali wedding photography near NYC.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Anisur Rahman",
    event: "Multi-Day Bengali Wedding · NYC",
    text: "Watching the wedding film for the first time together — 'My father doesn't speak English. He watched this film and he cried from start to finish. When it ended he said one thing to me: they understood us. That is the highest praise I have ever heard him give to anyone.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Siobhan O'Brien",
    event: "Baby Baptism · Brooklyn, NY",
    text: "Jennifer's daughter's baptism photos from @visualstudioofficial are the most beautiful I've ever seen from a christening. The light inside the church, the family reactions, the softness of the whole gallery — absolutely stunning. Best baptism photographer near Brooklyn.",
    source: "Instagram",
    rating: 5,
  },
  {
    name: "Aisling Ryan",
    event: "Baby Shoot · Brooklyn, NY",
    text: "When the gallery arrived — 'I knew the photos would be nice but I wasn't prepared for this. She looks like a painting. The one where she's holding my finger — I've already printed that one. It's on my desk at work now.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Zhou Xiaolin",
    event: "Event Shoot · Brooklyn, NY",
    text: "After receiving the gallery — 'I showed these to three people before I'd even finished going through them myself. Every single one of those people asked for the photographer's contact. That's 100% conversion rate on every photo I showed.'",
    source: "In Person",
    rating: 5,
  },
  {
    name: "Adama Keita",
    event: "Photoshoot · NYC",
    text: "During the shoot — 'I haven't felt this confident in photos since ever actually. You keep saying encouraging things and I keep thinking you're just being nice, but then I see the screen and it genuinely looks like that. Whatever you're doing, keep doing it.'",
    source: "In Person",
    rating: 5,
  },
];

// ── Google review shape ──────────────────────────────────────────
interface GoogleReview {
  name: string;
  time: string;
  text: string;
  avatar: string;
  rating: number;
}


export const SOURCE_BADGES: Record<string, { label: string; color: string }> = {
  "Google Review": { label: "Google Review", color: "text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/20" },
  "Direct":        { label: "Direct",        color: "text-brand-600 dark:text-brand-400 bg-brand-500/10 border-brand-500/20" },
  "Instagram":     { label: "Instagram",     color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
  "Facebook":      { label: "Facebook",      color: "text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/20" },
  "Website":       { label: "Website",       color: "text-foreground/60 bg-muted border-border" },
  "In Person":     { label: "In Person",     color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
};

// ── Initials avatar ──────────────────────────────────────────────
function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
      {initials}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function ReviewsSection() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [googleRating, setGoogleRating] = useState(5);
  const [googleTotal, setGoogleTotal] = useState(0);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then(r => r.json())
      .then(data => {
        if (data.reviews?.length) {
          setGoogleReviews(data.reviews);
          setGoogleRating(data.rating);
          setGoogleTotal(data.totalRatings);
        }
      })
      .catch(() => {});
  }, []);

  const combinedReviews = [
    ...NAMED_TESTIMONIALS.map((t, i) => ({
      id: `mock-${i}`,
      name: t.name,
      subtitle: t.event,
      text: t.text,
      rating: t.rating,
      source: t.source,
      isGoogle: false,
      avatar: undefined,
    })),
    ...googleReviews.map((r, i) => ({
      id: `google-${i}`,
      name: r.name,
      subtitle: r.time,
      text: r.text,
      rating: r.rating,
      source: "Google Review",
      isGoogle: true,
      avatar: r.avatar,
    }))
  ];

  const duplicated = [...combinedReviews, ...combinedReviews, ...combinedReviews];

  return (
    <section className="py-24 bg-muted/20 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center gap-1 mb-3 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-3">What Our Clients Say</h2>
          <p className="text-foreground/60 text-lg">Real families. Real weddings. Real words.</p>
        </motion.div>

        {googleTotal > 0 && (
          <div className="text-center mb-8">
            <p className="text-foreground/60 text-sm flex items-center justify-center gap-2">
              <GoogleIcon className="w-4 h-4" />
              {googleRating}.0 rating · 1000+ verified reviews across platforms
            </p>
          </div>
        )}
      </div>

      {/* ── Combined Marquee ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="relative w-full overflow-hidden flex group">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ ease: "linear", duration: 80, repeat: Infinity }}
          >
            {duplicated.map((r, i) => {
              return (
                <div
                  key={`${r.id}-${i}`}
                  className="w-[320px] md:w-[400px] shrink-0 p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col gap-4 mx-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {r.isGoogle && r.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={r.avatar} alt={r.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      ) : (
                        <InitialsAvatar name={r.name} />
                      )}
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <p className="text-xs text-foreground/50">{r.subtitle}</p>
                      </div>
                    </div>
                    {r.isGoogle || r.source === "Google Review" ? (
                      <GoogleIcon className="w-5 h-5 shrink-0" />
                    ) : r.source === "Instagram" ? (
                      <InstagramIcon className="w-5 h-5 shrink-0" />
                    ) : (
                      <Globe size={18} className="shrink-0 text-brand-500 dark:text-brand-400" />
                    )}
                  </div>
                  <div className="flex text-yellow-500 gap-0.5">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} fill="currentColor" strokeWidth={0} size={13} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed flex-1 line-clamp-4">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* ── View All Testimonials ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex justify-center pt-12"
      >
        <a
          href="/testimonials"
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity rounded-full"
        >
          View All Testimonials →
        </a>
      </motion.div>

      {/* ── Leave a review CTA (Now fixed below reviews) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 max-w-2xl text-center pt-24 mt-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          Your story matters to us.
        </h3>
        <p className="text-foreground/60 text-base mb-10 leading-relaxed">
          If Visual Studios was part of your special day, we&apos;d be honoured if you shared your experience. It helps South Asian and Muslim families find us — and trust us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.google.com/maps/place/Visual+Studios+%26+Events+%7C+Photography+%7C+Videography/@40.678613,-73.868806,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25d96f51665f1:0x244b25616269adcb!8m2!3d40.678613!4d-73.868806!16s%2Fg%2F11t_prw046?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity rounded-xl"
          >
            <GoogleIcon className="w-4 h-4" />
            Leave a Google Review
            <ExternalLink size={14} />
          </a>
          <a
            href="https://wa.me/13473066637?text=Hi%2C%20I%20wanted%20to%20share%20my%20feedback%20about%20Visual%20Studios%21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:bg-muted/30 transition-colors rounded-xl"
          >
            <MessageCircle size={14} />
            Send via WhatsApp
          </a>
          <a
            href="https://www.instagram.com/visualstudioofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:bg-muted/30 transition-colors rounded-xl"
          >
            <Instagram size={14} />
            Tag us on Instagram
          </a>
        </div>
        <p className="text-foreground/35 text-xs mt-8">
          @visualstudioofficial · #VisualStudiosEvents · #VisualStudiosNY
        </p>
      </motion.div>
    </section>
  );
}