import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('grb-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('grb-1')!)).toEqualT({
      '1s': 'غَرَبْتُ',
      '2ms': 'غَرَبْتَ',
      '2fs': 'غَرَبْتِ',
      '3ms': 'غَرَبَ',
      '3fs': 'غَرَبَتْ',
      '2d': 'غَرَبْتُمَا',
      '3md': 'غَرَبَا',
      '3fd': 'غَرَبَتَا',
      '1p': 'غَرَبْنَا',
      '2mp': 'غَرَبْتُمْ',
      '2fp': 'غَرَبْتُنَّ',
      '3mp': 'غَرَبُوا',
      '3fp': 'غَرَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('grb-1')!, 'indicative')).toEqualT({
      '1s': 'أَغْرُبُ',
      '2ms': 'تَغْرُبُ',
      '2fs': 'تَغْرُبِينَ',
      '3ms': 'يَغْرُبُ',
      '3fs': 'تَغْرُبُ',
      '2d': 'تَغْرُبَانِ',
      '3md': 'يَغْرُبَانِ',
      '3fd': 'تَغْرُبَانِ',
      '1p': 'نَغْرُبُ',
      '2mp': 'تَغْرُبُونَ',
      '2fp': 'تَغْرُبْنَ',
      '3mp': 'يَغْرُبُونَ',
      '3fp': 'يَغْرُبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('grb-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْرُبَ',
      '2ms': 'تَغْرُبَ',
      '2fs': 'تَغْرُبِي',
      '3ms': 'يَغْرُبَ',
      '3fs': 'تَغْرُبَ',
      '2d': 'تَغْرُبَا',
      '3md': 'يَغْرُبَا',
      '3fd': 'تَغْرُبَا',
      '1p': 'نَغْرُبَ',
      '2mp': 'تَغْرُبُوا',
      '2fp': 'تَغْرُبْنَ',
      '3mp': 'يَغْرُبُوا',
      '3fp': 'يَغْرُبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('grb-1')!, 'jussive')).toEqualT({
      '1s': 'أَغْرُبْ',
      '2ms': 'تَغْرُبْ',
      '2fs': 'تَغْرُبِي',
      '3ms': 'يَغْرُبْ',
      '3fs': 'تَغْرُبْ',
      '2d': 'تَغْرُبَا',
      '3md': 'يَغْرُبَا',
      '3fd': 'تَغْرُبَا',
      '1p': 'نَغْرُبْ',
      '2mp': 'تَغْرُبُوا',
      '2fp': 'تَغْرُبْنَ',
      '3mp': 'يَغْرُبُوا',
      '3fp': 'يَغْرُبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('grb-1')!)).toMatchObjectT({
      '2ms': 'اُغْرُبْ',
      '2fs': 'اُغْرُبِي',
      '2d': 'اُغْرُبَا',
      '2mp': 'اُغْرُبُوا',
      '2fp': 'اُغْرُبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('grb-1')!)).toMatchObjectT({
      '3ms': 'غُرِبَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُغْرَبُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُغْرَبَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُغْرَبْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('grb-1')!)).toEqualT('غَارِب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('grb-1')!)).toEqualT('مَغْرُوب')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('grb-1')!)).toEqualT(['غَرْب', 'غُرُوب'])
  })
})
