# Cloudflare

The site is a static Astro build hosted on **Cloudflare Pages**. Cloudflare holds almost no configuration — everything that shapes the site is decided in the repo and applied by GitHub Actions.

## What lives where

| What | Where |
| --- | --- |
| Build | GitHub Actions (`deploy.yml` → `build-deploy.yml`), sets `PUBLIC_APP_VERSION` |
| Deploy | `wrangler pages deploy dist/ --project-name=schweizerklub-no` |
| Credentials | GitHub secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |
| Headers | `public/_headers` — `/_astro/*` cached immutable for a year |
| Redirects | `public/_redirects` — path-level 301s (e.g. `/beitritt/` → `/mitgliedschaft/`) |

A normal deploy needs no dashboard access. See [Deployment & Versioning](deployment.md) for the pipeline and version bumps.

## Dashboard settings

Three things are only configurable in the Cloudflare UI:

- **Pages project** — `schweizerklub-no`, production branch `main`, default domain `schweizerklub-no.pages.dev`.
- **Custom domain** — `schweizerklub.no` (apex). `www` is deliberately *not* attached.
- **DNS and redirect** — `www.schweizerklub.no` is a proxied A record, and a Single Redirect rule (*Redirect from WWW to root*, pattern `https://www.*` → `https://${1}`, 301, order First) sends it to the apex. `${1}` captures everything after `www.`, so path and query string survive.

*As of 2026-10-05. This is a snapshot for orientation, not source of truth — the Cloudflare dashboard wins on conflict.*

## Verify

```sh
curl -sSI https://schweizerklub.no/ | head -1            # HTTP/2 200
curl -sSI https://www.schweizerklub.no/ | head -1       # 301 to the apex
curl -sSI https://schweizerklub.no/beitritt/ | head -1  # 301 to /mitgliedschaft/
```