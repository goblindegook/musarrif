import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('yqZ-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('yqZ-10')!)).toEqualT({
      '1s': 'اِسْتَيْقَظْتُ',
      '2ms': 'اِسْتَيْقَظْتَ',
      '2fs': 'اِسْتَيْقَظْتِ',
      '3ms': 'اِسْتَيْقَظَ',
      '3fs': 'اِسْتَيْقَظَتْ',
      '2d': 'اِسْتَيْقَظْتُمَا',
      '3md': 'اِسْتَيْقَظَا',
      '3fd': 'اِسْتَيْقَظَتَا',
      '1p': 'اِسْتَيْقَظْنَا',
      '2mp': 'اِسْتَيْقَظْتُمْ',
      '2fp': 'اِسْتَيْقَظْتُنَّ',
      '3mp': 'اِسْتَيْقَظُوا',
      '3fp': 'اِسْتَيْقَظْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('yqZ-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَيْقِظُ',
      '2ms': 'تَسْتَيْقِظُ',
      '2fs': 'تَسْتَيْقِظِينَ',
      '3ms': 'يَسْتَيْقِظُ',
      '3fs': 'تَسْتَيْقِظُ',
      '2d': 'تَسْتَيْقِظَانِ',
      '3md': 'يَسْتَيْقِظَانِ',
      '3fd': 'تَسْتَيْقِظَانِ',
      '1p': 'نَسْتَيْقِظُ',
      '2mp': 'تَسْتَيْقِظُونَ',
      '2fp': 'تَسْتَيْقِظْنَ',
      '3mp': 'يَسْتَيْقِظُونَ',
      '3fp': 'يَسْتَيْقِظْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('yqZ-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَيْقِظَ',
      '2ms': 'تَسْتَيْقِظَ',
      '2fs': 'تَسْتَيْقِظِي',
      '3ms': 'يَسْتَيْقِظَ',
      '3fs': 'تَسْتَيْقِظَ',
      '2d': 'تَسْتَيْقِظَا',
      '3md': 'يَسْتَيْقِظَا',
      '3fd': 'تَسْتَيْقِظَا',
      '1p': 'نَسْتَيْقِظَ',
      '2mp': 'تَسْتَيْقِظُوا',
      '2fp': 'تَسْتَيْقِظْنَ',
      '3mp': 'يَسْتَيْقِظُوا',
      '3fp': 'يَسْتَيْقِظْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('yqZ-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَيْقِظْ',
      '2ms': 'تَسْتَيْقِظْ',
      '2fs': 'تَسْتَيْقِظِي',
      '3ms': 'يَسْتَيْقِظْ',
      '3fs': 'تَسْتَيْقِظْ',
      '2d': 'تَسْتَيْقِظَا',
      '3md': 'يَسْتَيْقِظَا',
      '3fd': 'تَسْتَيْقِظَا',
      '1p': 'نَسْتَيْقِظْ',
      '2mp': 'تَسْتَيْقِظُوا',
      '2fp': 'تَسْتَيْقِظْنَ',
      '3mp': 'يَسْتَيْقِظُوا',
      '3fp': 'يَسْتَيْقِظْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('yqZ-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَيْقِظْ',
      '2fs': 'اِسْتَيْقِظِي',
      '2d': 'اِسْتَيْقِظَا',
      '2mp': 'اِسْتَيْقِظُوا',
      '2fp': 'اِسْتَيْقِظْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('yqZ-10')!)).toEqualT({
      '1s': 'اُسْتُوقِظْتُ',
      '2ms': 'اُسْتُوقِظْتَ',
      '2fs': 'اُسْتُوقِظْتِ',
      '3ms': 'اُسْتُوقِظَ',
      '3fs': 'اُسْتُوقِظَتْ',
      '2d': 'اُسْتُوقِظْتُمَا',
      '3md': 'اُسْتُوقِظَا',
      '3fd': 'اُسْتُوقِظَتَا',
      '1p': 'اُسْتُوقِظْنَا',
      '2mp': 'اُسْتُوقِظْتُمْ',
      '2fp': 'اُسْتُوقِظْتُنَّ',
      '3mp': 'اُسْتُوقِظُوا',
      '3fp': 'اُسْتُوقِظْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('yqZ-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَيْقَظُ',
      '2ms': 'تُسْتَيْقَظُ',
      '2fs': 'تُسْتَيْقَظِينَ',
      '3ms': 'يُسْتَيْقَظُ',
      '3fs': 'تُسْتَيْقَظُ',
      '2d': 'تُسْتَيْقَظَانِ',
      '3md': 'يُسْتَيْقَظَانِ',
      '3fd': 'تُسْتَيْقَظَانِ',
      '1p': 'نُسْتَيْقَظُ',
      '2mp': 'تُسْتَيْقَظُونَ',
      '2fp': 'تُسْتَيْقَظْنَ',
      '3mp': 'يُسْتَيْقَظُونَ',
      '3fp': 'يُسْتَيْقَظْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('yqZ-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَيْقَظَ',
      '2ms': 'تُسْتَيْقَظَ',
      '2fs': 'تُسْتَيْقَظِي',
      '3ms': 'يُسْتَيْقَظَ',
      '3fs': 'تُسْتَيْقَظَ',
      '2d': 'تُسْتَيْقَظَا',
      '3md': 'يُسْتَيْقَظَا',
      '3fd': 'تُسْتَيْقَظَا',
      '1p': 'نُسْتَيْقَظَ',
      '2mp': 'تُسْتَيْقَظُوا',
      '2fp': 'تُسْتَيْقَظْنَ',
      '3mp': 'يُسْتَيْقَظُوا',
      '3fp': 'يُسْتَيْقَظْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('yqZ-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَيْقَظْ',
      '2ms': 'تُسْتَيْقَظْ',
      '2fs': 'تُسْتَيْقَظِي',
      '3ms': 'يُسْتَيْقَظْ',
      '3fs': 'تُسْتَيْقَظْ',
      '2d': 'تُسْتَيْقَظَا',
      '3md': 'يُسْتَيْقَظَا',
      '3fd': 'تُسْتَيْقَظَا',
      '1p': 'نُسْتَيْقَظْ',
      '2mp': 'تُسْتَيْقَظُوا',
      '2fp': 'تُسْتَيْقَظْنَ',
      '3mp': 'يُسْتَيْقَظُوا',
      '3fp': 'يُسْتَيْقَظْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('yqZ-10')!)).toEqualT('مُسْتَيْقِظ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('yqZ-10')!)).toEqualT('مُسْتَيْقَظ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('yqZ-10')!))).toEqualT(new Set(['اِسْتِيقَاظ']))
  })
})
