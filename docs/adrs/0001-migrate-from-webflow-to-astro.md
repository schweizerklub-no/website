# ADR 0001: Migrate from Webflow (hosted at Horn Media) to Astro

## Status

Accepted

## Context

The club website is hosted at Horn Media, built on Webflow technology. The annual cost exceeds 10 000 NOK. We evaluated alternatives that reduce cost while retaining Git-based Markdown content management.

### Options considered

**Webflow (current)**
- Pros: visual editor, non-technical users can edit
- Cons: >10 000 NOK/year, proprietary platform, vendor lock-in

**WordPress (via Horn Media)**
- Pros: multiple users can post and edit pages, familiar platform
- Cons: 5 000 NOK setup + 500 NOK/month (~6 000 NOK/year), database overhead, ongoing maintenance

**WordPress (self-hosted)**
- Pros: multiple users can post and edit pages, large ecosystem
- Cons: database overhead, ongoing maintenance, higher hosting costs

**VitePress**
- Pros: low cost, Markdown content, Git-based workflow
- Cons: documentation-oriented, not suited for a club website with varied page types, no admin GUI

**Astro (chosen)**
- Pros: low cost (static hosting), Markdown content, Git-based workflow, built-in content collections, excellent for content-driven sites
- Cons: no admin GUI (requires Git-based editing)

## Decision

We will rebuild the website using Astro with static hosting on Cloudflare Pages. Content is managed via Markdown files in Astro Content Collections and edited through Git.

## Consequences

### Positive
- Annual hosting cost drops to near zero (Cloudflare Pages free tier)
- Full control over the tech stack
- Content versioned via Git
- Fast static site with no database

### Negative
- Content changes require Git commits — no visual editor
- Technical knowledge needed for structural changes
- Initial migration effort to convert Webflow content to Markdown
