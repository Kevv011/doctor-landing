# Domain Map

## Current Domain

The project currently has two main domain areas:

```text
Public landing
  -> trust, services, contact, appointment CTA, blog highlights

Admin
  -> authentication, account settings, blog publishing
```

## Core Entities

```text
User
  -> Admin access

BlogPost
  -> Draft or published article
  -> Public blog content
```

## Entity Responsibilities

### User

- Authenticates into the admin panel.
- Manages account security through starter-kit settings.
- Creates and manages blog posts when authorized.

### BlogPost

- Stores editorial content for public blog pages.
- Owns title, slug, excerpt, featured image, body blocks, status, and publish
  timestamp.
- Is publicly visible only when published.

## Important State Transitions

```text
draft -> published -> draft
draft -> archived
published -> archived
```

The exact `archived` behavior can be added later if needed. The first required
states are `draft` and `published`.

## Domain Invariants

- Public visitors can read published content without logging in.
- Public visitors must not access admin CRUD routes.
- Draft blog posts must not appear in public blog lists or detail pages.
- Blog slugs must be unique for public routing.
- Structured blog content must be renderable without trusting arbitrary unsafe
  markup.
