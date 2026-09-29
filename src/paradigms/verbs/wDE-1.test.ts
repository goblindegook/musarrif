import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wDE-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wDE-1')!)).toEqualT({
      '1s': 'وَضَعْتُ',
      '2ms': 'وَضَعْتَ',
      '2fs': 'وَضَعْتِ',
      '3ms': 'وَضَعَ',
      '3fs': 'وَضَعَتْ',
      '2d': 'وَضَعْتُمَا',
      '3md': 'وَضَعَا',
      '3fd': 'وَضَعَتَا',
      '1p': 'وَضَعْنَا',
      '2mp': 'وَضَعْتُمْ',
      '2fp': 'وَضَعْتُنَّ',
      '3mp': 'وَضَعُوا',
      '3fp': 'وَضَعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wDE-1')!, 'indicative')).toEqualT({
      '1s': 'أَضَعُ',
      '2ms': 'تَضَعُ',
      '2fs': 'تَضَعِينَ',
      '3ms': 'يَضَعُ',
      '3fs': 'تَضَعُ',
      '2d': 'تَضَعَانِ',
      '3md': 'يَضَعَانِ',
      '3fd': 'تَضَعَانِ',
      '1p': 'نَضَعُ',
      '2mp': 'تَضَعُونَ',
      '2fp': 'تَضَعْنَ',
      '3mp': 'يَضَعُونَ',
      '3fp': 'يَضَعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wDE-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَضَعَ',
      '2ms': 'تَضَعَ',
      '2fs': 'تَضَعِي',
      '3ms': 'يَضَعَ',
      '3fs': 'تَضَعَ',
      '2d': 'تَضَعَا',
      '3md': 'يَضَعَا',
      '3fd': 'تَضَعَا',
      '1p': 'نَضَعَ',
      '2mp': 'تَضَعُوا',
      '2fp': 'تَضَعْنَ',
      '3mp': 'يَضَعُوا',
      '3fp': 'يَضَعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wDE-1')!, 'jussive')).toEqualT({
      '1s': 'أَضَعْ',
      '2ms': 'تَضَعْ',
      '2fs': 'تَضَعِي',
      '3ms': 'يَضَعْ',
      '3fs': 'تَضَعْ',
      '2d': 'تَضَعَا',
      '3md': 'يَضَعَا',
      '3fd': 'تَضَعَا',
      '1p': 'نَضَعْ',
      '2mp': 'تَضَعُوا',
      '2fp': 'تَضَعْنَ',
      '3mp': 'يَضَعُوا',
      '3fp': 'يَضَعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wDE-1')!)).toMatchObjectT({
      '2ms': 'ضَعْ',
      '2fs': 'ضَعِي',
      '2d': 'ضَعَا',
      '2mp': 'ضَعُوا',
      '2fp': 'ضَعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wDE-1')!)).toEqualT({
      '1s': 'وُضِعْتُ',
      '2ms': 'وُضِعْتَ',
      '2fs': 'وُضِعْتِ',
      '3ms': 'وُضِعَ',
      '3fs': 'وُضِعَتْ',
      '2d': 'وُضِعْتُمَا',
      '3md': 'وُضِعَا',
      '3fd': 'وُضِعَتَا',
      '1p': 'وُضِعْنَا',
      '2mp': 'وُضِعْتُمْ',
      '2fp': 'وُضِعْتُنَّ',
      '3mp': 'وُضِعُوا',
      '3fp': 'وُضِعْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-1')!, 'indicative')).toEqualT({
      '1s': 'أُوضَعُ',
      '2ms': 'تُوضَعُ',
      '2fs': 'تُوضَعِينَ',
      '3ms': 'يُوضَعُ',
      '3fs': 'تُوضَعُ',
      '2d': 'تُوضَعَانِ',
      '3md': 'يُوضَعَانِ',
      '3fd': 'تُوضَعَانِ',
      '1p': 'نُوضَعُ',
      '2mp': 'تُوضَعُونَ',
      '2fp': 'تُوضَعْنَ',
      '3mp': 'يُوضَعُونَ',
      '3fp': 'يُوضَعْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُوضَعَ',
      '2ms': 'تُوضَعَ',
      '2fs': 'تُوضَعِي',
      '3ms': 'يُوضَعَ',
      '3fs': 'تُوضَعَ',
      '2d': 'تُوضَعَا',
      '3md': 'يُوضَعَا',
      '3fd': 'تُوضَعَا',
      '1p': 'نُوضَعَ',
      '2mp': 'تُوضَعُوا',
      '2fp': 'تُوضَعْنَ',
      '3mp': 'يُوضَعُوا',
      '3fp': 'يُوضَعْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-1')!, 'jussive')).toEqualT({
      '1s': 'أُوضَعْ',
      '2ms': 'تُوضَعْ',
      '2fs': 'تُوضَعِي',
      '3ms': 'يُوضَعْ',
      '3fs': 'تُوضَعْ',
      '2d': 'تُوضَعَا',
      '3md': 'يُوضَعَا',
      '3fd': 'تُوضَعَا',
      '1p': 'نُوضَعْ',
      '2mp': 'تُوضَعُوا',
      '2fp': 'تُوضَعْنَ',
      '3mp': 'يُوضَعُوا',
      '3fp': 'يُوضَعْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wDE-1')!)).toEqualT('وَاضِع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wDE-1')!)).toEqualT('مَوْضُوع')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wDE-1')!))).toEqualT(new Set(['وَضْع', 'مَوْضَع', 'مَوْضِع']))
  })
})
