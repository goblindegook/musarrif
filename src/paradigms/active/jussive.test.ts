import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present jussive', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['نظر', 'يَنْظُرْ'],
        ['بعد', 'يَبْعَدْ'],
        ['مثل', 'يَمْثُلْ'],
        ['دعم', 'يَدْعَمْ'],
        ['كلم', 'يَكْلِمْ'],
        ['قدم', 'يَقْدُمْ'],
        ['نفس', 'يَنْفُسْ'],
        ['مكن', 'يَمْكُنْ'],
        ['بلغ', 'يَبْلُغْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('drops nūn endings for صَرَفَ', () => {
        expect(conjugatePresentMood(getVerb('صرف', 1), 'jussive')).toMatchObjectT({
          '2ms': 'تَصْرِفْ',
          '2fs': 'تَصْرِفِي',
          '2d': 'تَصْرِفَا',
          '2mp': 'تَصْرِفُوْا',
          '2fp': 'تَصْرِفْنَ',
          '3md': 'يَصْرِفَا',
          '3fd': 'تَصْرِفَا',
          '3fp': 'يَصْرِفْنَ',
          '3mp': 'يَصْرِفُوْا',
        })
      })

      test('صَغُرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('صغر', 1), 'jussive')).toEqualT({
          '1s': 'أَصْغُرْ',
          '2ms': 'تَصْغُرْ',
          '2fs': 'تَصْغُرِي',
          '3ms': 'يَصْغُرْ',
          '3fs': 'تَصْغُرْ',
          '2d': 'تَصْغُرَا',
          '3md': 'يَصْغُرَا',
          '3fd': 'تَصْغُرَا',
          '1p': 'نَصْغُرْ',
          '2mp': 'تَصْغُرُوْا',
          '2fp': 'تَصْغُرْنَ',
          '3mp': 'يَصْغُرُوْا',
          '3fp': 'يَصْغُرْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('نظر', 1), 'jussive')).toEqualT({
          '1s': 'أَنْظُرْ',
          '2ms': 'تَنْظُرْ',
          '2fs': 'تَنْظُرِي',
          '3ms': 'يَنْظُرْ',
          '3fs': 'تَنْظُرْ',
          '2d': 'تَنْظُرَا',
          '3md': 'يَنْظُرَا',
          '3fd': 'تَنْظُرَا',
          '1p': 'نَنْظُرْ',
          '2mp': 'تَنْظُرُوْا',
          '2fp': 'تَنْظُرْنَ',
          '3mp': 'يَنْظُرُوْا',
          '3fp': 'يَنْظُرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قرر', 'يَقَرَّ'],
        ['أدد', 'يَئِدَّ'],
        ['أجج', 'يَؤُجَّ'],
        ['أزز', 'يَؤُزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('قَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرر', 1), 'jussive')).toEqualT({
          '1s': 'أَقَرَّ',
          '2ms': 'تَقَرَّ',
          '2fs': 'تَقَرِّي',
          '3ms': 'يَقَرَّ',
          '3fs': 'تَقَرَّ',
          '2d': 'تَقَرَّا',
          '3md': 'يَقَرَّا',
          '3fd': 'تَقَرَّا',
          '1p': 'نَقَرَّ',
          '2mp': 'تَقَرُّوْا',
          '2fp': 'تَقْرَرْنَ',
          '3mp': 'يَقَرُّوْا',
          '3fp': 'يَقْرَرْنَ',
        })
      })

      test('حَبَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 1), 'jussive')).toEqualT({
          '1s': 'أَحِبَّ',
          '2ms': 'تَحِبَّ',
          '2fs': 'تَحِبِّي',
          '3ms': 'يَحِبَّ',
          '3fs': 'تَحِبَّ',
          '2d': 'تَحِبَّا',
          '3md': 'يَحِبَّا',
          '3fd': 'تَحِبَّا',
          '1p': 'نَحِبَّ',
          '2mp': 'تَحِبُّوْا',
          '2fp': 'تَحْبِبْنَ',
          '3mp': 'يَحِبُّوْا',
          '3fp': 'يَحْبِبْنَ',
        })
      })

      test('ظَلَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ظلل', 1), 'jussive')).toEqualT({
          '1s': 'أَظَلَّ',
          '2ms': 'تَظَلَّ',
          '2fs': 'تَظَلِّي',
          '3ms': 'يَظَلَّ',
          '3fs': 'تَظَلَّ',
          '2d': 'تَظَلَّا',
          '3md': 'يَظَلَّا',
          '3fd': 'تَظَلَّا',
          '1p': 'نَظَلَّ',
          '2mp': 'تَظَلُّوْا',
          '2fp': 'تَظْلَلْنَ',
          '3mp': 'يَظَلُّوْا',
          '3fp': 'يَظْلَلْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وقف', 'يَقِفْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وقف', 1), 'jussive')).toEqualT({
          '1s': 'أَقِفْ',
          '2ms': 'تَقِفْ',
          '2fs': 'تَقِفِي',
          '3ms': 'يَقِفْ',
          '3fs': 'تَقِفْ',
          '2d': 'تَقِفَا',
          '3md': 'يَقِفَا',
          '3fd': 'تَقِفَا',
          '1p': 'نَقِفْ',
          '2mp': 'تَقِفُوْا',
          '2fp': 'تَقِفْنَ',
          '3mp': 'يَقِفُوْا',
          '3fp': 'يَقِفْنَ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضع', 1), 'jussive')).toEqualT({
          '1s': 'أَضَعْ',
          '2ms': 'تَضَعْ',
          '2fs': 'تَضَعِي',
          '3ms': 'يَضَعْ',
          '3fs': 'تَضَعْ',
          '2d': 'تَضَعَا',
          '3md': 'يَضَعَا',
          '3fd': 'تَضَعَا',
          '1p': 'نَضَعْ',
          '2mp': 'تَضَعُوْا',
          '2fp': 'تَضَعْنَ',
          '3mp': 'يَضَعُوْا',
          '3fp': 'يَضَعْنَ',
        })
      })

      test('وَثُقَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وثق', 1), 'jussive')).toEqualT({
          '1s': 'أَثُقْ',
          '2ms': 'تَثُقْ',
          '2fs': 'تَثُقِي',
          '3ms': 'يَثُقْ',
          '3fs': 'تَثُقْ',
          '2d': 'تَثُقَا',
          '3md': 'يَثُقَا',
          '3fd': 'تَثُقَا',
          '1p': 'نَثُقْ',
          '2mp': 'تَثُقُوْا',
          '2fp': 'تَثُقْنَ',
          '3mp': 'يَثُقُوْا',
          '3fp': 'يَثُقْنَ',
        })
      })

      test('وَهُنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وهن', 1), 'jussive')).toEqualT({
          '1s': 'أَهُنْ',
          '2ms': 'تَهُنْ',
          '2fs': 'تَهُنِي',
          '3ms': 'يَهُنْ',
          '3fs': 'تَهُنْ',
          '2d': 'تَهُنَا',
          '3md': 'يَهُنَا',
          '3fd': 'تَهُنَا',
          '1p': 'نَهُنْ',
          '2mp': 'تَهُنُوْا',
          '2fp': 'تَهُنَّ',
          '3mp': 'يَهُنُوْا',
          '3fp': 'يَهُنَّ',
        })
      })

      test('يَئِسَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يئس', 1), 'jussive')).toEqualT({
          '1s': 'أَيْئَسْ',
          '2ms': 'تَيْئَسْ',
          '2fs': 'تَيْئَسِي',
          '3ms': 'يَيْئَسْ',
          '3fs': 'تَيْئَسْ',
          '2d': 'تَيْئَسَا',
          '3md': 'يَيْئَسَا',
          '3fd': 'تَيْئَسَا',
          '1p': 'نَيْئَسْ',
          '2mp': 'تَيْئَسُوْا',
          '2fp': 'تَيْئَسْنَ',
          '3mp': 'يَيْئَسُوْا',
          '3fp': 'يَيْئَسْنَ',
        })
      })

      test('يَسُرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يسر', 1), 'jussive')).toEqualT({
          '1s': 'أَيْسُرْ',
          '2ms': 'تَيْسُرْ',
          '2fs': 'تَيْسُرِي',
          '3ms': 'يَيْسُرْ',
          '3fs': 'تَيْسُرْ',
          '2d': 'تَيْسُرَا',
          '3md': 'يَيْسُرَا',
          '3fd': 'تَيْسُرَا',
          '1p': 'نَيْسُرْ',
          '2mp': 'تَيْسُرُوْا',
          '2fp': 'تَيْسُرْنَ',
          '3mp': 'يَيْسُرُوْا',
          '3fp': 'يَيْسُرْنَ',
        })
      })

      test('يَبِسَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يبس', 1), 'jussive')).toEqualT({
          '1s': 'أَيْبَسْ',
          '2ms': 'تَيْبَسْ',
          '2fs': 'تَيْبَسِي',
          '3ms': 'يَيْبَسْ',
          '3fs': 'تَيْبَسْ',
          '2d': 'تَيْبَسَا',
          '3md': 'يَيْبَسَا',
          '3fd': 'تَيْبَسَا',
          '1p': 'نَيْبَسْ',
          '2mp': 'تَيْبَسُوْا',
          '2fp': 'تَيْبَسْنَ',
          '3mp': 'يَيْبَسُوْا',
          '3fp': 'يَيْبَسْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عوز', 'يَعْوَزْ'],
        ['عوم', 'يَعُمْ'],
        ['حول', 'يَحُلْ'],
        ['موت', 'يَمُتْ'],
        ['خور', 'يَخْوَرْ'],
        ['خوف', 'يَخَفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('عوز', 1), 'jussive')).toEqualT({
          '1s': 'أَعْوَزْ',
          '2ms': 'تَعْوَزْ',
          '2fs': 'تَعْوَزِي',
          '3ms': 'يَعْوَزْ',
          '3fs': 'تَعْوَزْ',
          '2d': 'تَعْوَزَا',
          '3md': 'يَعْوَزَا',
          '3fd': 'تَعْوَزَا',
          '1p': 'نَعْوَزْ',
          '2mp': 'تَعْوَزُوْا',
          '2fp': 'تَعْوَزْنَ',
          '3mp': 'يَعْوَزُوْا',
          '3fp': 'يَعْوَزْنَ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جيد', 1), 'jussive')).toEqualT({
          '1s': 'أَجْيَدْ',
          '2ms': 'تَجْيَدْ',
          '2fs': 'تَجْيَدِي',
          '3ms': 'يَجْيَدْ',
          '3fs': 'تَجْيَدْ',
          '2d': 'تَجْيَدَا',
          '3md': 'يَجْيَدَا',
          '3fd': 'تَجْيَدَا',
          '1p': 'نَجْيَدْ',
          '2mp': 'تَجْيَدُوْا',
          '2fp': 'تَجْيَدْنَ',
          '3mp': 'يَجْيَدُوْا',
          '3fp': 'يَجْيَدْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شيد', 1), 'jussive')).toEqualT({
          '1s': 'أَشِدْ',
          '2ms': 'تَشِدْ',
          '2fs': 'تَشِيدِي',
          '3ms': 'يَشِدْ',
          '3fs': 'تَشِدْ',
          '2d': 'تَشِيدَا',
          '3md': 'يَشِيدَا',
          '3fd': 'تَشِيدَا',
          '1p': 'نَشِدْ',
          '2mp': 'تَشِيدُوْا',
          '2fp': 'تَشِدْنَ',
          '3mp': 'يَشِيدُوْا',
          '3fp': 'يَشِدْنَ',
        })
      })

      test('shortens hollow stems without suffixes for قَالَ', () => {
        expect(conjugatePresentMood(getVerb('قول', 1), 'jussive')).toMatchObjectT({
          '3ms': 'يَقُلْ',
          '2ms': 'تَقُلْ',
          '3fs': 'تَقُلْ',
          '1s': 'أَقُلْ',
          '1p': 'نَقُلْ',
          '2fp': 'تَقُلْنَ',
          '3fp': 'يَقُلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'يَغْشِ'],
        ['بدو', 'يَبْدُ'],
        ['علي', 'يَعْلِ'],
        ['جدو', 'يَجْدُ'],
        ['لهو', 'يَلْهُ'],
        ['شفي', 'يَشْفِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('بَقِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بقي', 1), 'jussive')).toEqualT({
          '1s': 'أَبْقَ',
          '2ms': 'تَبْقَ',
          '2fs': 'تَبْقَيْ',
          '3ms': 'يَبْقَ',
          '3fs': 'تَبْقَ',
          '2d': 'تَبْقَيَا',
          '3md': 'يَبْقَيَا',
          '3fd': 'تَبْقَيَا',
          '1p': 'نَبْقَ',
          '2mp': 'تَبْقَوْا',
          '2fp': 'تَبْقَيْنَ',
          '3mp': 'يَبْقَوْا',
          '3fp': 'يَبْقَيْنَ',
        })
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('دعا', 1), 'jussive')).toEqualT({
          '1s': 'أَدْعُ',
          '2ms': 'تَدْعُ',
          '2fs': 'تَدْعِي',
          '3ms': 'يَدْعُ',
          '3fs': 'تَدْعُ',
          '2d': 'تَدْعُوْا',
          '3md': 'يَدْعُوْا',
          '3fd': 'تَدْعُوْا',
          '1p': 'نَدْعُ',
          '2mp': 'تَدْعُوْا',
          '2fp': 'تَدْعُوْنَ',
          '3mp': 'يَدْعُوْا',
          '3fp': 'يَدْعُوْنَ',
        })
      })

      test('تَحَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('تحو', 1), 'jussive')).toEqualT({
          '1s': 'أَتْحُ',
          '2ms': 'تَتْحُ',
          '2fs': 'تَتْحَيْ',
          '3ms': 'يَتْحُ',
          '3fs': 'تَتْحُ',
          '2d': 'تَتْحَيَا',
          '3md': 'يَتْحَيَا',
          '3fd': 'تَتْحَيَا',
          '1p': 'نَتْحُ',
          '2mp': 'تَتْحَوْا',
          '2fp': 'تَتْحَيْنَ',
          '3mp': 'يَتْحَوْا',
          '3fp': 'يَتْحَيْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'يُعَاوِنْ'],
        ['قوم', 'يُقَاوِمْ'],
        ['عود', 'يُعَاوِدْ'],
        ['جوز', 'يُجَاوِزْ'],
        ['نول', 'يُنَاوِلْ'],
        ['ضيق', 'يُضَايِقْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وري', 'يَرِ'],
        ['قوي', 'يَقْوَ'],
        ['جوي', 'يَجْوَ'],
        ['روي', 'يَرْوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('روي', 1), 'jussive')).toEqualT({
          '1s': 'أَرْوِ',
          '2ms': 'تَرْوِ',
          '2fs': 'تَرْوِي',
          '3ms': 'يَرْوِ',
          '3fs': 'تَرْوِ',
          '2d': 'تَرْوِيَا',
          '3md': 'يَرْوِيَا',
          '3fd': 'تَرْوِيَا',
          '1p': 'نَرْوِ',
          '2mp': 'تَرْوُوْا',
          '2fp': 'تَرْوِيْنَ',
          '3mp': 'يَرْوُوْا',
          '3fp': 'يَرْوِيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أمر', 'يَأْمُرْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَسَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أسر', 1), 'jussive')).toEqualT({
          '1s': 'آسِرْ',
          '2ms': 'تَأْسِرْ',
          '2fs': 'تَأْسِرِي',
          '3ms': 'يَأْسِرْ',
          '3fs': 'تَأْسِرْ',
          '2d': 'تَأْسِرَا',
          '3md': 'يَأْسِرَا',
          '3fd': 'تَأْسِرَا',
          '1p': 'نَأْسِرْ',
          '2mp': 'تَأْسِرُوْا',
          '2fp': 'تَأْسِرْنَ',
          '3mp': 'يَأْسِرُوْا',
          '3fp': 'يَأْسِرْنَ',
        })
      })

      test('أَذِنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أذن', 1), 'jussive')).toEqualT({
          '1s': 'آذَنْ',
          '2ms': 'تَأْذَنْ',
          '2fs': 'تَأْذَنِي',
          '3ms': 'يَأْذَنْ',
          '3fs': 'تَأْذَنْ',
          '2d': 'تَأْذَنَا',
          '3md': 'يَأْذَنَا',
          '3fd': 'تَأْذَنَا',
          '1p': 'نَأْذَنْ',
          '2mp': 'تَأْذَنُوْا',
          '2fp': 'تَأْذَنَّ',
          '3mp': 'يَأْذَنُوْا',
          '3fp': 'يَأْذَنَّ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 1), 'jussive')).toEqualT({
          '1s': 'أَؤُمَّ',
          '2ms': 'تَؤُمَّ',
          '2fs': 'تَؤُمِّي',
          '3ms': 'يَؤُمَّ',
          '3fs': 'تَؤُمَّ',
          '2d': 'تَؤُمَّا',
          '3md': 'يَؤُمَّا',
          '3fd': 'تَؤُمَّا',
          '1p': 'نَؤُمَّ',
          '2mp': 'تَؤُمُّوْا',
          '2fp': 'تَأْمُمْنَ',
          '3mp': 'يَؤُمُّوْا',
          '3fp': 'يَأْمُمْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'يَؤُلْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يَؤُلْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أول', 1), 'jussive')).toEqualT({
          '1s': 'أَؤُلْ',
          '2ms': 'تَؤُلْ',
          '2fs': 'تَؤُولِي',
          '3ms': 'يَؤُلْ',
          '3fs': 'تَؤُلْ',
          '2d': 'تَؤُولَا',
          '3md': 'يَؤُولَا',
          '3fd': 'تَؤُولَا',
          '1p': 'نَؤُلْ',
          '2mp': 'تَؤُولُوْا',
          '2fp': 'تَؤُلْنَ',
          '3mp': 'يَؤُولُوْا',
          '3fp': 'يَؤُلْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['بءس', 'يَبْؤُسْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['جرء', 'يَجْرُؤْ'],
        ['كلأ', 'يَكْلُؤْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 1), 'jussive')).toEqualT({
          '1s': 'أَقْرَأْ',
          '2ms': 'تَقْرَأْ',
          '2fs': 'تَقْرَئِي',
          '3ms': 'يَقْرَأْ',
          '3fs': 'تَقْرَأْ',
          '2d': 'تَقْرَآ',
          '3md': 'يَقْرَآ',
          '3fd': 'تَقْرَآ',
          '1p': 'نَقْرَأْ',
          '2mp': 'تَقْرَأُوْا',
          '2fp': 'تَقْرَأْنَ',
          '3mp': 'يَقْرَأُوْا',
          '3fp': 'يَقْرَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كلأ', 1), 'jussive')).toEqualT({
          '1s': 'أَكْلُؤْ',
          '2ms': 'تَكْلُؤْ',
          '2fs': 'تَكْلُئِي',
          '3ms': 'يَكْلُؤْ',
          '3fs': 'تَكْلُؤْ',
          '2d': 'تَكْلُؤَا',
          '3md': 'يَكْلُؤَا',
          '3fd': 'تَكْلُؤَا',
          '1p': 'نَكْلُؤْ',
          '2mp': 'تَكْلُؤُوْا',
          '2fp': 'تَكْلُؤْنَ',
          '3mp': 'يَكْلُؤُوْا',
          '3fp': 'يَكْلُؤْنَ',
        })
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 1), 'jussive')).toEqualT({
          '1s': 'أَطَأْ',
          '2ms': 'تَطَأْ',
          '2fs': 'تَطَئِي',
          '3ms': 'يَطَأْ',
          '3fs': 'تَطَأْ',
          '2d': 'تَطَآ',
          '3md': 'يَطَآ',
          '3fd': 'تَطَآ',
          '1p': 'نَطَأْ',
          '2mp': 'تَطَأُوْا',
          '2fp': 'تَطَأْنَ',
          '3mp': 'يَطَأُوْا',
          '3fp': 'يَطَأْنَ',
        })
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدأ', 1), 'jussive')).toEqualT({
          '1s': 'أَبْدَأْ',
          '2ms': 'تَبْدَأْ',
          '2fs': 'تَبْدَئِي',
          '3ms': 'يَبْدَأْ',
          '3fs': 'تَبْدَأْ',
          '2d': 'تَبْدَآ',
          '3md': 'يَبْدَآ',
          '3fd': 'تَبْدَآ',
          '1p': 'نَبْدَأْ',
          '2mp': 'تَبْدَأُوْا',
          '2fp': 'تَبْدَأْنَ',
          '3mp': 'يَبْدَأُوْا',
          '3fp': 'يَبْدَأْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['نوء', 'يَنُؤْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('بوء conjugation', () => {
        expect(conjugatePresentMood(getVerb('بوء', 1), 'jussive')).toEqualT({
          '1s': 'أَبُؤْ',
          '2ms': 'تَبُؤْ',
          '2fs': 'تَبُوئِي',
          '3ms': 'يَبُؤْ',
          '3fs': 'تَبُؤْ',
          '2d': 'تَبُوءَا',
          '3md': 'يَبُوءَا',
          '3fd': 'تَبُوءَا',
          '1p': 'نَبُؤْ',
          '2mp': 'تَبُوئُوْا',
          '2fp': 'تَبُؤْنَ',
          '3mp': 'يَبُوئُوْا',
          '3fp': 'يَبُؤْنَ',
        })
      })

      test('drops final hamza for جَاءَ', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'jussive')).toMatchObjectT({
          '3ms': 'يَجِئْ',
          '2ms': 'تَجِئْ',
          '1s': 'أَجِئْ',
          '1p': 'نَجِئْ',
          '3fs': 'تَجِئْ',
          '2fs': 'تَجِيئِي',
          '3mp': 'يَجِيئُوْا',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أبي', 'يَأْبَ'],
        ['أني', 'يَأْنِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أتي', 1), 'jussive')).toEqualT({
          '1s': 'آتِ',
          '2ms': 'تَأْتِ',
          '2fs': 'تَأْتِي',
          '3ms': 'يَأْتِ',
          '3fs': 'تَأْتِ',
          '2d': 'تَأْتِيَا',
          '3md': 'يَأْتِيَا',
          '3fd': 'تَأْتِيَا',
          '1p': 'نَأْتِ',
          '2mp': 'تَأْتُوْا',
          '2fp': 'تَأْتِيْنَ',
          '3mp': 'يَأْتُوْا',
          '3fp': 'يَأْتِيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'يَرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 1), 'jussive')).toEqualT({
          '1s': 'أَرَ',
          '2ms': 'تَرَ',
          '2fs': 'تَرَيْ',
          '3ms': 'يَرَ',
          '3fs': 'تَرَ',
          '2d': 'تَرَيَا',
          '3md': 'يَرَيَا',
          '3fd': 'تَرَيَا',
          '1p': 'نَرَ',
          '2mp': 'تَرَوْا',
          '2fp': 'تَرَيْنَ',
          '3mp': 'يَرَوْا',
          '3fp': 'يَرَيْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وءي', 1), 'jussive')).toEqualT({
          '1s': 'أَئِ',
          '2ms': 'تَئِ',
          '2fs': 'تَئِي',
          '3ms': 'يَئِ',
          '3fs': 'تَئِ',
          '2d': 'تَئِيَا',
          '3md': 'يَئِيَا',
          '3fd': 'تَئِيَا',
          '1p': 'نَئِ',
          '2mp': 'تَأُوْا',
          '2fp': 'تَئِيْنَ',
          '3mp': 'يَأُوْا',
          '3fp': 'يَئِيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'يَأْوِ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أوي', 1), 'jussive')).toEqualT({
          '1s': 'آوِ',
          '1p': 'نَأْوِ',
          '2ms': 'تَأْوِ',
          '2fs': 'تَأْوِي',
          '3ms': 'يَأْوِ',
          '3fs': 'تَأْوِ',
          '2d': 'تَأْوِيَا',
          '3md': 'يَأْوِيَا',
          '3fd': 'تَأْوِيَا',
          '2mp': 'تَأْوُوْا',
          '2fp': 'تَأْوِيْنَ',
          '3mp': 'يَأْوُوْا',
          '3fp': 'يَأْوِيْنَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'يُمَكِّنْ'],
        ['مثل', 'يُمَثِّلْ'],
        ['سبب', 'يُسَبِّبْ'],
        ['خطط', 'يُخَطِّطْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حدد', 'يُحَدِّدْ'],
        ['قرر', 'يُقَرِّرْ'],
        ['شدد', 'يُشَدِّدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('حَبَّبَ pattern', () => {
        expect(conjugatePresentMood(getVerb('حبب', 2), 'jussive')).toEqualT({
          '1s': 'أُحَبِّبْ',
          '2ms': 'تُحَبِّبْ',
          '2fs': 'تُحَبِّبِي',
          '3ms': 'يُحَبِّبْ',
          '3fs': 'تُحَبِّبْ',
          '2d': 'تُحَبِّبَا',
          '3md': 'يُحَبِّبَا',
          '3fd': 'تُحَبِّبَا',
          '1p': 'نُحَبِّبْ',
          '2mp': 'تُحَبِّبُوْا',
          '2fp': 'تُحَبِّبْنَ',
          '3mp': 'يُحَبِّبُوْا',
          '3fp': 'يُحَبِّبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوِّسْ'],
        ['كون', 'يُكَوِّنْ'],
        ['دون', 'يُدَوِّنْ'],
        ['سوف', 'يُسَوِّفْ'],
        ['كيف', 'يُكَيِّفْ'],
        ['أول', 'يُؤَوِّلْ'],
        ['أوب', 'يُؤَوِّبْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يُؤَخِّرْ'],
        ['أمر', 'يُؤَمِّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذِّ'],
        ['أسي', 'يُؤَسِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنِّئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يُيَوِّدْ'],
        ['وفي', 'يُوَفِّ'],
        ['وصي', 'يُوَصِّ'],
        ['ولي', 'يُوَلِّ'],
        ['وري', 'يُوَرِّ'],
        ['مني', 'يُمَنِّ'],
        ['سمي', 'يُسَمِّ'],
        ['غطي', 'يُغَطِّ'],
        ['غني', 'يُغَنِّ'],
        ['قوي', 'يُقَوِّ'],
        ['زوي', 'يُزَوِّ'],
        ['هوي', 'يُهَوِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('وَفَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 2), 'jussive')).toEqualT({
          '1s': 'أُوَفِّ',
          '1p': 'نُوَفِّ',
          '2ms': 'تُوَفِّ',
          '2fs': 'تُوَفِّي',
          '2d': 'تُوَفِّا',
          '2mp': 'تُوَفُّوْا',
          '2fp': 'تُوَفِّيْنَ',
          '3ms': 'يُوَفِّ',
          '3fs': 'تُوَفِّ',
          '3md': 'يُوَفِّا',
          '3fd': 'تُوَفِّا',
          '3mp': 'يُوَفُّوْا',
          '3fp': 'يُوَفِّيْنَ',
        })
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 2), 'jussive')).toEqualT({
          '1s': 'أُحَيِّ',
          '2ms': 'تُحَيِّ',
          '2fs': 'تُحَيِّي',
          '3ms': 'يُحَيِّ',
          '3fs': 'تُحَيِّ',
          '2d': 'تُحَيِّيَا',
          '3md': 'يُحَيِّيَا',
          '3fd': 'تُحَيِّيَا',
          '1p': 'نُحَيِّ',
          '2mp': 'تُحَيُّوْا',
          '2fp': 'تُحَيِّيْنَ',
          '3mp': 'يُحَيُّوْا',
          '3fp': 'يُحَيِّيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أجج', 'يُؤَجِّجْ'],
        ['أسس', 'يُؤَسِّسْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَثَّرَ pattern', () => {
        expect(conjugatePresentMood(getVerb('أثر', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَثِّرْ',
          '2ms': 'تُؤَثِّرْ',
          '2fs': 'تُؤَثِّرِي',
          '3ms': 'يُؤَثِّرْ',
          '3fs': 'تُؤَثِّرْ',
          '2d': 'تُؤَثِّرَا',
          '3md': 'يُؤَثِّرَا',
          '3fd': 'تُؤَثِّرَا',
          '1p': 'نُؤَثِّرْ',
          '2mp': 'تُؤَثِّرُوْا',
          '2fp': 'تُؤَثِّرْنَ',
          '3mp': 'يُؤَثِّرُوْا',
          '3fp': 'يُؤَثِّرْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطِّئْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 2), 'jussive')).toEqualT({
          '1s': 'أُوَطِّئْ',
          '2ms': 'تُوَطِّئْ',
          '2fs': 'تُوَطِّئِي',
          '3ms': 'يُوَطِّئْ',
          '3fs': 'تُوَطِّئْ',
          '2d': 'تُوَطِّئَا',
          '3md': 'يُوَطِّئَا',
          '3fd': 'تُوَطِّئَا',
          '1p': 'نُوَطِّئْ',
          '2mp': 'تُوَطِّئُوْا',
          '2fp': 'تُوَطِّئْنَ',
          '3mp': 'يُوَطِّئُوْا',
          '3fp': 'يُوَطِّئْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['يود', 'يُيَوِّدْ'],
        ['وطن', 'يُوَطِّنْ'],
        ['وجه', 'يُوَجِّهْ'],
        ['وقف', 'يُوَقِّفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يُوَسِّطْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وسط', 2), 'jussive')).toEqualT({
          '1s': 'أُوَسِّطْ',
          '2ms': 'تُوَسِّطْ',
          '2fs': 'تُوَسِّطِي',
          '3ms': 'يُوَسِّطْ',
          '3fs': 'تُوَسِّطْ',
          '2d': 'تُوَسِّطَا',
          '3md': 'يُوَسِّطَا',
          '3fd': 'تُوَسِّطَا',
          '1p': 'نُوَسِّطْ',
          '2mp': 'تُوَسِّطُوْا',
          '2fp': 'تُوَسِّطْنَ',
          '3mp': 'يُوَسِّطُوْا',
          '3fp': 'يُوَسِّطْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test('أَيَّدَ pattern', () => {
        expect(conjugatePresentMood(getVerb('أيد', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَيِّدْ',
          '2ms': 'تُؤَيِّدْ',
          '2fs': 'تُؤَيِّدِي',
          '3ms': 'يُؤَيِّدْ',
          '3fs': 'تُؤَيِّدْ',
          '2d': 'تُؤَيِّدَا',
          '3md': 'يُؤَيِّدَا',
          '3fd': 'تُؤَيِّدَا',
          '1p': 'نُؤَيِّدْ',
          '2mp': 'تُؤَيِّدُوْا',
          '2fp': 'تُؤَيِّدْنَ',
          '3mp': 'يُؤَيِّدُوْا',
          '3fp': 'يُؤَيِّدْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'يُكْثِرْ'],
        ['علم', 'يُعْلِمْ'],
        ['لحق', 'يُلْحِقْ'],
        ['صبح', 'يُصْبِحْ'],
        ['وقف', 'يُوْقِفْ'],
        ['وقع', 'يُوْقِعْ'],
        ['ولد', 'يُوْلِدْ'],
        ['وصل', 'يُوْصِلْ'],
        ['عرب', 'يُعْرِبْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضح', 4), 'jussive')).toEqualT({
          '1s': 'أُوْضِحْ',
          '2ms': 'تُوْضِحْ',
          '2fs': 'تُوْضِحِي',
          '3ms': 'يُوْضِحْ',
          '3fs': 'تُوْضِحْ',
          '2d': 'تُوْضِحَا',
          '3md': 'يُوْضِحَا',
          '3fd': 'تُوْضِحَا',
          '1p': 'نُوْضِحْ',
          '2mp': 'تُوْضِحُوْا',
          '2fp': 'تُوْضِحْنَ',
          '3mp': 'يُوْضِحُوْا',
          '3fp': 'يُوْضِحْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['ومأ', 'يُوْمِئْ'],
        ['نشأ', 'يُنْشِئْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشِرْ'],
        ['رود', 'يُرِدْ'],
        ['تيح', 'يُتِحْ'],
        ['فيد', 'يُفِدْ'],
        ['عود', 'يُعِدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذِنْ'],
        ['أمن', 'يُؤْمِنْ'],
        ['ألم', 'يُؤْلِمْ'],
        ['أجر', 'يُؤْجِرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('آمَنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمن', 4), 'jussive')).toEqualT({
          '1s': 'أُؤْمِنْ',
          '2ms': 'تُؤْمِنْ',
          '2fs': 'تُؤْمِنِي',
          '3ms': 'يُؤْمِنْ',
          '3fs': 'تُؤْمِنْ',
          '2d': 'تُؤْمِنَا',
          '3md': 'يُؤْمِنَا',
          '3fd': 'تُؤْمِنَا',
          '1p': 'نُؤْمِنْ',
          '2mp': 'تُؤْمِنُوْا',
          '2fp': 'تُؤْمِنَّ',
          '3mp': 'يُؤْمِنُوْا',
          '3fp': 'يُؤْمِنَّ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتِمَّ'],
        ['سفف', 'يُسِفَّ'],
        ['حبب', 'يُحِبَّ'],
        ['عدد', 'يُعِدَّ'],
        ['همم', 'يُهِمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَحَبَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 4), 'jussive')).toEqualT({
          '1s': 'أُحِبَّ',
          '2ms': 'تُحِبَّ',
          '2fs': 'تُحِبِّي',
          '3ms': 'يُحِبَّ',
          '3fs': 'تُحِبَّ',
          '2d': 'تُحِبَّا',
          '3md': 'يُحِبَّا',
          '3fd': 'تُحِبَّا',
          '1p': 'نُحِبَّ',
          '2mp': 'تُحِبُّوْا',
          '2fp': 'تُحْبِبْنَ',
          '3mp': 'يُحِبُّوْا',
          '3fp': 'يُحْبِبْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'يُعْلِ'],
        ['بقي', 'يُبْقِ'],
        ['سمي', 'يُسْمِ'],
        ['عطي', 'يُعْطِ'],
        ['لقي', 'يُلْقِ'],
        ['وصي', 'يُوْصِ'],
        ['وحي', 'يُوْحِ'],
        ['وفي', 'يُوْفِ'],
        ['ودي', 'يُوْدِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 4), 'jussive')).toEqualT({
          '1s': 'أُحْيِ',
          '2ms': 'تُحْيِ',
          '2fs': 'تُحْيِي',
          '3ms': 'يُحْيِ',
          '3fs': 'تُحْيِ',
          '2d': 'تُحْيِيَا',
          '3md': 'يُحْيِيَا',
          '3fd': 'تُحْيِيَا',
          '1p': 'نُحْيِ',
          '2mp': 'تُحْيُوْا',
          '2fp': 'تُحْيِيْنَ',
          '3mp': 'يُحْيُوْا',
          '3fp': 'يُحْيِيْنَ',
        })
      })

      test('أَرَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 4), 'jussive')).toEqualT({
          '1s': 'أُرِ',
          '2ms': 'تُرِ',
          '2fs': 'تُرِي',
          '3ms': 'يُرِ',
          '3fs': 'تُرِ',
          '2d': 'تُرِيَا',
          '3md': 'يُرِيَا',
          '3fd': 'تُرِيَا',
          '1p': 'نُرِ',
          '2mp': 'تُرُوا',
          '2fp': 'تُرِينَ',
          '3mp': 'يُرُوا',
          '3fp': 'يُرِينَ',
        })
      })

      test('drops the final glide for أَعْطَى', () => {
        expect(conjugatePresentMood(getVerb('عطي', 4), 'jussive')).toMatchObjectT({
          '3ms': 'يُعْطِ',
          '2ms': 'تُعْطِ',
          '1p': 'نُعْطِ',
          '2fs': 'تُعْطِي',
          '3mp': 'يُعْطُوْا',
        })
      })

      test('drops the final glide for أَضْحَى', () => {
        expect(conjugatePresentMood(getVerb('ضحي', 4), 'jussive')).toMatchObjectT({
          '3ms': 'يُضْحِ',
          '2ms': 'تُضْحِ',
          '1p': 'نُضْحِ',
          '2fs': 'تُضْحِي',
          '3mp': 'يُضْحُوْا',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test('آتَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أتي', 4), 'jussive')).toEqualT({
          '1s': 'أُؤْتِ',
          '2ms': 'تُؤْتِ',
          '2fs': 'تُؤْتِي',
          '3ms': 'يُؤْتِ',
          '3fs': 'تُؤْتِ',
          '2d': 'تُؤْتِيَا',
          '3md': 'يُؤْتِيَا',
          '3fd': 'تُؤْتِيَا',
          '1p': 'نُؤْتِ',
          '2mp': 'تُؤْتُوْا',
          '2fp': 'تُؤْتِيْنَ',
          '3mp': 'يُؤْتُوْا',
          '3fp': 'يُؤْتِيْنَ',
        })
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['حدث', 'يَتَحَدَّثْ'],
        ['مثل', 'يَتَمَثَّلْ'],
        ['عرف', 'يَتَعَرَّفْ'],
        ['هدد', 'يَتَهَدَّدْ'],
        ['حدد', 'يَتَحَدَّدْ'],
        ['عزز', 'يَتَعَزَّزْ'],
        ['سبب', 'يَتَسَبَّبْ'],
        ['قرر', 'يَتَقَرَّرْ'],
        ['وفي', 'يَتَوَفَّ'],
        ['وقي', 'يَتَوَقَّ'],
        ['وخي', 'يَتَوَخَّ'],
        ['زوي', 'يَتَزَوَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يَتَأَخَّرْ'],
        ['ألف', 'يَتَأَلَّفْ'],
        ['أكد', 'يَتَأَكَّدْ'],
        ['أكل', 'يَتَأَكَّلْ'],
        ['أثر', 'يَتَأَثَّرْ'],
        ['أوه', 'يَتَأَوَّهْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'يَتَأَمَّمْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'يَتَأَذَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَوَصَّلْ'],
        ['وفر', 'يَتَوَفَّرْ'],
        ['وقف', 'يَتَوَقَّفْ'],
        ['وكأ', 'يَتَوَكَّأْ'],
        ['وقع', 'يَتَوَقَّعْ'],
        ['وسع', 'يَتَوَسَّعْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يَتَحَوَّلْ'],
        ['قول', 'يَتَقَوَّلْ'],
        ['عين', 'يَتَعَيَّنْ'],
        ['غير', 'يَتَغَيَّرْ'],
        ['طور', 'يَتَطَوَّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'يَتَبَقَّ'],
        ['سني', 'يَتَسَنَّ'],
        ['بني', 'يَتَبَنَّ'],
        ['حدي', 'يَتَحَدَّ'],
        ['سمي', 'يَتَسَمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })

      test('تَرَأَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 5), 'jussive')).toEqualT({
          '1s': 'أَتَرَأَّ',
          '2ms': 'تَتَرَأَّ',
          '2fs': 'تَتَرَأَّيْ',
          '3ms': 'يَتَرَأَّ',
          '3fs': 'تَتَرَأَّ',
          '2d': 'تَتَرَأَّيَا',
          '3md': 'يَتَرَأَّيَا',
          '3fd': 'تَتَرَأَّيَا',
          '1p': 'نَتَرَأَّ',
          '2mp': 'تَتَرَأَّوْا',
          '2fp': 'تَتَرَأَّيْنَ',
          '3mp': 'يَتَرَأَّوْا',
          '3fp': 'يَتَرَأَّيْنَ',
        })
      })

      test('تَوَفَّى conjugation', () => {
        // Based on authoritative sources: Form V defective verbs drop the final weak letter (ى) in jussive
        // Dual forms drop the weak letter before alif (similar to Form II)
        // Masculine plural forms have damma before waw (similar to Form II)
        // Feminine plural forms preserve yeh before noon + fatḥa (similar to Form II)
        // 2fs form has kasra before final yeh (similar to Form II)
        expect(conjugatePresentMood(getVerb('وفي', 5), 'jussive')).toEqualT({
          '1s': 'أَتَوَفَّ',
          '2ms': 'تَتَوَفَّ',
          '2fs': 'تَتَوَفَّيْ',
          '3ms': 'يَتَوَفَّ',
          '3fs': 'تَتَوَفَّ',
          '2d': 'تَتَوَفَّيَا',
          '3md': 'يَتَوَفَّيَا',
          '3fd': 'تَتَوَفَّيَا',
          '1p': 'نَتَوَفَّ',
          '2mp': 'تَتَوَفَّوْا',
          '2fp': 'تَتَوَفَّيْنَ',
          '3mp': 'يَتَوَفَّوْا',
          '3fp': 'يَتَوَفَّيْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيء', 5), 'jussive')).toEqualT({
          '1s': 'أَتَهَيَّأْ',
          '2ms': 'تَتَهَيَّأْ',
          '2fs': 'تَتَهَيَّئِي',
          '3ms': 'يَتَهَيَّأْ',
          '3fs': 'تَتَهَيَّأْ',
          '2d': 'تَتَهَيَّآ',
          '3md': 'يَتَهَيَّآ',
          '3fd': 'تَتَهَيَّآ',
          '1p': 'نَتَهَيَّأْ',
          '2mp': 'تَتَهَيَّؤُوْا',
          '2fp': 'تَتَهَيَّأْنَ',
          '3mp': 'يَتَهَيَّؤُوْا',
          '3fp': 'يَتَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 5), 'jussive')).toEqualT({
          '1s': 'أَتَضَوَّأْ',
          '2ms': 'تَتَضَوَّأْ',
          '2fs': 'تَتَضَوَّئِي',
          '3ms': 'يَتَضَوَّأْ',
          '3fs': 'تَتَضَوَّأْ',
          '2d': 'تَتَضَوَّآ',
          '3md': 'يَتَضَوَّآ',
          '3fd': 'تَتَضَوَّآ',
          '1p': 'نَتَضَوَّأْ',
          '2mp': 'تَتَضَوَّؤُوْا',
          '2fp': 'تَتَضَوَّأْنَ',
          '3mp': 'يَتَضَوَّؤُوْا',
          '3fp': 'يَتَضَوَّأْنَ',
        })
      })
    })
  })

  describe('Form VI', () => {
    describe('geminate roots', () => {
      test('تَحَابَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 6), 'jussive')).toEqualT({
          '1s': 'أَتَحَابّْ',
          '2ms': 'تَتَحَابّْ',
          '2fs': 'تَتَحَابِّي',
          '3ms': 'يَتَحَابّْ',
          '3fs': 'تَتَحَابّْ',
          '2d': 'تَتَحَابَّا',
          '3md': 'يَتَحَابَّا',
          '3fd': 'تَتَحَابَّا',
          '1p': 'نَتَحَابّْ',
          '2mp': 'تَتَحَابُّوْا',
          '2fp': 'تَتَحَابَبْنَ',
          '3mp': 'يَتَحَابُّوْا',
          '3fp': 'يَتَحَابَبْنَ',
        })
      })

      test('تَرَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردد', 6), 'jussive')).toEqualT({
          '1s': 'أَتَرَادّْ',
          '2ms': 'تَتَرَادّْ',
          '2fs': 'تَتَرَادِّي',
          '3ms': 'يَتَرَادّْ',
          '3fs': 'تَتَرَادّْ',
          '2d': 'تَتَرَادَّا',
          '3md': 'يَتَرَادَّا',
          '3fd': 'تَتَرَادَّا',
          '1p': 'نَتَرَادّْ',
          '2mp': 'تَتَرَادُّوْا',
          '2fp': 'تَتَرَادَدْنَ',
          '3mp': 'يَتَرَادُّوْا',
          '3fp': 'يَتَرَادَدْنَ',
        })
      })

      test('تَمَاسَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('مسس', 6), 'jussive')).toEqualT({
          '1s': 'أَتَمَاسّْ',
          '2ms': 'تَتَمَاسّْ',
          '2fs': 'تَتَمَاسِّي',
          '3ms': 'يَتَمَاسّْ',
          '3fs': 'تَتَمَاسّْ',
          '2d': 'تَتَمَاسَّا',
          '3md': 'يَتَمَاسَّا',
          '3fd': 'تَتَمَاسَّا',
          '1p': 'نَتَمَاسّْ',
          '2mp': 'تَتَمَاسُّوْا',
          '2fp': 'تَتَمَاسَسْنَ',
          '3mp': 'يَتَمَاسُّوْا',
          '3fp': 'يَتَمَاسَسْنَ',
        })
      })

      test('تَضَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضدد', 6), 'jussive')).toEqualT({
          '1s': 'أَتَضَادّْ',
          '2ms': 'تَتَضَادّْ',
          '2fs': 'تَتَضَادِّي',
          '3ms': 'يَتَضَادّْ',
          '3fs': 'تَتَضَادّْ',
          '2d': 'تَتَضَادَّا',
          '3md': 'يَتَضَادَّا',
          '3fd': 'تَتَضَادَّا',
          '1p': 'نَتَضَادّْ',
          '2mp': 'تَتَضَادُّوْا',
          '2fp': 'تَتَضَادَدْنَ',
          '3mp': 'يَتَضَادُّوْا',
          '3fp': 'يَتَضَادَدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['نول', 'يَتَنَاوَلْ'],
        ['فوض', 'يَتَفَاوَضْ'],
        ['جوز', 'يَتَجَاوَزْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'يَتَآلَفْ'],
        ['أكل', 'يَتَآكَلْ'],
        ['أمر', 'يَتَآمَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطأ', 'يَتَبَاطَأْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })

      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 6), 'jussive')).toEqualT({
          '1s': 'أَتَوَاطَأْ',
          '2ms': 'تَتَوَاطَأْ',
          '2fs': 'تَتَوَاطَئِي',
          '3ms': 'يَتَوَاطَأْ',
          '3fs': 'تَتَوَاطَأْ',
          '2d': 'تَتَوَاطَآ',
          '3md': 'يَتَوَاطَآ',
          '3fd': 'تَتَوَاطَآ',
          '1p': 'نَتَوَاطَأْ',
          '2mp': 'تَتَوَاطَأُوْا',
          '2fp': 'تَتَوَاطَأْنَ',
          '3mp': 'يَتَوَاطَأُوْا',
          '3fp': 'يَتَوَاطَأْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نمو', 'يَتَنَامَ'],
        ['مشي', 'يَتَمَاشَ'],
        ['عفو', 'يَتَعَافَ'],
        ['هوي', 'يَتَهَاوَ'],
        ['ولي', 'يَتَوَالَ'],
        ['وصي', 'يَتَوَاصَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each<[string, string]>([
        ['خفض', 'يَنْخَفِضْ'],
        ['عكس', 'يَنْعَكِسْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })
    })

    describe('hamzated final roots', () => {
      test('اِنْقَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 7), 'jussive')).toEqualT({
          '1s': 'أَنْقَرِئْ',
          '2ms': 'تَنْقَرِئْ',
          '2fs': 'تَنْقَرِئِي',
          '3ms': 'يَنْقَرِئْ',
          '3fs': 'تَنْقَرِئْ',
          '2d': 'تَنْقَرِئَا',
          '3md': 'يَنْقَرِئَا',
          '3fd': 'تَنْقَرِئَا',
          '1p': 'نَنْقَرِئْ',
          '2mp': 'تَنْقَرِئُوْا',
          '2fp': 'تَنْقَرِئْنَ',
          '3mp': 'يَنْقَرِئُوْا',
          '3fp': 'يَنْقَرِئْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['قصص', 'يَنْقَصَّ'],
        ['بثث', 'يَنْبَثَّ'],
        ['كفف', 'يَنْكَفَّ'],
        ['دسس', 'يَنْدَسَّ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قصص', 7), 'jussive')).toEqualT({
          '1s': 'أَنْقَصَّ',
          '2ms': 'تَنْقَصَّ',
          '2fs': 'تَنْقَصِي',
          '3ms': 'يَنْقَصَّ',
          '3fs': 'تَنْقَصَّ',
          '2d': 'تَنْقَصَّا',
          '3md': 'يَنْقَصَّا',
          '3fd': 'تَنْقَصَّا',
          '1p': 'نَنْقَصَّ',
          '2mp': 'تَنْقَصُّوْا',
          '2fp': 'تَنْقَصْنَ',
          '3mp': 'يَنْقَصُّوْا',
          '3fp': 'يَنْقَصْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['قود', 'يَنْقَدْ'],
        ['هيل', 'يَنْهَلْ'],
        ['حوز', 'يَنْحَزْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['قضي', 'يَنْقَضِ'],
        ['حني', 'يَنْحَنِ'],
        ['ثني', 'يَنْثَنِ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })
    })

    describe('doubly weak roots', () => {
      test('اِنْزَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوي', 7), 'jussive')).toEqualT({
          '1s': 'أَنْزَوِ',
          '2ms': 'تَنْزَوِ',
          '2fs': 'تَنْزَوِي',
          '3ms': 'يَنْزَوِ',
          '3fs': 'تَنْزَوِ',
          '2d': 'تَنْزَوِيَا',
          '3md': 'يَنْزَوِيَا',
          '3fd': 'تَنْزَوِيَا',
          '1p': 'نَنْزَوِ',
          '2mp': 'تَنْزَوُوْا',
          '2fp': 'تَنْزَوِينَ',
          '3mp': 'يَنْزَوُوْا',
          '3fp': 'يَنْزَوِينَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each<[string, string]>([
        ['قرح', 'يَقْتَرِحْ'],
        ['عبر', 'يَعْتَبِرْ'],
        ['عمد', 'يَعْتَمِدْ'],
        ['نظر', 'يَنْتَظِرْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضلع', 8), 'jussive')).toEqualT({
          '1s': 'أَضْطَلِعْ',
          '2ms': 'تَضْطَلِعْ',
          '2fs': 'تَضْطَلِعِي',
          '3ms': 'يَضْطَلِعْ',
          '3fs': 'تَضْطَلِعْ',
          '2d': 'تَضْطَلِعَا',
          '3md': 'يَضْطَلِعَا',
          '3fd': 'تَضْطَلِعَا',
          '1p': 'نَضْطَلِعْ',
          '2mp': 'تَضْطَلِعُوْا',
          '2fp': 'تَضْطَلِعْنَ',
          '3mp': 'يَضْطَلِعُوْا',
          '3fp': 'يَضْطَلِعْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حلل', 'يَحْتَلَّ'],
        ['مدد', 'يَمْتَدَّ'],
        ['حجج', 'يَحْتَجَّ'],
        ['ردد', 'يَرْتَدَّ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِضْطَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضرر', 8), 'jussive')).toEqualT({
          '1s': 'أَضْطَرَّ',
          '2ms': 'تَضْطَرَّ',
          '2fs': 'تَضْطَرِّي',
          '3ms': 'يَضْطَرَّ',
          '3fs': 'تَضْطَرَّ',
          '2d': 'تَضْطَرَّا',
          '3md': 'يَضْطَرَّا',
          '3fd': 'تَضْطَرَّا',
          '1p': 'نَضْطَرَّ',
          '2mp': 'تَضْطَرُّوْا',
          '2fp': 'تَضْطَرِرْنَ',
          '3mp': 'يَضْطَرُّوْا',
          '3fp': 'يَضْطَرِرْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['قود', 'يَقْتَدْ'],
        ['سوء', 'يَسْتَأْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوج', 8), 'jussive')).toEqualT({
          '1s': 'أَزْدَوِجْ',
          '2ms': 'تَزْدَوِجْ',
          '2fs': 'تَزْدَوِجِي',
          '3ms': 'يَزْدَوِجْ',
          '3fs': 'تَزْدَوِجْ',
          '2d': 'تَزْدَوِجَا',
          '3md': 'يَزْدَوِجَا',
          '3fd': 'تَزْدَوِجَا',
          '1p': 'نَزْدَوِجْ',
          '2mp': 'تَزْدَوِجُوْا',
          '2fp': 'تَزْدَوِجْنَ',
          '3mp': 'يَزْدَوِجُوْا',
          '3fp': 'يَزْدَوِجْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['دعو', 'يَدَّعِ'],
        ['قضي', 'يَقْتَضِ'],
        ['ردي', 'يَرْتَدِ'],
        ['شري', 'يَشْتَرِ'],
        ['خفي', 'يَخْتَفِ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِرْتَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 8), 'jussive')).toEqualT({
          '1s': 'أَرْتَئِ',
          '2ms': 'تَرْتَئِ',
          '2fs': 'تَرْتَئِي',
          '3ms': 'يَرْتَئِ',
          '3fs': 'تَرْتَئِ',
          '2d': 'تَرْتَئِيَا',
          '3md': 'يَرْتَئِيَا',
          '3fd': 'تَرْتَئِيَا',
          '1p': 'نَرْتَئِ',
          '2mp': 'تَرْتَئُوْا',
          '2fp': 'تَرْتَئِيْنَ',
          '3mp': 'يَرْتَئُوْا',
          '3fp': 'يَرْتَئِيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each<[string, string]>([
        ['وقي', 'يَتَّقِ'],
        ['نوي', 'يَنْتَوِ'],
        ['سوي', 'يَسْتَوِ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([['وصل', 'يَتَّصِلْ']])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })

      test('اِتَّكَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وكأ', 8), 'jussive')).toEqualT({
          '1s': 'أَتَّكِئْ',
          '2ms': 'تَتَّكِئْ',
          '2fs': 'تَتَّكِئِي',
          '3ms': 'يَتَّكِئْ',
          '3fs': 'تَتَّكِئْ',
          '2d': 'تَتَّكِئَا',
          '3md': 'يَتَّكِئَا',
          '3fd': 'تَتَّكِئَا',
          '1p': 'نَتَّكِئْ',
          '2mp': 'تَتَّكِئُوْا',
          '2fp': 'تَتَّكِئْنَ',
          '3mp': 'يَتَّكِئُوْا',
          '3fp': 'يَتَّكِئْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('drops the hamza', () => {
        expect(conjugatePresentMood(getVerb('أخذ', 8), 'jussive')).toMatchObjectT({
          '3ms': 'يَتَّخِذْ',
          '2ms': 'تَتَّخِذْ',
          '1s': 'أَتَّخِذْ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يَأْتَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 8), 'jussive')).toEqualT({
          '1s': 'آتَمَّ',
          '2ms': 'تَأْتَمَّ',
          '2fs': 'تَأْتَمِّي',
          '3ms': 'يَأْتَمَّ',
          '3fs': 'تَأْتَمَّ',
          '2d': 'تَأْتَمَّا',
          '3md': 'يَأْتَمَّا',
          '3fd': 'تَأْتَمَّا',
          '1p': 'نَأْتَمَّ',
          '2mp': 'تَأْتَمُّوْا',
          '2fp': 'تَأْتَمِمْنَ',
          '3mp': 'يَأْتَمُّوْا',
          '3fp': 'يَأْتَمِمْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'يُعَامِلْ'],
        ['كلم', 'يُكَالِمْ'],
        ['تبع', 'يُتَابِعْ'],
        ['بلغ', 'يُبَالِغْ'],
        ['سعد', 'يُسَاعِدْ'],
        ['صحب', 'يُصَاحِبْ'],
        ['وجه', 'يُوَاجِهْ'],
        ['وثق', 'يُوَاثِقْ'],
        ['وعد', 'يُوَاعِدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارَّ'],
        ['ردد', 'يُرَادَّ'],
        ['مدد', 'يُمَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سرر', 3), 'jussive')).toEqualT({
          '1s': 'أُسَارَّ',
          '2ms': 'تُسَارَّ',
          '2fs': 'تُسَارِّي',
          '3ms': 'يُسَارَّ',
          '3fs': 'تُسَارَّ',
          '2d': 'تُسَارَّا',
          '3md': 'يُسَارَّا',
          '3fd': 'تُسَارَّا',
          '1p': 'نُسَارَّ',
          '2mp': 'تُسَارُّوْا',
          '2fp': 'تُسَارِرْنَ',
          '3mp': 'يُسَارُّوْا',
          '3fp': 'يُسَارِرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردد', 3), 'jussive')).toEqualT({
          '1s': 'أُرَادَّ',
          '2ms': 'تُرَادَّ',
          '2fs': 'تُرَادِّي',
          '3ms': 'يُرَادَّ',
          '3fs': 'تُرَادَّ',
          '2d': 'تُرَادَّا',
          '3md': 'يُرَادَّا',
          '3fd': 'تُرَادَّا',
          '1p': 'نُرَادَّ',
          '2mp': 'تُرَادُّوْا',
          '2fp': 'تُرَادِدْنَ',
          '3mp': 'يُرَادُّوْا',
          '3fp': 'يُرَادِدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('مدد', 3), 'jussive')).toEqualT({
          '1s': 'أُمَادَّ',
          '2ms': 'تُمَادَّ',
          '2fs': 'تُمَادِّي',
          '3ms': 'يُمَادَّ',
          '3fs': 'تُمَادَّ',
          '2d': 'تُمَادَّا',
          '3md': 'يُمَادَّا',
          '3fd': 'تُمَادَّا',
          '1p': 'نُمَادَّ',
          '2mp': 'تُمَادُّوْا',
          '2fp': 'تُمَادِدْنَ',
          '3mp': 'يُمَادُّوْا',
          '3fp': 'يُمَادِدْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'يُوَازِ'],
        ['وفي', 'يُوَافِ'],
        ['وسي', 'يُوَاسِ'],
        ['نوي', 'يُنَاوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'يُنَادِ'],
        ['رعي', 'يُرَاعِ'],
        ['بلي', 'يُبَالِ'],
        ['قضي', 'يُقَاضِ'],
        ['بري', 'يُبَارِ'],
        ['رءي', 'يُرَائِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخِذْ'],
        ['أجر', 'يُؤَاجِرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أخذ', 3), 'jussive')).toEqualT({
          '1s': 'أُؤَاخِذْ',
          '2ms': 'تُؤَاخِذْ',
          '2fs': 'تُؤَاخِذِي',
          '3ms': 'يُؤَاخِذْ',
          '3fs': 'تُؤَاخِذْ',
          '2d': 'تُؤَاخِذَا',
          '3md': 'يُؤَاخِذَا',
          '3fd': 'تُؤَاخِذَا',
          '1p': 'نُؤَاخِذْ',
          '2mp': 'تُؤَاخِذُوْا',
          '2fp': 'تُؤَاخِذْنَ',
          '3mp': 'يُؤَاخِذُوْا',
          '3fp': 'يُؤَاخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أجر', 3), 'jussive')).toEqualT({
          '1s': 'أُؤَاجِرْ',
          '2ms': 'تُؤَاجِرْ',
          '2fs': 'تُؤَاجِرِي',
          '3ms': 'يُؤَاجِرْ',
          '3fs': 'تُؤَاجِرْ',
          '2d': 'تُؤَاجِرَا',
          '3md': 'يُؤَاجِرَا',
          '3fd': 'تُؤَاجِرَا',
          '1p': 'نُؤَاجِرْ',
          '2mp': 'تُؤَاجِرُوْا',
          '2fp': 'تُؤَاجِرْنَ',
          '3mp': 'يُؤَاجِرُوْا',
          '3fp': 'يُؤَاجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['وأم', 'يُوَائِمْ'],
        ['لأم', 'يُلَائِمْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('فجأ', 3), 'jussive')).toEqualT({
          '1s': 'أُفَاجِئْ',
          '2ms': 'تُفَاجِئْ',
          '2fs': 'تُفَاجِئِي',
          '3ms': 'يُفَاجِئْ',
          '3fs': 'تُفَاجِئْ',
          '2d': 'تُفَاجِئَا',
          '3md': 'يُفَاجِئَا',
          '3fd': 'تُفَاجِئَا',
          '1p': 'نُفَاجِئْ',
          '2mp': 'تُفَاجِئُوْا',
          '2fp': 'تُفَاجِئْنَ',
          '3mp': 'يُفَاجِئُوْا',
          '3fp': 'يُفَاجِئْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test('shadda is preserved', () => {
        expect(conjugatePresentMood(getVerb('حمر', 9), 'jussive')).toMatchObjectT({
          '3ms': 'يَحْمَرَّ',
          '2ms': 'تَحْمَرَّ',
          '1s': 'أَحْمَرَّ',
        })
      })

      test('shadda is expanded for feminine plural', () => {
        expect(conjugatePresentMood(getVerb('حمر', 9), 'jussive')).toMatchObjectT({
          '2fp': 'تَحْمَرَرْنَ',
          '3fp': 'يَحْمَرَرْنَ',
        })
      })
    })
  })

  describe('Form X', () => {
    describe('geminate roots', () => {
      test('اِسْتَحَمَّ conjugation', () => {
        // Wiktionary lists multiple jussive variants; this uses the contracted form with shadda.
        expect(conjugatePresentMood(getVerb('حمم', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَحِمَّ',
          '2ms': 'تَسْتَحِمَّ',
          '2fs': 'تَسْتَحِمِّي',
          '3ms': 'يَسْتَحِمَّ',
          '3fs': 'تَسْتَحِمَّ',
          '2d': 'تَسْتَحِمَّا',
          '3md': 'يَسْتَحِمَّا',
          '3fd': 'تَسْتَحِمَّا',
          '1p': 'نَسْتَحِمَّ',
          '2mp': 'تَسْتَحِمُّوْا',
          '2fp': 'تَسْتَحْمِمْنَ',
          '3mp': 'يَسْتَحِمُّوْا',
          '3fp': 'يَسْتَحْمِمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([['قود', 'يَسْتَقِدْ']])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 10), 'jussive')
        expect(jussive['3ms']).toBe(expected3ms)
      })
    })

    describe('doubly weak roots', () => {
      test('preserves initial weak and drops final weak for اِسْتَوْفَى jussive', () => {
        expect(conjugatePresentMood(getVerb('وفي', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَوْفِ',
          '2ms': 'تَسْتَوْفِ',
          '2fs': 'تَسْتَوْفِي',
          '3ms': 'يَسْتَوْفِ',
          '3fs': 'تَسْتَوْفِ',
          '2d': 'تَسْتَوْفَا',
          '3md': 'يَسْتَوْفَا',
          '3fd': 'تَسْتَوْفَا',
          '1p': 'نَسْتَوْفِ',
          '2mp': 'تَسْتَوْفُوْا',
          '2fp': 'تَسْتَوْفِيْنَ',
          '3mp': 'يَسْتَوْفُوْا',
          '3fp': 'يَسْتَوْفِيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ (Form X) conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَقْرِئْ',
          '2ms': 'تَسْتَقْرِئْ',
          '2fs': 'تَسْتَقْرِئِي',
          '3ms': 'يَسْتَقْرِئْ',
          '3fs': 'تَسْتَقْرِئْ',
          '2d': 'تَسْتَقْرِئَا',
          '3md': 'يَسْتَقْرِئَا',
          '3fd': 'تَسْتَقْرِئَا',
          '1p': 'نَسْتَقْرِئْ',
          '2mp': 'تَسْتَقْرِئُوْا',
          '2fp': 'تَسْتَقْرِئْنَ',
          '3mp': 'يَسْتَقْرِئُوْا',
          '3fp': 'يَسْتَقْرِئْنَ',
        })
      })
    })
  })
})
