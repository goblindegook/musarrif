import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present subjunctive', () => {
  describe('Form I', () => {
    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرَ'],
        ['مثل', 'يُمْثَلَ'],
        ['دعم', 'يُدْعَمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'subjunctive')).toEqualT({
          '1s': 'أُكْتَبَ',
          '2ms': 'تُكْتَبَ',
          '2fs': 'تُكْتَبِي',
          '3ms': 'يُكْتَبَ',
          '3fs': 'تُكْتَبَ',
          '2d': 'تُكْتَبَا',
          '3md': 'يُكْتَبَا',
          '3fd': 'تُكْتَبَا',
          '1p': 'نُكْتَبَ',
          '2mp': 'تُكْتَبُوْا',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُوْا',
          '3fp': 'يُكْتَبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'subjunctive')).toEqualT({
          '1s': 'أُوقَفَ',
          '2ms': 'تُوقَفَ',
          '2fs': 'تُوقَفِي',
          '3ms': 'يُوقَفَ',
          '3fs': 'تُوقَفَ',
          '2d': 'تُوقَفَا',
          '3md': 'يُوقَفَا',
          '3fd': 'تُوقَفَا',
          '1p': 'نُوقَفَ',
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
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'subjunctive')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'subjunctive')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'subjunctive')).toEqualT({
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
      test.each([['وقف', 'يُوقَفَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'subjunctive')).toEqualT({
          '1s': 'أُومَنَ',
          '2ms': 'تُومَنَ',
          '2fs': 'تُومَنِي',
          '3ms': 'يُومَنَ',
          '3fs': 'تُومَنَ',
          '2d': 'تُومَنَا',
          '3md': 'يُومَنَا',
          '3fd': 'تُومَنَا',
          '1p': 'نُومَنَ',
          '2mp': 'تُومَنُوْا',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُوْا',
          '3fp': 'يُومَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يُحَالَ'],
        ['عوم', 'يُعَامَ'],
        ['قول', 'يُقَالَ'],
        ['خور', 'يُخْوَرَ'],
        ['خوف', 'يُخَافَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'subjunctive')).toEqualT({
          '1s': 'أُعْوَزَ',
          '2ms': 'تُعْوَزَ',
          '2fs': 'تُعْوَزِي',
          '3ms': 'يُعْوَزَ',
          '3fs': 'تُعْوَزَ',
          '2d': 'تُعْوَزَا',
          '3md': 'يُعْوَزَا',
          '3fd': 'تُعْوَزَا',
          '1p': 'نُعْوَزَ',
          '2mp': 'تُعْوَزُوْا',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُوْا',
          '3fp': 'يُعْوَزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'subjunctive')).toEqualT({
          '1s': 'أُلَامَ',
          '2ms': 'تُلَامَ',
          '2fs': 'تُلَامِي',
          '3ms': 'يُلَامَ',
          '3fs': 'تُلَامَ',
          '2d': 'تُلَامَا',
          '3md': 'يُلَامَا',
          '3fd': 'تُلَامَا',
          '1p': 'نُلَامَ',
          '2mp': 'تُلَامُوْا',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُوْا',
          '3fp': 'يُلَمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'subjunctive')).toEqualT({
          '1s': 'أُبَاعَ',
          '2ms': 'تُبَاعَ',
          '2fs': 'تُبَاعِي',
          '3ms': 'يُبَاعَ',
          '3fs': 'تُبَاعَ',
          '2d': 'تُبَاعَا',
          '3md': 'يُبَاعَا',
          '3fd': 'تُبَاعَا',
          '1p': 'نُبَاعَ',
          '2mp': 'تُبَاعُوْا',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُوْا',
          '3fp': 'يُبَعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'subjunctive')).toEqualT({
          '1s': 'أُزَارَ',
          '2ms': 'تُزَارَ',
          '2fs': 'تُزَارِي',
          '3ms': 'يُزَارَ',
          '3fs': 'تُزَارَ',
          '2d': 'تُزَارَا',
          '3md': 'يُزَارَا',
          '3fd': 'تُزَارَا',
          '1p': 'نُزَارَ',
          '2mp': 'تُزَارُوْا',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُوْا',
          '3fp': 'يُزَرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'subjunctive')).toEqualT({
          '1s': 'أُشَادَ',
          '2ms': 'تُشَادَ',
          '2fs': 'تُشَادِي',
          '3ms': 'يُشَادَ',
          '3fs': 'تُشَادَ',
          '2d': 'تُشَادَا',
          '3md': 'يُشَادَا',
          '3fd': 'تُشَادَا',
          '1p': 'نُشَادَ',
          '2mp': 'تُشَادُوْا',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُوْا',
          '3fp': 'يُشَدْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['جيء', 'يُجَاءَ'],
        ['نوء', 'يُنَاءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'يُؤَالَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('يُؤَالَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 1), 'subjunctive')).toEqualT({
          '1s': 'أُؤَالَ',
          '2ms': 'تُؤَالَ',
          '2fs': 'تُؤَالِي',
          '3ms': 'يُؤَالَ',
          '3fs': 'تُؤَالَ',
          '2d': 'تُؤَالَا',
          '3md': 'يُؤَالَا',
          '3fd': 'تُؤَالَا',
          '1p': 'نُؤَالَ',
          '2mp': 'تُؤَالُوْا',
          '2fp': 'تُؤَلْنَ',
          '3mp': 'يُؤَالُوْا',
          '3fp': 'يُؤَلْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أبي', 'يُؤْبَى'],
        ['أني', 'يُؤْنَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'subjunctive')).toEqualT({
          '1s': 'أُوخَذَ',
          '2ms': 'تُؤْخَذَ',
          '2fs': 'تُؤْخَذِي',
          '3ms': 'يُؤْخَذَ',
          '3fs': 'تُؤْخَذَ',
          '2d': 'تُؤْخَذَا',
          '3md': 'يُؤْخَذَا',
          '3fd': 'تُؤْخَذَا',
          '1p': 'نُؤْخَذَ',
          '2mp': 'تُؤْخَذُوْا',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُوْا',
          '3fp': 'يُؤْخَذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'subjunctive')).toEqualT({
          '1s': 'أُووَى',
          '2ms': 'تُؤْوَى',
          '2fs': 'تُؤْوَيْ',
          '3ms': 'يُؤْوَى',
          '3fs': 'تُؤْوَى',
          '2d': 'تُؤْوَيَا',
          '3md': 'يُؤْوَيَا',
          '3fd': 'تُؤْوَيَا',
          '1p': 'نُؤْوَى',
          '2mp': 'تُؤْوَوْا',
          '2fp': 'تُؤْوَيْنَ',
          '3mp': 'يُؤْوَوْا',
          '3fp': 'يُؤْوَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رأى', 'يُرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'subjunctive')).toEqualT({
          '1s': 'أُرَى',
          '2ms': 'تُرَى',
          '2fs': 'تُرَيْ',
          '3ms': 'يُرَى',
          '3fs': 'تُرَى',
          '2d': 'تُرَيَا',
          '3md': 'يُرَيَا',
          '3fd': 'تُرَيَا',
          '1p': 'نُرَى',
          '2mp': 'تُرَوْا',
          '2fp': 'تُرَيْنَ',
          '3mp': 'يُرَوْا',
          '3fp': 'يُرَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['وطء', 'يُوطَأَ'],
        ['كلأ', 'يُكْلَأَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كلأ', 1), 'subjunctive')).toEqualT({
          '1s': 'أُكْلَأَ',
          '2ms': 'تُكْلَأَ',
          '2fs': 'تُكْلَئِي',
          '3ms': 'يُكْلَأَ',
          '3fs': 'تُكْلَأَ',
          '2d': 'تُكْلَآ',
          '3md': 'يُكْلَآ',
          '3fd': 'تُكْلَآ',
          '1p': 'نُكْلَأَ',
          '2mp': 'تُكْلَأُوْا',
          '2fp': 'تُكْلَأْنَ',
          '3mp': 'يُكْلَأُوْا',
          '3fp': 'يُكْلَأْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'subjunctive')).toEqualT({
          '1s': 'أُوتَى',
          '2ms': 'تُؤْتَى',
          '2fs': 'تُؤْتَيْ',
          '3ms': 'يُؤْتَى',
          '3fs': 'تُؤْتَى',
          '2d': 'تُؤْتَيَا',
          '3md': 'يُؤْتَيَا',
          '3fd': 'تُؤْتَيَا',
          '1p': 'نُؤْتَى',
          '2mp': 'تُؤْتَوْا',
          '2fp': 'تُؤْتَيْنَ',
          '3mp': 'يُؤْتَوْا',
          '3fp': 'يُؤْتَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'يُغْشَى'],
        ['جدو', 'يُجْدَى'],
        ['لهو', 'يُلْهَى'],
        ['علي', 'يُعْلَى'],
        ['شفي', 'يُشْفَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'subjunctive')).toEqualT({
          '1s': 'أُدْعَى',
          '2ms': 'تُدْعَى',
          '2fs': 'تُدْعَيْ',
          '3ms': 'يُدْعَى',
          '3fs': 'تُدْعَى',
          '2d': 'تُدْعَيَا',
          '3md': 'يُدْعَيَا',
          '3fd': 'تُدْعَيَا',
          '1p': 'نُدْعَى',
          '2mp': 'تُدْعَوْا',
          '2fp': 'تُدْعَيْنَ',
          '3mp': 'يُدْعَوْا',
          '3fp': 'يُدْعَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['جوي', 'يُجْوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('رَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('روى', 1), 'subjunctive')).toEqualT({
          '1s': 'أُرْوَى',
          '2ms': 'تُرْوَى',
          '2fs': 'تُرْوَيْ',
          '3ms': 'يُرْوَى',
          '3fs': 'تُرْوَى',
          '2d': 'تُرْوَيَا',
          '3md': 'يُرْوَيَا',
          '3fd': 'تُرْوَيَا',
          '1p': 'نُرْوَى',
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
        ['مكن', 'يُمَكَّنَ'],
        ['مثل', 'يُمَثَّلَ'],
        ['سبب', 'يُسَبَّبَ'],
        ['خطط', 'يُخَطَّطَ'],
        ['حدد', 'يُحَدَّدَ'],
        ['قرر', 'يُقَرَّرَ'],
        ['شدد', 'يُشَدَّدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['قوي', 'يُقَوَّى'],
        ['زوي', 'يُزَوَّى'],
        ['هوي', 'يُهَوَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 2), 'subjunctive')).toEqualT({
          '1s': 'أُحَيَّا',
          '2ms': 'تُحَيَّا',
          '2fs': 'تُحَيَّيْ',
          '3ms': 'يُحَيَّا',
          '3fs': 'تُحَيَّا',
          '2d': 'تُحَيَّيَا',
          '3md': 'يُحَيَّيَا',
          '3fd': 'تُحَيَّيَا',
          '1p': 'نُحَيَّا',
          '2mp': 'تُحَيَّوْا',
          '2fp': 'تُحَيَّيْنَ',
          '3mp': 'يُحَيَّوْا',
          '3fp': 'يُحَيَّيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'يُوَطَّنَ'],
        ['وجه', 'يُوَجَّهَ'],
        ['وقف', 'يُوَقَّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('يُوَسَّطَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وسط', 2), 'subjunctive')).toEqualT({
          '1s': 'أُوَسَّطَ',
          '2ms': 'تُوَسَّطَ',
          '2fs': 'تُوَسَّطِي',
          '3ms': 'يُوَسَّطَ',
          '3fs': 'تُوَسَّطَ',
          '2d': 'تُوَسَّطَا',
          '3md': 'يُوَسَّطَا',
          '3fd': 'تُوَسَّطَا',
          '1p': 'نُوَسَّطَ',
          '2mp': 'تُوَسَّطُوْا',
          '2fp': 'تُوَسَّطْنَ',
          '3mp': 'يُوَسَّطُوْا',
          '3fp': 'يُوَسَّطْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطَّأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 2), 'subjunctive')).toEqualT({
          '1s': 'أُوَطَّأَ',
          '2ms': 'تُوَطَّأَ',
          '2fs': 'تُوَطَّئِي',
          '3ms': 'يُوَطَّأَ',
          '3fs': 'تُوَطَّأَ',
          '2d': 'تُوَطَّآ',
          '3md': 'يُوَطَّآ',
          '3fd': 'تُوَطَّآ',
          '1p': 'نُوَطَّأَ',
          '2mp': 'تُوَطَّأُوْا',
          '2fp': 'تُوَطَّأْنَ',
          '3mp': 'يُوَطَّأُوْا',
          '3fp': 'يُوَطَّأْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوَّسَ'],
        ['كون', 'يُكَوَّنَ'],
        ['دون', 'يُدَوَّنَ'],
        ['سوف', 'يُسَوَّفَ'],
        ['كيف', 'يُكَيَّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَوَّلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 2), 'subjunctive')).toEqualT({
          '1s': 'أُؤَوَّلَ',
          '2ms': 'تُؤَوَّلَ',
          '2fs': 'تُؤَوَّلِي',
          '3ms': 'يُؤَوَّلَ',
          '3fs': 'تُؤَوَّلَ',
          '2d': 'تُؤَوَّلَا',
          '3md': 'يُؤَوَّلَا',
          '3fd': 'تُؤَوَّلَا',
          '1p': 'نُؤَوَّلَ',
          '2mp': 'تُؤَوَّلُوْا',
          '2fp': 'تُؤَوَّلْنَ',
          '3mp': 'يُؤَوَّلُوْا',
          '3fp': 'يُؤَوَّلْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([
        ['أجج', 'يُؤَجَّجَ'],
        ['أيد', 'يُؤَيَّدَ'],
        ['أوب', 'يُؤَوَّبَ'],
        ['أسس', 'يُؤَسَّسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُوَفَّى'],
        ['وصي', 'يُوَصَّى'],
        ['ولي', 'يُوَلَّى'],
        ['وري', 'يُوَرَّى'],
        ['مني', 'يُمَنَّى'],
        ['سمي', 'يُسَمَّى'],
        ['غطي', 'يُغَطَّى'],
        ['غني', 'يُغَنَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('وَفَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 2), 'subjunctive')).toEqualT({
          '1s': 'أُوَفَّى',
          '2ms': 'تُوَفَّى',
          '2fs': 'تُوَفَّيْ',
          '3ms': 'يُوَفَّى',
          '3fs': 'تُوَفَّى',
          '2d': 'تُوَفَّيَا',
          '3md': 'يُوَفَّيَا',
          '3fd': 'تُوَفَّيَا',
          '1p': 'نُوَفَّى',
          '2mp': 'تُوَفَّوْا',
          '2fp': 'تُوَفَّيْنَ',
          '3mp': 'يُوَفَّوْا',
          '3fp': 'يُوَفَّيْنَ',
        })
      })

      test('يَوَّدَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يود', 2), 'subjunctive')).toEqualT({
          '1s': 'أُيَوَّدَ',
          '2ms': 'تُيَوَّدَ',
          '2fs': 'تُيَوَّدِي',
          '3ms': 'يُيَوَّدَ',
          '3fs': 'تُيَوَّدَ',
          '2d': 'تُيَوَّدَا',
          '3md': 'يُيَوَّدَا',
          '3fd': 'تُيَوَّدَا',
          '1p': 'نُيَوَّدَ',
          '2mp': 'تُيَوَّدُوْا',
          '2fp': 'تُيَوَّدْنَ',
          '3mp': 'يُيَوَّدُوْا',
          '3fp': 'يُيَوَّدْنَ',
        })
      })
    })
  })
})
