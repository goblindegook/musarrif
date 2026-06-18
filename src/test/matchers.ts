import { transliterate } from '@pacote/buckwalter'
import type { MatcherState } from '@vitest/expect'
import { diff } from '@vitest/utils/diff'
import { mapRecord } from '../primitives/objects'

export const matchers = {
  toMatchObjectT(this: MatcherState, received: unknown, expected: unknown) {
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
  if (isRecord(value)) return mapRecord(value, stringifyWords)
  return String(value)
}

interface AssertionLike {
  __flags: { object?: unknown }
}

interface ExpectLike {
  extend(matchers: Record<string, unknown>): void
  (received: unknown): object
}

export function installMatchers(expect: ExpectLike) {
  expect.extend(matchers)
  const assertionPrototype = Object.getPrototypeOf(expect(''))

  if (Object.getOwnPropertyDescriptor(assertionPrototype, 'strings')) return

  Object.defineProperty(assertionPrototype, 'strings', {
    configurable: true,
    get(this: AssertionLike) {
      this.__flags.object = stringifyWords(this.__flags.object)
      return this
    },
  })
}

const transliterateValue = (value: unknown): unknown => {
  if (typeof value === 'string') return transliterate(value)
  if (Array.isArray(value)) return value.map(transliterateValue)
  if (isRecord(value)) return mapRecord(value, transliterateValue)
  return value
}
