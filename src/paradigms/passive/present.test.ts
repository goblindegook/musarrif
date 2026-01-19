import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { conjugatePassivePresentMood } from './present'

describe('passive present indicative pattern', () => {
  test.each<[string, VerbForm, string]>([
    ['وضع', 1, 'يُوضَعُ'],
    ['يبس', 1, 'يُوبَسُ'],
    ['وثق', 1, 'يُوثَقُ'],
    ['وجز', 1, 'يُوجَزُ'],
    ['وطن', 1, 'يُوطَنُ'],
    ['وصف', 1, 'يُوصَفُ'],
    ['وفد', 1, 'يُوفَدُ'],
  ])('%s (Form %d) %s is %s', (root, form, expected) => {
    expect(conjugatePassivePresentMood(getVerb(root, form), 'indicative')['3ms']).toBe(expected)
  })
})

describe('passive present indicative', () => {
  describe('strong roots', () => {
    test('كَتَبَ (Form I)', () => {
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

    test('وَقَفَ (Form I)', () => {
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
    test('لَمَّ (Form I)', () => {
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

    test('وَدَّ (Form I)', () => {
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
    test('يَمَنَ (Form I)', () => {
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
    test('لَامَ (Form I)', () => {
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

    test('بَاعَ (Form I)', () => {
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

    test('زَارَ (Form I)', () => {
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

    test('شَادَ (Form I)', () => {
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
  })

  describe('hamzated initial roots', () => {
    test('أَخَذَ (Form I)', () => {
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
    test('أَوَى (Form I)', () => {
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
    test('رَأَى (Form I)', () => {
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

  describe('hamzated final-weak roots', () => {
    test('أَتَى (Form I)', () => {
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
    test('دَعَا (Form I)', () => {
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
  })
})

describe('passive present subjunctive', () => {
  describe('strong roots', () => {
    test('كَتَبَ (Form I)', () => {
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

    test('وَقَفَ (Form I)', () => {
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
    test('لَمَّ (Form I)', () => {
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

    test('وَدَّ (Form I)', () => {
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
    test('يَمَنَ (Form I)', () => {
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
    test('لَامَ (Form I)', () => {
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

    test('بَاعَ (Form I)', () => {
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

    test('زَارَ (Form I)', () => {
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

    test('شَادَ (Form I)', () => {
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
    test('أَخَذَ (Form I)', () => {
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
    test('أَوَى (Form I)', () => {
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
        '2mp': 'تُؤْوَوْا',
        '2fp': 'تُؤْوَيْنَ',
        '3mp': 'يُؤْوَوْا',
        '3fp': 'يُؤْوَيْنَ',
      })
    })
  })

  describe('hamzated middle defective roots', () => {
    test('رَأَى (Form I)', () => {
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
        '2mp': 'تُرَوْا',
        '2fp': 'تُرَيْنَ',
        '3mp': 'يُرَوْا',
        '3fp': 'يُرَيْنَ',
      })
    })
  })

  describe('hamzated final-weak roots', () => {
    test('أَتَى (Form I)', () => {
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
        '2mp': 'تُؤْتَوْا',
        '2fp': 'تُؤْتَيْنَ',
        '3mp': 'يُؤْتَوْا',
        '3fp': 'يُؤْتَيْنَ',
      })
    })
  })

  describe('defective roots', () => {
    test('دَعَا (Form I)', () => {
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
        '2mp': 'تُدْعَوْا',
        '2fp': 'تُدْعَيْنَ',
        '3mp': 'يُدْعَوْا',
        '3fp': 'يُدْعَيْنَ',
      })
    })
  })
})

describe('passive present jussive', () => {
  describe('strong roots', () => {
    test('كَتَبَ (Form I)', () => {
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

    test('وَقَفَ (Form I)', () => {
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
    test('لَمَّ (Form I)', () => {
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

    test('وَدَّ (Form I)', () => {
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
    test('يَمَنَ (Form I)', () => {
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
    test('لَامَ (Form I)', () => {
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

    test('بَاعَ (Form I)', () => {
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

    test('زَارَ (Form I)', () => {
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

    test('شَادَ (Form I)', () => {
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
    test('أَخَذَ (Form I)', () => {
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
    test('أَوَى (Form I)', () => {
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
        '2mp': 'تُؤْوَوْا',
        '2fp': 'تُؤْوَيْنَ',
        '3mp': 'يُؤْوَوْا',
        '3fp': 'يُؤْوَيْنَ',
      })
    })
  })

  describe('hamzated middle defective roots', () => {
    test('رَأَى (Form I)', () => {
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
        '2mp': 'تُرَوْا',
        '2fp': 'تُرَيْنَ',
        '3mp': 'يُرَوْا',
        '3fp': 'يُرَيْنَ',
      })
    })
  })

  describe('hamzated final-weak roots', () => {
    test('أَتَى (Form I)', () => {
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
        '2mp': 'تُؤْتَوْا',
        '2fp': 'تُؤْتَيْنَ',
        '3mp': 'يُؤْتَوْا',
        '3fp': 'يُؤْتَيْنَ',
      })
    })
  })

  describe('defective roots', () => {
    test('دَعَا (Form I)', () => {
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
        '2mp': 'تُدْعَوْا',
        '2fp': 'تُدْعَيْنَ',
        '3mp': 'يُدْعَوْا',
        '3fp': 'يُدْعَيْنَ',
      })
    })
  })
})
