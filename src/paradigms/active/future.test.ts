import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { FATHA, SEEN } from '../letters'
import { PRONOUN_IDS } from '../pronouns'
import { verbs } from '../verbs'
import { conjugateFuture } from './future'
import { conjugatePresentMood } from './present'

describe('active future', () => {
  it('prefixes seen + fatḥa to active present indicative', () => {
    fc.assert(
      fc.property(fc.constantFrom(...verbs), fc.constantFrom(...PRONOUN_IDS), (verb, pronoun) => {
        const present = conjugatePresentMood(verb, 'indicative')
        const future = conjugateFuture(verb)

        expect(future[pronoun]).toEqualT(`${SEEN}${FATHA}${present[pronoun]}`)
      }),
    )
  })
})
