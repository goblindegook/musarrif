import { describe, expect, test } from 'vitest'
import en from '../ui/locales/en.verbs.json'
import pt from '../ui/locales/pt.verbs.json'
import { search } from './search'

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

  test('suggests matches when only part of the root is typed', () => {
    const matches = search('كت')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
  })

  test('falls back to lemma-prefix matching for suggestions', () => {
    const matches = search('آم')

    expect(matches.some((verb) => verb.lemma.startsWith('آم'))).toBe(true)
  })

  test('keeps exact-root matches ahead of more distant roots', () => {
    expect(
      search('امن ب')
        .map((verb) => verb.id)
        .slice(0, 5),
    ).toEqual(["'mn-1", "'mn-2", "'mn-4", 'bvv-7', 'mdd-8'])
  })

  test.each([
    ['ktb', 'كتب'],
    ['Elm', 'علم'],
    ['kt', 'كتب'],
    ['kataba', 'كتب'],
  ])('matches verbs by Buckwalter input "%s"', (query, expectedRoot) => {
    const matches = search(query, { translate: () => '', language: 'test' })

    expect(matches.find((verb) => verb.root === expectedRoot)).toBeDefined()
  })

  test('matches verbs by translated text', () => {
    const translations = (en as { verbs?: Record<string, string> }).verbs ?? {}
    const matches = search('translate', { translate: (key) => translations[key], language: 'en' })

    expect(matches.find((verb) => verb.id === 'trjm-1')).toBeDefined()
  })

  test('partitions translated matches by language', () => {
    const english: Record<string, string> = en?.verbs ?? {}
    const portuguese: Record<string, string> = pt?.verbs ?? {}

    const englishMatches = search('translate', { translate: (key) => english[key], language: 'en' })
    const portugueseMatches = search('translate', { translate: (key) => portuguese[key], language: 'pt' })

    expect(englishMatches.length).toBeGreaterThan(portugueseMatches.length)
  })

  test('uses a different cache entry once translated search is enabled', () => {
    const untranslated = search('كتب')
    const english = (en as { verbs?: Record<string, string> }).verbs ?? {}
    const translated = search('كتب', { translate: (key) => english[key], language: 'en' })

    expect(untranslated[0]?.id).toBe('ktb-1')
    expect(translated[0]?.id).toBe('ktb-2')
  })
})
