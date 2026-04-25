# karpathy-rust

> Backend → remote Rust/Solana role in 12 months. Minimal, education-first plan + dashboard.
> Inspired by Andrej Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT): clean, hackable, no magic.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lehongvo/karpathy-rust&root-directory=web)

## What this repo is

A 12-month, 15–20 hours/week roadmap to land a remote Rust/Solana engineer offer ≥ $5K/month from US/EU/SG companies. Two artifacts:

1. **Plan** — `plan/*.md`: reality-check, skill-gap analysis, master plan (M1–M12), decision log.
2. **Dashboard** — `web/`: Next.js 15 app to track progress daily, render the plan, log study hours, manage applications.

## Repo layout

```
karpathy-rust/
├── plan/                       # Strategic markdown
│   ├── 01-reality-check.md
│   ├── 02-skill-gap.md
│   ├── 03-master-plan.md       # M1–M12 monthly breakdown
│   ├── 04-resources.md
│   ├── 05-application-strategy.md
│   ├── 06-strategic-investment.md
│   ├── 07-starter-pack.md
│   └── decision-log.md
├── web/                        # Next.js 15 dashboard
│   ├── app/
│   ├── components/
│   ├── content/                # MDX monthly notes
│   ├── lib/                    # types, plan-data, progress
│   └── package.json
└── .github/workflows/deploy.yml
```

## Quick start

```bash
git clone https://github.com/lehongvo/karpathy-rust.git
cd karpathy-rust/web
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Stack

Next.js 15 · React 19 · TypeScript strict · Tailwind v4 · `next-themes` · `framer-motion` · Recharts · Lucide · MDX. No DB, no auth — progress in `localStorage`.

## Deploy to Vercel

Two options:

**A. Vercel project settings (recommended)**: import the repo, set Root Directory = `web`. Done.

**B. CI workflow**: `.github/workflows/deploy.yml` runs `vercel --prod` on push to `main`. Requires repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. If secrets missing, the workflow fails soft and does not block local dev.

## Plan summary

| Phase | Months | Goal |
|---|---|---|
| Foundation | M1–M3 | Rust mastery + Anchor basics + 2 OSS PR |
| Specialization | M4–M6 | 2 Solana programs deployed devnet + niche pivot |
| Portfolio | M7–M9 | 1 mainnet program + 5 OSS PR + 500 Twitter |
| Interview & Land | M10–M12 | Apply 5–10/week, land offer ≥ $5K/month |

Full breakdown: [`plan/03-master-plan.md`](plan/03-master-plan.md).

## License

MIT — fork freely.
