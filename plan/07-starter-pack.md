# 07 — Starter Pack

## 7.1 Verify "Rust hot nhất blockchain" — SAI cách phát biểu

Đúng là: **"Rust = ngôn ngữ trả lương cao nhất trong blockchain niche; Solidity vẫn cao nhất về volume."** Đừng tự ru ngủ "Rust = chắc chắn có job". Rust + Solana + portfolio shipped = chắc chắn có job.

## 7.2 Ngôn ngữ học đầu tiên — RUST TRƯỚC, KHÔNG SONG SONG

Lý do:
- Rust learning curve dốc (ownership/borrow checker). Học song song với Solidity sẽ làm mất focus 50% mỗi bên.
- Solidity dễ pickup sau khi đã rành Rust (audit pattern overlap).
- Move (Aptos/Sui) **skip** — ecosystem co lại -15% YoY.
- Cairo (StarkNet) **skip cho beginner** — quá niche.

**Stack học theo thứ tự**: Rust → Solana/Anchor → (M9+ optional) Solidity foundations → Audit tooling.

## 7.3 Cert ROI — sắp xếp theo (Uy tín × ROI) ÷ (Chi phí + Thời gian)

| Cert | Uy tín | ROI | Chi phí | Thời gian | Score | Verdict |
|---|---|---|---|---|---|---|
| **Solana Foundation Bootcamp** | 8/10 | 8/10 | $0 | 6–8 tuần | **HIGH** | **MUST** |
| Encode Club Solana Bootcamp | 6/10 | 6/10 | $0 | 6 tuần | Medium | Alt |
| Cyfrin Updraft (Solidity sec) | 8/10 | 7/10 | $0 | 12 tuần | High (M9+) | After base |
| Rust Foundation cert | N/A | N/A | N/A | N/A | **không tồn tại** | Skip |
| Linux Foundation LFD480 | 4/10 | 3/10 | $375 | 4 tuần | Low | **SKIP** |
| RareSkills Rust Bootcamp | 6/10 | 5/10 | $1.5K | 8 tuần | Low | **SKIP** |
| Let's Get Rusty Pro | 5/10 | 4/10 | $200/mo | ongoing | Low | **SKIP** |

→ **Đầu tư duy nhất 1 cert**: Solana Foundation Bootcamp.

## 7.4 30 ngày đầu tiên (week-by-week)

### Tuần 1 — Rust core syntax
- Đọc Rust Book ch.1–6 (variables, ownership, structs, enums, error handling)
- Rustlings: `intro` → `if` → `move_semantics` → `primitive_types`
- Daily commit nhỏ vào repo
- ✅ **Verify**: solve 30+ Rustlings exercises, hiểu ownership không cần lookup

### Tuần 2 — Lifetime + Traits + Generics
- Rust Book ch.8–10
- Rustlings `lifetimes`, `traits`, `generics`
- Build mini: CLI tool đọc CSV + filter (clap + serde)
- ✅ **Verify**: explain `'static` vs `'a`, viết generic function với trait bound

### Tuần 3 — Async/Tokio + Error handling
- Tokio tutorial sections 1–4
- `thiserror` + `anyhow` patterns
- Build mini: async TCP echo server với shared state `Arc<Mutex<T>>`
- ✅ **Verify**: hiểu `Send + Sync + 'static`, biết khi nào dùng `tokio::spawn` vs `spawn_blocking`

### Tuần 4 — Solana basics (SETUP path)
- Setup: Solana CLI, Anchor CLI, local validator
- Solana Cookbook: account, transaction, instruction
- Đọc Anchor Book ch.1–3
- Build mini: Anchor "hello world" program deployed local validator
- ✅ **Verify**: 1 program deployed, `solana program show <id>` thành công

**Daily routine**: 1.5–2.5h. Commit ≥ 5 ngày/tuần. Tweet 1 progress note/tuần.

## 7.5 Anti-patterns cần tránh

1. **Tutorial hell** — đừng học liên tục 3 tháng không build. Build từ tuần 2.
2. **Mua cert đắt thay vì build** — $1.5K RareSkills không bằng 2 program shipped.
3. **Học Move song song** — split focus, ROI âm.
4. **Apply quá sớm (M3–M5)** — không có project on-chain = bị reject hết, mất tự tin.
5. **Apply quá muộn (M12+)** — perfectionism. Apply M7 với 80% ready hơn M12 100% ready.
6. **Solo learning** — không tham gia Discord (Solana, Anchor, Jito). Bỏ qua mass network effect.
7. **Skip testing** — Solana program không có test = không deploy được mainnet, hiring manager reject ngay.
8. **Generic resume** — không tailor JD = response rate <2%.
9. **Twitter spam** — đăng meme thay vì technical insight = 0 hiring manager follow.
10. **Burnout sớm tháng 2–3** — push 30h/tuần khi budget 15–20h. Pace: marathon, không sprint.
