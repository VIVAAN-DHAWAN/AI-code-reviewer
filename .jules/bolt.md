## 2024-07-06 - Parallel AI Requests Bottleneck & Rate Limiting

**Learning:** The application processes multi-file PRs by making sequential calls to external AI APIs (`getReview`), leading to significant performance bottlenecks on large PRs. However, fully parallelizing these requests triggers HTTP 429 'Too Many Requests' rate limit errors from AI providers.
**Action:** When parallelizing external AI API calls, always implement batching or concurrency limits (e.g., batch size of 3) to optimize speed without exceeding provider rate limits.
