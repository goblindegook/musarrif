import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Swr-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Swr-1')!)).toEqualT({
      '1s': 'صُرْتُ',
      '2ms': 'صُرْتَ',
      '2fs': 'صُرْتِ',
      '3ms': 'صَارَ',
      '3fs': 'صَارَتْ',
      '2d': 'صُرْتُمَا',
      '3md': 'صَارَا',
      '3fd': 'صَارَتَا',
      '1p': 'صُرْنَا',
      '2mp': 'صُرْتُمْ',
      '2fp': 'صُرْتُنَّ',
      '3mp': 'صَارُوا',
      '3fp': 'صُرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Swr-1')!, 'indicative')).toEqualT({
      '1s': 'أَصُورُ',
      '2ms': 'تَصُورُ',
      '2fs': 'تَصُورِينَ',
      '3ms': 'يَصُورُ',
      '3fs': 'تَصُورُ',
      '2d': 'تَصُورَانِ',
      '3md': 'يَصُورَانِ',
      '3fd': 'تَصُورَانِ',
      '1p': 'نَصُورُ',
      '2mp': 'تَصُورُونَ',
      '2fp': 'تَصُرْنَ',
      '3mp': 'يَصُورُونَ',
      '3fp': 'يَصُرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Swr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَصُورَ',
      '2ms': 'تَصُورَ',
      '2fs': 'تَصُورِي',
      '3ms': 'يَصُورَ',
      '3fs': 'تَصُورَ',
      '2d': 'تَصُورَا',
      '3md': 'يَصُورَا',
      '3fd': 'تَصُورَا',
      '1p': 'نَصُورَ',
      '2mp': 'تَصُورُوا',
      '2fp': 'تَصُرْنَ',
      '3mp': 'يَصُورُوا',
      '3fp': 'يَصُرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Swr-1')!, 'jussive')).toEqualT({
      '1s': 'أَصُرْ',
      '2ms': 'تَصُرْ',
      '2fs': 'تَصُورِي',
      '3ms': 'يَصُرْ',
      '3fs': 'تَصُرْ',
      '2d': 'تَصُورَا',
      '3md': 'يَصُورَا',
      '3fd': 'تَصُورَا',
      '1p': 'نَصُرْ',
      '2mp': 'تَصُورُوا',
      '2fp': 'تَصُرْنَ',
      '3mp': 'يَصُورُوا',
      '3fp': 'يَصُرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Swr-1')!)).toMatchObjectT({
      '2ms': 'صُرْ',
      '2fs': 'صُورِي',
      '2d': 'صُورَا',
      '2mp': 'صُورُوا',
      '2fp': 'صُرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Swr-1')!)).toEqualT({
      '1s': 'صِرْتُ',
      '2ms': 'صِرْتَ',
      '2fs': 'صِرْتِ',
      '3ms': 'صِيرَ',
      '3fs': 'صِيرَتْ',
      '2d': 'صِرْتُمَا',
      '3md': 'صِيرَا',
      '3fd': 'صِيرَتَا',
      '1p': 'صِرْنَا',
      '2mp': 'صِرْتُمْ',
      '2fp': 'صِرْتُنَّ',
      '3mp': 'صِيرُوا',
      '3fp': 'صِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Swr-1')!, 'indicative')).toEqualT({
      '1s': 'أُصَارُ',
      '2ms': 'تُصَارُ',
      '2fs': 'تُصَارِينَ',
      '3ms': 'يُصَارُ',
      '3fs': 'تُصَارُ',
      '2d': 'تُصَارَانِ',
      '3md': 'يُصَارَانِ',
      '3fd': 'تُصَارَانِ',
      '1p': 'نُصَارُ',
      '2mp': 'تُصَارُونَ',
      '2fp': 'تُصَرْنَ',
      '3mp': 'يُصَارُونَ',
      '3fp': 'يُصَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Swr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُصَارَ',
      '2ms': 'تُصَارَ',
      '2fs': 'تُصَارِي',
      '3ms': 'يُصَارَ',
      '3fs': 'تُصَارَ',
      '2d': 'تُصَارَا',
      '3md': 'يُصَارَا',
      '3fd': 'تُصَارَا',
      '1p': 'نُصَارَ',
      '2mp': 'تُصَارُوا',
      '2fp': 'تُصَرْنَ',
      '3mp': 'يُصَارُوا',
      '3fp': 'يُصَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Swr-1')!, 'jussive')).toEqualT({
      '1s': 'أُصَرْ',
      '2ms': 'تُصَرْ',
      '2fs': 'تُصَارِي',
      '3ms': 'يُصَرْ',
      '3fs': 'تُصَرْ',
      '2d': 'تُصَارَا',
      '3md': 'يُصَارَا',
      '3fd': 'تُصَارَا',
      '1p': 'نُصَرْ',
      '2mp': 'تُصَارُوا',
      '2fp': 'تُصَرْنَ',
      '3mp': 'يُصَارُوا',
      '3fp': 'يُصَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Swr-1')!)).toEqualT('صَائِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Swr-1')!)).toEqualT('مَصُور')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Swr-1')!))).toEqualT(new Set(['صَوْر']))
  })
})
