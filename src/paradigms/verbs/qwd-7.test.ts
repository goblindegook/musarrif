import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('qwd-7', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qwd-7')!)).toEqualT({
      '1s': 'اِنْقَدْتُ',
      '2ms': 'اِنْقَدْتَ',
      '2fs': 'اِنْقَدْتِ',
      '3ms': 'اِنْقَادَ',
      '3fs': 'اِنْقَادَتْ',
      '2d': 'اِنْقَدْتُمَا',
      '3md': 'اِنْقَادَا',
      '3fd': 'اِنْقَادَتَا',
      '1p': 'اِنْقَدْنَا',
      '2mp': 'اِنْقَدْتُمْ',
      '2fp': 'اِنْقَدْتُنَّ',
      '3mp': 'اِنْقَادُوا',
      '3fp': 'اِنْقَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qwd-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْقَادُ',
      '2ms': 'تَنْقَادُ',
      '2fs': 'تَنْقَادِينَ',
      '3ms': 'يَنْقَادُ',
      '3fs': 'تَنْقَادُ',
      '2d': 'تَنْقَادَانِ',
      '3md': 'يَنْقَادَانِ',
      '3fd': 'تَنْقَادَانِ',
      '1p': 'نَنْقَادُ',
      '2mp': 'تَنْقَادُونَ',
      '2fp': 'تَنْقَدْنَ',
      '3mp': 'يَنْقَادُونَ',
      '3fp': 'يَنْقَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qwd-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْقَادَ',
      '2ms': 'تَنْقَادَ',
      '2fs': 'تَنْقَادِي',
      '3ms': 'يَنْقَادَ',
      '3fs': 'تَنْقَادَ',
      '2d': 'تَنْقَادَا',
      '3md': 'يَنْقَادَا',
      '3fd': 'تَنْقَادَا',
      '1p': 'نَنْقَادَ',
      '2mp': 'تَنْقَادُوا',
      '2fp': 'تَنْقَدْنَ',
      '3mp': 'يَنْقَادُوا',
      '3fp': 'يَنْقَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qwd-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْقَدْ',
      '2ms': 'تَنْقَدْ',
      '2fs': 'تَنْقَادِي',
      '3ms': 'يَنْقَدْ',
      '3fs': 'تَنْقَدْ',
      '2d': 'تَنْقَادَا',
      '3md': 'يَنْقَادَا',
      '3fd': 'تَنْقَادَا',
      '1p': 'نَنْقَدْ',
      '2mp': 'تَنْقَادُوا',
      '2fp': 'تَنْقَدْنَ',
      '3mp': 'يَنْقَادُوا',
      '3fp': 'يَنْقَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qwd-7')!)).toMatchObjectT({
      '2ms': 'اِنْقَدْ',
      '2fs': 'اِنْقَادِي',
      '2d': 'اِنْقَادَا',
      '2mp': 'اِنْقَادُوا',
      '2fp': 'اِنْقَدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('qwd-7')!)).toMatchObjectT({
      '3ms': 'اُنْقِيدَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwd-7')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنْقَادُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwd-7')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنْقَادَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwd-7')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنْقَدْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qwd-7')!)).toEqualT('مُنْقَاد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('qwd-7')!)).toEqualT('مُنْقَاد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qwd-7')!)).toEqualT(['اِنْقِيَاد'])
  })
})
