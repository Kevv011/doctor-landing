# Landing Page

## Purpose

The landing page is the public face of the medical brand. It should communicate
trust, warmth, service clarity, and easy appointment/contact conversion.

## Users / Actors

- Public visitors.
- Prospective patients.
- Returning patients looking for contact, location, services, or articles.

## Main Flow

```text
Visitor opens /
  -> understands the clinic/service
  -> reviews trust signals and services
  -> optionally reads blog content
  -> contacts or schedules an appointment
```

## Rules

- No authentication is required for the landing page.
- Follow `SKILL_Design.md` and latest approved Figma references.
- Keep page sections modular and reusable.
- Maintain clear CTAs for appointment scheduling and contact.
- Use semantic HTML and accessible forms/navigation.
- Service details are authored as structured BlockNote JSON. The public service
  page renders those blocks with the same landing renderer used for Blog.
- The service summary, tags, image, order, and visibility remain separate from
  the rich-text detail so they can be used independently in service cards.
- Services can have an optional image gallery. The public catalog and service
  detail render it as an automatic carousel that advances every seven seconds;
  the primary service image remains the fallback when no gallery is assigned.
- Public specialist profiles use concise summaries and complementary-training
  highlights, while preserving the complete professional-experience and
  academic-education records supplied in each doctor’s CV.

## Expected Sections

- Header/navigation.
- Home hero.
- About or brand story.
- Trust metrics.
- Services.
- Team/doctors if needed.
- Testimonials.
- Blog highlights.
- Contact information.
- Appointment form.
- Map.
- Footer.

## Entry Points

- `routes/web.php`: public route definitions.
- `resources/js/pages/public/home.tsx`: public home page.
- `resources/js/components/landing/`: expected future landing sections.

## Related Files

- `SKILL_Design.md`: design language and QA checklist.
- `resources/js/pages/welcome.tsx`: starter public page, no longer used by `/`.
