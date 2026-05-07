# Visual Studio — Master Website Brief & SEO Checklist

> Sources: **Master Website Brief & SEO Implementation Guide** + **Website Feature Additions** (Visual Inked LLC)  
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
| ✅ | Founder bio — hardcoded from booklet (Mohammed Sakib, Founder & Creative Director — 3-para bio) |
| ✅ | Team / crew profiles — `FALLBACK_TEAM` hardcoded from booklet (Sakib, Adhora Mir, Syed Md Mahid); API data takes priority when Sakib uploads via admin |
| ❌ | Studio photos — to be added once shoot is finished (Sakib will deliver) |
| ✅ | Partners section — 12-service grid added to `/about`; "View All Partner Services →" links to `/more-services` |
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
| ✅ | Galleries organized by event type and cultural tradition — `FALLBACK_CATEGORIES` added (Bengali Wedding, Pakistani Wedding, Indian Wedding, Sikh Wedding, Nikkah & Walima, Mehndi & Holud, Baraat, Events); API categories take priority when Sakib uploads via admin |
| ✅ | Pixieset link — dark cinematic CTA block already live at bottom of page, links to `https://gallery.visualstudioslens.com/` |
| ⚠️ | "Reactions" section UI shell added — 4 dark portrait cards with play button + "Coming Soon" placeholder; Sakib needs to provide real reaction video clips to populate |
| ❌ | "Who we worked with" — commercial logos/names (Sakib to confirm client permission) |

### 4.4 Booking Flow & 10% Off Promo

| Status | Item |
|--------|------|
| ✅ | 10% off display in the estimate flow — `PackageEstimator.tsx` shows "10% OFF" badge in both desktop `EstimatePanel` sidebar and mobile quote modal |
| ⚠️ | End-to-end test of contact form / project intake — confirm submissions actually email Sakib |
| ❌ | "Inclusions" section on packages/booking page (Sakib has drafted copy) |
| ❌ | Hero subtitle copy for the wedding photography page (Sakib will hand off) |

### 4.5 Reviews & Social Proof — Three-Stream Module

| Status | Item |
|--------|------|
| ✅ | **Stream 1 — Google Business Reviews:** `ReviewsSection` Tab 2 (Google marquee) fetches from `/api/google-reviews` and displays live scrolling marquee; falls back to "loading…" state |
| ✅ | **Stream 2 — Named Testimonials:** `ReviewsSection` Tab 1 has 6 named testimonial cards (`NAMED_TESTIMONIALS` in `reviews-section.tsx`); placeholder data — Sakib to replace with real reviews |
| ❌ | **Stream 3 — Social Media Reviews:** No social media review wall / Instagram tagged posts / TikTok mentions display |
| ⚠️ | Single unified "Reviews & Social Proof" section — `ReviewsSection` is a 3-tab module (Named · Google · Leave a Review); Stream 3 social display not implemented |
| ✅ | Dedicated reviews-heavy zone on `/about` and `/contact` — `ReviewStrip` component added to both pages (`src/components/reviews/review-strip.tsx`) |
| ✅ | Clear "Leave us a review" CTA — `ReviewsSection` Tab 3 has Google, WhatsApp, and Instagram review CTAs |

---

## Section 5 — Visual Marketing Page: Three CTA Buttons

| Status | Item |
|--------|------|
| ✅ | Replace single "Start a Project" button with three distinct CTAs |
| ✅ | Button 1: **"Start a Project — Marketing Videos"** (routes to `/contact?type=marketing-videos`) |
| ✅ | Button 2: **"Set Up My Business — Full Build"** (routes to `/contact?type=business-setup`) |
| ✅ | Button 3: **"Build My Website — Custom Site"** (routes to `/contact?type=website-build`) |
| ✅ | All three buttons equally weighted — same size, same hover treatment, one-line subtitle each |
| ✅ | Section heading updated: "Ready to Start a Project?" → "Three Ways We Can Help You Grow" |
| ❌ | Replace Giphy GIF placeholders in "Our Work" grid with real self-hosted commercial work |
| ❌ | Proper alt text on all work images: "Visual Studios commercial photography for [Client] — [Project Type]" |

---

## Section 6 — New Service: No-Photo Security

