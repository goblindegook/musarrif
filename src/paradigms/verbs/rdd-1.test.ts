import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('rdd-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('rdd-1')!)).toEqualT({
      '1s': 'رَدَدْتُ',
      '2ms': 'رَدَدْتَ',
      '2fs': 'رَدَدْتِ',
      '3ms': 'رَدَّ',
      '3fs': 'رَدَّتْ',
      '2d': 'رَدَدْتُمَا',
      '3md': 'رَدَّا',
      '3fd': 'رَدَّتَا',
      '1p': 'رَدَدْنَا',
      '2mp': 'رَدَدْتُمْ',
      '2fp': 'رَدَدْتُنَّ',
      '3mp': 'رَدُّوا',
      '3fp': 'رَدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('rdd-1')!, 'indicative')).toEqualT({
      '1s': 'أَرُدُّ',
      '2ms': 'تَرُدُّ',
      '2fs': 'تَرُدِّينَ',
      '3ms': 'يَرُدُّ',
      '3fs': 'تَرُدُّ',
      '2d': 'تَرُدَّانِ',
      '3md': 'يَرُدَّانِ',
      '3fd': 'تَرُدَّانِ',
      '1p': 'نَرُدُّ',
      '2mp': 'تَرُدُّونَ',
      '2fp': 'تَرْدُدْنَ',
      '3mp': 'يَرُدُّونَ',
      '3fp': 'يَرْدُدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَرُدَّ',
      '2ms': 'تَرُدَّ',
      '2fs': 'تَرُدِّي',
      '3ms': 'يَرُدَّ',
      '3fs': 'تَرُدَّ',
      '2d': 'تَرُدَّا',
      '3md': 'يَرُدَّا',
      '3fd': 'تَرُدَّا',
      '1p': 'نَرُدَّ',
      '2mp': 'تَرُدُّوا',
      '2fp': 'تَرْدُدْنَ',
      '3mp': 'يَرُدُّوا',
      '3fp': 'يَرْدُدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-1')!, 'jussive')).toEqualT({
      '1s': 'أَرُدَّ',
      '2ms': 'تَرُدَّ',
      '2fs': 'تَرُدِّي',
      '3ms': 'يَرُدَّ',
      '3fs': 'تَرُدَّ',
      '2d': 'تَرُدَّا',
      '3md': 'يَرُدَّا',
      '3fd': 'تَرُدَّا',
      '1p': 'نَرُدَّ',
      '2mp': 'تَرُدُّوا',
      '2fp': 'تَرْدُدْنَ',
      '3mp': 'يَرُدُّوا',
      '3fp': 'يَرْدُدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('rdd-1')!)).toMatchObjectT({
      '2ms': 'رُدَّ',
      '2fs': 'رُدِّي',
      '2d': 'رُدَّا',
      '2mp': 'رُدُّوا',
      '2fp': 'اُرْدُدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('rdd-1')!)).toEqualT({
      '1s': 'رُدِدْتُ',
      '2ms': 'رُدِدْتَ',
      '2fs': 'رُدِدْتِ',
      '3ms': 'رُدَّ',
      '3fs': 'رُدَّتْ',
      '2d': 'رُدِدْتُمَا',
      '3md': 'رُدَّا',
      '3fd': 'رُدَّتَا',
      '1p': 'رُدِدْنَا',
      '2mp': 'رُدِدْتُمْ',
      '2fp': 'رُدِدْتُنَّ',
      '3mp': 'رُدُّوا',
      '3fp': 'رُدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-1')!, 'indicative')).toEqualT({
      '1s': 'أُرَدُّ',
      '2ms': 'تُرَدُّ',
      '2fs': 'تُرَدِّينَ',
      '3ms': 'يُرَدُّ',
      '3fs': 'تُرَدُّ',
      '2d': 'تُرَدَّانِ',
      '3md': 'يُرَدَّانِ',
      '3fd': 'تُرَدَّانِ',
      '1p': 'نُرَدُّ',
      '2mp': 'تُرَدُّونَ',
      '2fp': 'تُرْدَدْنَ',
      '3mp': 'يُرَدُّونَ',
      '3fp': 'يُرْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُرَدَّ',
      '2ms': 'تُرَدَّ',
      '2fs': 'تُرَدِّي',
      '3ms': 'يُرَدَّ',
      '3fs': 'تُرَدَّ',
      '2d': 'تُرَدَّا',
      '3md': 'يُرَدَّا',
      '3fd': 'تُرَدَّا',
      '1p': 'نُرَدَّ',
      '2mp': 'تُرَدُّوا',
      '2fp': 'تُرْدَدْنَ',
      '3mp': 'يُرَدُّوا',
      '3fp': 'يُرْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-1')!, 'jussive')).toEqualT({
      '1s': 'أُرَدَّ',
      '2ms': 'تُرَدَّ',
      '2fs': 'تُرَدِّي',
      '3ms': 'يُرَدَّ',
      '3fs': 'تُرَدَّ',
      '2d': 'تُرَدَّا',
      '3md': 'يُرَدَّا',
      '3fd': 'تُرَدَّا',
      '1p': 'نُرَدَّ',
      '2mp': 'تُرَدُّوا',
      '2fp': 'تُرْدَدْنَ',
      '3mp': 'يُرَدُّوا',
      '3fp': 'يُرْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('rdd-1')!)).toEqualT('رَادّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('rdd-1')!)).toEqualT('مَرْدُود')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('rdd-1')!)).toEqualT(['رَدّ'])
  })
})
