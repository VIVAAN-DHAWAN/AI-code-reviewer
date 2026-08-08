import type { ReviewOptions, ReviewResult } from './types';
import { callOpenAI } from './openai';
import { callAnthropic } from './anthropic';
import { callOllama } from './ollama';
import { withRetry } from './retry';

export { extractJson } from './extract-json';
export type { ReviewIssue, ReviewOptions, ReviewResult } from './types';

export async function getReview(opts: ReviewOptions): Promise<ReviewResult | null> {
  try {
    return await withRetry(() => {
      if (opts.aiProvider === 'anthropic') {
        return callAnthropic(opts);
      }
      if (opts.aiProvider === 'ollama') {
        return callOllama(opts);
      }
      return callOpenAI(opts);
    });
  } catch (error) {
    console.error(`AI API Error (${opts.aiProvider}):`, error);
    return null;
  }
}
