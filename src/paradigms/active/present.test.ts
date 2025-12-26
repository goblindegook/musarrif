/** biome-ignore-all lint/style/noNonNullAssertion: tests will surface broken dataset */
import { describe, expect, test } from 'vitest'
import type { PronounId } from '../pronouns'
import { getVerb, verbs } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present indicative', () => {
  test.each<[string, number, PronounId, string]>([
    ['أتي', 1, '3ms', 'يَأْتِي'],
    ['أمن', 4, '3ms', 'يُؤْمِنُ'],
    ['أنشأ', 4, '3ms', 'يُنْشِئُ'],
    ['أوي', 1, '3ms', 'يَأْوِي'],
    ['أوي', 4, '3ms', 'يُؤْوِي'],
    ['بدأ', 1, '3ms', 'يَبْدَأُ'],
    ['بدل', 1, '3ms', 'يَبْدِلُ'],
    ['ترجم', 1, '3ms', 'يُتَرْجِمُ'],
    ['جلس', 1, '3ms', 'يَجْلِسُ'],
    ['جمع', 1, '3ms', 'يَجْمَعُ'],
    ['حبب', 1, '3ms', 'يُحِبُّ'],
    ['حبب', 2, '3ms', 'يُحَبِّبُ'],
    ['حبط', 1, '3ms', 'يَحْبَطُ'],
    ['حسب', 1, '3ms', 'يَحْسُبُ'],
    ['حضر', 1, '3ms', 'يَحْضُرُ'],
    ['حلق', 1, '3ms', 'يَحْلِقُ'],
    ['حمر', 9, '3ms', 'يَحْمَرُّ'],
    ['حمر', 9, '2pf', 'تَحْمَرَرْنَ'],
    ['حمر', 9, '3pf', 'يَحْمَرَرْنَ'],
    ['خسر', 1, '3ms', 'يَخْسَرُ'],
    ['دحرج', 1, '3ms', 'يُدَحْرِجُ'],
    ['درس', 1, '2pm', 'تَدْرُسُونَ'],
    ['درس', 1, '3ms', 'يَدْرُسُ'],
    ['درس', 1, '3pm', 'يَدْرُسُونَ'],
    ['رأى', 1, '3ms', 'يَرَى'],
    ['صفر', 9, '3ms', 'يَصْفَرُّ'],
    ['ضيف', 10, '3ms', 'يَسْتَضِيفُ'],
    ['ضيف', 4, '3ms', 'يُضِيفُ'],
    ['عطى', 4, '3ms', 'يُعْطِي'],
    ['عون', 10, '3ms', 'يَسْتَعِينُ'],
    ['عون', 3, '3ms', 'يُعَاوِنُ'],
    ['عون', 4, '3ms', 'يُعِينُ'],
    ['عون', 6, '3ms', 'يَتَعَاوَنُ'],
    ['غدو', 1, '3ms', 'يَغْدُو'],
    ['فسر', 2, '3ms', 'يُفَسِّرُ'],
    ['فلت', 4, '3ms', 'يُفْلِتُ'],
    ['قتل', 1, '3ms', 'يَقْتُلُ'],
    ['قفز', 1, '3ms', 'يَقْفِزُ'],
    ['قود', 10, '3ms', 'يَسْتَقِيدُ'],
    ['قود', 8, '3ms', 'يَقْتَادُ'],
    ['كسر', 1, '3ms', 'يَكْسِرُ'],
    ['نبأ', 4, '3ms', 'يُنْبِئُ'],
    ['هجر', 1, '3ms', 'يَهْجُرُ'],
    ['وصل', 8, '3ms', 'يَتَّصِلُ'],
    ['وعد', 1, '3ms', 'يَعِدُ'],
    ['وعد', 1, '3ms', 'يَعِدُ'],
    ['وقي', 1, '3ms', 'يَقِي'],
    ['ولى', 1, '3ms', 'يَلِي'],
    ['وفي', 5, '3ms', 'يَتَوَفَّى'],
    ['وفي', 5, '3fs', 'تَتَوَفَّى'],
    ['وفي', 5, '2sm', 'تَتَوَفَّى'],
    ['وفي', 5, '2sf', 'تَتَوَفِّيْنَ'],
    ['وفي', 5, '3pm', 'يَتَوَفَّونَ'],
    ['وفي', 5, '3pf', 'يَتَوَفَّىْنَ'],
    ['دخل', 1, '3ms', 'يَدْخُلُ'],
    ['دخل', 1, '2sm', 'تَدْخُلُ'],
    ['دخل', 1, '1s', 'أَدْخُلُ'],
    ['ولد', 1, '3ms', 'يَلِدُ'],
    ['ولد', 1, '2sm', 'تَلِدُ'],
    ['ولد', 1, '1s', 'أَلِدُ'],
  ])('%s (%d) %s is %s', (root, form, pronoun, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    expect(conjugatePresentMood(verb, 'indicative')[pronoun]).toBe(expected)
  })

  describe('regular verbs', () => {
    describe('ك-ت-ب', () => {
      test('كَتَبَ (Form I)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 1), 'indicative')).toEqual({
          '1s': 'أَكْتُبُ',
          '2sm': 'تَكْتُبُ',
          '2sf': 'تَكْتُبِيْنَ',
          '3ms': 'يَكْتُبُ',
          '3fs': 'تَكْتُبُ',
          '2d': 'تَكْتُبَانِ',
          '3dm': 'يَكْتُبَانِ',
          '3df': 'تَكْتُبَانِ',
          '1p': 'نَكْتُبُ',
          '2pm': 'تَكْتُبُونَ',
          '2pf': 'تَكْتُبْنَ',
          '3pf': 'يَكْتُبْنَ',
          '3pm': 'يَكْتُبُونَ',
        })
      })

      test('كَتَّبَ (Form II)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 2), 'indicative')).toEqual({
          '1s': 'أُكَتِّبُ',
          '2sm': 'تُكَتِّبُ',
          '2sf': 'تُكَتِّبِيْنَ',
          '3ms': 'يُكَتِّبُ',
          '3fs': 'تُكَتِّبُ',
          '2d': 'تُكَتِّبَانِ',
          '3dm': 'يُكَتِّبَانِ',
          '3df': 'تُكَتِّبَانِ',
          '1p': 'نُكَتِّبُ',
          '2pm': 'تُكَتِّبُونَ',
          '2pf': 'تُكَتِّبْنَ',
          '3pf': 'يُكَتِّبْنَ',
          '3pm': 'يُكَتِّبُونَ',
        })
      })

      test('كَاتَبَ (Form III)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 3), 'indicative')).toEqual({
          '1s': 'أُكَاتِبُ',
          '2sm': 'تُكَاتِبُ',
          '2sf': 'تُكَاتِبِيْنَ',
          '3ms': 'يُكَاتِبُ',
          '3fs': 'تُكَاتِبُ',
          '2d': 'تُكَاتِبَانِ',
          '3dm': 'يُكَاتِبَانِ',
          '3df': 'تُكَاتِبَانِ',
          '1p': 'نُكَاتِبُ',
          '2pm': 'تُكَاتِبُونَ',
          '2pf': 'تُكَاتِبْنَ',
          '3pf': 'يُكَاتِبْنَ',
          '3pm': 'يُكَاتِبُونَ',
        })
      })

      test('أَكْتَبَ (Form IV)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 4), 'indicative')).toEqual({
          '1s': 'أُكْتِبُ',
          '2sm': 'تُكْتِبُ',
          '2sf': 'تُكْتِبِيْنَ',
          '3ms': 'يُكْتِبُ',
          '3fs': 'تُكْتِبُ',
          '2d': 'تُكْتِبَانِ',
          '3dm': 'يُكْتِبَانِ',
          '3df': 'تُكْتِبَانِ',
          '1p': 'نُكْتِبُ',
          '2pm': 'تُكْتِبُونَ',
          '2pf': 'تُكْتِبْنَ',
          '3pf': 'يُكْتِبْنَ',
          '3pm': 'يُكْتِبُونَ',
        })
      })

      test('تَكَتَّبَ (Form V)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 5), 'indicative')).toEqual({
          '1s': 'أَتَكَتَّبُ',
          '2sm': 'تَتَكَتَّبُ',
          '2sf': 'تَتَكَتَّبِيْنَ',
          '3ms': 'يَتَكَتَّبُ',
          '3fs': 'تَتَكَتَّبُ',
          '2d': 'تَتَكَتَّبَانِ',
          '3dm': 'يَتَكَتَّبَانِ',
          '3df': 'تَتَكَتَّبَانِ',
          '1p': 'نَتَكَتَّبُ',
          '2pm': 'تَتَكَتَّبُونَ',
          '2pf': 'تَتَكَتَّبْنَ',
          '3pf': 'يَتَكَتَّبْنَ',
          '3pm': 'يَتَكَتَّبُونَ',
        })
      })

      test('تَكَاتَبَ (Form VI)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 6), 'indicative')).toEqual({
          '1s': 'أَتَكَاتَبُ',
          '2sm': 'تَتَكَاتَبُ',
          '2sf': 'تَتَكَاتَبِيْنَ',
          '3ms': 'يَتَكَاتَبُ',
          '3fs': 'تَتَكَاتَبُ',
          '2d': 'تَتَكَاتَبَانِ',
          '3dm': 'يَتَكَاتَبَانِ',
          '3df': 'تَتَكَاتَبَانِ',
          '1p': 'نَتَكَاتَبُ',
          '2pm': 'تَتَكَاتَبُونَ',
          '2pf': 'تَتَكَاتَبْنَ',
          '3pf': 'يَتَكَاتَبْنَ',
          '3pm': 'يَتَكَاتَبُونَ',
        })
      })

      test('اِنْكَتَبَ (Form VII)', () => {
        expect(conjugatePresentMood(getVerb('كتب', 7), 'indicative')).toEqual({
          '1s': 'أَنْكَتِبُ',
          '2sm': 'تَنْكَتِبُ',
          '2sf': 'تَنْكَتِبِيْنَ',
          '3ms': 'يَنْكَتِبُ',
          '3fs': 'تَنْكَتِبُ',
          '2d': 'تَنْكَتِبَانِ',
          '3dm': 'يَنْكَتِبَانِ',
          '3df': 'تَنْكَتِبَانِ',
          '1p': 'نَنْكَتِبُ',
          '2pm': 'تَنْكَتِبُونَ',
          '2pf': 'تَنْكَتِبْنَ',
          '3pf': 'يَنْكَتِبْنَ',
          '3pm': 'يَنْكَتِبُونَ',
        })
      })
    })
  })

  describe('assimilated verbs', () => {
    describe('و-ع-د', () => {
      test('وَعَدَ (Form I)', () => {
        expect(conjugatePresentMood(getVerb('وعد', 1), 'indicative')).toEqual({
          '1s': 'أَعِدُ',
          '2sm': 'تَعِدُ',
          '2sf': 'تَعِدِيْنَ',
          '3ms': 'يَعِدُ',
          '3fs': 'تَعِدُ',
          '2d': 'تَعِدَانِ',
          '3dm': 'يَعِدَانِ',
          '3df': 'تَعِدَانِ',
          '1p': 'نَعِدُ',
          '2pm': 'تَعِدُونَ',
          '2pf': 'تَعِدْنَ',
          '3pf': 'يَعِدْنَ',
          '3pm': 'يَعِدُونَ',
        })
      })

      test('تَوَعَّدَ (Form V)', () => {
        expect(conjugatePresentMood(getVerb('وعد', 5), 'indicative')).toEqual({
          '1s': 'أَتَوَعَّدُ',
          '2sm': 'تَتَوَعَّدُ',
          '2sf': 'تَتَوَعَّدِيْنَ',
          '3ms': 'يَتَوَعَّدُ',
          '3fs': 'تَتَوَعَّدُ',
          '2d': 'تَتَوَعَّدَانِ',
          '3dm': 'يَتَوَعَّدَانِ',
          '3df': 'تَتَوَعَّدَانِ',
          '1p': 'نَتَوَعَّدُ',
          '2pm': 'تَتَوَعَّدُونَ',
          '2pf': 'تَتَوَعَّدْنَ',
          '3pf': 'يَتَوَعَّدْنَ',
          '3pm': 'يَتَوَعَّدُونَ',
        })
      })
    })
  })

  describe('hollow verbs', () => {
    describe('ق-و-ل', () => {
      test('قَالَ (Form I)', () => {
        expect(conjugatePresentMood(getVerb('قول', 1), 'indicative')).toEqual({
          '1s': 'أَقُولُ',
          '2sm': 'تَقُولُ',
          '2sf': 'تَقُولِيْنَ',
          '3ms': 'يَقُولُ',
          '3fs': 'تَقُولُ',
          '2d': 'تَقُولَانِ',
          '3dm': 'يَقُولَانِ',
          '3df': 'تَقُولَانِ',
          '1p': 'نَقُولُ',
          '2pm': 'تَقُولُونَ',
          '2pf': 'تَقُلْنَ',
          '3pf': 'يَقُلْنَ',
          '3pm': 'يَقُولُونَ',
        })
      })

      test.skip('قَوَّلَ (Form II)', () => {
        expect(conjugatePresentMood(getVerb('قول', 2), 'indicative')).toEqual({
          '1s': 'أُقَوِّلُ',
          '2sm': 'تُقَوِّلُ',
          '2sf': 'تُقَوِّلِينَ',
          '3ms': 'يُقَوِّلُ',
          '3fs': 'تُقَوِّلُ',
          '2d': 'تُقَوِّلَانِ',
          '3dm': 'يُقَوِّلَانِ',
          '3df': 'تُقَوِّلَانِ',
          '1p': 'نُقَوِّلُ',
          '2pm': 'تُقَوِّلُونَ',
          '2pf': 'تُقَوِّلْنَ',
          '3pf': 'يُقَوِّلْنَ',
          '3pm': 'يُقَوِّلُونَ',
        })
      })

      test.skip('قَاوَلَ (Form III)', () => {
        expect(conjugatePresentMood(getVerb('قول', 3), 'indicative')).toEqual({
          '1s': 'أُقَاوِلُ',
          '2sm': 'تُقَاوِلُ',
          '2sf': 'تُقَاوِلِينَ',
          '3ms': 'يُقَاوِلُ',
          '3fs': 'تُقَاوِلُ',
          '2d': 'تُقَاوِلَانِ',
          '3dm': 'يُقَاوِلَانِ',
          '3df': 'تُقَاوِلَانِ',
          '1p': 'نُقَاوِلُ',
          '2pm': 'تُقَاوِلُونَ',
          '2pf': 'تُقَاوِلْنَ',
          '3pf': 'يُقَاوِلْنَ',
          '3pm': 'يُقَاوِلُونَ',
        })
      })

      test.skip('أَقَالَ (Form IV)', () => {
        expect(conjugatePresentMood(getVerb('قول', 4), 'indicative')).toEqual({
          '1s': 'أُقْوِلُ',
          '2sm': 'تُقْوِلُ',
          '2sf': 'تُقْوِلِينَ',
          '3ms': 'يُقْوِلُ',
          '3fs': 'تُقْوِلُ',
          '2d': 'تُقْوِلَانِ',
          '3dm': 'يُقْوِلَانِ',
          '3df': 'تُقْوِلَانِ',
          '1p': 'نُقْوِلُ',
          '2pm': 'تُقْوِلُونَ',
          '2pf': 'تُقْوِلْنَ',
          '3pf': 'يُقْوِلْنَ',
          '3pm': 'يُقْوِلُونَ',
        })
      })
    })
  })

  describe.skip('defective verbs', () => {
    describe('ر-م-ي', () => {
      test('رَمَى (Form I)', () => {
        expect(conjugatePresentMood(getVerb('رمي', 1), 'indicative')).toEqual({
          '1s': 'أَرْمِي',
          '2sm': 'تَرْمِي',
          '2sf': 'تَرْمِينَ',
          '3ms': 'يَرْمِي',
          '3fs': 'تَرْمِي',
          '2d': 'تَرْمِيَانِ',
          '3dm': 'يَرْمِيَانِ',
          '3df': 'تَرْمِيَانِ',
          '1p': 'نَرْمِي',
          '2pm': 'تَرْمُونَ',
          '2pf': 'تَرْمِينَ',
          '3pf': 'يَرْمِينَ',
          '3pm': 'يَرْمُونَ',
        })
      })

      test('رَمَّى (Form II)', () => {
        expect(conjugatePresentMood(getVerb('رمي', 2), 'indicative')).toEqual({
          '1s': 'أُرَمِّي',
          '2sm': 'تُرَمِّي',
          '2sf': 'تُرَمِّينَ',
          '3ms': 'يُرَمِّي',
          '3fs': 'تُرَمِّي',
          '2d': 'تُرَمِّيَانِ',
          '3dm': 'يُرَمِّيَانِ',
          '3df': 'تُرَمِّيَانِ',
          '1p': 'نُرَمِّي',
          '2pm': 'تُرَمُّونَ',
          '2pf': 'تُرَمِّينَ',
          '3pf': 'يُرَمِّينَ',
          '3pm': 'يُرَمُّونَ',
        })
      })

      test('اِنْرَمَى (Form VII)', () => {
        expect(conjugatePresentMood(getVerb('رمي', 7), 'indicative')).toEqual({
          '1s': 'أَنْرَمِي',
          '2sm': 'تَنْرَمِي',
          '2sf': 'تَنْرَمِيْنَ',
          '3ms': 'يَنْرَمِي',
          '3fs': 'تَنْرَمِي',
          '2d': 'تَنْرَمِيَانِ',
          '3dm': 'يَنْرَمِيَانِ',
          '3df': 'تَنْرَمِيَانِ',
          '1p': 'نَنْرَمِي',
          '2pm': 'تَنْرَمِيونَ',
          '2pf': 'تَنْرَمِيْنَ',
          '3pf': 'يَنْرَمِيْنَ',
          '3pm': 'يَنْرَمِيونَ',
        })
      })
    })
  })

  describe('hamzated initial verbs', () => {
    describe.todo('أ-خ-ذ')
  })

  describe('hamzated middle verbs', () => {
    describe.todo('س-أ-ل')
  })

  describe('hamzated final verbs', () => {
    describe.todo('ق-ر-أ')
  })

  describe('doubly weak verbs', () => {
    describe.todo('و-ق-ي')
    describe.todo('و-ف-ي')
    describe.todo('ر-و-ي')
  })

  describe('hamzated initial defective verbs', () => {
    describe.todo('أ-ت-ي')
  })

  describe('hamzated middle assimilated verbs', () => {
    describe.todo('و-ئ-د')
  })

  describe('hamzated middle defective verbs', () => {
    describe.todo('ب-د-أ')
  })

  describe('hamzated final assimilated verbs', () => {
    describe.todo('و-أ-ى')
  })

  describe('hamzated final hollow verbs', () => {
    describe('ج-ي-ء', () => {
      test('جَاءَ (Form I)', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'indicative')).toEqual({
          '1s': 'أَجِيءُ',
          '2sm': 'تَجِيءُ',
          '2sf': 'تَجِيئِينَ',
          '3ms': 'يَجِيءُ',
          '3fs': 'تَجِيءُ',
          '2d': 'تَجِيئَانِ',
          '3dm': 'يَجِيئَانِ',
          '3df': 'تَجِيئَانِ',
          '1p': 'نَجِيءُ',
          '2pm': 'تَجِيئُونَ',
          '2pf': 'تَجِئْنَ',
          '3pm': 'يَجِيئُونَ',
          '3pf': 'يَجِئْنَ',
        })
      })
    })
  })
})

