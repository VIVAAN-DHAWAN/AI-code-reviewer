## 2024-07-08 - Batching AI API Requests

**Learning:** Sequential processing of multiple files in PR diffs created a performance bottleneck due to blocking on external AI API requests (`await getReview`). Parallelizing all requests simultaneously would risk hitting HTTP 429 'Too Many Requests' rate limits from the AI providers.
**Action:** Use `Promise.all` with a small batch size (e.g., 3) or concurrency limit when parallelizing external LLM API calls in the loop. This significantly speeds up code review completion time while safely avoiding rate limit errors.
