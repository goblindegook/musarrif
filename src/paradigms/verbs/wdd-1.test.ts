import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wdd-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wdd-1')!)).toEqualT({
      '1s': 'وَدِدْتُ',
      '2ms': 'وَدِدْتَ',
      '2fs': 'وَدِدْتِ',
      '3ms': 'وَدَّ',
      '3fs': 'وَدَّتْ',
      '2d': 'وَدِدْتُمَا',
      '3md': 'وَدَّا',
      '3fd': 'وَدَّتَا',
      '1p': 'وَدِدْنَا',
      '2mp': 'وَدِدْتُمْ',
      '2fp': 'وَدِدْتُنَّ',
      '3mp': 'وَدُّوا',
      '3fp': 'وَدِدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wdd-1')!, 'indicative')).toEqualT({
      '1s': 'أَوَدُّ',
      '2ms': 'تَوَدُّ',
      '2fs': 'تَوَدِّينَ',
      '3ms': 'يَوَدُّ',
      '3fs': 'تَوَدُّ',
      '2d': 'تَوَدَّانِ',
      '3md': 'يَوَدَّانِ',
      '3fd': 'تَوَدَّانِ',
      '1p': 'نَوَدُّ',
      '2mp': 'تَوَدُّونَ',
      '2fp': 'تَوْدَدْنَ',
      '3mp': 'يَوَدُّونَ',
      '3fp': 'يَوْدَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَوَدَّ',
      '2ms': 'تَوَدَّ',
      '2fs': 'تَوَدِّي',
      '3ms': 'يَوَدَّ',
      '3fs': 'تَوَدَّ',
      '2d': 'تَوَدَّا',
      '3md': 'يَوَدَّا',
      '3fd': 'تَوَدَّا',
      '1p': 'نَوَدَّ',
      '2mp': 'تَوَدُّوا',
      '2fp': 'تَوْدَدْنَ',
      '3mp': 'يَوَدُّوا',
      '3fp': 'يَوْدَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-1')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَوَدَّ', 'أَوَدِّ', 'أَوْدَدْ']),
      '2ms': expect.toBeOneOf(['تَوَدَّ', 'تَوَدِّ', 'تَوْدَدْ']),
      '2fs': 'تَوَدِّي',
      '3ms': expect.toBeOneOf(['يَوَدَّ', 'يَوَدِّ', 'يَوْدَدْ']),
      '3fs': expect.toBeOneOf(['تَوَدَّ', 'تَوَدِّ', 'تَوْدَدْ']),
      '2d': 'تَوَدَّا',
      '3md': 'يَوَدَّا',
      '3fd': 'تَوَدَّا',
      '1p': expect.toBeOneOf(['نَوَدَّ', 'نَوَدِّ', 'نَوْدَدْ']),
      '2mp': 'تَوَدُّوا',
      '2fp': 'تَوْدَدْنَ',
      '3mp': 'يَوَدُّوا',
      '3fp': 'يَوْدَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wdd-1')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['وَدَّ', 'وَدِّ', 'اِيدَدْ']),
      '2fs': 'وَدِّي',
      '2d': 'وَدَّا',
      '2mp': 'وَدُّوا',
      '2fp': 'اِيدَدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wdd-1')!)).toEqualT({
      '1s': 'وُدِدْتُ',
      '2ms': 'وُدِدْتَ',
      '2fs': 'وُدِدْتِ',
      '3ms': 'وُدَّ',
      '3fs': 'وُدَّتْ',
      '2d': 'وُدِدْتُمَا',
      '3md': 'وُدَّا',
      '3fd': 'وُدَّتَا',
      '1p': 'وُدِدْنَا',
      '2mp': 'وُدِدْتُمْ',
      '2fp': 'وُدِدْتُنَّ',
      '3mp': 'وُدُّوا',
      '3fp': 'وُدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-1')!, 'indicative')).toEqualT({
      '1s': 'أُوَدُّ',
      '2ms': 'تُوَدُّ',
      '2fs': 'تُوَدِّينَ',
      '3ms': 'يُوَدُّ',
      '3fs': 'تُوَدُّ',
      '2d': 'تُوَدَّانِ',
      '3md': 'يُوَدَّانِ',
      '3fd': 'تُوَدَّانِ',
      '1p': 'نُوَدُّ',
      '2mp': 'تُوَدُّونَ',
      '2fp': 'تُودَدْنَ',
      '3mp': 'يُوَدُّونَ',
      '3fp': 'يُودَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَدَّ',
      '2ms': 'تُوَدَّ',
      '2fs': 'تُوَدِّي',
      '3ms': 'يُوَدَّ',
      '3fs': 'تُوَدَّ',
      '2d': 'تُوَدَّا',
      '3md': 'يُوَدَّا',
      '3fd': 'تُوَدَّا',
      '1p': 'نُوَدَّ',
      '2mp': 'تُوَدُّوا',
      '2fp': 'تُودَدْنَ',
      '3mp': 'يُوَدُّوا',
      '3fp': 'يُودَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-1')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُوَدَّ', 'أُوَدِّ', 'أُودَدْ']),
      '2ms': expect.toBeOneOf(['تُوَدَّ', 'تُوَدِّ', 'تُودَدْ']),
      '2fs': 'تُوَدِّي',
      '3ms': expect.toBeOneOf(['يُوَدَّ', 'يُوَدِّ', 'يُودَدْ']),
      '3fs': expect.toBeOneOf(['تُوَدَّ', 'تُوَدِّ', 'تُودَدْ']),
      '2d': 'تُوَدَّا',
      '3md': 'يُوَدَّا',
      '3fd': 'تُوَدَّا',
      '1p': expect.toBeOneOf(['نُوَدَّ', 'نُوَدِّ', 'نُودَدْ']),
      '2mp': 'تُوَدُّوا',
      '2fp': 'تُودَدْنَ',
      '3mp': 'يُوَدُّوا',
      '3fp': 'يُودَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wdd-1')!)).toEqualT('وَادّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wdd-1')!)).toEqualT('مَوْدُود')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wdd-1')!))).toEqualT(
      new Set(['وُدّ', 'وِدّ', 'وَدّ', 'مَوَدَّة', 'مَوِدَّة', 'وِدَاد', 'وَدَاد', 'وُدَاد', 'وَدَادَة', 'وِدَادَة', 'وُدَادَة']),
    )
  })
})
