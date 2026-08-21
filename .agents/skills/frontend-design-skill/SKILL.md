# SKILL.md — Landing Page UX/UI Design System

## 1. Purpose

Use this skill to reproduce and extend the UX/UI language of the referenced Figma landing page.

The visual identity is:
- Feminine, medical, warm and trustworthy.
- Premium but approachable.
- Clean editorial layout with soft pink surfaces.
- Strong use of white space.
- Rounded cards and soft contrast.
- Photography-led sections.
- Clear appointment/contact conversion paths.
- Desktop-first composition that must gracefully collapse to tablet and mobile.

This skill is intended for AI coding/design agents implementing landing pages or adapting this design language to similar projects.

---

## 2. Core Design Principles

1. **Trust first**
   - Medical information must feel clear, calm and professional.
   - Avoid visual clutter.
   - Keep strong hierarchy between titles, supporting copy and CTAs.

2. **Warm visual identity**
   - Use pink/coral gradients and light blush backgrounds.
   - Combine medical professionalism with a human, personal tone.

3. **Conversion-oriented**
   - Primary actions: schedule appointment, contact, read service details.
   - CTAs must always be visible, understandable and visually distinct.

4. **Modular composition**
   - Build sections from reusable cards, content blocks and media components.
   - Avoid one-off styling unless required by the composition.

5. **Generous spacing**
   - Sections must breathe.
   - Prefer fewer, stronger elements instead of dense grids.

---

## 3. Visual Language

### 3.1 Color Palette

Use the following palette as the default approximation when exact Figma tokens are unavailable.

```css
:root {
  --color-primary: #E9648D;
  --color-primary-strong: #D94E7A;
  --color-primary-dark: #C9003C;

  --color-pink-soft: #FCEAF2;
  --color-pink-soft-2: #FFF4F8;
  --color-pink-card: #F7DDE8;

  --color-navy: #15234A;
  --color-text: #20243A;
  --color-text-muted: #6F7080;

  --color-white: #FFFFFF;
  --color-border: #F0D4DF;

  --color-accent-purple: #C77BE8;
  --color-accent-blue: #7D9EEB;
  --color-accent-yellow: #F6E9A5;
}
```

### 3.2 Color Usage

- Primary pink:
  - CTA buttons
  - Icons
  - Important links
  - Highlights
  - Form emphasis

- Dark navy:
  - Main headings
  - Strong labels
  - High-priority body text

- Soft pink backgrounds:
  - Alternating section backgrounds
  - Blog page body
  - Contact blocks
  - Supporting containers

- White:
  - Cards
  - Main content surfaces
  - Forms
  - Text placed over saturated backgrounds

- Dark red/pink footer strip:
  - Copyright/footer ending bar

### 3.3 Gradients

Hero sections may use organic gradients.

Preferred direction:

```css
background:
  radial-gradient(circle at 15% 20%, rgba(255,255,190,.75), transparent 28%),
  radial-gradient(circle at 75% 30%, rgba(255,175,205,.9), transparent 36%),
  linear-gradient(135deg, #FBE9A7 0%, #F897B8 48%, #DE5F91 100%);
```

Gradients must feel organic, not geometric or corporate.

---

## 4. Typography

Use a modern rounded sans-serif.

Recommended:
- Poppins
- Nunito Sans
- Manrope
- Plus Jakarta Sans

Default recommendation: **Poppins**.

### Hierarchy

```css
--font-display: 700;
--font-heading: 600;
--font-body: 400;
--font-label: 500;
```

Desktop sizing guidance:

- Hero title: 48–64px
- Page title: 48–56px
- Section heading: 32–40px
- Card heading: 18–22px
- Body: 15–18px
- Small metadata: 12–14px
- Eyebrow labels: 11–13px uppercase

Mobile:

- Hero title: 36–44px
- Section heading: 26–32px
- Body: 15–16px

### Typography Rules

- Main headings use navy.
- Eyebrow text uses primary pink.
- Avoid more than 65–75 characters per body-text line.
- Avoid justified text.
- Use compact line-height for headings and relaxed line-height for paragraphs.

---

## 5. Layout System

### 5.1 Container

```css
.container {
  width: min(1180px, calc(100% - 40px));
  margin-inline: auto;
}
```

