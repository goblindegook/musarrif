import fc from 'fast-check'
import { expect, test } from 'vitest'
import { conjugate } from '../paradigms/conjugation'
import { verbs } from '../paradigms/verbs'
import { diffAnswer } from './answer-diff'

test('an identical answer is correct with no marks', () => {
  expect(diffAnswer('كَتَبَ', 'كَتَبَ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'كَتَبَ', mark: 'match' }],
    correct: [{ text: 'كَتَبَ', mark: 'match' }],
  })
})

test('a substituted letter is wrong and marks that letter on both sides', () => {
  expect(diffAnswer('كتم', 'كتب')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'كت', mark: 'match' },
      { text: 'م', mark: 'error' },
    ],
    correct: [
      { text: 'كت', mark: 'match' },
      { text: 'ب', mark: 'error' },
    ],
  })
})

test('an inserted letter is wrong and marks only the extra letter', () => {
  expect(diffAnswer('كاتب', 'كتب')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'ك', mark: 'match' },
      { text: 'ا', mark: 'error' },
      { text: 'تب', mark: 'match' },
    ],
    correct: [{ text: 'كتب', mark: 'match' }],
  })
})

test('a deleted letter is wrong and marks the missing letter on the correct side', () => {
  expect(diffAnswer('كتب', 'كاتب')).toEqual({
    outcome: 'wrong',
    typed: [{ text: 'كتب', mark: 'match' }],
    correct: [
      { text: 'ك', mark: 'match' },
      { text: 'ا', mark: 'error' },
      { text: 'تب', mark: 'match' },
    ],
  })
})

test('a wrong hamza seat is an error, not a forgiven variant', () => {
  expect(diffAnswer('اكل', 'أكل')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'ا', mark: 'error' },
      { text: 'كل', mark: 'match' },
    ],
    correct: [
      { text: 'أ', mark: 'error' },
      { text: 'كل', mark: 'match' },
    ],
  })
})

test('a decomposed hamza carrier equals its composed form', () => {
  expect(diffAnswer('أكل', 'أكل')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'أكل', mark: 'match' }],
    correct: [{ text: 'أكل', mark: 'match' }],
  })
})

test('surrounding whitespace is trimmed before comparison', () => {
  expect(diffAnswer('  يكتب ', 'يَكتُبُ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'يكتب', mark: 'match' }],
    correct: [{ text: 'يَكتُبُ', mark: 'match' }],
  })
})

test('a bare skeleton against a vocalised solution is correct on letters alone', () => {
  expect(diffAnswer('كتب', 'كَتَبَ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'كتب', mark: 'match' }],
    correct: [{ text: 'كَتَبَ', mark: 'match' }],
  })
})

test('a sukoon typed where the solution has one is correct', () => {
  expect(diffAnswer('يَكْتُبُ', 'يَكْتُبُ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'يَكْتُبُ', mark: 'match' }],
    correct: [{ text: 'يَكْتُبُ', mark: 'match' }],
  })
})

test('a vowel typed where the solution has a sukoon is wrong', () => {
  expect(diffAnswer('يَكَتُبُ', 'يَكْتُبُ')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'يَ', mark: 'match' },
      { text: 'كَ', mark: 'error' },
      { text: 'تُبُ', mark: 'match' },
    ],
    correct: [
      { text: 'يَ', mark: 'match' },
      { text: 'كْ', mark: 'error' },
      { text: 'تُبُ', mark: 'match' },
    ],
  })
})

test('a different vowel is wrong and marks that letter on both sides', () => {
  expect(diffAnswer('كُتَبَ', 'كَتَبَ')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'كُ', mark: 'error' },
      { text: 'تَبَ', mark: 'match' },
    ],
    correct: [
      { text: 'كَ', mark: 'error' },
      { text: 'تَبَ', mark: 'match' },
    ],
  })
})

test('an explicit sukoon typed where the solution has a vowel is wrong', () => {
  expect(diffAnswer('كْتَبَ', 'كَتَبَ')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'كْ', mark: 'error' },
      { text: 'تَبَ', mark: 'match' },
    ],
    correct: [
      { text: 'كَ', mark: 'error' },
      { text: 'تَبَ', mark: 'match' },
    ],
  })
})

test('a vowel omitted while others are typed is partially correct', () => {
  expect(diffAnswer('كتَبَ', 'كَتَبَ')).toEqual({
    outcome: 'partial',
    typed: [{ text: 'كتَبَ', mark: 'match' }],
    correct: [
      { text: 'كَ', mark: 'missing' },
      { text: 'تَبَ', mark: 'match' },
    ],
  })
})

test('a vowel the some rendering drops may be omitted without penalty', () => {
  expect(diffAnswer('كَتَبا', 'كَتَبَا')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'كَتَبا', mark: 'match' }],
    correct: [{ text: 'كَتَبَا', mark: 'match' }],
  })
})

test('a shadda omitted while other marks are typed is wrong', () => {
  expect(diffAnswer('كَتَبَ', 'كَتَّبَ')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'كَ', mark: 'match' },
      { text: 'تَ', mark: 'error' },
      { text: 'بَ', mark: 'match' },
    ],
    correct: [
      { text: 'كَ', mark: 'match' },
      { text: 'تَّ', mark: 'error' },
      { text: 'بَ', mark: 'match' },
    ],
  })
})

test('a shadda added where the solution has none is wrong', () => {
  expect(diffAnswer('كَتَّبَ', 'كَتَبَ')).toEqual({
    outcome: 'wrong',
    typed: [
      { text: 'كَ', mark: 'match' },
      { text: 'تَّ', mark: 'error' },
      { text: 'بَ', mark: 'match' },
    ],
    correct: [
      { text: 'كَ', mark: 'match' },
      { text: 'تَ', mark: 'error' },
      { text: 'بَ', mark: 'match' },
    ],
  })
})

test('a shadda typed where the solution has one is correct', () => {
  expect(diffAnswer('كَتَّبَ', 'كَتَّبَ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'كَتَّبَ', mark: 'match' }],
    correct: [{ text: 'كَتَّبَ', mark: 'match' }],
  })
})

test('a solution shadda is forgiven when no diacritics are typed at all', () => {
  expect(diffAnswer('كتب', 'كَتَّبَ')).toEqual({
    outcome: 'correct',
    typed: [{ text: 'كتب', mark: 'match' }],
    correct: [{ text: 'كَتَّبَ', mark: 'match' }],
  })
})

test('any conjugated form diffed against itself is correct with no marks', () => {
  fc.assert(
    fc.property(fc.constantFrom(...verbs), (verb) => {
      const form = String(conjugate(verb, 'active.past')['3ms'])

      expect(diffAnswer(form, form)).toEqual({
        outcome: 'correct',
        typed: [{ text: form, mark: 'match' }],
        correct: [{ text: form, mark: 'match' }],
      })
    }),
  )
})

test('outcome is wrong exactly when some segment is marked as an error', () => {
  fc.assert(
    fc.property(fc.constantFrom(...verbs), (verb) => {
      const typed = String(conjugate(verb, 'active.past')['3ms'])
      const solution = String(conjugate(verb, 'active.past')['3fs'])
      const diff = diffAnswer(typed, solution)
      const hasError = [...diff.typed, ...diff.correct].some((segment) => segment.mark === 'error')

      expect(diff.outcome === 'wrong').toBe(hasError)
    }),
  )
})
