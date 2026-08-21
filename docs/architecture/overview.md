# Architecture Overview

## Purpose

Doctor Landing is a Laravel/Inertia/React application with two product
surfaces:

- a public medical landing page at `/`;
- a private admin panel under `/admin`.

The admin panel uses the current Laravel React starter-kit experience as its
foundation. The first custom admin module is blog CRUD with publishing to the
public site.

## High-Level Architecture

```text
Public visitor
  -> Laravel routes
  -> Public Inertia pages
  -> Landing/blog components
  -> Published database content

Admin user
  -> Authenticated /admin routes
  -> Admin Inertia pages
  -> Blog CRUD/editor
  -> Database content
```

## Main Layers

- Presentation/UI: Inertia React pages, layouts, and reusable components in
  `resources/js/`.
- Application boundaries: Laravel routes, controllers, form requests, and
  middleware.
- Domain/content: blog posts, publication state, slugs, metadata, and structured
  article body.
- Infrastructure: Laravel Sail, MySQL, Redis, Vite, Fortify, passkeys, 2FA.
- Persistence: Eloquent models and migrations under `app/Models/` and
  `database/migrations/`.

## Important Architectural Rules

- Public landing routes must remain unauthenticated.
- Admin routes must be grouped under `/admin` and protected by auth.
- Public blog pages should query only published posts.
- Admin UI should preserve starter-kit conventions unless explicitly redesigned.
- Landing UI should follow `SKILL_Design.md` and approved Figma references.
- Blog content should be stored in a structured format that can be rendered
  safely and consistently on the public site.

## Tradeoffs

- A single Laravel/Inertia app keeps deployment and shared UI simple while the
  project remains small.
- Keeping admin and landing components separate avoids visual and behavioral
  drift as the public design becomes more custom.
- A block-based blog editor speeds up admin delivery, but public rendering
  should stay under project control for design consistency.
