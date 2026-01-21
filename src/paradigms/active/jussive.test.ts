import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present jussive', () => {
  test('drops the final glide for أَعْطَى', () => {
    expect(conjugatePresentMood(getVerb('عطى', 4), 'jussive')).toMatchObject({
      '3ms': 'يُعْطِ',
      '2ms': 'تُعْطِ',
      '1p': 'نُعْطِ',
      '2fs': 'تُعْطِي',
      '3mp': 'يُعْطُوا',
    })
  })

  test('drops the final glide for أَضْحَى', () => {
    expect(conjugatePresentMood(getVerb('ضحي', 4), 'jussive')).toMatchObject({
      '3ms': 'يُضْحِ',
      '2ms': 'تُضْحِ',
      '1p': 'نُضْحِ',
      '2fs': 'تُضْحِي',
      '3mp': 'يُضْحُوا',
    })
  })

  test('drops nūn endings for صَرَفَ', () => {
    expect(conjugatePresentMood(getVerb('صرف', 1), 'jussive')).toMatchObject({
      '2ms': 'تَصْرِفْ',
      '2fs': 'تَصْرِفِي',
      '2d': 'تَصْرِفَا',
      '2mp': 'تَصْرِفُوا',
      '2fp': 'تَصْرِفْنَ',
      '3md': 'يَصْرِفَا',
      '3fd': 'تَصْرِفَا',
      '3fp': 'يَصْرِفْنَ',
      '3mp': 'يَصْرِفُوا',
    })
  })

  test('jussive conjugation for صَغُرَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('صغر', 1), 'jussive')).toEqual({
      '1s': 'أَصْغُرْ',
      '2ms': 'تَصْغُرْ',
      '2fs': 'تَصْغُرِي',
      '3ms': 'يَصْغُرْ',
      '3fs': 'تَصْغُرْ',
      '2d': 'تَصْغُرَا',
      '3md': 'يَصْغُرَا',
      '3fd': 'تَصْغُرَا',
      '1p': 'نَصْغُرْ',
      '2mp': 'تَصْغُرُوا',
      '2fp': 'تَصْغُرْنَ',
      '3mp': 'يَصْغُرُوا',
      '3fp': 'يَصْغُرْنَ',
    })
  })

  test('jussive pattern for عَوِزَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('عوز', 1), 'jussive')).toMatchObject({
      '3ms': 'يَعْوَزْ',
    })
  })

  test('jussive conjugation for عَوِزَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('عوز', 1), 'jussive')).toEqual({
      '1s': 'أَعْوَزْ',
      '2ms': 'تَعْوَزْ',
      '2fs': 'تَعْوَزِي',
      '3ms': 'يَعْوَزْ',
      '3fs': 'تَعْوَزْ',
      '2d': 'تَعْوَزَا',
      '3md': 'يَعْوَزَا',
      '3fd': 'تَعْوَزَا',
      '1p': 'نَعْوَزْ',
      '2mp': 'تَعْوَزُوا',
      '2fp': 'تَعْوَزْنَ',
      '3mp': 'يَعْوَزُوا',
      '3fp': 'يَعْوَزْنَ',
    })
  })

  test('jussive pattern for عَامَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('عوم', 1), 'jussive')).toMatchObject({
      '3ms': 'يَعُمْ',
    })
  })

  test('jussive pattern for حَالَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('حول', 1), 'jussive')).toMatchObject({
      '3ms': 'يَحُلْ',
    })
  })

  test('jussive pattern for قَرَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('قرر', 1), 'jussive')).toMatchObject({
      '3ms': 'يَقَرَّ',
    })
  })

  test('jussive conjugation for قَرَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('قرر', 1), 'jussive')).toEqual({
      '1s': 'أَقَرَّ',
      '2ms': 'تَقَرَّ',
      '2fs': 'تَقَرِّي',
      '3ms': 'يَقَرَّ',
      '3fs': 'تَقَرَّ',
      '2d': 'تَقَرَّا',
      '3md': 'يَقَرَّا',
      '3fd': 'تَقَرَّا',
      '1p': 'نَقَرَّ',
      '2mp': 'تَقَرُّوا',
      '2fp': 'تَقْرَرْنَ',
      '3mp': 'يَقَرُّوا',
      '3fp': 'يَقْرَرْنَ',
    })
  })

  test('jussive conjugation for وَضَعَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('وضع', 1), 'jussive')).toEqual({
      '1s': 'أَضَعْ',
      '2ms': 'تَضَعْ',
      '2fs': 'تَضَعِي',
      '3ms': 'يَضَعْ',
      '3fs': 'تَضَعْ',
      '2d': 'تَضَعَا',
      '3md': 'يَضَعَا',
      '3fd': 'تَضَعَا',
      '1p': 'نَضَعْ',
      '2mp': 'تَضَعُوا',
      '2fp': 'تَضَعْنَ',
      '3mp': 'يَضَعُوا',
      '3fp': 'يَضَعْنَ',
    })
  })

  test('jussive conjugation for وَثُقَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('وثق', 1), 'jussive')).toEqual({
      '1s': 'أَثُقْ',
      '2ms': 'تَثُقْ',
      '2fs': 'تَثُقِي',
      '3ms': 'يَثُقْ',
      '3fs': 'تَثُقْ',
      '2d': 'تَثُقَا',
      '3md': 'يَثُقَا',
      '3fd': 'تَثُقَا',
      '1p': 'نَثُقْ',
      '2mp': 'تَثُقُوا',
      '2fp': 'تَثُقْنَ',
      '3mp': 'يَثُقُوا',
      '3fp': 'يَثُقْنَ',
    })
  })

  test('jussive conjugation for جَيِدَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('جيد', 1), 'jussive')).toEqual({
      '1s': 'أَجْيَدْ',
      '2ms': 'تَجْيَدْ',
      '2fs': 'تَجْيَدِي',
      '3ms': 'يَجْيَدْ',
      '3fs': 'تَجْيَدْ',
      '2d': 'تَجْيَدَا',
      '3md': 'يَجْيَدَا',
      '3fd': 'تَجْيَدَا',
      '1p': 'نَجْيَدْ',
      '2mp': 'تَجْيَدُوا',
      '2fp': 'تَجْيَدْنَ',
      '3mp': 'يَجْيَدُوا',
      '3fp': 'يَجْيَدْنَ',
    })
  })

  test('jussive conjugation for وَهُنَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('وهن', 1), 'jussive')).toEqual({
      '1s': 'أَوْهُنْ',
      '2ms': 'تَوْهُنْ',
      '2fs': 'تَوْهُنِي',
      '3ms': 'يَوْهُنْ',
      '3fs': 'تَوْهُنْ',
      '2d': 'تَوْهُنَا',
      '3md': 'يَوْهُنَا',
      '3fd': 'تَوْهُنَا',
      '1p': 'نَوْهُنْ',
      '2mp': 'تَوْهُنُوا',
      '2fp': 'تَوْهُنَّ',
      '3mp': 'يَوْهُنُوا',
      '3fp': 'يَوْهُنَّ',
    })
  })

  test('jussive conjugation for بَقِيَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('بقي', 1), 'jussive')).toEqual({
      '1s': 'أَبْقَ',
      '2ms': 'تَبْقَ',
      '2fs': 'تَبْقَيْ',
      '3ms': 'يَبْقَ',
      '3fs': 'تَبْقَ',
      '2d': 'تَبْقَيَا',
      '3md': 'يَبْقَيَا',
      '3fd': 'تَبْقَيَا',
      '1p': 'نَبْقَ',
      '2mp': 'تَبْقَوا',
      '2fp': 'تَبْقَيْنَ',
      '3mp': 'يَبْقَوا',
      '3fp': 'يَبْقَيْنَ',
    })
  })

  test('jussive conjugation for دَعَا (Form I)', () => {
    expect(conjugatePresentMood(getVerb('دعا', 1), 'jussive')).toEqual({
      '1s': 'أَدْعُ',
      '2ms': 'تَدْعُ',
      '2fs': 'تَدْعِي',
      '3ms': 'يَدْعُ',
      '3fs': 'تَدْعُ',
      '2d': 'تَدْعُوَا',
      '3md': 'يَدْعُوَا',
      '3fd': 'تَدْعُوَا',
      '1p': 'نَدْعُ',
      '2mp': 'تَدْعُوا',
      '2fp': 'تَدْعُونَ',
      '3mp': 'يَدْعُوا',
      '3fp': 'يَدْعُونَ',
    })
  })

  test('jussive conjugation for رَوِيَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('روي', 1), 'jussive')).toEqual({
      '1s': 'أَرْوِ',
      '2ms': 'تَرْوِ',
      '2fs': 'تَرْوِي',
      '3ms': 'يَرْوِ',
      '3fs': 'تَرْوِ',
      '2d': 'تَرْوِيَا',
      '3md': 'يَرْوِيَا',
      '3fd': 'تَرْوِيَا',
      '1p': 'نَرْوِ',
      '2mp': 'تَرْوُوا',
      '2fp': 'تَرْوِينَ',
      '3mp': 'يَرْوُوا',
      '3fp': 'يَرْوِينَ',
    })
  })

  test('jussive conjugation for شَادَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('شيد', 1), 'jussive')).toEqual({
      '1s': 'أَشِدْ',
      '2ms': 'تَشِدْ',
      '2fs': 'تَشِيدِي',
      '3ms': 'يَشِدْ',
      '3fs': 'تَشِدْ',
      '2d': 'تَشِيدَا',
      '3md': 'يَشِيدَا',
      '3fd': 'تَشِيدَا',
      '1p': 'نَشِدْ',
      '2mp': 'تَشِيدُوا',
      '2fp': 'تَشِدْنَ',
      '3mp': 'يَشِيدُوا',
      '3fp': 'يَشِدْنَ',
    })
  })

  test('jussive conjugation for رَأَى (Form I)', () => {
    expect(conjugatePresentMood(getVerb('رأى', 1), 'jussive')).toEqual({
      '1s': 'أَرَ',
      '2ms': 'تَرَ',
      '2fs': 'تَرَيْ',
      '3ms': 'يَرَ',
      '3fs': 'تَرَ',
      '2d': 'تَرَيَا',
      '3md': 'يَرَيَا',
      '3fd': 'تَرَيَا',
      '1p': 'نَرَ',
      '2mp': 'تَرَوا',
      '2fp': 'تَرَيْنَ',
      '3mp': 'يَرَوا',
      '3fp': 'يَرَيْنَ',
    })
  })

  test('jussive conjugation for أَسَرَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('أسر', 1), 'jussive')).toEqual({
      '1s': 'آسِرْ',
      '2ms': 'تَأْسِرْ',
      '2fs': 'تَأْسِرِي',
      '3ms': 'يَأْسِرْ',
      '3fs': 'تَأْسِرْ',
      '2d': 'تَأْسِرَا',
      '3md': 'يَأْسِرَا',
      '3fd': 'تَأْسِرَا',
      '1p': 'نَأْسِرْ',
      '2mp': 'تَأْسِرُوا',
      '2fp': 'تَأْسِرْنَ',
      '3mp': 'يَأْسِرُوا',
      '3fp': 'يَأْسِرْنَ',
    })
  })

  test('jussive conjugation for أَذِنَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('أذن', 1), 'jussive')).toEqual({
      '1s': 'آذَنْ',
      '2ms': 'تَأْذَنْ',
      '2fs': 'تَأْذَنِي',
      '3ms': 'يَأْذَنْ',
      '3fs': 'تَأْذَنْ',
      '2d': 'تَأْذَنَا',
      '3md': 'يَأْذَنَا',
      '3fd': 'تَأْذَنَا',
      '1p': 'نَأْذَنْ',
      '2mp': 'تَأْذَنُوا',
      '2fp': 'تَأْذَنَّ',
      '3mp': 'يَأْذَنُوا',
      '3fp': 'يَأْذَنَّ',
    })
  })

  test('jussive conjugation for أَمَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('أمم', 1), 'jussive')).toEqual({
      '1s': 'أَؤُمَّ',
      '2ms': 'تَؤُمَّ',
      '2fs': 'تَؤُمِّي',
      '3ms': 'يَؤُمَّ',
      '3fs': 'تَؤُمَّ',
      '2d': 'تَؤُمَّا',
      '3md': 'يَؤُمَّا',
      '3fd': 'تَؤُمَّا',
      '1p': 'نَؤُمَّ',
      '2mp': 'تَؤُمُّوا',
      '2fp': 'تَأْمُمْنَ',
      '3mp': 'يَؤُمُّوا',
      '3fp': 'يَأْمُمْنَ',
    })
  })

  test('jussive conjugation for يَئِسَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('يئس', 1), 'jussive')).toEqual({
      '1s': 'أَيْئَسْ',
      '2ms': 'تَيْئَسْ',
      '2fs': 'تَيْئَسِي',
      '3ms': 'يَيْئَسْ',
      '3fs': 'تَيْئَسْ',
      '2d': 'تَيْئَسَا',
      '3md': 'يَيْئَسَا',
      '3fd': 'تَيْئَسَا',
      '1p': 'نَيْئَسْ',
      '2mp': 'تَيْئَسُوا',
      '2fp': 'تَيْئَسْنَ',
      '3mp': 'يَيْئَسُوا',
      '3fp': 'يَيْئَسْنَ',
    })
  })

  test('jussive conjugation for يَسُرَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('يسر', 1), 'jussive')).toEqual({
      '1s': 'أَيْسُرْ',
      '2ms': 'تَيْسُرْ',
      '2fs': 'تَيْسُرِي',
      '3ms': 'يَيْسُرْ',
      '3fs': 'تَيْسُرْ',
      '2d': 'تَيْسُرَا',
      '3md': 'يَيْسُرَا',
      '3fd': 'تَيْسُرَا',
      '1p': 'نَيْسُرْ',
      '2mp': 'تَيْسُرُوا',
      '2fp': 'تَيْسُرْنَ',
      '3mp': 'يَيْسُرُوا',
      '3fp': 'يَيْسُرْنَ',
    })
  })

  test('jussive conjugation for يَبِسَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('يبس', 1), 'jussive')).toEqual({
      '1s': 'أَيْبَسْ',
      '2ms': 'تَيْبَسْ',
      '2fs': 'تَيْبَسِي',
      '3ms': 'يَيْبَسْ',
      '3fs': 'تَيْبَسْ',
      '2d': 'تَيْبَسَا',
      '3md': 'يَيْبَسَا',
      '3fd': 'تَيْبَسَا',
      '1p': 'نَيْبَسْ',
      '2mp': 'تَيْبَسُوا',
      '2fp': 'تَيْبَسْنَ',
      '3mp': 'يَيْبَسُوا',
      '3fp': 'يَيْبَسْنَ',
    })
  })

  describe('hamzated initial verbs', () => {
    test('أَثَّرَ (Form II)', () => {
      expect(conjugatePresentMood(getVerb('أثر', 2), 'jussive')).toEqual({
        '1s': 'أُؤَثِّرْ',
        '2ms': 'تُؤَثِّرْ',
        '2fs': 'تُؤَثِّرِي',
        '3ms': 'يُؤَثِّرْ',
        '3fs': 'تُؤَثِّرْ',
        '2d': 'تُؤَثِّرَا',
        '3md': 'يُؤَثِّرَا',
        '3fd': 'تُؤَثِّرَا',
        '1p': 'نُؤَثِّرْ',
        '2mp': 'تُؤَثِّرُوا',
        '2fp': 'تُؤَثِّرْنَ',
        '3mp': 'يُؤَثِّرُوا',
        '3fp': 'يُؤَثِّرْنَ',
      })
    })
  })

  describe('hamzated initial defective verbs', () => {
    test('أَتَى (Form I)', () => {
      expect(conjugatePresentMood(getVerb('أتي', 1), 'jussive')).toEqual({
        '1s': 'آتِ',
        '2ms': 'تَأْتِ',
        '2fs': 'تَأْتِي',
        '3ms': 'يَأْتِ',
        '3fs': 'تَأْتِ',
        '2d': 'تَأْتِيَا',
        '3md': 'يَأْتِيَا',
        '3fd': 'تَأْتِيَا',
        '1p': 'نَأْتِ',
        '2mp': 'تَأْتُوا',
        '2fp': 'تَأْتِينَ',
        '3mp': 'يَأْتُوا',
        '3fp': 'يَأْتِينَ',
      })
    })
  })

  describe('hamzated final assimilated verbs', () => {
    test('وَأَى (Form I)', () => {
      expect(conjugatePresentMood(getVerb('وأى', 1), 'jussive')).toEqual({
        '1s': 'أَئِ',
        '2ms': 'تَئِ',
        '2fs': 'تَئِي',
        '3ms': 'يَئِ',
        '3fs': 'تَئِ',
        '2d': 'تَئِيَا',
        '3md': 'يَئِيَا',
        '3fd': 'تَئِيَا',
        '1p': 'نَئِ',
        '2mp': 'تَأُوا',
        '2fp': 'تَئِينَ',
        '3mp': 'يَأُوا',
        '3fp': 'يَئِينَ',
      })
    })
  })

  describe('hamzated initial hollow verbs', () => {
    test('أَيَّدَ (Form II)', () => {
      expect(conjugatePresentMood(getVerb('أيد', 2), 'jussive')).toEqual({
        '1s': 'أُؤَيِّدْ',
        '2ms': 'تُؤَيِّدْ',
        '2fs': 'تُؤَيِّدِي',
        '3ms': 'يُؤَيِّدْ',
        '3fs': 'تُؤَيِّدْ',
        '2d': 'تُؤَيِّدَا',
        '3md': 'يُؤَيِّدَا',
        '3fd': 'تُؤَيِّدَا',
        '1p': 'نُؤَيِّدْ',
        '2mp': 'تُؤَيِّدُوا',
        '2fp': 'تُؤَيِّدْنَ',
        '3mp': 'يُؤَيِّدُوا',
        '3fp': 'يُؤَيِّدْنَ',
      })
    })
  })

  test('Form II defective verb وَفَّى preserves shadda in jussive', () => {
    expect(conjugatePresentMood(getVerb('وفي', 2), 'jussive')).toEqual({
      '1s': 'أُوَفِّ',
      '1p': 'نُوَفِّ',
      '2ms': 'تُوَفِّ',
      '2fs': 'تُوَفِّي',
      '2d': 'تُوَفِّا',
      '2mp': 'تُوَفُّوا',
      '2fp': 'تُوَفِّينَ',
      '3ms': 'يُوَفِّ',
      '3fs': 'تُوَفِّ',
      '3md': 'يُوَفِّا',
      '3fd': 'تُوَفِّا',
      '3mp': 'يُوَفُّوا',
      '3fp': 'يُوَفِّينَ',
    })
  })

  test('Form V defective verb تَوَفَّى jussive conjugation', () => {
    // Based on authoritative sources: Form V defective verbs drop the final weak letter (ى) in jussive
    // Dual forms drop the weak letter before alif (similar to Form II)
    // Masculine plural forms have damma before waw (similar to Form II)
    // Feminine plural forms preserve yeh before noon + fatḥa (similar to Form II)
    // 2fs form has kasra before final yeh (similar to Form II)
    expect(conjugatePresentMood(getVerb('وفي', 5), 'jussive')).toEqual({
      '1s': 'أَتَوَفَّ',
      '2ms': 'تَتَوَفَّ',
      '2fs': 'تَتَوَفَّيْ',
      '3ms': 'يَتَوَفَّ',
      '3fs': 'تَتَوَفَّ',
      '2d': 'تَتَوَفَّيَا',
      '3md': 'يَتَوَفَّيَا',
      '3fd': 'تَتَوَفَّيَا',
      '1p': 'نَتَوَفَّ',
      '2mp': 'تَتَوَفَّوا',
      '2fp': 'تَتَوَفَّيْنَ',
      '3mp': 'يَتَوَفَّوا',
      '3fp': 'يَتَوَفَّيْنَ',
    })
  })

  test('Form X geminate verb اِسْتَحَمَّ jussive conjugation', () => {
    // Wiktionary lists multiple jussive variants; this uses the contracted form with shadda.
    expect(conjugatePresentMood(getVerb('حمم', 10), 'jussive')).toEqual({
      '1s': 'أَسْتَحِمَّ',
      '2ms': 'تَسْتَحِمَّ',
      '2fs': 'تَسْتَحِمِّي',
      '3ms': 'يَسْتَحِمَّ',
      '3fs': 'تَسْتَحِمَّ',
      '2d': 'تَسْتَحِمَّا',
      '3md': 'يَسْتَحِمَّا',
      '3fd': 'تَسْتَحِمَّا',
      '1p': 'نَسْتَحِمَّ',
      '2mp': 'تَسْتَحِمُّوا',
      '2fp': 'تَسْتَحْمِمْنَ',
      '3mp': 'يَسْتَحِمُّوا',
      '3fp': 'يَسْتَحْمِمْنَ',
    })
  })

  test('jussive conjugation for حَبَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('حبب', 1), 'jussive')).toEqual({
      '1s': 'أَحِبَّ',
      '2ms': 'تَحِبَّ',
      '2fs': 'تَحِبِّي',
      '3ms': 'يَحِبَّ',
      '3fs': 'تَحِبَّ',
      '2d': 'تَحِبَّا',
      '3md': 'يَحِبَّا',
      '3fd': 'تَحِبَّا',
      '1p': 'نَحِبَّ',
      '2mp': 'تَحِبُّوا',
      '2fp': 'تَحْبِبْنَ',
      '3mp': 'يَحِبُّوا',
      '3fp': 'يَحْبِبْنَ',
    })
  })

  test('jussive conjugation for ظَلَّ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('ظلل', 1), 'jussive')).toEqual({
      '1s': 'أَظَلَّ',
      '2ms': 'تَظَلَّ',
      '2fs': 'تَظَلِّي',
      '3ms': 'يَظَلَّ',
      '3fs': 'تَظَلَّ',
      '2d': 'تَظَلَّا',
      '3md': 'يَظَلَّا',
      '3fd': 'تَظَلَّا',
      '1p': 'نَظَلَّ',
      '2mp': 'تَظَلُّوا',
      '2fp': 'تَظْلَلْنَ',
      '3mp': 'يَظَلُّوا',
      '3fp': 'يَظْلَلْنَ',
    })
  })

  test('jussive conjugation for حَبَّبَ (Form II)', () => {
    expect(conjugatePresentMood(getVerb('حبب', 2), 'jussive')).toEqual({
      '1s': 'أُحَبِّبْ',
      '2ms': 'تُحَبِّبْ',
      '2fs': 'تُحَبِّبِي',
      '3ms': 'يُحَبِّبْ',
      '3fs': 'تُحَبِّبْ',
      '2d': 'تُحَبِّبَا',
      '3md': 'يُحَبِّبَا',
      '3fd': 'تُحَبِّبَا',
      '1p': 'نُحَبِّبْ',
      '2mp': 'تُحَبِّبُوا',
      '2fp': 'تُحَبِّبْنَ',
      '3mp': 'يُحَبِّبُوا',
      '3fp': 'يُحَبِّبْنَ',
    })
  })

  test('jussive conjugation for أَحَبَّ (Form IV)', () => {
    expect(conjugatePresentMood(getVerb('حبب', 4), 'jussive')).toEqual({
      '1s': 'أُحِبَّ',
      '2ms': 'تُحِبَّ',
      '2fs': 'تُحِبِّي',
      '3ms': 'يُحِبَّ',
      '3fs': 'تُحِبَّ',
      '2d': 'تُحِبَّا',
      '3md': 'يُحِبَّا',
      '3fd': 'تُحِبَّا',
      '1p': 'نُحِبَّ',
      '2mp': 'تُحِبُّوا',
      '2fp': 'تُحْبِبْنَ',
      '3mp': 'يُحِبُّوا',
      '3fp': 'يُحْبِبْنَ',
    })
  })

  test('shortens hollow stems without suffixes for قَالَ', () => {
    expect(conjugatePresentMood(getVerb('قول', 1), 'jussive')).toMatchObject({
      '3ms': 'يَقُلْ',
      '2ms': 'تَقُلْ',
      '3fs': 'تَقُلْ',
      '1s': 'أَقُلْ',
      '1p': 'نَقُلْ',
      '2fp': 'تَقُلْنَ',
      '3fp': 'يَقُلْنَ',
    })
  })

  test.each<[string, VerbForm, string]>([
    ['قود', 7, 'يَنْقَدْ'],
    ['قود', 8, 'يَقْتَدْ'],
    ['قود', 10, 'يَسْتَقِدْ'],
  ])('%s (%d) pattern is %s', (root, form, expected3ms) => {
    const jussive = conjugatePresentMood(getVerb(root, form), 'jussive')
    expect(jussive['3ms']).toBe(expected3ms)
  })

  test('handles initial hamza + middle weak + final weak for أَوَى', () => {
    expect(conjugatePresentMood(getVerb('أوي', 1), 'jussive')).toMatchObject({
      '3ms': 'يَأْوِ',
      '2ms': 'تَأْوِ',
      '1s': 'آوِ',
      '1p': 'نَأْوِ',
      '3fs': 'تَأْوِ',
      '2fs': 'تَأْوِي',
      '3mp': 'يَأْوُوا',
    })
  })

  test('drops the hamza for Form VIII اِتَّخَذَ in jussive', () => {
    expect(conjugatePresentMood(getVerb('أخذ', 8), 'jussive')).toMatchObject({
      '3ms': 'يَتَّخِذْ',
      '2ms': 'تَتَّخِذْ',
      '1s': 'أَتَّخِذْ',
    })
  })

  test('preserves shadda for form IX verbs in jussive', () => {
    expect(conjugatePresentMood(getVerb('حمر', 9), 'jussive')).toMatchObject({
      '3ms': 'يَحْمَرَّ',
      '2ms': 'تَحْمَرَّ',
      '1s': 'أَحْمَرَّ',
    })
  })

  test('expands shadda for form IX verbs in feminine plural forms in jussive', () => {
    expect(conjugatePresentMood(getVerb('حمر', 9), 'jussive')).toMatchObject({
      '2fp': 'تَحْمَرَرْنَ',
      '3fp': 'يَحْمَرَرْنَ',
    })
  })

  test('drops final hamza for جَاءَ (middle weak + final hamza)', () => {
    expect(conjugatePresentMood(getVerb('جيء', 1), 'jussive')).toMatchObject({
      '3ms': 'يَجِئْ',
      '2ms': 'تَجِئْ',
      '1s': 'أَجِئْ',
      '1p': 'نَجِئْ',
      '3fs': 'تَجِئْ',
      '2fs': 'تَجِيئِي',
      '3mp': 'يَجِيئُوا',
    })
  })

  test('jussive conjugation for قَرَأَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('قرأ', 1), 'jussive')).toEqual({
      '1s': 'أَقْرَأْ',
      '2ms': 'تَقْرَأْ',
      '2fs': 'تَقْرَئِي',
      '3ms': 'يَقْرَأْ',
      '3fs': 'تَقْرَأْ',
      '2d': 'تَقْرَآ',
      '3md': 'يَقْرَآ',
      '3fd': 'تَقْرَآ',
      '1p': 'نَقْرَأْ',
      '2mp': 'تَقْرَأُوا',
      '2fp': 'تَقْرَأْنَ',
      '3mp': 'يَقْرَأُوا',
      '3fp': 'يَقْرَأْنَ',
    })
  })

  test('jussive conjugation for وَطِئَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('وطئ', 1), 'jussive')).toEqual({
      '1s': 'أَطَأْ',
      '2ms': 'تَطَأْ',
      '2fs': 'تَطَئِي',
      '3ms': 'يَطَأْ',
      '3fs': 'تَطَأْ',
      '2d': 'تَطَآ',
      '3md': 'يَطَآ',
      '3fd': 'تَطَآ',
      '1p': 'نَطَأْ',
      '2mp': 'تَطَأُوا',
      '2fp': 'تَطَأْنَ',
      '3mp': 'يَطَأُوا',
      '3fp': 'يَطَأْنَ',
    })
  })

  test('jussive conjugation for بَدَأَ (Form I)', () => {
    expect(conjugatePresentMood(getVerb('بدأ', 1), 'jussive')).toEqual({
      '1s': 'أَبْدَأْ',
      '2ms': 'تَبْدَأْ',
      '2fs': 'تَبْدَئِي',
      '3ms': 'يَبْدَأْ',
      '3fs': 'تَبْدَأْ',
      '2d': 'تَبْدَآ',
      '3md': 'يَبْدَآ',
      '3fd': 'تَبْدَآ',
      '1p': 'نَبْدَأْ',
      '2mp': 'تَبْدَأُوا',
      '2fp': 'تَبْدَأْنَ',
      '3mp': 'يَبْدَأُوا',
      '3fp': 'يَبْدَأْنَ',
    })
  })

  test('jussive conjugation for اِسْتَقْرَأَ (Form X)', () => {
    expect(conjugatePresentMood(getVerb('قرأ', 10), 'jussive')).toEqual({
      '1s': 'أَسْتَقْرِئْ',
      '2ms': 'تَسْتَقْرِئْ',
      '2fs': 'تَسْتَقْرِئِي',
      '3ms': 'يَسْتَقْرِئْ',
      '3fs': 'تَسْتَقْرِئْ',
      '2d': 'تَسْتَقْرِئَا',
      '3md': 'يَسْتَقْرِئَا',
      '3fd': 'تَسْتَقْرِئَا',
      '1p': 'نَسْتَقْرِئْ',
      '2mp': 'تَسْتَقْرِئُوا',
      '2fp': 'تَسْتَقْرِئْنَ',
      '3mp': 'يَسْتَقْرِئُوا',
      '3fp': 'يَسْتَقْرِئْنَ',
    })
  })

  test('preserves initial weak and drops final weak for اِسْتَوْفَى jussive', () => {
    expect(conjugatePresentMood(getVerb('وفي', 10), 'jussive')).toEqual({
      '1s': 'أَسْتَوْفِ',
      '2ms': 'تَسْتَوْفِ',
      '2fs': 'تَسْتَوْفِي',
      '3ms': 'يَسْتَوْفِ',
      '3fs': 'تَسْتَوْفِ',
      '2d': 'تَسْتَوْفَا',
      '3md': 'يَسْتَوْفَا',
      '3fd': 'تَسْتَوْفَا',
      '1p': 'نَسْتَوْفِ',
      '2mp': 'تَسْتَوْفُوا',
      '2fp': 'تَسْتَوْفِينَ',
      '3mp': 'يَسْتَوْفُوا',
      '3fp': 'يَسْتَوْفِينَ',
    })
  })
})
