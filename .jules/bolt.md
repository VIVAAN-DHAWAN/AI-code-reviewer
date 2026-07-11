## 2026-07-11 - Batching LLM Requests

**Learning:** When parallelizing external LLM API requests, using `Promise.all` across all files simultaneously causes HTTP 429 'Too Many Requests' rate limit errors from the AI providers.
**Action:** Use batching or concurrency limits (e.g., a batch size of 3) to prevent API rate limits while still improving performance.
