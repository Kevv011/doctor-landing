# Frontend Agent Instructions

## Scope

These instructions apply to React, TypeScript, Inertia pages, layouts,
components, hooks, and frontend styling under `resources/js/` and
`resources/css/`.

## Rules

- Preserve the existing starter-kit UI foundation for admin screens.
- Keep public landing UI visually aligned with `SKILL_Design.md` and the latest
  approved Figma references.
- Separate public landing components from admin components.
- Keep page files focused on layout and data composition.
- Move reusable landing sections into `resources/js/components/landing/`.
- Move reusable admin controls into `resources/js/components/admin/`.
- Prefer existing UI primitives in `resources/js/components/ui/`.
- Use lucide-react for icons and avoid mixing icon families.
- Keep forms accessible with labels, errors, focus states, and clear disabled
  states.
- Avoid new state management libraries unless the workflow clearly needs one.

## Suggested Organization

```text
resources/js/pages/public/
resources/js/pages/public/blog/
resources/js/pages/admin/
resources/js/pages/admin/blogs/
resources/js/components/landing/
resources/js/components/admin/
resources/js/components/blog/
```

## Landing Design Rules

- Use the pink, navy, white, soft-card healthcare language from
  `SKILL_Design.md`.
- Prefer modular sections such as hero, services, metrics, testimonials, blog
  highlights, appointment form, map, and footer.
- Use real or approved imagery when available.
- Verify responsive behavior at desktop, tablet, and mobile widths for
  user-facing page changes.

## Blog Editor Guidance

For the admin blog editor, prefer a block-based React editor such as BlockNote
unless the project later needs deeper custom editor control. Store article body
content as structured JSON and render it through public-facing components styled
for the landing.

## Investigation Checklist

Before changing UI behavior:

1. Locate the page and its layout.
2. Inspect related components and props.
3. Trace Inertia data from backend to page.
4. Check loading, empty, validation, error, and success states.
5. Confirm mobile behavior for public-facing UI.
6. Run relevant frontend checks when practical.
