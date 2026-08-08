import type { ReviewOptions, ReviewResult } from './types';
import { buildSystemPrompt, buildUserPrompt } from './types';
import { extractJson } from './extract-json';
import { withTimeout } from './retry';

const REVIEW_TOOL = {
  name: 'emit_review',
  description: 'Emit the code review as structured JSON',
  input_schema: {
    type: 'object',
    properties: {
      summary: { type: 'string' },
      issues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            line: { type: 'number' },
            severity: { type: 'string', enum: ['critical', 'warning', 'suggestion'] },
            message: { type: 'string' },
            suggestion: { type: 'string' },
          },
          required: ['line', 'severity', 'message', 'suggestion'],
        },
      },
    },
    required: ['summary', 'issues'],
  },
} as const;

export async function callAnthropic(opts: ReviewOptions): Promise<ReviewResult> {
  const response = await withTimeout((signal) =>
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': opts.anthropicApiKey || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: 4096,
        system: buildSystemPrompt(opts.reviewLevel),
        messages: [{ role: 'user', content: buildUserPrompt(opts) }],
        tools: [REVIEW_TOOL],
        tool_choice: { type: 'tool', name: 'emit_review' },
      }),
      signal,
    }),
  );

  if (!response.ok) {
    throw new Error(`Anthropic Error: ${await response.text()}`);
  }

  const data = await response.json();
  const toolUse = data.content?.find(
    (block: { type?: string }) => block.type === 'tool_use',
  );
  if (toolUse?.input) {
    return toolUse.input as ReviewResult;
  }

  // Fallback: older model responses that ignore tools.
  const textBlock = data.content?.find(
    (block: { type?: string }) => block.type === 'text',
  );
  const content: string = textBlock?.text ?? '';
  return JSON.parse(extractJson(content)) as ReviewResult;
}
