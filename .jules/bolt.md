## 2024-03-24 - Parallelize AI API Requests
**Learning:** Sequential LLM API requests for multiple files cause a severe performance bottleneck. However, unrestrained parallel requests (`Promise.all` for all files simultaneously) can lead to HTTP 429 'Too Many Requests' rate limits from AI providers.
**Action:** Always use bounded concurrency (e.g., batching with a size of 3) when calling external AI APIs for multiple files in GitHub Actions to balance speed and rate-limit safety.