describe('active present jussive', () => {
  test('drops the final glide for أَعْطَى', () => {
    const jussive = conjugatePresentMood(getVerb('عطى', 4)!, 'jussive')

    expect(jussive['3ms']).toBe('يُعْطِ')
    expect(jussive['2sm']).toBe('تُعْطِ')
    expect(jussive['1p']).toBe('نُعْطِ')
    expect(jussive['2sf']).toBe('تُعْطِي')
    expect(jussive['3pm']).toBe('يُعْطُوا')
  })

  test('drops nūn endings for صَرَفَ', () => {
    const jussive = conjugatePresentMood(getVerb('صرف', 1), 'jussive')

    expect(jussive['2sm']).toBe('تَصْرِفْ')
    expect(jussive['2sf']).toBe('تَصْرِفِي')
    expect(jussive['2d']).toBe('تَصْرِفَا')
    expect(jussive['2pm']).toBe('تَصْرِفُوا')
    expect(jussive['2pf']).toBe('تَصْرِفْنَ')
    expect(jussive['3dm']).toBe('يَصْرِفَا')
    expect(jussive['3df']).toBe('تَصْرِفَا')
    expect(jussive['3pf']).toBe('يَصْرِفْنَ')
    expect(jussive['3pm']).toBe('يَصْرِفُوا')
  })

  test('shortens hollow stems without suffixes for قَالَ', () => {
    const jussive = conjugatePresentMood(getVerb('قول', 1), 'jussive')

    expect(jussive['3ms']).toBe('يَقُلْ')
    expect(jussive['2sm']).toBe('تَقُلْ')
    expect(jussive['3fs']).toBe('تَقُلْ')
    expect(jussive['1s']).toBe('أَقُلْ')
    expect(jussive['1p']).toBe('نَقُلْ')
    expect(jussive['2pf']).toBe('تَقُلْنَ')
    expect(jussive['3pf']).toBe('يَقُلْنَ')
  })

  test.each([
    ['قود', 7, 'يَنْقَدْ'],
    ['قود', 8, 'يَقْتَدْ'],
    ['قود', 10, 'يَسْتَقِدْ'],
  ])('%s (%d) pattern is %s', (root, form, expected3ms) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe(expected3ms)
  })

  test('handles initial hamza + middle weak + final weak for أَوَى', () => {
    const verb = verbs.find((entry) => entry.root === 'أوي' && entry.form === 1)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَأْوِ')
    expect(jussive['2sm']).toBe('تَأْوِ')
    expect(jussive['1s']).toBe('آوِ')
    expect(jussive['1p']).toBe('نَأْوِ')
    expect(jussive['3fs']).toBe('تَأْوِ')
    expect(jussive['2sf']).toBe('تَأْوِي')
    expect(jussive['3pm']).toBe('يَأْوُوا')
  })

  test('preserves shadda for form IX verbs in jussive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَحْمَرَّ')
    expect(jussive['2sm']).toBe('تَحْمَرَّ')
    expect(jussive['1s']).toBe('أَحْمَرَّ')
  })

  test('expands shadda for form IX verbs in feminine plural forms in jussive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['2pf']).toBe('تَحْمَرَرْنَ')
    expect(jussive['3pf']).toBe('يَحْمَرَرْنَ')
  })

  test('drops final hamza for جَاءَ (middle weak + final hamza)', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَجِئْ')
    expect(jussive['2sm']).toBe('تَجِئْ')
    expect(jussive['1s']).toBe('أَجِئْ')
    expect(jussive['1p']).toBe('نَجِئْ')
    expect(jussive['3fs']).toBe('تَجِئْ')
    expect(jussive['2sf']).toBe('تَجِيئِي')
    expect(jussive['3pm']).toBe('يَجِيئُوا')
  })
})

describe('active present subjunctive', () => {
  test('preserves shadda for form IX verbs in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['3ms']).toBe('يَحْمَرَّ')
    expect(subjunctive['2sm']).toBe('تَحْمَرَّ')
    expect(subjunctive['1s']).toBe('أَحْمَرَّ')
  })

  test('expands shadda for form IX verbs in feminine plural forms in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['2pf']).toBe('تَحْمَرَرْنَ')
    expect(subjunctive['3pf']).toBe('يَحْمَرَرْنَ')
  })

  test('changes final damma to fatḥa for جَاءَ in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['3ms']).toBe('يَجِيءَ')
    expect(subjunctive['2sm']).toBe('تَجِيءَ')
    expect(subjunctive['1s']).toBe('أَجِيءَ')
    expect(subjunctive['1p']).toBe('نَجِيءَ')
    expect(subjunctive['3fs']).toBe('تَجِيءَ')
  })
})
