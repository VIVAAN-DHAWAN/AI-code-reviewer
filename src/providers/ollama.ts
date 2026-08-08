import type { ReviewOptions, ReviewResult } from './types';
import { SYSTEM_PROMPT, buildUserPrompt } from './types';
import { extractJson } from './extract-json';
import { withTimeout } from './retry';

export async function callOllama(opts: ReviewOptions): Promise<ReviewResult> {
  const response = await withTimeout((signal) =>
    fetch(`${opts.ollamaHost}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: opts.model,
        stream: false,
        format: 'json',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(opts) },
        ],
      }),
      signal,
    }),
  );

  if (!response.ok) {
    throw new Error(`Ollama Error: ${await response.text()}`);
  }

  const data = await response.json();
  return JSON.parse(extractJson(data.message.content)) as ReviewResult;
}
