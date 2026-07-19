import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('zrq-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zrq-1')!)).toEqualT({
      '1s': 'زَرِقْتُ',
      '2ms': 'زَرِقْتَ',
      '2fs': 'زَرِقْتِ',
      '3ms': 'زَرِقَ',
      '3fs': 'زَرِقَتْ',
      '2d': 'زَرِقْتُمَا',
      '3md': 'زَرِقَا',
      '3fd': 'زَرِقَتَا',
      '1p': 'زَرِقْنَا',
      '2mp': 'زَرِقْتُمْ',
      '2fp': 'زَرِقْتُنَّ',
      '3mp': 'زَرِقُوا',
      '3fp': 'زَرِقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1')!, 'indicative')).toEqualT({
      '1s': 'أَزْرَقُ',
      '2ms': 'تَزْرَقُ',
      '2fs': 'تَزْرَقِينَ',
      '3ms': 'يَزْرَقُ',
      '3fs': 'تَزْرَقُ',
      '2d': 'تَزْرَقَانِ',
      '3md': 'يَزْرَقَانِ',
      '3fd': 'تَزْرَقَانِ',
      '1p': 'نَزْرَقُ',
      '2mp': 'تَزْرَقُونَ',
      '2fp': 'تَزْرَقْنَ',
      '3mp': 'يَزْرَقُونَ',
      '3fp': 'يَزْرَقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَزْرَقَ',
      '2ms': 'تَزْرَقَ',
      '2fs': 'تَزْرَقِي',
      '3ms': 'يَزْرَقَ',
      '3fs': 'تَزْرَقَ',
      '2d': 'تَزْرَقَا',
      '3md': 'يَزْرَقَا',
      '3fd': 'تَزْرَقَا',
      '1p': 'نَزْرَقَ',
      '2mp': 'تَزْرَقُوا',
      '2fp': 'تَزْرَقْنَ',
      '3mp': 'يَزْرَقُوا',
      '3fp': 'يَزْرَقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1')!, 'jussive')).toEqualT({
      '1s': 'أَزْرَقْ',
      '2ms': 'تَزْرَقْ',
      '2fs': 'تَزْرَقِي',
      '3ms': 'يَزْرَقْ',
      '3fs': 'تَزْرَقْ',
      '2d': 'تَزْرَقَا',
      '3md': 'يَزْرَقَا',
      '3fd': 'تَزْرَقَا',
      '1p': 'نَزْرَقْ',
      '2mp': 'تَزْرَقُوا',
      '2fp': 'تَزْرَقْنَ',
      '3mp': 'يَزْرَقُوا',
      '3fp': 'يَزْرَقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('zrq-1')!)).toMatchObjectT({
      '2ms': 'اِزْرَقْ',
      '2fs': 'اِزْرَقِي',
      '2d': 'اِزْرَقَا',
      '2mp': 'اِزْرَقُوا',
      '2fp': 'اِزْرَقْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('zrq-1')!)).toMatchObjectT({
      '3ms': 'زُرِقَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُزْرَقُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُزْرَقَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُزْرَقْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('zrq-1')!)).toEqualT('زَارِق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('zrq-1')!)).toEqualT('مَزْرُوق')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('zrq-1')!)).toEqualT(['زَرَق'])
  })
})
