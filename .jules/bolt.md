## 2026-07-17 - External API Parallelization
**Learning:** When making external API calls (e.g., to LLM providers) in a loop, parallelizing them without limits can cause HTTP 429 rate limit errors. Sequential execution is safe but slow.
**Action:** Use controlled concurrency with a batch size (e.g., 3) and `Promise.all` to balance speed and stability when parallelizing external requests.
