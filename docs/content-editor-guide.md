# Content Editor Guide

This guide is for board members and club administrators who need to update the website. You don't need any programming experience — just a web browser and a GitHub account.

---

## 1. Get started

### What you need

- A **GitHub account** — create one free at [github.com/signup](https://github.com/signup)
- Access to the website repository — ask a repo admin to add you as a collaborator
- The repository URL: [github.com/schweizerklub-no/website](https://github.com/schweizerklub-no/website)

### Log in

1. Go to [github.com/login](https://github.com/login) and sign in
2. Open the website repository at [github.com/schweizerklub-no/website](https://github.com/schweizerklub-no/website)

---

## 2. Edit existing content

This is the most common task — fixing a typo on a page or updating a board member's bio.

### Step-by-step

1. Navigate to the file you want to change (see the folder guide below)
2. Click the file name to open it
3. Click the **pencil icon** (✏️) in the top-right corner of the file view
4. Make your changes in the web editor
5. Scroll down to **Commit changes**
6. Write a short description of what you changed (e.g., "fix typo on Über uns page")
7. Leave **Commit directly to the `main` branch** selected
8. Click **Commit changes**

That's it. The website will update automatically within 1–2 minutes.

### Where are the files?

| Content type | German (`de`) files    | Norwegian (`no`) files  |
| ------------ | ---------------------- | ----------------------- |
| Event        | `src/content/events/de/` | `src/content/events/no/` |
| Board member | `src/content/board/de/`  | `src/content/board/no/`  |
| Page         | `src/content/pages/de/`  | `src/content/pages/no/`  |

The website currently supports German and Norwegian. More languages can be added later — each language gets its own folder (named by its code) and uses file names in that language. Page files are named in the page's own language (e.g. Norwegian `om-oss.md`, `medlemskap.md`, `personvern.md`; German `uber-uns.md`, `mitgliedschaft.md`, `privacy-policy.md`).

---

## 3. Add a new event

### Step-by-step

1. Go to the correct folder for your language (currently German or Norwegian):
   - German: `src/content/events/de/`
   - Norwegian: `src/content/events/no/`
2. Look at the existing event files to see how they're named (e.g., `2026-10-herbstfest.md`)
3. Click **Add file** → **Create new file**
4. Name the file following the pattern `YYYY-MM-short-name.md` (e.g., `2026-11-winterfest.md`)
5. Copy the content below and adapt it:

```markdown
---
lang: de
title: Winterfest
date: 2026-11-15
visibilityEnd: 2026-11-16
image: ~/assets/images/events/your-image.jpg
description: Location, address
---

Your event description here.
```

6. Fill in the fields:
   - `lang` — the language code: `de` for German, `no` for Norwegian (+ any future locale)
   - `title` — the event name (shows on the event card)
   - `date` — the event date in `YYYY-MM-DD` format
   - `visibilityEnd` — the date after which the event moves to "past events" (usually the day after)
    - `image` — path to an image in the `src/assets/images/events/` folder (optional)
   - `description` — short info (shows on the event card)
   - Below the `---` line: the full event description (supports **bold**, links, and lists)
7. Scroll down and commit (as described in section 2)

**Important:** If you want to use an image, ask a developer to add it to the `src/assets/images/events/` folder first. You can also leave out the `image` line entirely.

---

## 4. Add a new board member

### Step-by-step

1. Go to the correct folder (currently German or Norwegian):
   - German: `src/content/board/de/`
   - Norwegian: `src/content/board/no/`
2. Click **Add file** → **Create new file**
3. Name the file using the person's name (e.g., `anna-muster.md`)
4. Copy the content below and adapt it:

```markdown
---
lang: de
name: Anna Muster
role: Kassiererin
image: ~/assets/images/board/anna-muster.jpg
bio: "Short role description"
email: anna.muster@schweizerklub.no
---

Here you can write a longer biography. The first sentence appears on the
board overview page. The full text appears on the member's detail page.
```

5. Fill in the fields:
   - `lang` — the language code: `de` or `no` (+ any future locale)
   - `name` — full name
   - `role` — board position (e.g., Präsident, Kassiererin, Sekretär)
    - `image` — path to a photo in `src/assets/images/board/` (required)
   - `bio` — a short role description in quotes
   - `email` — contact email address
   - Below the `---` line: the longer biography
6. Commit the file (as described in section 2)
7. Ask a developer to add the photo to `src/assets/images/board/`

---

## 5. Edit page content

Pages like "Über uns", "Mitgliedschaft", or "Kontakt" live in the pages folder.

### Step-by-step

1. Go to the correct folder (currently German or Norwegian):
   - German: `src/content/pages/de/`
   - Norwegian: `src/content/pages/no/`
2. Click the page you want to edit (e.g., `uber-uns.md` in German, `om-oss.md` in Norwegian)
3. Click the **pencil icon** (✏️)
4. Edit the text below the `---` lines — the content between the `---` markers is metadata and should usually stay as-is
5. Commit the changes

### Example page structure

```markdown
---
lang: de
title: Über uns
---

Hier steht der eigentliche Inhalt der Seite. Sie können **fett**, 
[Links](https://example.com) und - Listen - verwenden.
```

---

## 6. Important notes

### Changes go live automatically

Every change you commit to the `main` branch is automatically built and deployed. The website updates within 1–2 minutes. There is no separate "publish" step.

### Markdown basics

Markdown is a simple way to format text. Here are the most common formatting rules:

| Result                   | How to type                |
| ------------------------ | -------------------------- |
| **Bold text**            | `**Bold text**`            |
| *Italic text*            | `*Italic text*`            |
| [Link text](https://...) | `[Link text](https://...)` |
| - List item              | `- List item`              |
| 1. Numbered item         | `1. Numbered item`         |

### What NOT to touch

- Files outside `src/content/` — these are source code and configuration
- The lines between `---` markers (metadata) — unless you know what you're doing
- File names of existing files — renaming breaks links

### Need help?

Open a [GitHub issue](https://github.com/schweizerklub-no/website/issues/new) or ask a developer.
