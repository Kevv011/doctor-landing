---
name: public-seo
description: >
  Apply, audit, and maintain SEO for the public landing pages of Women’s Health
  Clinic in a Laravel/Inertia application. Use for metadata, canonical URLs,
  structured data, sitemaps, robots, social previews, local medical SEO, and
  AI-readable public content. Do not apply this skill to authenticated Admin
  routes or internal dashboard pages.
metadata:
  short-description: SEO público para Women’s Health Clinic
---

# Public SEO

## Purpose

Make the public Women’s Health Clinic landing site understandable, indexable,
shareable, and trustworthy for search engines and AI systems while keeping the
authenticated Admin area out of the SEO surface.

## Scope

Include only unauthenticated public routes such as:

- `/`
- `/contact`
- `/blog`
- `/blog/{slug}`

Exclude `/admin`, `/admin/login`, dashboard pages, settings, CRUD pages, and
other authenticated or internal routes from titles, schema, sitemap entries,
and SEO content.

## Project Context

- Stack: Laravel 13, Inertia React, TypeScript, Tailwind CSS.
- Public layout: `resources/js/layouts/landing-layout.tsx`.
- Public pages: `resources/js/pages/public/`.
- Public reusable UI: `resources/js/components/landing/`.
- Shared server props: `app/Http/Middleware/HandleInertiaRequests.php`.
- Brand: Women’s Health Clinic / AR&CO.
- Domain focus: gynecology, gynecologic oncology, women’s health,
  ultrasounds, aesthetics, and prenatal classes.
- Brand language: warm, professional, human, medically trustworthy, and
  primarily Spanish.

## Implementation Rules

1. Inspect the route, controller, Inertia page, layout, and existing shared
   business data before editing SEO.
2. Keep SEO concerns in the public layout or a reusable public SEO component;
   do not duplicate head tags in every page.
3. Give every indexable public page a unique Spanish title, meta description,
   canonical URL, and relevant social preview metadata.
4. Use one meaningful `H1` per page and preserve a logical heading hierarchy.
5. Use descriptive Spanish image `alt` text. Do not use alt text for keyword
   stuffing or repeat the page title in every image.
6. Generate structured data from verified business and page data. Never invent
   medical claims, credentials, addresses, opening hours, reviews, or awards.
7. Keep sitemap entries limited to canonical public URLs and exclude query
   strings, duplicate URLs, redirects, private content, and Admin routes.
8. Keep `robots.txt` and any `noindex` behavior aligned with authentication and
   the sitemap. Admin pages should not be promoted as public content.
9. Prefer semantic, useful content for AI discoverability: clear service
   descriptions, specialist information, FAQs, authorship, dates, and sources.
   There is no separate shortcut that replaces ordinary technical and content
   SEO.
10. Preserve the existing Inertia and Laravel patterns. Avoid adding SEO
    dependencies unless the repository already uses one or the benefit is
    clearly justified.

## Structured Data Guidance

Use the smallest valid schema set that matches the page:

- Site-wide business identity: `MedicalClinic`, `MedicalBusiness`, logo,
  telephone, address, opening hours, same-as profiles, and official URL.
- Specialist pages: `Physician` only when the profile data is verified.
- Service pages or service sections: `MedicalProcedure` or `Service` when the
  content genuinely describes a service.
- Blog articles: `BlogPosting` with headline, description, image, author,
  publisher, datePublished, and dateModified.
- FAQs: `FAQPage` only when the questions and answers are visible on the page.

Validate JSON-LD syntax and ensure its claims are also visible in page content.

## Recommended Workflow

1. Map public routes and confirm the Admin boundary.
2. Inventory existing titles, descriptions, headings, images, URLs, and public
   business data.
3. Implement or extend a reusable public SEO head component.
4. Add canonical and social metadata per page.
5. Add only verified structured data.
6. Add or update `sitemap.xml` and `robots.txt` for public URLs.
7. Improve semantic content and local signals without keyword stuffing.
8. Verify rendered HTML, route behavior, JSON-LD, canonical URLs, and mobile
   metadata.

## Verification

Use the smallest relevant checks first:

- `npm run types:check`
- `npm run lint:check` or targeted ESLint
- `git diff --check`
- Laravel route and view inspection for sitemap/robots changes
- Rendered-page inspection to confirm `<title>`, meta description, canonical,
  Open Graph, and JSON-LD are present only on public pages

Do not run migrations, seeders, or database-backed tests unless the user
explicitly authorizes them for the current task.
