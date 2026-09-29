import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('dwy-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('dwy-2')!)).toEqualT({
      '1s': 'دَوَّيْتُ',
      '2ms': 'دَوَّيْتَ',
      '2fs': 'دَوَّيْتِ',
      '3ms': 'دَوَّى',
      '3fs': 'دَوَّتْ',
      '2d': 'دَوَّيْتُمَا',
      '3md': 'دَوَّيَا',
      '3fd': 'دَوَّتَا',
      '1p': 'دَوَّيْنَا',
      '2mp': 'دَوَّيْتُمْ',
      '2fp': 'دَوَّيْتُنَّ',
      '3mp': 'دَوَّوْا',
      '3fp': 'دَوَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('dwy-2')!, 'indicative')).toEqualT({
      '1s': 'أُدَوِّي',
      '2ms': 'تُدَوِّي',
      '2fs': 'تُدَوِّينَ',
      '3ms': 'يُدَوِّي',
      '3fs': 'تُدَوِّي',
      '2d': 'تُدَوِّيَانِ',
      '3md': 'يُدَوِّيَانِ',
      '3fd': 'تُدَوِّيَانِ',
      '1p': 'نُدَوِّي',
      '2mp': 'تُدَوُّونَ',
      '2fp': 'تُدَوِّينَ',
      '3mp': 'يُدَوُّونَ',
      '3fp': 'يُدَوِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('dwy-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُدَوِّيَ',
      '2ms': 'تُدَوِّيَ',
      '2fs': 'تُدَوِّي',
      '3ms': 'يُدَوِّيَ',
      '3fs': 'تُدَوِّيَ',
      '2d': 'تُدَوِّيَا',
      '3md': 'يُدَوِّيَا',
      '3fd': 'تُدَوِّيَا',
      '1p': 'نُدَوِّيَ',
      '2mp': 'تُدَوُّوا',
      '2fp': 'تُدَوِّينَ',
      '3mp': 'يُدَوُّوا',
      '3fp': 'يُدَوِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('dwy-2')!, 'jussive')).toEqualT({
      '1s': 'أُدَوِّ',
      '2ms': 'تُدَوِّ',
      '2fs': 'تُدَوِّي',
      '3ms': 'يُدَوِّ',
      '3fs': 'تُدَوِّ',
      '2d': 'تُدَوِّيَا',
      '3md': 'يُدَوِّيَا',
      '3fd': 'تُدَوِّيَا',
      '1p': 'نُدَوِّ',
      '2mp': 'تُدَوُّوا',
      '2fp': 'تُدَوِّينَ',
      '3mp': 'يُدَوُّوا',
      '3fp': 'يُدَوِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('dwy-2')!)).toMatchObjectT({
      '2ms': 'دَوِّ',
      '2fs': 'دَوِّي',
      '2d': 'دَوِّيَا',
      '2mp': 'دَوُّوا',
      '2fp': 'دَوِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('dwy-2')!)).toMatchObjectT({
      '3ms': 'دُوِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-2')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُدَوَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-2')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُدَوَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-2')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُدَوَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('dwy-2')!)).toEqualT('مُدَوٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('dwy-2')!)).toEqualT('مُدَوًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('dwy-2')!))).toEqualT(new Set(['تَدْوِيَة']))
  })
})
