import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Eyy-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Eyy-6')!)).toEqualT({
      '1s': 'تَعَايَيْتُ',
      '2ms': 'تَعَايَيْتَ',
      '2fs': 'تَعَايَيْتِ',
      '3ms': 'تَعَايَا',
      '3fs': 'تَعَايَتْ',
      '2d': 'تَعَايَيْتُمَا',
      '3md': 'تَعَايَيَا',
      '3fd': 'تَعَايَتَا',
      '1p': 'تَعَايَيْنَا',
      '2mp': 'تَعَايَيْتُمْ',
      '2fp': 'تَعَايَيْتُنَّ',
      '3mp': 'تَعَايَوْا',
      '3fp': 'تَعَايَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَعَايَا',
      '2ms': 'تَتَعَايَا',
      '2fs': 'تَتَعَايَيْنَ',
      '3ms': 'يَتَعَايَا',
      '3fs': 'تَتَعَايَا',
      '2d': 'تَتَعَايَيَانِ',
      '3md': 'يَتَعَايَيَانِ',
      '3fd': 'تَتَعَايَيَانِ',
      '1p': 'نَتَعَايَا',
      '2mp': 'تَتَعَايَوْنَ',
      '2fp': 'تَتَعَايَيْنَ',
      '3mp': 'يَتَعَايَوْنَ',
      '3fp': 'يَتَعَايَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَعَايَا',
      '2ms': 'تَتَعَايَا',
      '2fs': 'تَتَعَايَيْ',
      '3ms': 'يَتَعَايَا',
      '3fs': 'تَتَعَايَا',
      '2d': 'تَتَعَايَيَا',
      '3md': 'يَتَعَايَيَا',
      '3fd': 'تَتَعَايَيَا',
      '1p': 'نَتَعَايَا',
      '2mp': 'تَتَعَايَوْا',
      '2fp': 'تَتَعَايَيْنَ',
      '3mp': 'يَتَعَايَوْا',
      '3fp': 'يَتَعَايَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَعَايَ',
      '2ms': 'تَتَعَايَ',
      '2fs': 'تَتَعَايَيْ',
      '3ms': 'يَتَعَايَ',
      '3fs': 'تَتَعَايَ',
      '2d': 'تَتَعَايَيَا',
      '3md': 'يَتَعَايَيَا',
      '3fd': 'تَتَعَايَيَا',
      '1p': 'نَتَعَايَ',
      '2mp': 'تَتَعَايَوْا',
      '2fp': 'تَتَعَايَيْنَ',
      '3mp': 'يَتَعَايَوْا',
      '3fp': 'يَتَعَايَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Eyy-6')!)).toMatchObjectT({
      '2ms': 'تَعَايَ',
      '2fs': 'تَعَايَيْ',
      '2d': 'تَعَايَيَا',
      '2mp': 'تَعَايَوْا',
      '2fp': 'تَعَايَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Eyy-6')!)).toEqualT({
      '1s': 'تُعُويِيتُ',
      '2ms': 'تُعُويِيتَ',
      '2fs': 'تُعُويِيتِ',
      '3ms': 'تُعُويِيَ',
      '3fs': 'تُعُويِيَتْ',
      '2d': 'تُعُويِيتُمَا',
      '3md': 'تُعُويِيَا',
      '3fd': 'تُعُويِيَتَا',
      '1p': 'تُعُويِينَا',
      '2mp': 'تُعُويِيتُمْ',
      '2fp': 'تُعُويِيتُنَّ',
      '3mp': 'تُعُويُوا',
      '3fp': 'تُعُويِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-6')!, 'indicative')).toEqualT({
      '1s': 'أُتَعَايَا',
      '2ms': 'تُتَعَايَا',
      '2fs': 'تُتَعَايَيْنَ',
      '3ms': 'يُتَعَايَا',
      '3fs': 'تُتَعَايَا',
      '2d': 'تُتَعَايَيَانِ',
      '3md': 'يُتَعَايَيَانِ',
      '3fd': 'تُتَعَايَيَانِ',
      '1p': 'نُتَعَايَا',
      '2mp': 'تُتَعَايَوْنَ',
      '2fp': 'تُتَعَايَيْنَ',
      '3mp': 'يُتَعَايَوْنَ',
      '3fp': 'يُتَعَايَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-6')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَعَايَا',
      '2ms': 'تُتَعَايَا',
      '2fs': 'تُتَعَايَيْ',
      '3ms': 'يُتَعَايَا',
      '3fs': 'تُتَعَايَا',
      '2d': 'تُتَعَايَيَا',
      '3md': 'يُتَعَايَيَا',
      '3fd': 'تُتَعَايَيَا',
      '1p': 'نُتَعَايَا',
      '2mp': 'تُتَعَايَوْا',
      '2fp': 'تُتَعَايَيْنَ',
      '3mp': 'يُتَعَايَوْا',
      '3fp': 'يُتَعَايَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-6')!, 'jussive')).toEqualT({
      '1s': 'أُتَعَايَ',
      '2ms': 'تُتَعَايَ',
      '2fs': 'تُتَعَايَيْ',
      '3ms': 'يُتَعَايَ',
      '3fs': 'تُتَعَايَ',
      '2d': 'تُتَعَايَيَا',
      '3md': 'يُتَعَايَيَا',
      '3fd': 'تُتَعَايَيَا',
      '1p': 'نُتَعَايَ',
      '2mp': 'تُتَعَايَوْا',
      '2fp': 'تُتَعَايَيْنَ',
      '3mp': 'يُتَعَايَوْا',
      '3fp': 'يُتَعَايَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Eyy-6')!)).toEqualT('مُتَعَايٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Eyy-6')!)).toEqualT('مُتَعَايًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Eyy-6')!))).toEqualT(new Set(['تَعَايٍ']))
  })
})
