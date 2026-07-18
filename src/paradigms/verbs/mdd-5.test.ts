import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('mdd-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mdd-5')!)).toEqualT({
      '1s': 'تَمَدَّدْتُ',
      '2ms': 'تَمَدَّدْتَ',
      '2fs': 'تَمَدَّدْتِ',
      '3ms': 'تَمَدَّدَ',
      '3fs': 'تَمَدَّدَتْ',
      '2d': 'تَمَدَّدْتُمَا',
      '3md': 'تَمَدَّدَا',
      '3fd': 'تَمَدَّدَتَا',
      '1p': 'تَمَدَّدْنَا',
      '2mp': 'تَمَدَّدْتُمْ',
      '2fp': 'تَمَدَّدْتُنَّ',
      '3mp': 'تَمَدَّدُوا',
      '3fp': 'تَمَدَّدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mdd-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَمَدَّدُ',
      '2ms': 'تَتَمَدَّدُ',
      '2fs': 'تَتَمَدَّدِينَ',
      '3ms': 'يَتَمَدَّدُ',
      '3fs': 'تَتَمَدَّدُ',
      '2d': 'تَتَمَدَّدَانِ',
      '3md': 'يَتَمَدَّدَانِ',
      '3fd': 'تَتَمَدَّدَانِ',
      '1p': 'نَتَمَدَّدُ',
      '2mp': 'تَتَمَدَّدُونَ',
      '2fp': 'تَتَمَدَّدْنَ',
      '3mp': 'يَتَمَدَّدُونَ',
      '3fp': 'يَتَمَدَّدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَمَدَّدَ',
      '2ms': 'تَتَمَدَّدَ',
      '2fs': 'تَتَمَدَّدِي',
      '3ms': 'يَتَمَدَّدَ',
      '3fs': 'تَتَمَدَّدَ',
      '2d': 'تَتَمَدَّدَا',
      '3md': 'يَتَمَدَّدَا',
      '3fd': 'تَتَمَدَّدَا',
      '1p': 'نَتَمَدَّدَ',
      '2mp': 'تَتَمَدَّدُوا',
      '2fp': 'تَتَمَدَّدْنَ',
      '3mp': 'يَتَمَدَّدُوا',
      '3fp': 'يَتَمَدَّدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَمَدَّدْ',
      '2ms': 'تَتَمَدَّدْ',
      '2fs': 'تَتَمَدَّدِي',
      '3ms': 'يَتَمَدَّدْ',
      '3fs': 'تَتَمَدَّدْ',
      '2d': 'تَتَمَدَّدَا',
      '3md': 'يَتَمَدَّدَا',
      '3fd': 'تَتَمَدَّدَا',
      '1p': 'نَتَمَدَّدْ',
      '2mp': 'تَتَمَدَّدُوا',
      '2fp': 'تَتَمَدَّدْنَ',
      '3mp': 'يَتَمَدَّدُوا',
      '3fp': 'يَتَمَدَّدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mdd-5')!)).toMatchObjectT({
      '2ms': 'تَمَدَّدْ',
      '2fs': 'تَمَدَّدِي',
      '2d': 'تَمَدَّدَا',
      '2mp': 'تَمَدَّدُوا',
      '2fp': 'تَمَدَّدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mdd-5')!)).toEqualT('مُتَمَدِّد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mdd-5')!)).toEqualT(['تَمَدُّد'])
  })
})
