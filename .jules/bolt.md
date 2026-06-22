## 2024-06-22 - Batching LLM API Requests
**Learning:** In a GitHub Action architecture that processes multiple files through external AI APIs (like OpenAI or Anthropic), executing all requests concurrently can lead to HTTP 429 'Too Many Requests' rate limit errors, whereas sequential processing is too slow for large PRs.
**Action:** When parallelizing external LLM API requests in this application, use batching or concurrency limits (e.g., batch size of 3) to prevent rate limit errors while still gaining performance benefits.
