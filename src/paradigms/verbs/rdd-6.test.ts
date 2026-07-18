import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('rdd-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('rdd-6')!)).toEqualT({
      '1s': 'تَرَادَدْتُ',
      '2ms': 'تَرَادَدْتَ',
      '2fs': 'تَرَادَدْتِ',
      '3ms': 'تَرَادَّ',
      '3fs': 'تَرَادَّتْ',
      '2d': 'تَرَادَدْتُمَا',
      '3md': 'تَرَادَّا',
      '3fd': 'تَرَادَّتَا',
      '1p': 'تَرَادَدْنَا',
      '2mp': 'تَرَادَدْتُمْ',
      '2fp': 'تَرَادَدْتُنَّ',
      '3mp': 'تَرَادُّوا',
      '3fp': 'تَرَادَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('rdd-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَرَادُّ',
      '2ms': 'تَتَرَادُّ',
      '2fs': 'تَتَرَادِّينَ',
      '3ms': 'يَتَرَادُّ',
      '3fs': 'تَتَرَادُّ',
      '2d': 'تَتَرَادَّانِ',
      '3md': 'يَتَرَادَّانِ',
      '3fd': 'تَتَرَادَّانِ',
      '1p': 'نَتَرَادُّ',
      '2mp': 'تَتَرَادُّونَ',
      '2fp': 'تَتَرَادَدْنَ',
      '3mp': 'يَتَرَادُّونَ',
      '3fp': 'يَتَرَادَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَرَادَّ',
      '2ms': 'تَتَرَادَّ',
      '2fs': 'تَتَرَادِّي',
      '3ms': 'يَتَرَادَّ',
      '3fs': 'تَتَرَادَّ',
      '2d': 'تَتَرَادَّا',
      '3md': 'يَتَرَادَّا',
      '3fd': 'تَتَرَادَّا',
      '1p': 'نَتَرَادَّ',
      '2mp': 'تَتَرَادُّوا',
      '2fp': 'تَتَرَادَدْنَ',
      '3mp': 'يَتَرَادُّوا',
      '3fp': 'يَتَرَادَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَرَادَّ',
      '2ms': 'تَتَرَادَّ',
      '2fs': 'تَتَرَادِّي',
      '3ms': 'يَتَرَادَّ',
      '3fs': 'تَتَرَادَّ',
      '2d': 'تَتَرَادَّا',
      '3md': 'يَتَرَادَّا',
      '3fd': 'تَتَرَادَّا',
      '1p': 'نَتَرَادَّ',
      '2mp': 'تَتَرَادُّوا',
      '2fp': 'تَتَرَادَدْنَ',
      '3mp': 'يَتَرَادُّوا',
      '3fp': 'يَتَرَادَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('rdd-6')!)).toMatchObjectT({
      '2ms': 'تَرَادَّ',
      '2fs': 'تَرَادِّي',
      '2d': 'تَرَادَّا',
      '2mp': 'تَرَادُّوا',
      '2fp': 'تَرَادَدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('rdd-6')!)).toEqualT({
      '1s': 'تُرُودِدْتُ',
      '2ms': 'تُرُودِدْتَ',
      '2fs': 'تُرُودِدْتِ',
      '3ms': 'تُرُودَّ',
      '3fs': 'تُرُودَّتْ',
      '2d': 'تُرُودِدْتُمَا',
      '3md': 'تُرُودَّا',
      '3fd': 'تُرُودَّتَا',
      '1p': 'تُرُودِدْنَا',
      '2mp': 'تُرُودِدْتُمْ',
      '2fp': 'تُرُودِدْتُنَّ',
      '3mp': 'تُرُودُّوا',
      '3fp': 'تُرُودِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-6')!, 'indicative')).toEqualT({
      '1s': 'أُتَرَادُّ',
      '2ms': 'تُتَرَادُّ',
      '2fs': 'تُتَرَادِّينَ',
      '3ms': 'يُتَرَادُّ',
      '3fs': 'تُتَرَادُّ',
      '2d': 'تُتَرَادَّانِ',
      '3md': 'يُتَرَادَّانِ',
      '3fd': 'تُتَرَادَّانِ',
      '1p': 'نُتَرَادُّ',
      '2mp': 'تُتَرَادُّونَ',
      '2fp': 'تُتَرَادَدْنَ',
      '3mp': 'يُتَرَادُّونَ',
      '3fp': 'يُتَرَادَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-6')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَرَادَّ',
      '2ms': 'تُتَرَادَّ',
      '2fs': 'تُتَرَادِّي',
      '3ms': 'يُتَرَادَّ',
      '3fs': 'تُتَرَادَّ',
      '2d': 'تُتَرَادَّا',
      '3md': 'يُتَرَادَّا',
      '3fd': 'تُتَرَادَّا',
      '1p': 'نُتَرَادَّ',
      '2mp': 'تُتَرَادُّوا',
      '2fp': 'تُتَرَادَدْنَ',
      '3mp': 'يُتَرَادُّوا',
      '3fp': 'يُتَرَادَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-6')!, 'jussive')).toEqualT({
      '1s': 'أُتَرَادَّ',
      '2ms': 'تُتَرَادَّ',
      '2fs': 'تُتَرَادِّي',
      '3ms': 'يُتَرَادَّ',
      '3fs': 'تُتَرَادَّ',
      '2d': 'تُتَرَادَّا',
      '3md': 'يُتَرَادَّا',
      '3fd': 'تُتَرَادَّا',
      '1p': 'نُتَرَادَّ',
      '2mp': 'تُتَرَادُّوا',
      '2fp': 'تُتَرَادَدْنَ',
      '3mp': 'يُتَرَادُّوا',
      '3fp': 'يُتَرَادَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('rdd-6')!)).toEqualT('مُتَرَادّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('rdd-6')!)).toEqualT('مُتَرَادّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('rdd-6')!)).toEqualT(['تَرَادّ'])
  })
})
