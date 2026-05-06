import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MoreServicesGrid } from "@/components/more-services/services-grid";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: { absolute: "Wedding Services: Photography, Makeup, Catering & More | Visual Studios & Events" },
  description:
    "Full-service wedding planning partners: bridal makeup & hair, catering, Qaris & Imams, luxury transportation, venue bookings, henna, DJ & MCs, and more for South Asian & Muslim weddings in NY.",
=======
  title: { absolute: "Wedding Services: Photography & Video | Visual Studios & Events" },
  description:
    "Visual Studios & Events' wedding services: drone coverage, engagement sessions, same-day edits, and photo booths for South Asian & Muslim weddings in NY.",
>>>>>>> fac818696879a7d49d0c04722a97d51d8a7cbc2e
  keywords: [
    "south asian wedding services ny",
    "bridal makeup hair ny",
    "wedding catering ny",
    "qari imam nikkah ny",
    "luxury wedding transportation ny",
    "wedding venue booking ny",
    "drone wedding photography ny",
    "wedding add-on services",
    "henna mendhi ny",
    "photo booth wedding ny",
    "wedding vendor ny",
    "visualstudioslens services",
  ],
  alternates: { canonical: "/more-services" },
  openGraph: {
<<<<<<< HEAD
    title: "Wedding Services: Photography, Makeup, Catering & More | Visual Studios & Events",
=======
    title: "Wedding Services: Photography & Video | Visual Studios & Events",
>>>>>>> fac818696879a7d49d0c04722a97d51d8a7cbc2e
    description:
      "Bridal makeup & hair, catering, Qaris & Imams, luxury transportation, venue bookings, and more wedding partner services in NY.",
    url: "https://www.visualstudioslens.com/more-services",
  },
  twitter: {
<<<<<<< HEAD
    title: "Wedding Services: Photography, Makeup, Catering & More | Visual Studios & Events",
=======
    title: "Wedding Services: Photography & Video | Visual Studios & Events",
>>>>>>> fac818696879a7d49d0c04722a97d51d8a7cbc2e
    description:
      "Bridal makeup & hair, catering, Qaris & Imams, luxury transportation, venue bookings, henna, and more for South Asian & Muslim weddings in NY.",
  },
};

export default function MoreServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSection
        subtitle="Additional Options"
        title={<>More <span className="text-brand-500 font-great-vibes normal-case font-normal tracking-normal text-[1.2em] md:text-[1.4em] ml-1">Services</span></>}
        desc="Here are some of our additional options from our partners! We have some of the best teams & vendors to make your dream come true! Get our full packages with unbeatable prices when booked all together!"
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
      />

      <MoreServicesGrid />

      {/* SEO content — crawlable text about services */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Everything Your Wedding Needs</h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">
<<<<<<< HEAD
            Visual Studios & Events is more than a photography studio — we connect you with the best wedding partners
            in New York so you can plan everything in one place, at unbeatable bundle prices.
=======
            Visual Studios & Events captures more than weddings. From the first flutter of a maternity shoot to the joyful chaos
            of a first birthday, we bring the same cinematic eye and cultural sensitivity to every milestone in between.
>>>>>>> fac818696879a7d49d0c04722a97d51d8a7cbc2e
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Bridal Makeup &amp; Hair</h3>
              <p className="text-foreground/70 leading-relaxed">
                Look and feel your absolute best on your wedding day. Our partner makeup and hair artists specialize in
                South Asian and Muslim bridal looks — from traditional full-glam to soft, modern elegance. Services
                include bridal trials, day-of touch-ups, and bridesmaid packages across Brooklyn, Queens, and the tri-state area.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Catering</h3>
              <p className="text-foreground/70 leading-relaxed">
                Treat your guests to an unforgettable dining experience. Our catering partners offer full halal menus
                tailored for South Asian, Middle Eastern, and Caribbean weddings — from elaborate multi-course dinners
                to cocktail-hour spreads. Custom menus, dietary accommodations, and full service staff available.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Qaris &amp; Imams</h3>
              <p className="text-foreground/70 leading-relaxed">
                Bring spiritual beauty to your Nikkah ceremony with a skilled Qari or Imam. Our trusted partners
                perform Quran recitations, Nikkah ceremonies, and Islamic duas for weddings throughout New York.
                Ceremony formats available in Arabic, Urdu, Bengali, and English.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Luxury Transportation</h3>
              <p className="text-foreground/70 leading-relaxed">
                Arrive in style with our luxury wedding car partners. We coordinate Rolls-Royce, Bentley, limousine,
                and classic vintage car rentals for the wedding couple, bridal party, and family VIP transfers —
                available for Nikkah ceremonies, reception nights, and multi-day events across New York and New Jersey.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Venue Bookings</h3>
              <p className="text-foreground/70 leading-relaxed">
                Finding the perfect venue is one of the most important decisions you&apos;ll make. We partner with
                banquet halls, hotels, and event spaces across Brooklyn, Queens, Manhattan, Long Island, and New Jersey
                that cater to large South Asian and Muslim weddings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Stage &amp; Decorations</h3>
              <p className="text-foreground/70 leading-relaxed">
                Transform your venue into the backdrop of your dreams. Our decoration partners handle mandap
                set-ups, floral arrangements, stage lighting, drapery, and full event styling for South Asian
                and Muslim weddings of any scale across New York.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Maternity &amp; Baby Showers</h3>
              <p className="text-foreground/70 leading-relaxed">
                Pregnancy is a story worth telling beautifully. Our maternity sessions and baby shower photography
                are designed for South Asian and Muslim families — from intimate gatherings to elaborate Godh Bharai
                ceremonies — with full photo and video coverage across the tri-state area.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Birthday &amp; Milestone Events</h3>
              <p className="text-foreground/70 leading-relaxed">
                Whether it&apos;s a first birthday Ameen, a sweet sixteen, or a milestone anniversary party, we treat
<<<<<<< HEAD
                every event like a full production — covering décor, cake cutting, speeches, and candid moments,
                delivered through a private online gallery with print rights included.
=======
                every event like a full production. We cover the décor, the cake cutting, the speeches, and the candid
                moments in between — delivered through a private online gallery with print rights included.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Corporate Events &amp; Headshots</h3>
              <p className="text-foreground/70 leading-relaxed">
                Looking for professional event photography or executive headshots in Brooklyn or Queens? Visual Studios & Events
                provides polished, on-brand imagery for business conferences, product launches, company parties, and
                LinkedIn-ready headshot sessions. Group team sessions available on location or in our studio.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Family &amp; Portrait Sessions</h3>
              <p className="text-foreground/70 leading-relaxed">
                We offer standalone family portrait sessions at locations across New York — from Prospect Park to
                outdoor studio setups. Sessions are available year-round and can be styled around cultural dress,
                religious attire, or a look you love. Perfect for Eid portraits, holiday cards, and family reunions.
>>>>>>> fac818696879a7d49d0c04722a97d51d8a7cbc2e
              </p>
            </div>
          </div>

          <p className="mt-10 text-foreground/70 leading-relaxed">
            Book multiple services together for exclusive bundle pricing. Contact us via WhatsApp or the inquiry form
            to build a custom quote tailored to your event.
          </p>
        </div>
      </section>
    </div>
  );
}
