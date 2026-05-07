# Visual Studio — Master Website Brief & SEO Checklist

> Based on: **Visual Studio Master Website Brief & SEO Implementation Guide** (Visual Inked LLC)  
> Last audited against codebase: **2026-05-07**  
> Legend: ✅ Done · ❌ Not implemented · ⚠️ Partial / needs verification

---

## Section 3 — What's Already Working (Foundation)

| Status | Item |
|--------|------|
| ✅ | Site is on Next.js with proper sub-pages (`/portfolio`, `/video-gallery`, `/visual-marketing`, `/more-services`, `/store`, `/about`, `/contact`, `/faq`, `/packages`) |
| ✅ | Meta description, `og:title`, `og:description`, `og:image`, `twitter:card` present on every page |
| ✅ | Canonical URLs correctly set on every page |
| ✅ | `meta robots: 'index, follow' + max-image-preview:large` correctly configured |
| ✅ | Page titles are descriptive and keyword-aligned |
| ✅ | Female Crew section prominently featured on homepage with its own H2 and CTA |
| ✅ | Strong cultural-tradition coverage on homepage (Bengali, Pakistani, Indian, Sikh, Arab, Afghan, Multi-Cultural) |
| ✅ | Build Your Package interactive tool exists at `/packages` and works |
| ✅ | Calendly integration live for consultation booking |
| ✅ | Site uses proper sub-page URL structure (not pure SPA with hash routing) |

---

## Section 4 — Content & Pages: Refinements & Additions

### 4.1 About Page `/about`

