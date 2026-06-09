## 2024-06-25 - Avoid Sequential Network I/O in Loops
**Learning:** In the PR review process, calling an external AI API (like OpenAI or Anthropic) sequentially for each file significantly slows down the total review time. The network latency adds up linearly with the number of files.
**Action:** Use `Promise.all` to fetch file reviews concurrently. This transforms the total time from `O(N * Latency)` to `O(Latency)` where `N` is the number of files, vastly speeding up the action execution.
