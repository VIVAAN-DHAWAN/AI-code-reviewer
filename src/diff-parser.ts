export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files = diffString.split(/^diff --git a\//m).filter(Boolean);
  return files.map((file) => {
    // ⚡ Bolt: Use string search methods instead of .split('\n') to avoid
    // excessive memory allocations and CPU overhead for large PR diffs
    const firstNewlineIdx = file.indexOf("\n");
    const firstLine =
      firstNewlineIdx !== -1 ? file.substring(0, firstNewlineIdx) : file;

    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    // The "+++" string usually appears at the start of a line indicating added file
    // Let's find the start of the line that begins with "+++"
    const plusPlusPlusIdx = file.indexOf("\n+++");

    let diffContent = file;
    if (plusPlusPlusIdx !== -1) {
      // Find the newline after the "+++" line to get the actual diff content
      const diffStartIdx = file.indexOf("\n", plusPlusPlusIdx + 1);
      if (diffStartIdx !== -1) {
        diffContent = file.substring(diffStartIdx + 1);
      }
    } else if (file.startsWith("+++")) {
      // Edge case where file string starts exactly with "+++" without preceding newline
      const diffStartIdx = file.indexOf("\n");
      if (diffStartIdx !== -1) {
        diffContent = file.substring(diffStartIdx + 1);
      }
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
