import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wDH-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wDH-10')!)).toEqualT({
      '1s': 'اِسْتَوْضَحْتُ',
      '2ms': 'اِسْتَوْضَحْتَ',
      '2fs': 'اِسْتَوْضَحْتِ',
      '3ms': 'اِسْتَوْضَحَ',
      '3fs': 'اِسْتَوْضَحَتْ',
      '2d': 'اِسْتَوْضَحْتُمَا',
      '3md': 'اِسْتَوْضَحَا',
      '3fd': 'اِسْتَوْضَحَتَا',
      '1p': 'اِسْتَوْضَحْنَا',
      '2mp': 'اِسْتَوْضَحْتُمْ',
      '2fp': 'اِسْتَوْضَحْتُنَّ',
      '3mp': 'اِسْتَوْضَحُوا',
      '3fp': 'اِسْتَوْضَحْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wDH-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَوْضِحُ',
      '2ms': 'تَسْتَوْضِحُ',
      '2fs': 'تَسْتَوْضِحِينَ',
      '3ms': 'يَسْتَوْضِحُ',
      '3fs': 'تَسْتَوْضِحُ',
      '2d': 'تَسْتَوْضِحَانِ',
      '3md': 'يَسْتَوْضِحَانِ',
      '3fd': 'تَسْتَوْضِحَانِ',
      '1p': 'نَسْتَوْضِحُ',
      '2mp': 'تَسْتَوْضِحُونَ',
      '2fp': 'تَسْتَوْضِحْنَ',
      '3mp': 'يَسْتَوْضِحُونَ',
      '3fp': 'يَسْتَوْضِحْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَوْضِحَ',
      '2ms': 'تَسْتَوْضِحَ',
      '2fs': 'تَسْتَوْضِحِي',
      '3ms': 'يَسْتَوْضِحَ',
      '3fs': 'تَسْتَوْضِحَ',
      '2d': 'تَسْتَوْضِحَا',
      '3md': 'يَسْتَوْضِحَا',
      '3fd': 'تَسْتَوْضِحَا',
      '1p': 'نَسْتَوْضِحَ',
      '2mp': 'تَسْتَوْضِحُوا',
      '2fp': 'تَسْتَوْضِحْنَ',
      '3mp': 'يَسْتَوْضِحُوا',
      '3fp': 'يَسْتَوْضِحْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَوْضِحْ',
      '2ms': 'تَسْتَوْضِحْ',
      '2fs': 'تَسْتَوْضِحِي',
      '3ms': 'يَسْتَوْضِحْ',
      '3fs': 'تَسْتَوْضِحْ',
      '2d': 'تَسْتَوْضِحَا',
      '3md': 'يَسْتَوْضِحَا',
      '3fd': 'تَسْتَوْضِحَا',
      '1p': 'نَسْتَوْضِحْ',
      '2mp': 'تَسْتَوْضِحُوا',
      '2fp': 'تَسْتَوْضِحْنَ',
      '3mp': 'يَسْتَوْضِحُوا',
      '3fp': 'يَسْتَوْضِحْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wDH-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَوْضِحْ',
      '2fs': 'اِسْتَوْضِحِي',
      '2d': 'اِسْتَوْضِحَا',
      '2mp': 'اِسْتَوْضِحُوا',
      '2fp': 'اِسْتَوْضِحْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wDH-10')!)).toEqualT({
      '1s': 'اُسْتُوضِحْتُ',
      '2ms': 'اُسْتُوضِحْتَ',
      '2fs': 'اُسْتُوضِحْتِ',
      '3ms': 'اُسْتُوضِحَ',
      '3fs': 'اُسْتُوضِحَتْ',
      '2d': 'اُسْتُوضِحْتُمَا',
      '3md': 'اُسْتُوضِحَا',
      '3fd': 'اُسْتُوضِحَتَا',
      '1p': 'اُسْتُوضِحْنَا',
      '2mp': 'اُسْتُوضِحْتُمْ',
      '2fp': 'اُسْتُوضِحْتُنَّ',
      '3mp': 'اُسْتُوضِحُوا',
      '3fp': 'اُسْتُوضِحْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَوْضَحُ',
      '2ms': 'تُسْتَوْضَحُ',
      '2fs': 'تُسْتَوْضَحِينَ',
      '3ms': 'يُسْتَوْضَحُ',
      '3fs': 'تُسْتَوْضَحُ',
      '2d': 'تُسْتَوْضَحَانِ',
      '3md': 'يُسْتَوْضَحَانِ',
      '3fd': 'تُسْتَوْضَحَانِ',
      '1p': 'نُسْتَوْضَحُ',
      '2mp': 'تُسْتَوْضَحُونَ',
      '2fp': 'تُسْتَوْضَحْنَ',
      '3mp': 'يُسْتَوْضَحُونَ',
      '3fp': 'يُسْتَوْضَحْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَوْضَحَ',
      '2ms': 'تُسْتَوْضَحَ',
      '2fs': 'تُسْتَوْضَحِي',
      '3ms': 'يُسْتَوْضَحَ',
      '3fs': 'تُسْتَوْضَحَ',
      '2d': 'تُسْتَوْضَحَا',
      '3md': 'يُسْتَوْضَحَا',
      '3fd': 'تُسْتَوْضَحَا',
      '1p': 'نُسْتَوْضَحَ',
      '2mp': 'تُسْتَوْضَحُوا',
      '2fp': 'تُسْتَوْضَحْنَ',
      '3mp': 'يُسْتَوْضَحُوا',
      '3fp': 'يُسْتَوْضَحْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَوْضَحْ',
      '2ms': 'تُسْتَوْضَحْ',
      '2fs': 'تُسْتَوْضَحِي',
      '3ms': 'يُسْتَوْضَحْ',
      '3fs': 'تُسْتَوْضَحْ',
      '2d': 'تُسْتَوْضَحَا',
      '3md': 'يُسْتَوْضَحَا',
      '3fd': 'تُسْتَوْضَحَا',
      '1p': 'نُسْتَوْضَحْ',
      '2mp': 'تُسْتَوْضَحُوا',
      '2fp': 'تُسْتَوْضَحْنَ',
      '3mp': 'يُسْتَوْضَحُوا',
      '3fp': 'يُسْتَوْضَحْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wDH-10')!)).toEqualT('مُسْتَوْضِح')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wDH-10')!)).toEqualT('مُسْتَوْضَح')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wDH-10')!))).toEqualT(new Set(['اِسْتِيضَاح']))
  })
})
