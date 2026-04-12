export function generateHumanId(prefix: string): string {
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timestampStr = Date.now().toString(36).slice(-2).toUpperCase();
  return `${prefix}-${randomStr}${timestampStr}`;
}
