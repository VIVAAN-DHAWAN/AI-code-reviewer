## 2024-05-24 - Parallelize LLM API Calls While Respecting Rate Limits
**Learning:** Parallelizing external LLM API requests via `Promise.all` can drastically improve action execution time since multiple reviews fetch concurrently. However, performing this indiscriminately causes HTTP 429 "Too Many Requests" errors. Batching (e.g. batch size of 3) provides a good balance between concurrency and API rate limits.
**Action:** Always process files or external network requests in controlled, batched chunks when iterating over long lists instead of full parallel or full sequential.
