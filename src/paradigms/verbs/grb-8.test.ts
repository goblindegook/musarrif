import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('grb-8 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('grb-8')!)).toEqualT({
      '1s': 'اِغْتَرَبْتُ',
      '2ms': 'اِغْتَرَبْتَ',
      '2fs': 'اِغْتَرَبْتِ',
      '3ms': 'اِغْتَرَبَ',
      '3fs': 'اِغْتَرَبَتْ',
      '2d': 'اِغْتَرَبْتُمَا',
      '3md': 'اِغْتَرَبَا',
      '3fd': 'اِغْتَرَبَتَا',
      '1p': 'اِغْتَرَبْنَا',
      '2mp': 'اِغْتَرَبْتُمْ',
      '2fp': 'اِغْتَرَبْتُنَّ',
      '3mp': 'اِغْتَرَبُوا',
      '3fp': 'اِغْتَرَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('grb-8')!, 'indicative')).toEqualT({
      '1s': 'أَغْتَرِبُ',
      '2ms': 'تَغْتَرِبُ',
      '2fs': 'تَغْتَرِبِينَ',
      '3ms': 'يَغْتَرِبُ',
      '3fs': 'تَغْتَرِبُ',
      '2d': 'تَغْتَرِبَانِ',
      '3md': 'يَغْتَرِبَانِ',
      '3fd': 'تَغْتَرِبَانِ',
      '1p': 'نَغْتَرِبُ',
      '2mp': 'تَغْتَرِبُونَ',
      '2fp': 'تَغْتَرِبْنَ',
      '3mp': 'يَغْتَرِبُونَ',
      '3fp': 'يَغْتَرِبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('grb-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْتَرِبَ',
      '2ms': 'تَغْتَرِبَ',
      '2fs': 'تَغْتَرِبِي',
      '3ms': 'يَغْتَرِبَ',
      '3fs': 'تَغْتَرِبَ',
      '2d': 'تَغْتَرِبَا',
      '3md': 'يَغْتَرِبَا',
      '3fd': 'تَغْتَرِبَا',
      '1p': 'نَغْتَرِبَ',
      '2mp': 'تَغْتَرِبُوا',
      '2fp': 'تَغْتَرِبْنَ',
      '3mp': 'يَغْتَرِبُوا',
      '3fp': 'يَغْتَرِبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('grb-8')!, 'jussive')).toEqualT({
      '1s': 'أَغْتَرِبْ',
      '2ms': 'تَغْتَرِبْ',
      '2fs': 'تَغْتَرِبِي',
      '3ms': 'يَغْتَرِبْ',
      '3fs': 'تَغْتَرِبْ',
      '2d': 'تَغْتَرِبَا',
      '3md': 'يَغْتَرِبَا',
      '3fd': 'تَغْتَرِبَا',
      '1p': 'نَغْتَرِبْ',
      '2mp': 'تَغْتَرِبُوا',
      '2fp': 'تَغْتَرِبْنَ',
      '3mp': 'يَغْتَرِبُوا',
      '3fp': 'يَغْتَرِبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('grb-8')!)).toMatchObjectT({
      '2ms': 'اِغْتَرِبْ',
      '2fs': 'اِغْتَرِبِي',
      '2d': 'اِغْتَرِبَا',
      '2mp': 'اِغْتَرِبُوا',
      '2fp': 'اِغْتَرِبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('grb-8')!)).toEqualT({
      '1s': 'اُغْتُرِبْتُ',
      '2ms': 'اُغْتُرِبْتَ',
      '2fs': 'اُغْتُرِبْتِ',
      '3ms': 'اُغْتُرِبَ',
      '3fs': 'اُغْتُرِبَتْ',
      '2d': 'اُغْتُرِبْتُمَا',
      '3md': 'اُغْتُرِبَا',
      '3fd': 'اُغْتُرِبَتَا',
      '1p': 'اُغْتُرِبْنَا',
      '2mp': 'اُغْتُرِبْتُمْ',
      '2fp': 'اُغْتُرِبْتُنَّ',
      '3mp': 'اُغْتُرِبُوا',
      '3fp': 'اُغْتُرِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-8')!, 'indicative')).toEqualT({
      '1s': 'أُغْتَرَبُ',
      '2ms': 'تُغْتَرَبُ',
      '2fs': 'تُغْتَرَبِينَ',
      '3ms': 'يُغْتَرَبُ',
      '3fs': 'تُغْتَرَبُ',
      '2d': 'تُغْتَرَبَانِ',
      '3md': 'يُغْتَرَبَانِ',
      '3fd': 'تُغْتَرَبَانِ',
      '1p': 'نُغْتَرَبُ',
      '2mp': 'تُغْتَرَبُونَ',
      '2fp': 'تُغْتَرَبْنَ',
      '3mp': 'يُغْتَرَبُونَ',
      '3fp': 'يُغْتَرَبْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُغْتَرَبَ',
      '2ms': 'تُغْتَرَبَ',
      '2fs': 'تُغْتَرَبِي',
      '3ms': 'يُغْتَرَبَ',
      '3fs': 'تُغْتَرَبَ',
      '2d': 'تُغْتَرَبَا',
      '3md': 'يُغْتَرَبَا',
      '3fd': 'تُغْتَرَبَا',
      '1p': 'نُغْتَرَبَ',
      '2mp': 'تُغْتَرَبُوا',
      '2fp': 'تُغْتَرَبْنَ',
      '3mp': 'يُغْتَرَبُوا',
      '3fp': 'يُغْتَرَبْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('grb-8')!, 'jussive')).toEqualT({
      '1s': 'أُغْتَرَبْ',
      '2ms': 'تُغْتَرَبْ',
      '2fs': 'تُغْتَرَبِي',
      '3ms': 'يُغْتَرَبْ',
      '3fs': 'تُغْتَرَبْ',
      '2d': 'تُغْتَرَبَا',
      '3md': 'يُغْتَرَبَا',
      '3fd': 'تُغْتَرَبَا',
      '1p': 'نُغْتَرَبْ',
      '2mp': 'تُغْتَرَبُوا',
      '2fp': 'تُغْتَرَبْنَ',
      '3mp': 'يُغْتَرَبُوا',
      '3fp': 'يُغْتَرَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('grb-8')!)).toEqualT('مُغْتَرِب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('grb-8')!)).toEqualT('مُغْتَرَب')
  })

  // FIXME: Wiktionary masdar doesn't follow the Form VIII pattern.
  test.skip('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('grb-8')!))).toEqualT(new Set(['غُرْبَة']))
  })
})
