import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present indicative', () => {
  describe('Form I', () => {
    describe('hamzated hollow-defective roots', () => {
      test.each<[string, string]>([['أوي', 'يُؤْوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('hamzated roots', () => {
      test.each<[string, string]>([['وطئ', 'يُوطَأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['جيد', 'يُجْيَدُ'],
        ['حول', 'يُحَالُ'],
        ['عوم', 'يُعَامُ'],
        ['قول', 'يُقَالُ'],
        ['خور', 'يُخْوَرُ'],
        ['عوز', 'يُعْوَزُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['ولي', 'يُولَى'],
        ['وعي', 'يُوعَى'],
        ['علي', 'يُعْلَى'],
        ['لهو', 'يُلْهَى'],
        ['شفي', 'يُشْفَى'],
        ['جدو', 'يُجْدَى'],
        ['غشي', 'يُغْشَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each<[string, string]>([['روى', 'يُرْوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['جبب', 'يُجَبُّ'],
        ['أمم', 'يُؤَمُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وضع', 'يُوضَعُ'],
        ['يبس', 'يُوبَسُ'],
        ['وثق', 'يُوثَقُ'],
        ['وجز', 'يُوجَزُ'],
        ['وطن', 'يُوطَنُ'],
        ['وصف', 'يُوصَفُ'],
        ['وفد', 'يُوفَدُ'],
        ['وهن', 'يُوهَنُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('strong roots', () => {
      test.each<[string, string]>([
        ['نظر', 'يُنْظَرُ'],
        ['مثل', 'يُمْثَلُ'],
        ['دعم', 'يُدْعَمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })
  })

  describe('passive present indicative', () => {
    describe('strong roots', () => {
      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'indicative')).toEqual({
          '1s': 'أُكْتَبُ',
          '2ms': 'تُكْتَبُ',
          '2fs': 'تُكْتَبِيْنَ',
          '3ms': 'يُكْتَبُ',
          '3fs': 'تُكْتَبُ',
          '2d': 'تُكْتَبَانِ',
          '3md': 'يُكْتَبَانِ',
          '3fd': 'تُكْتَبَانِ',
          '1p': 'نُكْتَبُ',
          '2mp': 'تُكْتَبُونَ',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُونَ',
          '3fp': 'يُكْتَبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'indicative')).toEqual({
          '1s': 'أُوقَفُ',
          '2ms': 'تُوقَفُ',
          '2fs': 'تُوقَفِينَ',
          '3ms': 'يُوقَفُ',
          '3fs': 'تُوقَفُ',
          '2d': 'تُوقَفَانِ',
          '3md': 'يُوقَفَانِ',
          '3fd': 'تُوقَفَانِ',
          '1p': 'نُوقَفُ',
          '2mp': 'تُوقَفُونَ',
          '2fp': 'تُوقَفْنَ',
          '3mp': 'يُوقَفُونَ',
          '3fp': 'يُوقَفْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'indicative')).toEqual({
          '1s': 'أُلَمُّ',
          '2ms': 'تُلَمُّ',
          '2fs': 'تُلَمِّيْنَ',
          '3ms': 'يُلَمُّ',
          '3fs': 'تُلَمُّ',
          '2d': 'تُلَمَّانِ',
          '3md': 'يُلَمَّانِ',
          '3fd': 'تُلَمَّانِ',
          '1p': 'نُلَمُّ',
          '2mp': 'تُلَمُّونَ',
          '2fp': 'تُلْمَمْنَ',
          '3mp': 'يُلَمُّونَ',
          '3fp': 'يُلْمَمْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'indicative')).toEqual({
          '1s': 'أُؤَمُّ',
          '2ms': 'تُؤَمُّ',
          '2fs': 'تُؤَمِّيْنَ',
          '3ms': 'يُؤَمُّ',
          '3fs': 'تُؤَمُّ',
          '2d': 'تُؤَمَّانِ',
          '3md': 'يُؤَمَّانِ',
          '3fd': 'تُؤَمَّانِ',
          '1p': 'نُؤَمُّ',
          '2mp': 'تُؤَمُّونَ',
          '2fp': 'تُؤْمَمْنَ',
          '3mp': 'يُؤَمُّونَ',
          '3fp': 'يُؤْمَمْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'indicative')).toEqual({
          '1s': 'أُوَدُّ',
          '2ms': 'تُوَدُّ',
          '2fs': 'تُوَدِّيْنَ',
          '3ms': 'يُوَدُّ',
          '3fs': 'تُوَدُّ',
          '2d': 'تُوَدَّانِ',
          '3md': 'يُوَدَّانِ',
          '3fd': 'تُوَدَّانِ',
          '1p': 'نُوَدُّ',
          '2mp': 'تُوَدُّونَ',
          '2fp': 'تُودَدْنَ',
          '3mp': 'يُوَدُّونَ',
          '3fp': 'يُودَدْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'indicative')).toEqual({
          '1s': 'أُومَنُ',
          '2ms': 'تُومَنُ',
          '2fs': 'تُومَنِينَ',
          '3ms': 'يُومَنُ',
          '3fs': 'تُومَنُ',
          '2d': 'تُومَنَانِ',
          '3md': 'يُومَنَانِ',
          '3fd': 'تُومَنَانِ',
          '1p': 'نُومَنُ',
          '2mp': 'تُومَنُونَ',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُونَ',
          '3fp': 'يُومَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'indicative')).toEqual({
          '1s': 'أُعْوَزُ',
          '2ms': 'تُعْوَزُ',
          '2fs': 'تُعْوَزِينَ',
          '3ms': 'يُعْوَزُ',
          '3fs': 'تُعْوَزُ',
          '2d': 'تُعْوَزَانِ',
          '3md': 'يُعْوَزَانِ',
          '3fd': 'تُعْوَزَانِ',
          '1p': 'نُعْوَزُ',
          '2mp': 'تُعْوَزُونَ',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُونَ',
          '3fp': 'يُعْوَزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'indicative')).toEqual({
          '1s': 'أُلَامُ',
          '2ms': 'تُلَامُ',
          '2fs': 'تُلَامِينَ',
          '3ms': 'يُلَامُ',
          '3fs': 'تُلَامُ',
          '2d': 'تُلَامَانِ',
          '3md': 'يُلَامَانِ',
          '3fd': 'تُلَامَانِ',
          '1p': 'نُلَامُ',
          '2mp': 'تُلَامُونَ',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُونَ',
          '3fp': 'يُلَمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'indicative')).toEqual({
          '1s': 'أُبَاعُ',
          '2ms': 'تُبَاعُ',
          '2fs': 'تُبَاعِينَ',
          '3ms': 'يُبَاعُ',
          '3fs': 'تُبَاعُ',
          '2d': 'تُبَاعَانِ',
          '3md': 'يُبَاعَانِ',
          '3fd': 'تُبَاعَانِ',
          '1p': 'نُبَاعُ',
          '2mp': 'تُبَاعُونَ',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُونَ',
          '3fp': 'يُبَعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'indicative')).toEqual({
          '1s': 'أُزَارُ',
          '2ms': 'تُزَارُ',
          '2fs': 'تُزَارِينَ',
          '3ms': 'يُزَارُ',
          '3fs': 'تُزَارُ',
          '2d': 'تُزَارَانِ',
          '3md': 'يُزَارَانِ',
          '3fd': 'تُزَارَانِ',
          '1p': 'نُزَارُ',
          '2mp': 'تُزَارُونَ',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُونَ',
          '3fp': 'يُزَرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'indicative')).toEqual({
          '1s': 'أُشَادُ',
          '2ms': 'تُشَادُ',
          '2fs': 'تُشَادِينَ',
          '3ms': 'يُشَادُ',
          '3fs': 'تُشَادُ',
          '2d': 'تُشَادَانِ',
          '3md': 'يُشَادَانِ',
          '3fd': 'تُشَادَانِ',
          '1p': 'نُشَادُ',
          '2mp': 'تُشَادُونَ',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُونَ',
          '3fp': 'يُشَدْنَ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('جيد', 1), 'indicative')).toEqual({
          '1s': 'أُجْيَدُ',
          '2ms': 'تُجْيَدُ',
          '2fs': 'تُجْيَدِينَ',
          '3ms': 'يُجْيَدُ',
          '3fs': 'تُجْيَدُ',
          '2d': 'تُجْيَدَانِ',
          '3md': 'يُجْيَدَانِ',
          '3fd': 'تُجْيَدَانِ',
          '1p': 'نُجْيَدُ',
          '2mp': 'تُجْيَدُونَ',
          '2fp': 'تُجْيَدْنَ',
          '3mp': 'يُجْيَدُونَ',
          '3fp': 'يُجْيَدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'indicative')).toEqual({
          '1s': 'أُوخَذُ',
          '2ms': 'تُؤْخَذُ',
          '2fs': 'تُؤْخَذِينَ',
          '3ms': 'يُؤْخَذُ',
          '3fs': 'تُؤْخَذُ',
          '2d': 'تُؤْخَذَانِ',
          '3md': 'يُؤْخَذَانِ',
          '3fd': 'تُؤْخَذَانِ',
          '1p': 'نُؤْخَذُ',
          '2mp': 'تُؤْخَذُونَ',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُونَ',
          '3fp': 'يُؤْخَذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'indicative')).toEqual({
          '1s': 'أُووَى',
          '2ms': 'تُؤْوَى',
          '2fs': 'تُؤْوَيْنَ',
          '3ms': 'يُؤْوَى',
          '3fs': 'تُؤْوَى',
          '2d': 'تُؤْوَيَانِ',
          '3md': 'يُؤْوَيَانِ',
          '3fd': 'تُؤْوَيَانِ',
          '1p': 'نُؤْوَى',
          '2mp': 'تُؤْوَوْنَ',
          '2fp': 'تُؤْوَيْنَ',
          '3mp': 'يُؤْوَوْنَ',
          '3fp': 'يُؤْوَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'indicative')).toEqual({
          '1s': 'أُرَى',
          '2ms': 'تُرَى',
          '2fs': 'تُرَيْنَ',
          '3ms': 'يُرَى',
          '3fs': 'تُرَى',
          '2d': 'تُرَيَانِ',
          '3md': 'يُرَيَانِ',
          '3fd': 'تُرَيَانِ',
          '1p': 'نُرَى',
          '2mp': 'تُرَوْنَ',
          '2fp': 'تُرَيْنَ',
          '3mp': 'يُرَوْنَ',
          '3fp': 'يُرَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('وَطِئَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطئ', 1), 'indicative')).toEqual({
          '1s': 'أُوطَأُ',
          '2ms': 'تُوطَأُ',
          '2fs': 'تُوطَئِينَ',
          '3ms': 'يُوطَأُ',
          '3fs': 'تُوطَأُ',
          '2d': 'تُوطَآنِ',
          '3md': 'يُوطَآنِ',
          '3fd': 'تُوطَآنِ',
          '1p': 'نُوطَأُ',
          '2mp': 'تُوطَأُونَ',
          '2fp': 'تُوطَأْنَ',
          '3mp': 'يُوطَأُونَ',
          '3fp': 'يُوطَأْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'indicative')).toEqual({
          '1s': 'أُوتَى',
          '2ms': 'تُؤْتَى',
          '2fs': 'تُؤْتَيْنَ',
          '3ms': 'يُؤْتَى',
          '3fs': 'تُؤْتَى',
          '2d': 'تُؤْتَيَانِ',
          '3md': 'يُؤْتَيَانِ',
          '3fd': 'تُؤْتَيَانِ',
          '1p': 'نُؤْتَى',
          '2mp': 'تُؤْتَوْنَ',
          '2fp': 'تُؤْتَيْنَ',
          '3mp': 'يُؤْتَوْنَ',
          '3fp': 'يُؤْتَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'indicative')).toEqual({
          '1s': 'أُدْعَى',
          '2ms': 'تُدْعَى',
          '2fs': 'تُدْعَيْنَ',
          '3ms': 'يُدْعَى',
          '3fs': 'تُدْعَى',
          '2d': 'تُدْعَيَانِ',
          '3md': 'يُدْعَيَانِ',
          '3fd': 'تُدْعَيَانِ',
          '1p': 'نُدْعَى',
          '2mp': 'تُدْعَوْنَ',
          '2fp': 'تُدْعَيْنَ',
          '3mp': 'يُدْعَوْنَ',
          '3fp': 'يُدْعَيْنَ',
        })
      })

      test('وَلِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ولي', 1), 'indicative')).toEqual({
          '1s': 'أُولَى',
          '2ms': 'تُولَى',
          '2fs': 'تُولَيْنَ',
          '3ms': 'يُولَى',
          '3fs': 'تُولَى',
          '2d': 'تُولَيَانِ',
          '3md': 'يُولَيَانِ',
          '3fd': 'تُولَيَانِ',
          '1p': 'نُولَى',
          '2mp': 'تُولَوْنَ',
          '2fp': 'تُولَيْنَ',
          '3mp': 'يُولَوْنَ',
          '3fp': 'يُولَيْنَ',
        })
      })
    })
  })

  describe('passive present subjunctive', () => {
    describe('hamzated initial hollow-defective roots', () => {
      test.each([['أوي', 'يُؤْوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يُحَالَ'],
        ['عوم', 'يُعَامَ'],
        ['قول', 'يُقَالَ'],
        ['خور', 'يُخْوَرَ'],
        ['عوز', 'يُعْوَزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')).toMatchObject({
          '3ms': expected,
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
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['روى', 'يُرْوَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')).toMatchObject({
          '3ms': expected,
        })
      })

      test('رَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('روى', 1), 'subjunctive')).toEqual({
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

    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرَ'],
        ['مثل', 'يُمْثَلَ'],
        ['دعم', 'يُدْعَمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')).toMatchObject({
          '3ms': expected,
        })
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'subjunctive')).toEqual({
          '1s': 'أُكْتَبَ',
          '2ms': 'تُكْتَبَ',
          '2fs': 'تُكْتَبِي',
          '3ms': 'يُكْتَبَ',
          '3fs': 'تُكْتَبَ',
          '2d': 'تُكْتَبَا',
          '3md': 'يُكْتَبَا',
          '3fd': 'تُكْتَبَا',
          '1p': 'نُكْتَبَ',
          '2mp': 'تُكْتَبُوا',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُوا',
          '3fp': 'يُكْتَبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'subjunctive')).toEqual({
          '1s': 'أُوقَفَ',
          '2ms': 'تُوقَفَ',
          '2fs': 'تُوقَفِي',
          '3ms': 'يُوقَفَ',
          '3fs': 'تُوقَفَ',
          '2d': 'تُوقَفَا',
          '3md': 'يُوقَفَا',
          '3fd': 'تُوقَفَا',
          '1p': 'نُوقَفَ',
          '2mp': 'تُوقَفُوا',
          '2fp': 'تُوقَفْنَ',
          '3mp': 'يُوقَفُوا',
          '3fp': 'يُوقَفْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'subjunctive')).toEqual({
          '1s': 'أُلَمَّ',
          '2ms': 'تُلَمَّ',
          '2fs': 'تُلَمِّي',
          '3ms': 'يُلَمَّ',
          '3fs': 'تُلَمَّ',
          '2d': 'تُلَمَّا',
          '3md': 'يُلَمَّا',
          '3fd': 'تُلَمَّا',
          '1p': 'نُلَمَّ',
          '2mp': 'تُلَمُّوا',
          '2fp': 'تُلْمَمْنَ',
          '3mp': 'يُلَمُّوا',
          '3fp': 'يُلْمَمْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'subjunctive')).toEqual({
          '1s': 'أُؤَمَّ',
          '2ms': 'تُؤَمَّ',
          '2fs': 'تُؤَمِّي',
          '3ms': 'يُؤَمَّ',
          '3fs': 'تُؤَمَّ',
          '2d': 'تُؤَمَّا',
          '3md': 'يُؤَمَّا',
          '3fd': 'تُؤَمَّا',
          '1p': 'نُؤَمَّ',
          '2mp': 'تُؤَمُّوا',
          '2fp': 'تُؤْمَمْنَ',
          '3mp': 'يُؤَمُّوا',
          '3fp': 'يُؤْمَمْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'subjunctive')).toEqual({
          '1s': 'أُوَدَّ',
          '2ms': 'تُوَدَّ',
          '2fs': 'تُوَدِّي',
          '3ms': 'يُوَدَّ',
          '3fs': 'تُوَدَّ',
          '2d': 'تُوَدَّا',
          '3md': 'يُوَدَّا',
          '3fd': 'تُوَدَّا',
          '1p': 'نُوَدَّ',
          '2mp': 'تُوَدُّوا',
          '2fp': 'تُودَدْنَ',
          '3mp': 'يُوَدُّوا',
          '3fp': 'يُودَدْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'subjunctive')).toEqual({
          '1s': 'أُومَنَ',
          '2ms': 'تُومَنَ',
          '2fs': 'تُومَنِي',
          '3ms': 'يُومَنَ',
          '3fs': 'تُومَنَ',
          '2d': 'تُومَنَا',
          '3md': 'يُومَنَا',
          '3fd': 'تُومَنَا',
          '1p': 'نُومَنَ',
          '2mp': 'تُومَنُوا',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُوا',
          '3fp': 'يُومَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'subjunctive')).toEqual({
          '1s': 'أُعْوَزَ',
          '2ms': 'تُعْوَزَ',
          '2fs': 'تُعْوَزِي',
          '3ms': 'يُعْوَزَ',
          '3fs': 'تُعْوَزَ',
          '2d': 'تُعْوَزَا',
          '3md': 'يُعْوَزَا',
          '3fd': 'تُعْوَزَا',
          '1p': 'نُعْوَزَ',
          '2mp': 'تُعْوَزُوا',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُوا',
          '3fp': 'يُعْوَزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'subjunctive')).toEqual({
          '1s': 'أُلَامَ',
          '2ms': 'تُلَامَ',
          '2fs': 'تُلَامِي',
          '3ms': 'يُلَامَ',
          '3fs': 'تُلَامَ',
          '2d': 'تُلَامَا',
          '3md': 'يُلَامَا',
          '3fd': 'تُلَامَا',
          '1p': 'نُلَامَ',
          '2mp': 'تُلَامُوا',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُوا',
          '3fp': 'يُلَمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'subjunctive')).toEqual({
          '1s': 'أُبَاعَ',
          '2ms': 'تُبَاعَ',
          '2fs': 'تُبَاعِي',
          '3ms': 'يُبَاعَ',
          '3fs': 'تُبَاعَ',
          '2d': 'تُبَاعَا',
          '3md': 'يُبَاعَا',
          '3fd': 'تُبَاعَا',
          '1p': 'نُبَاعَ',
          '2mp': 'تُبَاعُوا',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُوا',
          '3fp': 'يُبَعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'subjunctive')).toEqual({
          '1s': 'أُزَارَ',
          '2ms': 'تُزَارَ',
          '2fs': 'تُزَارِي',
          '3ms': 'يُزَارَ',
          '3fs': 'تُزَارَ',
          '2d': 'تُزَارَا',
          '3md': 'يُزَارَا',
          '3fd': 'تُزَارَا',
          '1p': 'نُزَارَ',
          '2mp': 'تُزَارُوا',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُوا',
          '3fp': 'يُزَرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'subjunctive')).toEqual({
          '1s': 'أُشَادَ',
          '2ms': 'تُشَادَ',
          '2fs': 'تُشَادِي',
          '3ms': 'يُشَادَ',
          '3fs': 'تُشَادَ',
          '2d': 'تُشَادَا',
          '3md': 'يُشَادَا',
          '3fd': 'تُشَادَا',
          '1p': 'نُشَادَ',
          '2mp': 'تُشَادُوا',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُوا',
          '3fp': 'يُشَدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'subjunctive')).toEqual({
          '1s': 'أُوخَذَ',
          '2ms': 'تُؤْخَذَ',
          '2fs': 'تُؤْخَذِي',
          '3ms': 'يُؤْخَذَ',
          '3fs': 'تُؤْخَذَ',
          '2d': 'تُؤْخَذَا',
          '3md': 'يُؤْخَذَا',
          '3fd': 'تُؤْخَذَا',
          '1p': 'نُؤْخَذَ',
          '2mp': 'تُؤْخَذُوا',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُوا',
          '3fp': 'يُؤْخَذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'subjunctive')).toEqual({
          '1s': 'أُووَى',
          '2ms': 'تُؤْوَى',
          '2fs': 'تُؤْوَيْ',
          '3ms': 'يُؤْوَى',
          '3fs': 'تُؤْوَى',
          '2d': 'تُؤْوَيَا',
          '3md': 'يُؤْوَيَا',
          '3fd': 'تُؤْوَيَا',
          '1p': 'نُؤْوَى',
          '2mp': 'تُؤْوَوا',
          '2fp': 'تُؤْوَيْنَ',
          '3mp': 'يُؤْوَوا',
          '3fp': 'يُؤْوَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'subjunctive')).toEqual({
          '1s': 'أُرَى',
          '2ms': 'تُرَى',
          '2fs': 'تُرَيْ',
          '3ms': 'يُرَى',
          '3fs': 'تُرَى',
          '2d': 'تُرَيَا',
          '3md': 'يُرَيَا',
          '3fd': 'تُرَيَا',
          '1p': 'نُرَى',
          '2mp': 'تُرَوا',
          '2fp': 'تُرَيْنَ',
          '3mp': 'يُرَوا',
          '3fp': 'يُرَيْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'subjunctive')).toEqual({
          '1s': 'أُوتَى',
          '2ms': 'تُؤْتَى',
          '2fs': 'تُؤْتَيْ',
          '3ms': 'يُؤْتَى',
          '3fs': 'تُؤْتَى',
          '2d': 'تُؤْتَيَا',
          '3md': 'يُؤْتَيَا',
          '3fd': 'تُؤْتَيَا',
          '1p': 'نُؤْتَى',
          '2mp': 'تُؤْتَوا',
          '2fp': 'تُؤْتَيْنَ',
          '3mp': 'يُؤْتَوا',
          '3fp': 'يُؤْتَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'subjunctive')).toEqual({
          '1s': 'أُدْعَى',
          '2ms': 'تُدْعَى',
          '2fs': 'تُدْعَيْ',
          '3ms': 'يُدْعَى',
          '3fs': 'تُدْعَى',
          '2d': 'تُدْعَيَا',
          '3md': 'يُدْعَيَا',
          '3fd': 'تُدْعَيَا',
          '1p': 'نُدْعَى',
          '2mp': 'تُدْعَوا',
          '2fp': 'تُدْعَيْنَ',
          '3mp': 'يُدْعَوا',
          '3fp': 'يُدْعَيْنَ',
        })
      })
    })
  })

  describe('passive present jussive', () => {
    describe('hamzated initial hollow-defective roots', () => {
      test.each([['أوي', 'يُؤْوَ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يُحَلْ'],
        ['عوم', 'يُعَمْ'],
        ['قول', 'يُقَلْ'],
        ['خور', 'يُخْوَرْ'],
        ['عوز', 'يُعْوَزْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')).toMatchObject({
          '3ms': expected,
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
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['روى', 'يُرْوَ']])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')).toMatchObject({
          '3ms': expected,
        })
      })

      test('رَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('روى', 1), 'jussive')).toEqual({
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

    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرْ'],
        ['مثل', 'يُمْثَلْ'],
        ['دعم', 'يُدْعَمْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')).toMatchObject({
          '3ms': expected,
        })
      })
    })

    describe('strong roots', () => {
      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'jussive')).toEqual({
          '1s': 'أُكْتَبْ',
          '2ms': 'تُكْتَبْ',
          '2fs': 'تُكْتَبِي',
          '3ms': 'يُكْتَبْ',
          '3fs': 'تُكْتَبْ',
          '2d': 'تُكْتَبَا',
          '3md': 'يُكْتَبَا',
          '3fd': 'تُكْتَبَا',
          '1p': 'نُكْتَبْ',
          '2mp': 'تُكْتَبُوا',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُوا',
          '3fp': 'يُكْتَبْنَ',
        })
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'jussive')).toEqual({
          '1s': 'أُوقَفْ',
          '2ms': 'تُوقَفْ',
          '2fs': 'تُوقَفِي',
          '3ms': 'يُوقَفْ',
          '3fs': 'تُوقَفْ',
          '2d': 'تُوقَفَا',
          '3md': 'يُوقَفَا',
          '3fd': 'تُوقَفَا',
          '1p': 'نُوقَفْ',
          '2mp': 'تُوقَفُوا',
          '2fp': 'تُوقَفْنَ',
          '3mp': 'يُوقَفُوا',
          '3fp': 'يُوقَفْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'jussive')).toEqual({
          '1s': 'أُلَمَّ',
          '2ms': 'تُلَمَّ',
          '2fs': 'تُلَمِّي',
          '3ms': 'يُلَمَّ',
          '3fs': 'تُلَمَّ',
          '2d': 'تُلَمَّا',
          '3md': 'يُلَمَّا',
          '3fd': 'تُلَمَّا',
          '1p': 'نُلَمَّ',
          '2mp': 'تُلَمُّوا',
          '2fp': 'تُلْمَمْنَ',
          '3mp': 'يُلَمُّوا',
          '3fp': 'يُلْمَمْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'jussive')).toEqual({
          '1s': 'أُؤَمَّ',
          '2ms': 'تُؤَمَّ',
          '2fs': 'تُؤَمِّي',
          '3ms': 'يُؤَمَّ',
          '3fs': 'تُؤَمَّ',
          '2d': 'تُؤَمَّا',
          '3md': 'يُؤَمَّا',
          '3fd': 'تُؤَمَّا',
          '1p': 'نُؤَمَّ',
          '2mp': 'تُؤَمُّوا',
          '2fp': 'تُؤْمَمْنَ',
          '3mp': 'يُؤَمُّوا',
          '3fp': 'يُؤْمَمْنَ',
        })
      })

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'jussive')).toEqual({
          '1s': 'أُوَدَّ',
          '2ms': 'تُوَدَّ',
          '2fs': 'تُوَدِّي',
          '3ms': 'يُوَدَّ',
          '3fs': 'تُوَدَّ',
          '2d': 'تُوَدَّا',
          '3md': 'يُوَدَّا',
          '3fd': 'تُوَدَّا',
          '1p': 'نُوَدَّ',
          '2mp': 'تُوَدُّوا',
          '2fp': 'تُودَدْنَ',
          '3mp': 'يُوَدُّوا',
          '3fp': 'يُودَدْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'jussive')).toEqual({
          '1s': 'أُومَنْ',
          '2ms': 'تُومَنْ',
          '2fs': 'تُومَنِي',
          '3ms': 'يُومَنْ',
          '3fs': 'تُومَنْ',
          '2d': 'تُومَنَا',
          '3md': 'يُومَنَا',
          '3fd': 'تُومَنَا',
          '1p': 'نُومَنْ',
          '2mp': 'تُومَنُوا',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُوا',
          '3fp': 'يُومَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'jussive')).toEqual({
          '1s': 'أُعْوَزْ',
          '2ms': 'تُعْوَزْ',
          '2fs': 'تُعْوَزِي',
          '3ms': 'يُعْوَزْ',
          '3fs': 'تُعْوَزْ',
          '2d': 'تُعْوَزَا',
          '3md': 'يُعْوَزَا',
          '3fd': 'تُعْوَزَا',
          '1p': 'نُعْوَزْ',
          '2mp': 'تُعْوَزُوا',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُوا',
          '3fp': 'يُعْوَزْنَ',
        })
      })

      test('لَامَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'jussive')).toEqual({
          '1s': 'أُلَمْ',
          '2ms': 'تُلَمْ',
          '2fs': 'تُلَامِي',
          '3ms': 'يُلَمْ',
          '3fs': 'تُلَمْ',
          '2d': 'تُلَامَا',
          '3md': 'يُلَامَا',
          '3fd': 'تُلَامَا',
          '1p': 'نُلَمْ',
          '2mp': 'تُلَامُوا',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُوا',
          '3fp': 'يُلَمْنَ',
        })
      })

      test('بَاعَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'jussive')).toEqual({
          '1s': 'أُبَعْ',
          '2ms': 'تُبَعْ',
          '2fs': 'تُبَاعِي',
          '3ms': 'يُبَعْ',
          '3fs': 'تُبَعْ',
          '2d': 'تُبَاعَا',
          '3md': 'يُبَاعَا',
          '3fd': 'تُبَاعَا',
          '1p': 'نُبَعْ',
          '2mp': 'تُبَاعُوا',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُوا',
          '3fp': 'يُبَعْنَ',
        })
      })

      test('زَارَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'jussive')).toEqual({
          '1s': 'أُزَرْ',
          '2ms': 'تُزَرْ',
          '2fs': 'تُزَارِي',
          '3ms': 'يُزَرْ',
          '3fs': 'تُزَرْ',
          '2d': 'تُزَارَا',
          '3md': 'يُزَارَا',
          '3fd': 'تُزَارَا',
          '1p': 'نُزَرْ',
          '2mp': 'تُزَارُوا',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُوا',
          '3fp': 'يُزَرْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'jussive')).toEqual({
          '1s': 'أُشَدْ',
          '2ms': 'تُشَدْ',
          '2fs': 'تُشَادِي',
          '3ms': 'يُشَدْ',
          '3fs': 'تُشَدْ',
          '2d': 'تُشَادَا',
          '3md': 'يُشَادَا',
          '3fd': 'تُشَادَا',
          '1p': 'نُشَدْ',
          '2mp': 'تُشَادُوا',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُوا',
          '3fp': 'يُشَدْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'jussive')).toEqual({
          '1s': 'أُوخَذْ',
          '2ms': 'تُؤْخَذْ',
          '2fs': 'تُؤْخَذِي',
          '3ms': 'يُؤْخَذْ',
          '3fs': 'تُؤْخَذْ',
          '2d': 'تُؤْخَذَا',
          '3md': 'يُؤْخَذَا',
          '3fd': 'تُؤْخَذَا',
          '1p': 'نُؤْخَذْ',
          '2mp': 'تُؤْخَذُوا',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُوا',
          '3fp': 'يُؤْخَذْنَ',
        })
      })
    })

    describe('hamzated initial doubly weak roots', () => {
      test('أَوَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'jussive')).toEqual({
          '1s': 'أُووَ',
          '2ms': 'تُؤْوَ',
          '2fs': 'تُؤْوَيْ',
          '3ms': 'يُؤْوَ',
          '3fs': 'تُؤْوَ',
          '2d': 'تُؤْوَيَا',
          '3md': 'يُؤْوَيَا',
          '3fd': 'تُؤْوَيَا',
          '1p': 'نُؤْوَ',
          '2mp': 'تُؤْوَوا',
          '2fp': 'تُؤْوَيْنَ',
          '3mp': 'يُؤْوَوا',
          '3fp': 'يُؤْوَيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'jussive')).toEqual({
          '1s': 'أُرَ',
          '2ms': 'تُرَ',
          '2fs': 'تُرَيْ',
          '3ms': 'يُرَ',
          '3fs': 'تُرَ',
          '2d': 'تُرَيَا',
          '3md': 'يُرَيَا',
          '3fd': 'تُرَيَا',
          '1p': 'نُرَ',
          '2mp': 'تُرَوا',
          '2fp': 'تُرَيْنَ',
          '3mp': 'يُرَوا',
          '3fp': 'يُرَيْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'jussive')).toEqual({
          '1s': 'أُوتَ',
          '2ms': 'تُؤْتَ',
          '2fs': 'تُؤْتَيْ',
          '3ms': 'يُؤْتَ',
          '3fs': 'تُؤْتَ',
          '2d': 'تُؤْتَيَا',
          '3md': 'يُؤْتَيَا',
          '3fd': 'تُؤْتَيَا',
          '1p': 'نُؤْتَ',
          '2mp': 'تُؤْتَوا',
          '2fp': 'تُؤْتَيْنَ',
          '3mp': 'يُؤْتَوا',
          '3fp': 'يُؤْتَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'jussive')).toEqual({
          '1s': 'أُدْعَ',
          '2ms': 'تُدْعَ',
          '2fs': 'تُدْعَيْ',
          '3ms': 'يُدْعَ',
          '3fs': 'تُدْعَ',
          '2d': 'تُدْعَيَا',
          '3md': 'يُدْعَيَا',
          '3fd': 'تُدْعَيَا',
          '1p': 'نُدْعَ',
          '2mp': 'تُدْعَوا',
          '2fp': 'تُدْعَيْنَ',
          '3mp': 'يُدْعَوا',
          '3fp': 'يُدْعَيْنَ',
        })
      })
    })
  })
})
