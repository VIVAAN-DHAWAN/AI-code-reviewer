## 2024-05-18 - Sequential API Calls in GitHub Actions
**Learning:** Sequential network calls inside loops are a significant bottleneck for actions processing multiple files (like code reviews). Total execution time scaled linearly with file count, which is particularly problematic for slow AI API responses.
**Action:** When iterating over independent tasks (like AI reviews for different files or fetching independent PR details), always use `Promise.all()` to execute them concurrently, capping concurrency if rate limits become an issue.
