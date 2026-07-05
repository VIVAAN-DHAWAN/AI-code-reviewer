## 2025-07-05 - Parallelize LLM API requests with concurrency limits

**Learning:** When parallelizing external LLM API requests (like `getReview`) in this application, using a generic `Promise.all` over all files can lead to HTTP 429 'Too Many Requests' rate limit errors from the AI providers.
**Action:** Use batching or concurrency limits (e.g., a batch size of 3) when processing multiple files to prevent these rate limit errors while still getting the performance benefits of concurrent execution.
