"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { fetchWorks, type VisualMarketingWork } from "@/lib/visualMarketingApi";
import { fetchPortfolios, fetchCategories, type Portfolio } from "@/lib/portfolioApi";
import { WebsiteInquiryModal } from "./website-inquiry-modal";
import { BusinessSetupModal } from "./business-setup-modal";
import { MarketingProjectModal } from "./marketing-project-modal";

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
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

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

      {/* Three Ways CTA */}
      <section className="py-32 bg-foreground text-background overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-800/30 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-background/40 mb-4">
              What We Build
            </p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              Three Ways We Can<br />Help You Grow
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
          >
            {/* Start a Project — opens modal */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
            >
              <button
                onClick={() => setProjectModalOpen(true)}
                className="group w-full flex flex-col items-center text-center px-8 py-10 border border-background/20 hover:border-background/60 hover:bg-background/5 transition-all duration-300 rounded-sm"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-background/40 mb-3">
                  Marketing Videos
                </p>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-background mb-3 group-hover:text-brand-400 transition-colors duration-200">
                  Start a Project →
                </h3>
                <p className="text-background/50 text-xs leading-relaxed">
                  Brand video, product shoots, social content
                </p>
              </button>
            </motion.div>

            {/* Set Up My Business — opens modal */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
            >
              <button
                onClick={() => setBusinessModalOpen(true)}
                className="group w-full flex flex-col items-center text-center px-8 py-10 border border-background/20 hover:border-background/60 hover:bg-background/5 transition-all duration-300 rounded-sm"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-background/40 mb-3">
                  Full Build
                </p>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-background mb-3 group-hover:text-brand-400 transition-colors duration-200">
                  Set Up My Business →
                </h3>
                <p className="text-background/50 text-xs leading-relaxed">
                  Branding, Google Business, systems, content
                </p>
              </button>
            </motion.div>

            {/* Build My Website — opens modal */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
            >
              <button
                onClick={() => setWebsiteModalOpen(true)}
                className="group w-full flex flex-col items-center text-center px-8 py-10 border border-background/20 hover:border-background/60 hover:bg-background/5 transition-all duration-300 rounded-sm"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-background/40 mb-3">
                  Custom Site
                </p>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-background mb-3 group-hover:text-brand-400 transition-colors duration-200">
                  Build My Website →
                </h3>
                <p className="text-background/50 text-xs leading-relaxed">
                  Custom Next.js sites with SEO &amp; schema
                </p>
              </button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <MarketingProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
      <BusinessSetupModal open={businessModalOpen} onClose={() => setBusinessModalOpen(false)} />
      <WebsiteInquiryModal open={websiteModalOpen} onClose={() => setWebsiteModalOpen(false)} />
    </>
  );
}
