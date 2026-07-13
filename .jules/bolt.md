## 2024-05-24 - Rate Limit Bottleneck in LLM APIs
**Learning:** Sequential processing of files for external LLM API calls creates a significant network I/O bottleneck, but unlimited concurrency triggers HTTP 429 "Too Many Requests" rate limits from providers like OpenAI and Anthropic.
**Action:** Use batched concurrency (e.g., `Promise.all` with a batch size of 3) when processing multiple files to optimize for speed while remaining within rate limits.
