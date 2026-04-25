"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ArrowRight, BarChart3, Target, TrendingUp } from "lucide-react";

const brands = [
  { name: "Nike", logo: "https://logo.clearbit.com/nike.com" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com" },
  { name: "Slack", logo: "https://logo.clearbit.com/slack.com" },
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so" },
  { name: "HubSpot", logo: "https://logo.clearbit.com/hubspot.com" },
  { name: "Canva", logo: "https://logo.clearbit.com/canva.com" },
];

export function MarketingContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row w-full px-8 sm:w-auto sm:px-0 justify-center gap-4 mt-12 mb-8"
      >
        <Link
          href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
          target="_blank" rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-8 py-4 sm:py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 hover:scale-105 transition-all uppercase tracking-widest text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center"
        >
          Start a Project
        </Link>
        <a
          href="https://gallery.visualstudioslens.com/"
          target="_blank" rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-8 py-4 sm:py-3 bg-transparent border border-border text-foreground font-medium rounded-full hover:bg-muted hover:scale-105 transition-all uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center"
        >
          Studio Portfolio
        </a>
      </motion.div>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-brand-500/50 transition-colors group">
              <Target className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-brand-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Brand Photography</h3>
              <p className="text-muted-foreground">Professional headshots, team culture coverage, and narrative-driven brand stories.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-brand-500/50 transition-colors group">
              <TrendingUp className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-brand-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Product Shoots</h3>
              <p className="text-muted-foreground">Crisp e-commerce white background imagery and styled lifestyle product shots.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-brand-500/50 transition-colors group">
              <BarChart3 className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-brand-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Campaign Visuals</h3>
              <p className="text-muted-foreground">High-end stylized imagery tailored for ad spend, billboards, and print media.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-brand-500/50 transition-colors group">
              <div className="w-12 h-12 mb-6 flex items-center justify-center font-bold text-2xl border-2 border-muted-foreground text-muted-foreground rounded-full group-hover:text-brand-400 group-hover:border-brand-400 transition-colors">@</div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Social Content</h3>
              <p className="text-muted-foreground">Short-form video loops, Instagram reels, and batch-created engaging content.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Case Studies</h2>
            <p className="text-muted-foreground max-w-2xl">Real results. We focus on impact, metrics, and transformation.</p>
          </motion.div>

          <div className="space-y-24">
            {/* Case Study 1 */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-video bg-muted border border-border overflow-hidden group rounded-xl">
                <div className="absolute inset-0 w-1/2 border-r-2 border-white z-20 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800')" }} />
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=800')" }} />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-xs font-bold uppercase z-30 tracking-widest border border-white/20 rounded-full">Before</div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-black px-3 py-1 text-xs font-bold uppercase z-30 tracking-widest border border-black/20 rounded-full">After</div>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h3 variants={itemVariants} className="text-3xl font-bold uppercase tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Artisan Coffee Co.</motion.h3>
                <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
                  Revamped the entire social media aesthetic for an emerging coffee brand. Transitioned from smartphone shots to a cohesive, dark-mood styled campaign.
                </motion.p>
                <motion.ul variants={itemVariants} className="space-y-3 font-medium">
                  <li className="flex items-center gap-3"><ArrowRight className="text-brand-400" size={16} /> 150% Increase in Instagram Engagement</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-brand-400" size={16} /> 45% Higher Ad Conversion Rate</li>
                </motion.ul>
              </motion.div>
            </motion.div>

            {/* Sub-Showcase: YouTube / Video */}
            <motion.div
              className="mt-20 p-12 bg-white text-black text-center rounded-[3rem] relative overflow-hidden"
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200 blur-[80px] rounded-full opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 border-b-2 border-black/20 inline-block pb-2">Video Production Showcase</h3>
                <p className="max-w-2xl mx-auto mb-8 mt-6 font-medium text-black/70">
                  Dynamic, story-driven commercial videos that stop the scroll. Check out our latest commercial reel on YouTube.
                </p>
                <a
                  href="https://www.youtube.com/"
                  target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-105 hover:shadow-xl transition-all uppercase tracking-widest text-sm inline-block"
                >
                  Watch on YouTube
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Our Work</h2>
            <p className="text-muted-foreground max-w-2xl">A glimpse into the campaigns and visuals we&apos;ve crafted for our clients.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { title: "Product Launch — Neon Series", tag: "Brand Photography", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnUxY3c4cHVuZXM1NnQxY3A1aHl4cmpvN2pldXgzdDczNTUwOXp5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LpEkb0XzmSdPyuhXsa/giphy.gif" },
              { title: "Campaign Visuals — Summer Drop", tag: "Campaign", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWoxdTNxZmRhczBnYW5ja25kamU1YTl3czIyMGs0c3N6bGQzYjM0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uF7BxmaJEtkUvKKkyg/giphy.gif" },
              { title: "Social Content — Reels Pack", tag: "Social Media", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzBjcmlwczl0bGJvNTc0YWQ5bDIyaWl5aTlxNWVrODl1MGk3ZHRiYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WgN6VKw9oNNlyir3DD/giphy.gif" },
              { title: "E-Commerce — Studio Shots", tag: "Product Shoots", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnUxY3c4cHVuZXM1NnQxY3A1aHl4cmpvN2pldXgzdDczNTUwOXp5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l7bUBv6k24xwJXYRUU/giphy.gif" },
              { title: "Corporate Headshots — TechFirm", tag: "Brand Photography", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWoxdTNxZmRhczBnYW5ja25kamU1YTl3czIyMGs0c3N6bGQzYjM0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT9IgjfoTrXbejHk9G/giphy.gif" },
              { title: "Ad Creatives — Billboard Series", tag: "Campaign Visuals", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzBjcmlwczl0bGJvNTc0YWQ5bDIyaWl5aTlxNWVrODl1MGk3ZHRiYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GD9MQamBYCvbotN0mA/giphy.gif" },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="overflow-hidden bg-muted">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.gif}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-4 pb-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{item.tag}</span>
                  <h3 className="font-bold text-base mt-1 uppercase tracking-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brands We've Worked With */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            We&apos;ve Worked With
          </motion.h2>

          <div className="space-y-10 px-4 sm:px-8 md:px-16 lg:px-[10%] relative overflow-hidden">
            {/* Fade gradients */}
            <div className="absolute left-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />

            {/* Row 1 — scrolls right */}
            <Marquee direction="right" gradient={false} speed={40} pauseOnHover>
              {brands.map((brand) => (
                <div key={brand.name} className="mx-6 sm:mx-10 md:mx-14">
                  <div className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              ))}
            </Marquee>

            {/* Row 2 — scrolls left */}
            <Marquee direction="left" gradient={false} speed={25} pauseOnHover>
              {brands.map((brand) => (
                <div key={brand.name} className="mx-6 sm:mx-10 md:mx-14">
                  <div className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Start a Project CTA */}
      <section className="py-32 bg-foreground text-background overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-800/30 via-transparent to-transparent pointer-events-none" />
        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Ready to Start<br />a Project?</h2>
          <p className="text-background/70 max-w-xl mx-auto mb-12 text-lg">
            Let&apos;s create something remarkable together. Tell us about your brand and we&apos;ll take it from there.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-background text-foreground font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all uppercase tracking-widest text-sm"
          >
            Start a Project
          </Link>
        </motion.div>
      </section>
    </>
  );
}

