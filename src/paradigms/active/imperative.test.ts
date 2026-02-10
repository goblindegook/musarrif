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
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'اِعْمَلْ'],
        ['ضمن', 'اِضْمَنْ'],
        ['ذكر', 'اُذْكُرْ'],
        ['حدث', 'اُحْدُثْ'],
        ['حضر', 'اُحْضُرْ'],
        ['جعل', 'اِجْعَلْ'],
        ['جمع', 'اِجْمَعْ'],
        ['مرض', 'اِمْرَضْ'],
        ['صبح', 'اِصْبَحْ'],
        ['مثل', 'اُمْثُلْ'],
        ['قدم', 'اُقْدُمْ'],
        ['نفس', 'اُنْفُسْ'],
        ['مكن', 'اُمْكُنْ'],
        ['بلغ', 'اُبْلُغْ'],
        ['دخل', 'اُدْخُلْ'],
        ['ذهب', 'اِذْهَبْ'],
        ['بعد', 'اِبْعَدْ'],
        ['دعم', 'اِدْعَمْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugateImperative(getVerb('كتب', 1))).toMatchObjectT({
          '2ms': 'اُكْتُبْ',
          '2fs': 'اُكْتُبِي',
          '2d': 'اُكْتُبَا',
          '2mp': 'اُكْتُبُوْا',
          '2fp': 'اُكْتُبْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugateImperative(getVerb('نظر', 1))).toMatchObjectT({
          '2ms': 'اُنْظُرْ',
          '2fs': 'اُنْظُرِي',
          '2d': 'اُنْظُرَا',
          '2mp': 'اُنْظُرُوْا',
          '2fp': 'اُنْظُرْنَ',
        })
      })

      test('imperative stems from jussive', () => {
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
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجز', 'جُزْ'],
        ['وطن', 'طِنْ'],
        ['وجب', 'جِبْ'],
        ['وصف', 'صِفْ'],
        ['وفد', 'فِدْ'],
        ['ولد', 'لِدْ'],
        ['وقف', 'قِفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugateImperative(getVerb('وقف', 1))).toMatchObjectT({
          '2ms': 'قِفْ',
          '2fs': 'قِفِي',
          '2d': 'قِفَا',
          '2mp': 'قِفُوْا',
          '2fp': 'قِفْنَ',
        })
      })

      test('وَعَدَ conjugation', () => {
        expect(conjugateImperative(getVerb('وعد', 1))).toMatchObjectT({
          '2ms': 'عِدْ',
          '2fs': 'عِدِي',
          '2d': 'عِدَا',
          '2mp': 'عِدُوْا',
          '2fp': 'عِدْنَ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugateImperative(getVerb('وضع', 1))).toMatchObjectT({
          '2ms': 'ضَعْ',
          '2fs': 'ضَعِي',
          '2d': 'ضَعَا',
          '2mp': 'ضَعُوْا',
          '2fp': 'ضَعْنَ',
        })
      })

      test('وَثُقَ conjugation', () => {
        expect(conjugateImperative(getVerb('وثق', 1))).toMatchObjectT({
          '2ms': 'ثُقْ',
          '2fs': 'ثُقِي',
          '2d': 'ثُقَا',
          '2mp': 'ثُقُوْا',
          '2fp': 'ثُقْنَ',
        })
      })

      test('وَهُنَ conjugation', () => {
        expect(conjugateImperative(getVerb('وهن', 1))).toMatchObjectT({
          '2ms': 'اُوهُنْ',
          '2fs': 'اُوهُنِي',
          '2d': 'اُوهُنَا',
          '2mp': 'اُوهُنُوْا',
          '2fp': 'اُوهُنَّ',
        })
      })

      test('يَبِسَ conjugation', () => {
        expect(conjugateImperative(getVerb('يبس', 1))).toMatchObjectT({
          '2ms': 'اِيبَسْ',
          '2fs': 'اِيبَسِي',
          '2d': 'اِيبَسَا',
          '2mp': 'اِيبَسُوْا',
          '2fp': 'اِيبَسْنَ',
        })
      })

      test('يَسُرَ conjugation', () => {
        expect(conjugateImperative(getVerb('يسر', 1))).toMatchObjectT({
          '2ms': 'اُوسُرْ',
          '2fs': 'اُوسُرِي',
          '2d': 'اُوسُرَا',
          '2mp': 'اُوسُرُوْا',
          '2fp': 'اُوسُرْنَ',
        })
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugateImperative(getVerb('يمن', 1))).toMatchObjectT({
          '2ms': 'اِيمَنْ',
          '2fs': 'اِيمَنِي',
          '2d': 'اِيمَنَا',
          '2mp': 'اِيمَنُوْا',
          '2fp': 'اِيمَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عوم', 'عُمْ'],
        ['حول', 'حُلْ'],
        ['لوم', 'لُمْ'],
        ['بيت', 'بِتْ'],
        ['صير', 'صِرْ'],
        ['خور', 'اِخْوَرْ'],
        ['خوف', 'خَفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugateImperative(getVerb('عوز', 1))).toMatchObjectT({
          '2ms': 'اِعْوَزْ',
          '2fs': 'اِعْوَزِي',
          '2d': 'اِعْوَزَا',
          '2mp': 'اِعْوَزُوْا',
          '2fp': 'اِعْوَزْنَ',
        })
      })

      test('كَانَ conjugation', () => {
        expect(conjugateImperative(getVerb('كان', 1))).toMatchObjectT({
          '2ms': 'كُنْ',
          '2fs': 'كُونِي',
          '2d': 'كُونَا',
          '2mp': 'كُونُوْا',
          '2fp': 'كُنَّ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugateImperative(getVerb('جيد', 1))).toMatchObjectT({
          '2ms': 'اِجْيَدْ',
          '2fs': 'اِجْيَدِي',
          '2d': 'اِجْيَدَا',
          '2mp': 'اِجْيَدُوْا',
          '2fp': 'اِجْيَدْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugateImperative(getVerb('زور', 1))).toMatchObjectT({
          '2ms': 'زُرْ',
          '2fs': 'زُورِي',
          '2d': 'زُورَا',
          '2mp': 'زُورُوْا',
          '2fp': 'زُرْنَ',
        })
      })

      test('دَعَا conjugation', () => {
        expect(conjugateImperative(getVerb('دعا', 1))).toMatchObjectT({
          '2ms': 'اُدْعُ',
          '2fs': 'اُدْعِي',
          '2d': 'اُدْعُوْا',
          '2mp': 'اُدْعُوْا',
          '2fp': 'اُدْعُونَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugateImperative(getVerb('باع', 1))).toMatchObjectT({
          '2ms': 'بِعْ',
          '2fs': 'بِيعِي',
          '2d': 'بِيعَا',
          '2mp': 'بِيعُوْا',
          '2fp': 'بِعْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugateImperative(getVerb('شيد', 1))).toMatchObjectT({
          '2ms': 'شِدْ',
          '2fs': 'شِيدِي',
          '2d': 'شِيدَا',
          '2mp': 'شِيدُوْا',
          '2fp': 'شِدْنَ',
        })
      })

      test('قَالَ conjugation', () => {
        expect(conjugateImperative(getVerb('قول', 1))).toMatchObjectT({
          '2ms': 'قُلْ',
          '2fs': 'قُولِي',
          '2d': 'قُولَا',
          '2mp': 'قُولُوْا',
          '2fp': 'قُلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'اِغْشِ'],
        ['بكي', 'اِبْكِ'],
        ['بدو', 'اُبْدُ'],
        ['علي', 'اِعْلِ'],
        ['جدو', 'اُجْدُ'],
        ['لهو', 'اُلْهُ'],
        ['شفي', 'اِشْفِ'],
        ['جري', 'اِجْرِ'],
        ['غدو', 'اِغْدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      // Verified against Wiktionary's conjugation table for بَقِيَ (Form I, final-weak i~a).
      test('بَقِيَ conjugation', () => {
        expect(conjugateImperative(getVerb('بقي', 1))).toMatchObjectT({
          '2ms': 'اِبْقَ',
          '2fs': 'اِبْقَيْ',
          '2d': 'اِبْقَيَا',
          '2mp': 'اِبْقَوْا',
          '2fp': 'اِبْقَيْنَ',
        })
      })

      test('تَحَا conjugation', () => {
        expect(conjugateImperative(getVerb('تحو', 1))).toMatchObjectT({
          '2ms': 'اِتْحُ',
          '2fs': 'اِتْحَيْ',
          '2d': 'تْحَيَا',
          '2mp': 'تْحَوْا',
          '2fp': 'اِتْحَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'قِ'],
        ['ولى', 'لِ'],
        ['ونى', 'نِ'],
        ['ولي', 'لِ'],
        ['وعي', 'عِ'],
        ['قوي', 'اِقْوَ'],
        ['جوي', 'اِجْوَ'],
        ['روى', 'اِرْوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('وَفَى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 1))).toMatchObjectT({
          '2ms': 'فِ',
          '2fs': 'فِي',
          '2d': 'فِيَا',
          '2mp': 'فُوْا',
          '2fp': 'فِينَ',
        })
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugateImperative(getVerb('روي', 1))).toMatchObjectT({
          '2ms': 'اِرْوِ',
          '2fs': 'اِرْوِي',
          '2d': 'اِرْوِيَا',
          '2mp': 'اِرْوُوْا',
          '2fp': 'اِرْوِينَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'تِمَّ'],
        ['هلل', 'هُلَّ'],
        ['جبب', 'جُبَّ'],
        ['عنن', 'عِنَّ'],
        ['أجج', 'أُجَّ'],
        ['أزز', 'أُزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('قَرَّ conjugation', () => {
        expect(conjugateImperative(getVerb('قرر', 1))).toMatchObjectT({
          '2ms': 'قَرَّ',
          '2fs': 'قَرِّي',
          '2d': 'قَرَّا',
          '2mp': 'قَرُّوْا',
          '2fp': 'اِقْرَرْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugateImperative(getVerb('أمم', 1))).toMatchObjectT({
          '2ms': 'أُمَّ',
          '2fs': 'أُمِّي',
          '2d': 'أُمَّا',
          '2mp': 'أُمُّوْا',
          '2fp': 'اُومُمْنَ',
        })
      })

      test('أَدَّ conjugation', () => {
        expect(conjugateImperative(getVerb('أدد', 1))).toMatchObjectT({
          '2ms': 'إِدَّ',
          '2fs': 'إِدِّي',
          '2d': 'إِدَّا',
          '2mp': 'إِدُّوْا',
          '2fp': 'اِيدِدْنَ',
        })
      })

      test('أَزَّ conjugation', () => {
        expect(conjugateImperative(getVerb('أزز', 1))).toMatchObjectT({
          '2ms': 'أُزَّ',
          '2fs': 'أُزِّي',
          '2d': 'أُزَّا',
          '2mp': 'أُزُّوْا',
          '2fp': 'اُوزُزْنَ',
        })
      })

      test('حَبَّ conjugation', () => {
        expect(conjugateImperative(getVerb('حبب', 1))).toMatchObjectT({
          '2ms': 'حِبَّ',
          '2fs': 'حِبِّي',
          '2d': 'حِبَّا',
          '2mp': 'حِبُّوْا',
          '2fp': 'اِحْبِبْنَ',
        })
      })

      test('ظَلَّ conjugation', () => {
        expect(conjugateImperative(getVerb('ظلل', 1))).toMatchObjectT({
          '2ms': 'ظَلَّ',
          '2fs': 'ظَلِّي',
          '2d': 'ظَلَّا',
          '2mp': 'ظَلُّوْا',
          '2fp': 'اِظْلَلْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugateImperative(getVerb('ودد', 1))).toMatchObjectT({
          '2ms': 'وَدَّ',
          '2fs': 'وَدِّي',
          '2d': 'وَدَّا',
          '2mp': 'وَدُّوْا',
          '2fp': 'اِيدَدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أمر', 'مُرْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugateImperative(getVerb('أخذ', 1))).toMatchObjectT({
          '2ms': 'خُذْ',
          '2fs': 'خُذِي',
          '2d': 'خُذَا',
          '2mp': 'خُذُوْا',
          '2fp': 'خُذْنَ',
        })
      })

      test('أَسَرَ conjugation', () => {
        expect(conjugateImperative(getVerb('أسر', 1))).toMatchObjectT({
          '2ms': 'اِيسِرْ',
          '2fs': 'اِيسِرِي',
          '2d': 'اِيسِرَا',
          '2mp': 'اِيسِرُوْا',
          '2fp': 'اِيسِرْنَ',
        })
      })

      test('أَذِنَ conjugation', () => {
        expect(conjugateImperative(getVerb('أذن', 1))).toMatchObjectT({
          '2ms': 'اِيذَنْ',
          '2fs': 'اِيذَنِي',
          '2d': 'اِيذَنَا',
          '2mp': 'اِيذَنُوْا',
          '2fp': 'اِيذَنَّ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'أُلْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('أُلْ conjugation', () => {
        expect(conjugateImperative(getVerb('أول', 1))).toMatchObjectT({
          '2ms': 'أُلْ',
          '2fs': 'أُولِي',
          '2d': 'أُولَا',
          '2mp': 'أُولُوْا',
          '2fp': 'أُلْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test('أَنَى conjugation', () => {
        expect(conjugateImperative(getVerb('أني', 1))).toMatchObjectT({
          '2ms': 'اِئْنَ',
          '2fs': 'اِئْنَيْ',
          '2d': 'اِئْنَيَا',
          '2mp': 'اِئْنَوْا',
          '2fp': 'اِئْنَيْنَ',
        })
      })

      test('أَبَى conjugation', () => {
        expect(conjugateImperative(getVerb('أبي', 1))).toMatchObjectT({
          '2ms': 'اِئْبَ',
          '2fs': 'اِئْبَيْ',
          '2d': 'اِئْبَيَا',
          '2mp': 'اِئْبَوْا',
          '2fp': 'اِئْبَيْنَ',
        })
      })

      test('أَتَى conjugation', () => {
        expect(conjugateImperative(getVerb('أتي', 1))).toMatchObjectT({
          '2ms': 'اِئْتِ',
          '2fs': 'اِئْتِيْ',
          '2d': 'اِئْتِيَا',
          '2mp': 'اِئْتُوْا',
          '2fp': 'اِئْتِيْنَ',
        })
      })
    })

    describe('hamzated initial hollow-defective roots', () => {
      test.each([['أوي', 'اِيوِ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugateImperative(getVerb('أوي', 1))).toMatchObjectT({
          '2ms': 'اِيوِ',
          '2fs': 'اِيوِي',
          '2d': 'اِيوِيَا',
          '2mp': 'اِيوُوْا',
          '2fp': 'اِيوِينَ',
        })
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([
        ['جيء', 'جِئْ'],
        ['نوء', 'نُؤْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('بوء conjugation', () => {
        expect(conjugateImperative(getVerb('بوء', 1))).toMatchObjectT({
          '2ms': 'بُؤْ',
          '2fs': 'بُوئِي',
          '2d': 'بُوءَا',
          '2mp': 'بُوئُوْا',
          '2fp': 'بُؤْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['بءس', 'اُبْؤُسْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('يَئِسَ conjugation', () => {
        expect(conjugateImperative(getVerb('يئس', 1))).toMatchObjectT({
          '2ms': 'اِيئَسْ',
          '2fs': 'اِيئَسِي',
          '2d': 'اِيئَسَا',
          '2mp': 'اِيئَسُوْا',
          '2fp': 'اِيئَسْنَ',
        })
      })

      test('سَأَلَ conjugation', () => {
        expect(conjugateImperative(getVerb('سأل', 1))).toMatchObjectT({
          '2ms': 'اِسْأَلْ',
          '2fs': 'اِسْأَلِي',
          '2d': 'اِسْأَلَا',
          '2mp': 'اِسْأَلُوْا',
          '2fp': 'اِسْأَلْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رأى', 'رَ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugateImperative(getVerb('رأى', 1))).toMatchObjectT({
          '2ms': 'رَ',
          '2fs': 'رَيْ',
          '2d': 'رَيَا',
          '2mp': 'رَوْا',
          '2fp': 'رَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['جرء', 'اُجْرُؤْ'],
        ['كلأ', 'اُكْلُؤْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 1))['2ms']).toEqualT(expected)
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugateImperative(getVerb('بدأ', 1))).toMatchObjectT({
          '2ms': 'اِبْدَأْ',
          '2fs': 'اِبْدَئِي',
          '2d': 'اِبْدَآ',
          '2mp': 'اِبْدَأُوْا',
          '2fp': 'اِبْدَأْنَ',
        })
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugateImperative(getVerb('قرأ', 1))).toMatchObjectT({
          '2ms': 'اِقْرَأْ',
          '2fs': 'اِقْرَئِي',
          '2d': 'اِقْرَآ',
          '2mp': 'اِقْرَأُوْا',
          '2fp': 'اِقْرَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugateImperative(getVerb('كلأ', 1))).toMatchObjectT({
          '2ms': 'اُكْلُؤْ',
          '2fs': 'اُكْلُئِي',
          '2d': 'اُكْلُؤَا',
          '2mp': 'اُكْلُؤُوْا',
          '2fp': 'اُكْلُؤْنَ',
        })
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugateImperative(getVerb('وطء', 1))).toMatchObjectT({
          '2ms': 'طَأْ',
          '2fs': 'طَئِي',
          '2d': 'طَآ',
          '2mp': 'طَأُوْا',
          '2fp': 'طَأْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugateImperative(getVerb('وأى', 1))).toMatchObjectT({
          '2ms': 'ئِ',
          '2fs': 'ئِي',
          '2d': 'ئِيَا',
          '2mp': 'أُوْا',
          '2fp': 'ئِينَ',
        })
      })
    })

    describe('all root types', () => {
      test('imperative only exists for second person pronouns', () => {
        fc.assert(
          fc.property(
            arbitraryVerb.filter(({ form }) => form === 1),
            (verb) => {
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
            },
          ),
        )
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      describe('pattern tests', () => {
        test.each([
          ['عمل', 'عَمِّلْ'],
          ['ضمن', 'ضَمِّنْ'],
          ['صبح', 'صَبِّحْ'],
          ['ذكر', 'ذَكِّرْ'],
          ['جمع', 'جَمِّعْ'],
          ['مكن', 'مَكِّنْ'],
          ['مثل', 'مَثِّلْ'],
          ['سبب', 'سَبِّبْ'],
          ['خطط', 'خَطِّطْ'],
        ])('%s pattern', (root, expected) => {
          expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
        })
      })

      describe('full conjugation tests', () => {
        test('كَتَّبَ', () => {
          expect(conjugateImperative(getVerb('كتب', 2))).toMatchObjectT({
            '2ms': 'كَتِّبْ',
            '2fs': 'كَتِّبِي',
            '2d': 'كَتِّبَا',
            '2mp': 'كَتِّبُوْا',
            '2fp': 'كَتِّبْنَ',
          })
        })
      })

      test('imperative stems from jussive for non-geminated Form II', () => {
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

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'وَطِّنْ'],
        ['وجه', 'وَجِّهْ'],
        ['وقف', 'وَقِّفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })

      test('وَسِّطْ conjugation', () => {
        expect(conjugateImperative(getVerb('وسط', 2))).toMatchObjectT({
          '2ms': 'وَسِّطْ',
          '2fs': 'وَسِّطِي',
          '2d': 'وَسِّطَا',
          '2mp': 'وَسِّطُوْا',
          '2fp': 'وَسِّطْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حدد', 'حَدِّدْ'],
        ['قرر', 'قَرِّرْ'],
        ['شدد', 'شَدِّدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })

      test('حَبَّبَ conjugation', () => {
        expect(conjugateImperative(getVerb('حبب', 2))).toMatchObjectT({
          '2ms': 'حَبِّبْ',
          '2fs': 'حَبِّبِي',
          '2d': 'حَبِّبَا',
          '2mp': 'حَبِّبُوْا',
          '2fp': 'حَبِّبْنَ',
        })
      })

      it('geminate Form II imperative has kasra after shadda (e.g., حَبِّبْ)', () => {
        const imperative = conjugateImperative(getVerb('حبب', 2))

        expect(imperative['2ms']).toBe('حَبِّبْ')
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'قَوِّسْ'],
        ['كون', 'كَوِّنْ'],
        ['دون', 'دَوِّنْ'],
        ['سوف', 'سَوِّفْ'],
        ['كيف', 'كَيِّفْ'],
        ['أول', 'أَوِّلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'وَفِّ'],
        ['وصي', 'وَصِّ'],
        ['ولي', 'وَلِّ'],
        ['وري', 'وَرِّ'],
        ['مني', 'مَنِّ'],
        ['سمي', 'سَمِّ'],
        ['غطي', 'غَطِّ'],
        ['غني', 'غَنِّ'],
        ['قوي', 'قَوِّ'],
        ['زوي', 'زَوِّ'],
        ['هوي', 'هَوِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })

      test('وَفَّى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 2))).toMatchObjectT({
          '2ms': 'وَفِّ',
          '2fs': 'وَفِّي',
          '2d': 'وَفِّيَا',
          '2mp': 'وَفُّوْا',
          '2fp': 'وَفِّينَ',
        })
      })

      test('حَيَّى conjugation', () => {
        expect(conjugateImperative(getVerb('حيي', 2))).toMatchObjectT({
          '2ms': 'حَيِّ',
          '2fs': 'حَيِّي',
          '2d': 'حَيِّيَا',
          '2mp': 'حَيُّوْا',
          '2fp': 'حَيِّينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أكد', 'أَكِّدْ'],
        ['أجج', 'أَجِّجْ'],
        ['أسس', 'أَسِّسْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })

      test('أَثَّرَ conjugation', () => {
        expect(conjugateImperative(getVerb('أثر', 2))).toMatchObjectT({
          '2ms': 'أَثِّرْ',
          '2fs': 'أَثِّرِي',
          '2d': 'أَثِّرَا',
          '2mp': 'أَثِّرُوْا',
          '2fp': 'أَثِّرْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أوب', 'أَوِّبْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })

      test('أَيَّدَ conjugation', () => {
        expect(conjugateImperative(getVerb('أيد', 2))).toMatchObjectT({
          '2ms': 'أَيِّدْ',
          '2fs': 'أَيِّدِي',
          '2d': 'أَيِّدَا',
          '2mp': 'أَيِّدُوْا',
          '2fp': 'أَيِّدْنَ',
        })
      })

      test('أَوَّدَ conjugation', () => {
        expect(conjugateImperative(getVerb('أود', 2))).toMatchObjectT({
          '2ms': 'أَوِّدْ',
          '2fs': 'أَوِّدِي',
          '2d': 'أَوِّدَا',
          '2mp': 'أَوِّدُوْا',
          '2fp': 'أَوِّدْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'أَذِّ'],
        ['أسي', 'أَسِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'هَنِّئْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'أَخِّرْ'],
        ['أمر', 'أَمِّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَطِّئْ conjugation', () => {
        expect(conjugateImperative(getVerb('وطء', 2))).toMatchObjectT({
          '2ms': 'وَطِّئْ',
          '2fs': 'وَطِّئِي',
          '2d': 'وَطِّئَا',
          '2mp': 'وَطِّئُوْا',
          '2fp': 'وَطِّئْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['يود', 'يَوِّدْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 2))['2ms']).toEqualT(expected)
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'عَامِلْ'],
        ['تبع', 'تَابِعْ'],
        ['بلغ', 'بَالِغْ'],
        ['سعد', 'سَاعِدْ'],
        ['صحب', 'صَاحِبْ'],
        ['وجه', 'وَاجِهْ'],
        ['وثق', 'وَاثِقْ'],
        ['وعد', 'وَاعِدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('كَاتَبَ conjugation', () => {
        expect(conjugateImperative(getVerb('كتب', 3))).toMatchObjectT({
          '2ms': 'كَاتِبْ',
          '2fs': 'كَاتِبِي',
          '2d': 'كَاتِبَا',
          '2mp': 'كَاتِبُوْا',
          '2fp': 'كَاتِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'سَارَّ'],
        ['ردد', 'رَادَّ'],
        ['مدد', 'مَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugateImperative(getVerb('سرر', 3))).toMatchObjectT({
          '2ms': 'سَارَّ',
          '2fs': 'سَارِّي',
          '2d': 'سَارَّا',
          '2mp': 'سَارُّوْا',
          '2fp': 'سَارِرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugateImperative(getVerb('ردد', 3))).toMatchObjectT({
          '2ms': 'رَادَّ',
          '2fs': 'رَادِّي',
          '2d': 'رَادَّا',
          '2mp': 'رَادُّوْا',
          '2fp': 'رَادِدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugateImperative(getVerb('مدد', 3))).toMatchObjectT({
          '2ms': 'مَادَّ',
          '2fs': 'مَادِّي',
          '2d': 'مَادَّا',
          '2mp': 'مَادُّوْا',
          '2fp': 'مَادِدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوم', 'قَاوِمْ'],
        ['عود', 'عَاوِدْ'],
        ['جوز', 'جَاوِزْ'],
        ['نول', 'نَاوِلْ'],
        ['ضيق', 'ضَايِقْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('قَاوَلَ conjugation', () => {
        expect(conjugateImperative(getVerb('قول', 3))).toMatchObjectT({
          '2ms': 'قَاوِلْ',
          '2fs': 'قَاوِلِي',
          '2d': 'قَاوِلَا',
          '2mp': 'قَاوِلُوْا',
          '2fp': 'قَاوِلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'وَازِ'],
        ['وسي', 'وَاسِ'],
        ['نوي', 'نَاوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('وَافَى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 3))).toMatchObjectT({
          '2ms': 'وَافِ',
          '2fs': 'وَافِي',
          '2d': 'وَافِيَا',
          '2mp': 'وَافُوْا',
          '2fp': 'وَافِينَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'نَادِ'],
        ['رعي', 'رَاعِ'],
        ['بلي', 'بَالِ'],
        ['قضي', 'قَاضِ'],
        ['بري', 'بَارِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'آخِذْ'],
        ['أجر', 'آجِرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugateImperative(getVerb('أخذ', 3))).toMatchObjectT({
          '2ms': 'آخِذْ',
          '2fs': 'آخِذِي',
          '2d': 'آخِذَا',
          '2mp': 'آخِذُوْا',
          '2fp': 'آخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugateImperative(getVerb('أجر', 3))).toMatchObjectT({
          '2ms': 'آجِرْ',
          '2fs': 'آجِرِي',
          '2d': 'آجِرَا',
          '2mp': 'آجِرُوْا',
          '2fp': 'آجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['وأم', 'وَائِمْ'],
        ['لأم', 'لَائِمْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('سَاءَلَ', () => {
        expect(conjugateImperative(getVerb('سأل', 3))).toMatchObjectT({
          '2ms': 'سَائِلْ',
          '2fs': 'سَائِلِي',
          '2d': 'سَائِلَا',
          '2mp': 'سَائِلُوْا',
          '2fp': 'سَائِلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'فَاجِئْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 3))['2ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugateImperative(getVerb('فجأ', 3))).toMatchObjectT({
          '2ms': 'فَاجِئْ',
          '2fs': 'فَاجِئِي',
          '2d': 'فَاجِئَا',
          '2mp': 'فَاجِئُوْا',
          '2fp': 'فَاجِئْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'أَكْثِرْ'],
        ['علم', 'أَعْلِمْ'],
        ['لحق', 'أَلْحِقْ'],
        ['مكن', 'أَمْكِنْ'],
        ['صبح', 'أَصْبِحْ'],
        ['عرب', 'أَعْرِبْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })

      describe('full conjugation tests', () => {
        test('أَكْتَبَ conjugation', () => {
          expect(conjugateImperative(getVerb('كتب', 4))).toMatchObjectT({
            '2ms': 'أَكْتِبْ',
            '2fs': 'أَكْتِبِي',
            '2d': 'أَكْتِبَا',
            '2mp': 'أَكْتِبُوْا',
            '2fp': 'أَكْتِبْنَ',
          })
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عطى', 'أَعْطِ'],
        ['ضحي', 'أَضْحِ'],
        ['مسي', 'أَمْسِ'],
      ])('drops the final glide for %s', (root, expected2ms) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toBe(expected2ms)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'أَوْمِئْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'أَضِئْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test('آتَى conjugation', () => {
        expect(conjugateImperative(getVerb('أتي', 4))).toMatchObjectT({
          '2ms': 'آتِ',
          '2fs': 'آتِي',
          '2d': 'آتِيَا',
          '2mp': 'آتُوْا',
          '2fp': 'آتِينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'أَوْصِ'],
        ['وحي', 'أَوْحِ'],
        ['وفي', 'أَوْفِ'],
        ['وري', 'أَوْرِ'],
        ['ودي', 'أَوْدِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugateImperative(getVerb('حيي', 4))).toMatchObjectT({
          '2ms': 'أَحْيِ',
          '2fs': 'أَحْيِي',
          '2d': 'أَحْيِيَا',
          '2mp': 'أَحْيُوْا',
          '2fp': 'أَحْيِينَ',
        })
      })

      test('أَوْفَى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 4))).toMatchObjectT({
          '2ms': 'أَوْفِ',
          '2fs': 'أَوْفِي',
          '2d': 'أَوْفِيَا',
          '2mp': 'أَوْفُوْا',
          '2fp': 'أَوْفِينَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('أَحَبَّ conjugation', () => {
        expect(conjugateImperative(getVerb('حبب', 4))).toMatchObjectT({
          '2ms': 'أَحِبَّ',
          '2fs': 'أَحِبِّي',
          '2d': 'أَحِبَّا',
          '2mp': 'أَحِبُّوْا',
          '2fp': 'أَحْبِبْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['أنشأ', 'أَنْشِئْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow-defective roots', () => {
      test.each([['أوي', 'آوِ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 4))['2ms']).toEqualT(expected)
      })
    })

    test('all conjugations begin with alif hamza or alif madda', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ form }) => form === 4),
          arbitraryPronoun,
          (verb, pronounId) => {
            expect([ALIF_HAMZA, ALIF_MADDA].includes(conjugateImperative(verb)[pronounId][0])).toBe(true)
          },
        ),
      )
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['جمع', 'تَجَمَّعْ'],
        ['ضمن', 'تَضَمَّنْ'],
        ['طلب', 'تَطَلَّبْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 5))['2ms']).toEqualT(expected)
      })

      test('تَكَتَّبَ conjugation', () => {
        expect(conjugateImperative(getVerb('كتب', 5))).toMatchObjectT({
          '2ms': 'تَكَتَّبْ',
          '2fs': 'تَكَتَّبِي',
          '2d': 'تَكَتَّبَا',
          '2mp': 'تَكَتَّبُوْا',
          '2fp': 'تَكَتَّبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'تَحَبَّبْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 5))['2ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test('تَوَعَّدَ conjugation', () => {
        expect(conjugateImperative(getVerb('وعد', 5))).toMatchObjectT({
          '2ms': 'تَوَعَّدْ',
          '2fs': 'تَوَعَّدِي',
          '2d': 'تَوَعَّدَا',
          '2mp': 'تَوَعَّدُوْا',
          '2fp': 'تَوَعَّدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['حول', 'تَحَوَّلْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 5))['2ms']).toEqualT(expected)
      })

      describe('full conjugation tests', () => {
        test('تَقَوَّلَ conjugation', () => {
          expect(conjugateImperative(getVerb('قول', 5))).toMatchObjectT({
            '2ms': 'تَقَوَّلْ',
            '2fs': 'تَقَوَّلِي',
            '2d': 'تَقَوَّلَا',
            '2mp': 'تَقَوَّلُوْا',
            '2fp': 'تَقَوَّلْنَ',
          })
        })
      })
    })

    describe('doubly weak roots', () => {
      test('تَوَفَّى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 5))).toMatchObjectT({
          '2ms': 'تَوَفَّ',
          '2fs': 'تَوَفَّيْ',
          '2d': 'تَوَفَّيَا',
          '2mp': 'تَوَفَّوْا',
          '2fp': 'تَوَفَّيْنَ',
        })
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test('تَكَاتَبَ conjugation', () => {
        expect(conjugateImperative(getVerb('كتب', 6))).toMatchObjectT({
          '2ms': 'تَكَاتَبْ',
          '2fs': 'تَكَاتَبِي',
          '2d': 'تَكَاتَبَا',
          '2mp': 'تَكَاتَبُوْا',
          '2fp': 'تَكَاتَبْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test('تَسَاءَلَ conjugation', () => {
        expect(conjugateImperative(getVerb('سأل', 6))).toMatchObjectT({
          '2ms': 'تَسَاءَلْ',
          '2fs': 'تَسَاءَلِي',
          '2d': 'تَسَاءَلَا',
          '2mp': 'تَسَاءَلُوْا',
          '2fp': 'تَسَاءَلْنَ',
        })
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test('اِنْكَتَبَ conjugation', () => {
        expect(conjugateImperative(getVerb('كتب', 7))).toMatchObjectT({
          '2ms': 'اِنْكَتِبْ',
          '2fs': 'اِنْكَتِبِي',
          '2d': 'اِنْكَتِبَا',
          '2mp': 'اِنْكَتِبُوْا',
          '2fp': 'اِنْكَتِبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      it('shortens hollow Form VII imperative like اِنْقَادَ → اِنْقَدْ', () => {
        const imperative = conjugateImperative(getVerb('قود', 7))

        expect(imperative['2ms']).toBe('اِنْقَدْ')
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([['قرح', 'اِقْتَرِحْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 8))['2ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      it('assimilates the initial wāw for ٱتَّصِلْ', () => {
        const imperative = conjugateImperative(getVerb('وصل', 8))

        expect(imperative['2ms']).toBe('اِتَّصِلْ')
      })
    })

    describe('hollow roots', () => {
      it('shortens hollow like اِقْتَادَ → اِقْتَدْ', () => {
        const imperative = conjugateImperative(getVerb('قود', 8))

        expect(imperative['2ms']).toBe('اِقْتَدْ')
      })
    })

    describe('hamzated initial roots', () => {
      test('اِتَّخَذَ conjugation', () => {
        expect(conjugateImperative(getVerb('أخذ', 8))).toMatchObjectT({
          '2ms': 'اِتَّخِذْ',
          '2fs': 'اِتَّخِذِي',
          '2d': 'اِتَّخِذَا',
          '2mp': 'اِتَّخِذُوْا',
          '2fp': 'اِتَّخِذْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([['حمر', 'اِحْمَرَّ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 9))['2ms']).toEqualT(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([['عمل', 'اِسْتَعْمِلْ']])('%s pattern', (root, expected) => {
        expect(conjugateImperative(getVerb(root, 10))['2ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَوْفَى conjugation', () => {
        expect(conjugateImperative(getVerb('وفي', 10))).toMatchObjectT({
          '2ms': 'اِسْتَوْفِ',
          '2fs': 'اِسْتَوْفِي',
          '2d': 'اِسْتَوْفِيَا',
          '2mp': 'اِسْتَوْفُوْا',
          '2fp': 'اِسْتَوْفِينَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('اِسْتَحَمَّ conjugation', () => {
        expect(conjugateImperative(getVerb('حمم', 10))).toMatchObjectT({
          '2ms': 'اِسْتَحِمَّ',
          '2fs': 'اِسْتَحِمِّي',
          '2d': 'اِسْتَحِمَّا',
          '2mp': 'اِسْتَحِمُّوْا',
          '2fp': 'اِسْتَحْمِمْنَ',
        })
      })

      test('اِسْتَحَبَّ conjugation', () => {
        expect(conjugateImperative(getVerb('حبب', 10))).toMatchObjectT({
          '2ms': 'اِسْتَحِبَّ',
          '2fs': 'اِسْتَحِبِّي',
          '2d': 'اِسْتَحِبَّا',
          '2mp': 'اِسْتَحِبُّوْا',
          '2fp': 'اِسْتَحْبِبْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugateImperative(getVerb('قرأ', 10))).toMatchObjectT({
          '2ms': 'اِسْتَقْرِئْ',
          '2fs': 'اِسْتَقْرِئِي',
          '2d': 'اِسْتَقْرِئَا',
          '2mp': 'اِسْتَقْرِئُوْا',
          '2fp': 'اِسْتَقْرِئْنَ',
        })
      })
    })
  })

  test('stems from jussive for non-hamzated roots', () => {
    fc.assert(
      fc.property(
        arbitraryVerb.filter(({ root }) => root[0] !== ALIF_HAMZA),
        arbitraryPronoun,
        (verb, pronounId) => {
          const jussive = conjugatePresentMood(verb, 'jussive')
          const imperative = conjugateImperative(verb)

          expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
        },
      ),
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
