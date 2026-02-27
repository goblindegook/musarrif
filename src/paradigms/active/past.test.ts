import { describe, expect, test } from 'vitest'
import { getVerb, verbs } from '../verbs'
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
        ['كلم', 'كَلَمَ'],
        ['قدم', 'قَدُمَ'],
        ['نفس', 'نَفُسَ'],
        ['مكن', 'مَكُنَ'],
        ['حضر', 'حَضَرَ'],
        ['ضمن', 'ضَمِنَ'],
        ['عمل', 'عَمِلَ'],
        ['بلغ', 'بَلَغَ'],
        ['صبح', 'صَبَحَ'],
        ['بعد', 'بَعِدَ'],
        ['مثل', 'مَثَلَ'],
        ['نظر', 'نَظَرَ'],
        ['صغر', 'صَغُرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 1))).toEqualT({
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
          '3mp': 'كَتَبُوْا',
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
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('حَبَّ conjugation', () => {
        expect(conjugatePast(getVerb('حبب', 1))).toEqualT({
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
          '3mp': 'حَبُّوْا',
          '3fp': 'حَبَبْنَ',
        })
      })

      test('قَرَّ conjugation', () => {
        expect(conjugatePast(getVerb('قرر', 1))).toEqualT({
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
          '3mp': 'قَرُّوْا',
          '3fp': 'قَرِرْنَ',
        })
      })

      test('ظَلَّ conjugation', () => {
        expect(conjugatePast(getVerb('ظلل', 1))).toEqualT({
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
          '3mp': 'ظَلُّوْا',
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
        ['وقف', 'وَقَفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('وَعَدَ conjugation', () => {
        expect(conjugatePast(getVerb('وعد', 1))).toEqualT({
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
          '3mp': 'وَعَدُوْا',
          '3fp': 'وَعَدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['باع', 'بَاعَ'],
        ['زيد', 'زَادَ'],
        ['زور', 'زَارَ'],
        ['لوم', 'لَامَ'],
        ['موت', 'مَاتَ'],
        ['بيت', 'بَاتَ'],
        ['خور', 'خَوِرَ'],
        ['حول', 'حَالَ'],
        ['عوم', 'عَامَ'],
        ['قول', 'قَالَ'],
        ['عوز', 'عَوِزَ'],
        ['ميل', 'مَيِلَ'],
        ['صير', 'صَارَ'],
        ['جيد', 'جَيِدَ'],
        ['خوف', 'خَافَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePast(getVerb('عوز', 1))).toEqualT({
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
          '3mp': 'عَوِزُوْا',
          '3fp': 'عَوِزْنَ',
        })
      })

      test('بَاتَ conjugation', () => {
        expect(conjugatePast(getVerb('بيت', 1))).toEqualT({
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
          '3mp': 'بَاتُوْا',
          '3fp': 'بِتْنَ',
        })
      })

      test('كَانَ conjugation', () => {
        expect(conjugatePast(getVerb('كان', 1))).toEqualT({
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
          '3mp': 'كَانُوْا',
          '3fp': 'كُنَّ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePast(getVerb('شيد', 1))).toEqualT({
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
          '3mp': 'شَادُوْا',
          '3fp': 'شِدْنَ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugatePast(getVerb('جيد', 1))).toEqualT({
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
          '3mp': 'جَيِدُوْا',
          '3fp': 'جَيِدْنَ',
        })
      })

      test('قَالَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 1))).toEqualT({
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
          '3mp': 'قَالُوْا',
          '3fp': 'قُلْنَ',
        })
      })

      test('shorten with suffixes for hollow verbs like قال', () => {
        expect(conjugatePast(getVerb('قول', 1))).toEqualT({
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
          '3mp': 'قَالُوْا',
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
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('رَمَى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 1))).toEqualT({
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
          '3mp': 'رَمَوْا',
          '3fp': 'رَمَيْنَ',
        })
      })

      // Verified against Wiktionary's conjugation table for بَقِيَ (Form I, final-weak i~a).
      test('بَقِيَ conjugation', () => {
        expect(conjugatePast(getVerb('بقي', 1))).toEqualT({
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
          '3mp': 'بَقُوْا',
          '3fp': 'بَقِينَ',
        })
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePast(getVerb('دعا', 1))).toEqualT({
          '1s': 'دَعَوْتُ',
          '2ms': 'دَعَوْتَ',
          '2fs': 'دَعَوْتِ',
          '3ms': 'دَعَا',
          '3fs': 'دَعَتْ',
          '2d': 'دَعَوْتُمَا',
          '3md': 'دَعَوْا',
          '3fd': 'دَعَتَا',
          '1p': 'دَعَوْنَا',
          '2mp': 'دَعَوْتُمْ',
          '2fp': 'دَعَوْتُنَّ',
          '3mp': 'دَعَوْا',
          '3fp': 'دَعَوْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وني', 'وَنَى'],
        ['ولي', 'وَلِيَ'],
        ['وعي', 'وَعَى'],
        ['وفي', 'وَفَى'],
        ['وقي', 'وَقَى'],
        ['وري', 'وَرَى'],
        ['قوي', 'قَوِيَ'],
        ['جوي', 'جَوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('روي pattern (a/i)', () => {
        // biome-ignore lint/style/noNonNullAssertion: must exist
        const verb = verbs.find(
          (entry) => entry.form === 1 && entry.root === 'روي' && entry.formPattern === 'fa3ala-yaf3ilu',
        )!
        expect(conjugatePast(verb)['3ms']).toEqualT('رَوَى')
      })

      test('وَفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 1))).toEqualT({
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
          '3mp': 'وَفَوْا',
          '3fp': 'وَفَيْنَ',
        })
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePast(getVerb('روي', 1))).toEqualT({
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
          '3mp': 'رَوُوْا',
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
        ['أمر', 'أَمَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 1))).toEqualT({
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
          '3mp': 'أَخَذُوْا',
          '3fp': 'أَخَذْنَ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['أمم', 'أَمَّ'],
        ['أدد', 'أَدَّ'],
        ['أجج', 'أَجَّ'],
        ['أزز', 'أَزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePast(getVerb('أمم', 1))).toEqualT({
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
          '3mp': 'أَمُّوْا',
          '3fp': 'أَمَمْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'يَئِسَ'],
        ['بءس', 'بَؤُسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('سَأَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 1))).toEqualT({
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
          '3mp': 'سَأَلُوْا',
          '3fp': 'سَأَلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['وطء', 'وَطِئَ'],
        ['كلأ', 'كَلَأَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('جَرُؤَ conjugation', () => {
        expect(conjugatePast(getVerb('جرء', 1))).toEqualT({
          '1s': 'جَرُؤْتُ',
          '2ms': 'جَرُؤْتَ',
          '2fs': 'جَرُؤْتِ',
          '3ms': 'جَرُؤَ',
          '3fs': 'جَرُؤَتْ',
          '2d': 'جَرُؤْتُمَا',
          '3md': 'جَرُؤَا',
          '3fd': 'جَرُؤَتَا',
          '1p': 'جَرُؤْنَا',
          '2mp': 'جَرُؤْتُمْ',
          '2fp': 'جَرُؤْتُنَّ',
          '3mp': 'جَرُؤُوْا',
          '3fp': 'جَرُؤْنَ',
        })
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePast(getVerb('بدأ', 1))).toEqualT({
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
          '3mp': 'بَدَأُوْا',
          '3fp': 'بَدَأْنَ',
        })
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePast(getVerb('قرأ', 1))).toEqualT({
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
          '3mp': 'قَرَأُوْا',
          '3fp': 'قَرَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePast(getVerb('كلأ', 1))).toEqualT({
          '1s': 'كَلَأْتُ',
          '2ms': 'كَلَأْتَ',
          '2fs': 'كَلَأْتِ',
          '3ms': 'كَلَأَ',
          '3fs': 'كَلَأَتْ',
          '2d': 'كَلَأْتُمَا',
          '3md': 'كَلَآ',
          '3fd': 'كَلَأَتَا',
          '1p': 'كَلَأْنَا',
          '2mp': 'كَلَأْتُمْ',
          '2fp': 'كَلَأْتُنَّ',
          '3mp': 'كَلَأُوْا',
          '3fp': 'كَلَأْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['جيء', 'جَاءَ'],
        ['بوء', 'بَاءَ'],
        ['نوء', 'نَاءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('جَاءَ conjugation', () => {
        expect(conjugatePast(getVerb('جيء', 1))).toEqualT({
          '3ms': 'جَاءَ',
          '3fs': 'جَاءَتْ',
          '3md': 'جَاءَا',
          '3fd': 'جَاءَتَا',
          '3mp': 'جَاؤُوْا',
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
        expect(conjugatePast(getVerb('جيء', 1))).toEqualT({
          '3ms': 'جَاءَ',
          '3fs': 'جَاءَتْ',
          '3md': 'جَاءَا',
          '3fd': 'جَاءَتَا',
          '3mp': 'جَاؤُوْا',
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

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'آلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('آلَ conjugation', () => {
        expect(conjugatePast(getVerb('أول', 1))).toEqualT({
          '1s': 'أُلْتُ',
          '2ms': 'أُلْتَ',
          '2fs': 'أُلْتِ',
          '3ms': 'آلَ',
          '3fs': 'آلَتْ',
          '2d': 'أُلْتُمَا',
          '3md': 'آلَا',
          '3fd': 'آلَتَا',
          '1p': 'أُلْنَا',
          '2mp': 'أُلْتُمْ',
          '2fp': 'أُلْتُنَّ',
          '3mp': 'آلُوْا',
          '3fp': 'أُلْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أتي', 'أَتَى'],
        ['أبي', 'أَبَى'],
        ['أني', 'أَنَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePast(getVerb('أتي', 1))).toEqualT({
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
          '3mp': 'أَتَوْا',
          '3fp': 'أَتَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'رَأَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePast(getVerb('رءي', 1))).toEqualT({
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
          '3mp': 'رَأَوْا',
          '3fp': 'رَأَيْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugatePast(getVerb('وءي', 1))).toEqualT({
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
          '3mp': 'وَأَوْا',
          '3fp': 'وَأَيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'أَوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 1))['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePast(getVerb('أوي', 1))).toEqualT({
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
          '3mp': 'أَوَوْا',
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
        ['مكن', 'مَكَّنَ'],
        ['مثل', 'مَثَّلَ'],
        ['سبب', 'سَبَّبَ'],
        ['خطط', 'خَطَّطَ'],
        ['صبح', 'صَبَّحَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('كَتَّبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 2))).toEqualT({
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
          '3mp': 'كَتَّبُوْا',
          '3fp': 'كَتَّبْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'وَطَّنَ'],
        ['وجه', 'وَجَّهَ'],
        ['وقف', 'وَقَّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('وَسَّطَ conjugation', () => {
        expect(conjugatePast(getVerb('وسط', 2))).toEqualT({
          '1s': 'وَسَّطْتُ',
          '2ms': 'وَسَّطْتَ',
          '2fs': 'وَسَّطْتِ',
          '3ms': 'وَسَّطَ',
          '3fs': 'وَسَّطَتْ',
          '2d': 'وَسَّطْتُمَا',
          '3md': 'وَسَّطَا',
          '3fd': 'وَسَّطَتَا',
          '1p': 'وَسَّطْنَا',
          '2mp': 'وَسَّطْتُمْ',
          '2fp': 'وَسَّطْتُنَّ',
          '3mp': 'وَسَّطُوْا',
          '3fp': 'وَسَّطْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'حَبَّبَ'],
        ['حدد', 'حَدَّدَ'],
        ['قرر', 'قَرَّرَ'],
        ['شدد', 'شَدَّدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'قَوَّسَ'],
        ['كون', 'كَوَّنَ'],
        ['دون', 'دَوَّنَ'],
        ['سوف', 'سَوَّفَ'],
        ['كيف', 'كَيَّفَ'],
        ['أول', 'أَوَّلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('قَوَّلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 2))).toEqualT({
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
          '3mp': 'قَوَّلُوْا',
          '3fp': 'قَوَّلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'هَنَّأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخر', 'أَخَّرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['أذي', 'أَذَّى'],
        ['أسي', 'أَسَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('رَمَّى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 2))).toEqualT({
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
          '3mp': 'رَمَّوْا',
          '3fp': 'رَمَّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يَوَّدَ'],
        ['وفي', 'وَفَّى'],
        ['وصي', 'وَصَّى'],
        ['ولي', 'وَلَّى'],
        ['وري', 'وَرَّى'],
        ['مني', 'مَنَّى'],
        ['سمي', 'سَمَّى'],
        ['غطي', 'غَطَّى'],
        ['غني', 'غَنَّى'],
        ['قوي', 'قَوَّى'],
        ['زوي', 'زَوَّى'],
        ['هوي', 'هَوَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('وَفَّى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 2))).toEqualT({
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
          '3mp': 'وَفَّوْا',
          '3fp': 'وَفَّيْنَ',
        })
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePast(getVerb('حيي', 2))).toEqualT({
          '1s': 'حَيَّيْتُ',
          '2ms': 'حَيَّيْتَ',
          '2fs': 'حَيَّيْتِ',
          '3ms': 'حَيَّا',
          '3fs': 'حَيَّتْ',
          '2d': 'حَيَّيْتُمَا',
          '3md': 'حَيَّيَا',
          '3fd': 'حَيَّتَا',
          '1p': 'حَيَّيْنَا',
          '2mp': 'حَيَّيْتُمْ',
          '2fp': 'حَيَّيْتُنَّ',
          '3mp': 'حَيَّوْا',
          '3fp': 'حَيَّيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أكد', 'أَكَّدَ'],
        ['أثر', 'أَثَّرَ'],
        ['أجج', 'أَجَّجَ'],
        ['أسس', 'أَسَّسَ'],
        ['أخر', 'أَخَّرَ'],
        ['أمر', 'أَمَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([
        ['أود', 'أَوَّدَ'],
        ['أوب', 'أَوَّبَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 2))['3ms']).toEqualT(expected)
      })

      test('أَيَّدَ conjugation', () => {
        expect(conjugatePast(getVerb('أيد', 2))).toEqualT({
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
          '3mp': 'أَيَّدُوْا',
          '3fp': 'أَيَّدْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَطَّأَ conjugation', () => {
        expect(conjugatePast(getVerb('وطء', 2))).toEqualT({
          '1s': 'وَطَّأْتُ',
          '2ms': 'وَطَّأْتَ',
          '2fs': 'وَطَّأْتِ',
          '3ms': 'وَطَّأَ',
          '3fs': 'وَطَّأَتْ',
          '2d': 'وَطَّأْتُمَا',
          '3md': 'وَطَّآ',
          '3fd': 'وَطَّأَتَا',
          '1p': 'وَطَّأْنَا',
          '2mp': 'وَطَّأْتُمْ',
          '2fp': 'وَطَّأْتُنَّ',
          '3mp': 'وَطَّأُوْا',
          '3fp': 'وَطَّأْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['حرب', 'حَارَبَ'],
        ['عمل', 'عَامَلَ'],
        ['كلم', 'كَالَمَ'],
        ['تبع', 'تَابَعَ'],
        ['بلغ', 'بَالَغَ'],
        ['سعد', 'سَاعَدَ'],
        ['صحب', 'صَاحَبَ'],
        ['وجه', 'وَاجَهَ'],
        ['وثق', 'وَاثَقَ'],
        ['وعد', 'وَاعَدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('كَاتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 3))).toEqualT({
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
          '3mp': 'كَاتَبُوْا',
          '3fp': 'كَاتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'سَارَّ'],
        ['ردد', 'رَادَّ'],
        ['مدد', 'مَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePast(getVerb('سرر', 3))).toEqualT({
          '1s': 'سَارَرْتُ',
          '2ms': 'سَارَرْتَ',
          '2fs': 'سَارَرْتِ',
          '3ms': 'سَارَّ',
          '3fs': 'سَارَّتْ',
          '2d': 'سَارَرْتُمَا',
          '3md': 'سَارَّا',
          '3fd': 'سَارَّتَا',
          '1p': 'سَارَرْنَا',
          '2mp': 'سَارَرْتُمْ',
          '2fp': 'سَارَرْتُنَّ',
          '3mp': 'سَارُّوْا',
          '3fp': 'سَارَرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePast(getVerb('ردد', 3))).toEqualT({
          '1s': 'رَادَدْتُ',
          '2ms': 'رَادَدْتَ',
          '2fs': 'رَادَدْتِ',
          '3ms': 'رَادَّ',
          '3fs': 'رَادَّتْ',
          '2d': 'رَادَدْتُمَا',
          '3md': 'رَادَّا',
          '3fd': 'رَادَّتَا',
          '1p': 'رَادَدْنَا',
          '2mp': 'رَادَدْتُمْ',
          '2fp': 'رَادَدْتُنَّ',
          '3mp': 'رَادُّوْا',
          '3fp': 'رَادَدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePast(getVerb('مدد', 3))).toEqualT({
          '1s': 'مَادَدْتُ',
          '2ms': 'مَادَدْتَ',
          '2fs': 'مَادَدْتِ',
          '3ms': 'مَادَّ',
          '3fs': 'مَادَّتْ',
          '2d': 'مَادَدْتُمَا',
          '3md': 'مَادَّا',
          '3fd': 'مَادَّتَا',
          '1p': 'مَادَدْنَا',
          '2mp': 'مَادَدْتُمْ',
          '2fp': 'مَادَدْتُنَّ',
          '3mp': 'مَادُّوْا',
          '3fp': 'مَادَدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'عَاوَنَ'],
        ['قود', 'قَاوَدَ'],
        ['قوم', 'قَاوَمَ'],
        ['عود', 'عَاوَدَ'],
        ['جوز', 'جَاوَزَ'],
        ['نول', 'نَاوَلَ'],
        ['ضيق', 'ضَايَقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('قَاوَلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 3))).toEqualT({
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
          '3mp': 'قَاوَلُوْا',
          '3fp': 'قَاوَلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'وَازَى'],
        ['وسي', 'وَاسَى'],
        ['نوي', 'نَاوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('وَافَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 3))).toEqualT({
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
          '3mp': 'وَافَوْا',
          '3fp': 'وَافَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'نَادَى'],
        ['رعي', 'رَاعَى'],
        ['بلي', 'بَالَى'],
        ['قضي', 'قَاضَى'],
        ['بري', 'بَارَى'],
        ['رءي', 'رَاءَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'آخَذَ'],
        ['أجر', 'آجَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['وأم', 'وَاءَمَ'],
        ['لأم', 'لَاءَمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })

      test('سَاءَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 3))).toEqualT({
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
          '3mp': 'سَاءَلُوْا',
          '3fp': 'سَاءَلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'فَاجَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 3))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'أَكْثَرَ'],
        ['علم', 'أَعْلَمَ'],
        ['لحق', 'أَلْحَقَ'],
        ['مكن', 'أَمْكَنَ'],
        ['صبح', 'أَصْبَحَ'],
        ['وقف', 'أَوْقَفَ'],
        ['وقع', 'أَوْقَعَ'],
        ['ولد', 'أَوْلَدَ'],
        ['وصل', 'أَوْصَلَ'],
        ['وضح', 'أَوْضَحَ'],
        ['عرب', 'أَعْرَبَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أَكْتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 4))).toEqualT({
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
          '3mp': 'أَكْتَبُوْا',
          '3fp': 'أَكْتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'أَتَمَّ'],
        ['سفف', 'أَسَفَّ'],
        ['حبب', 'أَحَبَّ'],
        ['عدد', 'أَعَدَّ'],
        ['همم', 'أَهَمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'أَعَانَ'],
        ['شور', 'أَشَارَ'],
        ['رود', 'أَرَادَ'],
        ['تيح', 'أَتَاحَ'],
        ['فيد', 'أَفَادَ'],
        ['عود', 'أَعَادَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'أَعْلَى'],
        ['بقي', 'أَبْقَى'],
        ['سمي', 'أَسْمَى'],
        ['مسي', 'أَمْسَى'],
        ['لقي', 'أَلْقَى'],
        ['ضحي', 'أَضْحَى'],
        ['عطي', 'أَعْطَى'],
        ['وصي', 'أَوْصَى'],
        ['وحي', 'أَوْحَى'],
        ['وفي', 'أَوْفَى'],
        ['ودي', 'أَوْدَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أعطي conjugation', () => {
        expect(conjugatePast(getVerb('عطي', 4))).toEqualT({
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
          '3mp': 'أَعْطَوْا',
          '3fp': 'أَعْطَيْنَ',
        })
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePast(getVerb('حيي', 4))).toEqualT({
          '1s': 'أَحْيَيْتُ',
          '2ms': 'أَحْيَيْتَ',
          '2fs': 'أَحْيَيْتِ',
          '3ms': 'أَحْيَا',
          '3fs': 'أَحْيَتْ',
          '2d': 'أَحْيَيْتُمَا',
          '3md': 'أَحْيَا',
          '3fd': 'أَحْيَتَا',
          '1p': 'أَحْيَيْنَا',
          '2mp': 'أَحْيَيْتُمْ',
          '2fp': 'أَحْيَيْتُنَّ',
          '3mp': 'أَحْيَوْا',
          '3fp': 'أَحْيَيْنَ',
        })
      })

      test('أَرَى conjugation', () => {
        expect(conjugatePast(getVerb('رءي', 4))).toEqualT({
          '1s': 'أَرَيْتُ',
          '2ms': 'أَرَيْتَ',
          '2fs': 'أَرَيْتِ',
          '3ms': 'أَرَى',
          '3fs': 'أَرَتْ',
          '2d': 'أَرَيْتُمَا',
          '3md': 'أَرَيَا',
          '3fd': 'أَرَتَا',
          '1p': 'أَرَيْنَا',
          '2mp': 'أَرَيْتُمْ',
          '2fp': 'أَرَيْتُنَّ',
          '3mp': 'أَرَوْا',
          '3fp': 'أَرَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('أَوْفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 4))).toEqualT({
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
          '3mp': 'أَوْفَوْا',
          '3fp': 'أَوْفَيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'آذَنَ'],
        ['أمن', 'آمَنَ'],
        ['ألم', 'آلَمَ'],
        ['أجر', 'آجَرَ'],
        ['أتي', 'آتَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نشأ', 'أَنْشَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['جيء', 'أَجَاءَ'],
        ['ضوء', 'أَضَاءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })

      test('أَجَاءَ conjugation', () => {
        expect(conjugatePast(getVerb('جيء', 4))).toEqualT({
          '3ms': 'أَجَاءَ',
          '3fs': 'أَجَاءَتْ',
          '3md': 'أَجَاءَا',
          '3fd': 'أَجَاءَتَا',
          '3mp': 'أَجَاؤُوْا',
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
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'تَضَمَّنَ'],
        ['جمع', 'تَجَمَّعَ'],
        ['حدث', 'تَحَدَّثَ'],
        ['مثل', 'تَمَثَّلَ'],
        ['عرف', 'تَعَرَّفَ'],
        ['طلب', 'تَطَلَّبَ'],
        ['علم', 'تَعَلَّمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَكَتَّبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 5))).toEqualT({
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
          '3mp': 'تَكَتَّبُوْا',
          '3fp': 'تَكَتَّبْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'تَأَخَّرَ'],
        ['ألف', 'تَأَلَّفَ'],
        ['أول', 'تَأَوَّلَ'],
        ['أكد', 'تَأَكَّدَ'],
        ['أكل', 'تَأَكَّلَ'],
        ['أثر', 'تَأَثَّرَ'],
        ['أوه', 'تَأَوَّهَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'تَأَمَّمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'تَأَذَّى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'تَحَبَّبَ'],
        ['هدد', 'تَهَدَّدَ'],
        ['حدد', 'تَحَدَّدَ'],
        ['عزز', 'تَعَزَّزَ'],
        ['سبب', 'تَسَبَّبَ'],
        ['قرر', 'تَقَرَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'تَوَصَّلَ'],
        ['وفر', 'تَوَفَّرَ'],
        ['وقف', 'تَوَقَّفَ'],
        ['وكأ', 'تَوَكَّأَ'],
        ['وقع', 'تَوَقَّعَ'],
        ['وسع', 'تَوَسَّعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَوَعَّدَ conjugation', () => {
        expect(conjugatePast(getVerb('وعد', 5))).toEqualT({
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
          '3mp': 'تَوَعَّدُوْا',
          '3fp': 'تَوَعَّدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'تَحَوَّلَ'],
        ['عين', 'تَعَيَّنَ'],
        ['غير', 'تَغَيَّرَ'],
        ['طور', 'تَطَوَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَقَوَّلَ conjugation', () => {
        expect(conjugatePast(getVerb('قول', 5))).toEqualT({
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
          '3mp': 'تَقَوَّلُوْا',
          '3fp': 'تَقَوَّلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'تَبَقَّى'],
        ['سني', 'تَسَنَّى'],
        ['بني', 'تَبَنَّى'],
        ['حدي', 'تَحَدَّى'],
        ['سمي', 'تَسَمَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَرَأَّى conjugation', () => {
        expect(conjugatePast(getVerb('رءي', 5))).toEqualT({
          '1s': 'تَرَأَّيْتُ',
          '2ms': 'تَرَأَّيْتَ',
          '2fs': 'تَرَأَّيْتِ',
          '3ms': 'تَرَأَّى',
          '3fs': 'تَرَأَّتْ',
          '2d': 'تَرَأَّيْتُمَا',
          '3md': 'تَرَأَّيَا',
          '3fd': 'تَرَأَّتَا',
          '1p': 'تَرَأَّيْنَا',
          '2mp': 'تَرَأَّيْتُمْ',
          '2fp': 'تَرَأَّيْتُنَّ',
          '3mp': 'تَرَأَّوْا',
          '3fp': 'تَرَأَّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'تَوَفَّى'],
        ['وقي', 'تَوَقَّى'],
        ['وخي', 'تَوَخَّى'],
        ['زوي', 'تَزَوَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 5))['3ms']).toEqualT(expected)
      })

      test('تَوَفَّى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 5))).toEqualT({
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
          '3mp': 'تَوَفَّوْا',
          '3fp': 'تَوَفَّيْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePast(getVerb('هيء', 5))).toEqualT({
          '1s': 'تَهَيَّأْتُ',
          '2ms': 'تَهَيَّأْتَ',
          '2fs': 'تَهَيَّأْتِ',
          '3ms': 'تَهَيَّأَ',
          '3fs': 'تَهَيَّأَتْ',
          '2d': 'تَهَيَّأْتُمَا',
          '3md': 'تَهَيَّآ',
          '3fd': 'تَهَيَّأَتَا',
          '1p': 'تَهَيَّأْنَا',
          '2mp': 'تَهَيَّأْتُمْ',
          '2fp': 'تَهَيَّأْتُنَّ',
          '3mp': 'تَهَيَّؤُوْا',
          '3fp': 'تَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePast(getVerb('ضوء', 5))).toEqualT({
          '1s': 'تَضَوَّأْتُ',
          '2ms': 'تَضَوَّأْتَ',
          '2fs': 'تَضَوَّأْتِ',
          '3ms': 'تَضَوَّأَ',
          '3fs': 'تَضَوَّأَتْ',
          '2d': 'تَضَوَّأْتُمَا',
          '3md': 'تَضَوَّآ',
          '3fd': 'تَضَوَّأَتَا',
          '1p': 'تَضَوَّأْنَا',
          '2mp': 'تَضَوَّأْتُمْ',
          '2fp': 'تَضَوَّأْتُنَّ',
          '3mp': 'تَضَوَّؤُوْا',
          '3fp': 'تَضَوَّأْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'أَوْمَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 4))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'تَعَامَلَ'],
        ['كمل', 'تَكَامَلَ'],
        ['شرك', 'تَشَارَكَ'],
        ['علج', 'تَعَالَجَ'],
        ['قسم', 'تَقَاسَمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })

      test('تَكَاتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 6))).toEqualT({
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
          '3mp': 'تَكَاتَبُوْا',
          '3fp': 'تَكَاتَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'تَحَابَّ'],
        ['مسس', 'تَمَاسَّ'],
        ['ضدد', 'تَضَادَّ'],
        ['ردد', 'تَرَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })

      test('تَحَابَّ conjugation', () => {
        expect(conjugatePast(getVerb('حبب', 6))).toEqualT({
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
          '3mp': 'تَحَابُّوْا',
          '3fp': 'تَحَابَبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'تَعَاوَنَ'],
        ['نول', 'تَنَاوَلَ'],
        ['فوض', 'تَفَاوَضَ'],
        ['جوز', 'تَجَاوَزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نمو', 'تَنَامَى'],
        ['مشي', 'تَمَاشَى'],
        ['عفو', 'تَعَافَى'],
        ['هوي', 'تَهَاوَى'],
        ['ولي', 'تَوَالَى'],
        ['وصي', 'تَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })

      test('تَنَامَى conjugation', () => {
        expect(conjugatePast(getVerb('نمو', 6))).toEqualT({
          '1s': 'تَنَامَيْتُ',
          '2ms': 'تَنَامَيْتَ',
          '2fs': 'تَنَامَيْتِ',
          '3ms': 'تَنَامَى',
          '3fs': 'تَنَامَتْ',
          '2d': 'تَنَامَيْتُمَا',
          '3md': 'تَنَامَيَا',
          '3fd': 'تَنَامَتَا',
          '1p': 'تَنَامَيْنَا',
          '2mp': 'تَنَامَيْتُمْ',
          '2fp': 'تَنَامَيْتُنَّ',
          '3mp': 'تَنَامَوْا',
          '3fp': 'تَنَامَيْنَ',
        })
      })

      test('تَمَاشَى conjugation', () => {
        expect(conjugatePast(getVerb('مشي', 6))).toEqualT({
          '1s': 'تَمَاشَيْتُ',
          '2ms': 'تَمَاشَيْتَ',
          '2fs': 'تَمَاشَيْتِ',
          '3ms': 'تَمَاشَى',
          '3fs': 'تَمَاشَتْ',
          '2d': 'تَمَاشَيْتُمَا',
          '3md': 'تَمَاشَيَا',
          '3fd': 'تَمَاشَتَا',
          '1p': 'تَمَاشَيْنَا',
          '2mp': 'تَمَاشَيْتُمْ',
          '2fp': 'تَمَاشَيْتُنَّ',
          '3mp': 'تَمَاشَوْا',
          '3fp': 'تَمَاشَيْنَ',
        })
      })

      test('تَعَافَى conjugation', () => {
        expect(conjugatePast(getVerb('عفو', 6))).toEqualT({
          '1s': 'تَعَافَيْتُ',
          '2ms': 'تَعَافَيْتَ',
          '2fs': 'تَعَافَيْتِ',
          '3ms': 'تَعَافَى',
          '3fs': 'تَعَافَتْ',
          '2d': 'تَعَافَيْتُمَا',
          '3md': 'تَعَافَيَا',
          '3fd': 'تَعَافَتَا',
          '1p': 'تَعَافَيْنَا',
          '2mp': 'تَعَافَيْتُمْ',
          '2fp': 'تَعَافَيْتُنَّ',
          '3mp': 'تَعَافَوْا',
          '3fp': 'تَعَافَيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وفق', 'تَوَافَقَ'],
        ['وجه', 'تَوَاجَهَ'],
        ['وفر', 'تَوَافَرَ'],
        ['وجد', 'تَوَاجَدَ'],
        ['وزن', 'تَوَازَنَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'تَآلَفَ'],
        ['أكل', 'تَآكَلَ'],
        ['أمر', 'تَآمَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطأ', 'تَبَاطَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })

      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePast(getVerb('وطء', 6))).toEqualT({
          '1s': 'تَوَاطَأْتُ',
          '2ms': 'تَوَاطَأْتَ',
          '2fs': 'تَوَاطَأْتِ',
          '3ms': 'تَوَاطَأَ',
          '3fs': 'تَوَاطَأَتْ',
          '2d': 'تَوَاطَأْتُمَا',
          '3md': 'تَوَاطَآ',
          '3fd': 'تَوَاطَأَتَا',
          '1p': 'تَوَاطَأْنَا',
          '2mp': 'تَوَاطَأْتُمْ',
          '2fp': 'تَوَاطَأْتُنَّ',
          '3mp': 'تَوَاطَأُوْا',
          '3fp': 'تَوَاطَأْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test('تَسَاءَلَ conjugation', () => {
        expect(conjugatePast(getVerb('سأل', 6))).toEqualT({
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
          '3mp': 'تَسَاءَلُوْا',
          '3fp': 'تَسَاءَلْنَ',
        })
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([['جيء', 'تَجَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 6))['3ms']).toEqualT(expected)
      })

      test('Form VI hollow verb with final hamza for تَجَاءَ', () => {
        expect(conjugatePast(getVerb('جيء', 6))).toEqualT({
          '3ms': 'تَجَاءَ',
          '3fs': 'تَجَاءَتْ',
          '3md': 'تَجَاءَا',
          '3fd': 'تَجَاءَتَا',
          '3mp': 'تَجَاؤُوْا',
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
      test.each([
        ['فجر', 'اِنْفَجَرَ'],
        ['خفض', 'اِنْخَفَضَ'],
        ['عكس', 'اِنْعَكَسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })

      test('اِنْكَتَبَ conjugation', () => {
        expect(conjugatePast(getVerb('كتب', 7))).toEqualT({
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
          '3mp': 'اِنْكَتَبُوْا',
          '3fp': 'اِنْكَتَبْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرأ', 'اِنْقَرَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'اِنْقَصَّ'],
        ['بثث', 'اِنْبَثَّ'],
        ['كفف', 'اِنْكَفَّ'],
        ['دسس', 'اِنْدَسَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePast(getVerb('قصص', 7))).toEqualT({
          '1s': 'اِنْقَصَصْتُ',
          '2ms': 'اِنْقَصَصْتَ',
          '2fs': 'اِنْقَصَصْتِ',
          '3ms': 'اِنْقَصَّ',
          '3fs': 'اِنْقَصَّتْ',
          '2d': 'اِنْقَصَصْتُمَا',
          '3md': 'اِنْقَصَّا',
          '3fd': 'اِنْقَصَّتَا',
          '1p': 'اِنْقَصَصْنَا',
          '2mp': 'اِنْقَصَصْتُمْ',
          '2fp': 'اِنْقَصَصْتُنَّ',
          '3mp': 'اِنْقَصُّوْا',
          '3fp': 'اِنْقَصَصْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'اِنْقَادَ'],
        ['هيل', 'اِنْهَالَ'],
        ['حوز', 'اِنْحَازَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'اِنْقَضَى'],
        ['حني', 'اِنْحَنَى'],
        ['ثني', 'اِنْثَنَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 7))['3ms']).toEqualT(expected)
      })

      test('اِنْرَمَى conjugation', () => {
        expect(conjugatePast(getVerb('رمي', 7))).toEqualT({
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
          '3mp': 'اِنْرَمَوْا',
          '3fp': 'اِنْرَمَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اِنْزَوَى conjugation', () => {
        expect(conjugatePast(getVerb('زوي', 7))).toEqualT({
          '1s': 'اِنْزَوَيْتُ',
          '2ms': 'اِنْزَوَيْتَ',
          '2fs': 'اِنْزَوَيْتِ',
          '3ms': 'اِنْزَوَى',
          '3fs': 'اِنْزَوَتْ',
          '2d': 'اِنْزَوَيْتُمَا',
          '3md': 'اِنْزَوَيَا',
          '3fd': 'اِنْزَوَتَا',
          '1p': 'اِنْزَوَيْنَا',
          '2mp': 'اِنْزَوَيْتُمْ',
          '2fp': 'اِنْزَوَيْتُنَّ',
          '3mp': 'اِنْزَوْا',
          '3fp': 'اِنْزَوَيْنَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'اِقْتَرَحَ'],
        ['عبر', 'اِعْتَبَرَ'],
        ['عمد', 'اِعْتَمَدَ'],
        ['نظر', 'اِنْتَظَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePast(getVerb('ضلع', 8))).toEqualT({
          '1s': 'اِضْطَلَعْتُ',
          '2ms': 'اِضْطَلَعْتَ',
          '2fs': 'اِضْطَلَعْتِ',
          '3ms': 'اِضْطَلَعَ',
          '3fs': 'اِضْطَلَعَتْ',
          '2d': 'اِضْطَلَعْتُمَا',
          '3md': 'اِضْطَلَعَا',
          '3fd': 'اِضْطَلَعَتَا',
          '1p': 'اِضْطَلَعْنَا',
          '2mp': 'اِضْطَلَعْتُمْ',
          '2fp': 'اِضْطَلَعْتُنَّ',
          '3mp': 'اِضْطَلَعُوْا',
          '3fp': 'اِضْطَلَعْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'اِحْتَلَّ'],
        ['مدد', 'اِمْتَدَّ'],
        ['حجج', 'اِحْتَجَّ'],
        ['ردد', 'اِرْتَدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِضْطَرَّ conjugation', () => {
        expect(conjugatePast(getVerb('ضرر', 8))).toEqualT({
          '1s': 'اِضْطَرَرْتُ',
          '2ms': 'اِضْطَرَرْتَ',
          '2fs': 'اِضْطَرَرْتِ',
          '3ms': 'اِضْطَرَّ',
          '3fs': 'اِضْطَرَّتْ',
          '2d': 'اِضْطَرَرْتُمَا',
          '3md': 'اِضْطَرَّا',
          '3fd': 'اِضْطَرَّتَا',
          '1p': 'اِضْطَرَرْنَا',
          '2mp': 'اِضْطَرَرْتُمْ',
          '2fp': 'اِضْطَرَرْتُنَّ',
          '3mp': 'اِضْطَرُّوْا',
          '3fp': 'اِضْطَرَرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'اِتَّصَلَ'],
        ['وكأ', 'اِتَّكَأَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'اِقْتَادَ'],
        ['سوء', 'اِسْتَاءَ'],
        ['خير', 'اِخْتَارَ'],
        ['عود', 'اِعْتَادَ'],
        ['روح', 'اِرْتَاحَ'],
        ['شوق', 'اِشْتَاقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِزْدَادَ conjugation', () => {
        expect(conjugatePast(getVerb('زيد', 8))).toEqualT({
          '1s': 'اِزْدَدْتُ',
          '2ms': 'اِزْدَدْتَ',
          '2fs': 'اِزْدَدْتِ',
          '3ms': 'اِزْدَادَ',
          '3fs': 'اِزْدَادَتْ',
          '2d': 'اِزْدَدْتُمَا',
          '3md': 'اِزْدَادَا',
          '3fd': 'اِزْدَادَتَا',
          '1p': 'اِزْدَدْنَا',
          '2mp': 'اِزْدَدْتُمْ',
          '2fp': 'اِزْدَدْتُنَّ',
          '3mp': 'اِزْدَادُوْا',
          '3fp': 'اِزْدَدْنَ',
        })
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePast(getVerb('زوج', 8))).toEqualT({
          '1s': 'اِزْدَوَجْتُ',
          '2ms': 'اِزْدَوَجْتَ',
          '2fs': 'اِزْدَوَجْتِ',
          '3ms': 'اِزْدَوَجَ',
          '3fs': 'اِزْدَوَجَتْ',
          '2d': 'اِزْدَوَجْتُمَا',
          '3md': 'اِزْدَوَجَا',
          '3fd': 'اِزْدَوَجَتَا',
          '1p': 'اِزْدَوَجْنَا',
          '2mp': 'اِزْدَوَجْتُمْ',
          '2fp': 'اِزْدَوَجْتُنَّ',
          '3mp': 'اِزْدَوَجُوْا',
          '3fp': 'اِزْدَوَجْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نهي', 'اِنْتَهَى'],
        ['قضي', 'اِقْتَضَى'],
        ['ردي', 'اِرْتَدَى'],
        ['شري', 'اِشْتَرَى'],
        ['خفي', 'اِخْتَفَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِرْتَأَى conjugation', () => {
        expect(conjugatePast(getVerb('رءي', 8))).toEqualT({
          '1s': 'اِرْتَأَيْتُ',
          '2ms': 'اِرْتَأَيْتَ',
          '2fs': 'اِرْتَأَيْتِ',
          '3ms': 'اِرْتَأَى',
          '3fs': 'اِرْتَأَتْ',
          '2d': 'اِرْتَأَيْتُمَا',
          '3md': 'اِرْتَأَيَا',
          '3fd': 'اِرْتَأَتَا',
          '1p': 'اِرْتَأَيْنَا',
          '2mp': 'اِرْتَأَيْتُمْ',
          '2fp': 'اِرْتَأَيْتُنَّ',
          '3mp': 'اِرْتَأَوْا',
          '3fp': 'اِرْتَأَيْنَ',
        })
      })

      test('اِدَّعَى conjugation', () => {
        expect(conjugatePast(getVerb('دعو', 8))).toEqualT({
          '1s': 'اِدَّعَيْتُ',
          '2ms': 'اِدَّعَيْتَ',
          '2fs': 'اِدَّعَيْتِ',
          '3ms': 'اِدَّعَى',
          '3fs': 'اِدَّعَتْ',
          '2d': 'اِدَّعَيْتُمَا',
          '3md': 'اِدَّعَيَا',
          '3fd': 'اِدَّعَتَا',
          '1p': 'اِدَّعَيْنَا',
          '2mp': 'اِدَّعَيْتُمْ',
          '2fp': 'اِدَّعَيْتُنَّ',
          '3mp': 'اِدَّعَوْا',
          '3fp': 'اِدَّعَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وقي', 'اِتَّقَى']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 8))['3ms']).toEqualT(expected)
      })

      test('اِنْتَوَى conjugation', () => {
        expect(conjugatePast(getVerb('نوي', 8))).toEqualT({
          '1s': 'اِنْتَوَيْتُ',
          '2ms': 'اِنْتَوَيْتَ',
          '2fs': 'اِنْتَوَيْتِ',
          '3ms': 'اِنْتَوَى',
          '3fs': 'اِنْتَوَتْ',
          '2d': 'اِنْتَوَيْتُمَا',
          '3md': 'اِنْتَوَيَا',
          '3fd': 'اِنْتَوَتَا',
          '1p': 'اِنْتَوَيْنَا',
          '2mp': 'اِنْتَوَيْتُمْ',
          '2fp': 'اِنْتَوَيْتُنَّ',
          '3mp': 'اِنْتَوَوْا',
          '3fp': 'اِنْتَوَيْنَ',
        })
      })

      test('اِسْتَوَى conjugation', () => {
        expect(conjugatePast(getVerb('سوي', 8))).toEqualT({
          '1s': 'اِسْتَوَيْتُ',
          '2ms': 'اِسْتَوَيْتَ',
          '2fs': 'اِسْتَوَيْتِ',
          '3ms': 'اِسْتَوَى',
          '3fs': 'اِسْتَوَتْ',
          '2d': 'اِسْتَوَيْتُمَا',
          '3md': 'اِسْتَوَيَا',
          '3fd': 'اِسْتَوَتَا',
          '1p': 'اِسْتَوَيْنَا',
          '2mp': 'اِسْتَوَيْتُمْ',
          '2fp': 'اِسْتَوَيْتُنَّ',
          '3mp': 'اِسْتَوَوْا',
          '3fp': 'اِسْتَوَيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('اِتَّخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 8))).toEqualT({
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
          '3mp': 'اِتَّخَذُوْا',
          '3fp': 'اِتَّخَذْنَ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('اِئْتَمَّ conjugation', () => {
        expect(conjugatePast(getVerb('أمم', 8))).toEqualT({
          '1s': 'اِئْتَمَمْتُ',
          '2ms': 'اِئْتَمَمْتَ',
          '2fs': 'اِئْتَمَمْتِ',
          '3ms': 'اِئْتَمَّ',
          '3fs': 'اِئْتَمَّتْ',
          '2d': 'اِئْتَمَمْتُمَا',
          '3md': 'اِئْتَمَّا',
          '3fd': 'اِئْتَمَّتَا',
          '1p': 'اِئْتَمَمْنَا',
          '2mp': 'اِئْتَمَمْتُمْ',
          '2fp': 'اِئْتَمَمْتُنَّ',
          '3mp': 'اِئْتَمُّوْا',
          '3fp': 'اِئْتَمَمْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([['حمر', 'اِحْمَرَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 9))['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['بدل', 'اِسْتَبْدَلَ'],
        ['عمل', 'اِسْتَعْمَلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'اِسْتَحَبَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })

      test('اِسْتَحَمَّ conjugation', () => {
        expect(conjugatePast(getVerb('حمم', 10))).toEqualT({
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
          '3mp': 'اِسْتَحَمُّوْا',
          '3fp': 'اِسْتَحْمَمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'اِسْتَعَانَ'],
        ['قود', 'اِسْتَقَادَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePast(getVerb(root, 10))['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَوْفَى conjugation', () => {
        expect(conjugatePast(getVerb('وفي', 10))).toEqualT({
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
          '3mp': 'اِسْتَوْفَوْا',
          '3fp': 'اِسْتَوْفَيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('اِسْتَأْخَذَ conjugation', () => {
        expect(conjugatePast(getVerb('أخذ', 10))).toEqualT({
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
          '3mp': 'اِسْتَأْخَذُوْا',
          '3fp': 'اِسْتَأْخَذْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugatePast(getVerb('قرأ', 10))).toEqualT({
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
          '3mp': 'اِسْتَقْرَأُوْا',
          '3fp': 'اِسْتَقْرَأْنَ',
        })
      })
    })
  })
})
