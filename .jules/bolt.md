## 2025-05-14 - Parallelize Sequential API Calls in GitHub Actions
**Learning:** Sequential third-party API calls inside a GitHub Action can directly multiply CI/CD wait times and cost, turning a fast action into a prolonged operation proportional to the number of files.
**Action:** When an action processes an array of items (like files from a diff) requiring external I/O (like AI API calls), use concurrent mapping with `Promise.all()` to flatten the performance penalty from O(N*T) to ~O(T). Parallelize subsequent independent API calls as well.
