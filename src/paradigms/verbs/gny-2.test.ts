import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('gny-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('gny-2')!)).toEqualT({
      '1s': 'غَنَّيْتُ',
      '2ms': 'غَنَّيْتَ',
      '2fs': 'غَنَّيْتِ',
      '3ms': 'غَنَّى',
      '3fs': 'غَنَّتْ',
      '2d': 'غَنَّيْتُمَا',
      '3md': 'غَنَّيَا',
      '3fd': 'غَنَّتَا',
      '1p': 'غَنَّيْنَا',
      '2mp': 'غَنَّيْتُمْ',
      '2fp': 'غَنَّيْتُنَّ',
      '3mp': 'غَنَّوْا',
      '3fp': 'غَنَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('gny-2')!, 'indicative')).toEqualT({
      '1s': 'أُغَنِّي',
      '2ms': 'تُغَنِّي',
      '2fs': 'تُغَنِّينَ',
      '3ms': 'يُغَنِّي',
      '3fs': 'تُغَنِّي',
      '2d': 'تُغَنِّيَانِ',
      '3md': 'يُغَنِّيَانِ',
      '3fd': 'تُغَنِّيَانِ',
      '1p': 'نُغَنِّي',
      '2mp': 'تُغَنُّونَ',
      '2fp': 'تُغَنِّينَ',
      '3mp': 'يُغَنُّونَ',
      '3fp': 'يُغَنِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('gny-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُغَنِّيَ',
      '2ms': 'تُغَنِّيَ',
      '2fs': 'تُغَنِّي',
      '3ms': 'يُغَنِّيَ',
      '3fs': 'تُغَنِّيَ',
      '2d': 'تُغَنِّيَا',
      '3md': 'يُغَنِّيَا',
      '3fd': 'تُغَنِّيَا',
      '1p': 'نُغَنِّيَ',
      '2mp': 'تُغَنُّوا',
      '2fp': 'تُغَنِّينَ',
      '3mp': 'يُغَنُّوا',
      '3fp': 'يُغَنِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('gny-2')!, 'jussive')).toEqualT({
      '1s': 'أُغَنِّ',
      '2ms': 'تُغَنِّ',
      '2fs': 'تُغَنِّي',
      '3ms': 'يُغَنِّ',
      '3fs': 'تُغَنِّ',
      '2d': 'تُغَنِّيَا',
      '3md': 'يُغَنِّيَا',
      '3fd': 'تُغَنِّيَا',
      '1p': 'نُغَنِّ',
      '2mp': 'تُغَنُّوا',
      '2fp': 'تُغَنِّينَ',
      '3mp': 'يُغَنُّوا',
      '3fp': 'يُغَنِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('gny-2')!)).toMatchObjectT({
      '2ms': 'غَنِّ',
      '2fs': 'غَنِّي',
      '2d': 'غَنِّيَا',
      '2mp': 'غَنُّوا',
      '2fp': 'غَنِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('gny-2')!)).toEqualT({
      '1s': 'غُنِّيتُ',
      '2ms': 'غُنِّيتَ',
      '2fs': 'غُنِّيتِ',
      '3ms': 'غُنِّيَ',
      '3fs': 'غُنِّيَتْ',
      '2d': 'غُنِّيتُمَا',
      '3md': 'غُنِّيَا',
      '3fd': 'غُنِّيَتَا',
      '1p': 'غُنِّينَا',
      '2mp': 'غُنِّيتُمْ',
      '2fp': 'غُنِّيتُنَّ',
      '3mp': 'غُنُّوا',
      '3fp': 'غُنِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-2')!, 'indicative')).toEqualT({
      '1s': 'أُغَنَّى',
      '2ms': 'تُغَنَّى',
      '2fs': 'تُغَنَّيْنَ',
      '3ms': 'يُغَنَّى',
      '3fs': 'تُغَنَّى',
      '2d': 'تُغَنَّيَانِ',
      '3md': 'يُغَنَّيَانِ',
      '3fd': 'تُغَنَّيَانِ',
      '1p': 'نُغَنَّى',
      '2mp': 'تُغَنَّوْنَ',
      '2fp': 'تُغَنَّيْنَ',
      '3mp': 'يُغَنَّوْنَ',
      '3fp': 'يُغَنَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُغَنَّى',
      '2ms': 'تُغَنَّى',
      '2fs': 'تُغَنَّيْ',
      '3ms': 'يُغَنَّى',
      '3fs': 'تُغَنَّى',
      '2d': 'تُغَنَّيَا',
      '3md': 'يُغَنَّيَا',
      '3fd': 'تُغَنَّيَا',
      '1p': 'نُغَنَّى',
      '2mp': 'تُغَنَّوْا',
      '2fp': 'تُغَنَّيْنَ',
      '3mp': 'يُغَنَّوْا',
      '3fp': 'يُغَنَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-2')!, 'jussive')).toEqualT({
      '1s': 'أُغَنَّ',
      '2ms': 'تُغَنَّ',
      '2fs': 'تُغَنَّيْ',
      '3ms': 'يُغَنَّ',
      '3fs': 'تُغَنَّ',
      '2d': 'تُغَنَّيَا',
      '3md': 'يُغَنَّيَا',
      '3fd': 'تُغَنَّيَا',
      '1p': 'نُغَنَّ',
      '2mp': 'تُغَنَّوْا',
      '2fp': 'تُغَنَّيْنَ',
      '3mp': 'يُغَنَّوْا',
      '3fp': 'يُغَنَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('gny-2')!)).toEqualT('مُغَنٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('gny-2')!)).toEqualT('مُغَنًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('gny-2')!))).toEqualT(new Set(['غِنَاء', 'تَغْنِيَة']))
  })
})
