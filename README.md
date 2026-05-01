# karpathy-rust

> Backend → remote Rust/Solana role in 12 months. Minimal, education-first plan + dashboard.
> Inspired by Andrej Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT): clean, hackable, no magic.

**Production**: <https://web-lehongvi19xgmailcoms-projects.vercel.app>
**Sister repo**: [karpathy-health](https://github.com/lehongvo/karpathy-health) — PersonalOS productivity/health layer for the same dev. Two repos share design system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lehongvo/karpathy-rust&root-directory=web)

---

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
├── web/                        # Next.js 16 dashboard (linked Vercel root)
│   ├── app/
│   ├── components/
│   ├── content/                # MDX monthly notes
│   ├── lib/                    # types, plan-data, progress
│   └── package.json
└── .github/
    ├── dependabot.yml          # Weekly npm + actions update PRs
    └── workflows/
        └── auto-merge.yml      # Auto-squash patch/minor Dependabot PRs
```

## Quick start

```bash
git clone https://github.com/lehongvo/karpathy-rust.git
cd karpathy-rust/web
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Stack

Next.js 16 · React 19.2 · TypeScript strict · Tailwind v4 · `next-themes` · `framer-motion` · Recharts · Lucide · MDX. No DB, no auth — progress in `localStorage`. Sidebar navigation (collapsible), dark default with rust/solana gradient accents, GitHub-style 365-day study heatmap, 3-state task status (todo / doing / done) with localStorage persistence.

## Deploy & continuous maintenance

| Mechanism | Trigger | Result |
|---|---|---|
| **Vercel git auto-deploy** | `git push origin main` | Build + deploy to prod (~50s); root directory = `web/`, framework = Next.js |
| **Dependabot** | Weekly Mon 02:00 UTC | Opens PRs for npm + GitHub Actions deps, scoped `/web`, grouped patch+minor, labels `auto-merge` + `dependencies` |
| **Auto-merge** (`.github/workflows/auto-merge.yml`) | Dependabot PR with semver-patch or semver-minor + CI green | GitHub squash-merges automatically; major bumps still need human review |
| **Weekly health check** (remote agent) | Every Sunday 09:00 Asia/Saigon | Curls prod URL, runs `pnpm audit`, flags CVEs and major-version drift; surfaces only — no auto-fix |

Manual deploy (rarely needed; `git push origin main` covers it):
```bash
cd web && pnpm exec vercel deploy --prod --yes --token="$VERCEL_TOKEN"
```

## Plan summary

| Phase | Months | Goal |
|---|---|---|
| Foundation | M1–M3 | Rust mastery + Anchor basics + 2 OSS PR |
| Specialization | M4–M6 | 2 Solana programs deployed devnet + niche pivot |
| Portfolio | M7–M9 | 1 mainnet program + 5 OSS PR + 500 Twitter |
| Interview & Land | M10–M12 | Apply 5–10/week, land offer ≥ $5K/month |

Full breakdown: [`plan/03-master-plan.md`](plan/03-master-plan.md).

## Tone

Thẳng thắn (frank). Cites sources. Karpathy guidelines applied throughout: surgical changes, simplicity first, surface assumptions, define verifiable success criteria. See `plan/01-reality-check.md` for the bias-corrected market reality.

## License

MIT — fork freely.

## Credits

Built using [Claude Code](https://claude.ai/code). Strategic data verified across ≥2 independent sources per claim (Stack Overflow Survey 2025, JetBrains DevEcosystem 2025, web3.career, CryptoJobsList, rustjobs.dev, Electric Capital, CoinDesk, real Solana JDs). Dashboard library docs verified through Context7.
