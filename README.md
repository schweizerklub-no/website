# Schweizer Klub Norwegen Oslo

[![CI](https://github.com/schweizerklub-no/website/actions/workflows/ci.yaml/badge.svg)](https://github.com/schweizerklub-no/website/actions/workflows/ci.yaml)
[![Astro](https://img.shields.io/badge/Astro-ff5a03.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06b6d4.svg)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-60a5fa.svg)](https://biomejs.dev)

Website repo for [schweizerklub.no](https://www.schweizerklub.no).

## Development

See [Getting Started](docs/development/getting-started.md) to set up your dev environment.

This repo uses [mise](https://mise.jdx.dev) for tools and task management.

See [Deployment & Versioning](docs/development/deployment.md) for how CI/CD and version bumps work.

```sh
mise tasks
```

lists all available tasks.

### AI-assisted development

This repo includes agent instructions (`AGENTS.md`) and checklists for common workflows (`.agents/skills/`). These are tooling for AI coding assistants — not relevant for manual development.

## Architecture

See [ADR-0001](docs/adrs/0001-migrate-from-webflow-to-astro.md) for the decision to migrate from Webflow to Astro.

## License

[MIT](LICENSE) — schweizerklub-no

## Credits

Based on [AstroWind](https://github.com/arthelokyo/astrowind), MIT License. Copyright (c) 2024 Arthelokyo.
