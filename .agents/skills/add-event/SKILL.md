---
name: add-event
description: Use when adding a new event content file or event page entry to this website.
---

# Add a New Event

Checklist for adding an event.

## 1. Content file

Create `src/content/events/{locale}/{slug}.md` (`YYYY-MM-slug` naming):

```md
---
lang: "de"
title: "Event Title"
date: 2026-12-25
visibilityEnd: 2026-12-26      # optional
image: "~/assets/images/events/your-image.jpg"  # optional
description: "Card text"       # optional
location: "Oslo"               # optional
---
Markdown body for the detail page.
```

- The event **slug stays locale-neutral**; the listing segment is language-specific (`PAGE_ROUTES`).
- To show the event in another language, create a parallel file `{locale}/{slug}.md` with that locale's `lang`.

## 2. Date rules

- **No `visibilityEnd`** → "upcoming" until the date passes.
- **Past `visibilityEnd`** → moves to "past events".
- Past events within `PAST_EVENTS_MONTHS` (`src/site-config.ts`) show; older are hidden.

## 3. Image (optional)

Place images in `src/assets/images/events/`; reference as `~/assets/images/events/name.jpg`.

## 4. Verify

Run the mandatory gates and confirm the event renders at the expected URLs (e.g. `/anlasse/{slug}/`, `/fr/evenements/{slug}/`).