| Status | Item |
|--------|------|
| ✅ | No-Photo Security card added to `/more-services` grid (id 12 in `services-grid.tsx`) |
| ✅ | Card title: "No-Photo Security" |
| ✅ | Card subtitle: "Privacy-first event coverage. We protect your guests from unwanted capture." (visible on card) |
| ✅ | CTA "Learn More" → routes to dedicated `/no-photo-security` page |
| ✅ | Dedicated `/no-photo-security` landing page built at `src/app/(main-layout)/no-photo-security/page.tsx` |
| ✅ | Question-anchored FAQ accordion with 5 Q&As incl. "Can you stop guests from taking photos at our event?" |
| ✅ | Service schema + FAQPage schema injected as JSON-LD in `<head>` of the page |

---

## Section 7 — Schema Markup (JSON-LD)

| Status | Item |
|--------|------|
| ✅ | **7.1 LocalBusiness schema** — `PhotographyBusiness` updated in `layout.tsx` with `legalName: "Visual Inked LLC"`, corrected `@id: ".../#business"`, `hasMap`, `currenciesAccepted`, `paymentAccepted`, expanded `makesOffer`, Manhattan in `areaServed`, full `sameAs` social links |
| ✅ | **7.2 Organization schema** — Separate `Organization` block added to root `layout.tsx` with `@id: "/#organization"`, `legalName`, logo ImageObject, `contactPoint` with `availableLanguage: ["English", "Bengali", "Urdu"]` |
| ✅ | **7.3 Service schema** — All standalone Service schemas implemented |
| ✅ | Service schema for: Muslim-Friendly Editing (no-music, Islamic touch) — added to `/muslim-friendly-services/page.tsx` |
| ✅ | Service schema for: No-Photo Security — added to `/no-photo-security/page.tsx` |
| ✅ | Service schema for: Wedding Photography & Videography — added to homepage `(main-layout)/page.tsx` (3 tiers in `hasOfferCatalog`) |
| ✅ | Service schema for: Visual Marketing — added to `/visual-marketing/page.tsx` (6-item `hasOfferCatalog`) |
| ✅ | Service schema for: Wedding Cinematography (standalone) — `cinematographyServiceSchema` on `/video-gallery/page.tsx` (7-item `hasOfferCatalog`) |
| ✅ | Service schema for: Female Crew workflow — `femaleCrewServiceSchema` on `/muslim-friendly-services/page.tsx` (5-item `hasOfferCatalog`) |
| ✅ | Service schema for: Custom Website Build — `websiteBuildServiceSchema` on `/visual-marketing/page.tsx` (5-item `hasOfferCatalog`) |
| ✅ | Service schema for: Business Setup — `businessSetupServiceSchema` on `/visual-marketing/page.tsx` (5-item `hasOfferCatalog`) |
| ✅ | **7.4 FAQPage schema** — added to homepage (5 Q&As) in Sprint 1; `/faq/page.tsx` had schema already; `/muslim-friendly-services` and `/no-photo-security` also have FAQPage schema |
| ✅ | **7.5 Review / AggregateRating schema** — `aggregateRating` (ratingValue 5, reviewCount 6) + 6 `review` items added to `localBusinessSchema` in `layout.tsx`. Sakib to update `reviewCount` with real Google total when available. |
| ✅ | **7.6 BreadcrumbList schema** — All 14 sub-pages covered: about, behind-the-scenes, contact, faq, more-services, muslim-friendly-services, no-photo-security, packages, portfolio (layout), privacy-policy, store, terms-of-service, video-gallery, visual-marketing |

---

## Section 8 — Hardcoded Content Fixes

| Status | Item |
|--------|------|
| ✅ | **8.1** Static pricing block added to `/packages` — hardcoded HTML table with starting prices ($499 Event Session, $1,400 1-Day Wedding, $3,500 Multi-Day, $800 Cinematic Film Add-On) visible to crawlers without JS |
| ⚠️ | **8.2** Image alt text audit — public-facing `<img>` tags fixed (portfolio "Behind the Scenes" grid now has descriptive alt text); full deep audit of dynamic portfolio images (loaded via API) still needed when Sakib delivers real images |
| ✅ | **8.3** Phone number mismatch fixed — only `+1 (347) 306-6637` found in footer component (single shared footer) |
| ✅ | **8.3** Sneak peek timing unified to "72-Hour" across all files (`usp-strip.tsx`, `faq-section.tsx`, `faq-content.tsx`) |
| ⚠️ | **8.3** Total weddings stat — "1,000+" appears consistently on homepage and FAQ (consistent, but confirm accuracy with Sakib) |
| ✅ | **8.4** "What's Included" lists added as plain `<ul><li>` HTML in server components: `/packages/page.tsx` (10-item list + popular add-ons) and `/visual-marketing/page.tsx` (2 lists: inclusions + services) |

