import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mrr-10', () => {
  // FIXME: Active past tests are not consistent with other Form X geminate roots, confirmation needed.
  test.skip('active past', () => {
    expect(conjugatePast(getVerbById('mrr-10')!)).toEqualT({
      '1s': 'اِسْتَمَرَّيْتُ',
      '2ms': 'اِسْتَمَرَّيْتَ',
      '2fs': 'اِسْتَمَرَّيْتِ',
      '3ms': 'اِسْتَمَرَّ',
      '3fs': 'اِسْتَمَرَّتْ',
      '2d': 'اِسْتَمَرَّيْتُمَا',
      '3md': 'اِسْتَمَرَّا',
      '3fd': 'اِسْتَمَرَّتَا',
      '1p': 'اِسْتَمَرَّيْنَا',
      '2mp': 'اِسْتَمَرَّيْتُمْ',
      '2fp': 'اِسْتَمَرَّيْتُنَّ',
      '3mp': 'اِسْتَمَرُّوا',
      '3fp': 'اِسْتَمْرَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mrr-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَمِرُّ',
      '2ms': 'تَسْتَمِرُّ',
      '2fs': 'تَسْتَمِرِّينَ',
      '3ms': 'يَسْتَمِرُّ',
      '3fs': 'تَسْتَمِرُّ',
      '2d': 'تَسْتَمِرَّانِ',
      '3md': 'يَسْتَمِرَّانِ',
      '3fd': 'تَسْتَمِرَّانِ',
      '1p': 'نَسْتَمِرُّ',
      '2mp': 'تَسْتَمِرُّونَ',
      '2fp': 'تَسْتَمْرِرْنَ',
      '3mp': 'يَسْتَمِرُّونَ',
      '3fp': 'يَسْتَمْرِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mrr-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَمِرَّ',
      '2ms': 'تَسْتَمِرَّ',
      '2fs': 'تَسْتَمِرِّي',
      '3ms': 'يَسْتَمِرَّ',
      '3fs': 'تَسْتَمِرَّ',
      '2d': 'تَسْتَمِرَّا',
      '3md': 'يَسْتَمِرَّا',
      '3fd': 'تَسْتَمِرَّا',
      '1p': 'نَسْتَمِرَّ',
      '2mp': 'تَسْتَمِرُّوا',
      '2fp': 'تَسْتَمْرِرْنَ',
      '3mp': 'يَسْتَمِرُّوا',
      '3fp': 'يَسْتَمْرِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mrr-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَمِرَّ',
      '2ms': 'تَسْتَمِرَّ',
      '2fs': 'تَسْتَمِرِّي',
      '3ms': 'يَسْتَمِرَّ',
      '3fs': 'تَسْتَمِرَّ',
      '2d': 'تَسْتَمِرَّا',
      '3md': 'يَسْتَمِرَّا',
      '3fd': 'تَسْتَمِرَّا',
      '1p': 'نَسْتَمِرَّ',
      '2mp': 'تَسْتَمِرُّوا',
      '2fp': 'تَسْتَمْرِرْنَ',
      '3mp': 'يَسْتَمِرُّوا',
      '3fp': 'يَسْتَمْرِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mrr-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَمِرَّ',
      '2fs': 'اِسْتَمِرِّي',
      '2d': 'اِسْتَمِرَّا',
      '2mp': 'اِسْتَمِرُّوا',
      '2fp': 'اِسْتَمْرِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mrr-10')!)).toEqualT({
      '1s': 'اُسْتُمْرِرْتُ',
      '2ms': 'اُسْتُمْرِرْتَ',
      '2fs': 'اُسْتُمْرِرْتِ',
      '3ms': 'اُسْتُمِرَّ',
      '3fs': 'اُسْتُمِرَّتْ',
      '2d': 'اُسْتُمْرِرْتُمَا',
      '3md': 'اُسْتُمِرَّا',
      '3fd': 'اُسْتُمِرَّتَا',
      '1p': 'اُسْتُمْرِرْنَا',
      '2mp': 'اُسْتُمْرِرْتُمْ',
      '2fp': 'اُسْتُمْرِرْتُنَّ',
      '3mp': 'اُسْتُمِرُّوا',
      '3fp': 'اُسْتُمْرِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَمَرُّ',
      '2ms': 'تُسْتَمَرُّ',
      '2fs': 'تُسْتَمَرِّينَ',
      '3ms': 'يُسْتَمَرُّ',
      '3fs': 'تُسْتَمَرُّ',
      '2d': 'تُسْتَمَرَّانِ',
      '3md': 'يُسْتَمَرَّانِ',
      '3fd': 'تُسْتَمَرَّانِ',
      '1p': 'نُسْتَمَرُّ',
      '2mp': 'تُسْتَمَرُّونَ',
      '2fp': 'تُسْتَمْرَرْنَ',
      '3mp': 'يُسْتَمَرُّونَ',
      '3fp': 'يُسْتَمْرَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَمَرَّ',
      '2ms': 'تُسْتَمَرَّ',
      '2fs': 'تُسْتَمَرِّي',
      '3ms': 'يُسْتَمَرَّ',
      '3fs': 'تُسْتَمَرَّ',
      '2d': 'تُسْتَمَرَّا',
      '3md': 'يُسْتَمَرَّا',
      '3fd': 'تُسْتَمَرَّا',
      '1p': 'نُسْتَمَرَّ',
      '2mp': 'تُسْتَمَرُّوا',
      '2fp': 'تُسْتَمْرَرْنَ',
      '3mp': 'يُسْتَمَرُّوا',
      '3fp': 'يُسْتَمْرَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَمَرَّ',
      '2ms': 'تُسْتَمَرَّ',
      '2fs': 'تُسْتَمَرِّي',
      '3ms': 'يُسْتَمَرَّ',
      '3fs': 'تُسْتَمَرَّ',
      '2d': 'تُسْتَمَرَّا',
      '3md': 'يُسْتَمَرَّا',
      '3fd': 'تُسْتَمَرَّا',
      '1p': 'نُسْتَمَرَّ',
      '2mp': 'تُسْتَمَرُّوا',
      '2fp': 'تُسْتَمْرَرْنَ',
      '3mp': 'يُسْتَمَرُّوا',
      '3fp': 'يُسْتَمْرَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mrr-10')!)).toEqualT('مُسْتَمِرّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mrr-10')!)).toEqualT('مُسْتَمَرّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mrr-10')!)).toEqualT(['اِسْتِمْرَار'])
  })
})
