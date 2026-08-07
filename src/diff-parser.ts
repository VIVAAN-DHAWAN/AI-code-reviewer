export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files = diffString.split(/^diff --git a\//m).filter(Boolean);
  return files.map((file) => {
    // ⚡ Bolt: Avoid split('\n') on potentially large diff strings for better performance
    let firstNewline = file.indexOf("\n");
    if (firstNewline === -1) firstNewline = file.length;

    const firstLine = file.substring(0, firstNewline);
    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    let diffContent = file;
    const plusLineIdx = file.indexOf("\n+++");
    if (plusLineIdx !== -1) {
      const diffStartIdx = file.indexOf("\n", plusLineIdx + 1);
      if (diffStartIdx !== -1) {
        diffContent = file.substring(diffStartIdx + 1);
      }
    } else if (file.startsWith("+++")) {
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