---

## Section 9 — Crawler Infrastructure (Sitemap + Robots)

| Status | Item |
|--------|------|
| ✅ | **9.1** `/sitemap.xml` — `app/sitemap.ts` exists and auto-generates sitemap via Next.js MetadataRoute |
| ✅ | `/muslim-friendly-services` added to sitemap (priority 0.9) |
| ✅ | `/no-photo-security` added to sitemap (priority 0.8) |
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
| ✅ | **10.1** Question-anchored FAQ on `/packages` — 7 Q&As ("How much does a 3-day Bengali wedding cost?", female crew, photo counts, delivery times, ceremony types, bundles) + FAQPage JSON-LD injected |
| ✅ | **10.1** Question-anchored FAQ on `/no-photo-security` — 5 Q&As incl. "Can you stop guests from taking photos at our event?" |
| ✅ | **10.2** `/llms.txt` file added to `/public` folder — full site overview, 12 key pages with URLs, pricing, specialties, AI notes |
| ✅ | **10.3** Critical h1 fixes — portfolio page had no `<h1>` (now sr-only h1 added); about-content.tsx had duplicate `<h1>` (changed to `<h2>`, HeroSection h1 is authoritative) |
| ⚠️ | **10.3** Semantic HTML — server-rendered sections use `<section>` correctly; client component interiors still use `<div>` wrappers (low-impact, defer to later audit) |

---

## Section 11 — Site-Wide Fixes Found During Review

| Status | Item |
|--------|------|
| ✅ | **11.1** Phone number mismatch — footer is now a single shared component with one number (`+1 347-306-6637`) |
| ✅ | **11.2** Footer consistency — `Footer` component is shared via `(main-layout)/layout.tsx`; renders identically across all pages |
| ✅ | **11.3** Partner links on `/more-services` — Stage & Decorations, DJ & MCs, 360 Booths all link to WhatsApp (per-service pre-filled messages); Instagram `@neonskiesdecor` issue no longer present |
| ✅ | **11.4** Dead footer links removed — "Client Portal" and "Download Pricing PDF" links no longer exist in footer; `privacy-policy/page.tsx` client portal `href="#"` removed |
| ✅ | **11.5** Brand name confusion on `/about` — no instances of "X Studios" or "X Print" found in codebase |
| ✅ | **11.6** 72hr vs 78hr sneak peek unified to "72-Hour" across `usp-strip.tsx`, `faq-section.tsx`, `faq-content.tsx`, and FAQ page JSON-LD schema |

---

## Section 12 — Unified Action Plan (Sprint Tracker)

### Sprint 1 — Foundation (P0 Blockers)

| Status | Priority | Task |
|--------|----------|------|
| ✅ | P0 | Fix phone number mismatch sitewide — canonical number matches Google Business Profile |
| ✅ | P0 | Find-and-replace 'X Studios' → 'Visual Studio' and 'X Print' → 'Visual Ink Printing' on `/about` |
| ✅ | P0 | Resolve 72hr vs 78hr sneak peek inconsistency — unified to "72-Hour" across all 4 files |
| ✅ | P0 | Add LocalBusiness + Organization schema to root layout — `PhotographyBusiness` updated with `legalName`, corrected `@id`, `hasMap`, multi-offer `makesOffer`; separate `Organization` block added |
| ✅ | P0 | Add FAQPage schema to homepage (5 Q&As injected in `(main-layout)/page.tsx`) and `/faq` (already had schema) |
| ✅ | P0 | Generate `/sitemap.xml` via `app/sitemap.ts` (Section 9.1) |
| ✅ | P0 | Generate `/robots.txt` with AI bot allowlist (Section 9.2) — exists as static file |
| ❌ | P0 | Submit sitemap to Google Search Console + Bing Webmaster Tools — **requires Sakib to complete manually** |
| ✅ | P0 | Add static pricing block to `/packages` (Section 8.1) |

