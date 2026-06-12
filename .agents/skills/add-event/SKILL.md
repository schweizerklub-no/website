---
name: add-event
description: Use when adding a new event content file or event page entry to this website.
---

# Add a New Event

Checklist for adding an event to the website.

## 1. Create content file

Create `src/content/events/{locale}/{slug}.md`:

```md
---
lang: "de"
title: "Event Title"
date: 2026-12-25
visibilityEnd: 2026-12-26
image: "/images/events/your-image.jpg"
description: "A short description shown on the event card."
location: "Oslo"
---

Markdown body for the event detail page.
```

### Frontmatter fields

| Field | Required | Description |
|---|---|---|
| `lang` | yes | `"de"` or `"no"` |
| `title` | yes | Event name |
| `date` | yes | ISO date `YYYY-MM-DD` |
| `visibilityEnd` | no | After this date, event is hidden from listings |
| `image` | no | Path relative to `public/` |
| `description` | no | Shown on card and detail page header |
| `location` | no | Displayed on detail page |

## 2. Norwegian variant

If the event should also appear on the Norwegian site, create a parallel file at `src/content/events/no/{slug}.md` with `lang: "no"`.

## 3. Date rules

- **Future events**: no `visibilityEnd` needed — event appears in "upcoming" until the date passes.
- **Past events**: set `visibilityEnd` to a date in the past to remove from listings. Event stays visible until `visibilityEnd` passes, then moves to "past events" section.
- **6-month window**: past events within 6 months (configurable via `PAST_EVENTS_MONTHS` in `src/site-config.ts`) appear in the "past events" section. Older events are hidden.

## 4. Image (optional)

Place images in `public/images/events/`. Reference them as `/images/events/your-image.jpg`.

## 5. Verify

Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and confirm the event appears at `/anlasse/{slug}/` (DE) and `/no/anlasse/{slug}/` (NO).
