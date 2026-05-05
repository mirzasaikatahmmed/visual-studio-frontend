"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const WA = "https://wa.me/13473066637?text=";

type Service = {
  id: number;
  title: string;
  url: string | null;
  imageUrl: string;
  label: string;
};

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Stage & Decorations",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Stage & Decorations for my event. Could you share more details and pricing?"),
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 2,
    title: "Henna/Mendhi",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Henna/Mendhi services for my event. Could you share more details and pricing?"),
    imageUrl: "https://www.visualstudioslens.com/images/henna.png",
    label: "Book Now",
  },
  {
    id: 3,
    title: "DJ & MCs",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in DJ & MC services for my event. Could you share more details and pricing?"),
    imageUrl: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=800&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 4,
    title: "Cakes & Deserts",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Cakes & Desserts for my event. Could you share more details and pricing?"),
    imageUrl: "https://www.visualstudioslens.com/images/cake.png",
    label: "Book Now",
  },
  {
    id: 5,
    title: "Album Books",
    url: "/store",
    imageUrl: "https://www.visualstudioslens.com/images/album.png",
    label: "Visit Store",
  },
  {
    id: 6,
    title: "360 & Photo Booths",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in 360 Booth & Photo Booth services for my event. Could you share more details and pricing?"),
    imageUrl: "https://www.visualstudioslens.com/images/photobooth.png",
    label: "Book Now",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function ServiceCard({ service }: { service: Service }) {
  const isExternal = !!service.url && service.url.startsWith("http");

  const content = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
        style={{ backgroundImage: `url('${service.imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="transform transition-all duration-500 group-hover:-translate-y-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            {service.title}
          </h3>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 text-black font-bold uppercase tracking-widest text-xs bg-white backdrop-blur-md px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          {service.label}
          {isExternal ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
        </div>
      </div>
    </>
  );

  const className = "group relative block aspect-[16/10] md:aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-muted";

  if (!service.url) {
    return (
      <motion.div variants={itemVariants} className={className}>
        {content}
      </motion.div>
    );
  }

  if (isExternal) {
    return (
      <motion.a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <Link href={service.url} passHref>
      <motion.div variants={itemVariants} className={className}>
        {content}
      </motion.div>
    </Link>
  );
}

export function MoreServicesGrid() {
  return (
    <section className="pb-24 pt-12 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
