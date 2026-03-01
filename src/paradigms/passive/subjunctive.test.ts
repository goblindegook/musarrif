import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getVerb, verbs } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present subjunctive', () => {
  test('impersonal passive only conjugates 3ms in present subjunctive', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs.filter((verb) => verb.passiveVoice === 'impersonal')),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePresentMood(verb, 'subjunctive')[pronounId]).toBe('')
        },
      ),
    )
  })

  describe('Form I', () => {
    describe('strong roots', () => {
      test.each([
        ['نظر', 'يُنْظَرَ'],
        ['مثل', 'يُمْثَلَ'],
        ['دعم', 'يُدْعَمَ'],
        ['بلغ', 'يُبْلَغَ'],
        ['كلم', 'يُكْلَمَ'],
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
        ['زيد', 'يُزَادَ'],
        ['شوق', 'يُشَاقَ'],
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
      test.each([['رءي', 'يُرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 1), 'subjunctive')).toEqualT({
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

    describe('hollow roots', () => {
      test.each([
        ['قود', 'يُنْقَادَ'],
        ['هيل', 'يُنْهَالَ'],
        ['حوز', 'يُنْحَازَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
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
        expect(conjugatePassivePresentMood(getVerb('روي', 1), 'subjunctive')).toEqualT({
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

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذَّى'],
        ['أسي', 'يُؤَسَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يُؤَخَّرَ'],
        ['أمر', 'يُؤَمَّرَ'],
        ['أثر', 'يُؤَثَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنَّأَ']])('%s pattern', (root, expected) => {
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
        ['شوق', 'يُشَوَّقَ'],
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

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['تبع', 'يُتَابَعَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['كلم', 'يُكَالَمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['بلغ', 'يُبَالَغَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['سعد', 'يُسَاعَدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['صحب', 'يُصَاحَبَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['وجه', 'يُوَاجَهَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['وثق', 'يُوَاثَقَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test.each([['وعد', 'يُوَاعَدَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('عَامَلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عمل', 3), 'subjunctive')).toEqualT({
          '1s': 'أُعَامَلَ',
          '2ms': 'تُعَامَلَ',
          '2fs': 'تُعَامَلِي',
          '3ms': 'يُعَامَلَ',
          '3fs': 'تُعَامَلَ',
          '2d': 'تُعَامَلَا',
          '3md': 'يُعَامَلَا',
          '3fd': 'تُعَامَلَا',
          '1p': 'نُعَامَلَ',
          '2mp': 'تُعَامَلُوْا',
          '2fp': 'تُعَامَلْنَ',
          '3mp': 'يُعَامَلُوْا',
          '3fp': 'يُعَامَلْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوم', 'يُقَاوَمَ'],
        ['عود', 'يُعَاوَدَ'],
        ['جوز', 'يُجَاوَزَ'],
        ['نول', 'يُنَاوَلَ'],
        ['ضيق', 'يُضَايَقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارَّ'],
        ['ردد', 'يُرَادَّ'],
        ['مدد', 'يُمَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('سرر', 3), 'subjunctive')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('ردد', 3), 'subjunctive')).toEqualT({
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
        expect(conjugatePassivePresentMood(getVerb('مدد', 3), 'subjunctive')).toEqualT({
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
        ['ندي', 'يُنَادَى'],
        ['رعي', 'يُرَاعَى'],
        ['بلي', 'يُبَالَى'],
        ['قضي', 'يُقَاضَى'],
        ['بري', 'يُبَارَى'],
        ['رءي', 'يُرَاءَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخَذَ'],
        ['أجر', 'يُؤَاجَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['لأم', 'يُلَاءَمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('وَاءَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وأم', 3), 'subjunctive')).toEqualT({
          '1s': 'أُوَاءَمَ',
          '2ms': 'تُوَاءَمَ',
          '2fs': 'تُوَاءَمِي',
          '3ms': 'يُوَاءَمَ',
          '3fs': 'تُوَاءَمَ',
          '2d': 'تُوَاءَمَا',
          '3md': 'يُوَاءَمَا',
          '3fd': 'تُوَاءَمَا',
          '1p': 'نُوَاءَمَ',
          '2mp': 'تُوَاءَمُوْا',
          '2fp': 'تُوَاءَمْنَ',
          '3mp': 'يُوَاءَمُوْا',
          '3fp': 'يُوَاءَمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'يُوَازَى'],
        ['وفي', 'يُوَافَى'],
        ['وسي', 'يُوَاسَى'],
        ['نوي', 'يُنَاوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['وقف', 'يُوْقَفَ'],
        ['وقع', 'يُوْقَعَ'],
        ['ولد', 'يُوْلَدَ'],
        ['وصل', 'يُوْصَلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وضح', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْضَحَ',
          '2ms': 'تُوْضَحَ',
          '2fs': 'تُوْضَحِي',
          '3ms': 'يُوْضَحَ',
          '3fs': 'تُوْضَحَ',
          '2d': 'تُوْضَحَا',
          '3md': 'يُوْضَحَا',
          '3fd': 'تُوْضَحَا',
          '1p': 'نُوْضَحَ',
          '2mp': 'تُوْضَحُوْا',
          '2fp': 'تُوْضَحْنَ',
          '3mp': 'يُوْضَحُوْا',
          '3fp': 'يُوْضَحْنَ',
        })
      })

      test('أَكْثَرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كثر', 4), 'subjunctive')).toEqualT({
          '1s': 'أُكْثَرَ',
          '2ms': 'تُكْثَرَ',
          '2fs': 'تُكْثَرِي',
          '3ms': 'يُكْثَرَ',
          '3fs': 'تُكْثَرَ',
          '2d': 'تُكْثَرَا',
          '3md': 'يُكْثَرَا',
          '3fd': 'تُكْثَرَا',
          '1p': 'نُكْثَرَ',
          '2mp': 'تُكْثَرُوْا',
          '2fp': 'تُكْثَرْنَ',
          '3mp': 'يُكْثَرُوْا',
          '3fp': 'يُكْثَرْنَ',
        })
      })

      test('أَعْلَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('علم', 4), 'subjunctive')).toEqualT({
          '1s': 'أُعْلَمَ',
          '2ms': 'تُعْلَمَ',
          '2fs': 'تُعْلَمِي',
          '3ms': 'يُعْلَمَ',
          '3fs': 'تُعْلَمَ',
          '2d': 'تُعْلَمَا',
          '3md': 'يُعْلَمَا',
          '3fd': 'تُعْلَمَا',
          '1p': 'نُعْلَمَ',
          '2mp': 'تُعْلَمُوْا',
          '2fp': 'تُعْلَمْنَ',
          '3mp': 'يُعْلَمُوْا',
          '3fp': 'يُعْلَمْنَ',
        })
      })

      test('أَلْحَقَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لحق', 4), 'subjunctive')).toEqualT({
          '1s': 'أُلْحَقَ',
          '2ms': 'تُلْحَقَ',
          '2fs': 'تُلْحَقِي',
          '3ms': 'يُلْحَقَ',
          '3fs': 'تُلْحَقَ',
          '2d': 'تُلْحَقَا',
          '3md': 'يُلْحَقَا',
          '3fd': 'تُلْحَقَا',
          '1p': 'نُلْحَقَ',
          '2mp': 'تُلْحَقُوْا',
          '2fp': 'تُلْحَقْنَ',
          '3mp': 'يُلْحَقُوْا',
          '3fp': 'يُلْحَقْنَ',
        })
      })

      test('أَصْبَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('صبح', 4), 'subjunctive')).toEqualT({
          '1s': 'أُصْبَحَ',
          '2ms': 'تُصْبَحَ',
          '2fs': 'تُصْبَحِي',
          '3ms': 'يُصْبَحَ',
          '3fs': 'تُصْبَحَ',
          '2d': 'تُصْبَحَا',
          '3md': 'يُصْبَحَا',
          '3fd': 'تُصْبَحَا',
          '1p': 'نُصْبَحَ',
          '2mp': 'تُصْبَحُوْا',
          '2fp': 'تُصْبَحْنَ',
          '3mp': 'يُصْبَحُوْا',
          '3fp': 'يُصْبَحْنَ',
        })
      })

      test('أَعْرَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرب', 4), 'subjunctive')).toEqualT({
          '1s': 'أُعْرَبَ',
          '2ms': 'تُعْرَبَ',
          '2fs': 'تُعْرَبِي',
          '3ms': 'يُعْرَبَ',
          '3fs': 'تُعْرَبَ',
          '2d': 'تُعْرَبَا',
          '3md': 'يُعْرَبَا',
          '3fd': 'تُعْرَبَا',
          '1p': 'نُعْرَبَ',
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
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشَارَ'],
        ['رود', 'يُرَادَ'],
        ['تيح', 'يُتَاحَ'],
        ['فيد', 'يُفَادَ'],
        ['عود', 'يُعَادَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'يُعْلَى'],
        ['بقي', 'يُبْقَى'],
        ['سمي', 'يُسْمَى'],
        ['عطي', 'يُعْطَى'],
        ['لقي', 'يُلْقَى'],
        ['حيي', 'يُحْيَا'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُحْيَا',
          '2ms': 'تُحْيَا',
          '2fs': 'تُحْيَيْ',
          '3ms': 'يُحْيَا',
          '3fs': 'تُحْيَا',
          '2d': 'تُحْيَيَا',
          '3md': 'يُحْيَيَا',
          '3fd': 'تُحْيَيَا',
          '1p': 'نُحْيَا',
          '2mp': 'تُحْيَوْا',
          '2fp': 'تُحْيَيْنَ',
          '3mp': 'يُحْيَوْا',
          '3fp': 'يُحْيَيْنَ',
        })
      })

      test('أَوْصَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وصي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْصَى',
          '2ms': 'تُوْصَى',
          '2fs': 'تُوْصَيْ',
          '3ms': 'يُوْصَى',
          '3fs': 'تُوْصَى',
          '2d': 'تُوْصَيَا',
          '3md': 'يُوْصَيَا',
          '3fd': 'تُوْصَيَا',
          '1p': 'نُوْصَى',
          '2mp': 'تُوْصَوْا',
          '2fp': 'تُوْصَيْنَ',
          '3mp': 'يُوْصَوْا',
          '3fp': 'يُوْصَيْنَ',
        })
      })

      test('أَوْحَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وحي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْحَى',
          '2ms': 'تُوْحَى',
          '2fs': 'تُوْحَيْ',
          '3ms': 'يُوْحَى',
          '3fs': 'تُوْحَى',
          '2d': 'تُوْحَيَا',
          '3md': 'يُوْحَيَا',
          '3fd': 'تُوْحَيَا',
          '1p': 'نُوْحَى',
          '2mp': 'تُوْحَوْا',
          '2fp': 'تُوْحَيْنَ',
          '3mp': 'يُوْحَوْا',
          '3fp': 'يُوْحَيْنَ',
        })
      })

      test('أَوْفَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْفَى',
          '2ms': 'تُوْفَى',
          '2fs': 'تُوْفَيْ',
          '3ms': 'يُوْفَى',
          '3fs': 'تُوْفَى',
          '2d': 'تُوْفَيَا',
          '3md': 'يُوْفَيَا',
          '3fd': 'تُوْفَيَا',
          '1p': 'نُوْفَى',
          '2mp': 'تُوْفَوْا',
          '2fp': 'تُوْفَيْنَ',
          '3mp': 'يُوْفَوْا',
          '3fp': 'يُوْفَيْنَ',
        })
      })

      test('أُرِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 4), 'subjunctive')).toEqualT({
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

      test('أَوْدَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْدَى',
          '2ms': 'تُوْدَى',
          '2fs': 'تُوْدَيْ',
          '3ms': 'يُوْدَى',
          '3fs': 'تُوْدَى',
          '2d': 'تُوْدَيَا',
          '3md': 'يُوْدَيَا',
          '3fd': 'تُوْدَيَا',
          '1p': 'نُوْدَى',
          '2mp': 'تُوْدَوْا',
          '2fp': 'تُوْدَيْنَ',
          '3mp': 'يُوْدَوْا',
          '3fp': 'يُوْدَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['ومأ', 'يُوْمَأَ'],
        ['نشأ', 'يُنْشَأَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذَنَ'],
        ['أمن', 'يُؤْمَنَ'],
        ['ألم', 'يُؤْلَمَ'],
        ['أجر', 'يُؤْجَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَضَاءَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ضوء', 4), 'subjunctive')).toEqualT({
          '1s': 'أُضَاءَ',
          '2ms': 'تُضَاءَ',
          '2fs': 'تُضَائِي',
          '3ms': 'يُضَاءَ',
          '3fs': 'تُضَاءَ',
          '2d': 'تُضَاءَا',
          '3md': 'يُضَاءَا',
          '3fd': 'تُضَاءَا',
          '1p': 'نُضَاءَ',
          '2mp': 'تُضَائُوْا',
          '2fp': 'تُضَأْنَ',
          '3mp': 'يُضَائُوْا',
          '3fp': 'يُضَأْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test('آتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 4), 'subjunctive')).toEqualT({
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
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test('تَعَرَّفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرف', 5), 'subjunctive')).toEqualT({
          '1s': 'أُتَعَرَّفَ',
          '2ms': 'تُتَعَرَّفَ',
          '2fs': 'تُتَعَرَّفِي',
          '3ms': 'يُتَعَرَّفَ',
          '3fs': 'تُتَعَرَّفَ',
          '2d': 'تُتَعَرَّفَا',
          '3md': 'يُتَعَرَّفَا',
          '3fd': 'تُتَعَرَّفَا',
          '1p': 'نُتَعَرَّفَ',
          '2mp': 'تُتَعَرَّفُوْا',
          '2fp': 'تُتَعَرَّفْنَ',
          '3mp': 'يُتَعَرَّفُوْا',
          '3fp': 'يُتَعَرَّفْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أول', 'يُتَأَوَّلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('تَأَثَّرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أثر', 5), 'subjunctive')).toEqualT({
          '1s': 'أُتَأَثَّرَ',
          '2ms': 'تُتَأَثَّرَ',
          '2fs': 'تُتَأَثَّرِي',
          '3ms': 'يُتَأَثَّرَ',
          '3fs': 'تُتَأَثَّرَ',
          '2d': 'تُتَأَثَّرَا',
          '3md': 'يُتَأَثَّرَا',
          '3fd': 'تُتَأَثَّرَا',
          '1p': 'نُتَأَثَّرَ',
          '2mp': 'تُتَأَثَّرُوْا',
          '2fp': 'تُتَأَثَّرْنَ',
          '3mp': 'يُتَأَثَّرُوْا',
          '3fp': 'يُتَأَثَّرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يُتَوَصَّلَ'],
        ['وفر', 'يُتَوَفَّرَ'],
        ['وقف', 'يُتَوَقَّفَ'],
        ['وقع', 'يُتَوَقَّعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['هدد', 'يُتَهَدَّدَ'],
        ['عزز', 'يُتَعَزَّزَ'],
        ['قرر', 'يُتَقَرَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'يُتَبَقَّى'],
        ['بني', 'يُتَبَنَّى'],
        ['رءي', 'يُتَرَأَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُتَوَفَّى'],
        ['وقي', 'يُتَوَقَّى'],
        ['وخي', 'يُتَوَخَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['شرك', 'يُتَشَارَكَ'],
        ['علج', 'يُتَعَالَجَ'],
        ['عمل', 'يُتَعَامَلَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each<[string, string]>([
        ['ألف', 'يُتَآلَفَ'],
        ['أمر', 'يُتَآمَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['نول', 'يُتَنَاوَلَ'],
        ['فوض', 'يُتَفَاوَضَ'],
        ['جوز', 'يُتَجَاوَزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['عفو', 'يُتَعَافَى'],
        ['هوي', 'يُتَهَاوَى'],
        ['وصي', 'يُتَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 6), 'subjunctive')).toEqualT({
          '1s': 'أُتَوَاطَأَ',
          '2ms': 'تُتَوَاطَأَ',
          '2fs': 'تُتَوَاطَئِي',
          '3ms': 'يُتَوَاطَأَ',
          '3fs': 'تُتَوَاطَأَ',
          '2d': 'تُتَوَاطَآ',
          '3md': 'يُتَوَاطَآ',
          '3fd': 'تُتَوَاطَآ',
          '1p': 'نُتَوَاطَأَ',
          '2mp': 'تُتَوَاطَأُوْا',
          '2fp': 'تُتَوَاطَأْنَ',
          '3mp': 'يُتَوَاطَأُوْا',
          '3fp': 'يُتَوَاطَأْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حبب', 'يُتَحَابَبَ'],
        ['مسس', 'يُتَمَاسَسَ'],
        ['ضدد', 'يُتَضَادَدَ'],
        ['ردد', 'يُتَرَادَدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وجد', 'يُتَوَاجَدَ'],
        ['وفق', 'يُتَوَافَقَ'],
        ['وفر', 'يُتَوَافَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'يُنْخَفَضَ'],
        ['عكس', 'يُنْعَكَسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'يُنْقَصَّ'],
        ['بثث', 'يُنْبَثَّ'],
        ['كفف', 'يُنْكَفَّ'],
        ['دسس', 'يُنْدَسَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('قصص', 7), 'subjunctive')).toEqualT({
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
      test.each([['ثني', 'يُنْثَنَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'يُقْتَرَحَ'],
        ['عمد', 'يُعْتَمَدَ'],
        ['نظر', 'يُنْتَظَرَ'],
        ['ضلع', 'يُضْطَلَعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِعْتَبَرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عبر', 8), 'subjunctive')).toEqualT({
          '1s': 'أُعْتَبَرَ',
          '2ms': 'تُعْتَبَرَ',
          '2fs': 'تُعْتَبَرِي',
          '3ms': 'يُعْتَبَرَ',
          '3fs': 'تُعْتَبَرَ',
          '2d': 'تُعْتَبَرَا',
          '3md': 'يُعْتَبَرَا',
          '3fd': 'تُعْتَبَرَا',
          '1p': 'نُعْتَبَرَ',
          '2mp': 'تُعْتَبَرُوْا',
          '2fp': 'تُعْتَبَرْنَ',
          '3mp': 'يُعْتَبَرُوْا',
          '3fp': 'يُعْتَبَرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['كءب', 'يُكْتَأَبَ'],
        ['بءس', 'يُبْتَأَسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'يُحْتَلَّ'],
        ['مدد', 'يُمْتَدَّ'],
        ['حجج', 'يُحْتَجَّ'],
        ['ردد', 'يُرْتَدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اُضْطُرَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ضرر', 8), 'subjunctive')).toEqualT({
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
      test.each([
        ['نوي', 'يُنْتَوَى'],
        ['سوي', 'يُسْتَوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اُتُّقِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وقي', 8), 'subjunctive')).toEqualT({
          '1s': 'أُتَّقَى',
          '2ms': 'تُتَّقَى',
          '2fs': 'تُتَّقَيْ',
          '3ms': 'يُتَّقَى',
          '3fs': 'تُتَّقَى',
          '2d': 'تُتَّقَيَا',
          '3md': 'يُتَّقَيَا',
          '3fd': 'تُتَّقَيَا',
          '1p': 'نُتَّقَى',
          '2mp': 'تُتَّقَوْا',
          '2fp': 'تُتَّقَيْنَ',
          '3mp': 'يُتَّقَوْا',
          '3fp': 'يُتَّقَيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('اُرْتُئِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 8), 'subjunctive')).toEqualT({
          '1s': 'أُرْتَأَى',
          '2ms': 'تُرْتَأَى',
          '2fs': 'تُرْتَأَيْ',
          '3ms': 'يُرْتَأَى',
          '3fs': 'تُرْتَأَى',
          '2d': 'تُرْتَأَيَا',
          '3md': 'يُرْتَأَيَا',
          '3fd': 'تُرْتَأَيَا',
          '1p': 'نُرْتَأَى',
          '2mp': 'تُرْتَأَوْا',
          '2fp': 'تُرْتَأَيْنَ',
          '3mp': 'يُرْتَأَوْا',
          '3fp': 'يُرْتَأَيْنَ',
        })
      })

      test('اُقْتُضِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('قضي', 8), 'subjunctive')).toEqualT({
          '1s': 'أُقْتَضَى',
          '2ms': 'تُقْتَضَى',
          '2fs': 'تُقْتَضَيْ',
          '3ms': 'يُقْتَضَى',
          '3fs': 'تُقْتَضَى',
          '2d': 'تُقْتَضَيَا',
          '3md': 'يُقْتَضَيَا',
          '3fd': 'تُقْتَضَيَا',
          '1p': 'نُقْتَضَى',
          '2mp': 'تُقْتَضُوْا',
          '2fp': 'تُقْتَضَيْنَ',
          '3mp': 'يُقْتَضُوْا',
          '3fp': 'يُقْتَضَيْنَ',
        })
      })

      test('اُرْتُدِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ردي', 8), 'subjunctive')).toEqualT({
          '1s': 'أُرْتَدَى',
          '2ms': 'تُرْتَدَى',
          '2fs': 'تُرْتَدَيْ',
          '3ms': 'يُرْتَدَى',
          '3fs': 'تُرْتَدَى',
          '2d': 'تُرْتَدَيَا',
          '3md': 'يُرْتَدَيَا',
          '3fd': 'تُرْتَدَيَا',
          '1p': 'نُرْتَدَى',
          '2mp': 'تُرْتَدُوْا',
          '2fp': 'تُرْتَدَيْنَ',
          '3mp': 'يُرْتَدُوْا',
          '3fp': 'يُرْتَدَيْنَ',
        })
      })

      test('اُشْتُرِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('شري', 8), 'subjunctive')).toEqualT({
          '1s': 'أُشْتَرَى',
          '2ms': 'تُشْتَرَى',
          '2fs': 'تُشْتَرَيْ',
          '3ms': 'يُشْتَرَى',
          '3fs': 'تُشْتَرَى',
          '2d': 'تُشْتَرَيَا',
          '3md': 'يُشْتَرَيَا',
          '3fd': 'تُشْتَرَيَا',
          '1p': 'نُشْتَرَى',
          '2mp': 'تُشْتَرُوْا',
          '2fp': 'تُشْتَرَيْنَ',
          '3mp': 'يُشْتَرُوْا',
          '3fp': 'يُشْتَرَيْنَ',
        })
      })

      test('اُخْتُفِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('خفي', 8), 'subjunctive')).toEqualT({
          '1s': 'أُخْتَفَى',
          '2ms': 'تُخْتَفَى',
          '2fs': 'تُخْتَفَيْ',
          '3ms': 'يُخْتَفَى',
          '3fs': 'تُخْتَفَى',
          '2d': 'تُخْتَفَيَا',
          '3md': 'يُخْتَفَيَا',
          '3fd': 'تُخْتَفَيَا',
          '1p': 'نُخْتَفَى',
          '2mp': 'تُخْتَفُوْا',
          '2fp': 'تُخْتَفَيْنَ',
          '3mp': 'يُخْتَفُوْا',
          '3fp': 'يُخْتَفَيْنَ',
        })
      })

      test('اُدُّعِيَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('دعو', 8), 'subjunctive')).toEqualT({
          '1s': 'أُدَّعَى',
          '2ms': 'تُدَّعَى',
          '2fs': 'تُدَّعَيْ',
          '3ms': 'يُدَّعَى',
          '3fs': 'تُدَّعَى',
          '2d': 'تُدَّعَيَا',
          '3md': 'يُدَّعَيَا',
          '3fd': 'تُدَّعَيَا',
          '1p': 'نُدَّعَى',
          '2mp': 'تُدَّعُوْا',
          '2fp': 'تُدَّعَيْنَ',
          '3mp': 'يُدَّعُوْا',
          '3fp': 'يُدَّعَيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'يُتَّعَدَ'],
        ['وكأ', 'يُتَّكَأَ'],
        ['وحد', 'يُتَّحَدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زوج', 'يُزْدَوَجَ'],
        ['سوء', 'يُسْتَاءَ'],
        ['زيد', 'يُزْدَادَ'],
        ['خير', 'يُخْتَارَ'],
        ['عود', 'يُعْتَادَ'],
        ['روح', 'يُرْتَاحَ'],
        ['شوق', 'يُشْتَاقَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يُؤْتَمَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أمم', 8), 'subjunctive')).toEqualT({
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

    describe('hamzated final roots', () => {
      test.each([['خبء', 'يُخْتَبَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِبْتَدَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('بدء', 8), 'subjunctive')).toEqualT({
          '1s': 'أُبْتَدَأَ',
          '2ms': 'تُبْتَدَأَ',
          '2fs': 'تُبْتَدَئِي',
          '3ms': 'يُبْتَدَأَ',
          '3fs': 'تُبْتَدَأَ',
          '2d': 'تُبْتَدَآ',
          '3md': 'يُبْتَدَآ',
          '3fd': 'تُبْتَدَآ',
          '1p': 'نُبْتَدَأَ',
          '2mp': 'تُبْتَدَأُوْا',
          '2fp': 'تُبْتَدَأْنَ',
          '3mp': 'يُبْتَدَأُوْا',
          '3fp': 'يُبْتَدَأْنَ',
        })
      })
    })
  })
})
