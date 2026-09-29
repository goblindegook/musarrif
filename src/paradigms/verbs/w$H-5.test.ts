import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('w$H-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('w$H-5')!)).toEqualT({
      '1s': 'تَوَشَّحْتُ',
      '2ms': 'تَوَشَّحْتَ',
      '2fs': 'تَوَشَّحْتِ',
      '3ms': 'تَوَشَّحَ',
      '3fs': 'تَوَشَّحَتْ',
      '2d': 'تَوَشَّحْتُمَا',
      '3md': 'تَوَشَّحَا',
      '3fd': 'تَوَشَّحَتَا',
      '1p': 'تَوَشَّحْنَا',
      '2mp': 'تَوَشَّحْتُمْ',
      '2fp': 'تَوَشَّحْتُنَّ',
      '3mp': 'تَوَشَّحُوا',
      '3fp': 'تَوَشَّحْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('w$H-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَشَّحُ',
      '2ms': 'تَتَوَشَّحُ',
      '2fs': 'تَتَوَشَّحِينَ',
      '3ms': 'يَتَوَشَّحُ',
      '3fs': 'تَتَوَشَّحُ',
      '2d': 'تَتَوَشَّحَانِ',
      '3md': 'يَتَوَشَّحَانِ',
      '3fd': 'تَتَوَشَّحَانِ',
      '1p': 'نَتَوَشَّحُ',
      '2mp': 'تَتَوَشَّحُونَ',
      '2fp': 'تَتَوَشَّحْنَ',
      '3mp': 'يَتَوَشَّحُونَ',
      '3fp': 'يَتَوَشَّحْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('w$H-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَشَّحَ',
      '2ms': 'تَتَوَشَّحَ',
      '2fs': 'تَتَوَشَّحِي',
      '3ms': 'يَتَوَشَّحَ',
      '3fs': 'تَتَوَشَّحَ',
      '2d': 'تَتَوَشَّحَا',
      '3md': 'يَتَوَشَّحَا',
      '3fd': 'تَتَوَشَّحَا',
      '1p': 'نَتَوَشَّحَ',
      '2mp': 'تَتَوَشَّحُوا',
      '2fp': 'تَتَوَشَّحْنَ',
      '3mp': 'يَتَوَشَّحُوا',
      '3fp': 'يَتَوَشَّحْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('w$H-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَشَّحْ',
      '2ms': 'تَتَوَشَّحْ',
      '2fs': 'تَتَوَشَّحِي',
      '3ms': 'يَتَوَشَّحْ',
      '3fs': 'تَتَوَشَّحْ',
      '2d': 'تَتَوَشَّحَا',
      '3md': 'يَتَوَشَّحَا',
      '3fd': 'تَتَوَشَّحَا',
      '1p': 'نَتَوَشَّحْ',
      '2mp': 'تَتَوَشَّحُوا',
      '2fp': 'تَتَوَشَّحْنَ',
      '3mp': 'يَتَوَشَّحُوا',
      '3fp': 'يَتَوَشَّحْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('w$H-5')!)).toMatchObjectT({
      '2ms': 'تَوَشَّحْ',
      '2fs': 'تَوَشَّحِي',
      '2d': 'تَوَشَّحَا',
      '2mp': 'تَوَشَّحُوا',
      '2fp': 'تَوَشَّحْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('w$H-5')!)).toMatchObjectT({
      '3ms': 'تُوُشِّحَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('w$H-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَوَشَّحُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('w$H-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَوَشَّحَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('w$H-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَوَشَّحْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('w$H-5')!)).toEqualT('مُتَوَشِّح')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('w$H-5')!)).toEqualT('مُتَوَشَّح')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('w$H-5')!))).toEqualT(new Set(['تَوَشُّح']))
  })
})
