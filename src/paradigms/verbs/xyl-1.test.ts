import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xyl-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xyl-1')!)).toEqualT({
      '1s': 'خِلْتُ',
      '2ms': 'خِلْتَ',
      '2fs': 'خِلْتِ',
      '3ms': 'خَالَ',
      '3fs': 'خَالَتْ',
      '2d': 'خِلْتُمَا',
      '3md': 'خَالَا',
      '3fd': 'خَالَتَا',
      '1p': 'خِلْنَا',
      '2mp': 'خِلْتُمْ',
      '2fp': 'خِلْتُنَّ',
      '3mp': 'خَالُوا',
      '3fp': 'خِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xyl-1')!, 'indicative')).toEqualT({
      '1s': 'أَخَالُ',
      '2ms': 'تَخَالُ',
      '2fs': 'تَخَالِينَ',
      '3ms': 'يَخَالُ',
      '3fs': 'تَخَالُ',
      '2d': 'تَخَالَانِ',
      '3md': 'يَخَالَانِ',
      '3fd': 'تَخَالَانِ',
      '1p': 'نَخَالُ',
      '2mp': 'تَخَالُونَ',
      '2fp': 'تَخَلْنَ',
      '3mp': 'يَخَالُونَ',
      '3fp': 'يَخَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xyl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَخَالَ',
      '2ms': 'تَخَالَ',
      '2fs': 'تَخَالِي',
      '3ms': 'يَخَالَ',
      '3fs': 'تَخَالَ',
      '2d': 'تَخَالَا',
      '3md': 'يَخَالَا',
      '3fd': 'تَخَالَا',
      '1p': 'نَخَالَ',
      '2mp': 'تَخَالُوا',
      '2fp': 'تَخَلْنَ',
      '3mp': 'يَخَالُوا',
      '3fp': 'يَخَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xyl-1')!, 'jussive')).toEqualT({
      '1s': 'أَخَلْ',
      '2ms': 'تَخَلْ',
      '2fs': 'تَخَالِي',
      '3ms': 'يَخَلْ',
      '3fs': 'تَخَلْ',
      '2d': 'تَخَالَا',
      '3md': 'يَخَالَا',
      '3fd': 'تَخَالَا',
      '1p': 'نَخَلْ',
      '2mp': 'تَخَالُوا',
      '2fp': 'تَخَلْنَ',
      '3mp': 'يَخَالُوا',
      '3fp': 'يَخَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xyl-1')!)).toMatchObjectT({
      '2ms': 'خَلْ',
      '2fs': 'خَالِي',
      '2d': 'خَالَا',
      '2mp': 'خَالُوا',
      '2fp': 'خَلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xyl-1')!)).toMatchObjectT({
      '3ms': 'خِيلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyl-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُخَالُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyl-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُخَالَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyl-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُخَلْ',
    })
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xyl-1')!)).toEqualT('مَخِيل')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('xyl-1')!)).toEqualT(['خَيْل', 'خَيَلَان', 'خَيْلَة', 'خَيْلُولَة', 'مَخِيلَة', 'مَخَالَة'])
  })
})
