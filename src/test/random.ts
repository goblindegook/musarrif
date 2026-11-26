import fc from 'fast-check'
import { vi } from 'vitest'

// noBias: fast-check otherwise favours edge values, so most draws would pick the first item of every list.
const unitDraw = fc.noBias(fc.integer({ min: 0, max: 0xffff_ffff })).map((n) => n / 0x1_0000_0000)

// Every Math.random draw comes from fast-check, so a failure prints a seed that replays the exact exercise.
// `range` bounds every draw, so a test can force a threshold (e.g. focus below 0.75) without scripting call order.
export function forAnyRandomness(check: () => void, [min, max]: readonly [number, number] = [0, 1]): void {
  const draws = fc.infiniteStream(unitDraw.map((draw) => min + draw * (max - min)))
  const random = vi.spyOn(Math, 'random')
  try {
    fc.assert(
      fc.property(draws, (stream) => {
        random.mockImplementation(() => stream.next().value)
        check()
      }),
      { numRuns: 20 },
    )
  } finally {
    random.mockRestore()
  }
}
