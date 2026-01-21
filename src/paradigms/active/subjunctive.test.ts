import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present subjunctive', () => {
  test('preserves shadda for form IX verbs in subjunctive', () => {
    expect(conjugatePresentMood(getVerb('حمر', 9), 'subjunctive')).toMatchObject({
      '3ms': 'يَحْمَرَّ',
      '2ms': 'تَحْمَرَّ',
      '1s': 'أَحْمَرَّ',
    })
  })

  test('expands shadda for form IX verbs in feminine plural forms in subjunctive', () => {
    expect(conjugatePresentMood(getVerb('حمر', 9), 'subjunctive')).toMatchObject({
      '2fp': 'تَحْمَرَرْنَ',
      '3fp': 'يَحْمَرَرْنَ',
    })
  })

  test('subjunctive conjugation for صَغُرَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('صغر', 1), 'subjunctive')).toEqual({
      '1s': 'أَصْغُرَ',
      '2ms': 'تَصْغُرَ',
      '2fs': 'تَصْغُرِي',
      '3ms': 'يَصْغُرَ',
      '3fs': 'تَصْغُرَ',
      '2d': 'تَصْغُرَا',
      '3md': 'يَصْغُرَا',
      '3fd': 'تَصْغُرَا',
      '1p': 'نَصْغُرَ',
      '2mp': 'تَصْغُرُوا',
      '2fp': 'تَصْغُرْنَ',
      '3mp': 'يَصْغُرُوا',
      '3fp': 'يَصْغُرْنَ',
    })
  })

  test('subjunctive pattern for عَوِزَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('عوز', 1), 'subjunctive')).toMatchObject({
      '3ms': 'يَعْوَزَ',
    })
  })

  test('subjunctive pattern for عَامَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('عوم', 1), 'subjunctive')).toMatchObject({
      '3ms': 'يَعُومَ',
    })
  })

  test('subjunctive pattern for قَالَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('قول', 1), 'subjunctive')).toMatchObject({
      '3ms': 'يَقُولَ',
    })
  })

  test('subjunctive conjugation for وَضَعَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('وضع', 1), 'subjunctive')).toEqual({
      '1s': 'أَضَعَ',
      '2ms': 'تَضَعَ',
      '2fs': 'تَضَعِي',
      '3ms': 'يَضَعَ',
      '3fs': 'تَضَعَ',
      '2d': 'تَضَعَا',
      '3md': 'يَضَعَا',
      '3fd': 'تَضَعَا',
      '1p': 'نَضَعَ',
      '2mp': 'تَضَعُوا',
      '2fp': 'تَضَعْنَ',
      '3mp': 'يَضَعُوا',
      '3fp': 'يَضَعْنَ',
    })
  })

  test('subjunctive conjugation for حَبَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('حبب', 1), 'subjunctive')).toEqual({
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

  test('changes final damma to fatḥa for جَاءَ in subjunctive', () => {
    expect(conjugatePresentMood(getVerb('جيء', 1), 'subjunctive')).toMatchObject({
      '3ms': 'يَجِيءَ',
      '2ms': 'تَجِيءَ',
      '1s': 'أَجِيءَ',
      '1p': 'نَجِيءَ',
      '3fs': 'تَجِيءَ',
    })
  })

  test('subjunctive conjugation for بَقِيَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('بقي', 1), 'subjunctive')).toEqual({
      '1s': 'أَبْقَى',
      '2ms': 'تَبْقَى',
      '2fs': 'تَبْقَيْ',
      '3ms': 'يَبْقَى',
      '3fs': 'تَبْقَى',
      '2d': 'تَبْقَيَا',
      '3md': 'يَبْقَيَا',
      '3fd': 'تَبْقَيَا',
      '1p': 'نَبْقَى',
      '2mp': 'تَبْقَوْا',
      '2fp': 'تَبْقَيْنَ',
      '3mp': 'يَبْقَوْا',
      '3fp': 'يَبْقَيْنَ',
    })
  })

  test('subjunctive conjugation for رَوِيَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('روي', 1), 'subjunctive')).toEqual({
      '1s': 'أَرْوِيَ',
      '2ms': 'تَرْوِيَ',
      '2fs': 'تَرْوِي',
      '3ms': 'يَرْوِيَ',
      '3fs': 'تَرْوِيَ',
      '2d': 'تَرْوِيَا',
      '3md': 'يَرْوِيَا',
      '3fd': 'تَرْوِيَا',
      '1p': 'نَرْوِيَ',
      '2mp': 'تَرْوُوا',
      '2fp': 'تَرْوِينَ',
      '3mp': 'يَرْوُوا',
      '3fp': 'يَرْوِينَ',
    })
  })

  test('subjunctive conjugation for شَادَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('شيد', 1), 'subjunctive')).toEqual({
      '1s': 'أَشِيدَ',
      '2ms': 'تَشِيدَ',
      '2fs': 'تَشِيدِي',
      '3ms': 'يَشِيدَ',
      '3fs': 'تَشِيدَ',
      '2d': 'تَشِيدَا',
      '3md': 'يَشِيدَا',
      '3fd': 'تَشِيدَا',
      '1p': 'نَشِيدَ',
      '2mp': 'تَشِيدُوْا',
      '2fp': 'تَشِدْنَ',
      '3mp': 'يَشِيدُوْا',
      '3fp': 'يَشِدْنَ',
    })
  })

  test('subjunctive conjugation for رَأَى (Form I)', () => {
    expect(conjugatePresentMood(getVerb('رأى', 1), 'subjunctive')).toEqual({
      '1s': 'أَرَى',
      '2ms': 'تَرَى',
      '2fs': 'تَرَيْ',
      '3ms': 'يَرَى',
      '3fs': 'تَرَى',
      '2d': 'تَرَيَا',
      '3md': 'يَرَيَا',
      '3fd': 'تَرَيَا',
      '1p': 'نَرَى',
      '2mp': 'تَرَوْا',
      '2fp': 'تَرَيْنَ',
      '3mp': 'يَرَوْا',
      '3fp': 'يَرَيْنَ',
    })
  })

  describe('hamzated initial defective verbs', () => {
    test('subjunctive conjugation for أَتَى (Form I)', () => {
      expect(conjugatePresentMood(getVerb('أتي', 1), 'subjunctive')).toEqual({
        '1s': 'آتِيَ',
        '2ms': 'تَأْتِيَ',
        '2fs': 'تَأْتِي',
        '3ms': 'يَأْتِيَ',
        '3fs': 'تَأْتِيَ',
        '2d': 'تَأْتِيَا',
        '3md': 'يَأْتِيَا',
        '3fd': 'تَأْتِيَا',
        '1p': 'نَأْتِيَ',
        '2mp': 'تَأْتُوْا',
        '2fp': 'تَأْتِينَ',
        '3mp': 'يَأْتُوْا',
        '3fp': 'يَأْتِينَ',
      })
    })
  })

  describe('hamzated final assimilated verbs', () => {
    test('subjunctive conjugation for وَأَى (Form I)', () => {
      expect(conjugatePresentMood(getVerb('وأى', 1), 'subjunctive')).toEqual({
        '1s': 'أَئِيَ',
        '2ms': 'تَئِيَ',
        '2fs': 'تَئِي',
        '3ms': 'يَئِيَ',
        '3fs': 'تَئِيَ',
        '2d': 'تَئِيَا',
        '3md': 'يَئِيَا',
        '3fd': 'تَئِيَا',
        '1p': 'نَئِيَ',
        '2mp': 'تَأُوا',
        '2fp': 'تَئِينَ',
        '3mp': 'يَأُوا',
        '3fp': 'يَئِينَ',
      })
    })
  })

  describe('hamzated initial hollow verbs', () => {
    test('subjunctive conjugation for أَيَّدَ (Form II)', () => {
      expect(conjugatePresentMood(getVerb('أيد', 2), 'subjunctive')).toEqual({
        '1s': 'أُؤَيِّدَ',
        '2ms': 'تُؤَيِّدَ',
        '2fs': 'تُؤَيِّدِي',
        '3ms': 'يُؤَيِّدَ',
        '3fs': 'تُؤَيِّدَ',
        '2d': 'تُؤَيِّدَا',
        '3md': 'يُؤَيِّدَا',
        '3fd': 'تُؤَيِّدَا',
        '1p': 'نُؤَيِّدَ',
        '2mp': 'تُؤَيِّدُوا',
        '2fp': 'تُؤَيِّدْنَ',
        '3mp': 'يُؤَيِّدُوا',
        '3fp': 'يُؤَيِّدْنَ',
      })
    })
  })

  test('subjunctive conjugation for قَرَأَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('قرأ', 1), 'subjunctive')).toEqual({
      '1s': 'أَقْرَأَ',
      '2ms': 'تَقْرَأَ',
      '2fs': 'تَقْرَئِي',
      '3ms': 'يَقْرَأَ',
      '3fs': 'تَقْرَأَ',
      '2d': 'تَقْرَآ',
      '3md': 'يَقْرَآ',
      '3fd': 'تَقْرَآ',
      '1p': 'نَقْرَأَ',
      '2mp': 'تَقْرَأُوا',
      '2fp': 'تَقْرَأْنَ',
      '3mp': 'يَقْرَأُوا',
      '3fp': 'يَقْرَأْنَ',
    })
  })

  test('subjunctive conjugation for بَدَأَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('بدأ', 1), 'subjunctive')).toEqual({
      '1s': 'أَبْدَأَ',
      '2ms': 'تَبْدَأَ',
      '2fs': 'تَبْدَئِي',
      '3ms': 'يَبْدَأَ',
      '3fs': 'تَبْدَأَ',
      '2d': 'تَبْدَآ',
      '3md': 'يَبْدَآ',
      '3fd': 'تَبْدَآ',
      '1p': 'نَبْدَأَ',
      '2mp': 'تَبْدَأُوا',
      '2fp': 'تَبْدَأْنَ',
      '3mp': 'يَبْدَأُوا',
      '3fp': 'يَبْدَأْنَ',
    })
  })

  test('subjunctive conjugation for اِسْتَقْرَأَ (Form X)', () => {
    expect(conjugatePresentMood(getVerb('قرأ', 10), 'subjunctive')).toEqual({
      '1s': 'أَسْتَقْرِئَ',
      '2ms': 'تَسْتَقْرِئَ',
      '2fs': 'تَسْتَقْرِئِي',
      '3ms': 'يَسْتَقْرِئَ',
      '3fs': 'تَسْتَقْرِئَ',
      '2d': 'تَسْتَقْرِئَا',
      '3md': 'يَسْتَقْرِئَا',
      '3fd': 'تَسْتَقْرِئَا',
      '1p': 'نَسْتَقْرِئَ',
      '2mp': 'تَسْتَقْرِئُوا',
      '2fp': 'تَسْتَقْرِئْنَ',
      '3mp': 'يَسْتَقْرِئُوا',
      '3fp': 'يَسْتَقْرِئْنَ',
    })
  })
})
