# Getting Started

This guide will get you from zero to a running dev server in under 5 minutes.

## Prerequisites

- **Git** — [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Install mise

This project uses [mise](https://mise.jdx.dev) to manage tool versions (Node.js, pnpm) and tasks.

**macOS (Homebrew):**

```sh
brew install mise
```

**Linux (requires curl):**

```sh
curl https://mise.run | sh
```

**Windows:** Use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install), then follow the Linux instructions.

## Activate mise

Add the following to your shell config, then reload your shell:

**bash** (`~/.bashrc`):

```sh
eval "$(mise activate bash)"
```

**zsh** (`~/.zshrc`):

```sh
eval "$(mise activate zsh)"
```

**fish** (`~/.config/fish/config.fish`):

```sh
mise activate fish | source
```

Alternatively, use [shims](https://mise.jdx.dev/installing-mise.html#shims):

```sh
mise activate --shims
```

## Clone and run

```sh
git clone https://github.com/schweizerklub-no/website
cd website
mise install
mise run dev
```

`mise install` reads `.nvmrc` and `mise.toml` to install the correct Node.js (24) and pnpm (11.5.2) versions. `mise run dev` installs dependencies and starts the Astro dev server.

Open [localhost:4321](http://localhost:4321) in your browser.

## Before pushing

Run the full verification suite to catch issues early:

```sh
mise run verify
```

This runs TypeScript checks, Biome linting, unit tests, and a production build. All four MUST pass before pushing.

To auto-format code:

```sh
mise run fix
```

## Project structure

Key files and directories:

| Path              | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `src/`            | Source code (components, pages, content)              |
| `src/content/`    | Astro Content Collections (events, board, pages)      |
| `src/i18n/`       | UI text translations (de, no)                         |
| `src/components/` | Reusable Astro components                             |
| `src/utils/`      | Shared utility functions                              |
| `public/`         | Static assets                                         |
| `docs/`           | Developer documentation                               |
| `mise.toml`       | Tool versions and task definitions                    |
| `.nvmrc`          | Node.js version pin                                   |
| `AGENTS.md`       | AI assistant instructions (irrelevant for manual dev) |

## Troubleshooting

### "mise: command not found"

mise is not in your `PATH`. Make sure you added the activation line (step 3) and reloaded your shell. Alternatively, restart your terminal.

### Port already in use

Astro defaults to port 4321. To use a different port:

```sh
pnpm run dev --port 4322
```

### pnpm lockfile out of date

If you see a lockfile-related error after pulling changes:

```sh
pnpm install --frozen-lockfile  # or just: mise run install
```

### Other issues

Open a [GitHub issue](https://github.com/schweizerklub-no/website/issues/new) and describe what you tried and what error you see.

## What's next?

- [Deployment & Versioning](deployment.md) — how CI/CD, version bumps, and deploys work
- `.agents/skills/add-event/SKILL.md` — adding a new event
- `.agents/skills/add-page/SKILL.md` — adding a new page
- `.agents/skills/add-locale/SKILL.md` — adding a new locale
