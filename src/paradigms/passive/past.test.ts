import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, verbs } from '../verbs'
import { conjugatePassivePast } from './past'

describe('passive past pattern', () => {
  test('impersonal passive only conjugates 3ms in past', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter(
            (verb) => verb.passive === 'impersonal' && getAvailableParadigms(verb).includes('passive.past'),
          ),
        ),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePast(verb)[pronounId]).toEqualT('')
        },
      ),
    )
  })

  test('a verb marked as having no passive conjugates no past cell', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs.filter((verb) => verb.passive === 'none')),
        fc.constantFrom(...PRONOUN_IDS),
        (verb, pronounId) => {
          expect(conjugatePassivePast(verb)[pronounId]).toEqualT('')
        },
      ),
    )
  })
})
