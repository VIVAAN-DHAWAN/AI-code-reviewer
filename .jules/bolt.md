## 2026-07-01 - Batching External LLM API Requests
**Learning:** Sequential processing of LLM requests can be a significant performance bottleneck, but unrestricted parallelization leads to HTTP 429 'Too Many Requests' rate limit errors from AI providers.
**Action:** Use a bounded concurrency approach (e.g., processing requests in chunks of 3) when parallelizing external LLM API calls to balance speed and rate limit constraints.
