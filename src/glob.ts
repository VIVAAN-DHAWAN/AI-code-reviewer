// Minimal glob matcher supporting `*`, `**`, and `?`, used for file filters.
export function globToRegExp(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*')
    .replace(/\?/g, '[^/]');
  return new RegExp(`^${escaped}$`);
}

export function matchesAny(filename: string, patterns: string[]): boolean {
  if (!patterns || patterns.length === 0) return true;
  return patterns.some((pattern) => globToRegExp(pattern.trim()).test(filename));
}

export function parseCommaSeparated(input: string | undefined): string[] {
  if (!input) return [];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
