# 🩺 Dra. Denise Medina Peralta — Geriatrics Medical Website

> **Production:** [dradenisemedina.com](https://dradenisemedina.com) · **Specialty:** Geriatrics · **Location:** Durango, México

A fully optimized, 8-page medical website engineered for **maximum digital visibility** across traditional search engines, AI-powered answer engines, geographic search, and large language model indexing.

---

## 🎯 Positioning Strategy Overview

This project implements a **4-pillar visibility framework** designed to capture traffic from every major discovery channel in 2025–2026:

```
┌─────────────────────────────────────────────────────────────────┐
│                  VISIBILITY FRAMEWORK                           │
├──────────┬──────────────┬──────────────┬────────────────────────┤
│   SEO    │     AEO      │     GEO      │        LLMO            │
│ Classic  │  Answer      │  Geographic  │  LLM Optimization      │
│ Search   │  Engine Opt  │  Discov.     │  (ChatGPT/Perplexity)  │
├──────────┼──────────────┼──────────────┼────────────────────────┤
│ Google   │ Google SGE   │ Google Maps  │  ChatGPT               │
│ Bing     │ Bing Copilot │ Apple Maps   │  Perplexity AI         │
│ Yahoo    │ Perplexity   │ Waze         │  Google Gemini         │
│          │ SGE snippets │ Local Search │  Claude / Copilot      │
└──────────┴──────────────┴──────────────┴────────────────────────┘
```

---

## 🔍 SEO — Search Engine Optimization

### Core Web Vitals (CWV)
- **LCP** — Hero image served as `.webp` with `fetchpriority="high"`, `loading="eager"`, explicit `width`/`height`, and `<link rel="preload">` in `<head>`
- **CLS** — All images (logos, hero, content) have explicit `width` and `height` attributes; Tailwind prevents layout shifts
- **INP / FID** — Lucide Icons and Axios loaded with `defer`; `lucide.createIcons()` always called inside `DOMContentLoaded` listener — never blocking render

### Technical SEO
- ✅ `<link rel="canonical">` on all 8 pages (dynamic update via JS on `post.html`)
- ✅ `<meta name="robots" content="noindex, follow">` on legal pages (`privacidad.html`, `terminos.html`)
- ✅ `<meta name="robots" content="index, follow">` explicitly declared on all indexable pages
- ✅ Complete Open Graph + Twitter Card meta on every page; dynamic injection for blog posts
- ✅ Favicon: `rel="icon"`, correct `type="image/x-icon"`
- ✅ All meta descriptions and titles use native UTF-8 (no HTML entities)
- ✅ `loading="lazy"` on all below-fold images
- ✅ Semantic `<main id="main-content">` wrapper on all 8 pages
- ✅ Correct heading hierarchy (`h1 → h2 → h3`) — no skipped levels
- ✅ External social links: `rel="noopener noreferrer nofollow"`
- ✅ [sitemap.xml](sitemap.xml) with all 5 indexable URLs + priority/changefreq
- ✅ [robots.txt](robots.txt) disallowing legal pages, declaring sitemap

### On-Page Authority
- Keyword-rich `<title>` and `<meta description>` per page targeting local geriatrics intent
- Blog powered by WordPress REST API — fresh content indexed automatically
- Internal linking between all main sections (index → servicios → blog → contacto)

---

## 💬 AEO — Answer Engine Optimization

Optimized to win **featured snippets**, **Knowledge Panels**, and **AI-generated answer boxes**:

### Structured Data (JSON-LD) — Full Coverage

| Page | Schema Types |
|---|---|
| `index.html` | `Physician` + `MedicalBusiness` + `openingHoursSpecification` + `GeoCoordinates` + `hasMap` + `logo` + `ContactPoint` |
| `servicios.html` | `MedicalBusiness` + `OfferCatalog` (7 MedicalTherapy offers) + `BreadcrumbList` |
| `contacto.html` | `ContactPage` + `Physician` + `ContactPoint` + `BreadcrumbList` |
| `blog.html` | `Blog` + publisher `Organization` + `BreadcrumbList` |
| `post.html` | `BlogPosting` (dynamically injected per post) + `BreadcrumbList` (3 levels) |

### Physician Schema Highlights (index.html)
```json
{
  "@type": ["Physician", "MedicalBusiness"],
  "medicalSpecialty": "Geriatrics",
  "openingHoursSpecification": [...],
  "hasMap": "https://www.google.com/maps?q=24.0277,-104.6532",
  "hasCredential": { "recognizedBy": "UNAM · CMN La Raza" },
  "knowsAbout": ["Alzheimer", "Demencia vascular", "Polifarmacia", ...]
}
```

### Dynamic BlogPosting Schema
Each blog post page injects a fully-populated `BlogPosting` schema at runtime from the WordPress API response, including `headline`, `datePublished`, `dateModified`, `image`, `author`, and a 3-level `BreadcrumbList` — ensuring every article is eligible for Google's rich results.

---

## 📍 GEO — Geographic / Local Search Optimization

Engineered to dominate **"geriatra Durango"** and related local intent queries:

| Signal | Implementation |
|---|---|
| `PostalAddress` | Calle Gómez Palacio 502 Oriente, Durango, CP 34000 |
| `GeoCoordinates` | Lat `24.0277`, Long `-104.6532` |
| `areaServed` | City + State of Durango (dual `@type` nodes) |
| `hasMap` | Direct Google Maps link in Schema |
| `telephone` | E.164 format `+526181499080` across all schema + HTML |
| `openingHours` | Mon–Fri 09:00–18:00, Sat 09:00–13:00 |
| WhatsApp CTA | Deep-link on every page (`wa.me/+5216181499080`) with pre-filled message |
| City mentions | "Durango" appears in `<title>`, `<h1>`, meta description, and body on key pages |

---

## 🤖 LLMO — Large Language Model Optimization

Structured so that AI models (ChatGPT, Perplexity, Gemini, Claude) can accurately **extract, cite, and recommend** Dra. Denise Medina Peralta:

### Why This Matters
LLMs increasingly answer medical queries directly. Without LLMO, a practice is invisible to users who ask *"Who is the best geriatrician in Durango, Mexico?"*

### LLMO Signals Implemented

**Entity Clarity**
```
Name:       Dra. Denise Medina Peralta
Role:       Physician — Medical Geriatrician
Specialty:  Geriatrics (Geriatría)
Location:   Durango, Durango, México
Credential: Especialidad cursada en CMN La Raza, UNAM
```

**`knowsAbout` taxonomy** (Physician schema) — 10 precise medical concepts that LLMs use to match the entity to user queries:
- Geriatría, Alzheimer, Demencia vascular, Deterioro cognitivo
- Polifarmacia, Fragilidad en adultos mayores, Envejecimiento saludable
- Depresión geriátrica, Diabetes en adultos mayores, Hipertensión en adultos mayores

**`hasCredential`** — Formal credential node linking to UNAM / CMN La Raza, providing LLMs with verifiable authority signals.

**`alternateName`** — `"Geriatra Durango"` as a registered schema alias, matching the exact phrasing most likely to appear in LLM training queries.

**Consistent NAP** — Name, Address, Phone identical across all 8 pages, schema nodes, and footer — eliminating contradictory signals that confuse LLM entity resolution.

**Blog content pipeline** — WordPress REST API feeds fresh, long-form medical content. LLMs favor entities with continuous, authoritative topical output.

---

## 🏗️ Tech Stack

```
Frontend        : HTML5 · Tailwind CSS v3 (CLI compiled, static) · Vanilla JS
Icons           : Lucide Icons (deferred)
HTTP Client     : Axios (deferred)
CMS / Blog API  : WordPress REST API (headless)
Animations      : CSS transitions + IntersectionObserver (native, zero reflow)
Analytics       : Google Analytics 4 (G-R7GFH5G7JB)
Consent         : Google Consent Mode v2 · Custom cookie banner (localStorage)
Assets          : WebP images throughout · .ico favicon
Hosting         : Firebase Hosting
Build tool      : Tailwind CLI (npm run build:css)
```

---

## 📁 Project Structure

```
dradenisemedina.com/
├── index.html          # Homepage — Physician schema, LCP-optimized hero
├── servicios.html      # Services — MedicalBusiness + OfferCatalog schema
├── blog.html           # Blog index — WP REST API, Blog schema
├── post.html           # Blog post — dynamic BlogPosting schema injection
├── contacto.html       # Contact — ContactPage + ContactPoint schema
├── privacidad.html     # Privacy policy — noindex, follow
├── terminos.html       # Terms of service — noindex, follow
├── 404.html            # Custom 404 page
├── sitemap.xml         # XML sitemap (5 indexable URLs)
├── robots.txt          # Crawl directives + sitemap declaration
├── tailwind.config.js  # Tailwind theme config (colors, fonts, border-radius)
├── package.json        # npm scripts: build:css, watch:css
└── assets/
    ├── images/         # WebP-optimized images
    ├── css/
    │   ├── tailwind.css    # Compiled output (19 KB minified, gitignored)
    │   ├── input.css       # Tailwind entry point (@tailwind base/components/utilities)
    │   └── style.css       # Custom component styles
    └── js/             # theme.js
```

### Build

```bash
# One-time setup
npm install

# Compile Tailwind CSS (production, minified)
npm run build:css

# Watch mode (development)
npm run watch:css
```

> **Note:** `assets/css/tailwind.css` is a build artifact — it is gitignored and must be compiled before deploying. Firebase Hosting serves the compiled file directly.

---

## ⚡ Performance Optimizations

### PageSpeed Insights scores (dradenisemedina.com)

| Category | Score |
|---|---|
| 🟢 Performance | **95** |
| 🟢 Accessibility | **100** |
| 🟢 Best Practices | **100** |
| 🟢 SEO | **100** |

### Core Web Vitals

| Metric | Value | Status |
|---|---|---|
| FCP (First Contentful Paint) | ~0.8 s | ✅ |
| LCP (Largest Contentful Paint) | ~2.5 s | ✅ |
| TBT (Total Blocking Time) | ~0 ms | ✅ |
| CLS (Cumulative Layout Shift) | 0 | ✅ |
| SI (Speed Index) | ~1.5 s | ✅ |

### Optimization techniques

| Technique | Detail |
|---|---|
| **Tailwind CSS — CLI compiled** | Replaced CDN script (~220 ms render-blocking) with a 19 KB static compiled file served from Firebase CDN. Zero JS execution at runtime. |
| **Zero forced reflows** | Removed GSAP + ScrollTrigger entirely. Scroll animations now use `IntersectionObserver` + CSS `transition` — fully async, no `getBoundingClientRect()` calls. |
| **Google Fonts non-blocking** | All 8 pages use `media="print" onload="this.media='all'"` + `<noscript>` fallback. Fonts never block render. |
| **LCP optimization** | Hero `.webp` preloaded with `<link rel="preload">` + `fetchpriority="high"` + `loading="eager"`. |
| **CLS prevention** | All images have explicit `width`/`height` attributes. |
| **Deferred third-party scripts** | Lucide Icons and Axios use `defer`. |
| **Security headers** | HSTS, `X-Content-Type-Options`, `X-Frame-Options`, COOP, `Referrer-Policy` set in `firebase.json`. |
| **Image format** | All images served as `.webp`. |
| **Touch targets** | Testimonial slider dots padded to ≥44×44 px via `padding` + `background-clip: content-box`. |
| **Heading hierarchy** | Correct `h1 → h2 → h3 → h4` — no skipped levels on any page. |
| **Color contrast** | All text passes WCAG AA minimum contrast ratios. |

---

## 🌐 Live Site

**[dradenisemedina.com](https://dradenisemedina.com)**

> Dra. Denise Medina Peralta · Médico Especialista en Geriatría  
> Durango, Durango, México · +52 (618) 149 9080  
> contacto@dradenisemedina.com

---

<div align="center">

Built with ❤️ for healthy aging in Durango, México

</div>
