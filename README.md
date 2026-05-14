# Visual Studios & Events — Frontend

Website for **Visual Studios & Events**, a South Asian & Muslim wedding photography and cinematography studio based in Brooklyn, NY.

Live site: [visualstudioslens.com](https://www.visualstudioslens.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| UI Primitives | Radix UI |
| State | Zustand + TanStack React Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Real-time | Socket.io client |
| Icons | Lucide React |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Google Places API — for the reviews marquee on the homepage
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your_google_places_api_key
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_google_place_id

# Instagram Basic Display API — for the Instagram feed section
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
```

`NEXT_PUBLIC_GOOGLE_PLACE_API_KEY` and `NEXT_PUBLIC_GOOGLE_PLACE_ID` power the live Google Reviews carousel on the homepage. Without them the carousel falls back silently and shows no reviews.

`INSTAGRAM_ACCESS_TOKEN` powers the Instagram feed section. Without it the section is hidden.

### Run the dev server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Dev mode uses Turbopack for fast rebuilds.

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── (main-layout)/        # Public-facing pages (Navbar + Footer)
│   ├── (dashboard-layout)/   # Admin dashboard (auth-gated)
│   └── api/                  # Next.js API routes
├── components/
│   ├── home/                 # Homepage section components
│   ├── layout/               # Navbar, Footer
│   ├── packages/             # Package tabs and pricing UI
│   ├── reviews/              # Reviews marquee (Google + named testimonials)
│   ├── testimonials/         # Testimonials page grid
│   ├── faq/                  # Full FAQ accordion
│   ├── ui/                   # Shared Radix-based UI primitives
│   └── ...                   # One folder per page/feature
└── lib/
    └── breadcrumb.ts         # Shared breadcrumb JSON-LD utility
```

---

## Pages

### Public (`/`)

| Route | Description |
|---|---|
| `/` | Homepage — hero, USP strip, expertise, cultures, female crew, reviews, FAQ, Instagram feed |
| `/about` | Team profiles and studio story |
| `/portfolio` | Photo portfolio with cinematic lightbox and category filters |
| `/video-gallery` | Wedding films and video gallery |
| `/packages` | Interactive pricing tabs — Photography, Videography, Photo+Video bundles |
| `/faq` | Full FAQ accordion grouped into Booking, Cultural Coverage, Delivery, Logistics |
| `/testimonials` | Curated client testimonial grid with photos |
| `/contact` | Contact and booking inquiry form |
| `/more-services` | Extended service listing |
| `/muslim-friendly-services` | Dedicated page for Muslim/Islamic wedding coverage details |
| `/no-photo-security` | No-photo security policy for conservative events |
| `/behind-the-scenes` | BTS content — crew, team members, candid moments |
| `/visual-marketing` | Visual marketing and brand content services |
| `/store` | Print and product store |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

### Admin Dashboard (`/admin`)

Requires authentication. All admin routes live under the `(dashboard-layout)` route group.

| Route | Description |
|---|---|
| `/admin` | Overview dashboard — stats, quick links |
| `/admin/portfolios` | Manage portfolio images + digital gallery link |
| `/admin/media` | Media library management |
| `/admin/videos` | Video content management |
| `/admin/events` | Upcoming and past events |
| `/admin/inquiries` | Contact form submissions inbox |
| `/admin/quotes` | Quote requests management |
| `/admin/testimonials` | Testimonials moderation |
| `/admin/store` | Store product management |
| `/admin/traffic` | Site traffic analytics |
| `/admin/visual-marketing` | Visual marketing projects |
| `/admin/stay-inspired` | Stay Inspired popup content |
| `/admin/vision-craft` | Vision Craft content management |

---

## API Routes

| Route | Description |
|---|---|
| `GET /api/google-reviews` | Fetches reviews from Google Places API using `NEXT_PUBLIC_GOOGLE_PLACE_API_KEY` and `NEXT_PUBLIC_GOOGLE_PLACE_ID`. Returns `{ reviews, rating, totalRatings }`. Returns an empty result gracefully if env vars are missing. |

---

## Key Design Decisions

**Brand token** — amber colour is always referenced as `brand-500` (e.g. `text-brand-500`, `bg-brand-500`). Never use hard-coded hex values.

**Server vs client components** — Pages are server components handling metadata and JSON-LD schema injection. Interactive sections (accordions, tabs, carousels, animations) are `"use client"` components.

**SEO** — Every public page has a `metadata` export with `title`, `description`, `keywords`, `alternates.canonical`, `openGraph`, and `twitter` fields. JSON-LD schemas (FAQPage, LocalBusiness, BreadcrumbList) are injected via `<script type="application/ld+json">`.

**Fallback data pattern** — Components that fetch from the backend API always have hardcoded fallback data so the page renders correctly even if the API is down or the env var is missing.

**Reviews carousel** — The homepage `ReviewsSection` triples the combined reviews array (`[...reviews, ...reviews, ...reviews]`) and animates `x` from `0%` to `-33.33%` for a seamless infinite marquee. This is intentional — not a duplication bug.

**Image handling** — `next.config.ts` sets `images.unoptimized: true` with open `remotePatterns` to allow images from any host (Unsplash, the backend CDN, Google avatar URLs).

---

## Brand & Content Notes

- **Studio:** Visual Studios & Events | Visual Inked LLC
- **Location:** 1097 Liberty Avenue, Brooklyn, NY 11208
- **Phone/WhatsApp:** +1 (347) 306-6637
- **Email:** lens@visualstudioslens.com
- **Instagram:** @visualstudioofficial
- **Specialisation:** South Asian & Muslim weddings — Bengali, Pakistani, Indian, Sikh, Arab, Afghan
- **Key promise:** 72-hour sneak peek · 4–6 week photo delivery · 6–8 week film delivery · 30% retainer to book

---

## Deployment

The project is configured for static export compatibility (`images.unoptimized: true`) and can be deployed on any platform that supports Node.js or static hosting. Vercel is the recommended platform for zero-config Next.js deployment.

```bash
npm run build   # produces .next/ output
npm run start   # serves the production build locally
```
