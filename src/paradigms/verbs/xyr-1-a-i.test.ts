import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xyr-1-a-i (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xyr-1-a-i')!)).toEqualT({
      '1s': 'خِرْتُ',
      '2ms': 'خِرْتَ',
      '2fs': 'خِرْتِ',
      '3ms': 'خَارَ',
      '3fs': 'خَارَتْ',
      '2d': 'خِرْتُمَا',
      '3md': 'خَارَا',
      '3fd': 'خَارَتَا',
      '1p': 'خِرْنَا',
      '2mp': 'خِرْتُمْ',
      '2fp': 'خِرْتُنَّ',
      '3mp': 'خَارُوا',
      '3fp': 'خِرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xyr-1-a-i')!, 'indicative')).toEqualT({
      '1s': 'أَخِيرُ',
      '2ms': 'تَخِيرُ',
      '2fs': 'تَخِيرِينَ',
      '3ms': 'يَخِيرُ',
      '3fs': 'تَخِيرُ',
      '2d': 'تَخِيرَانِ',
      '3md': 'يَخِيرَانِ',
      '3fd': 'تَخِيرَانِ',
      '1p': 'نَخِيرُ',
      '2mp': 'تَخِيرُونَ',
      '2fp': 'تَخِرْنَ',
      '3mp': 'يَخِيرُونَ',
      '3fp': 'يَخِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xyr-1-a-i')!, 'subjunctive')).toEqualT({
      '1s': 'أَخِيرَ',
      '2ms': 'تَخِيرَ',
      '2fs': 'تَخِيرِي',
      '3ms': 'يَخِيرَ',
      '3fs': 'تَخِيرَ',
      '2d': 'تَخِيرَا',
      '3md': 'يَخِيرَا',
      '3fd': 'تَخِيرَا',
      '1p': 'نَخِيرَ',
      '2mp': 'تَخِيرُوا',
      '2fp': 'تَخِرْنَ',
      '3mp': 'يَخِيرُوا',
      '3fp': 'يَخِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xyr-1-a-i')!, 'jussive')).toEqualT({
      '1s': 'أَخِرْ',
      '2ms': 'تَخِرْ',
      '2fs': 'تَخِيرِي',
      '3ms': 'يَخِرْ',
      '3fs': 'تَخِرْ',
      '2d': 'تَخِيرَا',
      '3md': 'يَخِيرَا',
      '3fd': 'تَخِيرَا',
      '1p': 'نَخِرْ',
      '2mp': 'تَخِيرُوا',
      '2fp': 'تَخِرْنَ',
      '3mp': 'يَخِيرُوا',
      '3fp': 'يَخِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xyr-1-a-i')!)).toMatchObjectT({
      '2ms': 'خِرْ',
      '2fs': 'خِيرِي',
      '2d': 'خِيرَا',
      '2mp': 'خِيرُوا',
      '2fp': 'خِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xyr-1-a-i')!)).toEqualT({
      '1s': 'خِرْتُ',
      '2ms': 'خِرْتَ',
      '2fs': 'خِرْتِ',
      '3ms': 'خِيرَ',
      '3fs': 'خِيرَتْ',
      '2d': 'خِرْتُمَا',
      '3md': 'خِيرَا',
      '3fd': 'خِيرَتَا',
      '1p': 'خِرْنَا',
      '2mp': 'خِرْتُمْ',
      '2fp': 'خِرْتُنَّ',
      '3mp': 'خِيرُوا',
      '3fp': 'خِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-1-a-i')!, 'indicative')).toEqualT({
      '1s': 'أُخَارُ',
      '2ms': 'تُخَارُ',
      '2fs': 'تُخَارِينَ',
      '3ms': 'يُخَارُ',
      '3fs': 'تُخَارُ',
      '2d': 'تُخَارَانِ',
      '3md': 'يُخَارَانِ',
      '3fd': 'تُخَارَانِ',
      '1p': 'نُخَارُ',
      '2mp': 'تُخَارُونَ',
      '2fp': 'تُخَرْنَ',
      '3mp': 'يُخَارُونَ',
      '3fp': 'يُخَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-1-a-i')!, 'subjunctive')).toEqualT({
      '1s': 'أُخَارَ',
      '2ms': 'تُخَارَ',
      '2fs': 'تُخَارِي',
      '3ms': 'يُخَارَ',
      '3fs': 'تُخَارَ',
      '2d': 'تُخَارَا',
      '3md': 'يُخَارَا',
      '3fd': 'تُخَارَا',
      '1p': 'نُخَارَ',
      '2mp': 'تُخَارُوا',
      '2fp': 'تُخَرْنَ',
      '3mp': 'يُخَارُوا',
      '3fp': 'يُخَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xyr-1-a-i')!, 'jussive')).toEqualT({
      '1s': 'أُخَرْ',
      '2ms': 'تُخَرْ',
      '2fs': 'تُخَارِي',
      '3ms': 'يُخَرْ',
      '3fs': 'تُخَرْ',
      '2d': 'تُخَارَا',
      '3md': 'يُخَارَا',
      '3fd': 'تُخَارَا',
      '1p': 'نُخَرْ',
      '2mp': 'تُخَارُوا',
      '2fp': 'تُخَرْنَ',
      '3mp': 'يُخَارُوا',
      '3fp': 'يُخَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xyr-1-a-i')!)).toEqualT('خَائِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xyr-1-a-i')!)).toEqualT('مَخِير')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('xyr-1-a-i')!))).toEqualT(new Set(['خَيْر', 'خِيرَة', 'خِيَرَة']))
  })
})
