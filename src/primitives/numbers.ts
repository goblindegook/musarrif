export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function sum(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0)
}

export function average(values: readonly number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length
}

export function toRoman(n: number): string {
  const table = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ] as const
  let remaining = n
  let result = ''
  for (const [n, s] of table) {
    while (remaining >= n) {
      result += s
      remaining -= n
    }
  }
  return result
}

export function parseInteger(value: string | null, defaultValue: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) ? parsed : defaultValue
}
