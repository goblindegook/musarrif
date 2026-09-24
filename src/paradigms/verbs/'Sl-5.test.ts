import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'Sl-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'Sl-5")!)).toEqualT({
      '1s': 'تَأَصَّلْتُ',
      '2ms': 'تَأَصَّلْتَ',
      '2fs': 'تَأَصَّلْتِ',
      '3ms': 'تَأَصَّلَ',
      '3fs': 'تَأَصَّلَتْ',
      '2d': 'تَأَصَّلْتُمَا',
      '3md': 'تَأَصَّلَا',
      '3fd': 'تَأَصَّلَتَا',
      '1p': 'تَأَصَّلْنَا',
      '2mp': 'تَأَصَّلْتُمْ',
      '2fp': 'تَأَصَّلْتُنَّ',
      '3mp': 'تَأَصَّلُوا',
      '3fp': 'تَأَصَّلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَصَّلُ',
      '2ms': 'تَتَأَصَّلُ',
      '2fs': 'تَتَأَصَّلِينَ',
      '3ms': 'يَتَأَصَّلُ',
      '3fs': 'تَتَأَصَّلُ',
      '2d': 'تَتَأَصَّلَانِ',
      '3md': 'يَتَأَصَّلَانِ',
      '3fd': 'تَتَأَصَّلَانِ',
      '1p': 'نَتَأَصَّلُ',
      '2mp': 'تَتَأَصَّلُونَ',
      '2fp': 'تَتَأَصَّلْنَ',
      '3mp': 'يَتَأَصَّلُونَ',
      '3fp': 'يَتَأَصَّلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَصَّلَ',
      '2ms': 'تَتَأَصَّلَ',
      '2fs': 'تَتَأَصَّلِي',
      '3ms': 'يَتَأَصَّلَ',
      '3fs': 'تَتَأَصَّلَ',
      '2d': 'تَتَأَصَّلَا',
      '3md': 'يَتَأَصَّلَا',
      '3fd': 'تَتَأَصَّلَا',
      '1p': 'نَتَأَصَّلَ',
      '2mp': 'تَتَأَصَّلُوا',
      '2fp': 'تَتَأَصَّلْنَ',
      '3mp': 'يَتَأَصَّلُوا',
      '3fp': 'يَتَأَصَّلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَصَّلْ',
      '2ms': 'تَتَأَصَّلْ',
      '2fs': 'تَتَأَصَّلِي',
      '3ms': 'يَتَأَصَّلْ',
      '3fs': 'تَتَأَصَّلْ',
      '2d': 'تَتَأَصَّلَا',
      '3md': 'يَتَأَصَّلَا',
      '3fd': 'تَتَأَصَّلَا',
      '1p': 'نَتَأَصَّلْ',
      '2mp': 'تَتَأَصَّلُوا',
      '2fp': 'تَتَأَصَّلْنَ',
      '3mp': 'يَتَأَصَّلُوا',
      '3fp': 'يَتَأَصَّلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'Sl-5")!)).toMatchObjectT({
      '2ms': 'تَأَصَّلْ',
      '2fs': 'تَأَصَّلِي',
      '2d': 'تَأَصَّلَا',
      '2mp': 'تَأَصَّلُوا',
      '2fp': 'تَأَصَّلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'Sl-5")!)).toMatchObjectT({
      '3ms': 'تُؤُصِّلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'Sl-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَأَصَّلُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'Sl-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَأَصَّلَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'Sl-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَأَصَّلْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'Sl-5")!)).toEqualT('مُتَأَصِّل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'Sl-5")!)).toEqualT('مُتَأَصَّل')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'Sl-5")!))).toEqualT(new Set(['تَأَصُّل']))
  })
})
