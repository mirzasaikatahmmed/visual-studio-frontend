"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Film, Users, BarChart3, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { resolveUrl, type AboutContent as AboutContentType, type TeamMember } from "@/lib/aboutApi";

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ─── Fallback content ─────────────────────────────────────────────────────────

const FALLBACK_CONTENT: AboutContentType = {
  id: 0,
  titlePart1: "About",
  titlePart2: "Visual Studios & Events",
  quoteText: `"Why only print the memories others captured?\n\nWhy not capture them ourselves, and deliver the complete package, photography, videography, and prints?"`,
  storyParagraphs: `From Printing to Storytelling, Visual Studios & Events began as an extension of our first venture — a printing business where we specialized in creating albums, posters, and prints for weddings and events.\n\nCouples and families would bring us their photos, and we would transform them into cherished keepsakes. One day, we asked ourselves the defining question that changed everything.\n\nWith that vision, we started small; using an old Canon camera and DIY lighting. Our very first shoot was for a close relative's wedding. Nervous but determined, we captured every detail and the joy and appreciation from the family fueled our drive. From there, one client led to another and what began as a hobby quickly grew into a true passion and business.\n\nToday, Visual Studios & Events is a dedicated photography and videography company with a talented team of six and our own studio space. We specialize in weddings and general events — from maternity shoots and showers to birthdays and anniversaries. With every project, we aim to blend artistry with storytelling, ensuring that every moment is preserved in the most beautiful way possible.\n\nOur journey is proof that great things can start with small beginnings. What once was just an idea born from our printing roots is now Visual Studios & Events — a brand committed to capturing life's milestones with creativity, care, and excellence.`,
  whatWeDoTitle: "What We Do: Weddings & General Events",
  whatWeDoDescription: "Documentary coverage + cinematic highlights, vows/speeches capture, reception edits.",
  updatedAt: "",
};

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Mohammed Sakib",
    role: "Founder & Creative Director",
    imageUrl: null,
    bio: `I'm the Founder and Creative Director of Visual Studios & Events. I lead the vision, direction, and creative strategy behind our projects, ensuring that every piece of work we deliver is both innovative and impactful.\n\nMy journey began with a deep passion for visual storytelling, which quickly grew into a drive to build something bigger than myself. At Visual Studios, I focus on combining artistry with leadership — guiding our team, shaping the creative process, and making sure every project reflects both technical excellence and authentic storytelling.\n\nBeyond the creative side, I also oversee the strategic growth of the studio, setting goals, building partnerships, and ensuring our business continues to expand while staying true to our mission.`,
    imagePosition: "left",
    sortOrder: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    name: "Adhora Mir",
    role: "Video Editor & Social Media Manager",
    imageUrl: null,
    bio: `As an artist and entrepreneur, I began my creative journey making my own videos and discovered a passion for storytelling through film and design. I've created content for community and Islamic groups, managing their social media and producing videos to engage their audiences.\n\nAt Visual Studios, I focus on editing videos and films, managing social media platforms, and contributing to graphic design projects. For me it's more than a business — it's a family-driven platform where I can grow professionally while doing what I love.`,
    imagePosition: "right",
    sortOrder: 2,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    name: "Syed Md Mahid",
    role: "Professional Photo Editor",
    imageUrl: null,
    bio: `Photographer, editor, and creative producer currently studying Information & Communication Engineering at East West University. Starting in 2017, I quickly grew from mobile photography to national recognition — including a 2019 award from Youth Club Bangladesh and UKAid.\n\nI work with FoodPanda, Kidzana, Quest Film, and Visual Studios. I serve as Secretary of Design at East West University Photography Club, known for turning ideas into visually impactful stories.`,
    imagePosition: "left",
    sortOrder: 3,
    createdAt: "",
    updatedAt: "",
  },
];

// ─── Static data ──────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  {
    icon: Camera,
    title: "Wedding Photography",
    desc: "Full-day cinematic coverage of South Asian & Muslim weddings. Every tradition documented with cultural understanding and artistic excellence. Starting at $499.",
  },
  {
    icon: Film,
    title: "Cinematography",
    desc: "4K cinematic films, 3–5 minute highlight reels, full ceremony edits, drone coverage, and same-day edits available as an add-on to any package.",
  },
  {
    icon: Users,
    title: "Portrait & Events",
    desc: "Engagement sessions, Nikkah-only shoots, corporate branding, product photography, and family portraits — studio or on-location across NY.",
  },
  {
    icon: BarChart3,
    title: "Visual Marketing",
    desc: "Brand photography, content creation, social media assets, and custom website builds for businesses that need a visual edge in their market.",
  },
];

