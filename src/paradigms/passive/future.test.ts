import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { FATHA, SEEN } from '../letters'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, verbs } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { conjugatePassivePresentMood } from './present'

describe('passive future', () => {
  it('impersonal passive only conjugates 3ms in future', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter(
            (verb) => verb.passiveVoice === 'impersonal' && getAvailableParadigms(verb).includes('passive.future'),
          ),
        ),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassiveFuture(verb)[pronounId]).toBe('')
        },
      ),
    )
  })

  it('prefixes seen + fatḥa to passive present indicative', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter((verb) => {
            const available = getAvailableParadigms(verb)
            return verb.passiveVoice !== 'impersonal' && available.includes('passive.future')
          }),
        ),
        fc.constantFrom(...PRONOUN_IDS),
        (verb, pronoun) => {
          const present = conjugatePassivePresentMood(verb, 'indicative')
          const future = conjugatePassiveFuture(verb)

          expect(future[pronoun]).toEqualT(`${SEEN}${FATHA}${present[pronoun]}`)
        },
      ),
    )
  })
})
