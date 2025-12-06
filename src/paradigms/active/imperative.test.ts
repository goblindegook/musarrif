/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { ALIF_HAMZA } from '../constants'
import { isWeakLetter } from '../helpers'
import { verbs } from '../verbs'
import { conjugateImperative } from './imperative'
import { conjugatePresentMood } from './present'

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

  it('imperative only exists for second person pronouns', () => {
    fc.assert(
      fc.property(fc.constantFrom(...verbs), (verb) => {
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

  it('imperative stems from jussive for non-geminate Form II', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs).filter((verb) => {
          const [c1, c2, c3] = Array.from(verb.root)
          if (verb.root.length > 3) return false
          if (verb.form === 1 && (isWeakLetter(c1) || c1 === ALIF_HAMZA) && isWeakLetter(c3)) return false
          if (verb.form === 2 && c2 === c3) return false
          return true
        }),
        (verb) => {
          const jussive = conjugatePresentMood(verb, 'jussive')
          const imperative = conjugateImperative(verb)

          expect(imperative['2ms']).toContain(jussive['2ms'].slice(-1))
          expect(imperative['2fs']).toContain(jussive['2fs'].slice(-1))
          expect(imperative['2d']).toContain(jussive['2d'].slice(-1))
          expect(imperative['2pm']).toContain(jussive['2pm'].slice(-1))
          expect(imperative['2pf']).toContain(jussive['2pf'].slice(-1))
        },
      ),
    )
  })

  it('it assimilates the initial wāw for ٱتَّصِلْ (Form VIII)', () => {
    const verb = verbs.find((entry) => entry.root === 'وصل' && entry.form === 8)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِتَّصِلْ')
  })

  it('geminate Form II imperative has kasra after shadda (e.g., حَبِّ)', () => {
    const verb = verbs.find((entry) => entry.root === 'حبب' && entry.form === 2)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('حَبِّ')
  })

  it('uses the shortened hollow stem for قال', () => {
    const qaala = verbs.find((entry) => entry.root === 'قول' && entry.form === 1)!
    const imperative = conjugatePresentMood(qaala, 'imperative')

    expect(imperative['2ms']).toBe('قُلْ')
    expect(imperative['2fs']).toBe('قُوْلِي')
    expect(imperative['2d']).toBe('قُوْلَا')
    expect(imperative['2pm']).toBe('قُوْلُوا')
    expect(imperative['2pf']).toBe('قُلْنَ')
  })

  it('keeps the long vowel for hollow Form III like قَاوَدَ', () => {
    const verb = verbs.find((entry) => entry.root === 'قود' && entry.form === 3)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('قَاوِدْ')
  })

  it('shortens hollow Form IV imperative like أَقَادَ → أَقِدْ', () => {
    const verb = verbs.find((entry) => entry.root === 'قود' && entry.form === 4)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('أَقِدْ')
  })

  it('shortens hollow Form VII imperative like اِنْقَادَ → اِنْقَدْ', () => {
    const verb = verbs.find((entry) => entry.root === 'قود' && entry.form === 7)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِنْقَدْ')
  })

  it('shortens hollow Form VIII imperative like اِقْتَادَ → اِقْتَدْ', () => {
    const verb = verbs.find((entry) => entry.root === 'قود' && entry.form === 8)!
    const imperative = conjugatePresentMood(verb, 'imperative')

    expect(imperative['2ms']).toBe('اِقْتَدْ')
  })

  it.each([
    ['وقي', 1, 'قِ'],
    ['ولى', 1, 'لِ'],
    ['أنشأ', 4, 'أَنْشِئْ'],
    ['أتى', 1, 'ائْتِ'],
    ['أوي', 1, 'أَوِ'],
    ['أوفى', 1, 'أَوْفِ'],
    ['وعد', 1, 'عِدْ'],
  ])('%s (%d) imperative 2ms is %s', (root, form, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const imperative = conjugatePresentMood(verb, 'imperative')
    expect(imperative['2ms']).toBe(expected)
  })
})
