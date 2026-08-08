import { describe, it, expect } from 'vitest';
import { parseDiff } from '../src/diff-parser';

const standardDiff = `diff --git a/src/foo.ts b/src/foo.ts
index 1111111..2222222 100644
--- a/src/foo.ts
+++ b/src/foo.ts
@@ -1,3 +1,4 @@
 const a = 1;
+const b = 2;
 const c = 3;
`;

describe('parseDiff', () => {
  it('extracts the filename from the diff header', () => {
    const chunks = parseDiff(standardDiff);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].filename).toBe('src/foo.ts');
  });

  it('returns only the body after the +++ header', () => {
    const chunks = parseDiff(standardDiff);
    expect(chunks[0].diff).toBe('@@ -1,3 +1,4 @@\n const a = 1;\n+const b = 2;\n const c = 3;\n');
  });

  it('parses multiple files in one diff', () => {
    const multi = standardDiff + standardDiff.replaceAll('foo.ts', 'bar.ts');
    const chunks = parseDiff(multi);
    expect(chunks).toHaveLength(2);
    expect(chunks.map((c) => c.filename)).toEqual(['src/foo.ts', 'src/bar.ts']);
  });

  it('falls back to "unknown" when the filename cannot be parsed', () => {
    const chunks = parseDiff('--- \n+++ \n@@ -1 +1 @@\n-x\n+y\n');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].filename).toBe('unknown');
  });

  it('handles empty input', () => {
    expect(parseDiff('')).toEqual([]);
  });

  it('handles an empty file body', () => {
    const chunks = parseDiff('diff --git a/x b/x\n--- a/x\n+++ b/x\n');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].diff).toBe('');
  });

  it('marks git binary patches as binary', () => {
    const chunks = parseDiff(`diff --git a/img.png b/img.png
new file mode 100644
index 0000000..1234567
GIT binary patch
literal 10
...`);
    expect(chunks[0].binary).toBe(true);
    expect(chunks[0].diff).toBe('');
  });

  it('marks "Binary files ... differ" as binary', () => {
    const chunks = parseDiff(`diff --git a/a.png b/a.png
Binary files a/a.png and b/a.png differ`);
    expect(chunks[0].binary).toBe(true);
  });

  it('does not mark text diffs as binary', () => {
    const chunks = parseDiff(standardDiff);
    expect(chunks[0].binary).toBeUndefined();
  });
});
