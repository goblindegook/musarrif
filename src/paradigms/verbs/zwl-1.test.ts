import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('zwl-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zwl-1')!)).toEqualT({
      '1s': 'زُلْتُ',
      '2ms': 'زُلْتَ',
      '2fs': 'زُلْتِ',
      '3ms': 'زَالَ',
      '3fs': 'زَالَتْ',
      '2d': 'زُلْتُمَا',
      '3md': 'زَالَا',
      '3fd': 'زَالَتَا',
      '1p': 'زُلْنَا',
      '2mp': 'زُلْتُمْ',
      '2fp': 'زُلْتُنَّ',
      '3mp': 'زَالُوا',
      '3fp': 'زُلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zwl-1')!, 'indicative')).toEqualT({
      '1s': 'أَزُولُ',
      '2ms': 'تَزُولُ',
      '2fs': 'تَزُولِينَ',
      '3ms': 'يَزُولُ',
      '3fs': 'تَزُولُ',
      '2d': 'تَزُولَانِ',
      '3md': 'يَزُولَانِ',
      '3fd': 'تَزُولَانِ',
      '1p': 'نَزُولُ',
      '2mp': 'تَزُولُونَ',
      '2fp': 'تَزُلْنَ',
      '3mp': 'يَزُولُونَ',
      '3fp': 'يَزُلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zwl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَزُولَ',
      '2ms': 'تَزُولَ',
      '2fs': 'تَزُولِي',
      '3ms': 'يَزُولَ',
      '3fs': 'تَزُولَ',
      '2d': 'تَزُولَا',
      '3md': 'يَزُولَا',
      '3fd': 'تَزُولَا',
      '1p': 'نَزُولَ',
      '2mp': 'تَزُولُوا',
      '2fp': 'تَزُلْنَ',
      '3mp': 'يَزُولُوا',
      '3fp': 'يَزُلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zwl-1')!, 'jussive')).toEqualT({
      '1s': 'أَزُلْ',
      '2ms': 'تَزُلْ',
      '2fs': 'تَزُولِي',
      '3ms': 'يَزُلْ',
      '3fs': 'تَزُلْ',
      '2d': 'تَزُولَا',
      '3md': 'يَزُولَا',
      '3fd': 'تَزُولَا',
      '1p': 'نَزُلْ',
      '2mp': 'تَزُولُوا',
      '2fp': 'تَزُلْنَ',
      '3mp': 'يَزُولُوا',
      '3fp': 'يَزُلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('zwl-1')!)).toMatchObjectT({
      '2ms': 'زُلْ',
      '2fs': 'زُولِي',
      '2d': 'زُولَا',
      '2mp': 'زُولُوا',
      '2fp': 'زُلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('zwl-1')!)).toMatchObjectT({
      '3ms': 'زِيلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('zwl-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُزَالُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zwl-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُزَالَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zwl-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُزَلْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('zwl-1')!)).toEqualT('زَائِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('zwl-1')!)).toEqualT('مَزُول')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('zwl-1')!)).toEqualT(['زَوَال'])
  })
})
