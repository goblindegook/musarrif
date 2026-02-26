import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getVerb, verbs } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present jussive', () => {
  test('impersonal passive only conjugates 3ms in present jussive', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs.filter((verb) => verb.passiveVoice === 'impersonal')),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePresentMood(verb, 'jussive')[pronounId]).toBe('')
        },
      ),
    )
  })

  describe('Form I', () => {
    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرْ'],
        ['مثل', 'يُمْثَلْ'],
        ['دعم', 'يُدْعَمْ'],
        ['بلغ', 'يُبْلَغْ'],
        ['كلم', 'يُكْلَمْ'],
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

    describe('hollow roots', () => {
      test.each([
        ['قوم', 'يُقَاوَمْ'],
        ['عود', 'يُعَاوَدْ'],
        ['جوز', 'يُجَاوَزْ'],
        ['نول', 'يُنَاوَلْ'],
        ['ضيق', 'يُضَايَقْ'],
      ])('jussive pattern for %s conjugation', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
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
      test.each([['رءي', 'يُرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 1), 'jussive')).toEqualT({
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

    describe('hollow roots', () => {
      test.each([
        ['قود', 'يُنْقَدْ'],
        ['هيل', 'يُنْهَلْ'],
        ['حوز', 'يُنْحَزْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'jussive')['3ms']).toEqualT(expected)
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
        expect(conjugatePassivePresentMood(getVerb('روي', 1), 'jussive')).toEqualT({
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

      test('أَذَّى conjugation', () => {
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
        ['أثر', 'يُؤَثَّرْ'],
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

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['تبع', 'يُتَابَعْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['كلم', 'يُكَالَمْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['بلغ', 'يُبَالَغْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['سعد', 'يُسَاعَدْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['صحب', 'يُصَاحَبْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['وجه', 'يُوَاجَهْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['وثق', 'يُوَاثَقْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['وعد', 'يُوَاعَدْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('عَامَلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عمل', 3), 'jussive')).toEqualT({
          '1s': 'أُعَامَلْ',
          '2ms': 'تُعَامَلْ',
          '2fs': 'تُعَامَلِي',
          '3ms': 'يُعَامَلْ',
          '3fs': 'تُعَامَلْ',
          '2d': 'تُعَامَلَا',
          '3md': 'يُعَامَلَا',
          '3fd': 'تُعَامَلَا',
          '1p': 'نُعَامَلْ',
          '2mp': 'تُعَامَلُوْا',
          '2fp': 'تُعَامَلْنَ',
          '3mp': 'يُعَامَلُوْا',
          '3fp': 'يُعَامَلْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارَّ'],
        ['ردد', 'يُرَادَّ'],
        ['مدد', 'يُمَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('سرر', 3), 'jussive')).toEqualT({
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
          '2fp': 'تُسَارَرْنَ',
          '3mp': 'يُسَارُّوْا',
          '3fp': 'يُسَارَرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ردد', 3), 'jussive')).toEqualT({
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
          '2fp': 'تُرَادَدْنَ',
          '3mp': 'يُرَادُّوْا',
          '3fp': 'يُرَادَدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('مدد', 3), 'jussive')).toEqualT({
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
          '2fp': 'تُمَادَدْنَ',
          '3mp': 'يُمَادُّوْا',
          '3fp': 'يُمَادَدْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'يُنَادَ'],
        ['رعي', 'يُرَاعَ'],
        ['بلي', 'يُبَالَ'],
        ['قضي', 'يُقَاضَ'],
        ['بري', 'يُبَارَ'],
        ['رءي', 'يُرَاءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخَذْ'],
        ['أجر', 'يُؤَاجَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['لأم', 'يُلَاءَمْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('وَاءَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وأم', 3), 'jussive')).toEqualT({
          '1s': 'أُوَاءَمْ',
          '2ms': 'تُوَاءَمْ',
          '2fs': 'تُوَاءَمِي',
          '3ms': 'يُوَاءَمْ',
          '3fs': 'تُوَاءَمْ',
          '2d': 'تُوَاءَمَا',
          '3md': 'يُوَاءَمَا',
          '3fd': 'تُوَاءَمَا',
          '1p': 'نُوَاءَمْ',
          '2mp': 'تُوَاءَمُوْا',
          '2fp': 'تُوَاءَمْنَ',
          '3mp': 'يُوَاءَمُوْا',
          '3fp': 'يُوَاءَمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجَأْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'يُوَازَ'],
        ['وفي', 'يُوَافَ'],
        ['وسي', 'يُوَاسَ'],
        ['نوي', 'يُنَاوَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['وقف', 'يُوْقَفْ'],
        ['وقع', 'يُوْقَعْ'],
        ['ولد', 'يُوْلَدْ'],
        ['وصل', 'يُوْصَلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وضح', 4), 'jussive')).toEqualT({
          '1s': 'أُوْضَحْ',
          '2ms': 'تُوْضَحْ',
          '2fs': 'تُوْضَحِي',
          '3ms': 'يُوْضَحْ',
          '3fs': 'تُوْضَحْ',
          '2d': 'تُوْضَحَا',
          '3md': 'يُوْضَحَا',
          '3fd': 'تُوْضَحَا',
          '1p': 'نُوْضَحْ',
          '2mp': 'تُوْضَحُوْا',
          '2fp': 'تُوْضَحْنَ',
          '3mp': 'يُوْضَحُوْا',
          '3fp': 'يُوْضَحْنَ',
        })
      })

      test('أَكْثَرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كثر', 4), 'jussive')).toEqualT({
          '1s': 'أُكْثَرْ',
          '2ms': 'تُكْثَرْ',
          '2fs': 'تُكْثَرِي',
          '3ms': 'يُكْثَرْ',
          '3fs': 'تُكْثَرْ',
          '2d': 'تُكْثَرَا',
          '3md': 'يُكْثَرَا',
          '3fd': 'تُكْثَرَا',
          '1p': 'نُكْثَرْ',
          '2mp': 'تُكْثَرُوْا',
          '2fp': 'تُكْثَرْنَ',
          '3mp': 'يُكْثَرُوْا',
          '3fp': 'يُكْثَرْنَ',
        })
      })

      test('أَعْلَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('علم', 4), 'jussive')).toEqualT({
          '1s': 'أُعْلَمْ',
          '2ms': 'تُعْلَمْ',
          '2fs': 'تُعْلَمِي',
          '3ms': 'يُعْلَمْ',
          '3fs': 'تُعْلَمْ',
          '2d': 'تُعْلَمَا',
          '3md': 'يُعْلَمَا',
          '3fd': 'تُعْلَمَا',
          '1p': 'نُعْلَمْ',
          '2mp': 'تُعْلَمُوْا',
          '2fp': 'تُعْلَمْنَ',
          '3mp': 'يُعْلَمُوْا',
          '3fp': 'يُعْلَمْنَ',
        })
      })

      test('أَلْحَقَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لحق', 4), 'jussive')).toEqualT({
          '1s': 'أُلْحَقْ',
          '2ms': 'تُلْحَقْ',
          '2fs': 'تُلْحَقِي',
          '3ms': 'يُلْحَقْ',
          '3fs': 'تُلْحَقْ',
          '2d': 'تُلْحَقَا',
          '3md': 'يُلْحَقَا',
          '3fd': 'تُلْحَقَا',
          '1p': 'نُلْحَقْ',
          '2mp': 'تُلْحَقُوْا',
          '2fp': 'تُلْحَقْنَ',
          '3mp': 'يُلْحَقُوْا',
          '3fp': 'يُلْحَقْنَ',
        })
      })

      test('أَصْبَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('صبح', 4), 'jussive')).toEqualT({
          '1s': 'أُصْبَحْ',
          '2ms': 'تُصْبَحْ',
          '2fs': 'تُصْبَحِي',
          '3ms': 'يُصْبَحْ',
          '3fs': 'تُصْبَحْ',
          '2d': 'تُصْبَحَا',
          '3md': 'يُصْبَحَا',
          '3fd': 'تُصْبَحَا',
          '1p': 'نُصْبَحْ',
          '2mp': 'تُصْبَحُوْا',
          '2fp': 'تُصْبَحْنَ',
          '3mp': 'يُصْبَحُوْا',
          '3fp': 'يُصْبَحْنَ',
        })
      })

      test('أَعْرَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرب', 4), 'jussive')).toEqualT({
          '1s': 'أُعْرَبْ',
          '2ms': 'تُعْرَبْ',
          '2fs': 'تُعْرَبِي',
          '3ms': 'يُعْرَبْ',
          '3fs': 'تُعْرَبْ',
          '2d': 'تُعْرَبَا',
          '3md': 'يُعْرَبَا',
          '3fd': 'تُعْرَبَا',
          '1p': 'نُعْرَبْ',
          '2mp': 'تُعْرَبُوْا',
          '2fp': 'تُعْرَبْنَ',
          '3mp': 'يُعْرَبُوْا',
          '3fp': 'يُعْرَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتَمَّ'],
        ['سفف', 'يُسَفَّ'],
        ['حبب', 'يُحَبَّ'],
        ['عدد', 'يُعَدَّ'],
        ['همم', 'يُهَمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشَرْ'],
        ['رود', 'يُرَدْ'],
        ['تيح', 'يُتَحْ'],
        ['فيد', 'يُفَدْ'],
        ['عود', 'يُعَدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'يُعْلَ'],
        ['بقي', 'يُبْقَ'],
        ['سمي', 'يُسْمَ'],
        ['عطي', 'يُعْطَ'],
        ['لقي', 'يُلْقَ'],
        ['حيي', 'يُحْيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 4), 'jussive')).toEqualT({
          '1s': 'أُحْيَ',
          '2ms': 'تُحْيَ',
          '2fs': 'تُحْيَيْ',
          '3ms': 'يُحْيَ',
          '3fs': 'تُحْيَ',
          '2d': 'تُحْيَيَا',
          '3md': 'يُحْيَيَا',
          '3fd': 'تُحْيَيَا',
          '1p': 'نُحْيَ',
          '2mp': 'تُحْيَوْا',
          '2fp': 'تُحْيَيْنَ',
          '3mp': 'يُحْيَوْا',
          '3fp': 'يُحْيَيْنَ',
        })
      })

      test('أَوْصَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وصي', 4), 'jussive')).toEqualT({
          '1s': 'أُوْصَ',
          '2ms': 'تُوْصَ',
          '2fs': 'تُوْصَيْ',
          '3ms': 'يُوْصَ',
          '3fs': 'تُوْصَ',
          '2d': 'تُوْصَيَا',
          '3md': 'يُوْصَيَا',
          '3fd': 'تُوْصَيَا',
          '1p': 'نُوْصَ',
          '2mp': 'تُوْصَوْا',
          '2fp': 'تُوْصَيْنَ',
          '3mp': 'يُوْصَوْا',
          '3fp': 'يُوْصَيْنَ',
        })
      })

      test('أَوْحَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وحي', 4), 'jussive')).toEqualT({
          '1s': 'أُوْحَ',
          '2ms': 'تُوْحَ',
          '2fs': 'تُوْحَيْ',
          '3ms': 'يُوْحَ',
          '3fs': 'تُوْحَ',
          '2d': 'تُوْحَيَا',
          '3md': 'يُوْحَيَا',
          '3fd': 'تُوْحَيَا',
          '1p': 'نُوْحَ',
          '2mp': 'تُوْحَوْا',
          '2fp': 'تُوْحَيْنَ',
          '3mp': 'يُوْحَوْا',
          '3fp': 'يُوْحَيْنَ',
        })
      })

      test('أَوْفَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 4), 'jussive')).toEqualT({
          '1s': 'أُوْفَ',
          '2ms': 'تُوْفَ',
          '2fs': 'تُوْفَيْ',
          '3ms': 'يُوْفَ',
          '3fs': 'تُوْفَ',
          '2d': 'تُوْفَيَا',
          '3md': 'يُوْفَيَا',
          '3fd': 'تُوْفَيَا',
          '1p': 'نُوْفَ',
          '2mp': 'تُوْفَوْا',
          '2fp': 'تُوْفَيْنَ',
          '3mp': 'يُوْفَوْا',
          '3fp': 'يُوْفَيْنَ',
        })
      })

      test('أُرِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 4), 'jussive')).toEqualT({
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

      test('أَوْدَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودي', 4), 'jussive')).toEqualT({
          '1s': 'أُوْدَ',
          '2ms': 'تُوْدَ',
          '2fs': 'تُوْدَيْ',
          '3ms': 'يُوْدَ',
          '3fs': 'تُوْدَ',
          '2d': 'تُوْدَيَا',
          '3md': 'يُوْدَيَا',
          '3fd': 'تُوْدَيَا',
          '1p': 'نُوْدَ',
          '2mp': 'تُوْدَوْا',
          '2fp': 'تُوْدَيْنَ',
          '3mp': 'يُوْدَوْا',
          '3fp': 'يُوْدَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['ومأ', 'يُوْمَأْ'],
        ['نشأ', 'يُنْشَأْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذَنْ'],
        ['أمن', 'يُؤْمَنْ'],
        ['ألم', 'يُؤْلَمْ'],
        ['أجر', 'يُؤْجَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضَأْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَضَاءَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ضوء', 4), 'jussive')).toEqualT({
          '1s': 'أُضَأْ',
          '2ms': 'تُضَأْ',
          '2fs': 'تُضَائِي',
          '3ms': 'يُضَأْ',
          '3fs': 'تُضَأْ',
          '2d': 'تُضَاءَا',
          '3md': 'يُضَاءَا',
          '3fd': 'تُضَاءَا',
          '1p': 'نُضَأْ',
          '2mp': 'تُضَائُوْا',
          '2fp': 'تُضَأْنَ',
          '3mp': 'يُضَائُوْا',
          '3fp': 'يُضَأْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test('آتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 4), 'jussive')).toEqualT({
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
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test('تَعَرَّفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرف', 5), 'jussive')).toEqualT({
          '1s': 'أُتَعَرَّفْ',
          '2ms': 'تُتَعَرَّفْ',
          '2fs': 'تُتَعَرَّفِي',
          '3ms': 'يُتَعَرَّفْ',
          '3fs': 'تُتَعَرَّفْ',
          '2d': 'تُتَعَرَّفَا',
          '3md': 'يُتَعَرَّفَا',
          '3fd': 'تُتَعَرَّفَا',
          '1p': 'نُتَعَرَّفْ',
          '2mp': 'تُتَعَرَّفُوْا',
          '2fp': 'تُتَعَرَّفْنَ',
          '3mp': 'يُتَعَرَّفُوْا',
          '3fp': 'يُتَعَرَّفْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('تَأَثَّرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أثر', 5), 'jussive')).toEqualT({
          '1s': 'أُتَأَثَّرْ',
          '2ms': 'تُتَأَثَّرْ',
          '2fs': 'تُتَأَثَّرِي',
          '3ms': 'يُتَأَثَّرْ',
          '3fs': 'تُتَأَثَّرْ',
          '2d': 'تُتَأَثَّرَا',
          '3md': 'يُتَأَثَّرَا',
          '3fd': 'تُتَأَثَّرَا',
          '1p': 'نُتَأَثَّرْ',
          '2mp': 'تُتَأَثَّرُوْا',
          '2fp': 'تُتَأَثَّرْنَ',
          '3mp': 'يُتَأَثَّرُوْا',
          '3fp': 'يُتَأَثَّرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يُتَوَصَّلْ'],
        ['وفر', 'يُتَوَفَّرْ'],
        ['وقف', 'يُتَوَقَّفْ'],
        ['وقع', 'يُتَوَقَّعْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['هدد', 'يُتَهَدَّدْ'],
        ['عزز', 'يُتَعَزَّزْ'],
        ['قرر', 'يُتَقَرَّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['رءي', 'يُتَرَأَّ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })

      test('تَبَقَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('بقي', 5), 'jussive')).toEqualT({
          '1s': 'أُتَبَقَّ',
          '2ms': 'تُتَبَقَّ',
          '2fs': 'تُتَبَقَّيْ',
          '3ms': 'يُتَبَقَّ',
          '3fs': 'تُتَبَقَّ',
          '2d': 'تُتَبَقَّيَا',
          '3md': 'يُتَبَقَّيَا',
          '3fd': 'تُتَبَقَّيَا',
          '1p': 'نُتَبَقَّ',
          '2mp': 'تُتَبَقَّوْا',
          '2fp': 'تُتَبَقَّيْنَ',
          '3mp': 'يُتَبَقَّوْا',
          '3fp': 'يُتَبَقَّيْنَ',
        })
      })

      test('تَبَنَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('بني', 5), 'jussive')).toEqualT({
          '1s': 'أُتَبَنَّ',
          '2ms': 'تُتَبَنَّ',
          '2fs': 'تُتَبَنَّيْ',
          '3ms': 'يُتَبَنَّ',
          '3fs': 'تُتَبَنَّ',
          '2d': 'تُتَبَنَّيَا',
          '3md': 'يُتَبَنَّيَا',
          '3fd': 'تُتَبَنَّيَا',
          '1p': 'نُتَبَنَّ',
          '2mp': 'تُتَبَنَّوْا',
          '2fp': 'تُتَبَنَّيْنَ',
          '3mp': 'يُتَبَنَّوْا',
          '3fp': 'يُتَبَنَّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُتَوَفَّ'],
        ['وقي', 'يُتَوَقَّ'],
        ['وخي', 'يُتَوَخَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['شرك', 'يُتَشَارَكْ'],
        ['علج', 'يُتَعَالَجْ'],
        ['عمل', 'يُتَعَامَلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each<[string, string]>([
        ['ألف', 'يُتَآلَفْ'],
        ['أمر', 'يُتَآمَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['نول', 'يُتَنَاوَلْ'],
        ['فوض', 'يُتَفَاوَضْ'],
        ['جوز', 'يُتَجَاوَزْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['عفو', 'يُتَعَافَ'],
        ['هوي', 'يُتَهَاوَ'],
        ['وصي', 'يُتَوَاصَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 6), 'jussive')).toEqualT({
          '1s': 'أُتَوَاطَأْ',
          '2ms': 'تُتَوَاطَأْ',
          '2fs': 'تُتَوَاطَئِي',
          '3ms': 'يُتَوَاطَأْ',
          '3fs': 'تُتَوَاطَأْ',
          '2d': 'تُتَوَاطَآ',
          '3md': 'يُتَوَاطَآ',
          '3fd': 'تُتَوَاطَآ',
          '1p': 'نُتَوَاطَأْ',
          '2mp': 'تُتَوَاطَأُوْا',
          '2fp': 'تُتَوَاطَأْنَ',
          '3mp': 'يُتَوَاطَأُوْا',
          '3fp': 'يُتَوَاطَأْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حبب', 'يُتَحَابَبْ'],
        ['مسس', 'يُتَمَاسَسْ'],
        ['ضدد', 'يُتَضَادَدْ'],
        ['ردد', 'يُتَرَادَدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وجد', 'يُتَوَاجَدْ'],
        ['وفق', 'يُتَوَافَقْ'],
        ['وفر', 'يُتَوَافَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'يُنْخَفَضْ'],
        ['عكس', 'يُنْعَكَسْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'يُنْقَصَّ'],
        ['بثث', 'يُنْبَثَّ'],
        ['كفف', 'يُنْكَفَّ'],
        ['دسس', 'يُنْدَسَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('قصص', 7), 'jussive')).toEqualT({
          '1s': 'أُنْقَصَّ',
          '2ms': 'تُنْقَصَّ',
          '2fs': 'تُنْقَصِي',
          '3ms': 'يُنْقَصَّ',
          '3fs': 'تُنْقَصَّ',
          '2d': 'تُنْقَصَّا',
          '3md': 'يُنْقَصَّا',
          '3fd': 'تُنْقَصَّا',
          '1p': 'نُنْقَصَّ',
          '2mp': 'تُنْقَصُّوْا',
          '2fp': 'تُنْقَصْنَ',
          '3mp': 'يُنْقَصُّوْا',
          '3fp': 'يُنْقَصْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([['ثني', 'يُنْثَنَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'يُقْتَرَحْ'],
        ['عمد', 'يُعْتَمَدْ'],
        ['نظر', 'يُنْتَظَرْ'],
        ['ضلع', 'يُضْطَلَعْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اِعْتَبَرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عبر', 8), 'jussive')).toEqualT({
          '1s': 'أُعْتَبَرْ',
          '2ms': 'تُعْتَبَرْ',
          '2fs': 'تُعْتَبَرِي',
          '3ms': 'يُعْتَبَرْ',
          '3fs': 'تُعْتَبَرْ',
          '2d': 'تُعْتَبَرَا',
          '3md': 'يُعْتَبَرَا',
          '3fd': 'تُعْتَبَرَا',
          '1p': 'نُعْتَبَرْ',
          '2mp': 'تُعْتَبَرُوْا',
          '2fp': 'تُعْتَبَرْنَ',
          '3mp': 'يُعْتَبَرُوْا',
          '3fp': 'يُعْتَبَرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'يُحْتَلَّ'],
        ['مدد', 'يُمْتَدَّ'],
        ['حجج', 'يُحْتَجَّ'],
        ['ردد', 'يُرْتَدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اُضْطُرَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ضرر', 8), 'jussive')).toEqualT({
          '1s': 'أُضْطَرَّ',
          '2ms': 'تُضْطَرَّ',
          '2fs': 'تُضْطَرِّي',
          '3ms': 'يُضْطَرَّ',
          '3fs': 'تُضْطَرَّ',
          '2d': 'تُضْطَرَّا',
          '3md': 'يُضْطَرَّا',
          '3fd': 'تُضْطَرَّا',
          '1p': 'نُضْطَرَّ',
          '2mp': 'تُضْطَرُّوْا',
          '2fp': 'تُضْطَرَرْنَ',
          '3mp': 'يُضْطَرُّوْا',
          '3fp': 'يُضْطَرَرْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اُتُّقِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقي', 8), 'jussive')).toEqualT({
          '1s': 'أُتَّقَ',
          '2ms': 'تُتَّقَ',
          '2fs': 'تُتَّقَيْ',
          '3ms': 'يُتَّقَ',
          '3fs': 'تُتَّقَ',
          '2d': 'تُتَّقَيَا',
          '3md': 'يُتَّقَيَا',
          '3fd': 'تُتَّقَيَا',
          '1p': 'نُتَّقَ',
          '2mp': 'تُتَّقَوْا',
          '2fp': 'تُتَّقَيْنَ',
          '3mp': 'يُتَّقَوْا',
          '3fp': 'يُتَّقَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('اُرْتُئِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 8), 'jussive')).toEqualT({
          '1s': 'أُرْتَأَ',
          '2ms': 'تُرْتَأَ',
          '2fs': 'تُرْتَأَيْ',
          '3ms': 'يُرْتَأَ',
          '3fs': 'تُرْتَأَ',
          '2d': 'تُرْتَأَيَا',
          '3md': 'يُرْتَأَيَا',
          '3fd': 'تُرْتَأَيَا',
          '1p': 'نُرْتَأَ',
          '2mp': 'تُرْتَأَوْا',
          '2fp': 'تُرْتَأَيْنَ',
          '3mp': 'يُرْتَأَوْا',
          '3fp': 'يُرْتَأَيْنَ',
        })
      })

      test('اُقْتُضِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('قضي', 8), 'jussive')).toEqualT({
          '1s': 'أُقْتَضَ',
          '2ms': 'تُقْتَضَ',
          '2fs': 'تُقْتَضَيْ',
          '3ms': 'يُقْتَضَ',
          '3fs': 'تُقْتَضَ',
          '2d': 'تُقْتَضَيَا',
          '3md': 'يُقْتَضَيَا',
          '3fd': 'تُقْتَضَيَا',
          '1p': 'نُقْتَضَ',
          '2mp': 'تُقْتَضُوْا',
          '2fp': 'تُقْتَضَيْنَ',
          '3mp': 'يُقْتَضُوْا',
          '3fp': 'يُقْتَضَيْنَ',
        })
      })

      test('اُرْتُدِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ردي', 8), 'jussive')).toEqualT({
          '1s': 'أُرْتَدَ',
          '2ms': 'تُرْتَدَ',
          '2fs': 'تُرْتَدَيْ',
          '3ms': 'يُرْتَدَ',
          '3fs': 'تُرْتَدَ',
          '2d': 'تُرْتَدَيَا',
          '3md': 'يُرْتَدَيَا',
          '3fd': 'تُرْتَدَيَا',
          '1p': 'نُرْتَدَ',
          '2mp': 'تُرْتَدُوْا',
          '2fp': 'تُرْتَدَيْنَ',
          '3mp': 'يُرْتَدُوْا',
          '3fp': 'يُرْتَدَيْنَ',
        })
      })

      test('اُشْتُرِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شري', 8), 'jussive')).toEqualT({
          '1s': 'أُشْتَرَ',
          '2ms': 'تُشْتَرَ',
          '2fs': 'تُشْتَرَيْ',
          '3ms': 'يُشْتَرَ',
          '3fs': 'تُشْتَرَ',
          '2d': 'تُشْتَرَيَا',
          '3md': 'يُشْتَرَيَا',
          '3fd': 'تُشْتَرَيَا',
          '1p': 'نُشْتَرَ',
          '2mp': 'تُشْتَرُوْا',
          '2fp': 'تُشْتَرَيْنَ',
          '3mp': 'يُشْتَرُوْا',
          '3fp': 'يُشْتَرَيْنَ',
        })
      })

      test('اُخْتُفِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('خفي', 8), 'jussive')).toEqualT({
          '1s': 'أُخْتَفَ',
          '2ms': 'تُخْتَفَ',
          '2fs': 'تُخْتَفَيْ',
          '3ms': 'يُخْتَفَ',
          '3fs': 'تُخْتَفَ',
          '2d': 'تُخْتَفَيَا',
          '3md': 'يُخْتَفَيَا',
          '3fd': 'تُخْتَفَيَا',
          '1p': 'نُخْتَفَ',
          '2mp': 'تُخْتَفُوْا',
          '2fp': 'تُخْتَفَيْنَ',
          '3mp': 'يُخْتَفُوْا',
          '3fp': 'يُخْتَفَيْنَ',
        })
      })

      test('اُدُّعِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعو', 8), 'jussive')).toEqualT({
          '1s': 'أُدَّعَ',
          '2ms': 'تُدَّعَ',
          '2fs': 'تُدَّعَيْ',
          '3ms': 'يُدَّعَ',
          '3fs': 'تُدَّعَ',
          '2d': 'تُدَّعَيَا',
          '3md': 'يُدَّعَيَا',
          '3fd': 'تُدَّعَيَا',
          '1p': 'نُدَّعَ',
          '2mp': 'تُدَّعُوْا',
          '2fp': 'تُدَّعَيْنَ',
          '3mp': 'يُدَّعُوْا',
          '3fp': 'يُدَّعَيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وكأ', 'يُتَّكَأْ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زوج', 'يُزْدَوَجْ'],
        ['سوء', 'يُسْتَأْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يُؤْتَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 8), 'jussive')).toEqualT({
          '1s': 'أُؤْتَمَّ',
          '2ms': 'تُؤْتَمَّ',
          '2fs': 'تُؤْتَمِّي',
          '3ms': 'يُؤْتَمَّ',
          '3fs': 'تُؤْتَمَّ',
          '2d': 'تُؤْتَمَّا',
          '3md': 'يُؤْتَمَّا',
          '3fd': 'تُؤْتَمَّا',
          '1p': 'نُؤْتَمَّ',
          '2mp': 'تُؤْتَمُّوْا',
          '2fp': 'تُؤْتَمَمْنَ',
          '3mp': 'يُؤْتَمُّوْا',
          '3fp': 'يُؤْتَمَمْنَ',
        })
      })
    })
  })
})
