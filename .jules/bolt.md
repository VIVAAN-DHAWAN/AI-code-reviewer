## 2026-07-03 - LLM API Call Parallelization

**Learning:** Reviewing code diffs sequentially was a major performance bottleneck for this GitHub Action, as it processes multiple files via slow LLM API calls. However, unbounded parallelization with external AI providers frequently causes 429 "Too Many Requests" errors.

**Action:** Implement batched parallelization (chunking `Promise.all` requests, e.g., batch size 3) when processing multiple AI requests. This drastically speeds up overall execution time for multi-file PRs while remaining within common external API rate limits.