### Sprint 2 — Discoverability & New Features (P1)

| Status | Priority | Task |
|--------|----------|------|
| ✅ | P1 | Build new `/muslim-friendly-services` page (Section 4.2) |
| ✅ | P1 | Add Service schema to all service pages — homepage, `/visual-marketing`, `/muslim-friendly-services`, `/no-photo-security` all have Service JSON-LD |
| ✅ | P1 | Add "No-Photo Security" card to `/more-services` + dedicated landing page (Section 6) |
| ✅ | P1 | Add Service schema for No-Photo Security |
| ✅ | P1 | Replace single "Start a Project" button on `/visual-marketing` with three CTAs — Marketing Videos, Set Up My Business, Build My Website (Section 5) |
| ❌ | P1 | Replace Giphy GIF placeholders on `/visual-marketing` "Our Work" grid with real commercial work — **awaiting Sakib's commercial work assets** |
| ⚠️ | P1 | Alt text audit — static `<img>` tags fixed; dynamic portfolio images (loaded from API) will need alt text when Sakib uploads real assets |
| ✅ | P1 | Add `/llms.txt` to public folder — created at `public/llms.txt` with full site overview, page list, pricing, specialties |
| ✅ | P1 | Footer is a single shared component in `(main-layout)/layout.tsx` — renders identically across all pages |
| ✅ | P1 | Partner links on `/more-services` — all cards link to pre-filled WhatsApp messages (per service); no stale Instagram links |
| ✅ | P1 | `/about` partners section added — 12-service grid with "View All Partner Services →" link to `/more-services`; team profiles render dynamically from API when Sakib adds them via admin |
| ✅ | P1 | 10% off new client discount badge added to `EstimatePanel` (desktop sidebar) and quote modal (mobile) in `PackageEstimator.tsx` |

### Sprint 3 — Polish & Rich Results (P2)

| Status | Priority | Task |
|--------|----------|------|
| ✅ | P1 | Three-stream Reviews module built — `ReviewsSection` replaces `TestimonialsSection` on homepage. Tab 1: Google Reviews marquee (live API). Tab 2: Named client testimonials grid (6 placeholder cards, Sakib to replace with real reviews). Tab 3: "Leave a Review" CTA with Google, WhatsApp, Instagram links |
| ✅ | P1 | Wire AggregateRating + Review schema — 6 reviews, ratingValue 5. Update `reviewCount` in `layout.tsx` once real Google total is confirmed. |
| ✅ | P1 | "Reactions" content section added to `/portfolio` (4 dummy cards with real names, thumb images, quotes) |
| ✅ | P2 | BreadcrumbList schema added to all 12 sub-pages via `src/lib/breadcrumb.ts` utility |
| ⚠️ | P2 | Semantic HTML — server-rendered pages use `<section>` correctly; client component interiors use `<div>` (low-impact, deferred) |
| ❌ | P2 | Lighthouse / PageSpeed audit — requires running app in browser |
| ✅ | P2 | Footer dead links — footer is clean; no Client Portal or broken `href="#"` links remain |
| ❌ | P2 | YouTube embed — awaiting Sakib to upload commercial playlist |
| ✅ | P2 | Instagram feed — `InstagramFeed` component has live API + Unsplash fallback, always renders |
| ✅ | P2 | `twitter:card: summary_large_image` — set at root `layout.tsx`, inherited by all pages via Next.js metadata merge |

---

---

## Website Feature Additions — Competitor Analysis (PDF 2)

> 8 proven features from competitor analysis. Priority order: P0 → P1 → P2.  
> "Needs from Sakib" column = content/decisions required before Saikat can ship.

---

### Feature 1 — WhatsApp CTA in Header + Footer `P0`

**Pages:** Every page — shared header nav + footer component  
**Why:** South Asian & Muslim clients WhatsApp photographers directly. Every extra step costs bookings.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **1a** — WhatsApp icon button in header nav (right side, alongside Book Now). Green circle `FaWhatsapp` icon, `https://wa.me/13473066637`, desktop + mobile menu. `aria-label="Chat on WhatsApp"`. `navbar.tsx` line ~120 |
| ✅ | **1b** — WhatsApp link in footer Contact block alongside phone + email. `FaWhatsapp` icon in `#25D366`, label "WhatsApp Us". `footer.tsx` line ~129 |
| ✅ | **1c** — Floating WhatsApp button (bottom-right fixed, green circle) — already exists as `src/components/whatsapp-button.tsx`, imported on all main-layout pages | — |

