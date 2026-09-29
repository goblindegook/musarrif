import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, verbs } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present jussive', () => {
  test('impersonal passive only conjugates 3ms in present jussive', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter(
            (verb) => verb.passive === 'impersonal' && getAvailableParadigms(verb).includes('passive.present.jussive'),
          ),
        ),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePresentMood(verb, 'jussive')[pronounId]).toEqualT('')
        },
      ),
    )
  })
})
