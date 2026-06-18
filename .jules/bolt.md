## 2024-05-18 - LLM API Concurrency Constraints
**Learning:** Sequential processing of LLM API requests per file causes severe bottlenecks linearly proportional to PR size. However, naive `Promise.all` across all files risks triggering HTTP 429 Too Many Requests errors from LLM providers (OpenAI/Anthropic/Ollama).
**Action:** When parallelizing external LLM API calls, always implement chunked batching (e.g. batch size of 3) rather than unconstrained concurrency to balance speed and rate limit safety.
