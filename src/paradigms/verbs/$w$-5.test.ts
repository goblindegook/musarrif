import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$w$-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$w$-5')!)).toEqualT({
      '1s': 'تَشَوَّشْتُ',
      '2ms': 'تَشَوَّشْتَ',
      '2fs': 'تَشَوَّشْتِ',
      '3ms': 'تَشَوَّشَ',
      '3fs': 'تَشَوَّشَتْ',
      '2d': 'تَشَوَّشْتُمَا',
      '3md': 'تَشَوَّشَا',
      '3fd': 'تَشَوَّشَتَا',
      '1p': 'تَشَوَّشْنَا',
      '2mp': 'تَشَوَّشْتُمْ',
      '2fp': 'تَشَوَّشْتُنَّ',
      '3mp': 'تَشَوَّشُوا',
      '3fp': 'تَشَوَّشْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$w$-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَشَوَّشُ',
      '2ms': 'تَتَشَوَّشُ',
      '2fs': 'تَتَشَوَّشِينَ',
      '3ms': 'يَتَشَوَّشُ',
      '3fs': 'تَتَشَوَّشُ',
      '2d': 'تَتَشَوَّشَانِ',
      '3md': 'يَتَشَوَّشَانِ',
      '3fd': 'تَتَشَوَّشَانِ',
      '1p': 'نَتَشَوَّشُ',
      '2mp': 'تَتَشَوَّشُونَ',
      '2fp': 'تَتَشَوَّشْنَ',
      '3mp': 'يَتَشَوَّشُونَ',
      '3fp': 'يَتَشَوَّشْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$w$-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَشَوَّشَ',
      '2ms': 'تَتَشَوَّشَ',
      '2fs': 'تَتَشَوَّشِي',
      '3ms': 'يَتَشَوَّشَ',
      '3fs': 'تَتَشَوَّشَ',
      '2d': 'تَتَشَوَّشَا',
      '3md': 'يَتَشَوَّشَا',
      '3fd': 'تَتَشَوَّشَا',
      '1p': 'نَتَشَوَّشَ',
      '2mp': 'تَتَشَوَّشُوا',
      '2fp': 'تَتَشَوَّشْنَ',
      '3mp': 'يَتَشَوَّشُوا',
      '3fp': 'يَتَشَوَّشْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$w$-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَشَوَّشْ',
      '2ms': 'تَتَشَوَّشْ',
      '2fs': 'تَتَشَوَّشِي',
      '3ms': 'يَتَشَوَّشْ',
      '3fs': 'تَتَشَوَّشْ',
      '2d': 'تَتَشَوَّشَا',
      '3md': 'يَتَشَوَّشَا',
      '3fd': 'تَتَشَوَّشَا',
      '1p': 'نَتَشَوَّشْ',
      '2mp': 'تَتَشَوَّشُوا',
      '2fp': 'تَتَشَوَّشْنَ',
      '3mp': 'يَتَشَوَّشُوا',
      '3fp': 'يَتَشَوَّشْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$w$-5')!)).toMatchObjectT({
      '2ms': 'تَشَوَّشْ',
      '2fs': 'تَشَوَّشِي',
      '2d': 'تَشَوَّشَا',
      '2mp': 'تَشَوَّشُوا',
      '2fp': 'تَشَوَّشْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$w$-5')!)).toMatchObjectT({
      '3ms': 'تُشُوِّشَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَشَوَّشُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَشَوَّشَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَشَوَّشْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$w$-5')!)).toEqualT('مُتَشَوِّش')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$w$-5')!)).toEqualT('مُتَشَوَّش')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$w$-5')!))).toEqualT(new Set(['تَشَوُّش']))
  })
})
