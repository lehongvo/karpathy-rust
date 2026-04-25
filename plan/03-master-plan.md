# 03 — Master Plan 12 Tháng

> Budget 15–20h/tuần × 48 tuần = 720–960h. Target: offer ≥ $5K/tháng remote-from-VN bằng M11–M12.

## Phase Overview

```
Phase 1 — FOUNDATION              M1–M3   (180–240h)
  Rust mastery, Anchor basics, first OSS PR

Phase 2 — SPECIALIZATION          M4–M6   (180–240h)
  2 Solana programs devnet, niche pivot decision (MEV/sec)

Phase 3 — PORTFOLIO               M7–M9   (180–240h)
  1 mainnet program, audit contribs, brand 1K followers

Phase 4 — INTERVIEW & LAND        M10–M12 (180–240h)
  Apply 5–10/tuần, interview drill, offer ≥ $5K/tháng
```

## Detailed Monthly Breakdown

### M1 — Rust Core
- **LEARN**: Rust Book ch.1–10, Rustlings 50%
- **BUILD**: CLI tool (CSV processor) + async TCP echo server
- **APPLY**: —
- **INTERVIEW PREP**: —
- **End-of-month check**: ≥40 commits, ≥1 OSS PR vào tooling Rust
- **Red flag**: chưa hiểu ownership sau M1 → revisit Book ch.4 + Jon Gjengset video

### M2 — Rust Production Patterns
- **LEARN**: Tokio deep, `tracing`, `thiserror`/`anyhow`, sqlx, axum
- **BUILD**: Axum REST API + JWT + Postgres + integration tests + tracing
- **INTERVIEW PREP**: LeetCode easy với Rust (10 bài)
- **End-of-month check**: API có ≥80% test coverage, deploy Fly.io/Railway
- **Red flag**: test còn flaky → fix root cause, không rerun

### M3 — Solana + Anchor Foundations
- **LEARN**: Solana Cookbook + Anchor Book ch.1–6 + Solana Foundation Bootcamp (đăng ký)
- **BUILD**: Anchor "counter" + "escrow" programs deployed local + devnet
- **INTERVIEW PREP**: LeetCode 20 bài (string, array, hashmap)
- **End-of-month check**: 2 program devnet, có test với `anchor test`, có `solana program show`
- **DECISION GATE Q1**: Go (continue) / No-Go (extend M3 → M4)

### M4 — Anchor Production Project 1 (AMM)
- **LEARN**: SPL token, Token-2022, swap math (constant product)
- **BUILD**: AMM program (swap, add liquidity, remove) + frontend đơn giản (Next.js + wallet adapter)
- **CERTIFY**: Solana Foundation Bootcamp (start)
- **INTERVIEW PREP**: LeetCode 30 bài
- **End-of-month check**: AMM deployed devnet, swap test pass, README có architecture diagram

### M5 — Anchor Production Project 2 (NFT staking)
- **LEARN**: Metaplex, NFT standards, PDA derivation deep, CPI patterns
- **BUILD**: NFT staking program với reward calculation + anti-exploit (overflow check, reentrancy guard)
- **CERTIFY**: Solana Foundation Bootcamp (complete)
- **INTERVIEW PREP**: 10 system design Solana cases (vault, AMM, oracle)
- **End-of-month check**: 2 program đầy đủ test, frontend connect Phantom OK

### M6 — Niche pivot decision + 1st audit-style review
- **LEARN**: 5 Solana audit reports (Halborn, Neodyme, Sec3) → tự audit 1 random repo nhỏ
- **BUILD**: refactor M4–M5 program theo audit feedback (security improvement v2)
- **CERTIFY**: Solana Foundation Bootcamp cert
- **INTERVIEW PREP**: Mock interview 1 (peer hoặc Pramp)
- **DECISION GATE Q2**: chọn niche M7–M9: **MEV/Trading Infra** (default) hoặc **Security/Audit**
- **End-of-month check**: 5-page audit doc 1 program nhỏ, niche chosen

