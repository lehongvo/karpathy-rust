import type { MonthPlan, PlanMeta, Resource, DecisionEntry } from "./types";

export const PLAN_META: PlanMeta = {
  startDate: "2026-05-01",
  targetOfferDate: "2027-04-30",
  targetMonthlyUSD: 5000,
  weeklyHoursBudget: [15, 20],
};

const m = (
  index: number,
  title: string,
  phase: MonthPlan["phase"],
  tasks: MonthPlan["tasks"],
  endOfMonthCheck: string[],
  redFlags: string[] = []
): MonthPlan => ({
  index,
  title,
  phase,
  hoursBudget: 60,
  tasks,
  endOfMonthCheck,
  redFlags,
});

export const PLAN: MonthPlan[] = [
  m(1, "Rust Core", "foundation", [
    { id: "1-l-1", category: "learn", text: "Read Rust Book ch.1–10", hours: 20, resourceUrl: "https://doc.rust-lang.org/book/" },
    { id: "1-l-2", category: "learn", text: "Rustlings 50% complete", hours: 12, resourceUrl: "https://github.com/rust-lang/rustlings" },
    { id: "1-b-1", category: "build", text: "CLI CSV processor (clap+serde)", hours: 10 },
    { id: "1-b-2", category: "build", text: "Async TCP echo server (Tokio)", hours: 12 },
    { id: "1-b-3", category: "build", text: "1 OSS PR vào tooling Rust", hours: 6 },
  ], [
    "≥40 commits this month",
    "Ownership/borrow understood without lookup",
    "1 OSS PR opened (merged or pending)",
  ], [
    "Stuck trên ownership sau M1 → revisit Book ch.4 + Jon Gjengset video",
  ]),

  m(2, "Production Rust", "foundation", [
    { id: "2-l-1", category: "learn", text: "Tokio tutorial deep + tracing + thiserror/anyhow", hours: 14, resourceUrl: "https://tokio.rs/tokio/tutorial" },
    { id: "2-b-1", category: "build", text: "Axum REST API + JWT + Postgres + tests + tracing", hours: 30 },
    { id: "2-b-2", category: "build", text: "Deploy API to Fly.io / Railway", hours: 6 },
    { id: "2-i-1", category: "interview-prep", text: "LeetCode easy × 10 in Rust", hours: 8 },
  ], [
    "API has ≥80% test coverage",
    "Deployed publicly with HTTPS",
  ], [
    "Test flaky → fix root cause, không rerun until pass",
  ]),

  m(3, "Solana Foundations", "foundation", [
    { id: "3-l-1", category: "learn", text: "Solana Cookbook + Anchor Book ch.1–6", hours: 18, resourceUrl: "https://solana.com/developers/cookbook" },
    { id: "3-l-2", category: "learn", text: "Register Solana Foundation Bootcamp", hours: 1, resourceUrl: "https://solana.com/developers/bootcamp" },
    { id: "3-b-1", category: "build", text: "Counter program deployed local + devnet", hours: 14 },
    { id: "3-b-2", category: "build", text: "Escrow program deployed devnet với test", hours: 22 },
    { id: "3-i-1", category: "interview-prep", text: "LeetCode 20 bài (string/array/hashmap)", hours: 8 },
  ], [
    "2 program devnet active",
    "`anchor test` pass cho cả 2",
    "Q1 Decision Gate: Go (continue) / No-Go (extend M3 → M4)",
  ]),

  m(4, "Anchor Project 1: AMM", "specialization", [
    { id: "4-l-1", category: "learn", text: "SPL token + Token-2022 + swap math", hours: 10 },
    { id: "4-b-1", category: "build", text: "AMM Anchor program (swap/add/remove liquidity)", hours: 28 },
    { id: "4-b-2", category: "build", text: "Frontend Next.js + wallet adapter", hours: 14 },
    { id: "4-c-1", category: "certify", text: "Solana Foundation Bootcamp (start)", hours: 8 },
  ], [
    "AMM deployed devnet, swap test pass",
    "README có architecture diagram",
  ]),

  m(5, "Anchor Project 2: NFT staking", "specialization", [
    { id: "5-l-1", category: "learn", text: "Metaplex + PDA derivation deep + CPI patterns", hours: 12 },
    { id: "5-b-1", category: "build", text: "NFT staking program với reward calc + safety guards", hours: 32 },
    { id: "5-c-1", category: "certify", text: "Solana Foundation Bootcamp (complete)", hours: 8 },
    { id: "5-i-1", category: "interview-prep", text: "10 system design Solana cases", hours: 8 },
  ], [
    "2 program đầy đủ test",
    "Frontend Phantom integration OK",
  ]),

  m(6, "Niche Pivot", "specialization", [
    { id: "6-l-1", category: "learn", text: "Đọc 5 audit reports (Halborn/Neodyme/Sec3)", hours: 10 },
    { id: "6-b-1", category: "build", text: "Tự audit 1 random repo, viết findings 5 trang", hours: 16 },
    { id: "6-b-2", category: "build", text: "Refactor M4–M5 program theo audit feedback", hours: 16 },
    { id: "6-c-1", category: "certify", text: "Solana FN Bootcamp cert claimed", hours: 1 },
    { id: "6-i-1", category: "interview-prep", text: "Mock interview 1 (Pramp/peer)", hours: 4 },
  ], [
    "Audit doc 5 trang published GitHub",
    "Niche chosen: MEV vs Security/Audit (written down)",
    "Q2 Decision Gate",
  ]),

  m(7, "MEV Track Begins", "portfolio", [
    { id: "7-l-1", category: "learn", text: "Jito docs + MEV mechanics + bundle structure", hours: 12, resourceUrl: "https://www.jito.wtf/" },
    { id: "7-b-1", category: "build", text: "Solana arbitrage bot devnet (2 DEX)", hours: 28 },
    { id: "7-a-1", category: "apply", text: "Apply 3–5 jobs/tuần (junior–mid Solana, EU TZ)", hours: 8 },
    { id: "7-i-1", category: "interview-prep", text: "LeetCode medium × 30", hours: 12 },
    { id: "7-r-1", category: "real-interview", text: "1–2 recruiter screens", hours: 2 },
  ], [
    "Bot devnet log thực tế tìm arb",
    "≥10 application sent",
  ], [
    "0 reply từ apply → CV/README issue, fix immediately",
  ]),

  m(8, "Mainnet Deploy + Brand", "portfolio", [
    { id: "8-l-1", category: "learn", text: "Mainnet deploy best practice + verifiable build", hours: 8 },
    { id: "8-b-1", category: "build", text: "Deploy 1 program lên Solana mainnet", hours: 14 },
    { id: "8-b-2", category: "build", text: "Twitter blog post 1 technical", hours: 4 },
    { id: "8-a-1", category: "apply", text: "Apply 5–10 jobs/tuần", hours: 12 },
    { id: "8-i-1", category: "interview-prep", text: "5 system design Solana case study", hours: 10 },
    { id: "8-r-1", category: "real-interview", text: "2–4 technical screens", hours: 6 },
  ], [
    "Mainnet TX explorer link công khai",
    "≥1 onsite/final reached",
  ]),

  m(9, "OSS + Audit Volunteering", "portfolio", [
    { id: "9-l-1", category: "learn", text: "Read Anchor + Jito-Solana source", hours: 10 },
    { id: "9-b-1", category: "build", text: "5–10 PR vào Anchor / SPL / Jito-Solana", hours: 24 },
    { id: "9-b-2", category: "build", text: "2 blog post technical", hours: 6 },
    { id: "9-a-1", category: "apply", text: "Apply 8–10/tuần (Jito/Marinade/Helius/Drift/Mango)", hours: 12 },
    { id: "9-i-1", category: "interview-prep", text: "Mock interview 2 (paid Pramp $50)", hours: 4 },
    { id: "9-r-1", category: "real-interview", text: "3–5 onsite/final", hours: 8 },
  ], [
    "≥1 OSS PR merged trong major repo",
    "Twitter ≥500 followers",
    "Q3 Decision Gate",
  ]),

  m(10, "Drill + Negotiation Prep", "interview", [
    { id: "10-l-1", category: "learn", text: "Compensation negotiation (levels.fyi + patio11)", hours: 6 },
    { id: "10-b-1", category: "build", text: "Anchor template kit cá nhân (refine take-home)", hours: 12 },
    { id: "10-a-1", category: "apply", text: "Apply 10/tuần", hours: 12 },
    { id: "10-i-1", category: "interview-prep", text: "System design Solana mock × 5", hours: 12 },
    { id: "10-r-1", category: "real-interview", text: "5–7 onsite/final", hours: 14 },
  ], [
    "≥1 verbal offer hoặc final round pending",
  ]),

  m(11, "Offer + Negotiation", "interview", [
    { id: "11-l-1", category: "learn", text: "Contractor agreement basics + VN tax + USD wire", hours: 6 },
    { id: "11-a-1", category: "apply", text: "Apply 5/tuần (selective)", hours: 6 },
    { id: "11-r-1", category: "real-interview", text: "3–5 final, target ≥1 written offer", hours: 12 },
    { id: "11-r-2", category: "real-interview", text: "Negotiate offer", hours: 6 },
  ], [
    "Written offer ≥$5K/tháng net",
  ]),

  m(12, "Land or Plan B", "interview", [
    { id: "12-l-1", category: "learn", text: "Onboarding new role hoặc Plan B execute", hours: 12 },
    { id: "12-b-1", category: "build", text: "Maintain flagship project even after job", hours: 8 },
    { id: "12-r-1", category: "real-interview", text: "Final negotiations", hours: 4 },
  ], [
    "OFFER SIGNED hoặc Plan B in motion",
    "Q4 Decision Gate",
  ]),
];

