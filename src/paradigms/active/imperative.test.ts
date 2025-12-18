/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import fc from 'fast-check'
import { describe, expect, it, test } from 'vitest'
import { ALIF_HAMZA, ALIF_MADDA, isWeakLetter } from '../letters'
import { PRONOUN_IDS } from '../pronouns'
import { getVerb, verbs } from '../verbs'
import { conjugateImperative } from './imperative'
import { conjugatePresentMood } from './present'

const arbitraryVerb = fc.constantFrom(...verbs)

const arbitraryPronoun = fc.constantFrom(...PRONOUN_IDS).filter((pronounId) => pronounId.startsWith('2'))

describe('imperative', () => {
  it.each([
    ['عطى', 4, 'أَعْطِ'],
    ['ضحي', 4, 'أَضْحِ'],
  ])('drops the final glide for form IV verb with root %s', (root, form, expected2ms) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe(expected2ms)
  })

  describe('regular verbs', () => {
    describe('ك-ت-ب', () => {
      test('كَتَبَ (Form I)', () => {
        expect(conjugateImperative(getVerb('كتب', 1))).toEqual({
          '1s': '',
          '2ms': 'اُكْتُبْ',
          '2fs': 'اُكْتُبِي',
          '2d': 'اُكْتُبَا',
          '2pm': 'اُكْتُبُوا',
          '2pf': 'اُكْتُبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('كَتَّبَ (Form II)', () => {
        expect(conjugateImperative(getVerb('كتب', 2))).toEqual({
          '1s': '',
          '2ms': 'كَتِّبْ',
          '2fs': 'كَتِّبِي',
          '2d': 'كَتِّبَا',
          '2pm': 'كَتِّبُوا',
          '2pf': 'كَتِّبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('كَاتَبَ (Form III)', () => {
        expect(conjugateImperative(getVerb('كتب', 3))).toEqual({
          '1s': '',
          '2ms': 'كَاتِبْ',
          '2fs': 'كَاتِبِي',
          '2d': 'كَاتِبَا',
          '2pm': 'كَاتِبُوا',
          '2pf': 'كَاتِبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('أَكْتَبَ (Form IV)', () => {
        expect(conjugateImperative(getVerb('كتب', 4))).toEqual({
          '1s': '',
          '2ms': 'أَكْتِبْ',
          '2fs': 'أَكْتِبِي',
          '2d': 'أَكْتِبَا',
          '2pm': 'أَكْتِبُوا',
          '2pf': 'أَكْتِبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('تَكَتَّبَ (Form V)', () => {
        expect(conjugateImperative(getVerb('كتب', 5))).toEqual({
          '1s': '',
          '2ms': 'تَكَتَّبْ',
          '2fs': 'تَكَتَّبِي',
          '2d': 'تَكَتَّبَا',
          '2pm': 'تَكَتَّبُوا',
          '2pf': 'تَكَتَّبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('تَكَاتَبَ (Form VI)', () => {
        expect(conjugateImperative(getVerb('كتب', 6))).toEqual({
          '1s': '',
          '2ms': 'تَكَاتَبْ',
          '2fs': 'تَكَاتَبِي',
          '2d': 'تَكَاتَبَا',
          '2pm': 'تَكَاتَبُوا',
          '2pf': 'تَكَاتَبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })

      test('اِنْكَتَبَ (Form VII)', () => {
        expect(conjugateImperative(getVerb('كتب', 7))).toEqual({
          '1s': '',
          '2ms': 'اِنْكَتِبْ',
          '2fs': 'اِنْكَتِبِي',
          '2d': 'اِنْكَتِبَا',
          '2pm': 'اِنْكَتِبُوا',
          '2pf': 'اِنْكَتِبْنَ',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
          '1p': '',
        })
      })
    })
  })

  describe('assimilated verbs', () => {
    describe('و-ع-د', () => {
      test.todo('وَعَدَ (Form I)')
      test.todo('تَوَعَّدَ (Form V)')
    })
  })

  describe('hollow verbs', () => {
    describe('ق-و-ل', () => {
      test.todo('قَالَ (Form I)')
      test.todo('قَوَّلَ (Form II)')
      test.todo('قَاوَلَ (Form III)')
      test.todo('أَقَالَ (Form IV)')
    })
  })

  describe('defective verbs', () => {
    describe('ر-م-ي', () => {
      test.todo('رَمَى (Form I)')
      test.todo('رَمَّى (Form II)')
      test.todo('اِنْرَمَى (Form VIII)')
    })
  })

  describe('hamzated initial verbs', () => {
    describe.todo('أ-خ-ذ')
  })

  describe('hamzated middle verbs', () => {
    describe.todo('س-أ-ل')
  })

  describe('hamzated final verbs', () => {
    describe.todo('ق-ر-أ')
  })

  describe('doubly weak verbs', () => {
    describe.todo('و-ق-ي')
    describe.todo('و-ف-ي')
    describe.todo('ر-و-ي')
  })

  describe('hamzated initial defective verbs', () => {
    describe.todo('أ-ت-ي')
  })

  describe('hamzated middle assimilated verbs', () => {
    describe.todo('و-ئ-د')
  })

  describe('hamzated middle defective verbs', () => {
    describe.todo('ب-د-أ')
  })

  describe('hamzated final assimilated verbs', () => {
    describe.todo('و-أ-ى')
  })

  describe('hamzated final hollow verbs', () => {
    describe.todo('ج-ي-ء')
  })

  test('imperative only exists for second person pronouns', () => {
    fc.assert(
      fc.property(arbitraryVerb, (verb) => {
        const imperative = conjugateImperative(verb)

        expect(imperative).toMatchObject({
          '1s': '',
          '1p': '',
          '3ms': '',
          '3fs': '',
          '3dm': '',
          '3df': '',
          '3pm': '',
          '3pf': '',
        })
      }),
    )
  })

  it('it assimilates the initial wāw for ٱتَّصِلْ (Form VIII)', () => {
    const verb = verbs.find(({ root, form }) => root === 'وصل' && form === 8)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('اِتَّصِلْ')
  })

  it('geminate Form II imperative has kasra after shadda (e.g., حَبِّ)', () => {
    const verb = verbs.find(({ root, form }) => root === 'حبب' && form === 2)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('حَبِّ')
  })

  it('shortens hollow Form VII imperative like اِنْقَادَ → اِنْقَدْ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 7)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('اِنْقَدْ')
  })

  it('shortens hollow Form VIII imperative like اِقْتَادَ → اِقْتَدْ', () => {
    const verb = verbs.find(({ root, form }) => root === 'قود' && form === 8)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('اِقْتَدْ')
  })

  it.each([
    ['وقي', 1, 'قِ'],
    ['ولى', 1, 'لِ'],
    ['أنشأ', 4, 'أَنْشِئْ'],
    ['أتي', 1, 'ائْتِ'],
    ['أوي', 1, 'اِئْوِ'],
    ['أوي', 4, 'آوِ'],
    ['أوي', 5, 'تَأَوَّ'],
    ['أوي', 10, 'اِسْتَأْوِ'],
    ['غدو', 1, 'غْدا'],
    ['وعد', 1, 'عِدْ'],
    ['حمر', 9, 'اِحْمَرَّ'],
    ['جيء', 1, 'جِئْ'],
    ['مرض', 1, 'اِمْرَضْ'],
  ])('%s (%d) imperative 2ms is %s', (root, form, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const imperative = conjugateImperative(verb)
    expect(imperative['2ms']).toBe(expected)
  })

  describe('imperative stems from jussive', () => {
    test('for forms III-X without an initial hamza', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => form >= 3 && root[0] !== ALIF_HAMZA),
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
