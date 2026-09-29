import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wdd-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wdd-3')!)).toEqualT({
      '1s': 'وَادَدْتُ',
      '2ms': 'وَادَدْتَ',
      '2fs': 'وَادَدْتِ',
      '3ms': 'وَادَّ',
      '3fs': 'وَادَّتْ',
      '2d': 'وَادَدْتُمَا',
      '3md': 'وَادَّا',
      '3fd': 'وَادَّتَا',
      '1p': 'وَادَدْنَا',
      '2mp': 'وَادَدْتُمْ',
      '2fp': 'وَادَدْتُنَّ',
      '3mp': 'وَادُّوا',
      '3fp': 'وَادَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wdd-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَادُّ',
      '2ms': 'تُوَادُّ',
      '2fs': 'تُوَادِّينَ',
      '3ms': 'يُوَادُّ',
      '3fs': 'تُوَادُّ',
      '2d': 'تُوَادَّانِ',
      '3md': 'يُوَادَّانِ',
      '3fd': 'تُوَادَّانِ',
      '1p': 'نُوَادُّ',
      '2mp': 'تُوَادُّونَ',
      '2fp': 'تُوَادِدْنَ',
      '3mp': 'يُوَادُّونَ',
      '3fp': 'يُوَادِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَادَّ',
      '2ms': 'تُوَادَّ',
      '2fs': 'تُوَادِّي',
      '3ms': 'يُوَادَّ',
      '3fs': 'تُوَادَّ',
      '2d': 'تُوَادَّا',
      '3md': 'يُوَادَّا',
      '3fd': 'تُوَادَّا',
      '1p': 'نُوَادَّ',
      '2mp': 'تُوَادُّوا',
      '2fp': 'تُوَادِدْنَ',
      '3mp': 'يُوَادُّوا',
      '3fp': 'يُوَادِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-3')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُوَادَّ', 'أُوَادِّ', 'أُوَادِدْ']),
      '2ms': expect.toBeOneOf(['تُوَادَّ', 'تُوَادِّ', 'تُوَادِدْ']),
      '2fs': 'تُوَادِّي',
      '3ms': expect.toBeOneOf(['يُوَادَّ', 'يُوَادِّ', 'يُوَادِدْ']),
      '3fs': expect.toBeOneOf(['تُوَادَّ', 'تُوَادِّ', 'تُوَادِدْ']),
      '2d': 'تُوَادَّا',
      '3md': 'يُوَادَّا',
      '3fd': 'تُوَادَّا',
      '1p': expect.toBeOneOf(['نُوَادَّ', 'نُوَادِّ', 'نُوَادِدْ']),
      '2mp': 'تُوَادُّوا',
      '2fp': 'تُوَادِدْنَ',
      '3mp': 'يُوَادُّوا',
      '3fp': 'يُوَادِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wdd-3')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['وَادَّ', 'وَادِّ', 'وَادِدْ']),
      '2fs': 'وَادِّي',
      '2d': 'وَادَّا',
      '2mp': 'وَادُّوا',
      '2fp': 'وَادِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wdd-3')!)).toEqualT({
      '1s': 'وُودِدْتُ',
      '2ms': 'وُودِدْتَ',
      '2fs': 'وُودِدْتِ',
      '3ms': 'وُودَّ',
      '3fs': 'وُودَّتْ',
      '2d': 'وُودِدْتُمَا',
      '3md': 'وُودَّا',
      '3fd': 'وُودَّتَا',
      '1p': 'وُودِدْنَا',
      '2mp': 'وُودِدْتُمْ',
      '2fp': 'وُودِدْتُنَّ',
      '3mp': 'وُودُّوا',
      '3fp': 'وُودِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَادُّ',
      '2ms': 'تُوَادُّ',
      '2fs': 'تُوَادِّينَ',
      '3ms': 'يُوَادُّ',
      '3fs': 'تُوَادُّ',
      '2d': 'تُوَادَّانِ',
      '3md': 'يُوَادَّانِ',
      '3fd': 'تُوَادَّانِ',
      '1p': 'نُوَادُّ',
      '2mp': 'تُوَادُّونَ',
      '2fp': 'تُوَادَدْنَ',
      '3mp': 'يُوَادُّونَ',
      '3fp': 'يُوَادَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَادَّ',
      '2ms': 'تُوَادَّ',
      '2fs': 'تُوَادِّي',
      '3ms': 'يُوَادَّ',
      '3fs': 'تُوَادَّ',
      '2d': 'تُوَادَّا',
      '3md': 'يُوَادَّا',
      '3fd': 'تُوَادَّا',
      '1p': 'نُوَادَّ',
      '2mp': 'تُوَادُّوا',
      '2fp': 'تُوَادَدْنَ',
      '3mp': 'يُوَادُّوا',
      '3fp': 'يُوَادَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-3')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُوَادَّ', 'أُوَادِّ', 'أُوَادَدْ']),
      '2ms': expect.toBeOneOf(['تُوَادَّ', 'تُوَادِّ', 'تُوَادَدْ']),
      '2fs': 'تُوَادِّي',
      '3ms': expect.toBeOneOf(['يُوَادَّ', 'يُوَادِّ', 'يُوَادَدْ']),
      '3fs': expect.toBeOneOf(['تُوَادَّ', 'تُوَادِّ', 'تُوَادَدْ']),
      '2d': 'تُوَادَّا',
      '3md': 'يُوَادَّا',
      '3fd': 'تُوَادَّا',
      '1p': expect.toBeOneOf(['نُوَادَّ', 'نُوَادِّ', 'نُوَادَدْ']),
      '2mp': 'تُوَادُّوا',
      '2fp': 'تُوَادَدْنَ',
      '3mp': 'يُوَادُّوا',
      '3fp': 'يُوَادَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wdd-3')!)).toEqualT('مُوَادّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wdd-3')!)).toEqualT('مُوَادّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wdd-3')!))).toEqualT(new Set(['وِدَاد', 'مُوَادَّة']))
  })
})
