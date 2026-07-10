## 2024-07-10 - LLM API Rate Limits and Parallelization

**Learning:** When parallelizing external LLM API requests in this application, making too many concurrent requests can lead to HTTP 429 'Too Many Requests' rate limit errors from the AI providers.
**Action:** Use batching or concurrency limits (e.g., batch size of 3) when parallelizing API calls to avoid hitting rate limits while still improving performance.
