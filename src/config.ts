export const DEFAULTS = {
  aiProvider: 'openai',
  ollamaHost: 'http://localhost:11434',
  maxFiles: 10,
  batchSize: 3,
  reviewLevel: 'full',
  models: {
    openai: 'gpt-4o',
    openrouter: 'gpt-4o',
    anthropic: 'claude-sonnet-4-20250514',
    ollama: 'llama3',
  },
} as const;
