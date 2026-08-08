export interface ReviewIssue {
  line: number;
  severity: 'critical' | 'warning' | 'suggestion';
  message: string;
  suggestion: string;
}

export interface ReviewResult {
  summary: string;
  issues: ReviewIssue[];
}

export interface ReviewOptions {
  aiProvider: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  openrouterApiKey?: string;
  baseUrl?: string;
  ollamaHost?: string;
  model: string;
  diff: string;
  reviewLevel: string;
}

export const SYSTEM_PROMPT = `You are an expert code reviewer. Review the following code diff and identify:
1. Bugs or logic errors
2. Security vulnerabilities
3. Performance issues
4. Code style / best practices
5. Suggestions for improvement

Be concise. For each issue, specify the line number, severity (critical/warning/suggestion), and a fix.
Return structured JSON matching this schema:
{
  "summary": "Overall review summary",
  "issues": [
    {
      "line": 42,
      "severity": "critical",
      "message": "SQL injection vulnerability",
      "suggestion": "Use parameterized queries"
    }
  ]
}`;

// "light" reviews are faster and noisier-less: only critical and warning
// findings, no style suggestions, and a shorter summary.
export function buildSystemPrompt(reviewLevel: string): string {
  if (reviewLevel === 'light') {
    return `You are an expert code reviewer. Review the following code diff and report ONLY:
1. Bugs or logic errors
2. Security vulnerabilities

Ignore style and minor suggestions. Be very concise.
Return structured JSON matching this schema:
{
  "summary": "Overall review summary (1-2 sentences)",
  "issues": [
    {
      "line": 42,
      "severity": "critical",
      "message": "SQL injection vulnerability",
      "suggestion": "Use parameterized queries"
    }
  ]
}`;
  }
  return SYSTEM_PROMPT;
}

export function buildUserPrompt(opts: ReviewOptions): string {
  return `Review level: ${opts.reviewLevel}\n\nDiff:\n${opts.diff}`;
}
