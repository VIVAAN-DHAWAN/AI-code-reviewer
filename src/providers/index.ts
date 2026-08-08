import type { ReviewOptions, ReviewResult } from './types';
import { callOpenAI } from './openai';
import { callAnthropic } from './anthropic';
import { callOllama } from './ollama';

export { extractJson } from './extract-json';
export type { ReviewIssue, ReviewOptions, ReviewResult } from './types';

export async function getReview(opts: ReviewOptions): Promise<ReviewResult | null> {
  try {
    if (opts.aiProvider === 'anthropic') {
      return await callAnthropic(opts);
    }
    if (opts.aiProvider === 'ollama') {
      return await callOllama(opts);
    }
    return await callOpenAI(opts);
  } catch (error) {
    console.error(`AI API Error (${opts.aiProvider}):`, error);
    return null;
  }
}