Desktop content width should visually remain around 1100–1200px.

### 5.2 Section Spacing

Desktop:
- Large section: 96–128px vertical
- Medium section: 72–96px
- Compact section: 48–64px

Mobile:
- Large: 64–80px
- Medium: 48–64px
- Compact: 32–48px

### 5.3 Grid

Desktop:
- 12-column mental model
- Common layouts:
  - 50/50
  - 40/60
  - 3-column cards
  - 2-column content
  - Main article + sidebar

Tablet:
- 2-column grids where readable

Mobile:
- 1 column by default
- Preserve visual hierarchy before decorative balance

---

## 6. Radius, Borders and Shadows

Recommended tokens:

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 18px;
--radius-xl: 28px;

--shadow-soft: 0 12px 30px rgba(21, 35, 74, 0.08);
--shadow-card: 0 6px 18px rgba(21, 35, 74, 0.06);
```

Rules:
- Cards: 10–16px radius.
- Forms: 10–14px radius.
- Feature icon circles: 50%.
- Avoid strong dark shadows.
- Prefer subtle depth and light borders.

---

## 7. Header / Navigation

### Desktop

Header overlays the hero when possible.

Contains:
- Logo left
- Main nav centered or center-left
- Search icon optional
- Contact/headset icon
- Primary phone CTA right

Navigation items:
- Home
- Services
- Contact
- Blog
- Testimonials
- Schedule appointment

### Behavior

- Transparent on hero.
- Becomes solid white or semi-opaque on scroll.
- Sticky is recommended.
- Active item may use primary pink.
- Hover: underline, opacity shift or color transition.

### Mobile

Use:
- Logo
- Menu trigger
- Optional compact appointment CTA

Mobile drawer:
- Full-width or 80–90vw panel
- Large tap targets
- Clear CTA at bottom
- Close button always visible

---

## 8. Hero Section

### Home Hero

Visual composition:
- Full-width pink/purple organic background.
- Left: heading, supporting text, video/play action.
- Right: professional photography with cutout/persons.
- Header sits on top.

Important:
- Heading width must remain compact.
- Image should dominate but never obscure CTA.
- Avoid placing body copy over busy photo areas.

### Inner Page Hero

Used for Contact and Blog:
- Shorter height than home hero.
- Centered title.
- Small subtitle.
- Breadcrumb below title.
- Can combine gradient with background photo overlay.

Overlay:

```css
background-color: rgba(230, 96, 139, 0.55);
background-blend-mode: multiply;
```

---

## 9. Section Patterns

### 9.1 About / Brand Story

Two-column layout:
- Image collage or grouped photography
- Text block with logo, heading, description and values

Use asymmetrical image composition to create editorial interest.

### 9.2 Trust Metrics

Centered section:
- Eyebrow
- Section title
- 3 statistics/features

Each metric:
- Colored circular icon
- Short statement
- Strong number
- Optional microcopy

Desktop: 3 columns  
Mobile: stacked or horizontal card carousel only if useful.

### 9.3 Services

Preferred structure:
- Section intro on left or top
- 3–6 white cards
- Each card:
  - Accent circle
  - Service title
  - Short description
  - "Leer más" action

One promotional card may use saturated pink and photography.

### 9.4 Doctors / Team

Two-column or card layout.

Each profile:
- Circular portrait
- Name
- Specialty in pink
- Brief biography

Keep bios concise.

### 9.5 Testimonials

Use:
- 3 cards on desktop
- Carousel indicators
- Quote icon
- Quote
- Avatar
- Name
- Role/patient label

Interaction:
- Auto-advance optional but never faster than 5–7 seconds.
- Manual navigation required.
- Pause on hover/focus if auto-play is used.

### 9.6 Blog Highlights

3 cards desktop.

Each card:
- Image
- Date
- Title
- 1–2 sentence excerpt
- Read more

Card content may overlap the image slightly to achieve the editorial composition.

### 9.7 Contact Information

Use 3 cards:
- Location
- Email
- Phone

Each:
- Line icon in pink
- Strong label
- Details
- Secondary action

### 9.8 Appointment Form

Visual:
- Pink panel/card
- White or subtle transparent inputs
- Clear CTA

Fields:
- Name
- Phone
- Email
- Date
- Message

Rules:
- Labels must not rely only on placeholders.
- Validation inline.
- Error state red/dark pink.
- Success state clearly visible.

### 9.9 Map

Large embedded map after or next to the appointment section.

Desktop:
- Wide map area

Mobile:
- 280–360px min-height

---

## 10. Blog Detail Layout

Desktop:
- Main content: 70–75%
- Sidebar: 25–30%

Main article:
- Featured image
- Metadata
- Heading
- Paragraphs
- Quote block
- Related tags
- Social share
- Author profile
- Comments
- Comment form

Sidebar modules:
- Search
- Categories
- Social
- Tags
- Related/latest articles

### Quote Block

Use saturated pink background with white text and quote icon.

### Sidebar Cards

- White background
- Small radius
- Moderate padding
- Clear section title
- Minimal border or shadow

### Mobile

Sidebar moves below article.

---

## 11. Footer

Background:
- Primary pink

Contains:
- Logo
- Phone CTA
- Services links
- Address
- Business hours
- Social icons

Bottom strip:
- Darker red/pink
- Copyright centered

Desktop:
- 4 columns

Tablet:
- 2 columns

Mobile:
- 1 column
- Left aligned
- Increase spacing between groups

---

## 12. Component Library

Agents should build reusable components instead of page-specific markup.

Recommended component map:

```txt
AppHeader
MobileNav
HeroHome
HeroInternal
Breadcrumbs
SectionHeading
AboutSection
MetricCard
ServiceCard
ServicesGrid
DoctorCard
TeamSection
TestimonialCard
TestimonialsCarousel
BlogCard
BlogGrid
ContactInfoCard
AppointmentForm
MapSection
ArticleLayout
ArticleMeta
QuoteBlock
TagList
ShareButtons
AuthorCard
CommentsList
CommentForm
SidebarSearch
SidebarCategories
SidebarTags
SidebarArticles
AppFooter
PrimaryButton
SecondaryButton
IconButton
```

---

## 13. Button System

### Primary Button

- Pink background
- White text
- Medium radius
- Clear hover state

```css
.btn-primary {
  min-height: 44px;
  padding: 0 22px;
  border-radius: 10px;
  background: var(--color-primary);
  color: white;
}
```

Hover:
- Darken 6–10%
- Optional slight translateY(-1px)

### Secondary Button

- Transparent or white
- Pink/navy border
- Pink/navy text

### Text Link

For "Leer más":
- Pink text
- Small arrow
- Animated 2–4px horizontal movement on hover

---

## 14. Icons

Style:
- Thin line icons
- Rounded geometry
- Minimal detail

Preferred:
- Lucide
- Phosphor
- Heroicons outline

Do not mix multiple icon libraries.

---

## 15. Image Treatment

Photography should feel:
- Human
- Professional
- Warm
- Well-lit
- Authentic
- Healthcare related

Rules:
- Use object-fit: cover.
- Keep consistent aspect ratio within repeated cards.
- Portraits may use circular crop.
- Hero people can use transparent/cutout photography.
- Add pink overlay when image must integrate with brand palette.

---

## 16. Interaction Design

Default transitions:

```css
transition:
  color .2s ease,
  background-color .2s ease,
  border-color .2s ease,
  transform .2s ease,
  opacity .2s ease;
