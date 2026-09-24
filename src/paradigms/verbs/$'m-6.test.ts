import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("$'m-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("$'m-6")!)).toEqualT({
      '1s': 'تَشَاءَمْتُ',
      '2ms': 'تَشَاءَمْتَ',
      '2fs': 'تَشَاءَمْتِ',
      '3ms': 'تَشَاءَمَ',
      '3fs': 'تَشَاءَمَتْ',
      '2d': 'تَشَاءَمْتُمَا',
      '3md': 'تَشَاءَمَا',
      '3fd': 'تَشَاءَمَتَا',
      '1p': 'تَشَاءَمْنَا',
      '2mp': 'تَشَاءَمْتُمْ',
      '2fp': 'تَشَاءَمْتُنَّ',
      '3mp': 'تَشَاءَمُوا',
      '3fp': 'تَشَاءَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("$'m-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَشَاءَمُ',
      '2ms': 'تَتَشَاءَمُ',
      '2fs': 'تَتَشَاءَمِينَ',
      '3ms': 'يَتَشَاءَمُ',
      '3fs': 'تَتَشَاءَمُ',
      '2d': 'تَتَشَاءَمَانِ',
      '3md': 'يَتَشَاءَمَانِ',
      '3fd': 'تَتَشَاءَمَانِ',
      '1p': 'نَتَشَاءَمُ',
      '2mp': 'تَتَشَاءَمُونَ',
      '2fp': 'تَتَشَاءَمْنَ',
      '3mp': 'يَتَشَاءَمُونَ',
      '3fp': 'يَتَشَاءَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("$'m-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَشَاءَمَ',
      '2ms': 'تَتَشَاءَمَ',
      '2fs': 'تَتَشَاءَمِي',
      '3ms': 'يَتَشَاءَمَ',
      '3fs': 'تَتَشَاءَمَ',
      '2d': 'تَتَشَاءَمَا',
      '3md': 'يَتَشَاءَمَا',
      '3fd': 'تَتَشَاءَمَا',
      '1p': 'نَتَشَاءَمَ',
      '2mp': 'تَتَشَاءَمُوا',
      '2fp': 'تَتَشَاءَمْنَ',
      '3mp': 'يَتَشَاءَمُوا',
      '3fp': 'يَتَشَاءَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("$'m-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَشَاءَمْ',
      '2ms': 'تَتَشَاءَمْ',
      '2fs': 'تَتَشَاءَمِي',
      '3ms': 'يَتَشَاءَمْ',
      '3fs': 'تَتَشَاءَمْ',
      '2d': 'تَتَشَاءَمَا',
      '3md': 'يَتَشَاءَمَا',
      '3fd': 'تَتَشَاءَمَا',
      '1p': 'نَتَشَاءَمْ',
      '2mp': 'تَتَشَاءَمُوا',
      '2fp': 'تَتَشَاءَمْنَ',
      '3mp': 'يَتَشَاءَمُوا',
      '3fp': 'يَتَشَاءَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("$'m-6")!)).toMatchObjectT({
      '2ms': 'تَشَاءَمْ',
      '2fs': 'تَشَاءَمِي',
      '2d': 'تَشَاءَمَا',
      '2mp': 'تَشَاءَمُوا',
      '2fp': 'تَشَاءَمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("$'m-6")!)).toMatchObjectT({
      '3ms': 'تُشُوئِمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("$'m-6")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَشَاءَمُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$'m-6")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَشَاءَمَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$'m-6")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَشَاءَمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("$'m-6")!)).toEqualT('مُتَشَائِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("$'m-6")!)).toEqualT('مُتَشَاءَم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("$'m-6")!))).toEqualT(new Set(['تَشَاؤُم']))
  })
})
