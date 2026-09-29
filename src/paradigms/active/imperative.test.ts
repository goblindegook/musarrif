import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, verbs } from '../verbs'
import { conjugateImperative } from './imperative'
import { conjugatePresentMood } from './present'

const arbitraryVerb = fc.constantFrom(
  ...verbs.filter((verb) => getAvailableParadigms(verb).includes('active.imperative')),
)

const arbitraryPronoun = fc.constantFrom(...PRONOUN_IDS).filter((pronounId) => pronounId.startsWith('2'))

describe('imperative', () => {
  test('all conjugations begin with alif hamza or alif madda', () => {
    fc.assert(
      fc.property(
        arbitraryVerb.filter(({ form, root }) => root.length === 3 && form === 4),
        arbitraryPronoun,
        (verb, pronounId) => {
          expect(['\u0622', '\u0623'].includes(String(conjugateImperative(verb)[pronounId])[0])).toEqualT(true)
        },
      ),
    )
  })

  test('stems from the jussive', () => {
    fc.assert(
      fc.property(arbitraryVerb, arbitraryPronoun, (verb, pronounId) => {
        const jussive = conjugatePresentMood(verb, 'jussive')
        const imperative = conjugateImperative(verb)
        expect(String(imperative[pronounId])).toContain(String(jussive[pronounId]).slice(-1))
      }),
    )
  })

  test('only exists for second person pronouns', () => {
    fc.assert(
      fc.property(arbitraryVerb, (verb) => {
        expect(conjugateImperative(verb)).toMatchObjectT({
          '1s': '',
          '1p': '',
          '3ms': '',
          '3fs': '',
          '3md': '',
          '3fd': '',
          '3mp': '',
          '3fp': '',
        })
      }),
    )
  })
})
