## 2024-05-24 - AI API Rate Limiting

**Learning:** Making sequential external LLM API calls per file creates a significant performance bottleneck, but processing them all at once can quickly lead to HTTP 429 "Too Many Requests" errors from AI providers.
**Action:** Use a batching mechanism with a small concurrency limit (e.g., `Promise.all` with a batch size of 3) to improve throughput while avoiding rate limits.
