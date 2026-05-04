# Visual Studio Website — Fix & Missing Checklist

> Handoff from Sakib (Founder) → Saikat (Developer)
> Site: https://www.visualstudioslens.com
> Stack: Next.js + Shopify Storefront API

---

## 🔴 URGENT — Broken on Live Site Right Now

- [x] **`/faq` returns 404** — ✅ Page built at `src/app/(main-layout)/faq/page.tsx`
- [ ] **"Download Pricing PDF" is `href="#"`** — `footer.tsx:152`. Replace with real PDF URL or hide until ready
- [x] **"Client Portal" is `href="#"`** — ✅ Removed from footer
- [x] **Homepage FAQ section shows no questions** — ✅ Rewritten as static component with 6 curated Q&As from the handoff PDF; links to `/faq` for full list

---

## 🟠 SEO Meta Tags — Replace Generic Ones

- [x] **Homepage title** → `"South Asian & Muslim Wedding Photographer NYC | Visual Studio"`
- [x] **Homepage description** → Bengali, Pakistani, Indian, Muslim wedding keywords + NYC
- [x] **Open Graph tags** — updated on root layout and all pages (og:title, og:description, og:image, og:url, og:type)
- [x] **Twitter Card tags** — updated on root layout (twitter:card, twitter:title, twitter:description)
- [x] **Canonical** — updated to full URL `https://www.visualstudioslens.com` on root layout and homepage
- [x] **Root layout title template** — changed from `"%s | Visual Studios & Events"` → `"%s | Visual Studio"`
- [x] **Per-page `metadata` exports** updated:
  - [x] `/portfolio` → `"Wedding Photography Portfolio — Bengali, Pakistani & Muslim Weddings | Visual Studio"` (via `portfolio/layout.tsx` since page.tsx is a client component)
  - [x] `/video-gallery` → `"Cinematic Wedding Films NYC | Visual Studio"` (also fixed "Gallary" typo in hero)
  - [x] `/about` → `"About Visual Studio — NYC's South Asian Wedding Photographers"`
  - [x] `/contact` → `"Book Your Wedding Photographer NYC | Visual Studio"`
  - [x] `/faq` → `"Wedding Photography FAQ — Pricing, Coverage, Female Crew | Visual Studio"` (already done)
  - [x] `/more-services` → `"Wedding Services — Photography, Cinematography & Add-Ons | Visual Studio"`
  - [x] `/store` → `"Wedding Photo Albums & Prints | Visual Studio"`
  - [x] `/visual-marketing` → `"Visual Marketing & Brand Photography NYC | Visual Studio"`

---

## 🟠 New Page — Build `/faq`

> ✅ Page built at `src/app/(main-layout)/faq/page.tsx` + `src/components/faq/faq-content.tsx`

- [x] **Build the `/faq` page** with accordion UI — custom framer-motion accordion matching site theme
- [x] **Page heading**: `"FAQ & Booking Guide"` hero + `"Don't see your question? Contact us"` link
- [x] **Section A — Booking & Pricing** (fill `[INSERT]` placeholders once Sakib provides data):
  - [x] What's included in your wedding photography packages?
  - [x] How much does wedding photography cost? *(placeholder — needs starting price from Sakib)*
  - [x] How do I reserve my date? *(placeholder — needs retainer % and timing from Sakib)*
  - [x] Do you offer payment plans?
  - [x] Do you travel for destination weddings?
  - [x] What's your cancellation and rescheduling policy?
- [x] **Section B — Cultural Coverage & The Day Itself**:
  - [x] Do you have female photographers and videographers available?
  - [x] Which South Asian and Muslim wedding traditions do you cover?
  - [x] How many shooters are included?
  - [x] How do you handle "Desi time" if the wedding runs late?
  - [x] Can I see a full wedding gallery including emotional moments like Vidaai or Rukhsati?
  - [x] What happens if a photographer gets sick on my wedding day?
  - [x] Will you coordinate with my wedding planner, decor team, and DJ?
