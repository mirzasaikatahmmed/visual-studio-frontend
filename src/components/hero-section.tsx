import { ReactNode } from "react";

interface HeroSectionProps {
  title: ReactNode;
  subtitle: ReactNode;
  desc: string;
  image: string;
}

export function HeroSection({ title, subtitle, desc, image }: HeroSectionProps) {
  return (
    <section className="relative h-[60vh] md:h-[65vh] w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 transform scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Gradient that fades to the page's background color at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Dark overlay at top for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-3xl mt-20">
        <p className="text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase mb-4">{subtitle}</p>
        <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-tight text-white">{title}</h1>
        <p className="text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto">
          {desc}
        </p>
      </div>
    </section>
  );
}
