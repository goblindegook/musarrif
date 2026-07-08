import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xyr-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xyr-8')!)).toEqualT({
      '1s': 'اِخْتَرْتُ',
      '2ms': 'اِخْتَرْتَ',
      '2fs': 'اِخْتَرْتِ',
      '3ms': 'اِخْتَارَ',
      '3fs': 'اِخْتَارَتْ',
      '2d': 'اِخْتَرْتُمَا',
      '3md': 'اِخْتَارَا',
      '3fd': 'اِخْتَارَتَا',
      '1p': 'اِخْتَرْنَا',
      '2mp': 'اِخْتَرْتُمْ',
      '2fp': 'اِخْتَرْتُنَّ',
      '3mp': 'اِخْتَارُوا',
      '3fp': 'اِخْتَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xyr-8')!, 'indicative')).toEqualT({
      '1s': 'أَخْتَارُ',
      '2ms': 'تَخْتَارُ',
      '2fs': 'تَخْتَارِينَ',
      '3ms': 'يَخْتَارُ',
      '3fs': 'تَخْتَارُ',
      '2d': 'تَخْتَارَانِ',
      '3md': 'يَخْتَارَانِ',
      '3fd': 'تَخْتَارَانِ',
      '1p': 'نَخْتَارُ',
      '2mp': 'تَخْتَارُونَ',
      '2fp': 'تَخْتَرْنَ',
      '3mp': 'يَخْتَارُونَ',
      '3fp': 'يَخْتَرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xyr-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَخْتَارَ',
      '2ms': 'تَخْتَارَ',
      '2fs': 'تَخْتَارِي',
      '3ms': 'يَخْتَارَ',
      '3fs': 'تَخْتَارَ',
      '2d': 'تَخْتَارَا',
      '3md': 'يَخْتَارَا',
      '3fd': 'تَخْتَارَا',
      '1p': 'نَخْتَارَ',
      '2mp': 'تَخْتَارُوا',
      '2fp': 'تَخْتَرْنَ',
      '3mp': 'يَخْتَارُوا',
      '3fp': 'يَخْتَرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xyr-8')!, 'jussive')).toEqualT({
      '1s': 'أَخْتَرْ',
      '2ms': 'تَخْتَرْ',
      '2fs': 'تَخْتَارِي',
      '3ms': 'يَخْتَرْ',
      '3fs': 'تَخْتَرْ',
      '2d': 'تَخْتَارَا',
      '3md': 'يَخْتَارَا',
      '3fd': 'تَخْتَارَا',
      '1p': 'نَخْتَرْ',
      '2mp': 'تَخْتَارُوا',
      '2fp': 'تَخْتَرْنَ',
      '3mp': 'يَخْتَارُوا',
      '3fp': 'يَخْتَرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xyr-8')!)).toMatchObjectT({
      '2ms': 'اِخْتَرْ',
      '2fs': 'اِخْتَارِي',
      '2d': 'اِخْتَارَا',
      '2mp': 'اِخْتَارُوا',
      '2fp': 'اِخْتَرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xyr-8')!)).toEqualT({
      '1s': 'اُخْتِرْتُ',
      '2ms': 'اُخْتِرْتَ',
      '2fs': 'اُخْتِرْتِ',
      '3ms': 'اُخْتِيرَ',
      '3fs': 'اُخْتِيرَتْ',
      '2d': 'اُخْتِرْتُمَا',
      '3md': 'اُخْتِيرَا',
      '3fd': 'اُخْتِيرَتَا',
      '1p': 'اُخْتِرْنَا',
      '2mp': 'اُخْتِرْتُمْ',
      '2fp': 'اُخْتِرْتُنَّ',
      '3mp': 'اُخْتِيرُوا',
      '3fp': 'اُخْتِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-8')!, 'indicative')).toEqualT({
      '1s': 'أُخْتَارُ',
      '2ms': 'تُخْتَارُ',
      '2fs': 'تُخْتَارِينَ',
      '3ms': 'يُخْتَارُ',
      '3fs': 'تُخْتَارُ',
      '2d': 'تُخْتَارَانِ',
      '3md': 'يُخْتَارَانِ',
      '3fd': 'تُخْتَارَانِ',
      '1p': 'نُخْتَارُ',
      '2mp': 'تُخْتَارُونَ',
      '2fp': 'تُخْتَرْنَ',
      '3mp': 'يُخْتَارُونَ',
      '3fp': 'يُخْتَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُخْتَارَ',
      '2ms': 'تُخْتَارَ',
      '2fs': 'تُخْتَارِي',
      '3ms': 'يُخْتَارَ',
      '3fs': 'تُخْتَارَ',
      '2d': 'تُخْتَارَا',
      '3md': 'يُخْتَارَا',
      '3fd': 'تُخْتَارَا',
      '1p': 'نُخْتَارَ',
      '2mp': 'تُخْتَارُوا',
      '2fp': 'تُخْتَرْنَ',
      '3mp': 'يُخْتَارُوا',
      '3fp': 'يُخْتَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-8')!, 'jussive')).toEqualT({
      '1s': 'أُخْتَرْ',
      '2ms': 'تُخْتَرْ',
      '2fs': 'تُخْتَارِي',
      '3ms': 'يُخْتَرْ',
      '3fs': 'تُخْتَرْ',
      '2d': 'تُخْتَارَا',
      '3md': 'يُخْتَارَا',
      '3fd': 'تُخْتَارَا',
      '1p': 'نُخْتَرْ',
      '2mp': 'تُخْتَارُوا',
      '2fp': 'تُخْتَرْنَ',
      '3mp': 'يُخْتَارُوا',
      '3fp': 'يُخْتَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xyr-8')!)).toEqualT('مُخْتَار')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xyr-8')!)).toEqualT('مُخْتَار')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('xyr-8')!)).toEqualT(['اِخْتِيَار', 'خِيرَة', 'خِيَار'])
  })
})
