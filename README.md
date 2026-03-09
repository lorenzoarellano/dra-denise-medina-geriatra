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
Frontend        : HTML5 · Tailwind CSS CDN v3 · Vanilla JS
Icons           : Lucide Icons (deferred)
HTTP Client     : Axios (deferred)
CMS / Blog API  : WordPress REST API (headless)
Animations      : GSAP (deferred) · CSS animations
Analytics       : Google Analytics 4 (G-R7GFH5G7JB)
Consent         : Google Consent Mode v2 · Custom cookie banner (localStorage)
Assets          : WebP images throughout · .ico favicon
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
└── assets/
    ├── images/         # WebP-optimized images
    ├── css/            # Custom stylesheets
    └── js/             # theme.js
```

---

## ⚡ Performance Optimizations

| Technique | Detail |
|---|---|
| Render-blocking elimination | All third-party scripts use `defer` |
| LCP optimization | Hero `.webp` preloaded + `fetchpriority="high"` + `loading="eager"` |
| CLS prevention | All images have explicit `width`/`height` attributes |
| Below-fold images | `loading="lazy"` on all non-critical images |
| Font loading | Google Fonts with `preconnect` hints |
| Semantic HTML | `<main>`, correct heading hierarchy, ARIA labels on interactive elements |

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
