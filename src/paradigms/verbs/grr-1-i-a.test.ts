import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('grr-1-i-a (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('grr-1-i-a')!)).toEqualT({
      '1s': 'غَرِرْتُ',
      '2ms': 'غَرِرْتَ',
      '2fs': 'غَرِرْتِ',
      '3ms': 'غَرَّ',
      '3fs': 'غَرَّتْ',
      '2d': 'غَرِرْتُمَا',
      '3md': 'غَرَّا',
      '3fd': 'غَرَّتَا',
      '1p': 'غَرِرْنَا',
      '2mp': 'غَرِرْتُمْ',
      '2fp': 'غَرِرْتُنَّ',
      '3mp': 'غَرُّوا',
      '3fp': 'غَرِرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('grr-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أَغَرُّ',
      '2ms': 'تَغَرُّ',
      '2fs': 'تَغَرِّينَ',
      '3ms': 'يَغَرُّ',
      '3fs': 'تَغَرُّ',
      '2d': 'تَغَرَّانِ',
      '3md': 'يَغَرَّانِ',
      '3fd': 'تَغَرَّانِ',
      '1p': 'نَغَرُّ',
      '2mp': 'تَغَرُّونَ',
      '2fp': 'تَغْرَرْنَ',
      '3mp': 'يَغَرُّونَ',
      '3fp': 'يَغْرَرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('grr-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أَغَرَّ',
      '2ms': 'تَغَرَّ',
      '2fs': 'تَغَرِّي',
      '3ms': 'يَغَرَّ',
      '3fs': 'تَغَرَّ',
      '2d': 'تَغَرَّا',
      '3md': 'يَغَرَّا',
      '3fd': 'تَغَرَّا',
      '1p': 'نَغَرَّ',
      '2mp': 'تَغَرُّوا',
      '2fp': 'تَغْرَرْنَ',
      '3mp': 'يَغَرُّوا',
      '3fp': 'يَغْرَرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('grr-1-i-a')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَغَرَّ', 'أَغَرِّ', 'أَغْرَرْ']),
      '2ms': expect.toBeOneOf(['تَغَرَّ', 'تَغَرِّ', 'تَغْرَرْ']),
      '2fs': 'تَغَرِّي',
      '3ms': expect.toBeOneOf(['يَغَرَّ', 'يَغَرِّ', 'يَغْرَرْ']),
      '3fs': expect.toBeOneOf(['تَغَرَّ', 'تَغَرِّ', 'تَغْرَرْ']),
      '2d': 'تَغَرَّا',
      '3md': 'يَغَرَّا',
      '3fd': 'تَغَرَّا',
      '1p': expect.toBeOneOf(['نَغَرَّ', 'نَغَرِّ', 'نَغْرَرْ']),
      '2mp': 'تَغَرُّوا',
      '2fp': 'تَغْرَرْنَ',
      '3mp': 'يَغَرُّوا',
      '3fp': 'يَغْرَرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('grr-1-i-a')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['غَرَّ', 'غَرِّ', 'اِغْرَرْ']),
      '2fs': 'غَرِّي',
      '2d': 'غَرَّا',
      '2mp': 'غَرُّوا',
      '2fp': 'اِغْرَرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('grr-1-i-a')!)).toEqualT({
      '1s': 'غُرِرْتُ',
      '2ms': 'غُرِرْتَ',
      '2fs': 'غُرِرْتِ',
      '3ms': 'غُرَّ',
      '3fs': 'غُرَّتْ',
      '2d': 'غُرِرْتُمَا',
      '3md': 'غُرَّا',
      '3fd': 'غُرَّتَا',
      '1p': 'غُرِرْنَا',
      '2mp': 'غُرِرْتُمْ',
      '2fp': 'غُرِرْتُنَّ',
      '3mp': 'غُرُّوا',
      '3fp': 'غُرِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('grr-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أُغَرُّ',
      '2ms': 'تُغَرُّ',
      '2fs': 'تُغَرِّينَ',
      '3ms': 'يُغَرُّ',
      '3fs': 'تُغَرُّ',
      '2d': 'تُغَرَّانِ',
      '3md': 'يُغَرَّانِ',
      '3fd': 'تُغَرَّانِ',
      '1p': 'نُغَرُّ',
      '2mp': 'تُغَرُّونَ',
      '2fp': 'تُغْرَرْنَ',
      '3mp': 'يُغَرُّونَ',
      '3fp': 'يُغْرَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grr-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أُغَرَّ',
      '2ms': 'تُغَرَّ',
      '2fs': 'تُغَرِّي',
      '3ms': 'يُغَرَّ',
      '3fs': 'تُغَرَّ',
      '2d': 'تُغَرَّا',
      '3md': 'يُغَرَّا',
      '3fd': 'تُغَرَّا',
      '1p': 'نُغَرَّ',
      '2mp': 'تُغَرُّوا',
      '2fp': 'تُغْرَرْنَ',
      '3mp': 'يُغَرُّوا',
      '3fp': 'يُغْرَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grr-1-i-a')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُغَرَّ', 'أُغَرِّ', 'أُغْرَرْ']),
      '2ms': expect.toBeOneOf(['تُغَرَّ', 'تُغَرِّ', 'تُغْرَرْ']),
      '2fs': 'تُغَرِّي',
      '3ms': expect.toBeOneOf(['يُغَرَّ', 'يُغَرِّ', 'يُغْرَرْ']),
      '3fs': expect.toBeOneOf(['تُغَرَّ', 'تُغَرِّ', 'تُغْرَرْ']),
      '2d': 'تُغَرَّا',
      '3md': 'يُغَرَّا',
      '3fd': 'تُغَرَّا',
      '1p': expect.toBeOneOf(['نُغَرَّ', 'نُغَرِّ', 'نُغْرَرْ']),
      '2mp': 'تُغَرُّوا',
      '2fp': 'تُغْرَرْنَ',
      '3mp': 'يُغَرُّوا',
      '3fp': 'يُغْرَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('grr-1-i-a')!)).toEqualT('أَغَرّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('grr-1-i-a')!)).toEqualT('مَغْرُور')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('grr-1-i-a')!))).toEqualT(new Set(['غَرَر', 'غَرَارَة', 'غِرَّة']))
  })
})
