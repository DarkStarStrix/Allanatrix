# Allanatrix — Portfolio

Personal portfolio for Allan ([@DarkStarStrix](https://github.com/DarkStarStrix)) — ML Infrastructure Engineer at [Aethron Labs](https://aethronlabs.xyz/).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui

**Live:** [allanatrix.dev](https://allanatrix.dev)

---

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # outputs to dist/public
```

## Pages

| Route | Description |
|---|---|
| `/` | Hero, active projects, metrics |
| `/about` | Origin story + timeline |
| `/projects` | NexaMol, PyC, archived work |
| `/skills` | Tech stack with proficiency bars |
| `/lab` | Aethron Labs overview + contact form |
| `/terminal` | Interactive project explorer CLI |

## Deployment

GitHub Actions (`.github/workflows/static.yml`) runs `pnpm build` on push to `main` and deploys `dist/public` to GitHub Pages.
