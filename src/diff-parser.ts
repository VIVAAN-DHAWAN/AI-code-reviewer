export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files = diffString.split(/^diff --git a\//m).filter(Boolean);
  return files.map((file) => {
    // ⚡ Bolt: Use string search instead of splitting the entire file by newlines to save memory and CPU
    const firstLineEnd = file.indexOf("\n");
    const firstLine =
      firstLineEnd !== -1 ? file.substring(0, firstLineEnd) : file;
    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    const startIdx = file.indexOf("\n+++");
    let diffContent = file;
    if (startIdx !== -1) {
      const endOfStartIdxLine = file.indexOf("\n", startIdx + 1);
      if (endOfStartIdxLine !== -1) {
        diffContent = file.substring(endOfStartIdxLine + 1);
      }
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
