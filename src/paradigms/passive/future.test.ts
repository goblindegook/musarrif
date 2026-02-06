import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { FATHA, SEEN } from '../letters'
import { PRONOUN_IDS } from '../pronouns'
import { verbs } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { conjugatePassivePresentMood } from './present'

describe('passive future', () => {
  it('prefixes seen + fatḥa to passive present indicative', () => {
    fc.assert(
      fc.property(fc.constantFrom(...verbs), fc.constantFrom(...PRONOUN_IDS), (verb, pronoun) => {
        const present = conjugatePassivePresentMood(verb, 'indicative')
        const future = conjugatePassiveFuture(verb)

        expect(future[pronoun]).toBe(`${SEEN}${FATHA}${present[pronoun]}`)
      }),
    )
  })
})
