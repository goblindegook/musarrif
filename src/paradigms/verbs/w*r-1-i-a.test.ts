import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('w*r-1-i-a (ElixirFM)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('w*r-1-i-a')!)).toEqualT({
      '1s': 'وَذِرْتُ',
      '2ms': 'وَذِرْتَ',
      '2fs': 'وَذِرْتِ',
      '3ms': 'وَذِرَ',
      '3fs': 'وَذِرَتْ',
      '2d': 'وَذِرْتُمَا',
      '3md': 'وَذِرَا',
      '3fd': 'وَذِرَتَا',
      '1p': 'وَذِرْنَا',
      '2mp': 'وَذِرْتُمْ',
      '2fp': 'وَذِرْتُنَّ',
      '3mp': 'وَذِرُوا',
      '3fp': 'وَذِرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('w*r-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أَذَرُ',
      '2ms': 'تَذَرُ',
      '2fs': 'تَذَرِينَ',
      '3ms': 'يَذَرُ',
      '3fs': 'تَذَرُ',
      '2d': 'تَذَرَانِ',
      '3md': 'يَذَرَانِ',
      '3fd': 'تَذَرَانِ',
      '1p': 'نَذَرُ',
      '2mp': 'تَذَرُونَ',
      '2fp': 'تَذَرْنَ',
      '3mp': 'يَذَرُونَ',
      '3fp': 'يَذَرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('w*r-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أَذَرَ',
      '2ms': 'تَذَرَ',
      '2fs': 'تَذَرِي',
      '3ms': 'يَذَرَ',
      '3fs': 'تَذَرَ',
      '2d': 'تَذَرَا',
      '3md': 'يَذَرَا',
      '3fd': 'تَذَرَا',
      '1p': 'نَذَرَ',
      '2mp': 'تَذَرُوا',
      '2fp': 'تَذَرْنَ',
      '3mp': 'يَذَرُوا',
      '3fp': 'يَذَرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('w*r-1-i-a')!, 'jussive')).toEqualT({
      '1s': 'أَذَرْ',
      '2ms': 'تَذَرْ',
      '2fs': 'تَذَرِي',
      '3ms': 'يَذَرْ',
      '3fs': 'تَذَرْ',
      '2d': 'تَذَرَا',
      '3md': 'يَذَرَا',
      '3fd': 'تَذَرَا',
      '1p': 'نَذَرْ',
      '2mp': 'تَذَرُوا',
      '2fp': 'تَذَرْنَ',
      '3mp': 'يَذَرُوا',
      '3fp': 'يَذَرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('w*r-1-i-a')!)).toMatchObjectT({
      '2ms': 'ذَرْ',
      '2fs': 'ذَرِي',
      '2d': 'ذَرَا',
      '2mp': 'ذَرُوا',
      '2fp': 'ذَرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('w*r-1-i-a')!)).toEqualT({
      '1s': 'وُذِرْتُ',
      '2ms': 'وُذِرْتَ',
      '2fs': 'وُذِرْتِ',
      '3ms': 'وُذِرَ',
      '3fs': 'وُذِرَتْ',
      '2d': 'وُذِرْتُمَا',
      '3md': 'وُذِرَا',
      '3fd': 'وُذِرَتَا',
      '1p': 'وُذِرْنَا',
      '2mp': 'وُذِرْتُمْ',
      '2fp': 'وُذِرْتُنَّ',
      '3mp': 'وُذِرُوا',
      '3fp': 'وُذِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('w*r-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أُوذَرُ',
      '2ms': 'تُوذَرُ',
      '2fs': 'تُوذَرِينَ',
      '3ms': 'يُوذَرُ',
      '3fs': 'تُوذَرُ',
      '2d': 'تُوذَرَانِ',
      '3md': 'يُوذَرَانِ',
      '3fd': 'تُوذَرَانِ',
      '1p': 'نُوذَرُ',
      '2mp': 'تُوذَرُونَ',
      '2fp': 'تُوذَرْنَ',
      '3mp': 'يُوذَرُونَ',
      '3fp': 'يُوذَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('w*r-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أُوذَرَ',
      '2ms': 'تُوذَرَ',
      '2fs': 'تُوذَرِي',
      '3ms': 'يُوذَرَ',
      '3fs': 'تُوذَرَ',
      '2d': 'تُوذَرَا',
      '3md': 'يُوذَرَا',
      '3fd': 'تُوذَرَا',
      '1p': 'نُوذَرَ',
      '2mp': 'تُوذَرُوا',
      '2fp': 'تُوذَرْنَ',
      '3mp': 'يُوذَرُوا',
      '3fp': 'يُوذَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('w*r-1-i-a')!, 'jussive')).toEqualT({
      '1s': 'أُوذَرْ',
      '2ms': 'تُوذَرْ',
      '2fs': 'تُوذَرِي',
      '3ms': 'يُوذَرْ',
      '3fs': 'تُوذَرْ',
      '2d': 'تُوذَرَا',
      '3md': 'يُوذَرَا',
      '3fd': 'تُوذَرَا',
      '1p': 'نُوذَرْ',
      '2mp': 'تُوذَرُوا',
      '2fp': 'تُوذَرْنَ',
      '3mp': 'يُوذَرُوا',
      '3fp': 'يُوذَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('w*r-1-i-a')!)).toEqualT('وَاذِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('w*r-1-i-a')!)).toEqualT('مَوْذُور')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('w*r-1-i-a')!))).toEqualT(new Set(['وَذَر']))
  })
})
