import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'ym-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ym-5")!)).toEqualT({
      '1s': 'تَأَيَّمْتُ',
      '2ms': 'تَأَيَّمْتَ',
      '2fs': 'تَأَيَّمْتِ',
      '3ms': 'تَأَيَّمَ',
      '3fs': 'تَأَيَّمَتْ',
      '2d': 'تَأَيَّمْتُمَا',
      '3md': 'تَأَيَّمَا',
      '3fd': 'تَأَيَّمَتَا',
      '1p': 'تَأَيَّمْنَا',
      '2mp': 'تَأَيَّمْتُمْ',
      '2fp': 'تَأَيَّمْتُنَّ',
      '3mp': 'تَأَيَّمُوا',
      '3fp': 'تَأَيَّمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ym-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَيَّمُ',
      '2ms': 'تَتَأَيَّمُ',
      '2fs': 'تَتَأَيَّمِينَ',
      '3ms': 'يَتَأَيَّمُ',
      '3fs': 'تَتَأَيَّمُ',
      '2d': 'تَتَأَيَّمَانِ',
      '3md': 'يَتَأَيَّمَانِ',
      '3fd': 'تَتَأَيَّمَانِ',
      '1p': 'نَتَأَيَّمُ',
      '2mp': 'تَتَأَيَّمُونَ',
      '2fp': 'تَتَأَيَّمْنَ',
      '3mp': 'يَتَأَيَّمُونَ',
      '3fp': 'يَتَأَيَّمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ym-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَيَّمَ',
      '2ms': 'تَتَأَيَّمَ',
      '2fs': 'تَتَأَيَّمِي',
      '3ms': 'يَتَأَيَّمَ',
      '3fs': 'تَتَأَيَّمَ',
      '2d': 'تَتَأَيَّمَا',
      '3md': 'يَتَأَيَّمَا',
      '3fd': 'تَتَأَيَّمَا',
      '1p': 'نَتَأَيَّمَ',
      '2mp': 'تَتَأَيَّمُوا',
      '2fp': 'تَتَأَيَّمْنَ',
      '3mp': 'يَتَأَيَّمُوا',
      '3fp': 'يَتَأَيَّمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ym-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَيَّمْ',
      '2ms': 'تَتَأَيَّمْ',
      '2fs': 'تَتَأَيَّمِي',
      '3ms': 'يَتَأَيَّمْ',
      '3fs': 'تَتَأَيَّمْ',
      '2d': 'تَتَأَيَّمَا',
      '3md': 'يَتَأَيَّمَا',
      '3fd': 'تَتَأَيَّمَا',
      '1p': 'نَتَأَيَّمْ',
      '2mp': 'تَتَأَيَّمُوا',
      '2fp': 'تَتَأَيَّمْنَ',
      '3mp': 'يَتَأَيَّمُوا',
      '3fp': 'يَتَأَيَّمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ym-5")!)).toMatchObjectT({
      '2ms': 'تَأَيَّمْ',
      '2fs': 'تَأَيَّمِي',
      '2d': 'تَأَيَّمَا',
      '2mp': 'تَأَيَّمُوا',
      '2fp': 'تَأَيَّمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'ym-5")!)).toMatchObjectT({
      '3ms': 'تُؤُيِّمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ym-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَأَيَّمُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ym-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَأَيَّمَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ym-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَأَيَّمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ym-5")!)).toEqualT('مُتَأَيِّم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'ym-5")!)).toEqualT('مُتَأَيَّم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'ym-5")!))).toEqualT(new Set(['تَأَيُّم']))
  })
})
