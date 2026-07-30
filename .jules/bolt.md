## 2024-05-24 - Parallelizing AI Reviews

**Learning:** The application was processing PR diffs sequentially file-by-file, which caused review generation to scale linearly with the number of files O(N network requests). Parallelizing API calls speeds up the process significantly but risks hitting rate limits (e.g., HTTP 429 'Too Many Requests').
**Action:** When making multiple external AI API requests, always use batching or concurrency limits (e.g., batch size of 3) to balance speed and rate limit safety.

## 2025-03-05 - Parallelizing Independent API Calls

**Learning:** In the GitHub Action run lifecycle, we sequence independent API calls (like fetching PR details vs fetching the PR diff, and posting inline comments vs posting a summary). Waiting for each to complete sequentially introduces unnecessary linear delays.
**Action:** When multiple independent external API requests need to be made, group them using `Promise.all` to significantly reduce total network latency.