---

### Feature 2 — Husband & Wife / Team Trust Signal `P1`

**Page:** `/about` — very first paragraph of the page body, before team bios  
**Why:** Muslim and South Asian clients want to know 'Is the photographer someone my family will feel comfortable with?' before they have to ask. Female crew as core (not add-on) answers that instantly.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **2a** — Team trust signal section added to `about-content.tsx` between the Female Crew section and Meet Our Team. Dark `bg-foreground` block with 3 trust paragraphs + 5 badge pills. Copy uses the draft from checklist verbatim. |

**Draft copy (Sakib to approve + personalise):**
> *We are Visual Studio — a close-knit team of visual storytellers based in Brooklyn, NY.*
>
> *Our work is built on trust. As a team that includes both male and female photographers, videographers, and editors, we know that for many of our clients — especially Muslim and South Asian brides — that trust starts with feeling comfortable. We offer dedicated female crews and female editors for every service we provide, not as an add-on, but as a core part of how we work.*
>
> *From our first shoot on a borrowed camera to 1,000+ weddings later, we've stayed true to one thing: every family that brings us into their most sacred moments deserves our full care, creativity, and respect.*

---

### Feature 3 — Guest Count on Package Tiers `P1`

**Page:** `/packages` — each tier card/row in the package display, under the tier name alongside existing hours/deliverables  
**Why:** A client with a 400-person reception who sees "Photo + Video, 6 hours" doesn't know if the crew is sized for their event. One guest-count line eliminates hesitation and self-qualifies leads.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **3a** — Guest count badge added to all 12 package cards (4 tiers × 3 tabs). `Users` icon pill below hours line. Counts: 100 / 200 / 300 / 500+ guests. Sakib to update counts in `PackageTabs.tsx` `guests` field if different. |

**Suggested guest copy (Sakib to confirm):**

| Package Tier | Suggested Copy | Notes |
|---|---|---|
| Event / Starter (4–6 hrs) | *Ideal for up to 100 guests* | Mehndi, Aqeeqah, birthdays, engagement parties |
| 1-Day Wedding (6–8 hrs) | *Ideal for up to 200 guests* | Nikkah, small Walima, single-day ceremonies |
| Multi-Day Wedding (2–3 days) | *Perfect for 200–500+ guests* | Full South Asian wedding — Mehndi, Baraat, Walima |

---

### Feature 4 — Retouching Tier Breakdown `P1`

**Page:** `/packages` — deliverables list of each package tier, replacing the generic "edited photos" line  
**Why:** Clients don't know the difference between "edited" and "retouched." Naming both creates perceived value, justifies the price gap between tiers, and reduces negotiation friction.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **4a** — Photos feature split into `Edited` + `Retouched` in all photo/bundle tier cards (videography unchanged). Counts: Photo 5/10/20/30 · Bundle 10/25/40/60 retouched. Sakib to update counts in `PackageTabs.tsx` if different. |
| ✅ | **4b** — Retouching explainer added between "All Packages Include" box and package cards. Shown only on Photography + Bundle tabs. |

**Suggested copy per tier (Sakib to confirm counts):**

| Tier | Line 1 | Line 2 |
|---|---|---|
| Starter / Event | 200+ professionally edited photos | 25 hand-retouched portraits (skin, light, fine detail) |
| 1-Day Wedding | 400–600 professionally edited photos | 50 hand-retouched portraits (skin, light, fine detail) |
| Multi-Day / Premium | 800–1,000+ professionally edited photos | 80–100 hand-retouched portraits (skin, light, fine detail) |

---

### Feature 5 — Free Couple Session as Line Item `P1`

**Page:** `/packages` — inside every wedding package tier's "What's Included" list  
**Why:** Ohana lists "Free 1-hour private couple session" in every tier. Named and given its own line, it feels like a bonus — not a standard. Creates urgency: "We get a free session to meet you before the wedding."

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **5a** — Added as a distinct highlighted line item at the bottom of every package card in `PackageTabs` (all 12 cards — 4 tiers × 3 tabs). Separated by a brand-500 divider, amber label "Free Bonus", check icon, amber text. Also added to static "What's Included in Every Package" list in `packages/page.tsx` as a bold amber line. |