### M7 — Niche specialization (MEV path default)
- **LEARN**: Jito docs, Jupiter, MEV mechanics (sandwiching, JIT liquidity), bundle structure
- **BUILD**: Solana arbitrage bot devnet (2 DEX, latency-optimized Rust client)
- **APPLY**: bắt đầu apply 3–5 jobs/tuần (junior–mid Solana, EU-friendly timezone)
- **INTERVIEW PREP**: LeetCode medium 30 bài
- **REAL INTERVIEW**: 1–2 calls (recruiter screen)
- **End-of-month check**: bot devnet log thực tế tìm arb opportunity, ≥10 application sent
- **Red flag**: 0 reply từ apply → CV/README có vấn đề, fix M7 cuối tháng

### M8 — Mainnet deploy + Brand kickoff
- **LEARN**: Mainnet deploy best practice, upgrade authority, IDL versioning
- **BUILD**: deploy 1 program (chọn safest từ M4–M5) lên Solana mainnet với verifiable build
- **APPLY**: 5–10 jobs/tuần
- **INTERVIEW PREP**: System design Solana 5 case study
- **REAL INTERVIEW**: 2–4 technical screens
- **PARALLEL**: Twitter blog post 1 "Lessons from deploying my first Solana program to mainnet"
- **End-of-month check**: mainnet TX explorer link, ≥1 onsite/final interview

### M9 — Open-source contribution + audit volunteering
- **LEARN**: Codebase reading (Anchor source, Jito-Solana client)
- **BUILD**: 5–10 meaningful PR vào Anchor / Solana-program-library / Jito-Solana
- **APPLY**: 8–10 jobs/tuần (target Jito, Marinade, Helius, Phantom, Drift, Mango)
- **INTERVIEW PREP**: Mock interview 2 (paid Pramp/Karat $50)
- **REAL INTERVIEW**: 3–5 onsite/final
- **PARALLEL**: 2 blog post technical, OSS PR merged
- **DECISION GATE Q3**: ≥1 OSS PR merged + Twitter ≥500 followers
- **End-of-month check**: ≥1 OSS PR merged trong major repo, Twitter ≥500 followers

### M10 — Interview drill + Negotiation
- **LEARN**: Compensation negotiation (levels.fyi, Negotiation by Patrick McKenzie)
- **BUILD**: Take-home assignment refinement (lưu template Anchor program kit cá nhân)
- **APPLY**: 10/tuần
- **INTERVIEW PREP**: System design Solana mock × 5
- **REAL INTERVIEW**: 5–7 onsite/final
- **End-of-month check**: ≥1 verbal offer hoặc final round pending

### M11 — Offer & Negotiation
- **LEARN**: Contractor agreement basics (Vietnam tax, USD wire), payment methods
- **BUILD**: maintenance previous projects, no new builds
- **APPLY**: 5/tuần (selective)
- **REAL INTERVIEW**: 3–5 final, **target ≥1 written offer**
- **End-of-month check**: written offer ≥ $5K/tháng net

### M12 — Land or Plan B
- **LEARN**: onboarding new role
- **BUILD**: Open-source flagship project to maintain even after job
- **APPLY**: chỉ tiếp tục nếu chưa offer
- **DECISION GATE Q4**: **OFFER SIGNED** hoặc execute Plan B

## Parallel Tracks (chạy đồng thời từ M1)

| Track | Cadence | Effort/tuần |
|---|---|---|
| Daily Code | ≥5 ngày/tuần commit nhỏ | 10–14h |
| Weekly Blog/Twitter Thread | 1 post technical/tuần | 1–2h |
| Monthly OSS PR | ≥1 PR meaningful/tháng | 2–3h |
| Quarterly Self-Review | Q1, Q2, Q3, Q4 review + adjust | 4h/quý |
| Networking | 5 inbound DM/tuần (Discord/Twitter) | 1–2h |

