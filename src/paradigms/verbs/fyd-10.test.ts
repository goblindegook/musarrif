import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('fyd-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('fyd-10')!)).toEqualT({
      '1s': 'اِسْتَفَدْتُ',
      '2ms': 'اِسْتَفَدْتَ',
      '2fs': 'اِسْتَفَدْتِ',
      '3ms': 'اِسْتَفَادَ',
      '3fs': 'اِسْتَفَادَتْ',
      '2d': 'اِسْتَفَدْتُمَا',
      '3md': 'اِسْتَفَادَا',
      '3fd': 'اِسْتَفَادَتَا',
      '1p': 'اِسْتَفَدْنَا',
      '2mp': 'اِسْتَفَدْتُمْ',
      '2fp': 'اِسْتَفَدْتُنَّ',
      '3mp': 'اِسْتَفَادُوا',
      '3fp': 'اِسْتَفَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('fyd-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَفِيدُ',
      '2ms': 'تَسْتَفِيدُ',
      '2fs': 'تَسْتَفِيدِينَ',
      '3ms': 'يَسْتَفِيدُ',
      '3fs': 'تَسْتَفِيدُ',
      '2d': 'تَسْتَفِيدَانِ',
      '3md': 'يَسْتَفِيدَانِ',
      '3fd': 'تَسْتَفِيدَانِ',
      '1p': 'نَسْتَفِيدُ',
      '2mp': 'تَسْتَفِيدُونَ',
      '2fp': 'تَسْتَفِدْنَ',
      '3mp': 'يَسْتَفِيدُونَ',
      '3fp': 'يَسْتَفِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('fyd-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَفِيدَ',
      '2ms': 'تَسْتَفِيدَ',
      '2fs': 'تَسْتَفِيدِي',
      '3ms': 'يَسْتَفِيدَ',
      '3fs': 'تَسْتَفِيدَ',
      '2d': 'تَسْتَفِيدَا',
      '3md': 'يَسْتَفِيدَا',
      '3fd': 'تَسْتَفِيدَا',
      '1p': 'نَسْتَفِيدَ',
      '2mp': 'تَسْتَفِيدُوا',
      '2fp': 'تَسْتَفِدْنَ',
      '3mp': 'يَسْتَفِيدُوا',
      '3fp': 'يَسْتَفِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('fyd-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَفِدْ',
      '2ms': 'تَسْتَفِدْ',
      '2fs': 'تَسْتَفِيدِي',
      '3ms': 'يَسْتَفِدْ',
      '3fs': 'تَسْتَفِدْ',
      '2d': 'تَسْتَفِيدَا',
      '3md': 'يَسْتَفِيدَا',
      '3fd': 'تَسْتَفِيدَا',
      '1p': 'نَسْتَفِدْ',
      '2mp': 'تَسْتَفِيدُوا',
      '2fp': 'تَسْتَفِدْنَ',
      '3mp': 'يَسْتَفِيدُوا',
      '3fp': 'يَسْتَفِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('fyd-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَفِدْ',
      '2fs': 'اِسْتَفِيدِي',
      '2d': 'اِسْتَفِيدَا',
      '2mp': 'اِسْتَفِيدُوا',
      '2fp': 'اِسْتَفِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('fyd-10')!)).toEqualT({
      '1s': 'اُسْتُفِدْتُ',
      '2ms': 'اُسْتُفِدْتَ',
      '2fs': 'اُسْتُفِدْتِ',
      '3ms': 'اُسْتُفِيدَ',
      '3fs': 'اُسْتُفِيدَتْ',
      '2d': 'اُسْتُفِدْتُمَا',
      '3md': 'اُسْتُفِيدَا',
      '3fd': 'اُسْتُفِيدَتَا',
      '1p': 'اُسْتُفِدْنَا',
      '2mp': 'اُسْتُفِدْتُمْ',
      '2fp': 'اُسْتُفِدْتُنَّ',
      '3mp': 'اُسْتُفِيدُوا',
      '3fp': 'اُسْتُفِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('fyd-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَفَادُ',
      '2ms': 'تُسْتَفَادُ',
      '2fs': 'تُسْتَفَادِينَ',
      '3ms': 'يُسْتَفَادُ',
      '3fs': 'تُسْتَفَادُ',
      '2d': 'تُسْتَفَادَانِ',
      '3md': 'يُسْتَفَادَانِ',
      '3fd': 'تُسْتَفَادَانِ',
      '1p': 'نُسْتَفَادُ',
      '2mp': 'تُسْتَفَادُونَ',
      '2fp': 'تُسْتَفَدْنَ',
      '3mp': 'يُسْتَفَادُونَ',
      '3fp': 'يُسْتَفَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('fyd-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَفَادَ',
      '2ms': 'تُسْتَفَادَ',
      '2fs': 'تُسْتَفَادِي',
      '3ms': 'يُسْتَفَادَ',
      '3fs': 'تُسْتَفَادَ',
      '2d': 'تُسْتَفَادَا',
      '3md': 'يُسْتَفَادَا',
      '3fd': 'تُسْتَفَادَا',
      '1p': 'نُسْتَفَادَ',
      '2mp': 'تُسْتَفَادُوا',
      '2fp': 'تُسْتَفَدْنَ',
      '3mp': 'يُسْتَفَادُوا',
      '3fp': 'يُسْتَفَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('fyd-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَفَدْ',
      '2ms': 'تُسْتَفَدْ',
      '2fs': 'تُسْتَفَادِي',
      '3ms': 'يُسْتَفَدْ',
      '3fs': 'تُسْتَفَدْ',
      '2d': 'تُسْتَفَادَا',
      '3md': 'يُسْتَفَادَا',
      '3fd': 'تُسْتَفَادَا',
      '1p': 'نُسْتَفَدْ',
      '2mp': 'تُسْتَفَادُوا',
      '2fp': 'تُسْتَفَدْنَ',
      '3mp': 'يُسْتَفَادُوا',
      '3fp': 'يُسْتَفَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('fyd-10')!)).toEqualT('مُسْتَفِيد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('fyd-10')!)).toEqualT('مُسْتَفَاد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('fyd-10')!)).toEqualT(['اِسْتِفَادَة'])
  })
})