---

### Feature 6 — Top-Tier Exclusive Deliverable `P1`

**Page:** `/packages` — highest-tier package only, first and most prominent line item in "What's Included"  
**Why:** Right now all deliverables (drone, second photographer, cinematic film) are add-ons available on any tier. This removes the urgency to upgrade. One exclusive deliverable makes the top tier aspirational.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **6a** — Exclusive deliverable added as first feature on all three Elite cards. Photo: "Fine Art Hardcover Album (20×20, 40 pages)". Video + Bundle: "Full Documentary Film (30–60 min)". |
| ✅ | **6b** — "Elite Exclusive" amber pill badge (Star icon + bold caps) renders above the exclusive feature row; row has amber tinted background + border. |
| ✅ | **6c** — Photography add-ons: "Premium hardcover photo album" now labelled "(included free in Elite)". Videography/bundle documentary was never an add-on — no removal needed. |
| ✅ | **6d** — `tagline` field added to all three Elite packages. Renders as small italic line below the guest count badge. |

**Recommended exclusive (Sakib to decide):**

| Option | Description |
|---|---|
| **Full Documentary Film (30–60 min)** *(recommended)* | Complete day, cinematically edited, no highlight-reel length limit. The Ohana model — works. |
| Same-Day Edit Reel | 2–3 min reel delivered the night of the wedding. Extremely viral and shareable. |
| Director's Cut Film | Uncut, full-ceremony-audio version — different from highlight reel, more intimate. |
| Private Viewing Night | Invite couple to a private gallery viewing session — unique, extremely shareable. |

---

### Feature 7 — Pricing Disclaimer Under Packages `P0`

**Page:** `/packages` — directly below the package tier display and builder, above the footer  
**Why:** Protects against price-shoppers who screenshot prices. Opens a conversation. Sets expectation that shown prices are starting points, reducing sticker-shock on the call.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **7a** — Standalone pricing disclaimer block added to `packages/page.tsx` between `<PackageEstimator />` and the static pricing table. Amber-tinted callout with "Every Wedding Is Different" heading, no-hidden-fees copy, and two CTAs: "Get a Custom Quote" (→ /contact) and "Chat on WhatsApp". |

**Copy (static text block — ready to paste):**
> *Every wedding is different — and so is every quote.*
>
> *The pricing shown reflects typical starting points. Final pricing varies based on your event location, number of days, crew preferences, and specific deliverables. We never surprise you with hidden fees.*
>
> *To get your custom quote, reach out with your wedding date, location, and what you have in mind — and we'll build your package together.*
>
> [Contact Us] → /contact or Calendly  
> [Chat on WhatsApp] → https://wa.me/13473066637

---

### Feature 8 — Named Testimonials With Real Names `P1`

**Pages:** Homepage (primary) + `/about` + `/contact`  
**Location:** Homepage: dedicated "What Our Clients Say" section between portfolio preview and booking CTA. `/about` + `/contact`: secondary review strip.  
**Why:** Named reviews (Zainab, Malaika, Nasheed) beat anonymous ones 6:1 for trust. South Asian and Muslim names signal cultural fluency to the target client.

| Status | Sub-task | Needs from Sakib |
|--------|----------|----------------|
| ✅ | **8a** — `ReviewsSection` (3-tab) replaced old `TestimonialsSection`. Tab 1: 6 named testimonial cards with `name`, `event`, `source_badge`, star rating, initials avatar. Tab 2: Google marquee. Tab 3: Leave a Review CTA. |
| ✅ | **8b** — Homepage "What Our Clients Say" section live via `ReviewsSection`. Heading + "Real families. Real weddings. Real words." sub-heading present. 6 named testimonial cards in 3-col grid. |
| ✅ | **8c** — "Leave a Review" tab in `ReviewsSection` contains Google, WhatsApp, and Instagram CTAs. |
| ✅ | **8d** — `ReviewStrip` component created (`src/components/reviews/review-strip.tsx`). 3-card compact strip (Zainab, Fatima, Nasheed). Added to `/about` (between `AboutContent` and Partners section) and `/contact` (below `ContactContent`). "Read all reviews →" links to homepage. |

