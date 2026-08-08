import type { ReviewOptions, ReviewResult } from './types';
import { SYSTEM_PROMPT, buildUserPrompt } from './types';
import { extractJson } from './extract-json';
import { withTimeout } from './retry';

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
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(opts) }],
      }),
      signal,
    }),
  );

  if (!response.ok) {
    throw new Error(`Anthropic Error: ${await response.text()}`);
  }

  const data = await response.json();
  const content: string = data.content[0].text;
  return JSON.parse(extractJson(content)) as ReviewResult;
}
