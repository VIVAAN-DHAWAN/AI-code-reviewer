## 2023-10-27 - diff-parser split overhead
**Learning:** `diffString.split('\n')` creates significant overhead in memory and time for large PR diffs (thousands of lines) compared to simple `indexOf` searches for the header marker `+++`.
**Action:** Use string search primitives (`indexOf`, `substring`) on large payload strings instead of allocating massive arrays.
