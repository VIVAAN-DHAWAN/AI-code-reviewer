## 2025-05-14 - Parallelize LLM API requests with batching
**Learning:** When making multiple concurrent requests to external LLM APIs (e.g. OpenAI, Anthropic), a simple sequential `for...of` loop is too slow, but an unrestricted `Promise.all` across all files can quickly trigger HTTP 429 "Too Many Requests" rate limit errors.
**Action:** Use chunked batching (e.g. `Promise.all` with a batch size of 3) to achieve a safe balance between parallel speedup and rate limit compliance when processing multiple files.
