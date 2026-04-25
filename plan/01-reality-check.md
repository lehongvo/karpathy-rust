# 01 — Reality Check

> Verify từng claim với data thực tế. Nếu sai, nói thẳng.

## "Rust là ngôn ngữ không thể thất nghiệp 2026–2030" — NỬA SAI

Đúng phần tăng trưởng, sai phần immune layoff:

- Rust job postings **+45% YoY** ([onrec.com](https://www.onrec.com/news/news-archive/top-companies-actively-hiring-rust-developers-in-2026)); admiration 72% (most-loved 9 năm liên tiếp) ([Stack Overflow Survey 2025](https://survey.stackoverflow.co/2025/technology/)).
- JetBrains 2025 ghi nhận Rust dev **+68.75% YoY** giai đoạn 2021–2024 ([JetBrains DevEcosystem 2025](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/)).
- **Nhưng**: Q1/2026 đã có **95,878 layoffs tech ở US** (~864/ngày) ([TechRadar](https://www.techradar.com/pro/nearly-80-000-tech-workers-have-already-lost-their-jobs-in-2026-and-ai-impact-means-more-could-be-to-come)). Không có data nào isolate Rust khỏi layoff trend.
- **Volume thật**: Rust ~847 job posting (3/2026) ([ZipRecruiter](https://www.ziprecruiter.com/Jobs/Rust-Programming)). **Go có 3–4× nhiều hơn** ([tech-insider.org](https://tech-insider.org/rust-vs-go-2026/)).

→ **Bias correction**: Rust không "không thể thất nghiệp". Đúng là: "Rust trả cao trong niche cụ thể (blockchain/infra/systems), không phải general-purpose backend."

## Lương remote (verified ≥2 nguồn)

| Role | USD/năm | Junior | Mid | Senior |
|---|---|---|---|---|
| Solana Engineer | $80–250K | $60–110K | $130–170K | $150–250K+ |
| Rust Protocol | $130–260K (avg $185K) | — | — | — |
| ZK Engineer | $175–250K + equity | — | — | — |
| MEV/Searcher | $150–320K+ | — | — | — |
| Security Auditor | $150–250K | — | — | — |

Sources: [web3.career](https://web3.career/web3-salaries/solana-developer), [rustjobs.dev](https://rustjobs.dev/salary-guide), [CryptoJobsList](https://cryptojobslist.com/rust).

→ Target **$5K/tháng = $60K/năm** = **realistic ngay từ junior** (band $80K junior remote).

## Cert value cho international hiring — RẤT THẤP

| Cert | Status |
|---|---|
| Rust Foundation official cert | **CHƯA TỒN TẠI** ([rustfoundation.org/training](https://rustfoundation.org/training/)) |
| Linux Foundation LFD480 | Có nhưng ít hiring weight |
| Encode Club Solana Bootcamp | Free 6 tuần, recognized trong Solana community |
| **Solana Foundation Bootcamp** | **Official, có job referral pipeline 500+ projects** ([solana.com/developers/bootcamp](https://solana.com/developers/bootcamp)) |
| Cyfrin Updraft | Solidity-focused, không Rust |
| Let's Get Rusty / RareSkills | Có content, không có hiring manager testimonial verified |

Hiring manager consensus ([scale.jobs](https://scale.jobs/blog/certifications-us-hiring-managers-respect-vs-ignore), [imocha.io](https://www.imocha.io/blog/how-to-hire-rust-developers)): **portfolio > cert**.

## Vietnam constraint (chưa được mention nhưng quan trọng)

- **Timezone UTC+7**: overlap US ~3h, EU 3–4h sáng VN, SG 1h. Nhiều JD "+/- 6h CET" loại VN out.
- **Crypto payment**: Luật Công nghiệp Công nghệ số VN (1/1/2026) công nhận crypto là tài sản, **nhưng SBV vẫn cấm crypto thanh toán** ([lightspark.com](https://www.lightspark.com/knowledge/is-crypto-legal-in-vietnam)). Negotiate USD bank transfer.
- **FTE vs Contractor**: 95% crypto company hire VN dev là **contractor**.

## Macro warning 2026 (cực kỳ quan trọng)

**Crypto dev market đang co lại** vì AI hút talent ([CoinDesk 3/2026](https://www.coindesk.com/tech/2026/03/12/crypto-developer-activity-sinks-to-multi-year-low-as-ai-absorbs-github-s-talent-boom)):
- Ethereum weekly active devs **-34%** trong 3 tháng
- Solana weekly active devs **-40%** trong 3 tháng
- Tổng crypto code commits **-75% YoY**

→ **Tin tốt**: ít competition cho positions còn lại; senior salary sticky.
→ **Tin xấu**: generic "blockchain dev" sẽ bị đào thải. Bắt buộc specialize vertical.
