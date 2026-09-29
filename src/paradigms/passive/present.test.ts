import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, verbs } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present indicative', () => {
  test.each(['indicative', 'subjunctive', 'jussive'] as const)(
    'a verb marked as having no passive conjugates no %s cell',
    (mood) => {
      fc.assert(
        fc.property(
          fc.constantFrom(...verbs.filter((verb) => verb.passive === 'none')),
          fc.constantFrom(...PRONOUN_IDS),
          (verb, pronounId) => {
            expect(conjugatePassivePresentMood(verb, mood)[pronounId]).toEqualT('')
          },
        ),
      )
    },
  )

  test('impersonal passive only conjugates 3ms in present indicative', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter(
            (verb) =>
              verb.passive === 'impersonal' && getAvailableParadigms(verb).includes('passive.present.indicative'),
          ),
        ),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePresentMood(verb, 'indicative')[pronounId]).toEqualT('')
        },
      ),
    )
  })
})
