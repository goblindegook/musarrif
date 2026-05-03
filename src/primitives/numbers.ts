export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function sum(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0)
}

export function average(values: readonly number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length
}
