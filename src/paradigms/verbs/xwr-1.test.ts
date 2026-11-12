import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('xwr-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xwr-1')!)).toEqualT({
      '1s': 'خُرْتُ',
      '2ms': 'خُرْتَ',
      '2fs': 'خُرْتِ',
      '3ms': 'خَارَ',
      '3fs': 'خَارَتْ',
      '2d': 'خُرْتُمَا',
      '3md': 'خَارَا',
      '3fd': 'خَارَتَا',
      '1p': 'خُرْنَا',
      '2mp': 'خُرْتُمْ',
      '2fp': 'خُرْتُنَّ',
      '3mp': 'خَارُوا',
      '3fp': 'خُرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xwr-1')!, 'indicative')).toEqualT({
      '1s': 'أَخُورُ',
      '2ms': 'تَخُورُ',
      '2fs': 'تَخُورِينَ',
      '3ms': 'يَخُورُ',
      '3fs': 'تَخُورُ',
      '2d': 'تَخُورَانِ',
      '3md': 'يَخُورَانِ',
      '3fd': 'تَخُورَانِ',
      '1p': 'نَخُورُ',
      '2mp': 'تَخُورُونَ',
      '2fp': 'تَخُرْنَ',
      '3mp': 'يَخُورُونَ',
      '3fp': 'يَخُرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xwr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَخُورَ',
      '2ms': 'تَخُورَ',
      '2fs': 'تَخُورِي',
      '3ms': 'يَخُورَ',
      '3fs': 'تَخُورَ',
      '2d': 'تَخُورَا',
      '3md': 'يَخُورَا',
      '3fd': 'تَخُورَا',
      '1p': 'نَخُورَ',
      '2mp': 'تَخُورُوا',
      '2fp': 'تَخُرْنَ',
      '3mp': 'يَخُورُوا',
      '3fp': 'يَخُرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xwr-1')!, 'jussive')).toEqualT({
      '1s': 'أَخُرْ',
      '2ms': 'تَخُرْ',
      '2fs': 'تَخُورِي',
      '3ms': 'يَخُرْ',
      '3fs': 'تَخُرْ',
      '2d': 'تَخُورَا',
      '3md': 'يَخُورَا',
      '3fd': 'تَخُورَا',
      '1p': 'نَخُرْ',
      '2mp': 'تَخُورُوا',
      '2fp': 'تَخُرْنَ',
      '3mp': 'يَخُورُوا',
      '3fp': 'يَخُرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xwr-1')!)).toMatchObjectT({
      '2ms': 'خُرْ',
      '2fs': 'خُورِي',
      '2d': 'خُورَا',
      '2mp': 'خُورُوا',
      '2fp': 'خُرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xwr-1')!)).toEqualT('خَائِر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('xwr-1')!))).toEqualT(new Set(['خَوَر']))
  })
})
