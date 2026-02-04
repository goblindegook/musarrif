import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present jussive', () => {
  describe('Form I', () => {
    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرْ'],
        ['مثل', 'يُمْثَلْ'],
        ['دعم', 'يُدْعَمْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'jussive')).toEqualT({
          '1s': 'أُكْتَبْ',
          '2ms': 'تُكْتَبْ',
          '2fs': 'تُكْتَبِي',
          '3ms': 'يُكْتَبْ',
          '3fs': 'تُكْتَبْ',
          '2d': 'تُكْتَبَا',
          '3md': 'يُكْتَبَا',
          '3fd': 'تُكْتَبَا',
          '1p': 'نُكْتَبْ',
          '2mp': 'تُكْتَبُوْا',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُوْا',
          '3fp': 'يُكْتَبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'jussive')).toEqualT({
          '1s': 'أُوقَفْ',
          '2ms': 'تُوقَفْ',
          '2fs': 'تُوقَفِي',
          '3ms': 'يُوقَفْ',
          '3fs': 'تُوقَفْ',
          '2d': 'تُوقَفَا',
          '3md': 'يُوقَفَا',
          '3fd': 'تُوقَفَا',
          '1p': 'نُوقَفْ',
          '2mp': 'تُوقَفُوْا',
          '2fp': 'تُوقَفْنَ',
          '3mp': 'يُوقَفُوْا',
          '3fp': 'يُوقَفْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['أدد', 'يُؤَدَّ'],
        ['أجج', 'يُؤَجَّ'],
        ['أزز', 'يُؤَزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'jussive')).toEqualT({
          '1s': 'أُلَمَّ',
          '2ms': 'تُلَمَّ',
          '2fs': 'تُلَمِّي',
          '3ms': 'يُلَمَّ',
          '3fs': 'تُلَمَّ',
          '2d': 'تُلَمَّا',
          '3md': 'يُلَمَّا',
          '3fd': 'تُلَمَّا',
          '1p': 'نُلَمَّ',
          '2mp': 'تُلَمُّوْا',
          '2fp': 'تُلْمَمْنَ',
          '3mp': 'يُلَمُّوْا',
          '3fp': 'يُلْمَمْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'jussive')).toEqualT({
          '1s': 'أُؤَمَّ',
          '2ms': 'تُؤَمَّ',
          '2fs': 'تُؤَمِّي',
          '3ms': 'يُؤَمَّ',
          '3fs': 'تُؤَمَّ',
          '2d': 'تُؤَمَّا',
          '3md': 'يُؤَمَّا',
          '3fd': 'تُؤَمَّا',
          '1p': 'نُؤَمَّ',
          '2mp': 'تُؤَمُّوْا',
          '2fp': 'تُؤْمَمْنَ',
          '3mp': 'يُؤَمُّوْا',
          '3fp': 'يُؤْمَمْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'jussive')).toEqualT({
          '1s': 'أُوَدَّ',
          '2ms': 'تُوَدَّ',
          '2fs': 'تُوَدِّي',
          '3ms': 'يُوَدَّ',
          '3fs': 'تُوَدَّ',
          '2d': 'تُوَدَّا',
          '3md': 'يُوَدَّا',
          '3fd': 'تُوَدَّا',
          '1p': 'نُوَدَّ',
          '2mp': 'تُوَدُّوْا',
          '2fp': 'تُودَدْنَ',
          '3mp': 'يُوَدُّوْا',
          '3fp': 'يُودَدْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وقف', 'يُوقَفْ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'jussive')).toEqualT({
          '1s': 'أُومَنْ',
          '2ms': 'تُومَنْ',
          '2fs': 'تُومَنِي',
          '3ms': 'يُومَنْ',
          '3fs': 'تُومَنْ',
          '2d': 'تُومَنَا',
          '3md': 'يُومَنَا',
          '3fd': 'تُومَنَا',
          '1p': 'نُومَنْ',
          '2mp': 'تُومَنُوْا',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُوْا',
          '3fp': 'يُومَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يُحَلْ'],
        ['عوم', 'يُعَمْ'],
        ['قول', 'يُقَلْ'],
        ['خور', 'يُخْوَرْ'],
        ['خوف', 'يُخَفْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'jussive')).toEqualT({
          '1s': 'أُعْوَزْ',
          '2ms': 'تُعْوَزْ',
          '2fs': 'تُعْوَزِي',
          '3ms': 'يُعْوَزْ',
          '3fs': 'تُعْوَزْ',
          '2d': 'تُعْوَزَا',
          '3md': 'يُعْوَزَا',
          '3fd': 'تُعْوَزَا',
          '1p': 'نُعْوَزْ',
          '2mp': 'تُعْوَزُوْا',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُوْا',
          '3fp': 'يُعْوَزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'jussive')).toEqualT({
          '1s': 'أُلَمْ',
          '2ms': 'تُلَمْ',
          '2fs': 'تُلَامِي',
          '3ms': 'يُلَمْ',
          '3fs': 'تُلَمْ',
          '2d': 'تُلَامَا',
          '3md': 'يُلَامَا',
          '3fd': 'تُلَامَا',
          '1p': 'نُلَمْ',
          '2mp': 'تُلَامُوْا',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُوْا',
          '3fp': 'يُلَمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'jussive')).toEqualT({
          '1s': 'أُبَعْ',
          '2ms': 'تُبَعْ',
          '2fs': 'تُبَاعِي',
          '3ms': 'يُبَعْ',
          '3fs': 'تُبَعْ',
          '2d': 'تُبَاعَا',
          '3md': 'يُبَاعَا',
          '3fd': 'تُبَاعَا',
          '1p': 'نُبَعْ',
          '2mp': 'تُبَاعُوْا',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُوْا',
          '3fp': 'يُبَعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'jussive')).toEqualT({
          '1s': 'أُزَرْ',
          '2ms': 'تُزَرْ',
          '2fs': 'تُزَارِي',
          '3ms': 'يُزَرْ',
          '3fs': 'تُزَرْ',
          '2d': 'تُزَارَا',
          '3md': 'يُزَارَا',
          '3fd': 'تُزَارَا',
          '1p': 'نُزَرْ',
          '2mp': 'تُزَارُوْا',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُوْا',
          '3fp': 'يُزَرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'jussive')).toEqualT({
          '1s': 'أُشَدْ',
          '2ms': 'تُشَدْ',
          '2fs': 'تُشَادِي',
          '3ms': 'يُشَدْ',
          '3fs': 'تُشَدْ',
          '2d': 'تُشَادَا',
          '3md': 'يُشَادَا',
          '3fd': 'تُشَادَا',
          '1p': 'نُشَدْ',
          '2mp': 'تُشَادُوْا',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُوْا',
          '3fp': 'يُشَدْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'يُؤَلْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يُؤَلْ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 1), 'jussive')).toEqualT({
          '1s': 'أُؤَلْ',
          '2ms': 'تُؤَلْ',
          '2fs': 'تُؤَالِي',
          '3ms': 'يُؤَلْ',
          '3fs': 'تُؤَلْ',
          '2d': 'تُؤَالَا',
          '3md': 'يُؤَالَا',
          '3fd': 'تُؤَالَا',
          '1p': 'نُؤَلْ',
          '2mp': 'تُؤَالُوْا',
          '2fp': 'تُؤَلْنَ',
          '3mp': 'يُؤَالُوْا',
          '3fp': 'يُؤَلْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أني', 'يُؤْنَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَبَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أبي', 1), 'jussive')).toEqualT({
          '1s': 'أُوبَ',
          '2ms': 'تُؤْبَ',
          '2fs': 'تُؤْبَيْ',
          '3ms': 'يُؤْبَ',
          '3fs': 'تُؤْبَ',
          '2d': 'تُؤْبَيَا',
          '3md': 'يُؤْبَيَا',
          '3fd': 'تُؤْبَيَا',
          '1p': 'نُؤْبَ',
          '2mp': 'تُؤْبَوْا',
          '2fp': 'تُؤْبَيْنَ',
          '3mp': 'يُؤْبَوْا',
          '3fp': 'يُؤْبَيْنَ',
        })
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'jussive')).toEqualT({
          '1s': 'أُوخَذْ',
          '2ms': 'تُؤْخَذْ',
          '2fs': 'تُؤْخَذِي',
          '3ms': 'يُؤْخَذْ',
          '3fs': 'تُؤْخَذْ',
          '2d': 'تُؤْخَذَا',
          '3md': 'يُؤْخَذَا',
          '3fd': 'تُؤْخَذَا',
          '1p': 'نُؤْخَذْ',
          '2mp': 'تُؤْخَذُوْا',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُوْا',
          '3fp': 'يُؤْخَذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'jussive')).toEqualT({
          '1s': 'أُووَ',
          '2ms': 'تُؤْوَ',
          '2fs': 'تُؤْوَيْ',
          '3ms': 'يُؤْوَ',
          '3fs': 'تُؤْوَ',
          '2d': 'تُؤْوَيَا',
          '3md': 'يُؤْوَيَا',
          '3fd': 'تُؤْوَيَا',
          '1p': 'نُؤْوَ',
          '2mp': 'تُؤْوَوْا',
          '2fp': 'تُؤْوَيْنَ',
          '3mp': 'يُؤْوَوْا',
          '3fp': 'يُؤْوَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رأى', 'يُرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'jussive')).toEqualT({
          '1s': 'أُرَ',
          '2ms': 'تُرَ',
          '2fs': 'تُرَيْ',
          '3ms': 'يُرَ',
          '3fs': 'تُرَ',
          '2d': 'تُرَيَا',
          '3md': 'يُرَيَا',
          '3fd': 'تُرَيَا',
          '1p': 'نُرَ',
          '2mp': 'تُرَوْا',
          '2fp': 'تُرَيْنَ',
          '3mp': 'يُرَوْا',
          '3fp': 'يُرَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['وطء', 'يُوطَأْ'],
        ['كلأ', 'يُكْلَأْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كلأ', 1), 'jussive')).toEqualT({
          '1s': 'أُكْلَأْ',
          '2ms': 'تُكْلَأْ',
          '2fs': 'تُكْلَئِي',
          '3ms': 'يُكْلَأْ',
          '3fs': 'تُكْلَأْ',
          '2d': 'تُكْلَآ',
          '3md': 'يُكْلَآ',
          '3fd': 'تُكْلَآ',
          '1p': 'نُكْلَأْ',
          '2mp': 'تُكْلَأُوْا',
          '2fp': 'تُكْلَأْنَ',
          '3mp': 'يُكْلَأُوْا',
          '3fp': 'يُكْلَأْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'jussive')).toEqualT({
          '1s': 'أُوتَ',
          '2ms': 'تُؤْتَ',
          '2fs': 'تُؤْتَيْ',
          '3ms': 'يُؤْتَ',
          '3fs': 'تُؤْتَ',
          '2d': 'تُؤْتَيَا',
          '3md': 'يُؤْتَيَا',
          '3fd': 'تُؤْتَيَا',
          '1p': 'نُؤْتَ',
          '2mp': 'تُؤْتَوْا',
          '2fp': 'تُؤْتَيْنَ',
          '3mp': 'يُؤْتَوْا',
          '3fp': 'يُؤْتَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'يُغْشَ'],
        ['جدو', 'يُجْدَ'],
        ['لهو', 'يُلْهَ'],
        ['علي', 'يُعْلَ'],
        ['شفي', 'يُشْفَ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'jussive')).toEqualT({
          '1s': 'أُدْعَ',
          '2ms': 'تُدْعَ',
          '2fs': 'تُدْعَيْ',
          '3ms': 'يُدْعَ',
          '3fs': 'تُدْعَ',
          '2d': 'تُدْعَيَا',
          '3md': 'يُدْعَيَا',
          '3fd': 'تُدْعَيَا',
          '1p': 'نُدْعَ',
          '2mp': 'تُدْعَوْا',
          '2fp': 'تُدْعَيْنَ',
          '3mp': 'يُدْعَوْا',
          '3fp': 'يُدْعَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['جوي', 'يُجْوَ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('روى', 1), 'jussive')).toEqualT({
          '1s': 'أُرْوَ',
          '2ms': 'تُرْوَ',
          '2fs': 'تُرْوَيْ',
          '3ms': 'يُرْوَ',
          '3fs': 'تُرْوَ',
          '2d': 'تُرْوَيَا',
          '3md': 'يُرْوَيَا',
          '3fd': 'تُرْوَيَا',
          '1p': 'نُرْوَ',
          '2mp': 'تُرْوَوْا',
          '2fp': 'تُرْوَيْنَ',
          '3mp': 'يُرْوَوْا',
          '3fp': 'يُرْوَيْنَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'يُمَكَّنْ'],
        ['مثل', 'يُمَثَّلْ'],
        ['سبب', 'يُسَبَّبْ'],
        ['خطط', 'يُخَطَّطْ'],
        ['حدد', 'يُحَدَّدْ'],
        ['قرر', 'يُقَرَّرْ'],
        ['شدد', 'يُشَدَّدْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذِّ'],
        ['أسي', 'يُؤَسِّ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَذَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أذي', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَذِّ',
          '2ms': 'تُؤَذِّ',
          '2fs': 'تُؤَذِّيْ',
          '3ms': 'يُؤَذِّ',
          '3fs': 'تُؤَذِّ',
          '2d': 'تُؤَذِّيَا',
          '3md': 'يُؤَذِّيَا',
          '3fd': 'تُؤَذِّيَا',
          '1p': 'نُؤَذِّ',
          '2mp': 'تُؤَذُّوْا',
          '2fp': 'تُؤَذِّيْنَ',
          '3mp': 'يُؤَذُّوْا',
          '3fp': 'يُؤَذِّيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يُؤَخَّرْ'],
        ['أمر', 'يُؤَمَّرْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنَّأْ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['قوي', 'يُقَوَّ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('قَوَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('قوي', 2), 'jussive')).toEqualT({
          '1s': 'أُقَوَّ',
          '2ms': 'تُقَوَّ',
          '2fs': 'تُقَوَّيْ',
          '3ms': 'يُقَوَّ',
          '3fs': 'تُقَوَّ',
          '2d': 'تُقَوَّيَا',
          '3md': 'يُقَوَّيَا',
          '3fd': 'تُقَوَّيَا',
          '1p': 'نُقَوَّ',
          '2mp': 'تُقَوَّوْا',
          '2fp': 'تُقَوَّيْنَ',
          '3mp': 'يُقَوَّوْا',
          '3fp': 'يُقَوَّيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'يُوَطَّنْ'],
        ['وجه', 'يُوَجَّهْ'],
        ['وقف', 'يُوَقَّفْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يُوَسَّطْ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وسط', 2), 'jussive')).toEqualT({
          '1s': 'أُوَسَّطْ',
          '2ms': 'تُوَسَّطْ',
          '2fs': 'تُوَسَّطِي',
          '3ms': 'يُوَسَّطْ',
          '3fs': 'تُوَسَّطْ',
          '2d': 'تُوَسَّطَا',
          '3md': 'يُوَسَّطَا',
          '3fd': 'تُوَسَّطَا',
          '1p': 'نُوَسَّطْ',
          '2mp': 'تُوَسَّطُوْا',
          '2fp': 'تُوَسَّطْنَ',
          '3mp': 'يُوَسَّطُوْا',
          '3fp': 'يُوَسَّطْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطَّأْ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 2), 'jussive')).toEqualT({
          '1s': 'أُوَطَّأْ',
          '2ms': 'تُوَطَّأْ',
          '2fs': 'تُوَطَّئِي',
          '3ms': 'يُوَطَّأْ',
          '3fs': 'تُوَطَّأْ',
          '2d': 'تُوَطَّآ',
          '3md': 'يُوَطَّآ',
          '3fd': 'تُوَطَّآ',
          '1p': 'نُوَطَّأْ',
          '2mp': 'تُوَطَّأُوْا',
          '2fp': 'تُوَطَّأْنَ',
          '3mp': 'يُوَطَّأُوْا',
          '3fp': 'يُوَطَّأْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوَّسْ'],
        ['كون', 'يُكَوَّنْ'],
        ['دون', 'يُدَوَّنْ'],
        ['سوف', 'يُسَوَّفْ'],
        ['كيف', 'يُكَيَّفْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَوَّلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَوَّلْ',
          '2ms': 'تُؤَوَّلْ',
          '2fs': 'تُؤَوَّلِي',
          '3ms': 'يُؤَوَّلْ',
          '3fs': 'تُؤَوَّلْ',
          '2d': 'تُؤَوَّلَا',
          '3md': 'يُؤَوَّلَا',
          '3fd': 'تُؤَوَّلَا',
          '1p': 'نُؤَوَّلْ',
          '2mp': 'تُؤَوَّلُوْا',
          '2fp': 'تُؤَوَّلْنَ',
          '3mp': 'يُؤَوَّلُوْا',
          '3fp': 'يُؤَوَّلْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([
        ['أجج', 'يُؤَجَّجْ'],
        ['أيد', 'يُؤَيَّدْ'],
        ['أوب', 'يُؤَوَّبْ'],
        ['أسس', 'يُؤَسَّسْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُوَفَّ'],
        ['وصي', 'يُوَصَّ'],
        ['ولي', 'يُوَلَّ'],
        ['وري', 'يُوَرَّ'],
        ['مني', 'يُمَنِّ'],
        ['سمي', 'يُسَمِّ'],
        ['غطي', 'يُغَطِّ'],
        ['غني', 'يُغَنِّ'],
        ['زوي', 'يُزَوَّ'],
        ['هوي', 'يُهَوَّ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('مَنَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('مني', 2), 'jussive')).toEqualT({
          '1s': 'أُمَنِّ',
          '2ms': 'تُمَنِّ',
          '2fs': 'تُمَنِّيْ',
          '3ms': 'يُمَنِّ',
          '3fs': 'تُمَنِّ',
          '2d': 'تُمَنِّيَا',
          '3md': 'يُمَنِّيَا',
          '3fd': 'تُمَنِّيَا',
          '1p': 'نُمَنِّ',
          '2mp': 'تُمَنُّوْا',
          '2fp': 'تُمَنِّيْنَ',
          '3mp': 'يُمَنُّوْا',
          '3fp': 'يُمَنِّيْنَ',
        })
      })

      test('سَمَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('سمي', 2), 'jussive')).toEqualT({
          '1s': 'أُسَمِّ',
          '2ms': 'تُسَمِّ',
          '2fs': 'تُسَمِّيْ',
          '3ms': 'يُسَمِّ',
          '3fs': 'تُسَمِّ',
          '2d': 'تُسَمِّيَا',
          '3md': 'يُسَمِّيَا',
          '3fd': 'تُسَمِّيَا',
          '1p': 'نُسَمِّ',
          '2mp': 'تُسَمُّوْا',
          '2fp': 'تُسَمِّيْنَ',
          '3mp': 'يُسَمُّوْا',
          '3fp': 'يُسَمِّيْنَ',
        })
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 2), 'jussive')).toEqualT({
          '1s': 'أُحَيَّ',
          '2ms': 'تُحَيَّ',
          '2fs': 'تُحَيَّيْ',
          '3ms': 'يُحَيَّ',
          '3fs': 'تُحَيَّ',
          '2d': 'تُحَيَّيَا',
          '3md': 'يُحَيَّيَا',
          '3fd': 'تُحَيَّيَا',
          '1p': 'نُحَيَّ',
          '2mp': 'تُحَيَّوْا',
          '2fp': 'تُحَيَّيْنَ',
          '3mp': 'يُحَيَّوْا',
          '3fp': 'يُحَيَّيْنَ',
        })
      })

      test('غَنَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('غني', 2), 'jussive')).toEqualT({
          '1s': 'أُغَنِّ',
          '2ms': 'تُغَنِّ',
          '2fs': 'تُغَنِّيْ',
          '3ms': 'يُغَنِّ',
          '3fs': 'تُغَنِّ',
          '2d': 'تُغَنِّيَا',
          '3md': 'يُغَنِّيَا',
          '3fd': 'تُغَنِّيَا',
          '1p': 'نُغَنِّ',
          '2mp': 'تُغَنُّوْا',
          '2fp': 'تُغَنِّيْنَ',
          '3mp': 'يُغَنُّوْا',
          '3fp': 'يُغَنِّيْنَ',
        })
      })

      test('وَفَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 2), 'jussive')).toEqualT({
          '1s': 'أُوَفَّ',
          '2ms': 'تُوَفَّ',
          '2fs': 'تُوَفَّيْ',
          '3ms': 'يُوَفَّ',
          '3fs': 'تُوَفَّ',
          '2d': 'تُوَفَّيَا',
          '3md': 'يُوَفَّيَا',
          '3fd': 'تُوَفَّيَا',
          '1p': 'نُوَفَّ',
          '2mp': 'تُوَفَّوْا',
          '2fp': 'تُوَفَّيْنَ',
          '3mp': 'يُوَفَّوْا',
          '3fp': 'يُوَفَّيْنَ',
        })
      })

      test('يَوَّدَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يود', 2), 'jussive')).toEqualT({
          '1s': 'أُيَوَّدْ',
          '2ms': 'تُيَوَّدْ',
          '2fs': 'تُيَوَّدِي',
          '3ms': 'يُيَوَّدْ',
          '3fs': 'تُيَوَّدْ',
          '2d': 'تُيَوَّدَا',
          '3md': 'يُيَوَّدَا',
          '3fd': 'تُيَوَّدَا',
          '1p': 'نُيَوَّدْ',
          '2mp': 'تُيَوَّدُوْا',
          '2fp': 'تُيَوَّدْنَ',
          '3mp': 'يُيَوَّدُوْا',
          '3fp': 'يُيَوَّدْنَ',
        })
      })
    })
  })
})
