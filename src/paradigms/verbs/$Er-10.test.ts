import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$Er-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$Er-10')!)).toEqualT({
      '1s': 'اِسْتَشْعَرْتُ',
      '2ms': 'اِسْتَشْعَرْتَ',
      '2fs': 'اِسْتَشْعَرْتِ',
      '3ms': 'اِسْتَشْعَرَ',
      '3fs': 'اِسْتَشْعَرَتْ',
      '2d': 'اِسْتَشْعَرْتُمَا',
      '3md': 'اِسْتَشْعَرَا',
      '3fd': 'اِسْتَشْعَرَتَا',
      '1p': 'اِسْتَشْعَرْنَا',
      '2mp': 'اِسْتَشْعَرْتُمْ',
      '2fp': 'اِسْتَشْعَرْتُنَّ',
      '3mp': 'اِسْتَشْعَرُوا',
      '3fp': 'اِسْتَشْعَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$Er-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَشْعِرُ',
      '2ms': 'تَسْتَشْعِرُ',
      '2fs': 'تَسْتَشْعِرِينَ',
      '3ms': 'يَسْتَشْعِرُ',
      '3fs': 'تَسْتَشْعِرُ',
      '2d': 'تَسْتَشْعِرَانِ',
      '3md': 'يَسْتَشْعِرَانِ',
      '3fd': 'تَسْتَشْعِرَانِ',
      '1p': 'نَسْتَشْعِرُ',
      '2mp': 'تَسْتَشْعِرُونَ',
      '2fp': 'تَسْتَشْعِرْنَ',
      '3mp': 'يَسْتَشْعِرُونَ',
      '3fp': 'يَسْتَشْعِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$Er-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَشْعِرَ',
      '2ms': 'تَسْتَشْعِرَ',
      '2fs': 'تَسْتَشْعِرِي',
      '3ms': 'يَسْتَشْعِرَ',
      '3fs': 'تَسْتَشْعِرَ',
      '2d': 'تَسْتَشْعِرَا',
      '3md': 'يَسْتَشْعِرَا',
      '3fd': 'تَسْتَشْعِرَا',
      '1p': 'نَسْتَشْعِرَ',
      '2mp': 'تَسْتَشْعِرُوا',
      '2fp': 'تَسْتَشْعِرْنَ',
      '3mp': 'يَسْتَشْعِرُوا',
      '3fp': 'يَسْتَشْعِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$Er-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَشْعِرْ',
      '2ms': 'تَسْتَشْعِرْ',
      '2fs': 'تَسْتَشْعِرِي',
      '3ms': 'يَسْتَشْعِرْ',
      '3fs': 'تَسْتَشْعِرْ',
      '2d': 'تَسْتَشْعِرَا',
      '3md': 'يَسْتَشْعِرَا',
      '3fd': 'تَسْتَشْعِرَا',
      '1p': 'نَسْتَشْعِرْ',
      '2mp': 'تَسْتَشْعِرُوا',
      '2fp': 'تَسْتَشْعِرْنَ',
      '3mp': 'يَسْتَشْعِرُوا',
      '3fp': 'يَسْتَشْعِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$Er-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَشْعِرْ',
      '2fs': 'اِسْتَشْعِرِي',
      '2d': 'اِسْتَشْعِرَا',
      '2mp': 'اِسْتَشْعِرُوا',
      '2fp': 'اِسْتَشْعِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$Er-10')!)).toEqualT({
      '1s': 'اُسْتُشْعِرْتُ',
      '2ms': 'اُسْتُشْعِرْتَ',
      '2fs': 'اُسْتُشْعِرْتِ',
      '3ms': 'اُسْتُشْعِرَ',
      '3fs': 'اُسْتُشْعِرَتْ',
      '2d': 'اُسْتُشْعِرْتُمَا',
      '3md': 'اُسْتُشْعِرَا',
      '3fd': 'اُسْتُشْعِرَتَا',
      '1p': 'اُسْتُشْعِرْنَا',
      '2mp': 'اُسْتُشْعِرْتُمْ',
      '2fp': 'اُسْتُشْعِرْتُنَّ',
      '3mp': 'اُسْتُشْعِرُوا',
      '3fp': 'اُسْتُشْعِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$Er-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَشْعَرُ',
      '2ms': 'تُسْتَشْعَرُ',
      '2fs': 'تُسْتَشْعَرِينَ',
      '3ms': 'يُسْتَشْعَرُ',
      '3fs': 'تُسْتَشْعَرُ',
      '2d': 'تُسْتَشْعَرَانِ',
      '3md': 'يُسْتَشْعَرَانِ',
      '3fd': 'تُسْتَشْعَرَانِ',
      '1p': 'نُسْتَشْعَرُ',
      '2mp': 'تُسْتَشْعَرُونَ',
      '2fp': 'تُسْتَشْعَرْنَ',
      '3mp': 'يُسْتَشْعَرُونَ',
      '3fp': 'يُسْتَشْعَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$Er-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَشْعَرَ',
      '2ms': 'تُسْتَشْعَرَ',
      '2fs': 'تُسْتَشْعَرِي',
      '3ms': 'يُسْتَشْعَرَ',
      '3fs': 'تُسْتَشْعَرَ',
      '2d': 'تُسْتَشْعَرَا',
      '3md': 'يُسْتَشْعَرَا',
      '3fd': 'تُسْتَشْعَرَا',
      '1p': 'نُسْتَشْعَرَ',
      '2mp': 'تُسْتَشْعَرُوا',
      '2fp': 'تُسْتَشْعَرْنَ',
      '3mp': 'يُسْتَشْعَرُوا',
      '3fp': 'يُسْتَشْعَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$Er-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَشْعَرْ',
      '2ms': 'تُسْتَشْعَرْ',
      '2fs': 'تُسْتَشْعَرِي',
      '3ms': 'يُسْتَشْعَرْ',
      '3fs': 'تُسْتَشْعَرْ',
      '2d': 'تُسْتَشْعَرَا',
      '3md': 'يُسْتَشْعَرَا',
      '3fd': 'تُسْتَشْعَرَا',
      '1p': 'نُسْتَشْعَرْ',
      '2mp': 'تُسْتَشْعَرُوا',
      '2fp': 'تُسْتَشْعَرْنَ',
      '3mp': 'يُسْتَشْعَرُوا',
      '3fp': 'يُسْتَشْعَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$Er-10')!)).toEqualT('مُسْتَشْعِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$Er-10')!)).toEqualT('مُسْتَشْعَر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$Er-10')!))).toEqualT(new Set(['اِسْتِشْعَار']))
  })
})
