import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-1')!)).toEqualT({
      '1s': 'وَفَيْتُ',
      '2ms': 'وَفَيْتَ',
      '2fs': 'وَفَيْتِ',
      '3ms': 'وَفَى',
      '3fs': 'وَفَتْ',
      '2d': 'وَفَيْتُمَا',
      '3md': 'وَفَيَا',
      '3fd': 'وَفَتَا',
      '1p': 'وَفَيْنَا',
      '2mp': 'وَفَيْتُمْ',
      '2fp': 'وَفَيْتُنَّ',
      '3mp': 'وَفَوْا',
      '3fp': 'وَفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-1')!, 'indicative')).toEqualT({
      '1s': 'أَفِي',
      '2ms': 'تَفِي',
      '2fs': 'تَفِينَ',
      '3ms': 'يَفِي',
      '3fs': 'تَفِي',
      '2d': 'تَفِيَانِ',
      '3md': 'يَفِيَانِ',
      '3fd': 'تَفِيَانِ',
      '1p': 'نَفِي',
      '2mp': 'تَفُونَ',
      '2fp': 'تَفِينَ',
      '3mp': 'يَفُونَ',
      '3fp': 'يَفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَفِيَ',
      '2ms': 'تَفِيَ',
      '2fs': 'تَفِي',
      '3ms': 'يَفِيَ',
      '3fs': 'تَفِيَ',
      '2d': 'تَفِيَا',
      '3md': 'يَفِيَا',
      '3fd': 'تَفِيَا',
      '1p': 'نَفِيَ',
      '2mp': 'تَفُوا',
      '2fp': 'تَفِينَ',
      '3mp': 'يَفُوا',
      '3fp': 'يَفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-1')!, 'jussive')).toEqualT({
      '1s': 'أَفِ',
      '2ms': 'تَفِ',
      '2fs': 'تَفِي',
      '3ms': 'يَفِ',
      '3fs': 'تَفِ',
      '2d': 'تَفِيَا',
      '3md': 'يَفِيَا',
      '3fd': 'تَفِيَا',
      '1p': 'نَفِ',
      '2mp': 'تَفُوا',
      '2fp': 'تَفِينَ',
      '3mp': 'يَفُوا',
      '3fp': 'يَفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-1')!)).toMatchObjectT({
      '2ms': 'فِ',
      '2fs': 'فِي',
      '2d': 'فِيَا',
      '2mp': 'فُوا',
      '2fp': 'فِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-1')!)).toMatchObjectT({
      '3ms': 'وُفِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُوفَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُوفَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُوفَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-1')!)).toEqualT('وَافٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-1')!)).toEqualT('مَوْفِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-1')!)).toEqualT(['وَفَاء'])
  })
})
