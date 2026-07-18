import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('rdd-3', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('rdd-3')!)).toEqualT({
      '1s': 'رَادَدْتُ',
      '2ms': 'رَادَدْتَ',
      '2fs': 'رَادَدْتِ',
      '3ms': 'رَادَّ',
      '3fs': 'رَادَّتْ',
      '2d': 'رَادَدْتُمَا',
      '3md': 'رَادَّا',
      '3fd': 'رَادَّتَا',
      '1p': 'رَادَدْنَا',
      '2mp': 'رَادَدْتُمْ',
      '2fp': 'رَادَدْتُنَّ',
      '3mp': 'رَادُّوا',
      '3fp': 'رَادَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('rdd-3')!, 'indicative')).toEqualT({
      '1s': 'أُرَادُّ',
      '2ms': 'تُرَادُّ',
      '2fs': 'تُرَادِّينَ',
      '3ms': 'يُرَادُّ',
      '3fs': 'تُرَادُّ',
      '2d': 'تُرَادَّانِ',
      '3md': 'يُرَادَّانِ',
      '3fd': 'تُرَادَّانِ',
      '1p': 'نُرَادُّ',
      '2mp': 'تُرَادُّونَ',
      '2fp': 'تُرَادِدْنَ',
      '3mp': 'يُرَادُّونَ',
      '3fp': 'يُرَادِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُرَادَّ',
      '2ms': 'تُرَادَّ',
      '2fs': 'تُرَادِّي',
      '3ms': 'يُرَادَّ',
      '3fs': 'تُرَادَّ',
      '2d': 'تُرَادَّا',
      '3md': 'يُرَادَّا',
      '3fd': 'تُرَادَّا',
      '1p': 'نُرَادَّ',
      '2mp': 'تُرَادُّوا',
      '2fp': 'تُرَادِدْنَ',
      '3mp': 'يُرَادُّوا',
      '3fp': 'يُرَادِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('rdd-3')!, 'jussive')).toEqualT({
      '1s': 'أُرَادَّ',
      '2ms': 'تُرَادَّ',
      '2fs': 'تُرَادِّي',
      '3ms': 'يُرَادَّ',
      '3fs': 'تُرَادَّ',
      '2d': 'تُرَادَّا',
      '3md': 'يُرَادَّا',
      '3fd': 'تُرَادَّا',
      '1p': 'نُرَادَّ',
      '2mp': 'تُرَادُّوا',
      '2fp': 'تُرَادِدْنَ',
      '3mp': 'يُرَادُّوا',
      '3fp': 'يُرَادِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('rdd-3')!)).toMatchObjectT({
      '2ms': 'رَادَّ',
      '2fs': 'رَادِّي',
      '2d': 'رَادَّا',
      '2mp': 'رَادُّوا',
      '2fp': 'رَادِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('rdd-3')!)).toEqualT({
      '1s': 'رُودِدْتُ',
      '2ms': 'رُودِدْتَ',
      '2fs': 'رُودِدْتِ',
      '3ms': 'رُودَّ',
      '3fs': 'رُودَّتْ',
      '2d': 'رُودِدْتُمَا',
      '3md': 'رُودَّا',
      '3fd': 'رُودَّتَا',
      '1p': 'رُودِدْنَا',
      '2mp': 'رُودِدْتُمْ',
      '2fp': 'رُودِدْتُنَّ',
      '3mp': 'رُودُّوا',
      '3fp': 'رُودِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-3')!, 'indicative')).toEqualT({
      '1s': 'أُرَادُّ',
      '2ms': 'تُرَادُّ',
      '2fs': 'تُرَادِّينَ',
      '3ms': 'يُرَادُّ',
      '3fs': 'تُرَادُّ',
      '2d': 'تُرَادَّانِ',
      '3md': 'يُرَادَّانِ',
      '3fd': 'تُرَادَّانِ',
      '1p': 'نُرَادُّ',
      '2mp': 'تُرَادُّونَ',
      '2fp': 'تُرَادَدْنَ',
      '3mp': 'يُرَادُّونَ',
      '3fp': 'يُرَادَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُرَادَّ',
      '2ms': 'تُرَادَّ',
      '2fs': 'تُرَادِّي',
      '3ms': 'يُرَادَّ',
      '3fs': 'تُرَادَّ',
      '2d': 'تُرَادَّا',
      '3md': 'يُرَادَّا',
      '3fd': 'تُرَادَّا',
      '1p': 'نُرَادَّ',
      '2mp': 'تُرَادُّوا',
      '2fp': 'تُرَادَدْنَ',
      '3mp': 'يُرَادُّوا',
      '3fp': 'يُرَادَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdd-3')!, 'jussive')).toEqualT({
      '1s': 'أُرَادَّ',
      '2ms': 'تُرَادَّ',
      '2fs': 'تُرَادِّي',
      '3ms': 'يُرَادَّ',
      '3fs': 'تُرَادَّ',
      '2d': 'تُرَادَّا',
      '3md': 'يُرَادَّا',
      '3fd': 'تُرَادَّا',
      '1p': 'نُرَادَّ',
      '2mp': 'تُرَادُّوا',
      '2fp': 'تُرَادَدْنَ',
      '3mp': 'يُرَادُّوا',
      '3fp': 'يُرَادَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('rdd-3')!)).toEqualT('مُرَادّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('rdd-3')!)).toEqualT('مُرَادّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('rdd-3')!)).toEqualT(['مُرَادَّة'])
  })
})
