import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { PRONOUN_IDS } from '../pronouns'
import { getVerb, verbs } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present indicative', () => {
  test('impersonal passive only conjugates 3ms in present indicative', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...verbs.filter((verb) => verb.passiveVoice === 'impersonal')),
        fc.constantFrom(...PRONOUN_IDS.filter((pronounId) => pronounId !== '3ms')),
        (verb, pronounId) => {
          expect(conjugatePassivePresentMood(verb, 'indicative')[pronounId]).toBe('')
        },
      ),
    )
  })

  describe('Form I', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['نظر', 'يُنْظَرُ'],
        ['مثل', 'يُمْثَلُ'],
        ['دعم', 'يُدْعَمُ'],
        ['بلغ', 'يُبْلَغُ'],
        ['كلم', 'يُكْلَمُ'],
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
          '2mp': 'تُكْتَبُوْنَ',
          '2fp': 'تُكْتَبْنَ',
          '3mp': 'يُكْتَبُوْنَ',
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
          '2mp': 'تُوقَفُوْنَ',
          '2fp': 'تُوقَفْنَ',
          '3mp': 'يُوقَفُوْنَ',
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
          '2mp': 'تُلَمُّوْنَ',
          '2fp': 'تُلْمَمْنَ',
          '3mp': 'يُلَمُّوْنَ',
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
          '2mp': 'تُؤَمُّوْنَ',
          '2fp': 'تُؤْمَمْنَ',
          '3mp': 'يُؤَمُّوْنَ',
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
          '2mp': 'تُوَدُّوْنَ',
          '2fp': 'تُودَدْنَ',
          '3mp': 'يُوَدُّوْنَ',
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
          '2mp': 'تُومَنُوْنَ',
          '2fp': 'تُومَنَّ',
          '3mp': 'يُومَنُوْنَ',
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
        ['خوف', 'يُخَافُ'],
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
          '2mp': 'تُعْوَزُوْنَ',
          '2fp': 'تُعْوَزْنَ',
          '3mp': 'يُعْوَزُوْنَ',
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
          '2mp': 'تُلَامُوْنَ',
          '2fp': 'تُلَمْنَ',
          '3mp': 'يُلَامُوْنَ',
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
          '2mp': 'تُبَاعُوْنَ',
          '2fp': 'تُبَعْنَ',
          '3mp': 'يُبَاعُوْنَ',
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
          '2mp': 'تُزَارُوْنَ',
          '2fp': 'تُزَرْنَ',
          '3mp': 'يُزَارُوْنَ',
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
          '2mp': 'تُشَادُوْنَ',
          '2fp': 'تُشَدْنَ',
          '3mp': 'يُشَادُوْنَ',
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
          '2mp': 'تُجْيَدُوْنَ',
          '2fp': 'تُجْيَدْنَ',
          '3mp': 'يُجْيَدُوْنَ',
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
          '2mp': 'تُؤَالُوْنَ',
          '2fp': 'تُؤَلْنَ',
          '3mp': 'يُؤَالُوْنَ',
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
          '2mp': 'تُؤْخَذُوْنَ',
          '2fp': 'تُؤْخَذْنَ',
          '3mp': 'يُؤْخَذُوْنَ',
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
      test.each([['رءي', 'يُرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('رءي', 1), 'indicative')).toEqualT({
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
          '2mp': 'تُوطَأُوْنَ',
          '2fp': 'تُوطَأْنَ',
          '3mp': 'يُوطَأُوْنَ',
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
          '2mp': 'تُكْلَأُوْنَ',
          '2fp': 'تُكْلَأْنَ',
          '3mp': 'يُكْلَأُوْنَ',
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
        ['روي', 'يُرْوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 1), 'indicative')['3ms']).toBe(expected)
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'يُمَكَّنُ'],
        ['مثل', 'يُمَثَّلُ'],
        ['سبب', 'يُسَبَّبُ'],
        ['خطط', 'يُخَطَّطُ'],
        ['حدد', 'يُحَدَّدُ'],
        ['قرر', 'يُقَرَّرُ'],
        ['شدد', 'يُشَدَّدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذَّى'],
        ['أسي', 'يُؤَسَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يُؤَخَّرُ'],
        ['أمر', 'يُؤَمَّرُ'],
        ['أثر', 'يُؤَثَّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنَّأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['قوي', 'يُقَوَّى'],
        ['زوي', 'يُزَوَّى'],
        ['هوي', 'يُهَوَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 2), 'indicative')).toEqualT({
          '1s': 'أُحَيَّا',
          '2ms': 'تُحَيَّا',
          '2fs': 'تُحَيَّيْنَ',
          '3ms': 'يُحَيَّا',
          '3fs': 'تُحَيَّا',
          '2d': 'تُحَيَّيَانِ',
          '3md': 'يُحَيَّيَانِ',
          '3fd': 'تُحَيَّيَانِ',
          '1p': 'نُحَيَّا',
          '2mp': 'تُحَيَّوْنَ',
          '2fp': 'تُحَيَّيْنَ',
          '3mp': 'يُحَيَّوْنَ',
          '3fp': 'يُحَيَّيْنَ',
        })
      })
    })

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
          '2mp': 'تُوَطَّأُوْنَ',
          '2fp': 'تُوَطَّأْنَ',
          '3mp': 'يُوَطَّأُوْنَ',
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
          '2mp': 'تُوَسَّطُوْنَ',
          '2fp': 'تُوَسَّطْنَ',
          '3mp': 'يُوَسَّطُوْنَ',
          '3fp': 'يُوَسَّطْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوَّسُ'],
        ['كون', 'يُكَوَّنُ'],
        ['دون', 'يُدَوَّنُ'],
        ['سوف', 'يُسَوَّفُ'],
        ['كيف', 'يُكَيَّفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوَّلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أول', 2), 'indicative')).toEqualT({
          '1s': 'أُؤَوَّلُ',
          '2ms': 'تُؤَوَّلُ',
          '2fs': 'تُؤَوَّلِينَ',
          '3ms': 'يُؤَوَّلُ',
          '3fs': 'تُؤَوَّلُ',
          '2d': 'تُؤَوَّلَانِ',
          '3md': 'يُؤَوَّلَانِ',
          '3fd': 'تُؤَوَّلَانِ',
          '1p': 'نُؤَوَّلُ',
          '2mp': 'تُؤَوَّلُوْنَ',
          '2fp': 'تُؤَوَّلْنَ',
          '3mp': 'يُؤَوَّلُوْنَ',
          '3fp': 'يُؤَوَّلْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([
        ['أجج', 'يُؤَجَّجُ'],
        ['أيد', 'يُؤَيَّدُ'],
        ['أوب', 'يُؤَوَّبُ'],
        ['أسس', 'يُؤَسَّسُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
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
          '2mp': 'تُيَوَّدُوْنَ',
          '2fp': 'تُيَوَّدْنَ',
          '3mp': 'يُيَوَّدُوْنَ',
          '3fp': 'يُيَوَّدْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['تبع', 'يُتَابَعُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['كلم', 'يُكَالَمُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['بلغ', 'يُبَالَغُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['سعد', 'يُسَاعَدُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['صحب', 'يُصَاحَبُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['وجه', 'يُوَاجَهُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['وثق', 'يُوَاثَقُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['وعد', 'يُوَاعَدُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('عَامَلَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عمل', 3), 'indicative')).toEqualT({
          '1s': 'أُعَامَلُ',
          '2ms': 'تُعَامَلُ',
          '2fs': 'تُعَامَلِينَ',
          '3ms': 'يُعَامَلُ',
          '3fs': 'تُعَامَلُ',
          '2d': 'تُعَامَلَانِ',
          '3md': 'يُعَامَلَانِ',
          '3fd': 'تُعَامَلَانِ',
          '1p': 'نُعَامَلُ',
          '2mp': 'تُعَامَلُوْنَ',
          '2fp': 'تُعَامَلْنَ',
          '3mp': 'يُعَامَلُوْنَ',
          '3fp': 'يُعَامَلْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوم', 'يُقَاوَمُ'],
        ['عود', 'يُعَاوَدُ'],
        ['جوز', 'يُجَاوَزُ'],
        ['نول', 'يُنَاوَلُ'],
        ['ضيق', 'يُضَايَقُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارُّ'],
        ['ردد', 'يُرَادُّ'],
        ['مدد', 'يُمَادُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('سرر', 3), 'indicative')).toEqualT({
          '1s': 'أُسَارُّ',
          '2ms': 'تُسَارُّ',
          '2fs': 'تُسَارِّينَ',
          '3ms': 'يُسَارُّ',
          '3fs': 'تُسَارُّ',
          '2d': 'تُسَارَّانِ',
          '3md': 'يُسَارَّانِ',
          '3fd': 'تُسَارَّانِ',
          '1p': 'نُسَارُّ',
          '2mp': 'تُسَارُّوْنَ',
          '2fp': 'تُسَارَرْنَ',
          '3mp': 'يُسَارُّوْنَ',
          '3fp': 'يُسَارَرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ردد', 3), 'indicative')).toEqualT({
          '1s': 'أُرَادُّ',
          '2ms': 'تُرَادُّ',
          '2fs': 'تُرَادِّينَ',
          '3ms': 'يُرَادُّ',
          '3fs': 'تُرَادُّ',
          '2d': 'تُرَادَّانِ',
          '3md': 'يُرَادَّانِ',
          '3fd': 'تُرَادَّانِ',
          '1p': 'نُرَادُّ',
          '2mp': 'تُرَادُّوْنَ',
          '2fp': 'تُرَادَدْنَ',
          '3mp': 'يُرَادُّوْنَ',
          '3fp': 'يُرَادَدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('مدد', 3), 'indicative')).toEqualT({
          '1s': 'أُمَادُّ',
          '2ms': 'تُمَادُّ',
          '2fs': 'تُمَادِّينَ',
          '3ms': 'يُمَادُّ',
          '3fs': 'تُمَادُّ',
          '2d': 'تُمَادَّانِ',
          '3md': 'يُمَادَّانِ',
          '3fd': 'تُمَادَّانِ',
          '1p': 'نُمَادُّ',
          '2mp': 'تُمَادُّوْنَ',
          '2fp': 'تُمَادَدْنَ',
          '3mp': 'يُمَادُّوْنَ',
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
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخَذُ'],
        ['أجر', 'يُؤَاجَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['لأم', 'يُلَاءَمُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('وَاءَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وأم', 3), 'indicative')).toEqualT({
          '1s': 'أُوَاءَمُ',
          '2ms': 'تُوَاءَمُ',
          '2fs': 'تُوَاءَمِينَ',
          '3ms': 'يُوَاءَمُ',
          '3fs': 'تُوَاءَمُ',
          '2d': 'تُوَاءَمَانِ',
          '3md': 'يُوَاءَمَانِ',
          '3fd': 'تُوَاءَمَانِ',
          '1p': 'نُوَاءَمُ',
          '2mp': 'تُوَاءَمُوْنَ',
          '2fp': 'تُوَاءَمْنَ',
          '3mp': 'يُوَاءَمُوْنَ',
          '3fp': 'يُوَاءَمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجَأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'يُوَازَى'],
        ['وفي', 'يُوَافَى'],
        ['وسي', 'يُوَاسَى'],
        ['نوي', 'يُنَاوَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['وقف', 'يُوْقَفُ'],
        ['وقع', 'يُوْقَعُ'],
        ['ولد', 'يُوْلَدُ'],
        ['وصل', 'يُوْصَلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وضح', 4), 'indicative')).toEqualT({
          '1s': 'أُوْضَحُ',
          '2ms': 'تُوْضَحُ',
          '2fs': 'تُوْضَحِينَ',
          '3ms': 'يُوْضَحُ',
          '3fs': 'تُوْضَحُ',
          '2d': 'تُوْضَحَانِ',
          '3md': 'يُوْضَحَانِ',
          '3fd': 'تُوْضَحَانِ',
          '1p': 'نُوْضَحُ',
          '2mp': 'تُوْضَحُوْنَ',
          '2fp': 'تُوْضَحْنَ',
          '3mp': 'يُوْضَحُوْنَ',
          '3fp': 'يُوْضَحْنَ',
        })
      })

      test('أَكْثَرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('كثر', 4), 'indicative')).toEqualT({
          '1s': 'أُكْثَرُ',
          '2ms': 'تُكْثَرُ',
          '2fs': 'تُكْثَرِينَ',
          '3ms': 'يُكْثَرُ',
          '3fs': 'تُكْثَرُ',
          '2d': 'تُكْثَرَانِ',
          '3md': 'يُكْثَرَانِ',
          '3fd': 'تُكْثَرَانِ',
          '1p': 'نُكْثَرُ',
          '2mp': 'تُكْثَرُوْنَ',
          '2fp': 'تُكْثَرْنَ',
          '3mp': 'يُكْثَرُوْنَ',
          '3fp': 'يُكْثَرْنَ',
        })
      })

      test('أَعْلَمَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('علم', 4), 'indicative')).toEqualT({
          '1s': 'أُعْلَمُ',
          '2ms': 'تُعْلَمُ',
          '2fs': 'تُعْلَمِينَ',
          '3ms': 'يُعْلَمُ',
          '3fs': 'تُعْلَمُ',
          '2d': 'تُعْلَمَانِ',
          '3md': 'يُعْلَمَانِ',
          '3fd': 'تُعْلَمَانِ',
          '1p': 'نُعْلَمُ',
          '2mp': 'تُعْلَمُوْنَ',
          '2fp': 'تُعْلَمْنَ',
          '3mp': 'يُعْلَمُوْنَ',
          '3fp': 'يُعْلَمْنَ',
        })
      })

      test('أَلْحَقَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('لحق', 4), 'indicative')).toEqualT({
          '1s': 'أُلْحَقُ',
          '2ms': 'تُلْحَقُ',
          '2fs': 'تُلْحَقِينَ',
          '3ms': 'يُلْحَقُ',
          '3fs': 'تُلْحَقُ',
          '2d': 'تُلْحَقَانِ',
          '3md': 'يُلْحَقَانِ',
          '3fd': 'تُلْحَقَانِ',
          '1p': 'نُلْحَقُ',
          '2mp': 'تُلْحَقُوْنَ',
          '2fp': 'تُلْحَقْنَ',
          '3mp': 'يُلْحَقُوْنَ',
          '3fp': 'يُلْحَقْنَ',
        })
      })

      test('أَصْبَحَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('صبح', 4), 'indicative')).toEqualT({
          '1s': 'أُصْبَحُ',
          '2ms': 'تُصْبَحُ',
          '2fs': 'تُصْبَحِينَ',
          '3ms': 'يُصْبَحُ',
          '3fs': 'تُصْبَحُ',
          '2d': 'تُصْبَحَانِ',
          '3md': 'يُصْبَحَانِ',
          '3fd': 'تُصْبَحَانِ',
          '1p': 'نُصْبَحُ',
          '2mp': 'تُصْبَحُوْنَ',
          '2fp': 'تُصْبَحْنَ',
          '3mp': 'يُصْبَحُوْنَ',
          '3fp': 'يُصْبَحْنَ',
        })
      })

      test('أَعْرَبَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرب', 4), 'indicative')).toEqualT({
          '1s': 'أُعْرَبُ',
          '2ms': 'تُعْرَبُ',
          '2fs': 'تُعْرَبِينَ',
          '3ms': 'يُعْرَبُ',
          '3fs': 'تُعْرَبُ',
          '2d': 'تُعْرَبَانِ',
          '3md': 'يُعْرَبَانِ',
          '3fd': 'تُعْرَبَانِ',
          '1p': 'نُعْرَبُ',
          '2mp': 'تُعْرَبُوْنَ',
          '2fp': 'تُعْرَبْنَ',
          '3mp': 'يُعْرَبُوْنَ',
          '3fp': 'يُعْرَبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتَمُّ'],
        ['سفف', 'يُسَفُّ'],
        ['حبب', 'يُحَبُّ'],
        ['عدد', 'يُعَدُّ'],
        ['همم', 'يُهَمُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَتَمَّ conjugation', () => {
        // Source: Wiktionary (Arabic), أَتَمَّ, Form IV passive non-past indicative.
        expect(conjugatePassivePresentMood(getVerb('تمم', 4), 'indicative')).toEqualT({
          '1s': 'أُتَمُّ',
          '2ms': 'تُتَمُّ',
          '2fs': 'تُتَمِّينَ',
          '3ms': 'يُتَمُّ',
          '3fs': 'تُتَمُّ',
          '2d': 'تُتَمَّانِ',
          '3md': 'يُتَمَّانِ',
          '3fd': 'تُتَمَّانِ',
          '1p': 'نُتَمُّ',
          '2mp': 'تُتَمُّوْنَ',
          '2fp': 'تُتْمَمْنَ',
          '3mp': 'يُتَمُّوْنَ',
          '3fp': 'يُتْمَمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشَارُ'],
        ['رود', 'يُرَادُ'],
        ['تيح', 'يُتَاحُ'],
        ['فيد', 'يُفَادُ'],
        ['عود', 'يُعَادُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
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
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('حيي', 4), 'indicative')).toEqualT({
          '1s': 'أُحْيَا',
          '2ms': 'تُحْيَا',
          '2fs': 'تُحْيَيْنَ',
          '3ms': 'يُحْيَا',
          '3fs': 'تُحْيَا',
          '2d': 'تُحْيَيَانِ',
          '3md': 'يُحْيَيَانِ',
          '3fd': 'تُحْيَيَانِ',
          '1p': 'نُحْيَا',
          '2mp': 'تُحْيَوْنَ',
          '2fp': 'تُحْيَيْنَ',
          '3mp': 'يُحْيَوْنَ',
          '3fp': 'يُحْيَيْنَ',
        })
      })

      test('أَوْصَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وصي', 4), 'indicative')).toEqualT({
          '1s': 'أُوْصَى',
          '2ms': 'تُوْصَى',
          '2fs': 'تُوْصَيْنَ',
          '3ms': 'يُوْصَى',
          '3fs': 'تُوْصَى',
          '2d': 'تُوْصَيَانِ',
          '3md': 'يُوْصَيَانِ',
          '3fd': 'تُوْصَيَانِ',
          '1p': 'نُوْصَى',
          '2mp': 'تُوْصَوْنَ',
          '2fp': 'تُوْصَيْنَ',
          '3mp': 'يُوْصَوْنَ',
          '3fp': 'يُوْصَيْنَ',
        })
      })

      test('أَوْحَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وحي', 4), 'indicative')).toEqualT({
          '1s': 'أُوْحَى',
          '2ms': 'تُوْحَى',
          '2fs': 'تُوْحَيْنَ',
          '3ms': 'يُوْحَى',
          '3fs': 'تُوْحَى',
          '2d': 'تُوْحَيَانِ',
          '3md': 'يُوْحَيَانِ',
          '3fd': 'تُوْحَيَانِ',
          '1p': 'نُوْحَى',
          '2mp': 'تُوْحَوْنَ',
          '2fp': 'تُوْحَيْنَ',
          '3mp': 'يُوْحَوْنَ',
          '3fp': 'يُوْحَيْنَ',
        })
      })

      test('أَوْفَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وفي', 4), 'indicative')).toEqualT({
          '1s': 'أُوْفَى',
          '2ms': 'تُوْفَى',
          '2fs': 'تُوْفَيْنَ',
          '3ms': 'يُوْفَى',
          '3fs': 'تُوْفَى',
          '2d': 'تُوْفَيَانِ',
          '3md': 'يُوْفَيَانِ',
          '3fd': 'تُوْفَيَانِ',
          '1p': 'نُوْفَى',
          '2mp': 'تُوْفَوْنَ',
          '2fp': 'تُوْفَيْنَ',
          '3mp': 'يُوْفَوْنَ',
          '3fp': 'يُوْفَيْنَ',
        })
      })

      test('أَوْرَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وري', 4), 'indicative')).toEqualT({
          '1s': 'أُوْرَى',
          '2ms': 'تُوْرَى',
          '2fs': 'تُوْرَيْنَ',
          '3ms': 'يُوْرَى',
          '3fs': 'تُوْرَى',
          '2d': 'تُوْرَيَانِ',
          '3md': 'يُوْرَيَانِ',
          '3fd': 'تُوْرَيَانِ',
          '1p': 'نُوْرَى',
          '2mp': 'تُوْرَوْنَ',
          '2fp': 'تُوْرَيْنَ',
          '3mp': 'يُوْرَوْنَ',
          '3fp': 'يُوْرَيْنَ',
        })
      })

      test('أَوْدَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ودي', 4), 'indicative')).toEqualT({
          '1s': 'أُوْدَى',
          '2ms': 'تُوْدَى',
          '2fs': 'تُوْدَيْنَ',
          '3ms': 'يُوْدَى',
          '3fs': 'تُوْدَى',
          '2d': 'تُوْدَيَانِ',
          '3md': 'يُوْدَيَانِ',
          '3fd': 'تُوْدَيَانِ',
          '1p': 'نُوْدَى',
          '2mp': 'تُوْدَوْنَ',
          '2fp': 'تُوْدَيْنَ',
          '3mp': 'يُوْدَوْنَ',
          '3fp': 'يُوْدَيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نشأ', 'يُنْشَأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوْمَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ومأ', 4), 'indicative')).toEqualT({
          '1s': 'أُوْمَأُ',
          '2ms': 'تُوْمَأُ',
          '2fs': 'تُوْمَئِينَ',
          '3ms': 'يُوْمَأُ',
          '3fs': 'تُوْمَأُ',
          '2d': 'تُوْمَآنِ',
          '3md': 'يُوْمَآنِ',
          '3fd': 'تُوْمَآنِ',
          '1p': 'نُوْمَأُ',
          '2mp': 'تُوْمَأُوْنَ',
          '2fp': 'تُوْمَأْنَ',
          '3mp': 'يُوْمَأُوْنَ',
          '3fp': 'يُوْمَأْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذَنُ'],
        ['أمن', 'يُؤْمَنُ'],
        ['ألم', 'يُؤْلَمُ'],
        ['أجر', 'يُؤْجَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضَاءُ']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَضَاءَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('ضوء', 4), 'indicative')).toEqualT({
          '1s': 'أُضَاءُ',
          '2ms': 'تُضَاءُ',
          '2fs': 'تُضَائِينَ',
          '3ms': 'يُضَاءُ',
          '3fs': 'تُضَاءُ',
          '2d': 'تُضَاءَانِ',
          '3md': 'يُضَاءَانِ',
          '3fd': 'تُضَاءَانِ',
          '1p': 'نُضَاءُ',
          '2mp': 'تُضَائُوْنَ',
          '2fp': 'تُضَأْنَ',
          '3mp': 'يُضَائُوْنَ',
          '3fp': 'يُضَأْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test('آتَى conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أتي', 4), 'indicative')).toEqualT({
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
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test('تَعَرَّفَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('عرف', 5), 'indicative')).toEqualT({
          '1s': 'أُتَعَرَّفُ',
          '2ms': 'تُتَعَرَّفُ',
          '2fs': 'تُتَعَرَّفِينَ',
          '3ms': 'يُتَعَرَّفُ',
          '3fs': 'تُتَعَرَّفُ',
          '2d': 'تُتَعَرَّفَانِ',
          '3md': 'يُتَعَرَّفَانِ',
          '3fd': 'تُتَعَرَّفَانِ',
          '1p': 'نُتَعَرَّفُ',
          '2mp': 'تُتَعَرَّفُوْنَ',
          '2fp': 'تُتَعَرَّفْنَ',
          '3mp': 'يُتَعَرَّفُوْنَ',
          '3fp': 'يُتَعَرَّفْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('تَأَثَّرَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('أثر', 5), 'indicative')).toEqualT({
          '1s': 'أُتَأَثَّرُ',
          '2ms': 'تُتَأَثَّرُ',
          '2fs': 'تُتَأَثَّرِينَ',
          '3ms': 'يُتَأَثَّرُ',
          '3fs': 'تُتَأَثَّرُ',
          '2d': 'تُتَأَثَّرَانِ',
          '3md': 'يُتَأَثَّرَانِ',
          '3fd': 'تُتَأَثَّرَانِ',
          '1p': 'نُتَأَثَّرُ',
          '2mp': 'تُتَأَثَّرُوْنَ',
          '2fp': 'تُتَأَثَّرْنَ',
          '3mp': 'يُتَأَثَّرُوْنَ',
          '3fp': 'يُتَأَثَّرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يُتَوَصَّلُ'],
        ['وفر', 'يُتَوَفَّرُ'],
        ['وقف', 'يُتَوَقَّفُ'],
        ['وقع', 'يُتَوَقَّعُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['هدد', 'يُتَهَدَّدُ'],
        ['عزز', 'يُتَعَزَّزُ'],
        ['قرر', 'يُتَقَرَّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'يُتَبَقَّى'],
        ['بني', 'يُتَبَنَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يُتَوَفَّى'],
        ['وقي', 'يُتَوَقَّى'],
        ['وخي', 'يُتَوَخَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('strong roots', () => {
      test.each<[string, string]>([
        ['شرك', 'يُتَشَارَكُ'],
        ['علج', 'يُتَعَالَجُ'],
        ['عمل', 'يُتَعَامَلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each<[string, string]>([
        ['ألف', 'يُتَآلَفُ'],
        ['أمر', 'يُتَآمَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['نول', 'يُتَنَاوَلُ'],
        ['فوض', 'يُتَفَاوَضُ'],
        ['جوز', 'يُتَجَاوَزُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['عفو', 'يُتَعَافَى'],
        ['هوي', 'يُتَهَاوَى'],
        ['وصي', 'يُتَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePassivePresentMood(getVerb('وطء', 6), 'indicative')).toEqualT({
          '1s': 'أُتَوَاطَأُ',
          '2ms': 'تُتَوَاطَأُ',
          '2fs': 'تُتَوَاطَئِينَ',
          '3ms': 'يُتَوَاطَأُ',
          '3fs': 'تُتَوَاطَأُ',
          '2d': 'تُتَوَاطَآنِ',
          '3md': 'يُتَوَاطَآنِ',
          '3fd': 'تُتَوَاطَآنِ',
          '1p': 'نُتَوَاطَأُ',
          '2mp': 'تُتَوَاطَأُوْنَ',
          '2fp': 'تُتَوَاطَأْنَ',
          '3mp': 'يُتَوَاطَأُوْنَ',
          '3fp': 'يُتَوَاطَأْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حبب', 'يُتَحَابَبُ'],
        ['مسس', 'يُتَمَاسَسُ'],
        ['ضدد', 'يُتَضَادَدُ'],
        ['ردد', 'يُتَرَادَدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وجد', 'يُتَوَاجَدُ'],
        ['وفق', 'يُتَوَافَقُ'],
        ['وفر', 'يُتَوَافَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'يُنْخَفَضُ'],
        ['عكس', 'يُنْعَكَسُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['ثني', 'يُنْثَنَى']])('%s pattern', (root, expected) => {
        expect(conjugatePassivePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })
})
