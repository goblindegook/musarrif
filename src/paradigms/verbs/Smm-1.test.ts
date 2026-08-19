import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Smm-1 (Reverso)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Smm-1')!)).toEqualT({
      '1s': 'صَمَمْتُ',
      '2ms': 'صَمَمْتَ',
      '2fs': 'صَمَمْتِ',
      '3ms': 'صَمَّ',
      '3fs': 'صَمَّتْ',
      '2d': 'صَمَمْتُمَا',
      '3md': 'صَمَّا',
      '3fd': 'صَمَّتَا',
      '1p': 'صَمَمْنَا',
      '2mp': 'صَمَمْتُمْ',
      '2fp': 'صَمَمْتُنَّ',
      '3mp': 'صَمُّوا',
      '3fp': 'صَمَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Smm-1')!, 'indicative')).toEqualT({
      '1s': 'أَصُمُّ',
      '2ms': 'تَصُمُّ',
      '2fs': 'تَصُمِّينَ',
      '3ms': 'يَصُمُّ',
      '3fs': 'تَصُمُّ',
      '2d': 'تَصُمَّانِ',
      '3md': 'يَصُمَّانِ',
      '3fd': 'تَصُمَّانِ',
      '1p': 'نَصُمُّ',
      '2mp': 'تَصُمُّونَ',
      '2fp': 'تَصْمُمْنَ',
      '3mp': 'يَصُمُّونَ',
      '3fp': 'يَصْمُمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Smm-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَصُمَّ',
      '2ms': 'تَصُمَّ',
      '2fs': 'تَصُمِّي',
      '3ms': 'يَصُمَّ',
      '3fs': 'تَصُمَّ',
      '2d': 'تَصُمَّا',
      '3md': 'يَصُمَّا',
      '3fd': 'تَصُمَّا',
      '1p': 'نَصُمَّ',
      '2mp': 'تَصُمُّوا',
      '2fp': 'تَصْمُمْنَ',
      '3mp': 'يَصُمُّوا',
      '3fp': 'يَصْمُمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Smm-1')!, 'jussive')).toEqualT({
      '1s': 'أَصُمَّ',
      '2ms': 'تَصُمَّ',
      '2fs': 'تَصُمِّي',
      '3ms': 'يَصُمَّ',
      '3fs': 'تَصُمَّ',
      '2d': 'تَصُمَّا',
      '3md': 'يَصُمَّا',
      '3fd': 'تَصُمَّا',
      '1p': 'نَصُمَّ',
      '2mp': 'تَصُمُّوا',
      '2fp': 'تَصْمُمْنَ',
      '3mp': 'يَصُمُّوا',
      '3fp': 'يَصْمُمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Smm-1')!)).toMatchObjectT({
      '2ms': 'صُمَّ',
      '2fs': 'صُمِّي',
      '2d': 'صُمَّا',
      '2mp': 'صُمُّوا',
      '2fp': 'اُصْمُمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Smm-1')!)).toEqualT({
      '1s': 'صُمِمْتُ',
      '2ms': 'صُمِمْتَ',
      '2fs': 'صُمِمْتِ',
      '3ms': 'صُمَّ',
      '3fs': 'صُمَّتْ',
      '2d': 'صُمِمْتُمَا',
      '3md': 'صُمَّا',
      '3fd': 'صُمَّتَا',
      '1p': 'صُمِمْنَا',
      '2mp': 'صُمِمْتُمْ',
      '2fp': 'صُمِمْتُنَّ',
      '3mp': 'صُمُّوا',
      '3fp': 'صُمِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Smm-1')!, 'indicative')).toEqualT({
      '1s': 'أُصَمُّ',
      '2ms': 'تُصَمُّ',
      '2fs': 'تُصَمِّينَ',
      '3ms': 'يُصَمُّ',
      '3fs': 'تُصَمُّ',
      '2d': 'تُصَمَّانِ',
      '3md': 'يُصَمَّانِ',
      '3fd': 'تُصَمَّانِ',
      '1p': 'نُصَمُّ',
      '2mp': 'تُصَمُّونَ',
      '2fp': 'تُصْمَمْنَ',
      '3mp': 'يُصَمُّونَ',
      '3fp': 'يُصْمَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Smm-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُصَمَّ',
      '2ms': 'تُصَمَّ',
      '2fs': 'تُصَمِّي',
      '3ms': 'يُصَمَّ',
      '3fs': 'تُصَمَّ',
      '2d': 'تُصَمَّا',
      '3md': 'يُصَمَّا',
      '3fd': 'تُصَمَّا',
      '1p': 'نُصَمَّ',
      '2mp': 'تُصَمُّوا',
      '2fp': 'تُصْمَمْنَ',
      '3mp': 'يُصَمُّوا',
      '3fp': 'يُصْمَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Smm-1')!, 'jussive')).toEqualT({
      '1s': 'أُصَمَّ',
      '2ms': 'تُصَمَّ',
      '2fs': 'تُصَمِّي',
      '3ms': 'يُصَمَّ',
      '3fs': 'تُصَمَّ',
      '2d': 'تُصَمَّا',
      '3md': 'يُصَمَّا',
      '3fd': 'تُصَمَّا',
      '1p': 'نُصَمَّ',
      '2mp': 'تُصَمُّوا',
      '2fp': 'تُصْمَمْنَ',
      '3mp': 'يُصَمُّوا',
      '3fp': 'يُصْمَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Smm-1')!)).toEqualT('صَامّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Smm-1')!)).toEqualT('مَصْمُوم')
  })

  // Reverso lists no masdar for this verb; these are ElixirFM's four derived nominals
  // (FaCaL, FaCāL, FaCL, FuCL) for lexeme صَمّ "plug, stop up".
  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Smm-1')!))).toEqualT(new Set(['صَمَم', 'صَمَام', 'صَمّ', 'صُمّ']))
  })
})
