import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$bh-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$bh-6')!)).toEqualT({
      '1s': 'تَشَابَهْتُ',
      '2ms': 'تَشَابَهْتَ',
      '2fs': 'تَشَابَهْتِ',
      '3ms': 'تَشَابَهَ',
      '3fs': 'تَشَابَهَتْ',
      '2d': 'تَشَابَهْتُمَا',
      '3md': 'تَشَابَهَا',
      '3fd': 'تَشَابَهَتَا',
      '1p': 'تَشَابَهْنَا',
      '2mp': 'تَشَابَهْتُمْ',
      '2fp': 'تَشَابَهْتُنَّ',
      '3mp': 'تَشَابَهُوا',
      '3fp': 'تَشَابَهْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$bh-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَشَابَهُ',
      '2ms': 'تَتَشَابَهُ',
      '2fs': 'تَتَشَابَهِينَ',
      '3ms': 'يَتَشَابَهُ',
      '3fs': 'تَتَشَابَهُ',
      '2d': 'تَتَشَابَهَانِ',
      '3md': 'يَتَشَابَهَانِ',
      '3fd': 'تَتَشَابَهَانِ',
      '1p': 'نَتَشَابَهُ',
      '2mp': 'تَتَشَابَهُونَ',
      '2fp': 'تَتَشَابَهْنَ',
      '3mp': 'يَتَشَابَهُونَ',
      '3fp': 'يَتَشَابَهْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$bh-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَشَابَهَ',
      '2ms': 'تَتَشَابَهَ',
      '2fs': 'تَتَشَابَهِي',
      '3ms': 'يَتَشَابَهَ',
      '3fs': 'تَتَشَابَهَ',
      '2d': 'تَتَشَابَهَا',
      '3md': 'يَتَشَابَهَا',
      '3fd': 'تَتَشَابَهَا',
      '1p': 'نَتَشَابَهَ',
      '2mp': 'تَتَشَابَهُوا',
      '2fp': 'تَتَشَابَهْنَ',
      '3mp': 'يَتَشَابَهُوا',
      '3fp': 'يَتَشَابَهْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$bh-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَشَابَهْ',
      '2ms': 'تَتَشَابَهْ',
      '2fs': 'تَتَشَابَهِي',
      '3ms': 'يَتَشَابَهْ',
      '3fs': 'تَتَشَابَهْ',
      '2d': 'تَتَشَابَهَا',
      '3md': 'يَتَشَابَهَا',
      '3fd': 'تَتَشَابَهَا',
      '1p': 'نَتَشَابَهْ',
      '2mp': 'تَتَشَابَهُوا',
      '2fp': 'تَتَشَابَهْنَ',
      '3mp': 'يَتَشَابَهُوا',
      '3fp': 'يَتَشَابَهْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$bh-6')!)).toMatchObjectT({
      '2ms': 'تَشَابَهْ',
      '2fs': 'تَشَابَهِي',
      '2d': 'تَشَابَهَا',
      '2mp': 'تَشَابَهُوا',
      '2fp': 'تَشَابَهْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$bh-6')!)).toMatchObjectT({
      '3ms': 'تُشُوبِهَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَشَابَهُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَشَابَهَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَشَابَهْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$bh-6')!)).toEqualT('مُتَشَابِه')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$bh-6')!)).toEqualT('مُتَشَابَه')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$bh-6')!))).toEqualT(new Set(['تَشَابُه']))
  })
})
