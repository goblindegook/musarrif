import type { MatcherState } from '@vitest/expect'
import { diff } from '@vitest/utils/diff'

import { transliterateValue } from './transliteration'

type DiffOptions = {
  expand?: boolean
}

const buildDiff = (valueA: unknown, valueB: unknown, options: DiffOptions): string | null =>
  diff(valueA, valueB, options) ?? null

export const matchers = {
  toMatchObjectT(this: MatcherState, received: unknown, expected: unknown) {
    const pass = this.equals(received, expected, [this.utils.iterableEquality, this.utils.subsetEquality])
    if (pass) {
      return {
        pass: true,
        message: () => '',
      }
    }

    const diffOptions = { expand: this.expand }
    const originalDiff =
      this.utils.diff?.(expected, received, diffOptions) ?? buildDiff(expected, received, diffOptions)
    const transliteratedDiff = buildDiff(transliterateValue(expected), transliterateValue(received), diffOptions)

    return {
      pass: false,
      message: () => {
        const parts = []
        if (originalDiff) parts.push(originalDiff)
        parts.push('Transliterated diff:')
        if (transliteratedDiff) parts.push(transliteratedDiff)
        return parts.join('\n\n')
      },
    }
  },
  toEqualT(this: MatcherState, received: unknown, expected: unknown) {
    const pass = this.equals(received, expected, [this.utils.iterableEquality])
    if (pass) {
      return {
        pass: true,
        message: () => '',
      }
    }

    const diffOptions = { expand: this.expand }
    const originalDiff =
      this.utils.diff?.(expected, received, diffOptions) ?? buildDiff(expected, received, diffOptions)
    const transliteratedExpected = transliterateValue(expected)
    const transliteratedReceived = transliterateValue(received)
    const transliteratedDiff = buildDiff(transliteratedExpected, transliteratedReceived, diffOptions)

    return {
      pass: false,
      message: () => {
        const parts = []
        if (originalDiff) parts.push(originalDiff)
        parts.push('Transliterated diff:')
        parts.push(transliteratedDiff ?? 'No diff available for transliterated values.')
        return parts.join('\n\n')
      },
    }
  },
}
