# Blogs

## Purpose

The blog module lets an admin create, edit, save, and publish educational
articles from the admin panel. Published articles appear on the public landing
site and blog pages.

## Users / Actors

- Admin user creates and manages posts.
- Public visitor reads published posts.

## Main Flow

```text
Admin opens /admin/blogs
  -> creates or edits a post
  -> adds title, excerpt, cover image, gallery images, and block content
  -> saves as draft or publishes
  -> public visitor reads it at /blog/{slug}
```

## Rules

- Only authenticated admin users can access CRUD operations.
- Public routes show only published posts.
- Drafts must remain hidden from public routes.
- Slugs must be unique.
- Featured images should have alt text or an accessible fallback.
- Gallery images are optional and stored separately from the cover image. They
  render as an automatic public carousel that advances every seven seconds,
  while preserving the cover image as a fallback when no gallery exists.
- Body content should be stored as structured JSON, not arbitrary trusted HTML.
- Public rendering should use landing/blog components aligned with
  `SKILL_Design.md`.

## Data Model

Expected first version:

- `blog_posts`: article records.
- `title`: public article title.
- `slug`: unique route key.
- `excerpt`: short summary for cards and metadata.
- `featured_image`: single-file Media Library collection for the article cover.
- `gallery_images`: multi-file Media Library collection for the public image
  carousel; the admin can upload up to 10 images in one submission and remove
  existing images individually.
- `content_images`: Media Library collection for images inserted inside the block
  editor.
- `body`: structured JSON block content.
- `status`: draft or published.
- `published_at`: publication timestamp.
- `seo_title`: optional SEO title.
- `seo_description`: optional SEO description.

## Editor Direction

Prefer a React block editor for the admin authoring experience. BlockNote is the
current recommended starting point because it provides a polished block-based UI
with text, headings, lists, quotes, media support, and custom block extension
paths.

Images should be uploaded through an admin media endpoint backed by Spatie
Laravel Media Library. The editor body should store structured block JSON with
stable media references such as `media_id`, `uuid`, `url`, and `alt` so the
public renderer can control the final landing-page styling.

See `docs/features/blocknote.md` for the initial BlockNote integration contract,
official references, package installation command, and Media Library upload
flow.

## Entry Points

- `app/Http/Controllers/Admin/BlogPostController.php`: expected admin CRUD.
- `app/Http/Controllers/Public/BlogController.php`: expected public blog pages.
- `resources/js/pages/admin/blogs/`: expected admin blog pages.
- `resources/js/pages/public/blog/`: expected public blog pages.
- `resources/js/pages/admin/blogs/components/blog-editor.tsx`: admin BlockNote
  editor.
- `resources/js/components/blog/`: expected public blog rendering pieces.

## Tests

- Guests can view published blog posts.
- Guests cannot view drafts.
- Guests cannot access admin blog CRUD.
- Admin users can create, update, publish, unpublish, and delete posts.
- Validation catches missing title, invalid status, and duplicate slug.
