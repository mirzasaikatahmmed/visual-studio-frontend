"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

const WA = "https://wa.me/13473066637?text=";

type Service = {
  id: number;
  title: string;
  subtitle?: string;
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
    title: "Cakes & Desserts",
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
  {
    id: 7,
    title: "Bridal Makeup & Hair",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Bridal Makeup & Hair services for my event. Could you share more details and pricing?"),
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 8,
    title: "Catering",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Catering services for my event. Could you share more details and pricing?"),
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 9,
    title: "Qaris & Imams",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Qari/Imam services for my Nikkah or event. Could you share more details and availability?"),
    imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 10,
    title: "Luxury Transportation",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Luxury Transportation (cars) for my event. Could you share more details and pricing?"),
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 11,
    title: "Venue Bookings",
    url: WA + encodeURIComponent("Hi Visual Studios! I'm interested in Venue Booking assistance for my event. Could you share more details and available venues?"),
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
    label: "Book Now",
  },
  {
    id: 12,
    title: "No-Photo Security",
    subtitle: "Privacy-first event coverage. We protect your guests from unwanted capture.",
    url: "/no-photo-security",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop",
    label: "Learn More",
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
          {service.subtitle && (
            <p className="mt-2 text-white/70 text-xs md:text-sm max-w-xs mx-auto leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {service.subtitle}
            </p>
          )}
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

        {/* Build Your Package CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-10 lg:mt-14"
        >
          <Link href="/packages" className="group block relative overflow-hidden rounded-[2rem] border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-background to-background dark:from-brand-950/80 dark:via-[#161616] dark:to-background p-10 md:p-16 text-center hover:border-brand-500/60 transition-colors duration-500">
            {/* decorative glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-x-0 -top-20 h-48 bg-brand-500/10 blur-3xl rounded-full mx-auto w-3/4" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center group-hover:bg-brand-500/25 transition-colors duration-300">
                <Calculator size={28} className="text-brand-500" />
              </div>

              <div>
                <p className="text-brand-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                  Package Estimator
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
                  Build Your Package
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  Mix and match coverage, hours, add-ons, and deliverables — and get an instant price estimate before you even reach out.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 bg-brand-500 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full group-hover:bg-brand-400 transition-colors duration-300 shadow-lg shadow-brand-500/20">
                Start Estimating
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
