## 2024-06-21 - Parallelizing LLM API Requests

**Learning:** When trying to improve performance by parallelizing external API requests (like fetching PR details and diffs concurrently with `Promise.all`), be cautious when parallelizing LLM API requests. Submitting too many concurrent requests to providers like OpenAI or Anthropic can trigger HTTP 429 "Too Many Requests" rate limit errors, which ruins performance or breaks the review completely.
**Action:** Use a batching approach (e.g., chunk size of 3) with `Promise.all` over each chunk. This strikes a good balance between achieving parallelization performance gains and staying within typical API rate limits.
