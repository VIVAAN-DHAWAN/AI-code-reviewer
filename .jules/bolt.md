## 2024-05-15 - Parallelizing LLM API Requests
**Learning:** External LLM API requests need to be parallelized for performance, but if they are run concurrently without bounds, it easily triggers HTTP 429 "Too Many Requests" rate limit errors from AI providers. Batching with a small concurrency limit (e.g. 3) strikes the right balance.
**Action:** Always use bounded concurrency like chunked `Promise.all` with a small batch size instead of sequential `await` or fully parallel `Promise.all` when calling third-party AI APIs.
