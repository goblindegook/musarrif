import { cleanup, render, waitFor } from '@testing-library/preact'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { useSrsStore } from './useSrsStore'

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('useSRSStore', () => {
  test('sanitizes oversized persisted data and writes sanitized state back', async () => {
    const cardKey = 'conjugation:sound:1:active.past:3ms'
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        [cardKey]: {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      }),
    )

    function Probe() {
      useSrsStore()
      return null
    }

    render(h(Probe, {}))

    const expectedDueDate = utcAddDays(new Date().toISOString().slice(0, 10), 365)
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
      expect(stored[cardKey].interval).toBe(365)
      expect(stored[cardKey].dueDate).toBe(expectedDueDate)
    })
  })

  test('records answer updates through the hook API', async () => {
    const cardKey = 'conjugation:sound:1:active.past:3ms'

    function Probe() {
      const [, recordSrsAnswer] = useSrsStore()

      useEffect(() => {
        recordSrsAnswer(cardKey, 'correct')
      }, [recordSrsAnswer])

      return null
    }

    render(h(Probe, {}))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
      expect(stored[cardKey].interval).toBe(1)
      expect(stored[cardKey].repetitions).toBe(1)
      expect(stored[cardKey].ef).toBeCloseTo(2.5)
    })
  })
})
