import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present indicative', () => {
  describe('Form I', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['نظر', 'يُنْظَرُ'],
        ['مثل', 'يُمْثَلُ'],
        ['دعم', 'يُدْعَمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('كَتَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كتب', 1), 'indicative')).toEqualT({
          '1s': 'أُكْتَبُ',
          '2ms': 'تُكْتَبُ',
          '2fs': 'تُكْتَبِينَ',
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
        expect(conjugatePassivePresentMood(getVerb('وقف', 1), 'indicative')).toEqualT({
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
      test.each([
        ['جبب', 'يُجَبُّ'],
        ['أدد', 'يُؤَدُّ'],
        ['أجج', 'يُؤَجُّ'],
        ['أزز', 'يُؤَزُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('لَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لمم', 1), 'indicative')).toEqualT({
          '1s': 'أُلَمُّ',
          '2ms': 'تُلَمُّ',
          '2fs': 'تُلَمِّينَ',
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

      test('أَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 1), 'indicative')).toEqualT({
          '1s': 'أُؤَمُّ',
          '2ms': 'تُؤَمُّ',
          '2fs': 'تُؤَمِّينَ',
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

      test('وَدَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودد', 1), 'indicative')).toEqualT({
          '1s': 'أُوَدُّ',
          '2ms': 'تُوَدُّ',
          '2fs': 'تُوَدِّينَ',
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
      test.each<[string, string]>([
        ['وضع', 'يُوضَعُ'],
        ['يبس', 'يُوبَسُ'],
        ['وثق', 'يُوثَقُ'],
        ['وجز', 'يُوجَزُ'],
        ['وطن', 'يُوطَنُ'],
        ['وصف', 'يُوصَفُ'],
        ['وفد', 'يُوفَدُ'],
        ['وهن', 'يُوهَنُ'],
        ['وقف', 'يُوقَفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يمن', 1), 'indicative')).toEqualT({
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
      test.each<[string, string]>([
        ['حول', 'يُحَالُ'],
        ['عوم', 'يُعَامُ'],
        ['قول', 'يُقَالُ'],
        ['خور', 'يُخْوَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عوز', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('لوم', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('باع', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('زور', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('شيد', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('جيد', 1), 'indicative')).toEqualT({
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

    describe('hamzated final hollow roots', () => {
      test.each<[string, string]>([
        ['جيء', 'يُجَاءُ'],
        ['نوء', 'يُنَاءُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each<[string, string]>([['أول', 'يُؤَالُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('يُؤَالُ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 1), 'indicative')).toEqualT({
          '1s': 'أُؤَالُ',
          '2ms': 'تُؤَالُ',
          '2fs': 'تُؤَالِينَ',
          '3ms': 'يُؤَالُ',
          '3fs': 'تُؤَالُ',
          '2d': 'تُؤَالَانِ',
          '3md': 'يُؤَالَانِ',
          '3fd': 'تُؤَالَانِ',
          '1p': 'نُؤَالُ',
          '2mp': 'تُؤَالُونَ',
          '2fp': 'تُؤَلْنَ',
          '3mp': 'يُؤَالُونَ',
          '3fp': 'يُؤَلْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أبي', 'يُؤْبَى'],
        ['أني', 'يُؤْنَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَخَذَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أخذ', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('أوي', 1), 'indicative')).toEqualT({
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
      test.each([['رأى', 'يُرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رأى', 1), 'indicative')).toEqualT({
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
      test.each([
        ['وطء', 'يُوطَأُ'],
        ['كلأ', 'يُكْلَأُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 1), 'indicative')).toEqualT({
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

      test('كَلَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كلأ', 1), 'indicative')).toEqualT({
          '1s': 'أُكْلَأُ',
          '2ms': 'تُكْلَأُ',
          '2fs': 'تُكْلَئِينَ',
          '3ms': 'يُكْلَأُ',
          '3fs': 'تُكْلَأُ',
          '2d': 'تُكْلَآنِ',
          '3md': 'يُكْلَآنِ',
          '3fd': 'تُكْلَآنِ',
          '1p': 'نُكْلَأُ',
          '2mp': 'تُكْلَأُونَ',
          '2fp': 'تُكْلَأْنَ',
          '3mp': 'يُكْلَأُونَ',
          '3fp': 'يُكْلَأْنَ',
        })
      })
    })

    describe('hamzated final-weak roots', () => {
      test('أَتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 1), 'indicative')).toEqualT({
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
      test.each<[string, string]>([
        ['وعي', 'يُوعَى'],
        ['علي', 'يُعْلَى'],
        ['لهو', 'يُلْهَى'],
        ['شفي', 'يُشْفَى'],
        ['جدو', 'يُجْدَى'],
        ['غشي', 'يُغْشَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعا', 1), 'indicative')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('ولي', 1), 'indicative')).toEqualT({
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

    describe('doubly weak roots', () => {
      test.each<[string, string]>([
        ['جوي', 'يُجْوَى'],
        ['روى', 'يُرْوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })
  })

  describe('Form II', () => {
    describe('hamzated final assimilated roots', () => {
      test('يُوَطَّأُ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 2), 'indicative')).toEqualT({
          '1s': 'أُوَطَّأُ',
          '2ms': 'تُوَطَّأُ',
          '2fs': 'تُوَطَّئِينَ',
          '3ms': 'يُوَطَّأُ',
          '3fs': 'تُوَطَّأُ',
          '2d': 'تُوَطَّآنِ',
          '3md': 'يُوَطَّآنِ',
          '3fd': 'تُوَطَّآنِ',
          '1p': 'نُوَطَّأُ',
          '2mp': 'تُوَطَّأُونَ',
          '2fp': 'تُوَطَّأْنَ',
          '3mp': 'يُوَطَّأُونَ',
          '3fp': 'يُوَطَّأْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'يُوَطَّنُ'],
        ['وجه', 'يُوَجَّهُ'],
        ['وقف', 'يُوَقَّفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('يُوَسَّطُ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وسط', 2), 'indicative')).toEqualT({
          '1s': 'أُوَسَّطُ',
          '2ms': 'تُوَسَّطُ',
          '2fs': 'تُوَسَّطِينَ',
          '3ms': 'يُوَسَّطُ',
          '3fs': 'تُوَسَّطُ',
          '2d': 'تُوَسَّطَانِ',
          '3md': 'يُوَسَّطَانِ',
          '3fd': 'تُوَسَّطَانِ',
          '1p': 'نُوَسَّطُ',
          '2mp': 'تُوَسَّطُونَ',
          '2fp': 'تُوَسَّطْنَ',
          '3mp': 'يُوَسَّطُونَ',
          '3fp': 'يُوَسَّطْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُوَفَّى'],
        ['وصي', 'يُوَصَّى'],
        ['ولي', 'يُوَلَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('وَفَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 2), 'indicative')).toEqualT({
          '1s': 'أُوَفَّى',
          '2ms': 'تُوَفَّى',
          '2fs': 'تُوَفَّيْنَ',
          '3ms': 'يُوَفَّى',
          '3fs': 'تُوَفَّى',
          '2d': 'تُوَفَّيَانِ',
          '3md': 'يُوَفَّيَانِ',
          '3fd': 'تُوَفَّيَانِ',
          '1p': 'نُوَفَّى',
          '2mp': 'تُوَفَّوْنَ',
          '2fp': 'تُوَفَّيْنَ',
          '3mp': 'يُوَفَّوْنَ',
          '3fp': 'يُوَفَّيْنَ',
        })
      })

      test('يَوَّدَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('يود', 2), 'indicative')).toEqualT({
          '1s': 'أُيَوَّدُ',
          '2ms': 'تُيَوَّدُ',
          '2fs': 'تُيَوَّدِينَ',
          '3ms': 'يُيَوَّدُ',
          '3fs': 'تُيَوَّدُ',
          '2d': 'تُيَوَّدَانِ',
          '3md': 'يُيَوَّدَانِ',
          '3fd': 'تُيَوَّدَانِ',
          '1p': 'نُيَوَّدُ',
          '2mp': 'تُيَوَّدُونَ',
          '2fp': 'تُيَوَّدْنَ',
          '3mp': 'يُيَوَّدُونَ',
          '3fp': 'يُيَوَّدْنَ',
        })
      })
    })
  })
})
