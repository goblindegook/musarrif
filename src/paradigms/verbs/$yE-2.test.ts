import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$yE-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$yE-2')!)).toEqualT({
      '1s': 'شَيَّعْتُ',
      '2ms': 'شَيَّعْتَ',
      '2fs': 'شَيَّعْتِ',
      '3ms': 'شَيَّعَ',
      '3fs': 'شَيَّعَتْ',
      '2d': 'شَيَّعْتُمَا',
      '3md': 'شَيَّعَا',
      '3fd': 'شَيَّعَتَا',
      '1p': 'شَيَّعْنَا',
      '2mp': 'شَيَّعْتُمْ',
      '2fp': 'شَيَّعْتُنَّ',
      '3mp': 'شَيَّعُوا',
      '3fp': 'شَيَّعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$yE-2')!, 'indicative')).toEqualT({
      '1s': 'أُشَيِّعُ',
      '2ms': 'تُشَيِّعُ',
      '2fs': 'تُشَيِّعِينَ',
      '3ms': 'يُشَيِّعُ',
      '3fs': 'تُشَيِّعُ',
      '2d': 'تُشَيِّعَانِ',
      '3md': 'يُشَيِّعَانِ',
      '3fd': 'تُشَيِّعَانِ',
      '1p': 'نُشَيِّعُ',
      '2mp': 'تُشَيِّعُونَ',
      '2fp': 'تُشَيِّعْنَ',
      '3mp': 'يُشَيِّعُونَ',
      '3fp': 'يُشَيِّعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$yE-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَيِّعَ',
      '2ms': 'تُشَيِّعَ',
      '2fs': 'تُشَيِّعِي',
      '3ms': 'يُشَيِّعَ',
      '3fs': 'تُشَيِّعَ',
      '2d': 'تُشَيِّعَا',
      '3md': 'يُشَيِّعَا',
      '3fd': 'تُشَيِّعَا',
      '1p': 'نُشَيِّعَ',
      '2mp': 'تُشَيِّعُوا',
      '2fp': 'تُشَيِّعْنَ',
      '3mp': 'يُشَيِّعُوا',
      '3fp': 'يُشَيِّعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$yE-2')!, 'jussive')).toEqualT({
      '1s': 'أُشَيِّعْ',
      '2ms': 'تُشَيِّعْ',
      '2fs': 'تُشَيِّعِي',
      '3ms': 'يُشَيِّعْ',
      '3fs': 'تُشَيِّعْ',
      '2d': 'تُشَيِّعَا',
      '3md': 'يُشَيِّعَا',
      '3fd': 'تُشَيِّعَا',
      '1p': 'نُشَيِّعْ',
      '2mp': 'تُشَيِّعُوا',
      '2fp': 'تُشَيِّعْنَ',
      '3mp': 'يُشَيِّعُوا',
      '3fp': 'يُشَيِّعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$yE-2')!)).toMatchObjectT({
      '2ms': 'شَيِّعْ',
      '2fs': 'شَيِّعِي',
      '2d': 'شَيِّعَا',
      '2mp': 'شَيِّعُوا',
      '2fp': 'شَيِّعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$yE-2')!)).toEqualT({
      '1s': 'شُيِّعْتُ',
      '2ms': 'شُيِّعْتَ',
      '2fs': 'شُيِّعْتِ',
      '3ms': 'شُيِّعَ',
      '3fs': 'شُيِّعَتْ',
      '2d': 'شُيِّعْتُمَا',
      '3md': 'شُيِّعَا',
      '3fd': 'شُيِّعَتَا',
      '1p': 'شُيِّعْنَا',
      '2mp': 'شُيِّعْتُمْ',
      '2fp': 'شُيِّعْتُنَّ',
      '3mp': 'شُيِّعُوا',
      '3fp': 'شُيِّعْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-2')!, 'indicative')).toEqualT({
      '1s': 'أُشَيَّعُ',
      '2ms': 'تُشَيَّعُ',
      '2fs': 'تُشَيَّعِينَ',
      '3ms': 'يُشَيَّعُ',
      '3fs': 'تُشَيَّعُ',
      '2d': 'تُشَيَّعَانِ',
      '3md': 'يُشَيَّعَانِ',
      '3fd': 'تُشَيَّعَانِ',
      '1p': 'نُشَيَّعُ',
      '2mp': 'تُشَيَّعُونَ',
      '2fp': 'تُشَيَّعْنَ',
      '3mp': 'يُشَيَّعُونَ',
      '3fp': 'يُشَيَّعْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَيَّعَ',
      '2ms': 'تُشَيَّعَ',
      '2fs': 'تُشَيَّعِي',
      '3ms': 'يُشَيَّعَ',
      '3fs': 'تُشَيَّعَ',
      '2d': 'تُشَيَّعَا',
      '3md': 'يُشَيَّعَا',
      '3fd': 'تُشَيَّعَا',
      '1p': 'نُشَيَّعَ',
      '2mp': 'تُشَيَّعُوا',
      '2fp': 'تُشَيَّعْنَ',
      '3mp': 'يُشَيَّعُوا',
      '3fp': 'يُشَيَّعْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-2')!, 'jussive')).toEqualT({
      '1s': 'أُشَيَّعْ',
      '2ms': 'تُشَيَّعْ',
      '2fs': 'تُشَيَّعِي',
      '3ms': 'يُشَيَّعْ',
      '3fs': 'تُشَيَّعْ',
      '2d': 'تُشَيَّعَا',
      '3md': 'يُشَيَّعَا',
      '3fd': 'تُشَيَّعَا',
      '1p': 'نُشَيَّعْ',
      '2mp': 'تُشَيَّعُوا',
      '2fp': 'تُشَيَّعْنَ',
      '3mp': 'يُشَيَّعُوا',
      '3fp': 'يُشَيَّعْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$yE-2')!)).toEqualT('مُشَيِّع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$yE-2')!)).toEqualT('مُشَيَّع')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$yE-2')!))).toEqualT(new Set(['تَشْيِيع']))
  })
})
