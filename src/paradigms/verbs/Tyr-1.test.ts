import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Tyr-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Tyr-1')!)).toEqualT({
      '1s': 'طِرْتُ',
      '2ms': 'طِرْتَ',
      '2fs': 'طِرْتِ',
      '3ms': 'طَارَ',
      '3fs': 'طَارَتْ',
      '2d': 'طِرْتُمَا',
      '3md': 'طَارَا',
      '3fd': 'طَارَتَا',
      '1p': 'طِرْنَا',
      '2mp': 'طِرْتُمْ',
      '2fp': 'طِرْتُنَّ',
      '3mp': 'طَارُوا',
      '3fp': 'طِرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Tyr-1')!, 'indicative')).toEqualT({
      '1s': 'أَطِيرُ',
      '2ms': 'تَطِيرُ',
      '2fs': 'تَطِيرِينَ',
      '3ms': 'يَطِيرُ',
      '3fs': 'تَطِيرُ',
      '2d': 'تَطِيرَانِ',
      '3md': 'يَطِيرَانِ',
      '3fd': 'تَطِيرَانِ',
      '1p': 'نَطِيرُ',
      '2mp': 'تَطِيرُونَ',
      '2fp': 'تَطِرْنَ',
      '3mp': 'يَطِيرُونَ',
      '3fp': 'يَطِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Tyr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَطِيرَ',
      '2ms': 'تَطِيرَ',
      '2fs': 'تَطِيرِي',
      '3ms': 'يَطِيرَ',
      '3fs': 'تَطِيرَ',
      '2d': 'تَطِيرَا',
      '3md': 'يَطِيرَا',
      '3fd': 'تَطِيرَا',
      '1p': 'نَطِيرَ',
      '2mp': 'تَطِيرُوا',
      '2fp': 'تَطِرْنَ',
      '3mp': 'يَطِيرُوا',
      '3fp': 'يَطِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Tyr-1')!, 'jussive')).toEqualT({
      '1s': 'أَطِرْ',
      '2ms': 'تَطِرْ',
      '2fs': 'تَطِيرِي',
      '3ms': 'يَطِرْ',
      '3fs': 'تَطِرْ',
      '2d': 'تَطِيرَا',
      '3md': 'يَطِيرَا',
      '3fd': 'تَطِيرَا',
      '1p': 'نَطِرْ',
      '2mp': 'تَطِيرُوا',
      '2fp': 'تَطِرْنَ',
      '3mp': 'يَطِيرُوا',
      '3fp': 'يَطِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Tyr-1')!)).toMatchObjectT({
      '2ms': 'طِرْ',
      '2fs': 'طِيرِي',
      '2d': 'طِيرَا',
      '2mp': 'طِيرُوا',
      '2fp': 'طِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Tyr-1')!)).toMatchObjectT({
      '3ms': 'طِيرَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tyr-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُطَارُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tyr-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُطَارَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tyr-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُطَرْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Tyr-1')!)).toEqualT('طَائِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Tyr-1')!)).toEqualT('مَطِير')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Tyr-1')!))).toEqualT(new Set(['طَيَرَان', 'طَيْر', 'طَيْرُورَة']))
  })
})