export const RESOURCES: Resource[] = [
  { id: "r1", name: "The Rust Programming Language", type: "book", priority: "must", status: "todo", costUSD: 0, url: "https://doc.rust-lang.org/book/" },
  { id: "r2", name: "Rustlings", type: "tool", priority: "must", status: "todo", costUSD: 0, url: "https://github.com/rust-lang/rustlings" },
  { id: "r3", name: "Tokio Tutorial", type: "doc", priority: "must", status: "todo", costUSD: 0, url: "https://tokio.rs/tokio/tutorial" },
  { id: "r4", name: "Solana Cookbook", type: "doc", priority: "must", status: "todo", costUSD: 0, url: "https://solana.com/developers/cookbook" },
  { id: "r5", name: "Anchor Book", type: "doc", priority: "must", status: "todo", costUSD: 0, url: "https://www.anchor-lang.com/" },
  { id: "r6", name: "Solana Foundation Bootcamp", type: "course", priority: "must", status: "todo", costUSD: 0, url: "https://solana.com/developers/bootcamp" },
  { id: "r7", name: "Helius Blog", type: "doc", priority: "must", status: "todo", costUSD: 0, url: "https://www.helius.dev/blog" },
  { id: "r8", name: "Programming Rust (O'Reilly)", type: "book", priority: "nice-to-have", status: "todo", costUSD: 40, url: "https://www.oreilly.com/library/view/programming-rust-2nd/9781492052586/" },
  { id: "r9", name: "Encode Club Solana Bootcamp", type: "course", priority: "nice-to-have", status: "todo", costUSD: 0, url: "https://www.encodeclub.com/" },
  { id: "r10", name: "Cyfrin Updraft (Solidity sec — M9+)", type: "course", priority: "nice-to-have", status: "todo", costUSD: 0, url: "https://www.cyfrin.io/updraft" },
  { id: "r11", name: "RareSkills Rust Bootcamp", type: "course", priority: "skip", status: "todo", costUSD: 1500, url: "https://rareskills.io/rust-bootcamp", note: "Overlap với free; skip" },
  { id: "r12", name: "Linux Foundation LFD480", type: "cert", priority: "skip", status: "todo", costUSD: 375, url: "https://training.linuxfoundation.org/training/programming-in-rust-lfd480/", note: "No hiring weight" },
];

export const INITIAL_DECISIONS: DecisionEntry[] = [
  { date: "2026-04-25", context: "Plan kickoff", choice: "Solana Protocol Eng → MEV/Trading specialization (default niche). Math-light, fastest ramp.", outcome: "Pending — review at end of M6" },
  { date: "2026-04-25", context: "Cert investment", choice: "Only Solana Foundation Bootcamp ($0). Skip RareSkills/LFD480/Let's Get Rusty Pro.", outcome: "Pending" },
];