const TRADITIONS = [
  { label: "Bengali", items: ["Gaye Holud", "Akht", "Bou Bhat", "Reception"] },
  { label: "Pakistani", items: ["Mayun", "Mehndi", "Baraat", "Walima"] },
  { label: "Indian", items: ["Sangeet", "Pheras", "Vidaai", "Reception"] },
  { label: "Sikh", items: ["Anand Karaj", "Doli", "Milni", "Reception"] },
  { label: "Arab & Afghan", items: ["Nikkah", "Henna Night", "Zaffa", "Walima"] },
  { label: "Multi-Cultural", items: ["Fusion Ceremonies", "Interfaith Weddings", "Cross-Cultural Events", "Custom Traditions"] },
];

const STATS = [
  { num: "1,000+", label: "Weddings Documented", note: "Brooklyn's most experienced South Asian & Muslim wedding studio." },
  { num: "72hrs", label: "Sneak Peek Delivery", note: "First edited photos delivered within 72 hours — ready to share on social media." },
  { num: "3–4 wks", label: "Full Gallery Turnaround", note: "Complete edited gallery delivered via private link within 3–4 weeks." },
  { num: "30–50%", label: "Deposit to Book", note: "Secure your date with a deposit. Free 15-min consultation via Calendly." },
];

const FEMALE_FEATURES = [
  { title: "Female Photographer", desc: "Lead female photographer for all coverage" },
  { title: "Female Videographer", desc: "Female cinematographer for all filming" },
  { title: "Female Post-Production", desc: "All editing handled by female editors only" },
  { title: "Private Gallery Delivery", desc: "Secure, password-protected online gallery" },
  { title: "Ladies-Only Events", desc: "Full coverage of Mehndi, Henna nights, and private celebrations" },
  { title: "Hijabi Bride Specialist", desc: "Comfortable, respectful, and professional coverage for every bride" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  content: AboutContentType | null;
  team: TeamMember[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutContent({ content, team }: Props) {
  const c = content ?? FALLBACK_CONTENT;
  const resolvedTeam = team.length > 0 ? team : FALLBACK_TEAM;
  const paragraphs = c.storyParagraphs.split(/\n\n+/).filter(Boolean);
  const firstParagraph = paragraphs[0] ?? "";
  const restParagraphs = paragraphs.slice(1, -1);
  const lastParagraph = paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : "";

  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* ── 01 Story ── */}
      <section className="relative py-24 md:py-32 container mx-auto px-4 max-w-7xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(221,148,84,0.3)]">
              {c.titlePart1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-black to-black/40 dark:from-white dark:to-white/40 pr-4">
                {c.titlePart2}
              </span>
            </h2>

            <div className="p-8 md:p-10 border-l-4 border-brand-400 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-r-3xl mt-12 md:mt-24 shadow-[0_0_40px_rgba(221,148,84,0.1)]">
              <p className="text-xl md:text-2xl font-bold italic mb-4 leading-relaxed whitespace-pre-line">
                {c.quoteText}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-start pt-4 lg:pt-12">
            <div className="space-y-8 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
              {firstParagraph && (
                <p className="font-medium text-foreground text-2xl">{firstParagraph}</p>
              )}
              {restParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {paragraphs.length > 1 && lastParagraph && (
                <p className="font-bold text-foreground border-t border-foreground/10 pt-8 mt-8">
                  {lastParagraph}
                </p>
              )}
            </div>

            <div className="mt-12 p-8 bg-brand-500/10 border border-brand-500/20 rounded-3xl">
              <h3 className="text-brand-500 dark:text-brand-400 font-bold uppercase tracking-widest text-sm mb-4">
                {c.whatWeDoTitle}
              </h3>
              <p className="text-foreground/90">{c.whatWeDoDescription}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 02 What We Do ── */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Services At A Glance</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              What <span className="font-great-vibes font-normal text-[1.2em] text-brand-500">We Do</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {WHAT_WE_DO.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="bg-background border border-border rounded-2xl p-8 hover:border-brand-500/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-brand-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 03 Stats / Timelines ── */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">What To Expect</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Timelines &amp; <span className="font-great-vibes font-normal text-[1.2em] text-brand-500">Delivery</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="bg-muted/30 border border-border rounded-2xl p-7 flex flex-col gap-3"
              >
                <div className="text-5xl font-black tracking-tighter text-foreground leading-none">
                  {s.num.includes("+") ? (
                    <>{s.num.replace("+", "")}<span className="text-brand-500">+</span></>
                  ) : s.num.includes("%") ? (
                    <>{s.num.replace("%", "")}<span className="text-brand-500 text-3xl">%</span></>
                  ) : (
                    <span>{s.num}</span>
                  )}
                </div>
                <div className="font-bold text-sm uppercase tracking-wider">{s.label}</div>
                <div className="text-foreground/50 text-xs leading-relaxed">{s.note}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 04 Traditions ── */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Cultural Coverage</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Traditions <span className="font-great-vibes font-normal text-[1.2em] text-brand-500">We Cover</span>
            </h2>
            <p className="mt-4 text-foreground/60 text-base max-w-xl">
              We are fluent in every tradition. Whether your celebration spans one day or five, we are prepared for every moment.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {TRADITIONS.map((t) => (
              <motion.div
                key={t.label}
                variants={itemVariants}
                className="bg-background border border-border rounded-2xl p-6 hover:border-brand-500/40 transition-colors duration-300"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">{t.label}</p>
                <ul className="space-y-1.5">
                  {t.items.map((item) => (
                    <li key={item} className="text-sm text-foreground/60 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 05 Female-Only Workflow ── */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-foreground text-background rounded-3xl p-10 md:p-14"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-background/50 mb-4">Privacy &amp; Modesty Services</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Female-Only <span className="font-great-vibes font-normal text-[1.2em] opacity-60">Workflow</span>
            </h2>
            <p className="text-background/70 text-base leading-relaxed mb-10 max-w-2xl">
              Available on request — designed for Hijabi brides, ladies-only events, and families who require
              complete privacy throughout the entire production process. Every person who touches your event
              on the day and in post-production is a woman.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {FEMALE_FEATURES.map((f) => (
                <div key={f.title} className="flex gap-3 items-start">
                  <CheckCircle2 size={16} className="text-background/60 shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <p className="font-bold text-sm text-background">{f.title}</p>
                    <p className="text-background/50 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/muslim-friendly-services"
              className="inline-block px-8 py-4 border border-background/30 text-background font-bold uppercase tracking-widest text-xs hover:border-background/70 transition-colors"
            >
              Full Muslim-Friendly Services →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 05b Team Trust Signal ── */}
      <section className="py-20 md:py-28 bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 mb-6">Our Team</p>

            <p className="text-2xl md:text-3xl font-light leading-relaxed text-background/90 mb-6">
              We are Visual Studio &mdash; a close-knit team of visual storytellers based in Brooklyn, NY.
            </p>

            <p className="text-lg md:text-xl font-light leading-relaxed text-background/70 mb-6 max-w-3xl">
              Our work is built on trust. As a team that includes both male and female photographers, videographers,
              and editors, we know that for many of our clients &mdash; especially Muslim and South Asian brides &mdash;
              that trust starts with feeling comfortable. We offer dedicated female crews and female editors for every
              service we provide, <strong className="text-background font-semibold">not as an add-on, but as a core part of how we work.</strong>
            </p>

            <p className="text-base md:text-lg font-light leading-relaxed text-background/60 mb-12 max-w-3xl">
              From our first shoot on a borrowed camera to 1,000+ weddings later, we&apos;ve stayed true to one thing:
              every family that brings us into their most sacred moments deserves our full care, creativity, and respect.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Male + Female Crew Available",
                "Female Editors — End to End",
                "1,000+ Weddings Documented",
                "Brooklyn-Based Studio",
                "South Asian & Muslim Specialists",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full border border-background/20 text-background/70 text-xs font-bold uppercase tracking-widest"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 06 Meet Our Team ── */}
      <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            className="text-right mb-24"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3 text-left md:text-right">The People Behind The Lens</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">Meet</h2>
            <h3 className="text-4xl md:text-6xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-black dark:from-brand-300 dark:to-white drop-shadow-[0_0_15px_rgba(221,148,84,0.3)] dark:drop-shadow-[0_0_15px_rgba(221,148,84,0.5)]">
              Our Team
            </h3>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {resolvedTeam.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative bg-background border border-border rounded-3xl p-8 md:p-12 flex flex-col ${member.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center md:items-stretch gap-8 md:gap-12`}
              >
                {/* Photo or placeholder */}
                <div className={`w-48 h-48 md:w-64 md:h-auto shrink-0 relative rounded-2xl overflow-hidden bg-muted/50 border border-border flex items-center justify-center ${member.imagePosition === "right" ? "md:translate-x-4" : "md:-translate-x-4"} md:-translate-y-8`}>
                  {member.imageUrl ? (
                    <Image
                      src={resolveUrl(member.imageUrl)}
                      alt={member.name}
                      width={256}
                      height={320}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center w-full h-full min-h-[200px]">
                      <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                        <span className="text-2xl font-black text-brand-500">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-foreground/20">{member.name}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-brand-500 dark:text-brand-400 font-bold italic tracking-wide mb-6 text-sm">{member.role}</p>
                  <div className="w-8 h-0.5 bg-brand-500 mb-6" />
                  <div className="space-y-4 text-foreground/60 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {member.bio}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
