## 2024-06-27 - Parallelizing LLM API Requests

**Learning:** When making multiple external LLM API requests per Pull Request (one per changed file), a sequential for-loop severely bottlenecks the total review time. However, unbounded parallelization (`Promise.all` on everything) quickly leads to HTTP 429 "Too Many Requests" errors from AI providers.
**Action:** Implement batched concurrency limits (e.g., batch size of 3) when processing multiple files. This maximizes throughput without tripping provider rate limits.
