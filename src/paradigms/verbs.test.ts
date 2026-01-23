/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, test } from 'vitest'
import en from '../locales/en.json'
import { search } from './verbs'

describe('findVerbsByRoot', () => {
  test('matches a verb when only an inflected form is provided', () => {
    const matches = search('يكتبون')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
  })

  test('combines matches from multiple root candidates in the same input', () => {
    const matches = search('يكتبون وقرأ')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
    expect(matches.find((verb) => verb.root === 'قرأ')).toBeDefined()
  })

  test('returns all derived forms for a matched root', () => {
    const forms = search('أمن').filter((verb) => verb.root === 'أمن')

    expect(forms.length).toBeGreaterThan(1)
  })

  test('returns newly added derived forms for درس', () => {
    const matches = search('درس', { exactRoot: true })

    expect(matches.map((verb) => verb.form)).toEqual([1, 2, 5, 10])
  })

  test.each([
    ['علم', [1, 2, 4, 5]],
    ['قدم', [1, 2, 5]],
    ['كبر', [1, 2, 3, 5, 6, 8, 10]],
    ['مرض', [1, 2, 4, 5, 10]],
  ])('returns derived forms for %s', (root, expectedForms) => {
    const matches = search(root, { exactRoot: true })

    expect(matches.map((verb) => verb.form)).toEqual(expectedForms)
  })

  test('suggests matches when only part of the root is typed', () => {
    const matches = search('كت')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
  })

  test('falls back to lemma-prefix matching for suggestions', () => {
    const matches = search('آم')

    expect(matches.some((verb) => verb.label.startsWith('آم'))).toBe(true)
  })

  test('returns only exact matches when requested', () => {
    const exact = search('بدل', { exactRoot: true })

    expect(exact.map((verb) => verb.form)).toEqual([1, 2, 6, 10])
  })

  test('exact-only search does not include lemma-prefix suggestions', () => {
    const input = 'آمن'
    const matches = search(input, { exactRoot: true })
    const fuzzy = search(input)

    expect(matches).not.toHaveLength(0)
    expect(matches.every((verb) => fuzzy.some((candidate) => candidate.id === verb.id))).toBe(true)
  })

  test('prioritizes closer roots over lower form numbers', () => {
    const matches = search('امن ب')
    const [first, second] = matches

    expect(first?.root).toBe('أمن')
    expect(first?.form).toBe(1)
    expect(second?.root).toBe('أمن')
    expect(second?.form).toBe(4)
  })

  test('matches verbs by translated text', () => {
    const translations = (en as { verbs?: Record<string, string> }).verbs ?? {}
    const matches = search('translate', { translate: (key) => translations[key] })

    expect(matches.find((verb) => verb.id === 'trjm-1')).toBeDefined()
  })
})
