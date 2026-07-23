## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.

## 2024-05-24 - Parallelizing Independent Network Requests

**Learning:** There are pairs of sequential, independent network calls to the GitHub API, such as fetching PR details and diffs (`getPRDetails` and `getPRDiff`), or posting comments and summaries (`postReviewComments` and `postSummary`). Running them sequentially increases the execution time by combining latency.
**Action:** Always group independent promises using `Promise.all` to execute them concurrently, effectively halving the latency of these steps without added complexity.