- [x] **Section C — Delivery & Editing** *(sneak peek & turnaround times use PDF estimates — update when Sakib confirms)*:
  - [x] When do I get sneak peeks for social media?
  - [x] What's the full turnaround time for the gallery and wedding film?
  - [x] How many edited photos will I receive?
  - [x] Will my photos be color-corrected and retouched?
  - [x] How will I receive my photos and videos?
- [x] **Section D — Logistics & Extras**:
  - [x] Do you offer engagement, Nikkah-only, or pre-wedding shoots?
  - [x] Do you offer drone coverage?
  - [x] Are you insured? Can you provide a Certificate of Insurance?
  - [x] Will my photos be used on your social media or website?
  - [x] Can I share a Pinterest board or specific shot list?
  - [x] Where are you based and what areas do you serve?
- [x] **Add JSON-LD FAQPage schema** — ✅ done in `faq/page.tsx` with 11 Q&As

---

## 🟠 JSON-LD Schema Markup — Nothing Exists Yet

- [x] **3a. FAQPage schema** — ✅ added to `app/(main-layout)/faq/page.tsx` with 11 Q&As
- [x] **3b. LocalBusiness schema** — ✅ added to `app/layout.tsx` root `<head>` (loads on every page):
  - [x] Name, alternateName, address, phone, email
  - [x] Geo coordinates (lat 40.678613, lng -73.868806)
  - [x] `areaServed`: NYC, Brooklyn, Queens, Long Island, NJ, CT
  - [x] `priceRange`: `"$$$"`, `sameAs`: Instagram
- [x] **3c. Service schema** — ✅ added to `app/(main-layout)/portfolio/layout.tsx` with 10 service types:
  - Bengali, Pakistani, Indian, Muslim Nikkah, Mehndi & Holud, Walima, Anand Karaj, Cinematic Film, Drone, Engagement Sessions

---

## 🟡 New Homepage Sections — Need to Be Built

> None of these currently exist in the homepage component tree.

- [x] **"Cultures We Serve"** section — ✅ Built at `src/components/home/cultures-section.tsx`, wired into homepage
  - 6 culture tiles each with a sample photo (Unsplash — replace with real photos when available)
  - CTA: `"View Full Portfolio →"`
- [x] **"Female Crew Available"** callout banner — ✅ Built at `src/components/home/female-crew-section.tsx`, wired into homepage
- [x] **"What's Included"** section — ✅ Built at `src/components/home/whats-included-section.tsx`, wired into homepage
- [x] **Trust signals strip** — ✅ Built at `src/components/home/trust-signals-section.tsx`, wired above footer *(⚠️ "5+ Years" — confirm exact years/weddings count with Sakib)*

---

## 🟡 CTA Conflict on Homepage

- [x] **CTA conflict resolved** — Booking section redesigned: "Book a Consultation" (Calendly) is now the primary filled card with a "Recommended" badge; "Contact Us" is the secondary outline card; "Pricing Guide" shows "Coming Soon" (disabled) until Sakib provides the PDF URL

---

## 🟡 robots.txt + Sitemap — Neither Exists

- [x] **Created `/public/robots.txt`** — blocks `/api/`, `/_next/`, `/admin/`, `/login`, `/register`; explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [x] **Created `app/sitemap.ts`** — Next.js built-in generator, 11 public routes with priorities (homepage 1.0, portfolio/video 0.9, faq/contact 0.8, legal 0.2)

---

## 🟡 Quick Wins

- [x] **Starting price added to hero** — `"Packages from $2,500 · Free 15-min consultation"` shown below the tagline. ⚠️ Update `$2,500` in `hero-section.tsx` once Sakib confirms the real number
- [x] **Instagram feed on homepage** — added `InstagramSection` after FAQ; updated API to return 6 posts (was 3); updated component to show 6 with proper fallbacks; improved `aria-label` on each post
- [x] **WhatsApp button** — already sticky `fixed bottom-6 right-6`; upgraded from generic `MessageCircle` icon to `FaWhatsapp` (official branding), increased size `w-11→w-14`, using official WhatsApp green `#25D366`
- [x] **Alt text audited** — no empty `alt=""` found on public pages; dynamic images use `alt={item.alt || item.title}` (portfolio) and `alt={member.name}` (about); Instagram posts use descriptive `aria-label`; admin preview images (`alt="Preview"`) are internal-only

