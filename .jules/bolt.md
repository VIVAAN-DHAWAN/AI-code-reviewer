## 2024-05-30 - Parallelize API requests for faster code reviews

**Learning:** Sequential AI requests in GitHub Actions can be a significant bottleneck for multi-file PRs. However, completely parallelizing all requests via naive `Promise.all` can trigger HTTP 429 "Too Many Requests" rate limit errors from AI providers.
**Action:** Implemented batched concurrent requests with a chunk size of 3, allowing safe parallel execution that balances speed with API rate limits.
