export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files = diffString.split(/^diff --git a\//m).filter(Boolean);
  return files.map((file) => {
    // ⚡ Bolt: Avoid expensive split/join on large diff strings
    const firstLineEndIdx = file.indexOf("\n");
    const firstLine =
      firstLineEndIdx !== -1 ? file.substring(0, firstLineEndIdx) : file;

    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    const startMarker = "\n+++ ";
    const startIdx = file.indexOf(startMarker);

    let diffContent = file;
    if (startIdx !== -1) {
      const nextNewLine = file.indexOf("\n", startIdx + 1);
      diffContent = nextNewLine !== -1 ? file.substring(nextNewLine + 1) : "";
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
