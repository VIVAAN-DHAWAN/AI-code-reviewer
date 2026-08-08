import type { ReviewOptions, ReviewResult } from './types';
import { callOpenAI } from './openai';
import { callAnthropic } from './anthropic';
import { callOllama } from './ollama';
import { withRetry } from './retry';

export { extractJson } from './extract-json';
export type { ReviewIssue, ReviewOptions, ReviewResult } from './types';

export function validateOptions(opts: ReviewOptions): void {
  switch (opts.aiProvider) {
    case 'anthropic':
      if (!opts.anthropicApiKey) {
        throw new Error(
          "Missing anthropic_api_key input: required when ai_provider is 'anthropic'",
        );
      }
      break;
    case 'ollama':
      if (!opts.ollamaHost) {
        throw new Error(
          "Missing ollama_host input: required when ai_provider is 'ollama'",
        );
      }
      break;
    case 'openrouter':
      if (!opts.openrouterApiKey) {
        throw new Error(
          "Missing openrouter_api_key input: required when ai_provider is 'openrouter'",
        );
      }
      break;
    default:
      if (!opts.openaiApiKey) {
        throw new Error(
          "Missing openai_api_key input: required when ai_provider is 'openai'",
        );
      }
  }
}

export async function getReview(opts: ReviewOptions): Promise<ReviewResult | null> {
  try {
    validateOptions(opts);
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
