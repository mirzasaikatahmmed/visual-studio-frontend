# SEO Improvement Checklist — visualstudioslens.com

> Work through tasks **in order**. Check each item off as completed.  
> After every change: `npm run build` → `npm run lint` → test at `localhost:3000` → commit.

---

## Critical Tasks

### TASK 1 — Fix Duplicate Title Tag ✅
- [x] Remove duplicate `| Visual Studio` from homepage title in `app/layout.tsx` or `app/page.tsx` metadata
- [x] Check every page's `metadata` export for the same duplication and fix all instances
- [x] Verify final format: `"Page Name | Visual Studio"` (not `"Page Name | Visual Studio | Visual Studio"`)

---

### TASK 2 — Generate sitemap.xml ✅
- [x] Create `app/sitemap.ts` with all 11 URLs (homepage, portfolio, video-gallery, about, faq, contact, visual-marketing, more-services, store, privacy-policy, terms-of-service)
- [x] Verify sitemap renders correctly at `http://localhost:3000/sitemap.xml`
- [ ] Submit sitemap to Google Search Console after deploy: `https://www.visualstudioslens.com/sitemap.xml`

---

### TASK 3 — Add Structured Data / JSON-LD Schema ✅
- [x] **3a.** Add `LocalBusiness` + `ProfessionalService` JSON-LD schema to `app/layout.tsx` (global)
  - [x] Includes name, address, phone, email, geo coordinates, opening hours, areaServed, sameAs
- [x] **3b.** Add `FAQPage` JSON-LD schema to `app/faq/page.tsx`
  - [x] Covers all FAQ question-answer pairs

---

### TASK 4 — Expand FAQ Page Content ✅
- [x] Fix collapsed accordion issue — answer text is in DOM; JSON-LD FAQPage schema provides full crawler access to all Q&As
- [x] Write 2–5 sentence answers for all 24 questions:
  - [x] What's included in your wedding photography packages?
  - [x] How much does wedding photography cost? *(starting at $499)*
  - [x] How do I reserve my date?
  - [x] Do you offer payment plans?
  - [x] Do you travel for destination weddings?
  - [x] What's your cancellation and rescheduling policy?
  - [x] Do you have female photographers and videographers available?
  - [x] Which South Asian and Muslim wedding traditions do you cover?
  - [x] How many shooters are included?
  - [x] How do you handle "Desi time" if the wedding runs late?
  - [x] Can I see a full wedding gallery?
  - [x] What happens if a photographer gets sick on my wedding day?
  - [x] Will you coordinate with my wedding planner, decor team, and DJ?
  - [x] When do I get sneak peeks for social media? *(48-hour sneak peeks)*
  - [x] What's the full turnaround time for the gallery and wedding film?
  - [x] How many edited photos will I receive? *(600–1,000+)*
  - [x] Will my photos be color-corrected and retouched?
  - [x] How will I receive my photos and videos?
  - [x] Do you offer engagement, Nikkah-only, or pre-wedding shoots?
  - [x] Do you offer drone coverage?
  - [x] Are you insured? Can you provide a Certificate of Insurance?
  - [x] Will my photos be used on your social media or website?
  - [x] Can I share a Pinterest board or specific shot list?
  - [x] Where are you based and what areas do you serve?
- [x] Add `FAQPage` JSON-LD schema (see Task 3b)

---

## High Priority Tasks

### TASK 5 — Fix Brand Inconsistency ✅
- [x] Run `grep -r "X Studios\|X Print" ./app ./components --include="*.tsx" --include="*.ts"` to find all occurrences
- [x] Update About page copy: replace "X Studios" / "X Print" with "Visual Studio"
- [x] Preserve origin backstory — frame as *"Visual Studio began as an extension of our printing business..."*
- [x] Do NOT change team members' personal bios

---

