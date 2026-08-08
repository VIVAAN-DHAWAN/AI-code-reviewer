import OpenAI from 'openai';
import type { ReviewOptions, ReviewResult } from './types';
import { SYSTEM_PROMPT, buildUserPrompt } from './types';
import { DEFAULT_TIMEOUT_MS } from './retry';

export async function callOpenAI(opts: ReviewOptions): Promise<ReviewResult> {
  const isOpenRouter = opts.aiProvider === 'openrouter';
  const client = new OpenAI({
    apiKey: isOpenRouter ? opts.openrouterApiKey : opts.openaiApiKey,
    baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : opts.baseUrl,
    timeout: DEFAULT_TIMEOUT_MS,
  });

  const response = await client.chat.completions.create({
    model: opts.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(opts) },
    ],
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0].message?.content;
  if (!content) {
    throw new Error('OpenAI returned an empty response');
  }
  return JSON.parse(content) as ReviewResult;
}
