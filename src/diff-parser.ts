export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files = diffString.split(/^diff --git a\//m).filter(Boolean);
  return files.map((file) => {
    // ⚡ Bolt: Use indexOf and substring instead of split('\n') to prevent excessive memory allocations and CPU overhead on large diffs
    const firstNewlineIdx = file.indexOf("\n");
    const firstLine =
      firstNewlineIdx !== -1 ? file.substring(0, firstNewlineIdx) : file;

    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    let diffContent = file;
    // Find the start of the actual diff content (after +++ line)
    const plusIdx = file.indexOf("\n+++");
    if (plusIdx !== -1) {
      const contentStartIdx = file.indexOf("\n", plusIdx + 1);
      if (contentStartIdx !== -1) {
        diffContent = file.substring(contentStartIdx + 1);
      }
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
