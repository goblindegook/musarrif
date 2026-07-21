import { transliterate } from '@pacote/buckwalter'
import type { MatcherState } from '@vitest/expect'
import { diff } from '@vitest/utils/diff'
import { mapRecord } from '../primitives/objects'

export const matchers = {
  toMatchObjectT(this: MatcherState, received: unknown, expected: unknown) {
    received = stringifyWords(received)
    const pass = this.equals(received, expected, [this.utils.iterableEquality, this.utils.subsetEquality])

    if (pass) {
      return {
        pass,
        message: () => '',
      }
    }

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
    received = stringifyWords(received)
    const pass = this.equals(received, expected, [this.utils.iterableEquality])

    if (pass) {
      return {
        pass,
        message: () => '',
      }
    }

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === 'object' && value.constructor === Object

export const stringifyWords = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stringifyWords)
  if (value instanceof Set) return new Set([...value].map(stringifyWords))
  if (isRecord(value)) return mapRecord(value, stringifyWords)
  if (value == null || typeof value !== 'object') return value
  return String(value)
}

const isAsymmetricMatcher = (value: unknown): value is { sample: unknown } =>
  value != null && typeof (value as { asymmetricMatch?: unknown }).asymmetricMatch === 'function'

const transliterateValue = (value: unknown): unknown => {
  if (typeof value === 'string') return transliterate(value)
  if (Array.isArray(value)) return value.map(transliterateValue)
  if (value instanceof Set) return new Set([...value].map(transliterateValue))
  if (isAsymmetricMatcher(value))
    return Object.assign(Object.create(Object.getPrototypeOf(value)), value, {
      sample: transliterateValue(value.sample),
    })

  if (isRecord(value)) return mapRecord(value, transliterateValue)
  return value
}
