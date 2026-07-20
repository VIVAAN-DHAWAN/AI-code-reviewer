## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.

## 2026-07-20 - Sequential GitHub API Calls
**Learning:** The GitHub Action previously fetched PR details and the diff sequentially, which unnecessarily doubled the network latency for these independent requests.
**Action:** Always check if independent asynchronous operations can be parallelized using `Promise.all` to reduce overall latency.
