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

describe('jry-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('jry-1')!)).strings.toEqualT({
      '1s': 'جَرَيْتُ',
      '2ms': 'جَرَيْتَ',
      '2fs': 'جَرَيْتِ',
      '3ms': 'جَرَى',
      '3fs': 'جَرَتْ',
      '2d': 'جَرَيْتُمَا',
      '3md': 'جَرَيَا',
      '3fd': 'جَرَتَا',
      '1p': 'جَرَيْنَا',
      '2mp': 'جَرَيْتُمْ',
      '2fp': 'جَرَيْتُنَّ',
      '3mp': 'جَرَوا',
      '3fp': 'جَرَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('jry-1')!, 'indicative')).toEqualT({
      '1s': 'أَجْرِي',
      '2ms': 'تَجْرِي',
      '2fs': 'تَجْرِينَ',
      '3ms': 'يَجْرِي',
      '3fs': 'تَجْرِي',
      '2d': 'تَجْرِيَانِ',
      '3md': 'يَجْرِيَانِ',
      '3fd': 'تَجْرِيَانِ',
      '1p': 'نَجْرِي',
      '2mp': 'تَجْرُونَ',
      '2fp': 'تَجْرِينَ',
      '3mp': 'يَجْرُونَ',
      '3fp': 'يَجْرِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('jry-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَجْرِيَ',
      '2ms': 'تَجْرِيَ',
      '2fs': 'تَجْرِي',
      '3ms': 'يَجْرِيَ',
      '3fs': 'تَجْرِيَ',
      '2d': 'تَجْرِيَا',
      '3md': 'يَجْرِيَا',
      '3fd': 'تَجْرِيَا',
      '1p': 'نَجْرِيَ',
      '2mp': 'تَجْرُوا',
      '2fp': 'تَجْرِينَ',
      '3mp': 'يَجْرُوا',
      '3fp': 'يَجْرِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('jry-1')!, 'jussive')).toEqualT({
      '1s': 'أَجْرِ',
      '2ms': 'تَجْرِ',
      '2fs': 'تَجْرِي',
      '3ms': 'يَجْرِ',
      '3fs': 'تَجْرِ',
      '2d': 'تَجْرِيَا',
      '3md': 'يَجْرِيَا',
      '3fd': 'تَجْرِيَا',
      '1p': 'نَجْرِ',
      '2mp': 'تَجْرُوا',
      '2fp': 'تَجْرِينَ',
      '3mp': 'يَجْرُوا',
      '3fp': 'يَجْرِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('jry-1')!)).toMatchObjectT({
      '2ms': 'اِجْرِ',
      '2fs': 'اِجْرِي',
      '2d': 'اِجْرِيَا',
      '2mp': 'اِجْرُوا',
      '2fp': 'اِجْرِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('jry-1')!)).toMatchObjectT({
      '3ms': 'جُرِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('jry-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُجْرَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jry-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُجْرَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jry-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُجْرَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('jry-1')!)).toEqualT('جَارٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('jry-1')!)).toEqualT('مَجْرِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('jry-1')!)).toEqualT(['جَرْي', 'جَرَيَان'])
  })
})
