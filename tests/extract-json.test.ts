import { describe, it, expect } from 'vitest';
import { extractJson } from '../src/providers/extract-json';

describe('extractJson', () => {
  it('returns plain JSON unchanged', () => {
    const json = '{"summary":"ok","issues":[]}';
    expect(extractJson(json)).toBe(json);
  });

  it('strips a ```json fenced block', () => {
    const input = '```json\n{"summary":"ok","issues":[]}\n```';
    expect(extractJson(input)).toBe('{"summary":"ok","issues":[]}');
  });

  it('strips a ``` fenced block', () => {
    const input = '```\n{"summary":"ok","issues":[]}\n```';
    expect(extractJson(input)).toBe('{"summary":"ok","issues":[]}');
  });

  it('keeps content before/after the fence out of the result', () => {
    const input = 'Here you go:\n```json\n{"summary":"ok","issues":[]}\n```\nHope that helps';
    expect(extractJson(input)).toBe('{"summary":"ok","issues":[]}');
  });

  it('trims surrounding whitespace', () => {
    expect(extractJson('  {"a":1}  ')).toBe('{"a":1}');
  });
});
