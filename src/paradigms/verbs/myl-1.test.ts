import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('myl-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('myl-1')!)).toEqualT({
      '1s': 'مِلْتُ',
      '2ms': 'مِلْتَ',
      '2fs': 'مِلْتِ',
      '3ms': 'مَالَ',
      '3fs': 'مَالَتْ',
      '2d': 'مِلْتُمَا',
      '3md': 'مَالَا',
      '3fd': 'مَالَتَا',
      '1p': 'مِلْنَا',
      '2mp': 'مِلْتُمْ',
      '2fp': 'مِلْتُنَّ',
      '3mp': 'مَالُوا',
      '3fp': 'مِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('myl-1')!, 'indicative')).toEqualT({
      '1s': 'أَمِيلُ',
      '2ms': 'تَمِيلُ',
      '2fs': 'تَمِيلِينَ',
      '3ms': 'يَمِيلُ',
      '3fs': 'تَمِيلُ',
      '2d': 'تَمِيلَانِ',
      '3md': 'يَمِيلَانِ',
      '3fd': 'تَمِيلَانِ',
      '1p': 'نَمِيلُ',
      '2mp': 'تَمِيلُونَ',
      '2fp': 'تَمِلْنَ',
      '3mp': 'يَمِيلُونَ',
      '3fp': 'يَمِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('myl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَمِيلَ',
      '2ms': 'تَمِيلَ',
      '2fs': 'تَمِيلِي',
      '3ms': 'يَمِيلَ',
      '3fs': 'تَمِيلَ',
      '2d': 'تَمِيلَا',
      '3md': 'يَمِيلَا',
      '3fd': 'تَمِيلَا',
      '1p': 'نَمِيلَ',
      '2mp': 'تَمِيلُوا',
      '2fp': 'تَمِلْنَ',
      '3mp': 'يَمِيلُوا',
      '3fp': 'يَمِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('myl-1')!, 'jussive')).toEqualT({
      '1s': 'أَمِلْ',
      '2ms': 'تَمِلْ',
      '2fs': 'تَمِيلِي',
      '3ms': 'يَمِلْ',
      '3fs': 'تَمِلْ',
      '2d': 'تَمِيلَا',
      '3md': 'يَمِيلَا',
      '3fd': 'تَمِيلَا',
      '1p': 'نَمِلْ',
      '2mp': 'تَمِيلُوا',
      '2fp': 'تَمِلْنَ',
      '3mp': 'يَمِيلُوا',
      '3fp': 'يَمِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('myl-1')!)).toMatchObjectT({
      '2ms': 'مِلْ',
      '2fs': 'مِيلِي',
      '2d': 'مِيلَا',
      '2mp': 'مِيلُوا',
      '2fp': 'مِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('myl-1')!)).toMatchObjectT({
      '3ms': 'مِيلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('myl-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُمَالُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('myl-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُمَالَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('myl-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُمَلْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('myl-1')!)).toEqualT('مَائِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('myl-1')!)).toEqualT('مَمِيل')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('myl-1')!)).toEqualT(['مَيْل', 'مَيَلَان', 'مَيْلُولَة', 'تَمْيَال', 'مَمَال', 'مَمِيل'])
  })
})
