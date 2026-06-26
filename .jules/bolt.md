## 2024-06-26 - Batch LLM API requests to prevent HTTP 429 Too Many Requests
**Learning:** Parallelizing LLM API requests requires batching (e.g., size 3) to prevent HTTP 429 'Too Many Requests' errors, balancing speed and reliability.
**Action:** When implementing parallelism for external AI APIs, always use a chunking or concurrency limit instead of unbound Promise.all.
