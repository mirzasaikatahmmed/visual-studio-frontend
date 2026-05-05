"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { fetchWorks, type VisualMarketingWork } from "@/lib/visualMarketingApi";
import { fetchPortfolios, fetchCategories, type Portfolio } from "@/lib/portfolioApi";

const CLIENT_CAT_SLUG = "client-logos";

type FallbackItem = { title: string; tag: string; gif: string };

const FALLBACK_WORK: FallbackItem[] = [
  { title: "Product Launch — Neon Series", tag: "Brand Photo & Video", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnUxY3c4cHVuZXM1NnQxY3A1aHl4cmpvN2pldXgzdDczNTUwOXp5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LpEkb0XzmSdPyuhXsa/giphy.gif" },
  { title: "Campaign Visuals — Summer Drop", tag: "Campaign", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWoxdTNxZmRhczBnYW5ja25kamU1YTl3czIyMGs0c3N6bGQzYjM0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uF7BxmaJEtkUvKKkyg/giphy.gif" },
  { title: "Social Content — Reels Pack", tag: "Social Media", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzBjcmlwczl0bGJvNTc0YWQ5bDIyaWl5aTlxNWVrODl1MGk3ZHRiYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WgN6VKw9oNNlyir3DD/giphy.gif" },
  { title: "E-Commerce — Studio Shots", tag: "Product Shoots", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnUxY3c4cHVuZXM1NnQxY3A1aHl4cmpvN2pldXgzdDczNTUwOXp5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l7bUBv6k24xwJXYRUU/giphy.gif" },
  { title: "Corporate Headshots — TechFirm", tag: "Brand Photo & Video", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWoxdTNxZmRhczBnYW5ja25kamU1YTl3czIyMGs0c3N6bGQzYjM0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT9IgjfoTrXbejHk9G/giphy.gif" },
  { title: "Ad Creatives — Billboard Series", tag: "Campaign Visuals", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzBjcmlwczl0bGJvNTc0YWQ5bDIyaWl5aTlxNWVrODl1MGk3ZHRiYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GD9MQamBYCvbotN0mA/giphy.gif" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function MarketingContent() {
  const [workItems, setWorkItems] = useState<VisualMarketingWork[]>([]);
  const [brands, setBrands] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetchWorks().then(setWorkItems).catch(() => {});
    Promise.all([fetchPortfolios(), fetchCategories()])
      .then(([portfolios, cats]) => {
        const clientCatId = cats.find(c => c.slug === CLIENT_CAT_SLUG)?.id;
        setBrands(portfolios.filter(p => p.categoryId === clientCatId));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Work Gallery */}
      <section className="py-24 bg-black/40 overflow-hidden">
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
            {workItems.length > 0
              ? workItems.slice(0, 6).map((item) => (
                  <motion.div key={item.id} variants={itemVariants} className="overflow-hidden bg-muted rounded-lg relative group">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="text-xs uppercase tracking-widest text-white/70">{item.tag ?? ""}</span>
                        <h3 className="font-bold text-base mt-1 uppercase tracking-tight text-white">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))
              : FALLBACK_WORK.map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="overflow-hidden bg-muted rounded-lg relative group">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.gif} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="text-xs uppercase tracking-widest text-white/70">{item.tag}</span>
                        <h3 className="font-bold text-base mt-1 uppercase tracking-tight text-white">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))
            }
          </motion.div>
        </div>
      </section>

      {/* Brands We've Worked With */}
      {brands.length > 0 && (
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
              <div className="absolute left-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />

              <Marquee direction="right" gradient={false} speed={40} pauseOnHover>
                {brands.map((brand) => (
                  <div key={brand.id} className="mx-6 sm:mx-10 md:mx-14">
                    <div className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={brand.url} alt={brand.title} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>
                ))}
              </Marquee>

              <Marquee direction="left" gradient={false} speed={25} pauseOnHover>
                {brands.map((brand) => (
                  <div key={brand.id} className="mx-6 sm:mx-10 md:mx-14">
                    <div className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={brand.url} alt={brand.title} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>
      )}

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
