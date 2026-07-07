## 2024-07-07 - Batching External API Requests

**Learning:** Processing files sequentially for AI reviews is a performance bottleneck, but unrestricted parallelization causes HTTP 429 rate limit errors.
**Action:** When parallelizing external LLM API requests in this application, use batching with a limit (e.g., batch size of 3) to improve speed safely.
