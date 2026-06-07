## 2024-06-07 - Sequential Network Calls in Action

**Learning:** This AI-powered code review Action was sequentially awaiting API calls (which can take several seconds each) inside a for-loop, creating a major performance bottleneck for PRs with multiple files.

**Action:** Whenever iterating over items to make network requests (like AI text generation APIs), map them to an array of promises and use `Promise.all()` to resolve them concurrently, ensuring the total time is bound by the longest request rather than the sum of all requests.
