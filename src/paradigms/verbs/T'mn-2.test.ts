import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("T'mn-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("T'mn-2")!)).toEqualT({
      '1s': 'تَطَأْمَنْتُ',
      '2ms': 'تَطَأْمَنْتَ',
      '2fs': 'تَطَأْمَنْتِ',
      '3ms': 'تَطَأْمَنَ',
      '3fs': 'تَطَأْمَنَتْ',
      '2d': 'تَطَأْمَنْتُمَا',
      '3md': 'تَطَأْمَنَا',
      '3fd': 'تَطَأْمَنَتَا',
      '1p': 'تَطَأْمَنَّا',
      '2mp': 'تَطَأْمَنْتُمْ',
      '2fp': 'تَطَأْمَنْتُنَّ',
      '3mp': 'تَطَأْمَنُوا',
      '3fp': 'تَطَأْمَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("T'mn-2")!, 'indicative')).toEqualT({
      '1s': 'أَتَطَأْمَنُ',
      '2ms': 'تَتَطَأْمَنُ',
      '2fs': 'تَتَطَأْمَنِينَ',
      '3ms': 'يَتَطَأْمَنُ',
      '3fs': 'تَتَطَأْمَنُ',
      '2d': 'تَتَطَأْمَنَانِ',
      '3md': 'يَتَطَأْمَنَانِ',
      '3fd': 'تَتَطَأْمَنَانِ',
      '1p': 'نَتَطَأْمَنُ',
      '2mp': 'تَتَطَأْمَنُونَ',
      '2fp': 'تَتَطَأْمَنَّ',
      '3mp': 'يَتَطَأْمَنُونَ',
      '3fp': 'يَتَطَأْمَنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("T'mn-2")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَطَأْمَنَ',
      '2ms': 'تَتَطَأْمَنَ',
      '2fs': 'تَتَطَأْمَنِي',
      '3ms': 'يَتَطَأْمَنَ',
      '3fs': 'تَتَطَأْمَنَ',
      '2d': 'تَتَطَأْمَنَا',
      '3md': 'يَتَطَأْمَنَا',
      '3fd': 'تَتَطَأْمَنَا',
      '1p': 'نَتَطَأْمَنَ',
      '2mp': 'تَتَطَأْمَنُوا',
      '2fp': 'تَتَطَأْمَنَّ',
      '3mp': 'يَتَطَأْمَنُوا',
      '3fp': 'يَتَطَأْمَنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("T'mn-2")!, 'jussive')).toEqualT({
      '1s': 'أَتَطَأْمَنْ',
      '2ms': 'تَتَطَأْمَنْ',
      '2fs': 'تَتَطَأْمَنِي',
      '3ms': 'يَتَطَأْمَنْ',
      '3fs': 'تَتَطَأْمَنْ',
      '2d': 'تَتَطَأْمَنَا',
      '3md': 'يَتَطَأْمَنَا',
      '3fd': 'تَتَطَأْمَنَا',
      '1p': 'نَتَطَأْمَنْ',
      '2mp': 'تَتَطَأْمَنُوا',
      '2fp': 'تَتَطَأْمَنَّ',
      '3mp': 'يَتَطَأْمَنُوا',
      '3fp': 'يَتَطَأْمَنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("T'mn-2")!)).toMatchObjectT({
      '2ms': 'تَطَأْمَنْ',
      '2fs': 'تَطَأْمَنِي',
      '2d': 'تَطَأْمَنَا',
      '2mp': 'تَطَأْمَنُوا',
      '2fp': 'تَطَأْمَنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("T'mn-2")!)).toMatchObjectT({
      '3ms': 'تُطُؤْمِنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'mn-2")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَطَأْمَنُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'mn-2")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَطَأْمَنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'mn-2")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَطَأْمَنْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("T'mn-2")!)).toEqualT('مُتَطَأْمِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("T'mn-2")!)).toEqualT('مُتَطَأْمَن')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("T'mn-2")!))).toEqualT(new Set(['تَطَأْمُن']))
  })
})
