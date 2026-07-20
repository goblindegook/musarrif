import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mrr-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mrr-1')!)).toEqualT({
      '1s': 'مَرَرْتُ',
      '2ms': 'مَرَرْتَ',
      '2fs': 'مَرَرْتِ',
      '3ms': 'مَرَّ',
      '3fs': 'مَرَّتْ',
      '2d': 'مَرَرْتُمَا',
      '3md': 'مَرَّا',
      '3fd': 'مَرَّتَا',
      '1p': 'مَرَرْنَا',
      '2mp': 'مَرَرْتُمْ',
      '2fp': 'مَرَرْتُنَّ',
      '3mp': 'مَرُّوا',
      '3fp': 'مَرَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mrr-1')!, 'indicative')).toEqualT({
      '1s': 'أَمُرُّ',
      '2ms': 'تَمُرُّ',
      '2fs': 'تَمُرِّينَ',
      '3ms': 'يَمُرُّ',
      '3fs': 'تَمُرُّ',
      '2d': 'تَمُرَّانِ',
      '3md': 'يَمُرَّانِ',
      '3fd': 'تَمُرَّانِ',
      '1p': 'نَمُرُّ',
      '2mp': 'تَمُرُّونَ',
      '2fp': 'تَمْرُرْنَ',
      '3mp': 'يَمُرُّونَ',
      '3fp': 'يَمْرُرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mrr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَمُرَّ',
      '2ms': 'تَمُرَّ',
      '2fs': 'تَمُرِّي',
      '3ms': 'يَمُرَّ',
      '3fs': 'تَمُرَّ',
      '2d': 'تَمُرَّا',
      '3md': 'يَمُرَّا',
      '3fd': 'تَمُرَّا',
      '1p': 'نَمُرَّ',
      '2mp': 'تَمُرُّوا',
      '2fp': 'تَمْرُرْنَ',
      '3mp': 'يَمُرُّوا',
      '3fp': 'يَمْرُرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mrr-1')!, 'jussive')).toEqualT({
      '1s': 'أَمُرَّ',
      '2ms': 'تَمُرَّ',
      '2fs': 'تَمُرِّي',
      '3ms': 'يَمُرَّ',
      '3fs': 'تَمُرَّ',
      '2d': 'تَمُرَّا',
      '3md': 'يَمُرَّا',
      '3fd': 'تَمُرَّا',
      '1p': 'نَمُرَّ',
      '2mp': 'تَمُرُّوا',
      '2fp': 'تَمْرُرْنَ',
      '3mp': 'يَمُرُّوا',
      '3fp': 'يَمْرُرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mrr-1')!)).toMatchObjectT({
      '2ms': 'مُرَّ',
      '2fs': 'مُرِّي',
      '2d': 'مُرَّا',
      '2mp': 'مُرُّوا',
      '2fp': 'اُمْرُرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mrr-1')!)).toMatchObjectT({
      '3ms': 'مُرَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُمَرُّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُمَرَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mrr-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُمَرَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mrr-1')!)).toEqualT('مَارّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mrr-1')!)).toEqualT('مَمْرُور')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mrr-1')!)).toEqualT(['مَرّ', 'مُرُور', 'مَمَرّ'])
  })
})
