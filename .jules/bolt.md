## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.

## 2024-08-01 - Sequential GitHub API Requests
**Learning:** Initializing PR data involved fetching PR details and diff sequentially from the GitHub API using `await getPRDetails` and `await getPRDiff` in `src/index.ts`. Since these requests don't depend on each other, this adds unnecessary latency.
**Action:** Use `Promise.all()` to parallelize independent API requests (like fetching details and diffs) to improve initialization speed.

## $(date +%Y-%m-%d) - Optimize Large String Splits

**Learning:** Using `.split('\n')` on large strings like PR diffs allocates massive arrays in memory and increases CPU overhead unnecessarily when only parts of the string are needed.
**Action:** Use string search methods like `indexOf` and `substring` to parse large strings (like PR diffs) efficiently, avoiding the overhead of massive array allocations.
