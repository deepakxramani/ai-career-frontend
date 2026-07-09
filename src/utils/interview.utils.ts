/**
 * Safely parses a score value returned by the AI into a numeric value out of 10.
 * Handles formats like "8", "8/10", "8 / 10", "8 out of 10", "Score is 9", etc.
 */
export function parseScore(scoreVal: any): number {
  if (typeof scoreVal === 'number') {
    return isNaN(scoreVal) ? 0 : scoreVal;
  }
  if (!scoreVal) return 0;
  
  const str = String(scoreVal).trim();
  
  // Try matching fraction format e.g. "8/10", "8 / 10"
  const fractionMatch = str.match(/^(\d+)\s*\/\s*\d+/);
  if (fractionMatch) {
    return Number(fractionMatch[1]);
  }

  // Try extracting the first sequence of digits from the string
  const digitMatch = str.match(/(\d+)/);
  if (digitMatch) {
    return Number(digitMatch[1]);
  }

  const parsed = Number(str);
  return isNaN(parsed) ? 0 : parsed;
}
