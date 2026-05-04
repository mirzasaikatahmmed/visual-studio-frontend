# Visual Studio Website — Addendum #1 Checklist

> Reference doc: `/home/saikat/Downloads/visual-studio-website-addendum-1.md`
> Apply on top of `HANDOFF-CHECKLIST.md`

---

## Section 1 — Remove Boilerplate Template Content

- [x] **Remove fake "Atlas Tech Corp" testimonial** — ✅ Cleared all 6 fake entries from `admin/testimonials/page.tsx` `initialTestimonials` (Atlas Tech Corp, The Grand Hotel, and 4 others). Admin dashboard now starts empty.
- [x] **Remove any other corporate filler reviews** — ✅ All removed alongside Atlas Tech Corp
- [ ] **Replace generic placeholder images** with real Visual Studio wedding photos — *(waiting on Sakib to send portfolio images)*

> **Note:** The public `TestimonialsSection` on the homepage already fetches exclusively from `/api/google-reviews` (Google Places API). If no API keys are set it returns an empty array and the section hides itself — no fake data ever reached the public site. Sakib needs to add `NEXT_PUBLIC_GOOGLE_PLACE_API_KEY` and `NEXT_PUBLIC_GOOGLE_PLACE_ID` to the environment variables to show real Google reviews.

---

## Section 2 — Address & Phone Consistency

- [x] **Fix address format in `footer.tsx`** — ✅ Fixed to `1097 Liberty Avenue, Brooklyn, NY 11208`
- [x] **Fix address format in `contact-content.tsx`** — ✅ Fixed
- [x] **Fix address format in `admin/settings/page.tsx`** — ✅ Fixed
- [x] **Fix address format in `privacy-policy/page.tsx`** — ✅ Fixed
- [x] **Fix address format in `terms-of-service/page.tsx`** — ✅ Fixed
- [x] **`app/layout.tsx` LocalBusiness schema** — ✅ Already correct (`streetAddress: "1097 Liberty Avenue"`)
- [x] **Phone number audit** — ✅ All instances use `+1 (347) 306-6637` consistently. No alternate numbers found.

---

## Section 3 — Above-the-Fold USP Icon Strip

- [x] **Build new `UspStrip` component** — ✅ Created at `src/components/home/usp-strip.tsx` with Camera, Zap, Tag, Users icons from lucide-react
- [x] **Wire `UspStrip` into `page.tsx`** — ✅ Placed directly after `<HeroSection />`

---

## Section 4 — H1 / Heading Fix for SEO

- [x] **Update `hero-section.tsx`** heading structure — ✅ Done
  - `<h1>`: `"Premier South Asian & Muslim Wedding Photographers in NYC"` — visible but subtle (white/40, xs tracking-widest), animates in with hero
  - Brand line `"Capturing Moments. Creating Experiences."` demoted to `<h2>` (visual animation unchanged)
  - Tagline unchanged below

---

## Section 5 — Female-Only End-to-End Workflow Callout

- [x] **Update `female-crew-section.tsx`** with stronger copy — ✅ Done
  - Heading updated to: `Female Crews & Female Editors — Available On Request`
  - Body updated to end-to-end female workflow copy (capture + editing)

---

## Section 6 — Schema Markup Updates

- [x] **Update `app/layout.tsx` schema** — ✅ Done
  - `"@type"` changed from `"LocalBusiness"` → `"PhotographyBusiness"`
  - `"priceRange": "$$$"` — already correct ✅
  - `makesOffer` block added (Photography Sessions, $499.00 USD)
  - `knowsAbout` array added (11 specialties: Muslim, Bengali, Pakistani, Indian, Sikh, Afghan, Arab, Nikkah, Mehndi, Walima)

---

## Section 7 — Homepage FAQ — Replace with 5 Specific Q&As

- [x] **Update `faq-section.tsx`** — ✅ replaced 6 Q&As with these 5:

  **Q1:** Do you offer female-only photography and videography teams?
  > Yes. We provide all-female crews and female editors on request — for the bride's getting-ready, Mehndi, ladies-only events, and end-to-end editing of your photos and footage.

  **Q2:** Our wedding spans 3 days (Mehndi, Baraat, Walima). Do you offer multi-day packages?
  > Absolutely. We specialize in multi-day South Asian weddings and offer custom packages to cover all your events seamlessly.

  **Q3:** How soon will we receive our photos and videos?
  > Sneak peeks within 48 hours. Full edited photo gallery in 3–4 weeks. Cinematic wedding film in 1–2 months.

  **Q4:** Do you know our specific cultural traditions?
  > Yes. With 1,000+ weddings shot, our team is fluent in Bengali, Pakistani, Indian, Sikh, Afghan, and Arab traditions — Nikkah, Mehndi, Holud, Sangeet, Baraat, Vidaai, Walima, and Anand Karaj.

  **Q5:** What is the deposit, and do you offer venue insurance?
  > We require a 30%–50% deposit to secure your date. Liability coverage is available on request — let us know your venue's COI requirements when you book.

- [x] **CTA links** — ✅ "View All FAQs →" (updated from "See All Questions →") + "Have More Questions? Contact Us" both present

---

## Section 8 — Live Instagram Feed

- [x] **Instagram feed already implemented** ✅ — `InstagramSection` is live on homepage pulling 6 posts from `@visualstudioofficial` via `/api/instagram`

---

## Priority Order

### ✅ Completed

| # | Task | Status |
|---|------|--------|
| 1 | Fix address format — footer, contact, admin settings, privacy policy, terms | ✅ Done |
| 2 | Audit + remove all fake/boilerplate testimonials from admin dashboard | ✅ Done |
| 3 | Build USP icon strip below hero (Camera, Zap, Tag, Users) | ✅ Done |
| 4 | Fix H1/H2 heading structure in hero section | ✅ Done |
| 5 | Update female crew section with end-to-end workflow copy | ✅ Done |
| 6 | Update homepage FAQ with 5 Sakib-specified Q&As | ✅ Done |
| 7 | Update schema: PhotographyBusiness, makesOffer, knowsAbout | ✅ Done |
| 8 | Instagram feed (Section 8) | ✅ Already done |

### ⚪ Waiting on Sakib

| # | Task | Blocked by |
|---|------|------------|
| 9 | Replace culture tile Unsplash images with real VS wedding photos | Sakib to send portfolio images |