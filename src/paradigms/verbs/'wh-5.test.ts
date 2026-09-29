import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wh-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wh-5")!)).toEqualT({
      '1s': 'تَأَوَّهْتُ',
      '2ms': 'تَأَوَّهْتَ',
      '2fs': 'تَأَوَّهْتِ',
      '3ms': 'تَأَوَّهَ',
      '3fs': 'تَأَوَّهَتْ',
      '2d': 'تَأَوَّهْتُمَا',
      '3md': 'تَأَوَّهَا',
      '3fd': 'تَأَوَّهَتَا',
      '1p': 'تَأَوَّهْنَا',
      '2mp': 'تَأَوَّهْتُمْ',
      '2fp': 'تَأَوَّهْتُنَّ',
      '3mp': 'تَأَوَّهُوا',
      '3fp': 'تَأَوَّهْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wh-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَوَّهُ',
      '2ms': 'تَتَأَوَّهُ',
      '2fs': 'تَتَأَوَّهِينَ',
      '3ms': 'يَتَأَوَّهُ',
      '3fs': 'تَتَأَوَّهُ',
      '2d': 'تَتَأَوَّهَانِ',
      '3md': 'يَتَأَوَّهَانِ',
      '3fd': 'تَتَأَوَّهَانِ',
      '1p': 'نَتَأَوَّهُ',
      '2mp': 'تَتَأَوَّهُونَ',
      '2fp': 'تَتَأَوَّهْنَ',
      '3mp': 'يَتَأَوَّهُونَ',
      '3fp': 'يَتَأَوَّهْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wh-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَوَّهَ',
      '2ms': 'تَتَأَوَّهَ',
      '2fs': 'تَتَأَوَّهِي',
      '3ms': 'يَتَأَوَّهَ',
      '3fs': 'تَتَأَوَّهَ',
      '2d': 'تَتَأَوَّهَا',
      '3md': 'يَتَأَوَّهَا',
      '3fd': 'تَتَأَوَّهَا',
      '1p': 'نَتَأَوَّهَ',
      '2mp': 'تَتَأَوَّهُوا',
      '2fp': 'تَتَأَوَّهْنَ',
      '3mp': 'يَتَأَوَّهُوا',
      '3fp': 'يَتَأَوَّهْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wh-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَوَّهْ',
      '2ms': 'تَتَأَوَّهْ',
      '2fs': 'تَتَأَوَّهِي',
      '3ms': 'يَتَأَوَّهْ',
      '3fs': 'تَتَأَوَّهْ',
      '2d': 'تَتَأَوَّهَا',
      '3md': 'يَتَأَوَّهَا',
      '3fd': 'تَتَأَوَّهَا',
      '1p': 'نَتَأَوَّهْ',
      '2mp': 'تَتَأَوَّهُوا',
      '2fp': 'تَتَأَوَّهْنَ',
      '3mp': 'يَتَأَوَّهُوا',
      '3fp': 'يَتَأَوَّهْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wh-5")!)).toMatchObjectT({
      '2ms': 'تَأَوَّهْ',
      '2fs': 'تَأَوَّهِي',
      '2d': 'تَأَوَّهَا',
      '2mp': 'تَأَوَّهُوا',
      '2fp': 'تَأَوَّهْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wh-5")!)).toMatchObjectT({
      '3ms': 'تُؤُوِّهَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wh-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَأَوَّهُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wh-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَأَوَّهَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wh-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَأَوَّهْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'wh-5")!)).toEqualT('مُتَأَوِّه')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wh-5")!)).toEqualT('مُتَأَوَّه')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'wh-5")!))).toEqualT(new Set(['تَأَوُّه']))
  })
})
