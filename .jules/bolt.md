## 2024-06-28 - External API Call Batching
**Learning:** Parallelizing AI API calls can drastically speed up performance but doing it unconstrained can cause HTTP 429 rate limit errors.
**Action:** Used a batching pattern with `Promise.all` (batch size of 3) to execute parallel external requests securely without overloading the API provider.
