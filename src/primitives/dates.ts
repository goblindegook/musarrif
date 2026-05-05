export function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}
