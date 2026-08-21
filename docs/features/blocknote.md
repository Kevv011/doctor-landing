# BlockNote Blog Editor

## Decision

The admin blog editor uses BlockNote as the first block-based authoring layer.
Blog content is stored as JSON in `blog_posts.body` and rendered later by
project-owned public components.

## References

- BlockNote React overview:
  https://www.blocknotejs.org/docs/react/overview
- BlockNote ShadCN setup:
  https://www.blocknotejs.org/docs/getting-started/shadcn
- BlockNote editor setup:
  https://www.blocknotejs.org/docs/getting-started/editor-setup
- BlockNote file upload option:
  https://www.blocknotejs.org/docs/react/components/image-toolbar
- BlockNote custom blocks:
  https://www.blocknotejs.org/docs/features/custom-schemas/custom-blocks

## Installed Packages

Use the ShadCN integration because this project already uses Tailwind and
ShadCN-style primitives.

```bash
vendor/bin/sail npm install @blocknote/core @blocknote/react @blocknote/shadcn
```

If Sail is not running, start Docker/Podman and retry the command from the
project root. Do not install editor packages outside Sail unless the project
owner explicitly changes that workflow.

## Admin Contract

- Editor component: `resources/js/pages/admin/blogs/components/blog-editor.tsx`.
- Form field submitted to Laravel: `body`.
- Stored format: JSON array of BlockNote blocks.
- Featured image: `featured_image` Media Library collection.
- Inline editor images: `content_images` Media Library collection.

## Upload Flow

BlockNote accepts an `uploadFile(file)` function that returns the public URL of
the uploaded file. In this project, the function posts to:

```text
POST /admin/blogs/{blog}/media
```

The endpoint stores the file in the blog post's `content_images` Media Library
collection and returns:

```json
{
  "id": 1,
  "uuid": "media-uuid",
  "url": "https://example.test/storage/...",
  "name": "image.webp"
}
```

In the first implementation, inline Media Library uploads are available when
editing an existing blog post. During create, the editor still stores block JSON;
after saving the draft, admins can edit the post and upload inline images.

## Rendering Strategy

The public landing should not mount BlockNote. Public blog pages should use a
project-owned renderer that maps each block type into branded React components.
This keeps public design aligned with `SKILL_Design.md` and avoids coupling the
landing UI to the admin editor implementation.

## Extension Path

Start with BlockNote's default blocks, then add project-specific blocks only
when a real design requirement appears. Candidate custom blocks:

- `doctor_tip`
- `medical_quote`
- `cta_schedule`
- `image_comparison`
- `faq_group`
- `highlight_card`
