import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mdd-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mdd-10')!)).toEqualT({
      '1s': 'اِسْتَمْدَدْتُ',
      '2ms': 'اِسْتَمْدَدْتَ',
      '2fs': 'اِسْتَمْدَدْتِ',
      '3ms': 'اِسْتَمَدَّ',
      '3fs': 'اِسْتَمَدَّتْ',
      '2d': 'اِسْتَمْدَدْتُمَا',
      '3md': 'اِسْتَمَدَّا',
      '3fd': 'اِسْتَمَدَّتَا',
      '1p': 'اِسْتَمْدَدْنَا',
      '2mp': 'اِسْتَمْدَدْتُمْ',
      '2fp': 'اِسْتَمْدَدْتُنَّ',
      '3mp': 'اِسْتَمَدُّوا',
      '3fp': 'اِسْتَمْدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mdd-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَمِدُّ',
      '2ms': 'تَسْتَمِدُّ',
      '2fs': 'تَسْتَمِدِّينَ',
      '3ms': 'يَسْتَمِدُّ',
      '3fs': 'تَسْتَمِدُّ',
      '2d': 'تَسْتَمِدَّانِ',
      '3md': 'يَسْتَمِدَّانِ',
      '3fd': 'تَسْتَمِدَّانِ',
      '1p': 'نَسْتَمِدُّ',
      '2mp': 'تَسْتَمِدُّونَ',
      '2fp': 'تَسْتَمْدِدْنَ',
      '3mp': 'يَسْتَمِدُّونَ',
      '3fp': 'يَسْتَمْدِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَمِدَّ',
      '2ms': 'تَسْتَمِدَّ',
      '2fs': 'تَسْتَمِدِّي',
      '3ms': 'يَسْتَمِدَّ',
      '3fs': 'تَسْتَمِدَّ',
      '2d': 'تَسْتَمِدَّا',
      '3md': 'يَسْتَمِدَّا',
      '3fd': 'تَسْتَمِدَّا',
      '1p': 'نَسْتَمِدَّ',
      '2mp': 'تَسْتَمِدُّوا',
      '2fp': 'تَسْتَمْدِدْنَ',
      '3mp': 'يَسْتَمِدُّوا',
      '3fp': 'يَسْتَمْدِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَمِدَّ',
      '2ms': 'تَسْتَمِدَّ',
      '2fs': 'تَسْتَمِدِّي',
      '3ms': 'يَسْتَمِدَّ',
      '3fs': 'تَسْتَمِدَّ',
      '2d': 'تَسْتَمِدَّا',
      '3md': 'يَسْتَمِدَّا',
      '3fd': 'تَسْتَمِدَّا',
      '1p': 'نَسْتَمِدَّ',
      '2mp': 'تَسْتَمِدُّوا',
      '2fp': 'تَسْتَمْدِدْنَ',
      '3mp': 'يَسْتَمِدُّوا',
      '3fp': 'يَسْتَمْدِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mdd-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَمِدَّ',
      '2fs': 'اِسْتَمِدِّي',
      '2d': 'اِسْتَمِدَّا',
      '2mp': 'اِسْتَمِدُّوا',
      '2fp': 'اِسْتَمْدِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mdd-10')!)).toEqualT({
      '1s': 'اُسْتُمْدِدْتُ',
      '2ms': 'اُسْتُمْدِدْتَ',
      '2fs': 'اُسْتُمْدِدْتِ',
      '3ms': 'اُسْتُمِدَّ',
      '3fs': 'اُسْتُمِدَّتْ',
      '2d': 'اُسْتُمْدِدْتُمَا',
      '3md': 'اُسْتُمِدَّا',
      '3fd': 'اُسْتُمِدَّتَا',
      '1p': 'اُسْتُمْدِدْنَا',
      '2mp': 'اُسْتُمْدِدْتُمْ',
      '2fp': 'اُسْتُمْدِدْتُنَّ',
      '3mp': 'اُسْتُمِدُّوا',
      '3fp': 'اُسْتُمْدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَمَدُّ',
      '2ms': 'تُسْتَمَدُّ',
      '2fs': 'تُسْتَمَدِّينَ',
      '3ms': 'يُسْتَمَدُّ',
      '3fs': 'تُسْتَمَدُّ',
      '2d': 'تُسْتَمَدَّانِ',
      '3md': 'يُسْتَمَدَّانِ',
      '3fd': 'تُسْتَمَدَّانِ',
      '1p': 'نُسْتَمَدُّ',
      '2mp': 'تُسْتَمَدُّونَ',
      '2fp': 'تُسْتَمْدَدْنَ',
      '3mp': 'يُسْتَمَدُّونَ',
      '3fp': 'يُسْتَمْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَمَدَّ',
      '2ms': 'تُسْتَمَدَّ',
      '2fs': 'تُسْتَمَدِّي',
      '3ms': 'يُسْتَمَدَّ',
      '3fs': 'تُسْتَمَدَّ',
      '2d': 'تُسْتَمَدَّا',
      '3md': 'يُسْتَمَدَّا',
      '3fd': 'تُسْتَمَدَّا',
      '1p': 'نُسْتَمَدَّ',
      '2mp': 'تُسْتَمَدُّوا',
      '2fp': 'تُسْتَمْدَدْنَ',
      '3mp': 'يُسْتَمَدُّوا',
      '3fp': 'يُسْتَمْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَمَدَّ',
      '2ms': 'تُسْتَمَدَّ',
      '2fs': 'تُسْتَمَدِّي',
      '3ms': 'يُسْتَمَدَّ',
      '3fs': 'تُسْتَمَدَّ',
      '2d': 'تُسْتَمَدَّا',
      '3md': 'يُسْتَمَدَّا',
      '3fd': 'تُسْتَمَدَّا',
      '1p': 'نُسْتَمَدَّ',
      '2mp': 'تُسْتَمَدُّوا',
      '2fp': 'تُسْتَمْدَدْنَ',
      '3mp': 'يُسْتَمَدُّوا',
      '3fp': 'يُسْتَمْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mdd-10')!)).toEqualT('مُسْتَمِدّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mdd-10')!)).toEqualT('مُسْتَمَدّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mdd-10')!)).toEqualT(['اِسْتِمْدَاد'])
  })
})
