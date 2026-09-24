import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'lmn-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'lmn-2")!)).toEqualT({
      '1s': 'تَأَلْمَنْتُ',
      '2ms': 'تَأَلْمَنْتَ',
      '2fs': 'تَأَلْمَنْتِ',
      '3ms': 'تَأَلْمَنَ',
      '3fs': 'تَأَلْمَنَتْ',
      '2d': 'تَأَلْمَنْتُمَا',
      '3md': 'تَأَلْمَنَا',
      '3fd': 'تَأَلْمَنَتَا',
      '1p': 'تَأَلْمَنَّا',
      '2mp': 'تَأَلْمَنْتُمْ',
      '2fp': 'تَأَلْمَنْتُنَّ',
      '3mp': 'تَأَلْمَنُوا',
      '3fp': 'تَأَلْمَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'lmn-2")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَلْمَنُ',
      '2ms': 'تَتَأَلْمَنُ',
      '2fs': 'تَتَأَلْمَنِينَ',
      '3ms': 'يَتَأَلْمَنُ',
      '3fs': 'تَتَأَلْمَنُ',
      '2d': 'تَتَأَلْمَنَانِ',
      '3md': 'يَتَأَلْمَنَانِ',
      '3fd': 'تَتَأَلْمَنَانِ',
      '1p': 'نَتَأَلْمَنُ',
      '2mp': 'تَتَأَلْمَنُونَ',
      '2fp': 'تَتَأَلْمَنَّ',
      '3mp': 'يَتَأَلْمَنُونَ',
      '3fp': 'يَتَأَلْمَنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'lmn-2")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَلْمَنَ',
      '2ms': 'تَتَأَلْمَنَ',
      '2fs': 'تَتَأَلْمَنِي',
      '3ms': 'يَتَأَلْمَنَ',
      '3fs': 'تَتَأَلْمَنَ',
      '2d': 'تَتَأَلْمَنَا',
      '3md': 'يَتَأَلْمَنَا',
      '3fd': 'تَتَأَلْمَنَا',
      '1p': 'نَتَأَلْمَنَ',
      '2mp': 'تَتَأَلْمَنُوا',
      '2fp': 'تَتَأَلْمَنَّ',
      '3mp': 'يَتَأَلْمَنُوا',
      '3fp': 'يَتَأَلْمَنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'lmn-2")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَلْمَنْ',
      '2ms': 'تَتَأَلْمَنْ',
      '2fs': 'تَتَأَلْمَنِي',
      '3ms': 'يَتَأَلْمَنْ',
      '3fs': 'تَتَأَلْمَنْ',
      '2d': 'تَتَأَلْمَنَا',
      '3md': 'يَتَأَلْمَنَا',
      '3fd': 'تَتَأَلْمَنَا',
      '1p': 'نَتَأَلْمَنْ',
      '2mp': 'تَتَأَلْمَنُوا',
      '2fp': 'تَتَأَلْمَنَّ',
      '3mp': 'يَتَأَلْمَنُوا',
      '3fp': 'يَتَأَلْمَنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'lmn-2")!)).toMatchObjectT({
      '2ms': 'تَأَلْمَنْ',
      '2fs': 'تَأَلْمَنِي',
      '2d': 'تَأَلْمَنَا',
      '2mp': 'تَأَلْمَنُوا',
      '2fp': 'تَأَلْمَنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'lmn-2")!)).toMatchObjectT({
      '3ms': 'تُؤُلْمِنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lmn-2")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَأَلْمَنُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lmn-2")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَأَلْمَنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lmn-2")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَأَلْمَنْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'lmn-2")!)).toEqualT('مُتَأَلْمِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'lmn-2")!)).toEqualT('مُتَأَلْمَن')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'lmn-2")!))).toEqualT(new Set(['تَأَلْمُن']))
  })
})