Total: 14–21h/tuần. Match budget 15–20h.

## Decision Gates (Go/No-Go)

**End of Q1 (M3)** — Go criteria: hiểu ownership/lifetime/async tự nhiên, deploy 2 Anchor program devnet, 40+ commits/tháng.
- ❌ No-Go → **Plan B**: extend M3 → M4 (lùi 1 tháng); nếu vẫn fail → switch ngôn ngữ Go (job count cao hơn) hoặc keep backend job + slow down to 18 tháng total.

**End of Q2 (M6)** — Go criteria: 2 Anchor program test coverage ≥80%, audit doc 5 trang viết được, niche chosen.
- ❌ No-Go → revisit niche (có thể MEV không phù hợp; pivot Audit hoặc DevTools).

**End of Q3 (M9)** — Go criteria: ≥1 mainnet program, ≥3 OSS PR merged, ≥1 onsite interview reached.
- ❌ No-Go → CV/README issue diagnosed (review từ senior dev), apply rate up to 15/tuần.

**End of Q4 (M12)** — Go criteria: offer ≥ $5K/tháng signed.
- ❌ No-Go → **Plan B**:
  1. Accept lower band (junior $60–80K) trong khi tiếp tục Q5–Q6 apply mid roles
  2. Domestic VN crypto company làm 6 tháng để có "shipped production" credential, sau đó re-apply remote
  3. Pivot DevTools (lower comp $140–190K nhưng junior-friendly hơn)

## Risk Management

| Risk | Trigger | Mitigation |
|---|---|---|
| Burnout | Cảm thấy mệt 2 tuần liên tiếp, code quality drop | Force 1 tuần off, downgrade target M_n từ "complete X" → "consolidate" |
| Market crash (crypto winter 2027) | Job postings drop >30% | Hedge: keep backend FT job, slow plan to 18 tháng, target infra (RPC/indexer) thay MEV |
| Skill obsolescence | AI agents replace Solana programmer? | Low risk 2026–2030; hedge bằng SVM internal sâu hơn framework |
| Visa/timezone reject | EU/US company yêu cầu work hours overlap | Filter EU-Berlin/Lisbon-anchored startups (VN evening = EU afternoon) |
| Health | Ngồi 15h/tuần extra ngoài job | Schedule 30min walk/day non-negotiable |
| Family/Personal | Cưới/con nhỏ giai đoạn này? | Plan flex thành 18 tháng; commit mức tối thiểu 8h/tuần |

## Budget Estimate

| Item | USD | VND (xấp xỉ) |
|---|---|---|
| Solana Foundation Bootcamp | $0 | 0 |
| 1 paid book (*Programming Rust*) | $40 | ~1tr |
| Domain conference 1 (online) | $0–100 | 0–2.5tr |
| Mock interview Pramp/Karat × 3 | $150 | ~3.7tr |
| Mainnet deploy gas + rent | $30 | ~750k |
| Twitter Premium (optional reach boost) | $80 | ~2tr |
| **Tổng tiền** | **$150–400** | **~4–10tr** |
| **Tổng thời gian** | **720–960h** | — |
| **ROI offer year 1** | **$60–168K/năm** | ~1.5–4 tỷ/năm |
| **ROI ratio** | **150–1000×** chi phí | — |

## TL;DR Visual Timeline

```
Month  | M1   M2   M3 | M4   M5   M6 | M7   M8   M9 | M10  M11  M12
=======+==============+==============+==============+================
LEARN  | ############ | ########.... | ##.......... | ............
BUILD  | ..########## | ############ | ############ | ##..........
CERT   | ............ | ..########## | ............ | ............
APPLY  | ............ | ............ | ############ | ############
PREP   | ............ | ....######.. | ############ | ############
OFFER  | ............ | ............ | .........##. | ############
       | FOUNDATION   | SPECIALIZE   | PORTFOLIO    | LAND
```
