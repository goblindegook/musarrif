import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getAvailableParadigms, getVerb, verbs } from '../verbs'
import { conjugatePassivePast } from './past'

describe('passive past pattern', () => {
  test('impersonal passive only conjugates 3ms in past', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...verbs.filter(
            (verb) => verb.passiveVoice === 'impersonal' && getAvailableParadigms(verb).includes('passive.past'),
          ),
        ),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePast(verb)[pronounId]).toEqualT('')
        },
      ),
    )
  })

  describe('Form I', () => {
    describe('regular roots', () => {
      test.each<[string, string]>([
        ['بلغ', 'بُلِغَ'],
        ['زرق', 'زُرِقَ'],
        ['زعم', 'زُعِمَ'],
        ['برح', 'بُرِحَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow-defective roots', () => {
      test.each<[string, string]>([['ءوي', 'أُوِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each<[string, string]>([['ءول', 'إِيلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('إِيلَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءول', 1))).toEqualT({
          '1s': 'إِلْتُ',
          '2ms': 'إِلْتَ',
          '2fs': 'إِلْتِ',
          '3ms': 'إِيلَ',
          '3fs': 'إِيلَتْ',
          '2d': 'إِلْتُمَا',
          '3md': 'إِيلَا',
          '3fd': 'إِيلَتَا',
          '1p': 'إِلْنَا',
          '2mp': 'إِلْتُمْ',
          '2fp': 'إِلْتُنَّ',
          '3mp': 'إِيلُوا',
          '3fp': 'إِلْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['حول', 'حِيلَ'],
        ['عوم', 'عِيمَ'],
        ['قول', 'قِيلَ'],
        ['نوم', 'نِيمَ'],
        ['دوم', 'دِيمَ'],
        ['خور', 'خُوِرَ'],
        ['خيل', 'خِيلَ'],
        ['عوز', 'عُوِزَ'],
        ['خوف', 'خِيفَ'],
        ['شوق', 'شِيقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['دري', 'دُرِيَ'],
        ['ولي', 'وُلِيَ'],
        ['وعي', 'وُعِيَ'],
        ['علي', 'عُلِيَ'],
        ['لهو', 'لُهِيَ'],
        ['شفي', 'شُفِيَ'],
        ['جدو', 'جُدِيَ'],
        ['غشي', 'غُشِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each<[string, string]>([
        ['جوي', 'جُوِيَ'],
        ['روي', 'رُوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each<[string, string]>([
        ['جيء', 'جِيءَ'],
        ['نوء', 'نِيءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each<[string, string]>([
        ['فتء', 'فُتِئَ'],
        ['وطء', 'وُطِئَ'],
        ['كلء', 'كُلِئَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('كلء', 1))).toEqualT({
          '1s': 'كُلِئْتُ',
          '2ms': 'كُلِئْتَ',
          '2fs': 'كُلِئْتِ',
          '3ms': 'كُلِئَ',
          '3fs': 'كُلِئَتْ',
          '2d': 'كُلِئْتُمَا',
          '3md': 'كُلِئَا',
          '3fd': 'كُلِئَتَا',
          '1p': 'كُلِئْنَا',
          '2mp': 'كُلِئْتُمْ',
          '2fp': 'كُلِئْتُنَّ',
          '3mp': 'كُلِئُوا',
          '3fp': 'كُلِئْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوم', 'قُووِمَ'],
        ['عود', 'عُووِدَ'],
        ['جوز', 'جُووِزَ'],
        ['نول', 'نُووِلَ'],
        ['ضيق', 'ضُويِقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['جبب', 'جُبَّ'],
        ['عدد', 'عُدَّ'],
        ['ءمم', 'أُمَّ'],
        ['ءدد', 'أُدَّ'],
        ['ءجج', 'أُجَّ'],
        ['ءزز', 'أُزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وضع', 'وُضِعَ'],
        ['يبس', 'يُبِسَ'],
        ['وثق', 'وُثِقَ'],
        ['وجز', 'وُجِزَ'],
        ['وطن', 'وُطِنَ'],
        ['وصف', 'وُصِفَ'],
        ['وفد', 'وُفِدَ'],
        ['وقف', 'وُقِفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })

    describe('strong roots', () => {
      test.each<[string, string]>([
        ['نظر', 'نُظِرَ'],
        ['مثل', 'مُثِلَ'],
        ['دعم', 'دُعِمَ'],
        ['كلم', 'كُلِمَ'],
        ['سكن', 'سُكِنَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['شرك', 'تُشُورِكَ'],
        ['علج', 'تُعُولِجَ'],
        ['عمل', 'تُعُومِلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each<[string, string]>([
        ['ءلف', 'تُؤُولِفَ'],
        ['ءمر', 'تُؤُومِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['نول', 'تُنُووِلَ'],
        ['فوض', 'تُفُووِضَ'],
        ['جوز', 'تُجُووِزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'اُنْقِيدَ'],
        ['هيل', 'اُنْهِيلَ'],
        ['حوز', 'اُنْحِيزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['هوي', 'تُهُووِيَ'],
        ['وصي', 'تُوُوصِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حبب', 'تُحُوبِبَ'],
        ['مسس', 'تُمُوسِسَ'],
        ['ضدد', 'تُضُودِدَ'],
        ['ردد', 'تُرُودِدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وجد', 'تُوُوجِدَ'],
        ['وفق', 'تُوُوفِقَ'],
        ['وفر', 'تُوُوفِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'اُنْخُفِضَ'],
        ['عكس', 'اُنْعُكِسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['بثث', 'اُنْبُثَّ'],
        ['كفف', 'اُنْكُفَّ'],
        ['دسس', 'اُنْدُسَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['ثني', 'اُنْثُنِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('passive past', () => {
    describe('strong roots', () => {
      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('كتب', 1))).toEqualT({
          '1s': 'كُتِبْتُ',
          '2ms': 'كُتِبْتَ',
          '2fs': 'كُتِبْتِ',
          '3ms': 'كُتِبَ',
          '3fs': 'كُتِبَتْ',
          '2d': 'كُتِبْتُمَا',
          '3md': 'كُتِبَا',
          '3fd': 'كُتِبَتَا',
          '1p': 'كُتِبْنَا',
          '2mp': 'كُتِبْتُمْ',
          '2fp': 'كُتِبْتُنَّ',
          '3mp': 'كُتِبُوا',
          '3fp': 'كُتِبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('وقف', 1))).toEqualT({
          '1s': 'وُقِفْتُ',
          '2ms': 'وُقِفْتَ',
          '2fs': 'وُقِفْتِ',
          '3ms': 'وُقِفَ',
          '3fs': 'وُقِفَتْ',
          '2d': 'وُقِفْتُمَا',
          '3md': 'وُقِفَا',
          '3fd': 'وُقِفَتَا',
          '1p': 'وُقِفْنَا',
          '2mp': 'وُقِفْتُمْ',
          '2fp': 'وُقِفْتُنَّ',
          '3mp': 'وُقِفُوا',
          '3fp': 'وُقِفْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('لمم', 1))).toEqualT({
          '1s': 'لُمِمْتُ',
          '2ms': 'لُمِمْتَ',
          '2fs': 'لُمِمْتِ',
          '3ms': 'لُمَّ',
          '3fs': 'لُمَّتْ',
          '2d': 'لُمِمْتُمَا',
          '3md': 'لُمَّا',
          '3fd': 'لُمَّتَا',
          '1p': 'لُمِمْنَا',
          '2mp': 'لُمِمْتُمْ',
          '2fp': 'لُمِمْتُنَّ',
          '3mp': 'لُمُّوا',
          '3fp': 'لُمِمْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءمم', 1))).toEqualT({
          '1s': 'أُمِمْتُ',
          '2ms': 'أُمِمْتَ',
          '2fs': 'أُمِمْتِ',
          '3ms': 'أُمَّ',
          '3fs': 'أُمَّتْ',
          '2d': 'أُمِمْتُمَا',
          '3md': 'أُمَّا',
          '3fd': 'أُمَّتَا',
          '1p': 'أُمِمْنَا',
          '2mp': 'أُمِمْتُمْ',
          '2fp': 'أُمِمْتُنَّ',
          '3mp': 'أُمُّوا',
          '3fp': 'أُمِمْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ودد', 1))).toEqualT({
          '1s': 'وُدِدْتُ',
          '2ms': 'وُدِدْتَ',
          '2fs': 'وُدِدْتِ',
          '3ms': 'وُدَّ',
          '3fs': 'وُدَّتْ',
          '2d': 'وُدِدْتُمَا',
          '3md': 'وُدَّا',
          '3fd': 'وُدَّتَا',
          '1p': 'وُدِدْنَا',
          '2mp': 'وُدِدْتُمْ',
          '2fp': 'وُدِدْتُنَّ',
          '3mp': 'وُدُّوا',
          '3fp': 'وُدِدْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('يمن', 1))).toEqualT({
          '1s': 'يُمِنْتُ',
          '2ms': 'يُمِنْتَ',
          '2fs': 'يُمِنْتِ',
          '3ms': 'يُمِنَ',
          '3fs': 'يُمِنَتْ',
          '2d': 'يُمِنْتُمَا',
          '3md': 'يُمِنَا',
          '3fd': 'يُمِنَتَا',
          '1p': 'يُمِنَّا',
          '2mp': 'يُمِنْتُمْ',
          '2fp': 'يُمِنْتُنَّ',
          '3mp': 'يُمِنُوا',
          '3fp': 'يُمِنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('عوز', 1))).toEqualT({
          '1s': 'عُوِزْتُ',
          '2ms': 'عُوِزْتَ',
          '2fs': 'عُوِزْتِ',
          '3ms': 'عُوِزَ',
          '3fs': 'عُوِزَتْ',
          '2d': 'عُوِزْتُمَا',
          '3md': 'عُوِزَا',
          '3fd': 'عُوِزَتَا',
          '1p': 'عُوِزْنَا',
          '2mp': 'عُوِزْتُمْ',
          '2fp': 'عُوِزْتُنَّ',
          '3mp': 'عُوِزُوا',
          '3fp': 'عُوِزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('لوم', 1))).toEqualT({
          '1s': 'لِمْتُ',
          '2ms': 'لِمْتَ',
          '2fs': 'لِمْتِ',
          '3ms': 'لِيمَ',
          '3fs': 'لِيمَتْ',
          '2d': 'لِمْتُمَا',
          '3md': 'لِيمَا',
          '3fd': 'لِيمَتَا',
          '1p': 'لِمْنَا',
          '2mp': 'لِمْتُمْ',
          '2fp': 'لِمْتُنَّ',
          '3mp': 'لِيمُوا',
          '3fp': 'لِمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('بيع', 1))).toEqualT({
          '1s': 'بِعْتُ',
          '2ms': 'بِعْتَ',
          '2fs': 'بِعْتِ',
          '3ms': 'بِيعَ',
          '3fs': 'بِيعَتْ',
          '2d': 'بِعْتُمَا',
          '3md': 'بِيعَا',
          '3fd': 'بِيعَتَا',
          '1p': 'بِعْنَا',
          '2mp': 'بِعْتُمْ',
          '2fp': 'بِعْتُنَّ',
          '3mp': 'بِيعُوا',
          '3fp': 'بِعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('زور', 1))).toEqualT({
          '1s': 'زِرْتُ',
          '2ms': 'زِرْتَ',
          '2fs': 'زِرْتِ',
          '3ms': 'زِيرَ',
          '3fs': 'زِيرَتْ',
          '2d': 'زِرْتُمَا',
          '3md': 'زِيرَا',
          '3fd': 'زِيرَتَا',
          '1p': 'زِرْنَا',
          '2mp': 'زِرْتُمْ',
          '2fp': 'زِرْتُنَّ',
          '3mp': 'زِيرُوا',
          '3fp': 'زِرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('شيد', 1))).toEqualT({
          '1s': 'شِدْتُ',
          '2ms': 'شِدْتَ',
          '2fs': 'شِدْتِ',
          '3ms': 'شِيدَ',
          '3fs': 'شِيدَتْ',
          '2d': 'شِدْتُمَا',
          '3md': 'شِيدَا',
          '3fd': 'شِيدَتَا',
          '1p': 'شِدْنَا',
          '2mp': 'شِدْتُمْ',
          '2fp': 'شِدْتُنَّ',
          '3mp': 'شِيدُوا',
          '3fp': 'شِدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءجر', 'أُجِرَ'],
        ['ءبي', 'أُبِيَ'],
        ['ءني', 'أُنِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءخذ', 1))).toEqualT({
          '1s': 'أُخِذْتُ',
          '2ms': 'أُخِذْتَ',
          '2fs': 'أُخِذْتِ',
          '3ms': 'أُخِذَ',
          '3fs': 'أُخِذَتْ',
          '2d': 'أُخِذْتُمَا',
          '3md': 'أُخِذَا',
          '3fd': 'أُخِذَتَا',
          '1p': 'أُخِذْنَا',
          '2mp': 'أُخِذْتُمْ',
          '2fp': 'أُخِذْتُنَّ',
          '3mp': 'أُخِذُوا',
          '3fp': 'أُخِذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءوي', 1))).toEqualT({
          '1s': 'أُوِيتُ',
          '2ms': 'أُوِيتَ',
          '2fs': 'أُوِيتِ',
          '3ms': 'أُوِيَ',
          '3fs': 'أُوِيَتْ',
          '2d': 'أُوِيتُمَا',
          '3md': 'أُوِيَا',
          '3fd': 'أُوِيَتَا',
          '1p': 'أُوِينَا',
          '2mp': 'أُوِيتُمْ',
          '2fp': 'أُوِيتُنَّ',
          '3mp': 'أُوُوا',
          '3fp': 'أُوِينَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'رُئِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('رءي', 1))).toEqualT({
          '1s': 'رُئِيتُ',
          '2ms': 'رُئِيتَ',
          '2fs': 'رُئِيتِ',
          '3ms': 'رُئِيَ',
          '3fs': 'رُئِيَتْ',
          '2d': 'رُئِيتُمَا',
          '3md': 'رُئِيَا',
          '3fd': 'رُئِيَتَا',
          '1p': 'رُئِينَا',
          '2mp': 'رُئِيتُمْ',
          '2fp': 'رُئِيتُنَّ',
          '3mp': 'رُؤُوا',
          '3fp': 'رُئِينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('رَوِيَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('روي', 1))).toEqualT({
          '1s': 'رُوِيتُ',
          '2ms': 'رُوِيتَ',
          '2fs': 'رُوِيتِ',
          '3ms': 'رُوِيَ',
          '3fs': 'رُوِيَتْ',
          '2d': 'رُوِيتُمَا',
          '3md': 'رُوِيَا',
          '3fd': 'رُوِيَتَا',
          '1p': 'رُوِينَا',
          '2mp': 'رُوِيتُمْ',
          '2fp': 'رُوِيتُنَّ',
          '3mp': 'رُوُوا',
          '3fp': 'رُوِينَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءتي', 1))).toEqualT({
          '1s': 'أُتِيتُ',
          '2ms': 'أُتِيتَ',
          '2fs': 'أُتِيتِ',
          '3ms': 'أُتِيَ',
          '3fs': 'أُتِيَتْ',
          '2d': 'أُتِيتُمَا',
          '3md': 'أُتِيَا',
          '3fd': 'أُتِيَتَا',
          '1p': 'أُتِينَا',
          '2mp': 'أُتِيتُمْ',
          '2fp': 'أُتِيتُنَّ',
          '3mp': 'أُتُوا',
          '3fp': 'أُتِينَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'مُكِّنَ'],
        ['مثل', 'مُثِّلَ'],
        ['سبب', 'سُبِّبَ'],
        ['زرق', 'زُرِّقَ'],
        ['خطط', 'خُطِّطَ'],
        ['حدد', 'حُدِّدَ'],
        ['قرر', 'قُرِّرَ'],
        ['شدد', 'شُدِّدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءذي', 'أُذِّيَ'],
        ['ءسي', 'أُسِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنء', 'هُنِّئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخر', 'أُخِّرَ'],
        ['ءجر', 'أُجِّرَ'],
        ['ءكل', 'أُكِّلَ'],
        ['ءمر', 'أُمِّرَ'],
        ['ءثر', 'أُثِّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['قوي', 'قُوِّيَ'],
        ['زوي', 'زُوِّيَ'],
        ['هوي', 'هُوِّيَ'],
        ['حيي', 'حُيِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وُطِّئَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('وطء', 2))).toEqualT({
          '1s': 'وُطِّئْتُ',
          '2ms': 'وُطِّئْتَ',
          '2fs': 'وُطِّئْتِ',
          '3ms': 'وُطِّئَ',
          '3fs': 'وُطِّئَتْ',
          '2d': 'وُطِّئْتُمَا',
          '3md': 'وُطِّئَا',
          '3fd': 'وُطِّئَتَا',
          '1p': 'وُطِّئْنَا',
          '2mp': 'وُطِّئْتُمْ',
          '2fp': 'وُطِّئْتُنَّ',
          '3mp': 'وُطِّئُوا',
          '3fp': 'وُطِّئْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'وُطِّنَ'],
        ['وجه', 'وُجِّهَ'],
        ['وقف', 'وُقِّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('وُسِّطَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('وسط', 2))).toEqualT({
          '1s': 'وُسِّطْتُ',
          '2ms': 'وُسِّطْتَ',
          '2fs': 'وُسِّطْتِ',
          '3ms': 'وُسِّطَ',
          '3fs': 'وُسِّطَتْ',
          '2d': 'وُسِّطْتُمَا',
          '3md': 'وُسِّطَا',
          '3fd': 'وُسِّطَتَا',
          '1p': 'وُسِّطْنَا',
          '2mp': 'وُسِّطْتُمْ',
          '2fp': 'وُسِّطْتُنَّ',
          '3mp': 'وُسِّطُوا',
          '3fp': 'وُسِّطْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'قُوِّسَ'],
        ['كون', 'كُوِّنَ'],
        ['دون', 'دُوِّنَ'],
        ['نوم', 'نُوِّمَ'],
        ['سوف', 'سُوِّفَ'],
        ['كيف', 'كُيِّفَ'],
        ['ءول', 'أُوِّلَ'],
        ['ءوب', 'أُوِّبَ'],
        ['شوق', 'شُوِّقَ'],
        ['زور', 'زُوِّرَ'],
        ['صير', 'صُيِّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءيد', 'أُيِّدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءجج', 'أُجِّجَ'],
        ['ءسس', 'أُسِّسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['ولي', 'وُلِّيَ'],
        ['وري', 'وُرِّيَ'],
        ['مني', 'مُنِّيَ'],
        ['سمي', 'سُمِّيَ'],
        ['غطي', 'غُطِّيَ'],
        ['غني', 'غُنِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('يَوَّدَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('يود', 2))).toEqualT({
          '1s': 'يُوِّدْتُ',
          '2ms': 'يُوِّدْتَ',
          '2fs': 'يُوِّدْتِ',
          '3ms': 'يُوِّدَ',
          '3fs': 'يُوِّدَتْ',
          '2d': 'يُوِّدْتُمَا',
          '3md': 'يُوِّدَا',
          '3fd': 'يُوِّدَتَا',
          '1p': 'يُوِّدْنَا',
          '2mp': 'يُوِّدْتُمْ',
          '2fp': 'يُوِّدْتُنَّ',
          '3mp': 'يُوِّدُوا',
          '3fp': 'يُوِّدْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['تبع', 'تُوبِعَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['كلم', 'كُولِمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['بلغ', 'بُولِغَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['سعد', 'سُوعِدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['سلم', 'سُولِمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['صحب', 'صُوحِبَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['وجه', 'وُوجِهَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['وثق', 'وُوثِقَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test.each([['وعد', 'وُوعِدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('عَامَلَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('عمل', 3))).toEqualT({
          '1s': 'عُومِلْتُ',
          '2ms': 'عُومِلْتَ',
          '2fs': 'عُومِلْتِ',
          '3ms': 'عُومِلَ',
          '3fs': 'عُومِلَتْ',
          '2d': 'عُومِلْتُمَا',
          '3md': 'عُومِلَا',
          '3fd': 'عُومِلَتَا',
          '1p': 'عُومِلْنَا',
          '2mp': 'عُومِلْتُمْ',
          '2fp': 'عُومِلْتُنَّ',
          '3mp': 'عُومِلُوا',
          '3fp': 'عُومِلْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'سُورِرَ'],
        ['ردد', 'رُودِدَ'],
        ['مدد', 'مُودِدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'نُودِيَ'],
        ['رعي', 'رُوعِيَ'],
        ['بلي', 'بُولِيَ'],
        ['قضي', 'قُوضِيَ'],
        ['بري', 'بُورِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخذ', 'أُوخِذَ'],
        ['ءجر', 'أُوجِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['وءم', 'وُوئِمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجء', 'فُوجِئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وسي', 'وُوسِيَ'],
        ['نوي', 'نُووِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([['سلم', 'أُسْلِمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أَكْثَرَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('كثر', 4))).toEqualT({
          '1s': 'أُكْثِرْتُ',
          '2ms': 'أُكْثِرْتَ',
          '2fs': 'أُكْثِرْتِ',
          '3ms': 'أُكْثِرَ',
          '3fs': 'أُكْثِرَتْ',
          '2d': 'أُكْثِرْتُمَا',
          '3md': 'أُكْثِرَا',
          '3fd': 'أُكْثِرَتَا',
          '1p': 'أُكْثِرْنَا',
          '2mp': 'أُكْثِرْتُمْ',
          '2fp': 'أُكْثِرْتُنَّ',
          '3mp': 'أُكْثِرُوا',
          '3fp': 'أُكْثِرْنَ',
        })
      })

      test('أَعْلَمَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('علم', 4))).toEqualT({
          '1s': 'أُعْلِمْتُ',
          '2ms': 'أُعْلِمْتَ',
          '2fs': 'أُعْلِمْتِ',
          '3ms': 'أُعْلِمَ',
          '3fs': 'أُعْلِمَتْ',
          '2d': 'أُعْلِمْتُمَا',
          '3md': 'أُعْلِمَا',
          '3fd': 'أُعْلِمَتَا',
          '1p': 'أُعْلِمْنَا',
          '2mp': 'أُعْلِمْتُمْ',
          '2fp': 'أُعْلِمْتُنَّ',
          '3mp': 'أُعْلِمُوا',
          '3fp': 'أُعْلِمْنَ',
        })
      })

      test('أَلْحَقَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('لحق', 4))).toEqualT({
          '1s': 'أُلْحِقْتُ',
          '2ms': 'أُلْحِقْتَ',
          '2fs': 'أُلْحِقْتِ',
          '3ms': 'أُلْحِقَ',
          '3fs': 'أُلْحِقَتْ',
          '2d': 'أُلْحِقْتُمَا',
          '3md': 'أُلْحِقَا',
          '3fd': 'أُلْحِقَتَا',
          '1p': 'أُلْحِقْنَا',
          '2mp': 'أُلْحِقْتُمْ',
          '2fp': 'أُلْحِقْتُنَّ',
          '3mp': 'أُلْحِقُوا',
          '3fp': 'أُلْحِقْنَ',
        })
      })

      test('أَصْبَحَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('صبح', 4))).toEqualT({
          '1s': 'أُصْبِحْتُ',
          '2ms': 'أُصْبِحْتَ',
          '2fs': 'أُصْبِحْتِ',
          '3ms': 'أُصْبِحَ',
          '3fs': 'أُصْبِحَتْ',
          '2d': 'أُصْبِحْتُمَا',
          '3md': 'أُصْبِحَا',
          '3fd': 'أُصْبِحَتَا',
          '1p': 'أُصْبِحْنَا',
          '2mp': 'أُصْبِحْتُمْ',
          '2fp': 'أُصْبِحْتُنَّ',
          '3mp': 'أُصْبِحُوا',
          '3fp': 'أُصْبِحْنَ',
        })
      })

      test('أَعْرَبَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('عرب', 4))).toEqualT({
          '1s': 'أُعْرِبْتُ',
          '2ms': 'أُعْرِبْتَ',
          '2fs': 'أُعْرِبْتِ',
          '3ms': 'أُعْرِبَ',
          '3fs': 'أُعْرِبَتْ',
          '2d': 'أُعْرِبْتُمَا',
          '3md': 'أُعْرِبَا',
          '3fd': 'أُعْرِبَتَا',
          '1p': 'أُعْرِبْنَا',
          '2mp': 'أُعْرِبْتُمْ',
          '2fp': 'أُعْرِبْتُنَّ',
          '3mp': 'أُعْرِبُوا',
          '3fp': 'أُعْرِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'أُتِمَّ'],
        ['سفف', 'أُسِفَّ'],
        ['همم', 'أُهِمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أَتَمَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('تمم', 4))).toEqualT({
          '1s': 'أُتْمِمْتُ',
          '2ms': 'أُتْمِمْتَ',
          '2fs': 'أُتْمِمْتِ',
          '3ms': 'أُتِمَّ',
          '3fs': 'أُتِمَّتْ',
          '2d': 'أُتْمِمْتُمَا',
          '3md': 'أُتِمَّا',
          '3fd': 'أُتِمَّتَا',
          '1p': 'أُتْمِمْنَا',
          '2mp': 'أُتْمِمْتُمْ',
          '2fp': 'أُتْمِمْتُنَّ',
          '3mp': 'أُتِمُّوا',
          '3fp': 'أُتْمِمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'أُشِيْرَ'],
        ['رود', 'أُرِيْدَ'],
        ['نوم', 'أُنِيْمَ'],
        ['تيح', 'أُتِيْحَ'],
        ['فيد', 'أُفِيْدَ'],
        ['عود', 'أُعِيْدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['وصي', 'أُوصِيَ'],
        ['وحي', 'أُوحِيَ'],
        ['ودي', 'أُودِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أُرِيَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('رءي', 4))).toEqualT({
          '1s': 'أُرِيتُ',
          '2ms': 'أُرِيتَ',
          '2fs': 'أُرِيتِ',
          '3ms': 'أُرِيَ',
          '3fs': 'أُرِيَتْ',
          '2d': 'أُرِيتُمَا',
          '3md': 'أُرِيَا',
          '3fd': 'أُرِيَتَا',
          '1p': 'أُرِينَا',
          '2mp': 'أُرِيتُمْ',
          '2fp': 'أُرِيتُنَّ',
          '3mp': 'أُرُوا',
          '3fp': 'أُرِينَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نشء', 'أُنْشِئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([['سلم', 'تُسُلِّمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَعَرَّفَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('عرف', 5))).toEqualT({
          '1s': 'تُعُرِّفْتُ',
          '2ms': 'تُعُرِّفْتَ',
          '2fs': 'تُعُرِّفْتِ',
          '3ms': 'تُعُرِّفَ',
          '3fs': 'تُعُرِّفَتْ',
          '2d': 'تُعُرِّفْتُمَا',
          '3md': 'تُعُرِّفَا',
          '3fd': 'تُعُرِّفَتَا',
          '1p': 'تُعُرِّفْنَا',
          '2mp': 'تُعُرِّفْتُمْ',
          '2fp': 'تُعُرِّفْتُنَّ',
          '3mp': 'تُعُرِّفُوا',
          '3fp': 'تُعُرِّفْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءول', 'تُؤُوِّلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَأَثَّرَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءثر', 5))).toEqualT({
          '1s': 'تُؤُثِّرْتُ',
          '2ms': 'تُؤُثِّرْتَ',
          '2fs': 'تُؤُثِّرْتِ',
          '3ms': 'تُؤُثِّرَ',
          '3fs': 'تُؤُثِّرَتْ',
          '2d': 'تُؤُثِّرْتُمَا',
          '3md': 'تُؤُثِّرَا',
          '3fd': 'تُؤُثِّرَتَا',
          '1p': 'تُؤُثِّرْنَا',
          '2mp': 'تُؤُثِّرْتُمْ',
          '2fp': 'تُؤُثِّرْتُنَّ',
          '3mp': 'تُؤُثِّرُوا',
          '3fp': 'تُؤُثِّرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'تُوُصِّلَ'],
        ['وفر', 'تُوُفِّرَ'],
        ['وقف', 'تُوُقِّفَ'],
        ['وقع', 'تُوُقِّعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['هدد', 'تُهُدِّدَ'],
        ['عزز', 'تُعُزِّزَ'],
        ['قرر', 'تُقُرِّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'تُبُقِّيَ'],
        ['بني', 'تُبُنِّيَ'],
        ['رءي', 'تُرُئِّيَ'],
        ['ءتي', 'تُؤُتِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'تُوُفِّيَ'],
        ['وقي', 'تُوُقِّيَ'],
        ['وخي', 'تُوُخِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'اُقْتُرِحَ'],
        ['سلم', 'اُسْتُلِمَ'],
        ['عمد', 'اُعْتُمِدَ'],
        ['زحم', 'اُزْدُحِمَ'],
        ['نظر', 'اُنْتُظِرَ'],
        ['ضلع', 'اُضْطُلِعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِذَّكَرَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ذكر', 8))).toEqualT({
          '1s': 'اُذُّكِرْتُ',
          '2ms': 'اُذُّكِرْتَ',
          '2fs': 'اُذُّكِرْتِ',
          '3ms': 'اُذُّكِرَ',
          '3fs': 'اُذُّكِرَتْ',
          '2d': 'اُذُّكِرْتُمَا',
          '3md': 'اُذُّكِرَا',
          '3fd': 'اُذُّكِرَتَا',
          '1p': 'اُذُّكِرْنَا',
          '2mp': 'اُذُّكِرْتُمْ',
          '2fp': 'اُذُّكِرْتُنَّ',
          '3mp': 'اُذُّكِرُوا',
          '3fp': 'اُذُّكِرْنَ',
        })
      })

      test('اِعْتَبَرَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('عبر', 8))).toEqualT({
          '1s': 'اُعْتُبِرْتُ',
          '2ms': 'اُعْتُبِرْتَ',
          '2fs': 'اُعْتُبِرْتِ',
          '3ms': 'اُعْتُبِرَ',
          '3fs': 'اُعْتُبِرَتْ',
          '2d': 'اُعْتُبِرْتُمَا',
          '3md': 'اُعْتُبِرَا',
          '3fd': 'اُعْتُبِرَتَا',
          '1p': 'اُعْتُبِرْنَا',
          '2mp': 'اُعْتُبِرْتُمْ',
          '2fp': 'اُعْتُبِرْتُنَّ',
          '3mp': 'اُعْتُبِرُوا',
          '3fp': 'اُعْتُبِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['كءب', 'اُكْتُئِبَ'],
        ['بءس', 'اُبْتُئِسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'اُحْتُلَّ'],
        ['مدد', 'اُمْتُدَّ'],
        ['حجج', 'اُحْتُجَّ'],
        ['ردد', 'اُرْتُدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اُضْطُرَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ضرر', 8))).toEqualT({
          '1s': 'اُضْطُرِرْتُ',
          '2ms': 'اُضْطُرِرْتَ',
          '2fs': 'اُضْطُرِرْتِ',
          '3ms': 'اُضْطُرَّ',
          '3fs': 'اُضْطُرَّتْ',
          '2d': 'اُضْطُرِرْتُمَا',
          '3md': 'اُضْطُرَّا',
          '3fd': 'اُضْطُرَّتَا',
          '1p': 'اُضْطُرِرْنَا',
          '2mp': 'اُضْطُرِرْتُمْ',
          '2fp': 'اُضْطُرِرْتُنَّ',
          '3mp': 'اُضْطُرُّوا',
          '3fp': 'اُضْطُرِرْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['نوي', 'اُنْتُوِيَ'],
        ['سوي', 'اُسْتُوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['صفو', 'اُصْطُفِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'اُتُّعِدَ'],
        ['وكء', 'اُتُّكِئَ'],
        ['وحد', 'اُتُّحِدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اُتُّعِدَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('وعد', 8))).toEqualT({
          '1s': 'اُتُّعِدْتُ',
          '2ms': 'اُتُّعِدْتَ',
          '2fs': 'اُتُّعِدْتِ',
          '3ms': 'اُتُّعِدَ',
          '3fs': 'اُتُّعِدَتْ',
          '2d': 'اُتُّعِدْتُمَا',
          '3md': 'اُتُّعِدَا',
          '3fd': 'اُتُّعِدَتَا',
          '1p': 'اُتُّعِدْنَا',
          '2mp': 'اُتُّعِدْتُمْ',
          '2fp': 'اُتُّعِدْتُنَّ',
          '3mp': 'اُتُّعِدُوا',
          '3fp': 'اُتُّعِدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زوج', 'اُزْدُوِجَ'],
        ['زيد', 'اُزْدِيدَ'],
        ['سوء', 'اُسْتِيءَ'],
        ['روح', 'اُرْتِيحَ'],
        ['شوق', 'اُشْتِيقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('اُؤْتُمَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءمم', 8))).toEqualT({
          '1s': 'اُؤْتُمِمْتُ',
          '2ms': 'اُؤْتُمِمْتَ',
          '2fs': 'اُؤْتُمِمْتِ',
          '3ms': 'اُؤْتُمَّ',
          '3fs': 'اُؤْتُمَّتْ',
          '2d': 'اُؤْتُمِمْتُمَا',
          '3md': 'اُؤْتُمَّا',
          '3fd': 'اُؤْتُمَّتَا',
          '1p': 'اُؤْتُمِمْنَا',
          '2mp': 'اُؤْتُمِمْتُمْ',
          '2fp': 'اُؤْتُمِمْتُنَّ',
          '3mp': 'اُؤْتُمُّوا',
          '3fp': 'اُؤْتُمِمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['خبء', 'اُخْتُبِئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِبْتَدَأَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('بدء', 8))).toEqualT({
          '1s': 'اُبْتُدِئْتُ',
          '2ms': 'اُبْتُدِئْتَ',
          '2fs': 'اُبْتُدِئْتِ',
          '3ms': 'اُبْتُدِئَ',
          '3fs': 'اُبْتُدِئَتْ',
          '2d': 'اُبْتُدِئْتُمَا',
          '3md': 'اُبْتُدِئَا',
          '3fd': 'اُبْتُدِئَتَا',
          '1p': 'اُبْتُدِئْنَا',
          '2mp': 'اُبْتُدِئْتُمْ',
          '2fp': 'اُبْتُدِئْتُنَّ',
          '3mp': 'اُبْتُدِئُوا',
          '3fp': 'اُبْتُدِئْنَ',
        })
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عرض', 'اُسْتُعْرِضَ'],
        ['غرق', 'اُسْتُغْرِقَ'],
        ['طرد', 'اُسْتُطْرِدَ'],
        ['عمل', 'اُسْتُعْمِلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })

      test('اِسْتَهْدَفَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('هدف', 10))).toEqualT({
          '1s': 'اُسْتُهْدِفْتُ',
          '2ms': 'اُسْتُهْدِفْتَ',
          '2fs': 'اُسْتُهْدِفْتِ',
          '3ms': 'اُسْتُهْدِفَ',
          '3fs': 'اُسْتُهْدِفَتْ',
          '2d': 'اُسْتُهْدِفْتُمَا',
          '3md': 'اُسْتُهْدِفَا',
          '3fd': 'اُسْتُهْدِفَتَا',
          '1p': 'اُسْتُهْدِفْنَا',
          '2mp': 'اُسْتُهْدِفْتُمْ',
          '2fp': 'اُسْتُهْدِفْتُنَّ',
          '3mp': 'اُسْتُهْدِفُوا',
          '3fp': 'اُسْتُهْدِفْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجب', 'اُسْتُوْجِبَ'],
        ['وعب', 'اُسْتُوْعِبَ'],
        ['ورد', 'اُسْتُوْرِدَ'],
        ['وضح', 'اُسْتُوْضِحَ'],
        ['وطن', 'اُسْتُوْطِنَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test('اِسْتَأْنَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('ءني', 10))).toEqualT({
          '1s': 'اُسْتُؤْنِيتُ',
          '2ms': 'اُسْتُؤْنِيتَ',
          '2fs': 'اُسْتُؤْنِيتِ',
          '3ms': 'اُسْتُؤْنِيَ',
          '3fs': 'اُسْتُؤْنِيَتْ',
          '2d': 'اُسْتُؤْنِيتُمَا',
          '3md': 'اُسْتُؤْنِيَا',
          '3fd': 'اُسْتُؤْنِيَتَا',
          '1p': 'اُسْتُؤْنِينَا',
          '2mp': 'اُسْتُؤْنِيتُمْ',
          '2fp': 'اُسْتُؤْنِيتُنَّ',
          '3mp': 'اُسْتُؤْنُوا',
          '3fp': 'اُسْتُؤْنِينَ',
        })
      })

      test('اِسْتَدْعَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('دعو', 10))).toEqualT({
          '1s': 'اُسْتُدْعِيتُ',
          '2ms': 'اُسْتُدْعِيتَ',
          '2fs': 'اُسْتُدْعِيتِ',
          '3ms': 'اُسْتُدْعِيَ',
          '3fs': 'اُسْتُدْعِيَتْ',
          '2d': 'اُسْتُدْعِيتُمَا',
          '3md': 'اُسْتُدْعِيَا',
          '3fd': 'اُسْتُدْعِيَتَا',
          '1p': 'اُسْتُدْعِينَا',
          '2mp': 'اُسْتُدْعِيتُمْ',
          '2fp': 'اُسْتُدْعِيتُنَّ',
          '3mp': 'اُسْتُدْعُوا',
          '3fp': 'اُسْتُدْعِينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَحْيَا conjugation', () => {
        expect(conjugatePassivePast(getVerb('حيي', 10))).toEqualT({
          '1s': 'اُسْتُحْيِيتُ',
          '2ms': 'اُسْتُحْيِيتَ',
          '2fs': 'اُسْتُحْيِيتِ',
          '3ms': 'اُسْتُحْيِيَ',
          '3fs': 'اُسْتُحْيِيَتْ',
          '2d': 'اُسْتُحْيِيتُمَا',
          '3md': 'اُسْتُحْيِيَا',
          '3fd': 'اُسْتُحْيِيَتَا',
          '1p': 'اُسْتُحْيِينَا',
          '2mp': 'اُسْتُحْيِيتُمْ',
          '2fp': 'اُسْتُحْيِيتُنَّ',
          '3mp': 'اُسْتُحْيُوا',
          '3fp': 'اُسْتُحْيِينَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['فيد', 'اُسْتُفِيْدَ'],
        ['جوب', 'اُسْتُجِيْبَ'],
        ['لوم', 'اُسْتُلِيْمَ'],
        ['حول', 'اُسْتُحِيْلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })

      test('اِسْتَشَارَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('شور', 10))).toEqualT({
          '1s': 'اُسْتُشِرْتُ',
          '2ms': 'اُسْتُشِرْتَ',
          '2fs': 'اُسْتُشِرْتِ',
          '3ms': 'اُسْتُشِيْرَ',
          '3fs': 'اُسْتُشِيْرَتْ',
          '2d': 'اُسْتُشِرْتُمَا',
          '3md': 'اُسْتُشِيْرَا',
          '3fd': 'اُسْتُشِيْرَتَا',
          '1p': 'اُسْتُشِرْنَا',
          '2mp': 'اُسْتُشِرْتُمْ',
          '2fp': 'اُسْتُشِرْتُنَّ',
          '3mp': 'اُسْتُشِيْرُوا',
          '3fp': 'اُسْتُشِرْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['رعي', 'اُسْتُرْعِيَ'],
        ['ثني', 'اُسْتُثْنِيَ'],
        ['لقي', 'اُسْتُلْقِيَ'],
        ['عصي', 'اُسْتُعْصِيَ'],
        ['رخو', 'اُسْتُرْخِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['شفف', 'اُسْتُشِفَّ'],
        ['مرر', 'اُسْتُمِرَّ'],
        ['حقق', 'اُسْتُحِقَّ'],
        ['غلل', 'اُسْتُغِلَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })

      test('اِسْتَمَدَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('مدد', 10))).toEqualT({
          '1s': 'اُسْتُمِدِدْتُ',
          '2ms': 'اُسْتُمِدِدْتَ',
          '2fs': 'اُسْتُمِدِدْتِ',
          '3ms': 'اُسْتُمِدَّ',
          '3fs': 'اُسْتُمِدَّتْ',
          '2d': 'اُسْتُمِدِدْتُمَا',
          '3md': 'اُسْتُمِدَّا',
          '3fd': 'اُسْتُمِدَّتَا',
          '1p': 'اُسْتُمِدِدْنَا',
          '2mp': 'اُسْتُمِدِدْتُمْ',
          '2fp': 'اُسْتُمِدِدْتُنَّ',
          '3mp': 'اُسْتُمِدُّوا',
          '3fp': 'اُسْتُمِدِدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءجر', 'اُسْتُؤْجِرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'اُسْتُضِيْءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })
  })
  describe('Form Iq', () => {
    describe('hollow roots', () => {
      test.each([
        ['سيطر', 'سُوْطِرَ'],
        ['وسوس', 'وُسْوِسَ'],
        ['ترجم', 'تُرْجِمَ'],
        ['برهن', 'بُرْهِنَ'],
        ['عرقل', 'عُرْقِلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('كَلْوَرَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('كلور', 1))).toEqualT({
          '1s': 'كُلْوِرْتُ',
          '2ms': 'كُلْوِرْتَ',
          '2fs': 'كُلْوِرْتِ',
          '3ms': 'كُلْوِرَ',
          '3fs': 'كُلْوِرَتْ',
          '2d': 'كُلْوِرْتُمَا',
          '3md': 'كُلْوِرَا',
          '3fd': 'كُلْوِرَتَا',
          '1p': 'كُلْوِرْنَا',
          '2mp': 'كُلْوِرْتُمْ',
          '2fp': 'كُلْوِرْتُنَّ',
          '3mp': 'كُلْوِرُوا',
          '3fp': 'كُلْوِرْنَ',
        })
      })
    })
  })

  describe('Form IIq', () => {
    describe('regular roots', () => {
      test.each([
        ['مركز', 'تُمُرْكِزَ'],
        ['بلور', 'تُبُلْوِرَ'],
        ['ذبذب', 'تُذُبْذِبَ'],
        ['غلغل', 'تُغُلْغِلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءمرك', 'تُؤُمْرِكَ'],
        ['ءلمن', 'تُؤُلْمِنَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IIIq', () => {
    describe('regular roots', () => {
      test.each([
        ['حرجم', 'اُحْرُنْجِمَ'],
        ['حرشف', 'اُحْرُنْشِفَ'],
        ['حرفز', 'اُحْرُنْفِزَ'],
        ['خرطم', 'اُخْرُنْطِمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IVq', () => {
    describe('regular roots', () => {
      test.each([['قشعر', 'اُقْشُعِرَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('اُشْمُئِزَّ conjugation', () => {
        expect(conjugatePassivePast(getVerb('شمءز', 4))).toEqualT({
          '1s': 'اُشْمُؤْزِزْتُ',
          '2ms': 'اُشْمُؤْزِزْتَ',
          '2fs': 'اُشْمُؤْزِزْتِ',
          '3ms': 'اُشْمُئِزَّ',
          '3fs': 'اُشْمُئِزَّتْ',
          '2d': 'اُشْمُؤْزِزْتُمَا',
          '3md': 'اُشْمُئِزَّا',
          '3fd': 'اُشْمُئِزَّتَا',
          '1p': 'اُشْمُؤْزِزْنَا',
          '2mp': 'اُشْمُؤْزِزْتُمْ',
          '2fp': 'اُشْمُؤْزِزْتُنَّ',
          '3mp': 'اُشْمُئِزُّوا',
          '3fp': 'اُشْمُؤْزِزْنَ',
        })
      })

      test.each([['برغش', 'اُبْرُغِشَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test.each([['جلعب', 'اُجْلُعِبَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })
  })
})
