## 2024-06-08 - Concurrent AI API Calls in GitHub Actions
**Learning:** Network requests, specifically calling LLM APIs sequentially in a `for` loop, creates a massive execution bottleneck for GitHub actions because each step pauses until the API finishes.
**Action:** Use `Promise.all` with `.map` to execute multiple independent network requests (like file-by-file AI reviews) concurrently. Also parallelize initial GitHub API fetch requests that don't depend on each other.