```

Use animations subtly.

Allowed:
- Fade-up on section entry
- Card hover lift
- CTA micro-movement
- Carousel transitions
- Sticky header transition

Avoid:
- Large zoom effects
- Fast parallax
- Constant looping animations
- Excessive bouncing
- Motion that interferes with medical readability

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 17. Responsive Rules

Breakpoints:

```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

### >= 1280px
- Full desktop layout
- Wide container
- 3-column grids
- Desktop nav

### 1024–1279px
- Reduce horizontal padding
- Maintain most desktop structure
- Simplify decorative imagery

### 768–1023px
- Convert 3-column areas to 2 columns
- Reduce hero title
- Allow stacked contact/form compositions

### < 768px
- One-column layout
- Mobile navigation
- Hero image below or behind text
- Cards full width
- Blog sidebar below article
- Footer single column
- Minimum 20px page gutter

### < 480px
- Reduce heading scale
- Avoid edge-to-edge text
- Buttons may become full-width
- Maintain at least 44px tap targets

---

## 18. Accessibility

Minimum requirements:

- WCAG AA contrast.
- Keyboard-accessible navigation.
- Visible focus states.
- All meaningful images require alt text.
- Decorative images use empty alt.
- Form labels must be explicit.
- Error messages associated with fields.
- Heading order must be semantic.
- Do not rely on color alone for state.
- Tap targets >= 44x44px.
- Respect reduced motion.
- Use `aria-current="page"` for active navigation.
- Use semantic `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

---

## 19. UX Rules

### Conversion Priority

Primary user goals:
1. Understand the clinic/service.
2. Trust the professionals.
3. Explore services.
4. Schedule an appointment.
5. Contact or locate the clinic.
6. Read educational content.

Every page should support at least one clear CTA.

### Information Density

Do:
- Short paragraphs
- Strong headings
- Scannable sections
- Icons for quick recognition
- Structured cards

Avoid:
- Long uninterrupted paragraphs
- Very small type
- Dense sidebars
- Decorative content without purpose

---

## 20. Implementation Rules for AI Agents

When implementing from this skill:

1. Reuse existing project components before creating new ones.
2. Do not hardcode repeated values; create design tokens.
3. Use semantic HTML.
4. Build responsive behavior from the beginning.
5. Preserve the visual hierarchy before exact pixel matching.
6. Match spacing, proportions and rhythm before decorative details.
7. Use actual Figma values if available; this skill becomes fallback guidance.
8. Do not invent unrelated colors.
9. Keep the pink/navy/white identity consistent.
10. Do not add excessive shadows, gradients or animations.
11. Avoid component duplication.
12. Ensure hover, focus, active, disabled and error states.
13. Use consistent card radius and icon language.
14. Verify all sections at desktop, tablet and mobile widths.
15. Use the same CTA wording throughout the site where possible.

---

## 21. Design QA Checklist

Before considering the implementation complete, verify:

### Visual
- [ ] Primary palette matches the reference.
- [ ] Navy headings are used consistently.
- [ ] Soft pink backgrounds alternate logically.
- [ ] Card radii are consistent.
- [ ] Photography feels integrated with the layout.
- [ ] Footer matches the visual language.

### Layout
- [ ] Sections have generous vertical spacing.
- [ ] Desktop container width is consistent.
- [ ] Grids collapse correctly.
- [ ] Blog sidebar moves below article on mobile.

### Components
- [ ] Services use reusable cards.
- [ ] Team profiles use reusable cards.
- [ ] Testimonials use reusable cards.
- [ ] Blog articles use reusable cards.
- [ ] Contact and footer patterns are reusable.

### Interaction
- [ ] Header responds correctly on scroll.
- [ ] Menu works on mobile.
- [ ] Buttons have hover and focus states.
- [ ] Forms provide validation feedback.
- [ ] Carousels have manual controls.

### Accessibility
- [ ] Contrast passes WCAG AA.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] All images have correct alt handling.
- [ ] Forms are properly labeled.

### Responsive
- [ ] 1440px verified.
- [ ] 1024px verified.
- [ ] 768px verified.
- [ ] 390–430px verified.

---

## 22. Anti-Patterns

Do not:
- Replace the soft medical aesthetic with generic SaaS styling.
- Add glassmorphism everywhere.
- Use heavy black shadows.
- Mix unrelated colors.
- Use overly sharp cards.
- Add complex animations.
- Hide critical CTAs below decorative content.
- Force desktop multi-column layouts on mobile.
- Use placeholder-only form labels.
- Create multiple inconsistent button styles.
- Use more than one icon family.

---

## 23. Expected Result

The final interface must feel like a cohesive healthcare landing page system with:

- Warm pink branding.
- Strong navy typography.
- Organic hero visuals.
- Clean white cards.
- Editorial photography.
- Clear medical/service hierarchy.
- Prominent contact and appointment actions.
- Responsive modular sections.
- Reusable components.
- Accessible interaction states.
- Consistency across Home, Contact, Blog and future pages.

When exact design information conflicts with this skill, prefer the latest approved Figma design.
