
## 2026-07-16 - Rate Limits vs Concurrency in AI API Calls
**Learning:** When parallelizing external LLM API requests (like OpenAI or Anthropic), unbounded `Promise.all` will quickly trigger HTTP 429 'Too Many Requests' errors, especially when reviewing multiple files in a PR.
**Action:** Always use chunking/batching (e.g., batches of 3-5) when dispatching multiple LLM requests to balance execution speed with rate-limit safety.
