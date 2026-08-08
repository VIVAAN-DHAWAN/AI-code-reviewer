// Extracts a JSON payload from a model response, tolerating markdown code fences.
export function extractJson(content: string): string {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    return fenced[1].trim();
  }
  return content.trim();
}
