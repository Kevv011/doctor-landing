# ADR-002: Block-Based Blog Content

## Status

Accepted

## Context

The admin needs a blog CRUD module where users can create rich articles with
text, images, quotes, and structured sections. The public landing design should
control how published articles render.

## Decision

Store blog body content as structured block JSON and use a React block editor in
the admin. BlockNote is the preferred first candidate because it provides a
ready block-based React editing experience with room for customization.

## Alternatives Considered

- Store raw HTML from a classic WYSIWYG editor.
- Store Markdown only.
- Build a custom editor directly on Lexical or Plate from the start.

## Consequences

- Admin authoring can ship faster with a polished editor.
- Public rendering can map blocks into branded landing/blog components.
- The project avoids trusting arbitrary raw HTML as the primary content source.
- If editor needs become more specialized, Plate or Lexical can be revisited.
