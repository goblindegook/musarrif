import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hyw-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyw-2')!)).toEqualT({
      '1s': 'حَيَّيْتُ',
      '2ms': 'حَيَّيْتَ',
      '2fs': 'حَيَّيْتِ',
      '3ms': 'حَيَّا',
      '3fs': 'حَيَّتْ',
      '2d': 'حَيَّيْتُمَا',
      '3md': 'حَيَّيَا',
      '3fd': 'حَيَّتَا',
      '1p': 'حَيَّيْنَا',
      '2mp': 'حَيَّيْتُمْ',
      '2fp': 'حَيَّيْتُنَّ',
      '3mp': 'حَيَّوْا',
      '3fp': 'حَيَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-2')!, 'indicative')).toEqualT({
      '1s': 'أُحَيِّي',
      '2ms': 'تُحَيِّي',
      '2fs': 'تُحَيِّينَ',
      '3ms': 'يُحَيِّي',
      '3fs': 'تُحَيِّي',
      '2d': 'تُحَيِّيَانِ',
      '3md': 'يُحَيِّيَانِ',
      '3fd': 'تُحَيِّيَانِ',
      '1p': 'نُحَيِّي',
      '2mp': 'تُحَيُّونَ',
      '2fp': 'تُحَيِّينَ',
      '3mp': 'يُحَيُّونَ',
      '3fp': 'يُحَيِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُحَيِّيَ',
      '2ms': 'تُحَيِّيَ',
      '2fs': 'تُحَيِّي',
      '3ms': 'يُحَيِّيَ',
      '3fs': 'تُحَيِّيَ',
      '2d': 'تُحَيِّيَا',
      '3md': 'يُحَيِّيَا',
      '3fd': 'تُحَيِّيَا',
      '1p': 'نُحَيِّيَ',
      '2mp': 'تُحَيُّوا',
      '2fp': 'تُحَيِّينَ',
      '3mp': 'يُحَيُّوا',
      '3fp': 'يُحَيِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-2')!, 'jussive')).toEqualT({
      '1s': 'أُحَيِّ',
      '2ms': 'تُحَيِّ',
      '2fs': 'تُحَيِّي',
      '3ms': 'يُحَيِّ',
      '3fs': 'تُحَيِّ',
      '2d': 'تُحَيِّيَا',
      '3md': 'يُحَيِّيَا',
      '3fd': 'تُحَيِّيَا',
      '1p': 'نُحَيِّ',
      '2mp': 'تُحَيُّوا',
      '2fp': 'تُحَيِّينَ',
      '3mp': 'يُحَيُّوا',
      '3fp': 'يُحَيِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyw-2')!)).toMatchObjectT({
      '2ms': 'حَيِّ',
      '2fs': 'حَيِّي',
      '2d': 'حَيِّيَا',
      '2mp': 'حَيُّوا',
      '2fp': 'حَيِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hyw-2')!)).toEqualT({
      '1s': 'حُيِّيتُ',
      '2ms': 'حُيِّيتَ',
      '2fs': 'حُيِّيتِ',
      '3ms': 'حُيِّيَ',
      '3fs': 'حُيِّيَتْ',
      '2d': 'حُيِّيتُمَا',
      '3md': 'حُيِّيَا',
      '3fd': 'حُيِّيَتَا',
      '1p': 'حُيِّينَا',
      '2mp': 'حُيِّيتُمْ',
      '2fp': 'حُيِّيتُنَّ',
      '3mp': 'حُيُّوا',
      '3fp': 'حُيِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-2')!, 'indicative')).toEqualT({
      '1s': 'أُحَيَّا',
      '2ms': 'تُحَيَّا',
      '2fs': 'تُحَيَّيْنَ',
      '3ms': 'يُحَيَّا',
      '3fs': 'تُحَيَّا',
      '2d': 'تُحَيَّيَانِ',
      '3md': 'يُحَيَّيَانِ',
      '3fd': 'تُحَيَّيَانِ',
      '1p': 'نُحَيَّا',
      '2mp': 'تُحَيَّوْنَ',
      '2fp': 'تُحَيَّيْنَ',
      '3mp': 'يُحَيَّوْنَ',
      '3fp': 'يُحَيَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُحَيَّا',
      '2ms': 'تُحَيَّا',
      '2fs': 'تُحَيَّيْ',
      '3ms': 'يُحَيَّا',
      '3fs': 'تُحَيَّا',
      '2d': 'تُحَيَّيَا',
      '3md': 'يُحَيَّيَا',
      '3fd': 'تُحَيَّيَا',
      '1p': 'نُحَيَّا',
      '2mp': 'تُحَيَّوْا',
      '2fp': 'تُحَيَّيْنَ',
      '3mp': 'يُحَيَّوْا',
      '3fp': 'يُحَيَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-2')!, 'jussive')).toEqualT({
      '1s': 'أُحَيَّ',
      '2ms': 'تُحَيَّ',
      '2fs': 'تُحَيَّيْ',
      '3ms': 'يُحَيَّ',
      '3fs': 'تُحَيَّ',
      '2d': 'تُحَيَّيَا',
      '3md': 'يُحَيَّيَا',
      '3fd': 'تُحَيَّيَا',
      '1p': 'نُحَيَّ',
      '2mp': 'تُحَيَّوْا',
      '2fp': 'تُحَيَّيْنَ',
      '3mp': 'يُحَيَّوْا',
      '3fp': 'يُحَيَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hyw-2')!)).toEqualT('مُحَيٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hyw-2')!)).toEqualT('مُحَيًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hyw-2')!))).toEqualT(new Set(['تَحِيَّة']))
  })
})
