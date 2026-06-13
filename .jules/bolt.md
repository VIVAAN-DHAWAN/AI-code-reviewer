## 2024-05-XX - Concurrent API Requests
**Learning:** LLM API calls in a loop create a linear latency bottleneck. Executing independent file reviews concurrently using Promise.all reduces total execution time from O(N) to O(1) regarding API latency.
**Action:** Use Promise.all() for independent, multiple network requests whenever files are processed individually.