---

## ⚪ Waiting on Sakib — Client Must Provide

> These are `[INSERT]` placeholders in the FAQ copy. Pages cannot go live without them.

- [ ] **Starting price** — lowest package price to publicly advertise (e.g. `$2,500`)
- [ ] **Retainer %** — deposit percentage required to lock the date (e.g. `30%`)
- [ ] **Sneak peek timing** — 48 hours? 72 hours? What is realistic for editing workflow?
- [ ] **Full gallery turnaround** — 4–6 weeks? Longer?
- [ ] **Wedding film turnaround** — 8–10 weeks? Longer?
- [ ] **Years in business / weddings shot count** — for the Trust signals strip
- [ ] **Certificate of Insurance** — does he have one ready to send venues, or needs to set up first?
- [ ] **Pricing PDF URL** — once finalized, replaces the `#` placeholder in `footer.tsx:152` and homepage CTA

---

## Priority Order

### ✅ Completed

| # | Task | Status |
|---|------|--------|
| 1 | Fix `/faq` 404 — build the page | ✅ Done |
| 2 | Remove broken "Client Portal" footer link | ✅ Done |
| 3 | Fix homepage FAQ section showing no questions | ✅ Done |
| 4 | Replace all SEO meta tags with location/niche keywords | ✅ Done |
| 5 | Add per-page metadata across all public pages | ✅ Done |
| 6 | Add LocalBusiness JSON-LD schema to root layout | ✅ Done |
| 7 | Add FAQPage JSON-LD schema to `/faq` | ✅ Done |
| 8 | Add Service JSON-LD schema to `/portfolio` | ✅ Done |
| 9 | Resolve CTA conflict — Calendly as primary | ✅ Done |
| 10 | Create `robots.txt` with AI crawler allowances | ✅ Done |
| 11 | Create `app/sitemap.ts` with all public routes | ✅ Done |
| 12 | Add starting price to hero section | ✅ Done |
| 13 | Embed Instagram feed on homepage (6 posts) | ✅ Done |
| 14 | Fix WhatsApp button icon + size | ✅ Done |
| 15 | Audit alt text across all public pages | ✅ Done |
| 16 | Build "Cultures We Serve" homepage section | ✅ Done |
| 17 | Build "Female Crew Available" callout banner | ✅ Done |
| 18 | Build "What's Included" 3-column section | ✅ Done |
| 19 | Build Trust signals strip above footer | ✅ Done |

---

### 🔲 Still To Do

| Priority | Task | Blocked by |
|----------|------|------------|
| 1 | Fix "Download Pricing PDF" `href="#"` in footer | Needs PDF URL from Sakib |
| 2 | Fill FAQ placeholders (price, retainer %, timings) | Needs info from Sakib |
| 3 | Update starting price in hero from `$2,500` to real value | Needs confirmation from Sakib |
| 4 | Replace culture tile Unsplash images with real photos | Needs photos from Sakib |
| 5 | Confirm "5+ Years Experience" count in trust signals | Needs confirmation from Sakib |

---

### ⚪ Waiting on Sakib (blocks items above)

| Item | Used in |
|------|---------|
| Starting package price | Hero section, FAQ |
| Retainer % | FAQ section A |
| Sneak peek timing | FAQ section C |
| Full gallery turnaround | FAQ section C |
| Wedding film turnaround | FAQ section C |
| Years in business / weddings shot | Trust signals strip |
| Certificate of Insurance status | FAQ section D |
| Pricing PDF URL | Footer link, Booking section |
