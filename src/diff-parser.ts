export interface DiffChunk {
  filename: string;
  diff: string;
}

export function parseDiff(diffString: string): DiffChunk[] {
  const files: string[] = [];
  let start = 0;
  const searchString = "diff --git a/";
  const searchStringNewline = "\ndiff --git a/";

  if (diffString.startsWith(searchString)) {
    start = searchString.length;
  }

  while (start < diffString.length && start !== -1) {
    const next = diffString.indexOf(searchStringNewline, start);
    if (next === -1) {
      files.push(diffString.substring(start));
      break;
    } else {
      files.push(diffString.substring(start, next));
      start = next + searchStringNewline.length;
    }
  }

  return files.map((file) => {
    const firstLineEnd = file.indexOf("\n");
    const firstLine =
      firstLineEnd !== -1 ? file.substring(0, firstLineEnd) : file;
    const filenameMatch = firstLine.match(/.*? b\/(.*)/);
    const filename = filenameMatch ? filenameMatch[1] : "unknown";

    // Extract actual diff lines without header
    // Using substring instead of split to avoid memory allocation overhead
    // for large PR diff strings
    let diffContent = file;
    const plusIdx = file.indexOf("\n+++");
    if (plusIdx !== -1) {
      const afterPlusNewline = file.indexOf("\n", plusIdx + 1);
      if (afterPlusNewline !== -1) {
        diffContent = file.substring(afterPlusNewline + 1);
      }
    } else if (file.startsWith("+++")) {
      const afterPlusNewline = file.indexOf("\n");
      if (afterPlusNewline !== -1) {
        diffContent = file.substring(afterPlusNewline + 1);
      }
    }

    return {
      filename,
      diff: diffContent,
    };
  });
}
