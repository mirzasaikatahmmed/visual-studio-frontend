"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/lib/servicesApi";

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
    <Link href={service.url} passHref legacyBehavior>
      <motion.a variants={itemVariants} className={className}>
        {content}
      </motion.a>
    </Link>
  );
}

export function MoreServicesGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return null;
  }

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
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
