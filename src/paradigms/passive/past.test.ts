import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePassivePast } from './past'

describe('passive past pattern', () => {
  describe('Form I', () => {
    describe('hamzated initial hollow-defective roots', () => {
      test.each<[string, string]>([['أوي', 'أُوِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each<[string, string]>([['أول', 'إِيلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })

      test('إِيلَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('أول', 1))).toEqualT({
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
        ['خور', 'خُوِرَ'],
        ['عوز', 'عُوِزَ'],
        ['خوف', 'خِيفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['ولي', 'وُلِيَ'],
        ['وعي', 'وُعِيَ'],
        ['علي', 'عُلِيَ'],
        ['لهو', 'لُهِيَ'],
        ['شفي', 'شُفِيَ'],
        ['جدو', 'جُدِيَ'],
        ['غشي', 'غُشِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each<[string, string]>([
        ['جوي', 'جُوِيَ'],
        ['روى', 'رُوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each<[string, string]>([
        ['جيء', 'جِيءَ'],
        ['نوء', 'نِيءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each<[string, string]>([
        ['وطء', 'وُطِئَ'],
        ['كلأ', 'كُلِئَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('كلأ', 1))).toEqualT({
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

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['جبب', 'جُبَّ'],
        ['أمم', 'أُمَّ'],
        ['أدد', 'أُدَّ'],
        ['أجج', 'أُجَّ'],
        ['أزز', 'أُزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
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
        ['وهن', 'وُهِنَ'],
        ['وقف', 'وُقِفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
      })
    })

    describe('strong roots', () => {
      test.each<[string, string]>([
        ['جيد', 'جُيِدَ'],
        ['نظر', 'نُظِرَ'],
        ['مثل', 'مُثِلَ'],
        ['دعم', 'دُعِمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toBe(expected)
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
        expect(conjugatePassivePast(getVerb('أمم', 1))).toEqualT({
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
        expect(conjugatePassivePast(getVerb('باع', 1))).toEqualT({
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

      test('جَيِدَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('جيد', 1))).toEqualT({
          '1s': 'جُيِدْتُ',
          '2ms': 'جُيِدْتَ',
          '2fs': 'جُيِدْتِ',
          '3ms': 'جُيِدَ',
          '3fs': 'جُيِدَتْ',
          '2d': 'جُيِدْتُمَا',
          '3md': 'جُيِدَا',
          '3fd': 'جُيِدَتَا',
          '1p': 'جُيِدْنَا',
          '2mp': 'جُيِدْتُمْ',
          '2fp': 'جُيِدْتُنَّ',
          '3mp': 'جُيِدُوا',
          '3fp': 'جُيِدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أبي', 'أُبِيَ'],
        ['أني', 'أُنِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePast(getVerb('أخذ', 1))).toEqualT({
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
        expect(conjugatePassivePast(getVerb('أوي', 1))).toEqualT({
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
      test.each([['رأى', 'رُئِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePast(getVerb('رأى', 1))).toEqualT({
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

    describe('defective roots', () => {
      test('دَعَا conjugation', () => {
        expect(conjugatePassivePast(getVerb('دعا', 1))).toEqualT({
          '1s': 'دُعِيتُ',
          '2ms': 'دُعِيتَ',
          '2fs': 'دُعِيتِ',
          '3ms': 'دُعِيَ',
          '3fs': 'دُعِيَتْ',
          '2d': 'دُعِيتُمَا',
          '3md': 'دُعِيَا',
          '3fd': 'دُعِيَتَا',
          '1p': 'دُعِينَا',
          '2mp': 'دُعِيتُمْ',
          '2fp': 'دُعِيتُنَّ',
          '3mp': 'دُعُوا',
          '3fp': 'دُعِينَ',
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
        expect(conjugatePassivePast(getVerb('أتي', 1))).toEqualT({
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
        ['خطط', 'خُطِّطَ'],
        ['حدد', 'حُدِّدَ'],
        ['قرر', 'قُرِّرَ'],
        ['شدد', 'شُدِّدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['قوي', 'قُوِّيَ']])('%s pattern', (root, expected) => {
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
        ['سوف', 'سُوِّفَ'],
        ['كيف', 'كُيِّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'وُفِّيَ'],
        ['وصي', 'وُصِّيَ'],
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
})
