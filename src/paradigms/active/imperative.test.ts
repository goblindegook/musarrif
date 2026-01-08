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
        expect(conjugateImperative(getVerb('كتب', 1))).toMatchObject({
          '2ms': 'اُكْتُبْ',
          '2fs': 'اُكْتُبِي',
          '2d': 'اُكْتُبَا',
          '2mp': 'اُكْتُبُوْا',
          '2fp': 'اُكْتُبْنَ',
        })
      })

      test('كَتَّبَ (Form II)', () => {
        expect(conjugateImperative(getVerb('كتب', 2))).toMatchObject({
          '2ms': 'كَتِّبْ',
          '2fs': 'كَتِّبِي',
          '2d': 'كَتِّبَا',
          '2mp': 'كَتِّبُوْا',
          '2fp': 'كَتِّبْنَ',
        })
      })

      test('كَاتَبَ (Form III)', () => {
        expect(conjugateImperative(getVerb('كتب', 3))).toMatchObject({
          '2ms': 'كَاتِبْ',
          '2fs': 'كَاتِبِي',
          '2d': 'كَاتِبَا',
          '2mp': 'كَاتِبُوْا',
          '2fp': 'كَاتِبْنَ',
        })
      })

      test('أَكْتَبَ (Form IV)', () => {
        expect(conjugateImperative(getVerb('كتب', 4))).toMatchObject({
          '2ms': 'أَكْتِبْ',
          '2fs': 'أَكْتِبِي',
          '2d': 'أَكْتِبَا',
          '2mp': 'أَكْتِبُوْا',
          '2fp': 'أَكْتِبْنَ',
        })
      })

      test('تَكَتَّبَ (Form V)', () => {
        expect(conjugateImperative(getVerb('كتب', 5))).toMatchObject({
          '2ms': 'تَكَتَّبْ',
          '2fs': 'تَكَتَّبِي',
          '2d': 'تَكَتَّبَا',
          '2mp': 'تَكَتَّبُوْا',
          '2fp': 'تَكَتَّبْنَ',
        })
      })

      test('تَكَاتَبَ (Form VI)', () => {
        expect(conjugateImperative(getVerb('كتب', 6))).toMatchObject({
          '2ms': 'تَكَاتَبْ',
          '2fs': 'تَكَاتَبِي',
          '2d': 'تَكَاتَبَا',
          '2mp': 'تَكَاتَبُوْا',
          '2fp': 'تَكَاتَبْنَ',
        })
      })

      test('اِنْكَتَبَ (Form VII)', () => {
        expect(conjugateImperative(getVerb('كتب', 7))).toMatchObject({
          '2ms': 'اِنْكَتِبْ',
          '2fs': 'اِنْكَتِبِي',
          '2d': 'اِنْكَتِبَا',
          '2mp': 'اِنْكَتِبُوْا',
          '2fp': 'اِنْكَتِبْنَ',
        })
      })
    })
  })

  describe('assimilated verbs', () => {
    describe('و-ع-د', () => {
      test('وَعَدَ (Form I)', () => {
        expect(conjugateImperative(getVerb('وعد', 1))).toMatchObject({
          '2ms': 'عِدْ',
          '2fs': 'عِدِي',
          '2d': 'عِدَا',
          '2mp': 'عِدُوْا',
          '2fp': 'عِدْنَ',
        })
      })

      test('تَوَعَّدَ (Form V)', () => {
        expect(conjugateImperative(getVerb('وعد', 5))).toMatchObject({
          '2ms': 'تَوَعَّدْ',
          '2fs': 'تَوَعَّدِي',
          '2d': 'تَوَعَّدَا',
          '2mp': 'تَوَعَّدُوْا',
          '2fp': 'تَوَعَّدْنَ',
        })
      })
    })
  })

  describe('hollow verbs', () => {
    describe('ك-ا-ن', () => {
      test('كَانَ (Form I)', () => {
        expect(conjugateImperative(getVerb('كان', 1))).toMatchObject({
          '2ms': 'كُنْ',
          '2fs': 'كُونِي',
          '2d': 'كُونَا',
          '2mp': 'كُونُوا',
          '2fp': 'كُنَّ',
        })
      })
    })

    describe('ق-و-ل', () => {
      test('قَالَ (Form I)', () => {
        expect(conjugateImperative(getVerb('قول', 1))).toMatchObject({
          '2ms': 'قُلْ',
          '2fs': 'قُولِي',
          '2d': 'قُولَا',
          '2mp': 'قُولُوْا',
          '2fp': 'قُلْنَ',
        })
      })

      test('قَوَّلَ (Form II)', () => {
        expect(conjugateImperative(getVerb('قول', 2))).toMatchObject({
          '2ms': 'قَوِّلْ',
          '2fs': 'قَوِّلِي',
          '2d': 'قَوِّلَا',
          '2mp': 'قَوِّلُوْا',
          '2fp': 'قَوِّلْنَ',
        })
      })

      test('قَاوَلَ (Form III)', () => {
        expect(conjugateImperative(getVerb('قول', 3))).toMatchObject({
          '2ms': 'قَاوِلْ',
          '2fs': 'قَاوِلِي',
          '2d': 'قَاوِلَا',
          '2mp': 'قَاوِلُوْا',
          '2fp': 'قَاوِلْنَ',
        })
      })

      test('تَقَوَّلَ (Form V)', () => {
        expect(conjugateImperative(getVerb('قول', 5))).toMatchObject({
          '2ms': 'تَقَوَّلْ',
          '2fs': 'تَقَوَّلِي',
          '2d': 'تَقَوَّلَا',
          '2mp': 'تَقَوَّلُوْا',
          '2fp': 'تَقَوَّلْنَ',
        })
      })
    })
  })

  describe('defective verbs', () => {
    describe('ر-م-ي', () => {
      test.todo('رَمَى (Form I)')
      test.todo('رَمَّى (Form II)')
      test.todo('اِنْرَمَى (Form VIII)')
    })
  })

  describe('hamzated initial verbs', () => {
    describe('أ-خ-ذ', () => {
      test('أَخَذَ (Form I)', () => {
        expect(conjugateImperative(getVerb('أخذ', 1))).toMatchObject({
          '2ms': 'خُذْ',
          '2fs': 'خُذِي',
          '2d': 'خُذَا',
          '2mp': 'خُذُوْا',
          '2fp': 'خُذْنَ',
        })
      })

      test('اِتَّخَذَ (Form VIII)', () => {
        expect(conjugateImperative(getVerb('أخذ', 8))).toMatchObject({
          '2ms': 'اِتَّخِذْ',
          '2fs': 'اِتَّخِذِي',
          '2d': 'اِتَّخِذَا',
          '2mp': 'اِتَّخِذُوْا',
          '2fp': 'اِتَّخِذْنَ',
        })
      })
    })
  })

  describe('hamzated middle verbs', () => {
    describe('س-أ-ل', () => {
      test('سَأَلَ (Form I)', () => {
        expect(conjugateImperative(getVerb('سأل', 1))).toMatchObject({
          '2ms': 'اِسْأَلْ',
          '2fs': 'اِسْأَلِي',
          '2d': 'اِسْأَلَا',
          '2mp': 'اِسْأَلُوْا',
          '2fp': 'اِسْأَلْنَ',
        })
      })

      test('سَاءَلَ (Form III)', () => {
        expect(conjugateImperative(getVerb('سأل', 3))).toMatchObject({
          '2ms': 'سَائِلْ',
          '2fs': 'سَائِلِي',
          '2d': 'سَائِلَا',
          '2mp': 'سَائِلُوْا',
          '2fp': 'سَائِلْنَ',
        })
      })

      test('تَسَاءَلَ (Form VI)', () => {
        expect(conjugateImperative(getVerb('سأل', 6))).toMatchObject({
          '2ms': 'تَسَاءَلْ',
          '2fs': 'تَسَاءَلِي',
          '2d': 'تَسَاءَلَا',
          '2mp': 'تَسَاءَلُوْا',
          '2fp': 'تَسَاءَلْنَ',
        })
      })

      test('اِسْتَسْأَلَ (Form X)', () => {
        expect(conjugateImperative(getVerb('سأل', 10))).toMatchObject({
          '2ms': 'اِسْتَسْئِلْ',
          '2fs': 'اِسْتَسْئِلِي',
          '2d': 'اِسْتَسْئِلَا',
          '2mp': 'اِسْتَسْئِلُوا',
          '2fp': 'اِسْتَسْئِلْنَ',
        })
      })
    })
  })

  describe('hamzated final verbs', () => {
    describe('ق-ر-أ', () => {
      test('قَرَأَ (Form I)', () => {
        expect(conjugateImperative(getVerb('قرأ', 1))).toMatchObject({
          '2ms': 'اِقْرَأْ',
          '2fs': 'اِقْرَئِي',
          '2d': 'اِقْرَآ',
          '2mp': 'اِقْرَأُوا',
          '2fp': 'اِقْرَأْنَ',
        })
      })

      test('اِسْتَقْرَأَ (Form X)', () => {
        expect(conjugateImperative(getVerb('قرأ', 10))).toMatchObject({
          '2ms': 'اِسْتَقْرِئْ',
          '2fs': 'اِسْتَقْرِئِي',
          '2d': 'اِسْتَقْرِئَا',
          '2mp': 'اِسْتَقْرِئُوا',
          '2fp': 'اِسْتَقْرِئْنَ',
        })
      })
    })
  })

  describe('doubly weak verbs', () => {
    describe('و-ف-ي', () => {
      test('وَفَى (Form I)', () => {
        expect(conjugateImperative(getVerb('وفي', 1))).toMatchObject({
          '2ms': 'فِ',
          '2fs': 'فِي',
          '2d': 'فِيَا',
          '2mp': 'فُوْا',
          '2fp': 'فِينَ',
        })
      })

      test('وَفَّى (Form II)', () => {
        expect(conjugateImperative(getVerb('وفي', 2))).toMatchObject({
          '2ms': 'وَفِّ',
          '2fs': 'وَفِّي',
          '2d': 'وَفِّيَا',
          '2mp': 'وَفُّوْا',
          '2fp': 'وَفِّينَ',
        })
      })

      test('وَافَى (Form III)', () => {
        expect(conjugateImperative(getVerb('وفي', 3))).toMatchObject({
          '2ms': 'وَافِ',
          '2fs': 'وَافِي',
          '2d': 'وَافِيَا',
          '2mp': 'وَافُوْا',
          '2fp': 'وَافِينَ',
        })
      })

      test('أَوْفَى (Form IV)', () => {
        expect(conjugateImperative(getVerb('وفي', 4))).toMatchObject({
          '2ms': 'أَوْفِ',
          '2fs': 'أَوْفِي',
          '2d': 'أَوْفِيَا',
          '2mp': 'أَوْفُوْا',
          '2fp': 'أَوْفِينَ',
        })
      })

      test('تَوَفَّى (Form V)', () => {
        expect(conjugateImperative(getVerb('وفي', 5))).toMatchObject({
          '2ms': 'تَوَفَّ',
          '2fs': 'تَوَفَّيْ',
          '2d': 'تَوَفَّيَا',
          '2mp': 'تَوَفَّوْا',
          '2fp': 'تَوَفَّيْنَ',
        })
      })

      test('اِسْتَوْفَى (Form X)', () => {
        expect(conjugateImperative(getVerb('وفي', 10))).toMatchObject({
          '2ms': 'اِسْتَوْفِ',
          '2fs': 'اِسْتَوْفِي',
          '2d': 'اِسْتَوْفِيَا',
          '2mp': 'اِسْتَوْفُوْا',
          '2fp': 'اِسْتَوْفِينَ',
        })
      })
    })

    describe.todo('ر-و-ي')
  })

  describe('geminate verbs', () => {
    describe('ح-م-م', () => {
      test('اِسْتَحَمَّ (Form X)', () => {
        expect(conjugateImperative(getVerb('حمم', 10))).toMatchObject({
          '2ms': 'اِسْتَحِمَّ',
          '2fs': 'اِسْتَحِمِّي',
          '2d': 'اِسْتَحِمَّا',
          '2mp': 'اِسْتَحِمُّوْا',
          '2fp': 'اِسْتَحْمِمْنَ',
        })
      })
    })
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
          '3md': '',
          '3fd': '',
          '3mp': '',
          '3fp': '',
        })
      }),
    )
  })

  it('it assimilates the initial wāw for ٱتَّصِلْ (Form VIII)', () => {
    const verb = verbs.find(({ root, form }) => root === 'وصل' && form === 8)!
    const imperative = conjugateImperative(verb)

    expect(imperative['2ms']).toBe('اِتَّصِلْ')
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
    ['حمر', 9, 'اِحْمَرَّ'],
    ['جيء', 1, 'جِئْ'],
    ['مرض', 1, 'اِمْرَضْ'],
    ['دخل', 1, 'اُدْخُلْ'],
    ['ولد', 1, 'لِدْ'],
    ['ذهب', 1, 'اِذْهَبْ'],
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
