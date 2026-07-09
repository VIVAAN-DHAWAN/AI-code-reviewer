## 2024-07-09 - AI API Rate Limiting Bottleneck
**Learning:** Sequential LLM requests are too slow for code reviews with many files, but blindly parallelizing all API requests causes HTTP 429 'Too Many Requests' rate limit errors from AI providers.
**Action:** Implement batched concurrency (batch size of 3) when parallelizing external LLM API requests to balance speed and rate limit safety.
