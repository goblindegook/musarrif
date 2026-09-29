import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Dyq-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Dyq-6')!)).toEqualT({
      '1s': 'تَضَايَقْتُ',
      '2ms': 'تَضَايَقْتَ',
      '2fs': 'تَضَايَقْتِ',
      '3ms': 'تَضَايَقَ',
      '3fs': 'تَضَايَقَتْ',
      '2d': 'تَضَايَقْتُمَا',
      '3md': 'تَضَايَقَا',
      '3fd': 'تَضَايَقَتَا',
      '1p': 'تَضَايَقْنَا',
      '2mp': 'تَضَايَقْتُمْ',
      '2fp': 'تَضَايَقْتُنَّ',
      '3mp': 'تَضَايَقُوا',
      '3fp': 'تَضَايَقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَضَايَقُ',
      '2ms': 'تَتَضَايَقُ',
      '2fs': 'تَتَضَايَقِينَ',
      '3ms': 'يَتَضَايَقُ',
      '3fs': 'تَتَضَايَقُ',
      '2d': 'تَتَضَايَقَانِ',
      '3md': 'يَتَضَايَقَانِ',
      '3fd': 'تَتَضَايَقَانِ',
      '1p': 'نَتَضَايَقُ',
      '2mp': 'تَتَضَايَقُونَ',
      '2fp': 'تَتَضَايَقْنَ',
      '3mp': 'يَتَضَايَقُونَ',
      '3fp': 'يَتَضَايَقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَضَايَقَ',
      '2ms': 'تَتَضَايَقَ',
      '2fs': 'تَتَضَايَقِي',
      '3ms': 'يَتَضَايَقَ',
      '3fs': 'تَتَضَايَقَ',
      '2d': 'تَتَضَايَقَا',
      '3md': 'يَتَضَايَقَا',
      '3fd': 'تَتَضَايَقَا',
      '1p': 'نَتَضَايَقَ',
      '2mp': 'تَتَضَايَقُوا',
      '2fp': 'تَتَضَايَقْنَ',
      '3mp': 'يَتَضَايَقُوا',
      '3fp': 'يَتَضَايَقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَضَايَقْ',
      '2ms': 'تَتَضَايَقْ',
      '2fs': 'تَتَضَايَقِي',
      '3ms': 'يَتَضَايَقْ',
      '3fs': 'تَتَضَايَقْ',
      '2d': 'تَتَضَايَقَا',
      '3md': 'يَتَضَايَقَا',
      '3fd': 'تَتَضَايَقَا',
      '1p': 'نَتَضَايَقْ',
      '2mp': 'تَتَضَايَقُوا',
      '2fp': 'تَتَضَايَقْنَ',
      '3mp': 'يَتَضَايَقُوا',
      '3fp': 'يَتَضَايَقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Dyq-6')!)).toMatchObjectT({
      '2ms': 'تَضَايَقْ',
      '2fs': 'تَضَايَقِي',
      '2d': 'تَضَايَقَا',
      '2mp': 'تَضَايَقُوا',
      '2fp': 'تَضَايَقْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Dyq-6')!)).toEqualT('مُتَضَايِق')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Dyq-6')!))).toEqualT(new Set(['تَضَايُق']))
  })
})
