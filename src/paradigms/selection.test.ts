import { describe, expect, test } from 'vitest'
import en from '../locales/en.json'
import { getClosestVerbs, search } from './selection'

describe('getClosestVerbs', () => {
  test('prefers verbs with matching radicals in the same positions', () => {
    const closestRoots = getClosestVerbs('نبء', 6).map((verb) => verb.root)

    expect(closestRoots).toEqualT(['خبء', 'نشء', 'نوء', 'ءبي', 'بدء', 'بدء'])
  })
})

describe('search', () => {
  test('matches a verb when only an inflected form is provided', () => {
    const matches = search('يكتبون')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
  })

  test('combines matches from multiple root candidates in the same input', () => {
    const matches = search('يكتبون وقرأ')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
    expect(matches.find((verb) => verb.root === 'قرء')).toBeDefined()
  })

  test('returns all derived forms for a matched root', () => {
    const forms = search('ءمن').filter((verb) => verb.root === 'ءمن')

    expect(forms.length).toBeGreaterThan(1)
  })

  test('returns all derived forms for a matched root with regular hamza', () => {
    const forms = search('ءمن').filter((verb) => verb.root === 'ءمن')

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

    expect(first?.root).toEqualT('ءمن')
    expect(first?.form).toBe(1)
    expect(second?.root).toEqualT('ءمن')
    expect(second?.form).toBe(4)
  })

  test.each([
    ['ktb', 'كتب'],
    ['Elm', 'علم'],
    ['kt', 'كتب'],
    ['kataba', 'كتب'],
  ])('matches verbs by Buckwalter input "%s"', (query, expectedRoot) => {
    const matches = search(query, { translate: () => '' })

    expect(matches.find((verb) => verb.root === expectedRoot)).toBeDefined()
  })

  test('matches verbs by translated text', () => {
    const translations = (en as { verbs?: Record<string, string> }).verbs ?? {}
    const matches = search('translate', { translate: (key) => translations[key] })

    expect(matches.find((verb) => verb.id === 'trjm-1')).toBeDefined()
  })
})
