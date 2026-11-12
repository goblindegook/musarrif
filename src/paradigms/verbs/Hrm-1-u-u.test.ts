import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hrm-1-u-u (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hrm-1-u-u')!)).toEqualT({
      '1s': 'حَرُمْتُ',
      '2ms': 'حَرُمْتَ',
      '2fs': 'حَرُمْتِ',
      '3ms': 'حَرُمَ',
      '3fs': 'حَرُمَتْ',
      '2d': 'حَرُمْتُمَا',
      '3md': 'حَرُمَا',
      '3fd': 'حَرُمَتَا',
      '1p': 'حَرُمْنَا',
      '2mp': 'حَرُمْتُمْ',
      '2fp': 'حَرُمْتُنَّ',
      '3mp': 'حَرُمُوا',
      '3fp': 'حَرُمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hrm-1-u-u')!, 'indicative')).toEqualT({
      '1s': 'أَحْرُمُ',
      '2ms': 'تَحْرُمُ',
      '2fs': 'تَحْرُمِينَ',
      '3ms': 'يَحْرُمُ',
      '3fs': 'تَحْرُمُ',
      '2d': 'تَحْرُمَانِ',
      '3md': 'يَحْرُمَانِ',
      '3fd': 'تَحْرُمَانِ',
      '1p': 'نَحْرُمُ',
      '2mp': 'تَحْرُمُونَ',
      '2fp': 'تَحْرُمْنَ',
      '3mp': 'يَحْرُمُونَ',
      '3fp': 'يَحْرُمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hrm-1-u-u')!, 'subjunctive')).toEqualT({
      '1s': 'أَحْرُمَ',
      '2ms': 'تَحْرُمَ',
      '2fs': 'تَحْرُمِي',
      '3ms': 'يَحْرُمَ',
      '3fs': 'تَحْرُمَ',
      '2d': 'تَحْرُمَا',
      '3md': 'يَحْرُمَا',
      '3fd': 'تَحْرُمَا',
      '1p': 'نَحْرُمَ',
      '2mp': 'تَحْرُمُوا',
      '2fp': 'تَحْرُمْنَ',
      '3mp': 'يَحْرُمُوا',
      '3fp': 'يَحْرُمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hrm-1-u-u')!, 'jussive')).toEqualT({
      '1s': 'أَحْرُمْ',
      '2ms': 'تَحْرُمْ',
      '2fs': 'تَحْرُمِي',
      '3ms': 'يَحْرُمْ',
      '3fs': 'تَحْرُمْ',
      '2d': 'تَحْرُمَا',
      '3md': 'يَحْرُمَا',
      '3fd': 'تَحْرُمَا',
      '1p': 'نَحْرُمْ',
      '2mp': 'تَحْرُمُوا',
      '2fp': 'تَحْرُمْنَ',
      '3mp': 'يَحْرُمُوا',
      '3fp': 'يَحْرُمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hrm-1-u-u')!)).toMatchObjectT({
      '2ms': 'اُحْرُمْ',
      '2fs': 'اُحْرُمِي',
      '2d': 'اُحْرُمَا',
      '2mp': 'اُحْرُمُوا',
      '2fp': 'اُحْرُمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hrm-1-u-u')!)).toMatchObjectT({
      '3ms': 'حُرِمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hrm-1-u-u')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُحْرَمُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hrm-1-u-u')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُحْرَمَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hrm-1-u-u')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُحْرَمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hrm-1-u-u')!)).toEqualT('حَرِيم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hrm-1-u-u')!)).toEqualT('مَحْرُوم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hrm-1-u-u')!))).toEqualT(new Set(['حُرْم', 'حُرُم', 'حُرْمَة', 'حِرْمَة', 'حَرَام']))
  })
})
