## 2024-06-25 - Parallelizing AI Code Reviews
**Learning:** Sequential processing of multiple files via external LLM API calls introduces significant delays and bottlenecks. However, unbounded parallelization can lead to HTTP 429 "Too Many Requests" rate limits.
**Action:** Always use batching or concurrency limits (e.g., Promise.all with chunking, batch size of 3) when making external LLM API requests for multiple items to ensure fast performance without hitting rate limits.
