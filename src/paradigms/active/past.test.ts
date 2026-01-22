import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePast } from './past'

describe('active past', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['جلس', 'جَلَسَ'],
        ['جعل', 'جَعَلَ'],
        ['جمع', 'جَمَعَ'],
        ['حدث', 'حَدَثَ'],
        ['ذكر', 'ذَكَرَ'],
        ['دعم', 'دَعَمَ'],
        ['حضر', 'حَضَرَ'],
        ['ضمن', 'ضَمِنَ'],
        ['عمل', 'عَمِلَ'],
        ['صبح', 'صَبَحَ'],
        ['بعد', 'بَعِدَ'],
        ['مثل', 'مَثَلَ'],
        ['نظر', 'نَظَرَ'],
        ['صغر', 'صَغُرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 1))).toEqual({
          '1s': 'كَتَبْتُ',
          '2ms': 'كَتَبْتَ',
          '2fs': 'كَتَبْتِ',
          '3ms': 'كَتَبَ',
          '3fs': 'كَتَبَتْ',
          '2d': 'كَتَبْتُمَا',
          '3md': 'كَتَبَا',
          '3fd': 'كَتَبَتَا',
          '1p': 'كَتَبْنَا',
          '2mp': 'كَتَبْتُمْ',
          '2fp': 'كَتَبْتُنَّ',
          '3mp': 'كَتَبُوا',
          '3fp': 'كَتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'تَمَّ'],
        ['هلل', 'هَلَّ'],
        ['عنن', 'عَنَّ'],
        ['حبب', 'حَبَّ'],
        ['ظلل', 'ظَلَّ'],
        ['ودد', 'وَدَّ'],
        ['قرر', 'قَرَّ'],
        ['جبب', 'جَبَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('حَبَّ conjugation', () => {
        expect(conjugatePast(getVerb('حبب', 1))).toEqual({
          '1s': 'حَبَبْتُ',
          '2ms': 'حَبَبْتَ',
          '2fs': 'حَبَبْتِ',
          '3ms': 'حَبَّ',
          '3fs': 'حَبَّتْ',
          '2d': 'حَبَبْتُمَا',
          '3md': 'حَبَّا',
          '3fd': 'حَبَّتَا',
          '1p': 'حَبَبْنَا',
          '2mp': 'حَبَبْتُمْ',
          '2fp': 'حَبَبْتُنَّ',
          '3mp': 'حَبُّوا',
          '3fp': 'حَبَبْنَ',
        })
      })

      test('قَرَّ conjugation', () => {
        expect(conjugatePast(getVerb('قرر', 1))).toEqual({
          '1s': 'قَرِرْتُ',
          '2ms': 'قَرِرْتَ',
          '2fs': 'قَرِرْتِ',
          '3ms': 'قَرَّ',
          '3fs': 'قَرَّتْ',
          '2d': 'قَرِرْتُمَا',
          '3md': 'قَرَّا',
          '3fd': 'قَرَّتَا',
          '1p': 'قَرِرْنَا',
          '2mp': 'قَرِرْتُمْ',
          '2fp': 'قَرِرْتُنَّ',
          '3mp': 'قَرُّوا',
          '3fp': 'قَرِرْنَ',
        })
      })

      test('ظَلَّ conjugation', () => {
        expect(conjugatePast(getVerb('ظلل', 1))).toEqual({
          '1s': 'ظَلِلْتُ',
          '2ms': 'ظَلِلْتَ',
          '2fs': 'ظَلِلْتِ',
          '3ms': 'ظَلَّ',
          '3fs': 'ظَلَّتْ',
          '2d': 'ظَلِلْتُمَا',
          '3md': 'ظَلَّا',
          '3fd': 'ظَلَّتَا',
          '1p': 'ظَلِلْنَا',
          '2mp': 'ظَلِلْتُمْ',
          '2fp': 'ظَلِلْتُنَّ',
          '3mp': 'ظَلُّوا',
          '3fp': 'ظَلِلْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['يمن', 'يَمِنَ'],
        ['يسر', 'يَسُرَ'],
        ['يبس', 'يَبِسَ'],
        ['وعد', 'وَعَدَ'],
        ['وضع', 'وَضَعَ'],
        ['وثق', 'وَثُقَ'],
        ['وجز', 'وَجُزَ'],
        ['وطن', 'وَطَنَ'],
        ['وجب', 'وَجَبَ'],
        ['وصف', 'وَصَفَ'],
        ['وفد', 'وَفَدَ'],
        ['وهن', 'وَهُنَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('وَعَدَ conjugation', () => {
        expect(conjugatePast(getVerb('وعد', 1))).toEqual({
          '1s': 'وَعَدْتُ',
          '2ms': 'وَعَدْتَ',
          '2fs': 'وَعَدْتِ',
          '3ms': 'وَعَدَ',
          '3fs': 'وَعَدَتْ',
          '2d': 'وَعَدْتُمَا',
          '3md': 'وَعَدَا',
          '3fd': 'وَعَدَتَا',
          '1p': 'وَعَدْنَا',
          '2mp': 'وَعَدْتُمْ',
          '2fp': 'وَعَدْتُنَّ',
          '3mp': 'وَعَدُوا',
          '3fp': 'وَعَدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['باع', 'بَاعَ'],
        ['زور', 'زَارَ'],
        ['لوم', 'لَامَ'],
        ['بيت', 'بَاتَ'],
        ['خور', 'خَوِرَ'],
        ['حول', 'حَالَ'],
        ['عوم', 'عَامَ'],
        ['قول', 'قَالَ'],
        ['عوز', 'عَوِزَ'],
        ['ميل', 'مَيِلَ'],
        ['صير', 'صَارَ'],
        ['جيد', 'جَيِدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePast(getVerb('عوز', 1))).toEqual({
          '1s': 'عَوِزْتُ',
          '2ms': 'عَوِزْتَ',
          '2fs': 'عَوِزْتِ',
          '3ms': 'عَوِزَ',
          '3fs': 'عَوِزَتْ',
          '2d': 'عَوِزْتُمَا',
          '3md': 'عَوِزَا',
          '3fd': 'عَوِزَتَا',
          '1p': 'عَوِزْنَا',
          '2mp': 'عَوِزْتُمْ',
          '2fp': 'عَوِزْتُنَّ',
          '3mp': 'عَوِزُوا',
          '3fp': 'عَوِزْنَ',
        })
      })

      test('بَاتَ conjugation', () => {
        expect(conjugatePast(getVerb('بيت', 1))).toEqual({
          '1s': 'بِتُّ',
          '2ms': 'بِتَّ',
          '2fs': 'بِتِّ',
          '3ms': 'بَاتَ',
          '3fs': 'بَاتَتْ',
          '2d': 'بِتُّمَا',
          '3md': 'بَاتَا',
          '3fd': 'بَاتَتَا',
          '1p': 'بِتْنَا',
          '2mp': 'بِتُّمْ',
          '2fp': 'بِتُّنَّ',
          '3mp': 'بَاتُوا',
          '3fp': 'بِتْنَ',
        })
      })

      test('كَانَ conjugation', () => {
        expect(conjugatePast(getVerb('كان', 1))).toEqual({
          '1s': 'كُنْتُ',
          '2ms': 'كُنْتَ',
          '2fs': 'كُنْتِ',
          '3ms': 'كَانَ',
          '3fs': 'كَانَتْ',
          '2d': 'كُنْتُمَا',
          '3md': 'كَانَا',
          '3fd': 'كَانَتَا',
          '1p': 'كُنَّا',
          '2mp': 'كُنْتُمْ',
          '2fp': 'كُنْتُنَّ',
          '3mp': 'كَانُوا',
          '3fp': 'كُنَّ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePast(getVerb('شيد', 1))).toEqual({
          '1s': 'شِدْتُ',
          '2ms': 'شِدْتَ',
          '2fs': 'شِدْتِ',
          '3ms': 'شَادَ',
          '3fs': 'شَادَتْ',
          '2d': 'شِدْتُمَا',
          '3md': 'شَادَا',
          '3fd': 'شَادَتَا',
          '1p': 'شِدْنَا',
          '2mp': 'شِدْتُمْ',
          '2fp': 'شِدْتُنَّ',
          '3mp': 'شَادُوا',
          '3fp': 'شِدْنَ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugatePast(getVerb('جيد', 1))).toEqual({
          '1s': 'جَيِدْتُ',
          '2ms': 'جَيِدْتَ',
          '2fs': 'جَيِدْتِ',
          '3ms': 'جَيِدَ',
          '3fs': 'جَيِدَتْ',
          '2d': 'جَيِدْتُمَا',
          '3md': 'جَيِدَا',
          '3fd': 'جَيِدَتَا',
          '1p': 'جَيِدْنَا',
          '2mp': 'جَيِدْتُمْ',
          '2fp': 'جَيِدْتُنَّ',
          '3mp': 'جَيِدُوا',
          '3fp': 'جَيِدْنَ',
        })
      })

      test('قَالَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 1))).toEqual({
          '1s': 'قُلْتُ',
          '2ms': 'قُلْتَ',
          '2fs': 'قُلْتِ',
          '3ms': 'قَالَ',
          '3fs': 'قَالَتْ',
          '2d': 'قُلْتُمَا',
          '3md': 'قَالَا',
          '3fd': 'قَالَتَا',
          '1p': 'قُلْنَا',
          '2mp': 'قُلْتُمْ',
          '2fp': 'قُلْتُنَّ',
          '3mp': 'قَالُوا',
          '3fp': 'قُلْنَ',
        })
      })

      test('shorten with suffixes for hollow verbs like قال', () => {
        expect(conjugatePast(getVerb('قول', 1))).toEqual({
          '1s': 'قُلْتُ',
          '2ms': 'قُلْتَ',
          '2fs': 'قُلْتِ',
          '3ms': 'قَالَ',
          '3fs': 'قَالَتْ',
          '2d': 'قُلْتُمَا',
          '3md': 'قَالَا',
          '3fd': 'قَالَتَا',
          '1p': 'قُلْنَا',
          '2mp': 'قُلْتُمْ',
          '2fp': 'قُلْتُنَّ',
          '3mp': 'قَالُوا',
          '3fp': 'قُلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعا', 'دَعَا'],
        ['بكي', 'بَكَى'],
        ['بدو', 'بَدَا'],
        ['علي', 'عَلَى'],
        ['جدو', 'جَدَا'],
        ['لهو', 'لَهَا'],
        ['شفي', 'شَفَى'],
        ['غدو', 'غَدَا'],
        ['غشي', 'غَشَى'],
        ['جري', 'جَرَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('رَمَى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 1))).toEqual({
          '1s': 'رَمَيْتُ',
          '2ms': 'رَمَيْتَ',
          '2fs': 'رَمَيْتِ',
          '3ms': 'رَمَى',
          '3fs': 'رَمَتْ',
          '2d': 'رَمَيْتُمَا',
          '3md': 'رَمَيَا',
          '3fd': 'رَمَتَا',
          '1p': 'رَمَيْنَا',
          '2mp': 'رَمَيْتُمْ',
          '2fp': 'رَمَيْتُنَّ',
          '3mp': 'رَمَوا',
          '3fp': 'رَمَيْنَ',
        })
      })

      // Verified against Wiktionary's conjugation table for بَقِيَ (Form I, final-weak i~a).
      test('بَقِيَ conjugation', () => {
        expect(conjugatePast(getVerb('بقي', 1))).toEqual({
          '1s': 'بَقِيتُ',
          '2ms': 'بَقِيتَ',
          '2fs': 'بَقِيتِ',
          '3ms': 'بَقِيَ',
          '3fs': 'بَقِيَتْ',
          '2d': 'بَقِيتُمَا',
          '3md': 'بَقِيَا',
          '3fd': 'بَقِيَتَا',
          '1p': 'بَقِينَا',
          '2mp': 'بَقِيتُمْ',
          '2fp': 'بَقِيتُنَّ',
          '3mp': 'بَقُوا',
          '3fp': 'بَقِينَ',
        })
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePast(getVerb('دعا', 1))).toEqual({
          '1s': 'دَعَوْتُ',
          '2ms': 'دَعَوْتَ',
          '2fs': 'دَعَوْتِ',
          '3ms': 'دَعَا',
          '3fs': 'دَعَتْ',
          '2d': 'دَعَوْتُمَا',
          '3md': 'دَعَوَا',
          '3fd': 'دَعَتَا',
          '1p': 'دَعَوْنَا',
          '2mp': 'دَعَوْتُمْ',
          '2fp': 'دَعَوْتُنَّ',
          '3mp': 'دَعَوا',
          '3fp': 'دَعَوْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['ونى', 'وَنَى'],
        ['ولي', 'وَلِيَ'],
        ['وعي', 'وَعَى'],
        ['وفي', 'وَفَى'],
        ['وقي', 'وَقَى'],
        ['ولى', 'وَلِي'],
        ['روى', 'رَوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('وَفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 1))).toEqual({
          '1s': 'وَفَيْتُ',
          '2ms': 'وَفَيْتَ',
          '2fs': 'وَفَيْتِ',
          '3ms': 'وَفَى',
          '3fs': 'وَفَتْ',
          '2d': 'وَفَيْتُمَا',
          '3md': 'وَفَيَا',
          '3fd': 'وَفَتَا',
          '1p': 'وَفَيْنَا',
          '2mp': 'وَفَيْتُمْ',
          '2fp': 'وَفَيْتُنَّ',
          '3mp': 'وَفَوا',
          '3fp': 'وَفَيْنَ',
        })
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePast(getVerb('روي', 1))).toEqual({
          '1s': 'رَوِيتُ',
          '2ms': 'رَوِيتَ',
          '2fs': 'رَوِيتِ',
          '3ms': 'رَوِيَ',
          '3fs': 'رَوِيَتْ',
          '2d': 'رَوِيتُمَا',
          '3md': 'رَوِيَا',
          '3fd': 'رَوِيَتَا',
          '1p': 'رَوِينَا',
          '2mp': 'رَوِيتُمْ',
          '2fp': 'رَوِيتُنَّ',
          '3mp': 'رَوُوا',
          '3fp': 'رَوِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أمن', 'أَمِنَ'],
        ['أذن', 'أَذِنَ'],
        ['أسر', 'أَسَرَ'],
        ['أخذ', 'أَخَذَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 1))).toEqual({
          '1s': 'أَخَذْتُ',
          '2ms': 'أَخَذْتَ',
          '2fs': 'أَخَذْتِ',
          '3ms': 'أَخَذَ',
          '3fs': 'أَخَذَتْ',
          '2d': 'أَخَذْتُمَا',
          '3md': 'أَخَذَا',
          '3fd': 'أَخَذَتَا',
          '1p': 'أَخَذْنَا',
          '2mp': 'أَخَذْتُمْ',
          '2fp': 'أَخَذْتُنَّ',
          '3mp': 'أَخَذُوا',
          '3fp': 'أَخَذْنَ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'أَمَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePast(getVerb('أمم', 1))).toEqual({
          '1s': 'أَمَمْتُ',
          '2ms': 'أَمَمْتَ',
          '2fs': 'أَمَمْتِ',
          '3ms': 'أَمَّ',
          '3fs': 'أَمَّتْ',
          '2d': 'أَمَمْتُمَا',
          '3md': 'أَمَّا',
          '3fd': 'أَمَّتَا',
          '1p': 'أَمَمْنَا',
          '2mp': 'أَمَمْتُمْ',
          '2fp': 'أَمَمْتُنَّ',
          '3mp': 'أَمُّوا',
          '3fp': 'أَمَمْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['يئس', 'يَئِسَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('سَأَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 1))).toEqual({
          '1s': 'سَأَلْتُ',
          '2ms': 'سَأَلْتَ',
          '2fs': 'سَأَلْتِ',
          '3ms': 'سَأَلَ',
          '3fs': 'سَأَلَتْ',
          '2d': 'سَأَلْتُمَا',
          '3md': 'سَأَلَا',
          '3fd': 'سَأَلَتَا',
          '1p': 'سَأَلْنَا',
          '2mp': 'سَأَلْتُمْ',
          '2fp': 'سَأَلْتُنَّ',
          '3mp': 'سَأَلُوا',
          '3fp': 'سَأَلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['وطئ', 'وَطِئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePast(getVerb('بدأ', 1))).toEqual({
          '1s': 'بَدَأْتُ',
          '2ms': 'بَدَأْتَ',
          '2fs': 'بَدَأْتِ',
          '3ms': 'بَدَأَ',
          '3fs': 'بَدَأَتْ',
          '2d': 'بَدَأْتُمَا',
          '3md': 'بَدَآ',
          '3fd': 'بَدَأَتَا',
          '1p': 'بَدَأْنَا',
          '2mp': 'بَدَأْتُمْ',
          '2fp': 'بَدَأْتُنَّ',
          '3mp': 'بَدَأُوا',
          '3fp': 'بَدَأْنَ',
        })
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePast(getVerb('قرأ', 1))).toEqual({
          '1s': 'قَرَأْتُ',
          '2ms': 'قَرَأْتَ',
          '2fs': 'قَرَأْتِ',
          '3ms': 'قَرَأَ',
          '3fs': 'قَرَأَتْ',
          '2d': 'قَرَأْتُمَا',
          '3md': 'قَرَآ',
          '3fd': 'قَرَأَتَا',
          '1p': 'قَرَأْنَا',
          '2mp': 'قَرَأْتُمْ',
          '2fp': 'قَرَأْتُنَّ',
          '3mp': 'قَرَأُوا',
          '3fp': 'قَرَأْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['جيء', 'جَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('جَاءَ conjugation', () => {
        expect(conjugatePast(getVerb('جيء', 1))).toEqual({
          '3ms': 'جَاءَ',
          '3fs': 'جَاءَتْ',
          '3md': 'جَاءَا',
          '3fd': 'جَاءَتَا',
          '3mp': 'جَاؤُوا',
          '3fp': 'جِئْنَ',
          '2ms': 'جِئْتَ',
          '2fs': 'جِئْتِ',
          '2d': 'جِئْتُمَا',
          '2mp': 'جِئْتُمْ',
          '2fp': 'جِئْتُنَّ',
          '1s': 'جِئْتُ',
          '1p': 'جِئْنَا',
        })
      })

      test('hollow verb with final hamza for جَاءَ', () => {
        expect(conjugatePast(getVerb('جيء', 1))).toEqual({
          '3ms': 'جَاءَ',
          '3fs': 'جَاءَتْ',
          '3md': 'جَاءَا',
          '3fd': 'جَاءَتَا',
          '3mp': 'جَاؤُوا',
          '3fp': 'جِئْنَ',
          '2ms': 'جِئْتَ',
          '2fs': 'جِئْتِ',
          '2d': 'جِئْتُمَا',
          '2mp': 'جِئْتُمْ',
          '2fp': 'جِئْتُنَّ',
          '1s': 'جِئْتُ',
          '1p': 'جِئْنَا',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'أَتَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePast(getVerb('أتي', 1))).toEqual({
          '1s': 'أَتَيْتُ',
          '2ms': 'أَتَيْتَ',
          '2fs': 'أَتَيْتِ',
          '3ms': 'أَتَى',
          '3fs': 'أَتَتْ',
          '2d': 'أَتَيْتُمَا',
          '3md': 'أَتَيَا',
          '3fd': 'أَتَتَا',
          '1p': 'أَتَيْنَا',
          '2mp': 'أَتَيْتُمْ',
          '2fp': 'أَتَيْتُنَّ',
          '3mp': 'أَتَوا',
          '3fp': 'أَتَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رأى', 'رَأَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePast(getVerb('رأى', 1))).toEqual({
          '1s': 'رَأَيْتُ',
          '2ms': 'رَأَيْتَ',
          '2fs': 'رَأَيْتِ',
          '3ms': 'رَأَى',
          '3fs': 'رَأَتْ',
          '2d': 'رَأَيْتُمَا',
          '3md': 'رَأَيَا',
          '3fd': 'رَأَتَا',
          '1p': 'رَأَيْنَا',
          '2mp': 'رَأَيْتُمْ',
          '2fp': 'رَأَيْتُنَّ',
          '3mp': 'رَأَوا',
          '3fp': 'رَأَيْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugatePast(getVerb('وأى', 1))).toEqual({
          '1s': 'وَأَيْتُ',
          '2ms': 'وَأَيْتَ',
          '2fs': 'وَأَيْتِ',
          '3ms': 'وَأَى',
          '3fs': 'وَأَتْ',
          '2d': 'وَأَيْتُمَا',
          '3md': 'وَأَيَا',
          '3fd': 'وَأَتَا',
          '1p': 'وَأَيْنَا',
          '2mp': 'وَأَيْتُمْ',
          '2fp': 'وَأَيْتُنَّ',
          '3mp': 'وَأَوا',
          '3fp': 'وَأَيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'أَوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePast(getVerb('أوي', 1))).toEqual({
          '1s': 'أَوَيْتُ',
          '2ms': 'أَوَيْتَ',
          '2fs': 'أَوَيْتِ',
          '3ms': 'أَوَى',
          '3fs': 'أَوَتْ',
          '2d': 'أَوَيْتُمَا',
          '3md': 'أَوَيَا',
          '3fd': 'أَوَتَا',
          '1p': 'أَوَيْنَا',
          '2mp': 'أَوَيْتُمْ',
          '2fp': 'أَوَيْتُنَّ',
          '3mp': 'أَوَوا',
          '3fp': 'أَوَيْنَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['بدل', 'بَدَّلَ'],
        ['جمع', 'جَمَّعَ'],
        ['ذكر', 'ذَكَّرَ'],
        ['ضمن', 'ضَمَّنَ'],
        ['عمل', 'عَمَّلَ'],
        ['صبح', 'صَبَّحَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))).toMatchObject({
          '3ms': expected,
        })
      })

      test('كَتَّبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 2))).toEqual({
          '1s': 'كَتَّبْتُ',
          '2ms': 'كَتَّبْتَ',
          '2fs': 'كَتَّبْتِ',
          '3ms': 'كَتَّبَ',
          '3fs': 'كَتَّبَتْ',
          '2d': 'كَتَّبْتُمَا',
          '3md': 'كَتَّبَا',
          '3fd': 'كَتَّبَتَا',
          '1p': 'كَتَّبْنَا',
          '2mp': 'كَتَّبْتُمْ',
          '2fp': 'كَتَّبْتُنَّ',
          '3mp': 'كَتَّبُوا',
          '3fp': 'كَتَّبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'حَبَّبَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hollow roots', () => {
      test('قَوَّلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 2))).toEqual({
          '1s': 'قَوَّلْتُ',
          '2ms': 'قَوَّلْتَ',
          '2fs': 'قَوَّلْتِ',
          '3ms': 'قَوَّلَ',
          '3fs': 'قَوَّلَتْ',
          '2d': 'قَوَّلْتُمَا',
          '3md': 'قَوَّلَا',
          '3fd': 'قَوَّلَتَا',
          '1p': 'قَوَّلْنَا',
          '2mp': 'قَوَّلْتُمْ',
          '2fp': 'قَوَّلْتُنَّ',
          '3mp': 'قَوَّلُوا',
          '3fp': 'قَوَّلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('رَمَّى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 2))).toEqual({
          '1s': 'رَمَّيْتُ',
          '2ms': 'رَمَّيْتَ',
          '2fs': 'رَمَّيْتِ',
          '3ms': 'رَمَّى',
          '3fs': 'رَمَّتْ',
          '2d': 'رَمَّيْتُمَا',
          '3md': 'رَمَّيَا',
          '3fd': 'رَمَّتَا',
          '1p': 'رَمَّيْنَا',
          '2mp': 'رَمَّيْتُمْ',
          '2fp': 'رَمَّيْتُنَّ',
          '3mp': 'رَمَّوا',
          '3fp': 'رَمَّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('وَفَّى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 2))).toEqual({
          '1s': 'وَفَّيْتُ',
          '2ms': 'وَفَّيْتَ',
          '2fs': 'وَفَّيْتِ',
          '3ms': 'وَفَّى',
          '3fs': 'وَفَّتْ',
          '2d': 'وَفَّيْتُمَا',
          '3md': 'وَفَّيَا',
          '3fd': 'وَفَّتَا',
          '1p': 'وَفَّيْنَا',
          '2mp': 'وَفَّيْتُمْ',
          '2fp': 'وَفَّيْتُنَّ',
          '3mp': 'وَفَّوا',
          '3fp': 'وَفَّيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أكد', 'أَكَّدَ'],
        ['أثر', 'أَثَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([['أود', 'أَوَّدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَيَّدَ conjugation', () => {
        expect(conjugatePast(getVerb('أيد', 2))).toEqual({
          '1s': 'أَيَّدْتُ',
          '2ms': 'أَيَّدْتَ',
          '2fs': 'أَيَّدْتِ',
          '3ms': 'أَيَّدَ',
          '3fs': 'أَيَّدَتْ',
          '2d': 'أَيَّدْتُمَا',
          '3md': 'أَيَّدَا',
          '3fd': 'أَيَّدَتَا',
          '1p': 'أَيَّدْنَا',
          '2mp': 'أَيَّدْتُمْ',
          '2fp': 'أَيَّدْتُنَّ',
          '3mp': 'أَيَّدُوا',
          '3fp': 'أَيَّدْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['حرب', 'حَارَبَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))).toMatchObject({
          '3ms': expected,
        })
      })

      test('كَاتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 3))).toEqual({
          '1s': 'كَاتَبْتُ',
          '2ms': 'كَاتَبْتَ',
          '2fs': 'كَاتَبْتِ',
          '3ms': 'كَاتَبَ',
          '3fs': 'كَاتَبَتْ',
          '2d': 'كَاتَبْتُمَا',
          '3md': 'كَاتَبَا',
          '3fd': 'كَاتَبَتَا',
          '1p': 'كَاتَبْنَا',
          '2mp': 'كَاتَبْتُمْ',
          '2fp': 'كَاتَبْتُنَّ',
          '3mp': 'كَاتَبُوا',
          '3fp': 'كَاتَبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'عَاوَنَ'],
        ['قود', 'قَاوَدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))).toMatchObject({
          '3ms': expected,
        })
      })

      test('قَاوَلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 3))).toEqual({
          '1s': 'قَاوَلْتُ',
          '2ms': 'قَاوَلْتَ',
          '2fs': 'قَاوَلْتِ',
          '3ms': 'قَاوَلَ',
          '3fs': 'قَاوَلَتْ',
          '2d': 'قَاوَلْتُمَا',
          '3md': 'قَاوَلَا',
          '3fd': 'قَاوَلَتَا',
          '1p': 'قَاوَلْنَا',
          '2mp': 'قَاوَلْتُمْ',
          '2fp': 'قَاوَلْتُنَّ',
          '3mp': 'قَاوَلُوا',
          '3fp': 'قَاوَلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('وَافَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 3))).toEqual({
          '1s': 'وَافَيْتُ',
          '2ms': 'وَافَيْتَ',
          '2fs': 'وَافَيْتِ',
          '3ms': 'وَافَى',
          '3fs': 'وَافَتْ',
          '2d': 'وَافَيْتُمَا',
          '3md': 'وَافَيَا',
          '3fd': 'وَافَتَا',
          '1p': 'وَافَيْنَا',
          '2mp': 'وَافَيْتُمْ',
          '2fp': 'وَافَيْتُنَّ',
          '3mp': 'وَافَوا',
          '3fp': 'وَافَيْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test('سَاءَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 3))).toEqual({
          '1s': 'سَاءَلْتُ',
          '2ms': 'سَاءَلْتَ',
          '2fs': 'سَاءَلْتِ',
          '3ms': 'سَاءَلَ',
          '3fs': 'سَاءَلَتْ',
          '2d': 'سَاءَلْتُمَا',
          '3md': 'سَاءَلَا',
          '3fd': 'سَاءَلَتَا',
          '1p': 'سَاءَلْنَا',
          '2mp': 'سَاءَلْتُمْ',
          '2fp': 'سَاءَلْتُنَّ',
          '3mp': 'سَاءَلُوا',
          '3fp': 'سَاءَلْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'أَمْكَنَ'],
        ['صبح', 'أَصْبَحَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَكْتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 4))).toEqual({
          '1s': 'أَكْتَبْتُ',
          '2ms': 'أَكْتَبْتَ',
          '2fs': 'أَكْتَبْتِ',
          '3ms': 'أَكْتَبَ',
          '3fs': 'أَكْتَبَتْ',
          '2d': 'أَكْتَبْتُمَا',
          '3md': 'أَكْتَبَا',
          '3fd': 'أَكْتَبَتَا',
          '1p': 'أَكْتَبْنَا',
          '2mp': 'أَكْتَبْتُمْ',
          '2fp': 'أَكْتَبْتُنَّ',
          '3mp': 'أَكْتَبُوا',
          '3fp': 'أَكْتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'أَحَبَّ'],
        ['عدد', 'أَعَدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['عون', 'أَعَانَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['مسي', 'أَمْسَى'],
        ['ضحي', 'أَضْحَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أعطى conjugation', () => {
        expect(conjugatePast(getVerb('عطى', 4))).toEqual({
          '1s': 'أَعْطَيْتُ',
          '2ms': 'أَعْطَيْتَ',
          '2fs': 'أَعْطَيْتِ',
          '3ms': 'أَعْطَى',
          '3fs': 'أَعْطَتْ',
          '2d': 'أَعْطَيْتُمَا',
          '3md': 'أَعْطَيَا',
          '3fd': 'أَعْطَتَا',
          '1p': 'أَعْطَيْنَا',
          '2mp': 'أَعْطَيْتُمْ',
          '2fp': 'أَعْطَيْتُنَّ',
          '3mp': 'أَعْطَوا',
          '3fp': 'أَعْطَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('أَوْفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 4))).toEqual({
          '1s': 'أَوْفَيْتُ',
          '2ms': 'أَوْفَيْتَ',
          '2fs': 'أَوْفَيْتِ',
          '3ms': 'أَوْفَى',
          '3fs': 'أَوْفَتْ',
          '2d': 'أَوْفَيْتُمَا',
          '3md': 'أَوْفَيَا',
          '3fd': 'أَوْفَتَا',
          '1p': 'أَوْفَيْنَا',
          '2mp': 'أَوْفَيْتُمْ',
          '2fp': 'أَوْفَيْتُنَّ',
          '3mp': 'أَوْفَوا',
          '3fp': 'أَوْفَيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أمن', 'آمَنَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['أنشأ', 'أَنْشَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['جيء', 'أَجَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })

      test('أَجَاءَ conjugation', () => {
        expect(conjugatePast(getVerb('جيء', 4))).toEqual({
          '3ms': 'أَجَاءَ',
          '3fs': 'أَجَاءَتْ',
          '3md': 'أَجَاءَا',
          '3fd': 'أَجَاءَتَا',
          '3mp': 'أَجَاؤُوا',
          '3fp': 'أَجِئْنَ',
          '2ms': 'أَجِئْتَ',
          '2fs': 'أَجِئْتِ',
          '2d': 'أَجِئْتُمَا',
          '2mp': 'أَجِئْتُمْ',
          '2fp': 'أَجِئْتُنَّ',
          '1s': 'أَجِئْتُ',
          '1p': 'أَجِئْنَا',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'آوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))).toMatchObject({
          '3ms': expected,
        })
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'تَضَمَّنَ'],
        ['جمع', 'تَجَمَّعَ'],
        ['طلب', 'تَطَلَّبَ'],
        ['علم', 'تَعَلَّمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))).toMatchObject({
          '3ms': expected,
        })
      })

      test('تَكَتَّبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 5))).toEqual({
          '1s': 'تَكَتَّبْتُ',
          '2ms': 'تَكَتَّبْتَ',
          '2fs': 'تَكَتَّبْتِ',
          '3ms': 'تَكَتَّبَ',
          '3fs': 'تَكَتَّبَتْ',
          '2d': 'تَكَتَّبْتُمَا',
          '3md': 'تَكَتَّبَا',
          '3fd': 'تَكَتَّبَتَا',
          '1p': 'تَكَتَّبْنَا',
          '2mp': 'تَكَتَّبْتُمْ',
          '2fp': 'تَكَتَّبْتُنَّ',
          '3mp': 'تَكَتَّبُوا',
          '3fp': 'تَكَتَّبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'تَحَبَّبَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('assimilated roots', () => {
      test('تَوَعَّدَ conjugation', () => {
        expect(conjugatePast(getVerb('وعد', 5))).toEqual({
          '1s': 'تَوَعَّدْتُ',
          '2ms': 'تَوَعَّدْتَ',
          '2fs': 'تَوَعَّدْتِ',
          '3ms': 'تَوَعَّدَ',
          '3fs': 'تَوَعَّدَتْ',
          '2d': 'تَوَعَّدْتُمَا',
          '3md': 'تَوَعَّدَا',
          '3fd': 'تَوَعَّدَتَا',
          '1p': 'تَوَعَّدْنَا',
          '2mp': 'تَوَعَّدْتُمْ',
          '2fp': 'تَوَعَّدْتُنَّ',
          '3mp': 'تَوَعَّدُوا',
          '3fp': 'تَوَعَّدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['حول', 'تَحَوَّلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))).toMatchObject({
          '3ms': expected,
        })
      })

      test('تَقَوَّلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 5))).toEqual({
          '1s': 'تَقَوَّلْتُ',
          '2ms': 'تَقَوَّلْتَ',
          '2fs': 'تَقَوَّلْتِ',
          '3ms': 'تَقَوَّلَ',
          '3fs': 'تَقَوَّلَتْ',
          '2d': 'تَقَوَّلْتُمَا',
          '3md': 'تَقَوَّلَا',
          '3fd': 'تَقَوَّلَتَا',
          '1p': 'تَقَوَّلْنَا',
          '2mp': 'تَقَوَّلْتُمْ',
          '2fp': 'تَقَوَّلْتُنَّ',
          '3mp': 'تَقَوَّلُوا',
          '3fp': 'تَقَوَّلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('تَوَفَّى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 5))).toEqual({
          '1s': 'تَوَفَّيْتُ',
          '2ms': 'تَوَفَّيْتَ',
          '2fs': 'تَوَفَّيْتِ',
          '3ms': 'تَوَفَّى',
          '3fs': 'تَوَفَّتْ',
          '2d': 'تَوَفَّيْتُمَا',
          '3md': 'تَوَفَّيَا',
          '3fd': 'تَوَفَّتَا',
          '1p': 'تَوَفَّيْنَا',
          '2mp': 'تَوَفَّيْتُمْ',
          '2fp': 'تَوَفَّيْتُنَّ',
          '3mp': 'تَوَفَّوا',
          '3fp': 'تَوَفَّيْنَ',
        })
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test('تَكَاتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 6))).toEqual({
          '1s': 'تَكَاتَبْتُ',
          '2ms': 'تَكَاتَبْتَ',
          '2fs': 'تَكَاتَبْتِ',
          '3ms': 'تَكَاتَبَ',
          '3fs': 'تَكَاتَبَتْ',
          '2d': 'تَكَاتَبْتُمَا',
          '3md': 'تَكَاتَبَا',
          '3fd': 'تَكَاتَبَتَا',
          '1p': 'تَكَاتَبْنَا',
          '2mp': 'تَكَاتَبْتُمْ',
          '2fp': 'تَكَاتَبْتُنَّ',
          '3mp': 'تَكَاتَبُوا',
          '3fp': 'تَكَاتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'تَحَابَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))).toMatchObject({
          '3ms': expected,
        })
      })

      test('تَحَابَّ conjugation', () => {
        expect(conjugatePast(getVerb('حبب', 6))).toEqual({
          '1s': 'تَحَابَبْتُ',
          '2ms': 'تَحَابَبْتَ',
          '2fs': 'تَحَابَبْتِ',
          '3ms': 'تَحَابَّ',
          '3fs': 'تَحَابَّتْ',
          '2d': 'تَحَابَبْتُمَا',
          '3md': 'تَحَابَّا',
          '3fd': 'تَحَابَّتَا',
          '1p': 'تَحَابَبْنَا',
          '2mp': 'تَحَابَبْتُمْ',
          '2fp': 'تَحَابَبْتُنَّ',
          '3mp': 'تَحَابُّوا',
          '3fp': 'تَحَابَبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['عون', 'تَعَاوَنَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hamzated middle roots', () => {
      test('تَسَاءَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 6))).toEqual({
          '1s': 'تَسَاءَلْتُ',
          '2ms': 'تَسَاءَلْتَ',
          '2fs': 'تَسَاءَلْتِ',
          '3ms': 'تَسَاءَلَ',
          '3fs': 'تَسَاءَلَتْ',
          '2d': 'تَسَاءَلْتُمَا',
          '3md': 'تَسَاءَلَا',
          '3fd': 'تَسَاءَلَتَا',
          '1p': 'تَسَاءَلْنَا',
          '2mp': 'تَسَاءَلْتُمْ',
          '2fp': 'تَسَاءَلْتُنَّ',
          '3mp': 'تَسَاءَلُوا',
          '3fp': 'تَسَاءَلْنَ',
        })
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([['جيء', 'تَجَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))).toMatchObject({
          '3ms': expected,
        })
      })

      test('Form VI hollow verb with final hamza for تَجَاءَ', () => {
        expect(conjugatePast(getVerb('جيء', 6))).toEqual({
          '3ms': 'تَجَاءَ',
          '3fs': 'تَجَاءَتْ',
          '3md': 'تَجَاءَا',
          '3fd': 'تَجَاءَتَا',
          '3mp': 'تَجَاؤُوا',
          '3fp': 'تَجِئْنَ',
          '2ms': 'تَجِئْتَ',
          '2fs': 'تَجِئْتِ',
          '2d': 'تَجِئْتُمَا',
          '2mp': 'تَجِئْتُمْ',
          '2fp': 'تَجِئْتُنَّ',
          '1s': 'تَجِئْتُ',
          '1p': 'تَجِئْنَا',
        })
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([['فجر', 'اِنْفَجَرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))).toMatchObject({
          '3ms': expected,
        })
      })

      test('اِنْكَتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 7))).toEqual({
          '1s': 'اِنْكَتَبْتُ',
          '2ms': 'اِنْكَتَبْتَ',
          '2fs': 'اِنْكَتَبْتِ',
          '3ms': 'اِنْكَتَبَ',
          '3fs': 'اِنْكَتَبَتْ',
          '2d': 'اِنْكَتَبْتُمَا',
          '3md': 'اِنْكَتَبَا',
          '3fd': 'اِنْكَتَبَتَا',
          '1p': 'اِنْكَتَبْنَا',
          '2mp': 'اِنْكَتَبْتُمْ',
          '2fp': 'اِنْكَتَبْتُنَّ',
          '3mp': 'اِنْكَتَبُوا',
          '3fp': 'اِنْكَتَبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'اِنْقَادَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('defective roots', () => {
      test('اِنْرَمَى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 7))).toEqual({
          '1s': 'اِنْرَمَيْتُ',
          '2ms': 'اِنْرَمَيْتَ',
          '2fs': 'اِنْرَمَيْتِ',
          '3ms': 'اِنْرَمَى',
          '3fs': 'اِنْرَمَتْ',
          '2d': 'اِنْرَمَيْتُمَا',
          '3md': 'اِنْرَمَيَا',
          '3fd': 'اِنْرَمَتَا',
          '1p': 'اِنْرَمَيْنَا',
          '2mp': 'اِنْرَمَيْتُمْ',
          '2fp': 'اِنْرَمَيْتُنَّ',
          '3mp': 'اِنْرَمَوا',
          '3fp': 'اِنْرَمَيْنَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([['قرح', 'اِقْتَرَحَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'اِتَّصَلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'اِقْتَادَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('defective roots', () => {
      test.each([['نهي', 'اِنْتَهَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('اِتَّخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 8))).toEqual({
          '1s': 'اِتَّخَذْتُ',
          '2ms': 'اِتَّخَذْتَ',
          '2fs': 'اِتَّخَذْتِ',
          '3ms': 'اِتَّخَذَ',
          '3fs': 'اِتَّخَذَتْ',
          '2d': 'اِتَّخَذْتُمَا',
          '3md': 'اِتَّخَذَا',
          '3fd': 'اِتَّخَذَتَا',
          '1p': 'اِتَّخَذْنَا',
          '2mp': 'اِتَّخَذْتُمْ',
          '2fp': 'اِتَّخَذْتُنَّ',
          '3mp': 'اِتَّخَذُوا',
          '3fp': 'اِتَّخَذْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([['حمر', 'اِحْمَرَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 9))).toMatchObject({
          '3ms': expected,
        })
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['بدل', 'اِسْتَبْدَلَ'],
        ['عمل', 'اِسْتَعْمَلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'اِسْتَحَبَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))).toMatchObject({
          '3ms': expected,
        })
      })

      test('اِسْتَحَمَّ conjugation', () => {
        expect(conjugatePast(getVerb('حمم', 10))).toEqual({
          '1s': 'اِسْتَحْمَمْتُ',
          '2ms': 'اِسْتَحْمَمْتَ',
          '2fs': 'اِسْتَحْمَمْتِ',
          '3ms': 'اِسْتَحَمَّ',
          '3fs': 'اِسْتَحَمَّتْ',
          '2d': 'اِسْتَحْمَمْتُمَا',
          '3md': 'اِسْتَحَمَّا',
          '3fd': 'اِسْتَحَمَّتَا',
          '1p': 'اِسْتَحْمَمْنَا',
          '2mp': 'اِسْتَحْمَمْتُمْ',
          '2fp': 'اِسْتَحْمَمْتُنَّ',
          '3mp': 'اِسْتَحَمُّوا',
          '3fp': 'اِسْتَحْمَمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'اِسْتَعَانَ'],
        ['قود', 'اِسْتَقَادَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَوْفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 10))).toEqual({
          '1s': 'اِسْتَوْفَيْتُ',
          '2ms': 'اِسْتَوْفَيْتَ',
          '2fs': 'اِسْتَوْفَيْتِ',
          '3ms': 'اِسْتَوْفَى',
          '3fs': 'اِسْتَوْفَتْ',
          '2d': 'اِسْتَوْفَيْتُمَا',
          '3md': 'اِسْتَوْفَيَا',
          '3fd': 'اِسْتَوْفَتَا',
          '1p': 'اِسْتَوْفَيْنَا',
          '2mp': 'اِسْتَوْفَيْتُمْ',
          '2fp': 'اِسْتَوْفَيْتُنَّ',
          '3mp': 'اِسْتَوْفَوا',
          '3fp': 'اِسْتَوْفَيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('اِسْتَأْخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 10))).toEqual({
          '1s': 'اِسْتَأْخَذْتُ',
          '2ms': 'اِسْتَأْخَذْتَ',
          '2fs': 'اِسْتَأْخَذْتِ',
          '3ms': 'اِسْتَأْخَذَ',
          '3fs': 'اِسْتَأْخَذَتْ',
          '2d': 'اِسْتَأْخَذْتُمَا',
          '3md': 'اِسْتَأْخَذَا',
          '3fd': 'اِسْتَأْخَذَتَا',
          '1p': 'اِسْتَأْخَذْنَا',
          '2mp': 'اِسْتَأْخَذْتُمْ',
          '2fp': 'اِسْتَأْخَذْتُنَّ',
          '3mp': 'اِسْتَأْخَذُوا',
          '3fp': 'اِسْتَأْخَذْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugatePast(getVerb('قرأ', 10))).toEqual({
          '1s': 'اِسْتَقْرَأْتُ',
          '2ms': 'اِسْتَقْرَأْتَ',
          '2fs': 'اِسْتَقْرَأْتِ',
          '3ms': 'اِسْتَقْرَأَ',
          '3fs': 'اِسْتَقْرَأَتْ',
          '2d': 'اِسْتَقْرَأْتُمَا',
          '3md': 'اِسْتَقْرَآ',
          '3fd': 'اِسْتَقْرَأَتَا',
          '1p': 'اِسْتَقْرَأْنَا',
          '2mp': 'اِسْتَقْرَأْتُمْ',
          '2fp': 'اِسْتَقْرَأْتُنَّ',
          '3mp': 'اِسْتَقْرَأُوا',
          '3fp': 'اِسْتَقْرَأْنَ',
        })
      })
    })
  })
})
