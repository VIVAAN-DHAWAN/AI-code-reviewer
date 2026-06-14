## 2025-02-28 - GitHub Action Network Call Optimization
**Learning:** Sequential network calls inside a `for` loop across multiple files is a major performance bottleneck for GitHub Actions interacting with external LLM APIs (e.g., OpenAI, Anthropic). It forces the Action runner to block on each I/O wait sequentially.
**Action:** When iterating over arrays (like PR diffs) and performing independent async operations, always prioritize `Promise.all` mapping to achieve concurrency and drastically minimize total workflow execution time.
