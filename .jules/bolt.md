## 2024-06-19 - Sequential LLM API Calls Bottleneck

**Learning:** In `src/index.ts`, the application iterates over files and calls `getReview` sequentially using a `for...of` loop. This creates a linear performance bottleneck, as each LLM API call blocks the next file's review, making the Action execution time scale linearly with the number of changed files `O(n)`.
**Action:** Implemented a batched concurrency model for API calls to optimize execution time while staying within typical rate limits (e.g. batch size of 3). Next time, proactively look for opportunities to parallelize independent external API requests using `Promise.all` while considering rate limits.
