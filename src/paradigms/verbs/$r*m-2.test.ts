import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$r*m-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$r*m-2')!)).toEqualT({
      '1s': 'تَشَرْذَمْتُ',
      '2ms': 'تَشَرْذَمْتَ',
      '2fs': 'تَشَرْذَمْتِ',
      '3ms': 'تَشَرْذَمَ',
      '3fs': 'تَشَرْذَمَتْ',
      '2d': 'تَشَرْذَمْتُمَا',
      '3md': 'تَشَرْذَمَا',
      '3fd': 'تَشَرْذَمَتَا',
      '1p': 'تَشَرْذَمْنَا',
      '2mp': 'تَشَرْذَمْتُمْ',
      '2fp': 'تَشَرْذَمْتُنَّ',
      '3mp': 'تَشَرْذَمُوا',
      '3fp': 'تَشَرْذَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$r*m-2')!, 'indicative')).toEqualT({
      '1s': 'أَتَشَرْذَمُ',
      '2ms': 'تَتَشَرْذَمُ',
      '2fs': 'تَتَشَرْذَمِينَ',
      '3ms': 'يَتَشَرْذَمُ',
      '3fs': 'تَتَشَرْذَمُ',
      '2d': 'تَتَشَرْذَمَانِ',
      '3md': 'يَتَشَرْذَمَانِ',
      '3fd': 'تَتَشَرْذَمَانِ',
      '1p': 'نَتَشَرْذَمُ',
      '2mp': 'تَتَشَرْذَمُونَ',
      '2fp': 'تَتَشَرْذَمْنَ',
      '3mp': 'يَتَشَرْذَمُونَ',
      '3fp': 'يَتَشَرْذَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$r*m-2')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَشَرْذَمَ',
      '2ms': 'تَتَشَرْذَمَ',
      '2fs': 'تَتَشَرْذَمِي',
      '3ms': 'يَتَشَرْذَمَ',
      '3fs': 'تَتَشَرْذَمَ',
      '2d': 'تَتَشَرْذَمَا',
      '3md': 'يَتَشَرْذَمَا',
      '3fd': 'تَتَشَرْذَمَا',
      '1p': 'نَتَشَرْذَمَ',
      '2mp': 'تَتَشَرْذَمُوا',
      '2fp': 'تَتَشَرْذَمْنَ',
      '3mp': 'يَتَشَرْذَمُوا',
      '3fp': 'يَتَشَرْذَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$r*m-2')!, 'jussive')).toEqualT({
      '1s': 'أَتَشَرْذَمْ',
      '2ms': 'تَتَشَرْذَمْ',
      '2fs': 'تَتَشَرْذَمِي',
      '3ms': 'يَتَشَرْذَمْ',
      '3fs': 'تَتَشَرْذَمْ',
      '2d': 'تَتَشَرْذَمَا',
      '3md': 'يَتَشَرْذَمَا',
      '3fd': 'تَتَشَرْذَمَا',
      '1p': 'نَتَشَرْذَمْ',
      '2mp': 'تَتَشَرْذَمُوا',
      '2fp': 'تَتَشَرْذَمْنَ',
      '3mp': 'يَتَشَرْذَمُوا',
      '3fp': 'يَتَشَرْذَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$r*m-2')!)).toMatchObjectT({
      '2ms': 'تَشَرْذَمْ',
      '2fs': 'تَشَرْذَمِي',
      '2d': 'تَشَرْذَمَا',
      '2mp': 'تَشَرْذَمُوا',
      '2fp': 'تَشَرْذَمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$r*m-2')!)).toMatchObjectT({
      '3ms': 'تُشُرْذِمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$r*m-2')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَشَرْذَمُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$r*m-2')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَشَرْذَمَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$r*m-2')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَشَرْذَمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$r*m-2')!)).toEqualT('مُتَشَرْذِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$r*m-2')!)).toEqualT('مُتَشَرْذَم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$r*m-2')!))).toEqualT(new Set(['تَشَرْذُم']))
  })
})
