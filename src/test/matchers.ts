import type { MatcherState } from '@vitest/expect'
import { diff } from '@vitest/utils/diff'

import { transliterateValue } from './transliteration'

export const matchers = {
  toMatchObjectT(this: MatcherState, received: unknown, expected: unknown) {
    const pass = this.equals(received, expected, [this.utils.iterableEquality, this.utils.subsetEquality])

    if (pass) return { pass }

    const originalDiff = this.utils.diff?.(expected, received, { expand: this.expand })
    const transliteratedDiff = diff(transliterateValue(expected), transliterateValue(received), { expand: this.expand })

    return {
      pass,
      message: () => {
        return [originalDiff, 'Transliterated diff:', transliteratedDiff].join('\n\n')
      },
    }
  },
  toEqualT(this: MatcherState, received: unknown, expected: unknown) {
    const pass = this.equals(received, expected, [this.utils.iterableEquality])

    if (pass) return { pass }

    const originalDiff = this.utils.diff?.(expected, received, { expand: this.expand })
    const transliteratedDiff = diff(transliterateValue(expected), transliterateValue(received), { expand: this.expand })

    return {
      pass,
      message: () => {
        return [originalDiff, 'Transliterated diff:', transliteratedDiff].join('\n\n')
      },
    }
  },
}
