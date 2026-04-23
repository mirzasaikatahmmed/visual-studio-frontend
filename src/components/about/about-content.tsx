"use client";

import { motion } from "framer-motion";

export function AboutContent() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const teamMembers = [
    {
      name: "Mohammed Sakib",
      role: "CEO & Creative Director",
      desc: "I'm CEO and Creative Director of X Studios & Director of X Print. I lead the vision, direction, and creative strategy behind our projects, ensuring that every piece of work we deliver is both innovative and impactful.\n\nMy journey began with a deep passion for visual storytelling, which quickly grew into a drive to build something bigger than myself. At X Studios, I focus on combining artistry with leadership—guiding our team, shaping the creative process, and making sure every project reflects both technical excellence and authentic storytelling.\n\nBeyond the creative side, I also oversee the strategic growth of the studio, setting goals, building partnerships, and ensuring our business continues to expand while staying true to our mission.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop", // Placeholder, user will replace with transparent PNG
      imagePosition: "left"
    },
    {
      name: "Md Shadman Mahmood",
      role: "Founder & Managing Director",
      desc: "I'm the CEO of X Print, and Founder at X Studios. My journey started with a passion for building and growing businesses—turning an early printing hustle into a full creative service. With years of experience in sales, client management, and project guidance, I've developed a strong focus on helping clients bring their ideas to life with clarity and confidence.\n\nProfessionally, I manage sales, strategy, and client success, making sure every project runs smoothly from consultation to delivery. At X Studios, I play a key role—guiding clients through the creative process, ensuring deadlines are met, and aligning the business side with the artistic vision. Skilled in sales strategy, project coordination, and client care, I'm known for my ability to combine structure with creativity—supporting both long-term business growth and memorable client experiences.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      imagePosition: "right"
    },
    {
      name: "Syed Md Mahid",
      role: "Professional Photo Editor",
      desc: "I'm a photographer, editor, and creative producer, currently studying Information and Communication Engineering at East West University. Starting my journey in 2017, I quickly grew from mobile photography to earning national recognition, including a 2018 award from Youth Club Bangladesh and USAID.\n\nProfessionally, I work with FoodPanda, Kidzania, Quest Films, and X Studios (as a photo editor). I'm a part of X Studio for my strong eye for detail and expertise in enhancing images that align with the studio's creative vision. I also serve as Secretary of Design at the East West University Photography Club. Skilled in photography, editing, and creative production, I am known for my dedication and passion for turning ideas into visually impactful stories.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
      imagePosition: "left"
    }
  ];

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
          {/* Left Col - Huge Title */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(221,148,84,0.3)]">
              About <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-black to-black/40 dark:from-white dark:to-white/40">Studios</span>
            </h1>
            
            <div className="p-8 md:p-10 border-l-4 border-brand-400 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-r-3xl mt-12 md:mt-24 shadow-[0_0_40px_rgba(221,148,84,0.1)]">
              <p className="text-xl md:text-2xl font-bold italic mb-4 leading-relaxed">
                "Why only print the memories others captured? 
                <br/><br/>
                Why not capture them ourselves, and deliver the complete package, photography, videography, and prints?"
              </p>
            </div>
          </motion.div>

          {/* Right Col - Story */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-start pt-4 lg:pt-12">
            <div className="space-y-8 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
              <p className="font-medium text-foreground text-2xl">
                From Printing to Storytelling, X Studios began as an extension of our first venture, X Print, a printing business where we specialized in creating albums, posters, and prints for weddings and events.
              </p>
              <p>
                Couples and families would bring us their photos, and we would transform them into cherished keepsakes. One day, we asked ourselves the defining question that changed everything.
              </p>
              <p>
                With that vision, we started small; using an old Canon camera and DIY lighting. Our very first shoot was for a close relative's wedding. Nervous but determined, we captured every detail and the joy and appreciation from the family fueled our drive. From there, one client led to another and what began as a hobby quickly grew into a true passion and business.
              </p>
              <p className="font-bold text-foreground border-t border-foreground/10 pt-8 mt-8">
                Today, X Studios is a dedicated photography and videography company with a talented team of six and our own studio space. We specialize in weddings and general events — from maternity shoots and showers to birthdays and anniversaries. With every project, we aim to blend artistry with storytelling, ensuring that every moment is preserved in the most beautiful way possible.
              </p>
              <p>
                Our journey is proof that great things can start with small beginnings. What once was just an idea alongside X Print is now X Studios. A brand committed to capturing life's milestones with creativity, care, and excellence.
              </p>
            </div>

            <div className="mt-12 p-8 bg-brand-500/10 border border-brand-500/20 rounded-3xl">
              <h3 className="text-brand-500 dark:text-brand-400 font-bold uppercase tracking-widest text-sm mb-4">What We Do: Weddings & General Events</h3>
              <p className="text-foreground/90">Documentary coverage + cinematic highlights, vows/speeches capture, reception edits.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* 2nd Part: Meet Our Team */}
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
            <h3 className="text-4xl md:text-6xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-black dark:from-brand-300 dark:to-white drop-shadow-[0_0_15px_rgba(221,148,84,0.3)] dark:drop-shadow-[0_0_15px_rgba(221,148,84,0.5)]">Our Team</h3>
          </motion.div>

          <div className="space-y-32 md:space-y-40">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative bg-white dark:bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-black/5 dark:border-white/5 shadow-2xl flex flex-col ${member.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center md:items-stretch gap-8 md:gap-16`}
              >
                {/* Image Cutout Wrapper */}
                <div className={`w-64 h-64 md:w-80 md:h-auto shrink-0 relative ${member.imagePosition === 'right' ? 'md:translate-x-12' : 'md:-translate-x-12'} md:-translate-y-12`}>
                  {/* For actual cutout PNGs, the image will overflow beautifully. We use object-cover for placeholders. */}
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top rounded-3xl md:rounded-none md:absolute md:bottom-0 md:h-[120%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))" }}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-brand-600 dark:text-brand-400 font-bold italic tracking-wide mb-8">{member.role}</p>
                  
                  <div className="space-y-4 text-foreground/70 dark:text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {member.desc}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
