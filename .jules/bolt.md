## 2024-05-15 - Batch LLM API Requests
**Learning:** When reviewing pull requests with many files, processing files sequentially is too slow, but sending all files concurrently causes HTTP 429 'Too Many Requests' rate limits from AI providers.
**Action:** Use `Promise.all` with a limited batch size (e.g., 3) to balance speed and rate limits when calling external LLM APIs.
