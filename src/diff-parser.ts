export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  // ⚡ Bolt: Parse diff using string search methods instead of .split('\n')
  // to avoid large memory allocations and CPU overhead on massive diffs.
  const chunks = diffString.split(/^diff --git a\//m).filter(Boolean);

  return chunks.map((chunk) => {
    const firstLineEnd = chunk.indexOf("\n");
    const firstLine =
      firstLineEnd !== -1 ? chunk.substring(0, firstLineEnd) : chunk;

    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    const plusPlusPlusIdx = chunk.indexOf("\n+++");
    let diffContent = chunk;

    if (plusPlusPlusIdx !== -1) {
      const diffStartIdx = chunk.indexOf("\n", plusPlusPlusIdx + 1);
      if (diffStartIdx !== -1) {
        diffContent = chunk.substring(diffStartIdx + 1);
      }
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
