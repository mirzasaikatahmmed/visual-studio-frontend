"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Target, TrendingUp } from "lucide-react";

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
          href="/contact"
          className="w-full sm:w-auto text-center px-8 py-4 sm:py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 hover:scale-105 transition-all uppercase tracking-widest text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center"
        >
          Start a Project
        </Link>
        <a
          href="https://visualstudionyc.pixieset.com/portfolio/"
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
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-fuchsia-500/50 transition-colors group">
              <Target className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-fuchsia-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Brand Photography</h3>
              <p className="text-muted-foreground">Professional headshots, team culture coverage, and narrative-driven brand stories.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-fuchsia-500/50 transition-colors group">
              <TrendingUp className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-fuchsia-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Product Shoots</h3>
              <p className="text-muted-foreground">Crisp e-commerce white background imagery and styled lifestyle product shots.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-fuchsia-500/50 transition-colors group">
              <BarChart3 className="w-12 h-12 mb-6 text-muted-foreground group-hover:text-fuchsia-400 transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Campaign Visuals</h3>
              <p className="text-muted-foreground">High-end stylized imagery tailored for ad spend, billboards, and print media.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 border border-border bg-background hover:border-fuchsia-500/50 transition-colors group">
              <div className="w-12 h-12 mb-6 flex items-center justify-center font-bold text-2xl border-2 border-muted-foreground text-muted-foreground rounded-full group-hover:text-fuchsia-400 group-hover:border-fuchsia-400 transition-colors">@</div>
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
                  <li className="flex items-center gap-3"><ArrowRight className="text-fuchsia-400" size={16} /> 150% Increase in Instagram Engagement</li>
                  <li className="flex items-center gap-3"><ArrowRight className="text-fuchsia-400" size={16} /> 45% Higher Ad Conversion Rate</li>
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-200 blur-[80px] rounded-full opacity-50 pointer-events-none" />
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
    </>
  );
}
