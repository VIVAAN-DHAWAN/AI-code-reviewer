const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface RetryOptions {
  retries?: number;
  baseDelayMs?: number;
}

export const DEFAULT_TIMEOUT_MS = 60_000;

export async function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>, ms: number = DEFAULT_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fn(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const retries = opts.retries ?? 3;
  const baseDelayMs = opts.baseDelayMs ?? 1000;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt >= retries) break;
      const delay = baseDelayMs * 2 ** attempt;
      console.warn(`Retrying after error (attempt ${attempt + 1}/${retries}): ${(error as Error)?.message}`);
      await sleep(delay);
    }
  }
  throw lastError;
}
