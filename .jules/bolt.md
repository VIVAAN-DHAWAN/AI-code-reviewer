## 2024-05-18 - Batching LLM Requests
**Learning:** Sequential processing of external LLM API requests is slow. However, making all requests concurrently without limits can cause HTTP 429 "Too Many Requests" rate limit errors from AI providers.
**Action:** Use batched `Promise.all()` to limit the concurrency of LLM API requests, striking a balance between performance and API rate limits.
