## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.
## 2024-07-21 - Parallelized GitHub API calls
**Learning:** Sequential, independent GitHub API calls (like fetching PR details and diffs) represent an unnecessary initialization bottleneck in actions.
**Action:** Always identify independent asynchronous network requests during initialization phases and use `Promise.all` to fetch them concurrently to minimize latency.
