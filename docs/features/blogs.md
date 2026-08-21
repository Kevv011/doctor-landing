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
  -> adds title, excerpt, image, and block content
  -> saves as draft or publishes
  -> public visitor reads it at /blog/{slug}
```

## Rules

- Only authenticated admin users can access CRUD operations.
- Public routes show only published posts.
- Drafts must remain hidden from public routes.
- Slugs must be unique.
- Featured images should have alt text or an accessible fallback.
- Body content should be stored as structured JSON, not arbitrary trusted HTML.
- Public rendering should use landing/blog components aligned with
  `SKILL_Design.md`.

## Data Model

Expected first version:

- `blog_posts`: article records.
- `title`: public article title.
- `slug`: unique route key.
- `excerpt`: short summary for cards and metadata.
- `featured_image`: optional image path or media reference.
- `featured_image_alt`: accessible image description.
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

## Entry Points

- `app/Http/Controllers/Admin/BlogPostController.php`: expected admin CRUD.
- `app/Http/Controllers/Public/BlogController.php`: expected public blog pages.
- `resources/js/pages/admin/blogs/`: expected admin blog pages.
- `resources/js/pages/public/blog/`: expected public blog pages.
- `resources/js/components/blog/`: expected shared blog editor/rendering pieces.

## Tests

- Guests can view published blog posts.
- Guests cannot view drafts.
- Guests cannot access admin blog CRUD.
- Admin users can create, update, publish, unpublish, and delete posts.
- Validation catches missing title, invalid status, and duplicate slug.
