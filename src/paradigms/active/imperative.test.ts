/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import fc from 'fast-check'
import { describe, expect, it, test } from 'vitest'
import { ALIF_HAMZA, ALIF_MADDA } from '../constants'
import { isWeakLetter } from '../helpers'
import { PRONOUN_IDS } from '../pronouns'
import { verbs } from '../verbs'
import { conjugateImperative } from './imperative'
import { conjugatePresentMood } from './present'

const arbitraryVerb = fc.constantFrom(...verbs)

const arbitraryPronoun = fc.constantFrom(...PRONOUN_IDS).filter((pronounId) => pronounId.startsWith('2'))

describe('imperative', () => {
  it('drops the final glide for أعطى', () => {
    const verb = verbs.find((entry) => entry.root === 'عطى' && entry.form === 4)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('أَعْطِ')
    expect(imperative['2fs']).toBe('أَعْطِي')
    expect(imperative['2d']).toBe('أَعْطِيَا')
    expect(imperative['2pm']).toBe('أَعْطُوا')
    expect(imperative['2pf']).toBe('أَعْطِينَ')
  })

  test('imperative only exists for second person pronouns', () => {
    fc.assert(
      fc.property(arbitraryVerb, (verb) => {
        const imperative = conjugateImperative(verb)

        expect(imperative['1s']).toBe('')
        expect(imperative['1p']).toBe('')
        expect(imperative['3ms']).toBe('')
        expect(imperative['3fs']).toBe('')
        expect(imperative['3dm']).toBe('')
        expect(imperative['3df']).toBe('')
        expect(imperative['3pm']).toBe('')
        expect(imperative['3pf']).toBe('')
      }),
    )
  })

  it('it assimilates the initial wāw for ٱتَّصِلْ (Form VIII)', () => {
    const verb = verbs.find(({ root, form }) => root === 'وصل' && form === 8)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِتَّصِلْ')
  })

  it('geminate Form II imperative has kasra after shadda (e.g., حَبِّ)', () => {
    const verb = verbs.find(({ root, form }) => root === 'حبب' && form === 2)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('حَبِّ')
  })

  it('uses the shortened hollow stem for قال', () => {
    const verb = verbs.find(({ root, form }) => root === 'قول' && form === 1)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('قُلْ')
    expect(imperative['2fs']).toBe('قُوْلِي')
    expect(imperative['2d']).toBe('قُوْلَا')
    expect(imperative['2pm']).toBe('قُوْلُوا')
    expect(imperative['2pf']).toBe('قُلْنَ')
  })

  it('keeps the long vowel for hollow Form III like قَاوَدَ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 3)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('قَاوِدْ')
  })

  it('shortens hollow Form IV imperative like أَقَادَ → أَقِدْ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 4)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('أَقِدْ')
  })

  it('shortens hollow Form VII imperative like اِنْقَادَ → اِنْقَدْ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 7)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِنْقَدْ')
  })

  it('shortens hollow Form VIII imperative like اِقْتَادَ → اِقْتَدْ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 8)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِقْتَدْ')
  })

  it.each([
    ['وقي', 1, 'قِ'],
    ['ولى', 1, 'لِ'],
    ['أنشأ', 4, 'أَنْشِئْ'],
    ['أتى', 1, 'ائْتِ'],
    ['أوي', 1, 'اِئْوِ'],
    ['أوي', 4, 'آوِ'],
    ['أوي', 5, 'تَأَوَّ'],
    ['أوي', 10, 'اِسْتَأْوِ'],
    ['أوفى', 1, 'أَوْفِ'],
    ['وعد', 1, 'عِدْ'],
  ])('%s (%d) imperative 2ms is %s', (root, form, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const imperative = conjugatePresentMood(verb, 'imperative')
    expect(imperative['2ms']).toBe(expected)
  })

  describe('imperative stems from jussive', () => {
    test('for forms III-X', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => {
            if (form < 3) return false
            const [c1, c2, c3] = Array.from(root)
            return c1 !== ALIF_HAMZA && !isWeakLetter(c2) && !isWeakLetter(c3)
          }),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })

    test('for non-assimilated, non-defective form I', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => {
            const [c1, , c3] = Array.from(root)
            return form === 1 && !isWeakLetter(c1) && c1 !== ALIF_HAMZA && !isWeakLetter(c3)
          }),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })

    test('for non-geminated form II', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => {
            const [, c2, c3] = Array.from(root)
            return form === 2 && c2 !== c3
          }),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })
  })

  test('all imperative conjugations of form IV verbs begin with alif hamza or alif madda', () => {
    fc.assert(
      fc.property(
        arbitraryVerb.filter(({ form }) => form === 4),
        arbitraryPronoun,
        (verb, pronounId) => {
          const imperative = conjugateImperative(verb)
          const firstChar = imperative[pronounId][0]

          expect([ALIF_HAMZA, ALIF_MADDA].includes(firstChar)).toBe(true)
        },
      ),
    )
  })
})