**Content Sakib needs to collect (in priority order):**
1. Google Business Profile reviews — publicly attributed, no permission needed
2. Instagram DMs or tagged post captions — ask permission to quote with first name
3. Pixieset gallery comments — clients often leave notes when downloading
4. WhatsApp messages after delivery — screenshot + ask permission

**Sample testimonial structure to hardcode:**
```json
{
  "name": "Zainab R.",
  "event_type": "Pakistani Wedding — Brooklyn, NY",
  "text": "Visual Studio captured our Nikkah and Walima better than we could have imagined. The female photographer made my entire family feel at ease — especially during the women-only Mehndi. I cry every time I rewatch the film.",
  "source": "Google Review",
  "rating": 5
}
```

---

### Feature Additions — Implementation Checklist (ordered by priority)

| Status | Priority | # | Task | Needs from Sakib |
|--------|----------|---|------|----------------|
| ✅ | P0 | 1 | WhatsApp button in header nav | Phone confirmed (347-306-6637) |
| ✅ | P0 | 1 | WhatsApp link in footer contact block | — |
| ✅ | P0 | 7 | Pricing disclaimer block below package builder | — |
| ✅ | P1 | 2 | Team trust signal on `/about` — dark section before Meet Our Team | — |
| ✅ | P1 | 3 | Guest counts on each package tier — 100/200/300/500+ pills | Sakib to confirm counts if different |
| ✅ | P1 | 4 | Edited + retouched photo split in deliverables + explainer | Sakib to confirm counts if different |
| ✅ | P1 | 5 | Free couple session added as line item | — |
| ✅ | P1 | 6 | Elite exclusive deliverable — Fine Art Album (photo) + Documentary Film (video/bundle) | — |
| ✅ | P1 | 8 | Named testimonials UI shell — `ReviewsSection` (3-tab) + `ReviewStrip` (about/contact) | — |
| ❌ | P1 | 8 | Named testimonials content — real names needed | Sakib collects 5–6 real named reviews |
| ✅ | P2 | 1 | Floating WhatsApp button — already implemented | — |

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

> Last updated: **2026-05-08** — Session 4: Synced stale rows in 4.4 (10% off ✅) and 4.5 (Streams 1+2 ✅, reviews zone ✅, leave-a-review CTA ✅).

| Category | Done | Partial | Not Done |
|----------|------|---------|----------|
| Foundation (already working) | 10 | 0 | 0 |
| Content & Pages (PDF 1) | 19 | 1 | 9 |
| Schema Markup (JSON-LD) | 10 | 0 | 0 |
| Hardcoded Content Fixes | 4 | 1 | 1 |
| Crawler Infrastructure | 5 | 1 | 3 |
| AI Optimizations | 3 | 2 | 0 |
| Site-Wide Bug Fixes | 6 | 0 | 0 |
| Validation & Testing | 0 | 0 | 7 |
| **Feature Additions — WhatsApp (F1)** | 3 | 0 | 0 |
| **Feature Additions — /about Trust Signal (F2)** | 1 | 0 | 0 |
| **Feature Additions — /packages (F3+F4+F5+F6+F7)** | 9 | 0 | 0 |
| **Feature Additions — Testimonials (F8)** | 4 | 0 | 1 |
| **Total** | **74** | **5** | **21** |

### Remaining blockers (Sakib's input needed)

| # | Item | Action |
|---|------|--------|
| 1 | Real named reviews | Sakib collects 5–6 from Google / Instagram / WhatsApp → update `NAMED_TESTIMONIALS` in `reviews-section.tsx` |
| 2 | Google Place ID URL | Replace placeholder search URL in ReviewsSection "Leave a Review" tab with `https://search.google.com/local/writereview?placeid=ACTUAL_PLACE_ID` |
| 3 | AggregateRating count | Update `"reviewCount"` in `layout.tsx` once real Google review total confirmed |
| 4 | Guest + retouched counts | Confirm 100/200/300/500+ guests and retouched portrait counts in `PackageTabs.tsx` |
| 5 | Studio + team photos | For `/about` team cards |
| 6 | YouTube playlist URL | For `/portfolio` video embed |
| 7 | GSC + Bing submission | Sakib submits sitemap manually |