| Status | Item |
|--------|------|
| ✅ | Studio overview (who we are, where we're based — Brooklyn, serving NY/NJ/CT) |
| ❌ | Founder bio — short intro (Sir will provide copy; not yet on page) |
| ❌ | Team / crew profiles — name, role, photo, short bio. Hardcoded grid, not dynamic carousel |
| ❌ | Studio photos — to be added once shoot is finished (Sir will deliver) |
| ❌ | Partners section — link to More Services partners; reference from `/about` |
| ✅ | Brand name fix — "X Studios" → "Visual Studio" and "X Print" → "Visual Ink Printing" (no bad references found in current codebase) |

### 4.2 Muslim-Friendly Services — New Page `/muslim-friendly-services`

| Status | Item |
|--------|------|
| ✅ | New dedicated page `/muslim-friendly-services` — built at `src/app/(main-layout)/muslim-friendly-services/page.tsx` |
| ✅ | No-Music Edits service card with full description |
| ✅ | Islamic-Touch Edits service card with full description |
| ✅ | Female-Only Crew + Editor Workflow — dark callout strip + service card |
| ✅ | Modesty-Aware Coverage service card |
| ✅ | Cultural & Religious Fluency section — tag cloud covers Nikkah, Walima, Mehndi, Holud, Akht, Bou Bhat, Bengali, Pakistani, Arab, Afghan weddings |
| ✅ | Question-anchored FAQ accordion (5 Q&As: no-music edits, hijabi brides, gender separation, Islamic-touch, cultural traditions) |

### 4.3 Portfolio `/portfolio`

| Status | Item |
|--------|------|
| ✅ | `/portfolio` page is populated |
| ❌ | Galleries organized by event type and cultural tradition |
| ❌ | Embed or link prominently to Pixieset homepage for full client galleries |
| ❌ | "Reactions" content section — short clips of clients seeing photos/film for the first time |
| ❌ | "Who we worked with" — commercial logos/names (once Sir confirms permission) |

### 4.4 Booking Flow & 10% Off Promo

| Status | Item |
|--------|------|
| ❌ | 10% off display in the estimate flow — clearly visible promotional discount auto-shown when client requests an estimate |
| ⚠️ | End-to-end test of contact form / project intake — confirm submissions actually email Sir |
| ❌ | "Inclusions" section on packages/booking page (Sir has drafted copy) |
| ❌ | Hero subtitle copy for the wedding photography page (Sir will hand off) |

### 4.5 Reviews & Social Proof — Three-Stream Module

| Status | Item |
|--------|------|
| ⚠️ | **Stream 1 — Google Business Reviews:** API route exists (`/api/google-reviews`) and is wired up, but only displayed partially; not fully integrated into a three-stream unified module |
| ⚠️ | **Stream 2 — In-Person Testimonials:** `TestimonialsSection` exists on homepage but is not combined with Google reviews in a unified module; no hardcoded first-name + event-type testimonials confirmed |
| ❌ | **Stream 3 — Social Media Reviews:** No social media review wall / Instagram tagged posts / TikTok mentions display |
| ❌ | Single unified "Reviews & Social Proof" section — tabbed or scrolling layout cycling all three streams |
| ❌ | Dedicated reviews-heavy zone on `/about` and `/contact` |
| ❌ | Clear "Leave us a review" CTA linking to Google Business listing |

---

## Section 5 — Visual Marketing Page: Three CTA Buttons

| Status | Item |
|--------|------|
| ❌ | Replace single "Start a Project" button with three distinct CTAs |
| ❌ | Button 1: **"Start a Project — Marketing Videos"** (routes to dedicated video-work intake form) |
| ❌ | Button 2: **"Set Up My Business — Full Build"** (routes to contact form tagged 'Business Setup') |
| ❌ | Button 3: **"Build My Website — Custom Site"** (routes to contact form tagged 'Website Build') |
| ❌ | All three buttons equally weighted — same size, same hover treatment |
| ❌ | Section heading updated: "Ready to Start a Project?" → "Three Ways We Can Help You Grow" |
| ❌ | Replace Giphy GIF placeholders in "Our Work" grid with real self-hosted commercial work |
| ❌ | Proper alt text on all work images: "Visual Studios commercial photography for [Client] — [Project Type]" |

---

## Section 6 — New Service: No-Photo Security

| Status | Item |
|--------|------|
| ❌ | No-Photo Security card added to `/more-services` grid |
| ❌ | Card title: "No-Photo Security" |
| ❌ | Card subtitle: "Privacy-first event coverage. We protect your guests from unwanted capture." |
| ❌ | CTA "Learn More" → dedicated `/no-photo-security` page (or contact form tagged 'No-Photo Security') |
| ❌ | Dedicated `/no-photo-security` landing page does not exist |
| ❌ | Question-anchored FAQ on page ("Can you stop guests from taking photos at our event?") |
| ❌ | No-Photo Security added to Service schema as a distinct offering |

---

## Section 7 — Schema Markup (JSON-LD)

| Status | Item |
|--------|------|
| ⚠️ | **7.1 LocalBusiness schema** — A `PhotographyBusiness` JSON-LD exists in `layout.tsx` but it is **not** the exact `LocalBusiness` block specified (missing `alternateName`, `legalName`, `priceRange`, `sameAs` social links in the correct format) |
| ❌ | **7.2 Organization schema** — No separate `Organization` JSON-LD block in root layout |
| ⚠️ | **7.3 Service schema** — Service schema now added to `/muslim-friendly-services`; still missing on homepage, `/visual-marketing`, `/no-photo-security` |
| ✅ | Service schema for: Muslim-Friendly Editing (no-music, Islamic touch) — added to `/muslim-friendly-services/page.tsx` |
| ❌ | Service schema still needed for: Wedding Cinematography, Visual Marketing / Brand Photo & Video, Female Crew & Editor Workflow, No-Photo Security, Custom Website Build, Business Setup / Branding |
| ⚠️ | **7.4 FAQPage schema** — FAQPage schema added to `/muslim-friendly-services`; still missing on homepage and `/faq` |
| ❌ | **7.5 Review / AggregateRating schema** — Not implemented (depends on three-stream reviews module being built first) |
| ❌ | **7.6 BreadcrumbList schema** — No breadcrumb schema on any sub-page |

---

## Section 8 — Hardcoded Content Fixes

| Status | Item |
|--------|------|
| ❌ | **8.1** Static pricing block added to `/packages` — hardcoded HTML table with starting prices ($499 Event Session, $1,400 1-Day Wedding, $3,500 Multi-Day, $800 Cinematic Film Add-On) visible to crawlers without JS |
| ❌ | **8.2** Image alt text audit completed — all `<img>` tags across the site have descriptive, keyword-rich alt text (especially `/portfolio` which is 90% images) |
| ✅ | **8.3** Phone number mismatch fixed — only `+1 (347) 306-6637` found in footer component (single shared footer) |
| ❌ | **8.3** Sneak peek timing inconsistency — homepage hero says "72-Hour" vs FAQ says "78 hours"; needs to be unified to one value |
| ⚠️ | **8.3** Total weddings stat — "1,000+" appears consistently on homepage and FAQ (consistent, but confirm accuracy with Sir) |
| ❌ | **8.4** "What's Included" lists on `/packages` and `/visual-marketing` confirmed as plain `<ul><li>` HTML (not only inside dynamic tool components) |

---

## Section 9 — Crawler Infrastructure (Sitemap + Robots)

| Status | Item |
|--------|------|
| ✅ | **9.1** `/sitemap.xml` — `app/sitemap.ts` exists and auto-generates sitemap via Next.js MetadataRoute |
| ✅ | `/muslim-friendly-services` added to sitemap (priority 0.9) |
| ❌ | `/no-photo-security` not yet in sitemap (page does not exist yet) |
| ✅ | **9.2** `/robots.txt` — exists in `/public/robots.txt` with AI bot allowlist (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, etc.) |
| ⚠️ | `robots.ts` via Next.js `app/` not used — static `public/robots.txt` used instead (functionally equivalent, but the dynamic version would be cleaner) |
| ❌ | **9.3** Domain verified in Google Search Console |
| ❌ | **9.3** Sitemap URL submitted to Google Search Console |
| ❌ | **9.3** Domain verified and sitemap submitted to Bing Webmaster Tools |
| ❌ | **9.3** Coverage and Performance reports being monitored weekly |

---

## Section 10 — AI Crawler-Specific Optimizations

| Status | Item |
|--------|------|
| ✅ | **10.1** Question-anchored FAQ on `/muslim-friendly-services` — 5 Q&As covering no-music edits, hijabi brides, gender separation, Islamic-touch editing, cultural traditions |
| ❌ | **10.1** Question-anchored content on `/packages` ("How much does a 3-day Bengali wedding cost?") |
| ❌ | **10.1** Question-anchored content on `/no-photo-security` ("Can you stop guests from taking photos?") |
| ❌ | **10.2** `/llms.txt` file added to `/public` folder |
| ⚠️ | **10.3** Semantic HTML tags audit — site uses many `<div>` wrappers; `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` usage not fully audited |
| ⚠️ | **10.3** Heading hierarchy (one `<h1>` per page, then `<h2>`, `<h3>`) — not fully verified across all pages |

---

## Section 11 — Site-Wide Fixes Found During Review

| Status | Item |
|--------|------|
| ✅ | **11.1** Phone number mismatch — footer is now a single shared component with one number (`+1 347-306-6637`) |
| ⚠️ | **11.2** Footer inconsistency — single shared footer component now exists; confirm it renders identically across all pages |
| ❌ | **11.3** Partner links on `/more-services` — three partner cards (Stage & Decorations, DJ & MCs, 360 Booths) all link to the same Instagram (`@neonskiesdecor`); each needs its own correct handle or "Coming Soon" |
| ❌ | **11.4** "Client Portal" footer link goes to `#` — either build it (Pixieset deep link) or remove it |
| ❌ | **11.4** "Download Pricing PDF" footer link goes to `#` — either generate a real downloadable PDF or remove it |
| ✅ | **11.5** Brand name confusion on `/about` — no instances of "X Studios" or "X Print" found in codebase |
| ❌ | **11.6** 72hr vs 78hr sneak peek inconsistency — homepage hero says "72-Hour", FAQ says "78 hours"; standardize to 72 |

---

## Section 12 — Unified Action Plan (Sprint Tracker)

### Sprint 1 — Foundation (P0 Blockers)

| Status | Priority | Task |
|--------|----------|------|
| ✅ | P0 | Fix phone number mismatch sitewide — canonical number matches Google Business Profile |
| ✅ | P0 | Find-and-replace 'X Studios' → 'Visual Studio' and 'X Print' → 'Visual Ink Printing' on `/about` |
| ❌ | P0 | Resolve 72hr vs 78hr sneak peek inconsistency between hero and FAQ |
| ⚠️ | P0 | Add LocalBusiness + Organization schema to root layout (Sections 7.1, 7.2) — `PhotographyBusiness` exists but needs updating to spec |
| ❌ | P0 | Add FAQPage schema to homepage and `/faq` (Section 7.4) |
| ✅ | P0 | Generate `/sitemap.xml` via `app/sitemap.ts` (Section 9.1) |
| ✅ | P0 | Generate `/robots.txt` with AI bot allowlist (Section 9.2) — exists as static file |
| ❌ | P0 | Submit sitemap to Google Search Console + Bing Webmaster Tools |
| ❌ | P0 | Add static pricing block to `/packages` (Section 8.1) |

### Sprint 2 — Discoverability & New Features (P1)

| Status | Priority | Task |
|--------|----------|------|
| ✅ | P1 | Build new `/muslim-friendly-services` page (Section 4.2) |
| ⚠️ | P1 | Add Service schema to all service pages — ✅ `/muslim-friendly-services` done; ❌ homepage and `/visual-marketing` still pending (Section 7.3) |
| ❌ | P1 | Add "No-Photo Security" card to `/more-services` + dedicated landing page (Section 6) |
| ❌ | P1 | Add Service schema for No-Photo Security |
| ❌ | P1 | Replace single "Start a Project" button on `/visual-marketing` with three CTAs — Marketing Videos, Set Up My Business, Build My Website (Section 5) |
| ❌ | P1 | Replace Giphy GIF placeholders on `/visual-marketing` "Our Work" grid with real commercial work |
| ❌ | P1 | Audit and add alt text to every image, especially `/portfolio` (Section 8.2) |
| ❌ | P1 | Add `/llms.txt` to public folder (Section 10.2) |
| ⚠️ | P1 | Standardize footer as a single shared component across all pages (confirmed single component exists; verify renders identically everywhere) |
| ❌ | P1 | Fix partner links on `/more-services` — confirm each Instagram handle or mark as "Coming Soon" |
| ❌ | P1 | Audit `/about` — add team profiles grid, partners section, founder bio if missing |
| ❌ | P1 | Add 10% off display in estimate / project intake flow |

### Sprint 3 — Polish & Rich Results (P2)

| Status | Priority | Task |
|--------|----------|------|
| ❌ | P1 | Build three-stream Reviews module — Google live pull + in-person testimonials + social media wall (Section 4.5) |
| ❌ | P1 | Wire AggregateRating + Review schema to live review data once module is built (Section 7.5) |
| ❌ | P1 | Add "Reactions" content section to `/portfolio` |
| ❌ | P2 | Add BreadcrumbList schema to all sub-pages (Section 7.6) |
| ❌ | P2 | Audit semantic HTML tags across the site — `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` |
| ❌ | P2 | Lighthouse / PageSpeed audit on each major page; report Core Web Vitals back to Sir |
| ❌ | P2 | Resolve broken footer links on `/more-services` (Client Portal, Download Pricing PDF) |
| ❌ | P2 | Embed YouTube commercial playlist on `/portfolio` or new `/commercial` subpage (after Sir uploads) |
| ⚠️ | P2 | Live Instagram feed embed on homepage — `InstagramSection` component exists; confirm it is rendering live feed correctly |
| ❌ | P2 | Standardize `twitter:card` to `summary_large_image` across all pages |

---

## Section 13 — Validation & Testing

| Status | Item |
|--------|------|
| ❌ | Schema validated via Google Rich Results Test after each sprint |
| ❌ | JSON-LD syntax verified via Schema.org Validator |
| ❌ | Google PageSpeed Insights audit run on all major pages |
| ❌ | Lighthouse audit in Chrome DevTools completed |
| ❌ | Google Search Console — Coverage, Enhancements, Performance monitored |
| ❌ | Bing Webmaster Tools — set up and monitoring |
| ❌ | Real-world AI test run after Sprint 1: Ask ChatGPT/Claude/Perplexity "What does Visual Studios in Brooklyn offer?", "How much does a Bengali wedding photographer in NYC cost?", "Are there Muslim-friendly wedding videographers in NY?" |

---

## Summary

> Last updated: **2026-05-07** — Section 4.2 `/muslim-friendly-services` page completed.

| Category | Done | Partial | Not Done |
|----------|------|---------|----------|
| Foundation (already working) | 10 | 0 | 0 |
| Content & Pages | 11 | 3 | 15 |
| Schema Markup (JSON-LD) | 1 | 3 | 3 |
| Hardcoded Content Fixes | 2 | 2 | 3 |
| Crawler Infrastructure | 3 | 1 | 4 |
| AI Optimizations | 1 | 2 | 2 |
| Site-Wide Bug Fixes | 2 | 1 | 4 |
| Validation & Testing | 0 | 0 | 7 |
| **Total** | **30** | **12** | **38** |
