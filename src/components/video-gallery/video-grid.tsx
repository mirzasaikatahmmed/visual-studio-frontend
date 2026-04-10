"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const videos = [
    { title: "Artisan Coffee Commercial", category: "Commercial", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800" },
    { title: "Emily & David Wedding", category: "Event Coverage", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800" },
    { title: "Atlas Tech Summit", category: "Corporate", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800" },
    { title: "Luxury Fashion Campaign", category: "Fashion", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800" }
  ];

  return (
    <section className="pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {videos.map((video, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group cursor-pointer">
              <div className="relative aspect-video bg-muted mb-4 overflow-hidden rounded-2xl border border-white/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105" style={{ backgroundImage: `url('${video.img}')` }} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <Play fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{video.title}</h3>
              <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mt-1">{video.category}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-full hover:scale-105 inline-block transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            View Full Channel on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