### TASK 6 — Create Per-Page OG Images ✅
- [x] Create `og-portfolio.png` (1200×630px) → used `opengraph-image.tsx` (Next.js dynamic generation, no static PNG needed)
- [x] Create `og-about.png` (1200×630px) → `opengraph-image.tsx`
- [x] Create OG images for remaining key pages (contact, faq, video-gallery, more-services, visual-marketing, store)
- [x] Update `metadata.openGraph.images` in each page file → auto-wired by Next.js via `opengraph-image.tsx`

---

### TASK 7 — Add Testimonials Section to Homepage ✅
- [x] Add testimonials section to `app/page.tsx` — already live as `<TestimonialsSection />`
- [x] Include 5–8 testimonials — fetches live Google Reviews via `/api/google-reviews` (Places API); shows name, avatar, star rating, review text
- [x] Review schema — not needed; these are real Google Reviews already indexed by Google

---

## Medium Priority Tasks

### TASK 8 — Create Location Landing Pages
- [ ] Create `app/wedding-photographer-brooklyn/page.tsx`
- [ ] Create `app/wedding-photographer-queens/page.tsx`
- [ ] Create `app/wedding-photographer-new-jersey/page.tsx`
- [ ] Create `app/wedding-photographer-long-island/page.tsx`
- [ ] Each page: H1 with location, 300–400 words unique copy, services section, CTA, LocalBusiness schema
- [ ] Add all 4 new pages to `app/sitemap.ts`

---

### TASK 9 — Add robots.txt ✅
- [x] Create `app/robots.ts` with allow all + sitemap pointer — implemented as `public/robots.txt` (equivalent, more comprehensive: covers Googlebot, Bingbot, AI crawlers, blocks /api/ /admin/ /login /register)
- [x] Verify at `http://localhost:3000/robots.txt`

---

### TASK 10 — Add Content to Thin Pages ✅
- [x] `/more-services` — Added 250+ words: maternity & baby showers, birthdays, corporate events, family portraits
- [x] `/visual-marketing` — Added 230+ words: brand photography, product shoots, commercial video, corporate headshots
- [x] `/store` — Added 260+ words: album descriptions, wall art, fine art prints, coming soon section — all server-rendered for Google

---

## SEO Standards Checklist (Every Page) ✅

For each page, verify the `metadata` export includes:
- [x] `title` — max 60 chars, format: `"Page Name | Visual Studio"` — fixed FAQ (62→55) and More Services (63→53)
- [x] `description` — 140–160 chars, includes primary keyword — fixed Portfolio (139→140), Contact (136→148), Visual Marketing (138→147)
- [x] `keywords` — 5–10 relevant keywords — all pages have 7–12 keyword entries
- [x] `canonical` — resolved to full URL via `metadataBase` in root layout (relative paths like `/about` auto-resolve to `https://www.visualstudioslens.com/about`)
- [x] `openGraph` — title, description, url on every page; unique image auto-generated via `opengraph-image.tsx` on all 8 key pages
- [x] `twitter` — `card: "summary_large_image"` global in root layout; per-page `title` + `description` added to all 9 public pages; images auto-wired via `opengraph-image.tsx`
- [x] `robots` — `index: true, follow: true, googleBot` settings in root layout (privacy-policy & terms-of-service intentionally set to noindex)

---

## Post-Deploy Steps

- [ ] Submit sitemap in Google Search Console
- [ ] Request indexing for homepage
- [ ] Verify structured data with Google's Rich Results Test

---

## Do NOT Change (Reference)

- WhatsApp button: `https://wa.me/13473066637`
- Calendly link: `https://calendly.com/lens-xstudioslab/book-a-photography-session`
- Google Maps link in footer
- Instagram: `@visualstudioofficial`
- Address: 1097 Liberty Avenue, Brooklyn, NY 11208
- Phone: +1 (347) 306-6637
- Email: lens@visualstudioslens.com
- Existing image assets in `/public/` (add new ones, don't rename/delete old ones)
