## 2024-06-11 - Blocking Sequential Network Requests in API loops
**Learning:** Found sequential `await` calls inside a `for...of` loop making network requests (`getReview`) in `src/index.ts`. This turns O(1) network wait time into O(N), blocking the main execution path significantly when processing multiple files.
**Action:** Always map loop iterations that make independent asynchronous calls (like API requests) to an array of Promises and use `await Promise.all(...)` to process them concurrently, reducing total wait time.
