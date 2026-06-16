## 2024-06-16 - Batch AI API Requests
**Learning:** Sequential loops awaiting external AI review APIs create unnecessary execution delays. However, completely unconstrained concurrency hits provider rate limits.
**Action:** When parallelizing external LLM API requests, chunk them into small batches (e.g., 3) and use `Promise.all` to balance between performance and rate-limit constraints.
