import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Sfw-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Sfw-2')!)).toEqualT({
      '1s': 'صَفَّيْتُ',
      '2ms': 'صَفَّيْتَ',
      '2fs': 'صَفَّيْتِ',
      '3ms': 'صَفَّى',
      '3fs': 'صَفَّتْ',
      '2d': 'صَفَّيْتُمَا',
      '3md': 'صَفَّيَا',
      '3fd': 'صَفَّتَا',
      '1p': 'صَفَّيْنَا',
      '2mp': 'صَفَّيْتُمْ',
      '2fp': 'صَفَّيْتُنَّ',
      '3mp': 'صَفَّوْا',
      '3fp': 'صَفَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Sfw-2')!, 'indicative')).toEqualT({
      '1s': 'أُصَفِّي',
      '2ms': 'تُصَفِّي',
      '2fs': 'تُصَفِّينَ',
      '3ms': 'يُصَفِّي',
      '3fs': 'تُصَفِّي',
      '2d': 'تُصَفِّيَانِ',
      '3md': 'يُصَفِّيَانِ',
      '3fd': 'تُصَفِّيَانِ',
      '1p': 'نُصَفِّي',
      '2mp': 'تُصَفُّونَ',
      '2fp': 'تُصَفِّينَ',
      '3mp': 'يُصَفُّونَ',
      '3fp': 'يُصَفِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Sfw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُصَفِّيَ',
      '2ms': 'تُصَفِّيَ',
      '2fs': 'تُصَفِّي',
      '3ms': 'يُصَفِّيَ',
      '3fs': 'تُصَفِّيَ',
      '2d': 'تُصَفِّيَا',
      '3md': 'يُصَفِّيَا',
      '3fd': 'تُصَفِّيَا',
      '1p': 'نُصَفِّيَ',
      '2mp': 'تُصَفُّوا',
      '2fp': 'تُصَفِّينَ',
      '3mp': 'يُصَفُّوا',
      '3fp': 'يُصَفِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Sfw-2')!, 'jussive')).toEqualT({
      '1s': 'أُصَفِّ',
      '2ms': 'تُصَفِّ',
      '2fs': 'تُصَفِّي',
      '3ms': 'يُصَفِّ',
      '3fs': 'تُصَفِّ',
      '2d': 'تُصَفِّيَا',
      '3md': 'يُصَفِّيَا',
      '3fd': 'تُصَفِّيَا',
      '1p': 'نُصَفِّ',
      '2mp': 'تُصَفُّوا',
      '2fp': 'تُصَفِّينَ',
      '3mp': 'يُصَفُّوا',
      '3fp': 'يُصَفِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Sfw-2')!)).toMatchObjectT({
      '2ms': 'صَفِّ',
      '2fs': 'صَفِّي',
      '2d': 'صَفِّيَا',
      '2mp': 'صَفُّوا',
      '2fp': 'صَفِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Sfw-2')!)).toEqualT({
      '1s': 'صُفِّيتُ',
      '2ms': 'صُفِّيتَ',
      '2fs': 'صُفِّيتِ',
      '3ms': 'صُفِّيَ',
      '3fs': 'صُفِّيَتْ',
      '2d': 'صُفِّيتُمَا',
      '3md': 'صُفِّيَا',
      '3fd': 'صُفِّيَتَا',
      '1p': 'صُفِّينَا',
      '2mp': 'صُفِّيتُمْ',
      '2fp': 'صُفِّيتُنَّ',
      '3mp': 'صُفُّوا',
      '3fp': 'صُفِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Sfw-2')!, 'indicative')).toEqualT({
      '1s': 'أُصَفَّى',
      '2ms': 'تُصَفَّى',
      '2fs': 'تُصَفَّيْنَ',
      '3ms': 'يُصَفَّى',
      '3fs': 'تُصَفَّى',
      '2d': 'تُصَفَّيَانِ',
      '3md': 'يُصَفَّيَانِ',
      '3fd': 'تُصَفَّيَانِ',
      '1p': 'نُصَفَّى',
      '2mp': 'تُصَفَّوْنَ',
      '2fp': 'تُصَفَّيْنَ',
      '3mp': 'يُصَفَّوْنَ',
      '3fp': 'يُصَفَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Sfw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُصَفَّى',
      '2ms': 'تُصَفَّى',
      '2fs': 'تُصَفَّيْ',
      '3ms': 'يُصَفَّى',
      '3fs': 'تُصَفَّى',
      '2d': 'تُصَفَّيَا',
      '3md': 'يُصَفَّيَا',
      '3fd': 'تُصَفَّيَا',
      '1p': 'نُصَفَّى',
      '2mp': 'تُصَفَّوْا',
      '2fp': 'تُصَفَّيْنَ',
      '3mp': 'يُصَفَّوْا',
      '3fp': 'يُصَفَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Sfw-2')!, 'jussive')).toEqualT({
      '1s': 'أُصَفَّ',
      '2ms': 'تُصَفَّ',
      '2fs': 'تُصَفَّيْ',
      '3ms': 'يُصَفَّ',
      '3fs': 'تُصَفَّ',
      '2d': 'تُصَفَّيَا',
      '3md': 'يُصَفَّيَا',
      '3fd': 'تُصَفَّيَا',
      '1p': 'نُصَفَّ',
      '2mp': 'تُصَفَّوْا',
      '2fp': 'تُصَفَّيْنَ',
      '3mp': 'يُصَفَّوْا',
      '3fp': 'يُصَفَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Sfw-2')!)).toEqualT('مُصَفٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Sfw-2')!)).toEqualT('مُصَفًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Sfw-2')!))).toEqualT(new Set(['تَصْفِيَة']))
  })
})
