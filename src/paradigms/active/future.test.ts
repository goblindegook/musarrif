import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, getVerb, verbs } from '../verbs'
import { conjugateFuture } from './future'
import { conjugatePresentMood } from './present'

const SEEN = '\u0633'
const FATHA = '\u064E'

describe('active future', () => {
  it('prefixes seen + fatḥa to active present indicative', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs.filter((verb) => getAvailableParadigms(verb).includes('active.future'))),
        fc.constantFrom(...PRONOUN_IDS),
        (verb, pronoun) => {
          const present = conjugatePresentMood(verb, 'indicative')
          const future = conjugateFuture(verb)

          expect(future[pronoun]).toEqualT(`${SEEN}${FATHA}${present[pronoun]}`)
        },
      ),
    )
  })

  it('keeps the doubled noon ending for mkn-2 in 3fp', () => {
    const verb = getVerb('مكن', 2)
    const present = conjugatePresentMood(verb, 'indicative')
    const future = conjugateFuture(verb)

    expect(future['3fp']).toEqualT(`${SEEN}${FATHA}${present['3fp']}`)
  })
})
