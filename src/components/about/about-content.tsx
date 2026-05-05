"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resolveUrl, type AboutContent as AboutContentType, type TeamMember } from "@/lib/aboutApi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const FALLBACK_CONTENT: AboutContentType = {
  id: 0,
  titlePart1: "About",
  titlePart2: "Visual Studio",
  quoteText: `"Why only print the memories others captured?\n\nWhy not capture them ourselves, and deliver the complete package, photography, videography, and prints?"`,
  storyParagraphs: `From Printing to Storytelling, Visual Studio began as an extension of our first venture — a printing business where we specialized in creating albums, posters, and prints for weddings and events.\n\nCouples and families would bring us their photos, and we would transform them into cherished keepsakes. One day, we asked ourselves the defining question that changed everything.\n\nWith that vision, we started small; using an old Canon camera and DIY lighting. Our very first shoot was for a close relative's wedding. Nervous but determined, we captured every detail and the joy and appreciation from the family fueled our drive. From there, one client led to another and what began as a hobby quickly grew into a true passion and business.\n\nToday, Visual Studio is a dedicated photography and videography company with a talented team of six and our own studio space. We specialize in weddings and general events — from maternity shoots and showers to birthdays and anniversaries. With every project, we aim to blend artistry with storytelling, ensuring that every moment is preserved in the most beautiful way possible.\n\nOur journey is proof that great things can start with small beginnings. What once was just an idea born from our printing roots is now Visual Studio — a brand committed to capturing life's milestones with creativity, care, and excellence.`,
  whatWeDoTitle: "What We Do: Weddings & General Events",
  whatWeDoDescription: "Documentary coverage + cinematic highlights, vows/speeches capture, reception edits.",
  updatedAt: "",
};

type Props = {
  content: AboutContentType | null;
  team: TeamMember[];
};

export function AboutContent({ content, team }: Props) {
  const c = content ?? FALLBACK_CONTENT;
  const paragraphs = c.storyParagraphs.split(/\n\n+/).filter(Boolean);
  const firstParagraph = paragraphs[0] ?? "";
  const restParagraphs = paragraphs.slice(1, -1);
  const lastParagraph = paragraphs[paragraphs.length - 1] ?? "";

  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* 1st Part: About Studios */}
      <section className="relative py-24 md:py-32 container mx-auto px-4 max-w-7xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Col — Huge Title + Quote */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(221,148,84,0.3)]">
              {c.titlePart1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-black to-black/40 dark:from-white dark:to-white/40 pr-4">
                {c.titlePart2}
              </span>
            </h1>

            <div className="p-8 md:p-10 border-l-4 border-brand-400 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-r-3xl mt-12 md:mt-24 shadow-[0_0_40px_rgba(221,148,84,0.1)]">
              <p className="text-xl md:text-2xl font-bold italic mb-4 leading-relaxed whitespace-pre-line">
                {c.quoteText}
              </p>
            </div>
          </motion.div>

          {/* Right Col — Story */}
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

      {/* 2nd Part: Meet Our Team */}
      {team.length > 0 && (
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">

            <motion.div
              className="text-right mb-24"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tight">Meet</h2>
              <h3 className="text-4xl md:text-6xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-black dark:from-brand-300 dark:to-white drop-shadow-[0_0_15px_rgba(221,148,84,0.3)] dark:drop-shadow-[0_0_15px_rgba(221,148,84,0.5)]">
                Our Team
              </h3>
            </motion.div>

            <div className="space-y-32 md:space-y-40">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative bg-white dark:bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-black/5 dark:border-white/5 shadow-2xl flex flex-col ${member.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center md:items-stretch gap-8 md:gap-16`}
                >
                  {member.imageUrl && (
                    <div className={`w-64 h-64 md:w-80 md:h-auto shrink-0 relative ${member.imagePosition === "right" ? "md:translate-x-12" : "md:-translate-x-12"} md:-translate-y-12`}>
                      <Image
                        src={resolveUrl(member.imageUrl)}
                        alt={member.name}
                        width={320}
                        height={384}
                        className="w-full h-full object-cover object-top rounded-3xl md:rounded-none md:absolute md:bottom-0 md:h-[120%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                        style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))" }}
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{member.name}</h3>
                    <p className="text-brand-600 dark:text-brand-400 font-bold italic tracking-wide mb-8">{member.role}</p>
                    <div className="space-y-4 text-foreground/70 dark:text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {member.bio}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
