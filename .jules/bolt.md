## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.

## 2024-08-01 - Sequential GitHub API Requests
**Learning:** Initializing PR data involved fetching PR details and diff sequentially from the GitHub API using `await getPRDetails` and `await getPRDiff` in `src/index.ts`. Since these requests don't depend on each other, this adds unnecessary latency.
**Action:** Use `Promise.all()` to parallelize independent API requests (like fetching details and diffs) to improve initialization speed.
## 2024-08-05 - Avoid String Splits for Diff Parsing
**Learning:** In `src/diff-parser.ts`, the application was parsing large PR diffs by repeatedly using `.split('\n')`. This created massive intermediate arrays of strings, causing a significant memory allocation overhead and CPU spike for large PRs.
**Action:** Replace `split('\n')` with `indexOf('\n')` and `substring()` loops to avoid allocating large arrays, keeping the memory footprint low when parsing massive text payloads.
