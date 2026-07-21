import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ybs-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ybs-1')!)).toEqualT({
      '1s': 'يَبِسْتُ',
      '2ms': 'يَبِسْتَ',
      '2fs': 'يَبِسْتِ',
      '3ms': 'يَبِسَ',
      '3fs': 'يَبِسَتْ',
      '2d': 'يَبِسْتُمَا',
      '3md': 'يَبِسَا',
      '3fd': 'يَبِسَتَا',
      '1p': 'يَبِسْنَا',
      '2mp': 'يَبِسْتُمْ',
      '2fp': 'يَبِسْتُنَّ',
      '3mp': 'يَبِسُوا',
      '3fp': 'يَبِسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ybs-1')!, 'indicative')).toEqualT({
      '1s': expect.toBeOneOf(['أَيْبَسُ', 'أَيْبِسُ']),
      '2ms': expect.toBeOneOf(['تَيْبَسُ', 'تَيْبِسُ']),
      '2fs': expect.toBeOneOf(['تَيْبَسِينَ', 'تَيْبِسِينَ']),
      '3ms': expect.toBeOneOf(['يَيْبَسُ', 'يَيْبِسُ']),
      '3fs': expect.toBeOneOf(['تَيْبَسُ', 'تَيْبِسُ']),
      '2d': expect.toBeOneOf(['تَيْبَسَانِ', 'تَيْبِسَانِ']),
      '3md': expect.toBeOneOf(['يَيْبَسَانِ', 'يَيْبِسَانِ']),
      '3fd': expect.toBeOneOf(['تَيْبَسَانِ', 'تَيْبِسَانِ']),
      '1p': expect.toBeOneOf(['نَيْبَسُ', 'نَيْبِسُ']),
      '2mp': expect.toBeOneOf(['تَيْبَسُونَ', 'تَيْبِسُونَ']),
      '2fp': expect.toBeOneOf(['تَيْبَسْنَ', 'تَيْبِسْنَ']),
      '3mp': expect.toBeOneOf(['يَيْبَسُونَ', 'يَيْبِسُونَ']),
      '3fp': expect.toBeOneOf(['يَيْبَسْنَ', 'يَيْبِسْنَ']),
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ybs-1')!, 'subjunctive')).toEqualT({
      '1s': expect.toBeOneOf(['أَيْبَسَ', 'أَيْبِسَ']),
      '2ms': expect.toBeOneOf(['تَيْبَسَ', 'تَيْبِسَ']),
      '2fs': expect.toBeOneOf(['تَيْبَسِي', 'تَيْبِسِي']),
      '3ms': expect.toBeOneOf(['يَيْبَسَ', 'يَيْبِسَ']),
      '3fs': expect.toBeOneOf(['تَيْبَسَ', 'تَيْبِسَ']),
      '2d': expect.toBeOneOf(['تَيْبَسَا', 'تَيْبِسَا']),
      '3md': expect.toBeOneOf(['يَيْبَسَا', 'يَيْبِسَا']),
      '3fd': expect.toBeOneOf(['تَيْبَسَا', 'تَيْبِسَا']),
      '1p': expect.toBeOneOf(['نَيْبَسَ', 'نَيْبِسَ']),
      '2mp': expect.toBeOneOf(['تَيْبَسُوا', 'تَيْبِسُوا']),
      '2fp': expect.toBeOneOf(['تَيْبَسْنَ', 'تَيْبِسْنَ']),
      '3mp': expect.toBeOneOf(['يَيْبَسُوا', 'يَيْبِسُوا']),
      '3fp': expect.toBeOneOf(['يَيْبَسْنَ', 'يَيْبِسْنَ']),
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ybs-1')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَيْبَسْ', 'أَيْبِسْ']),
      '2ms': expect.toBeOneOf(['تَيْبَسْ', 'تَيْبِسْ']),
      '2fs': expect.toBeOneOf(['تَيْبَسِي', 'تَيْبِسِي']),
      '3ms': expect.toBeOneOf(['يَيْبَسْ', 'يَيْبِسْ']),
      '3fs': expect.toBeOneOf(['تَيْبَسْ', 'تَيْبِسْ']),
      '2d': expect.toBeOneOf(['تَيْبَسَا', 'تَيْبِسَا']),
      '3md': expect.toBeOneOf(['يَيْبَسَا', 'يَيْبِسَا']),
      '3fd': expect.toBeOneOf(['تَيْبَسَا', 'تَيْبِسَا']),
      '1p': expect.toBeOneOf(['نَيْبَسْ', 'نَيْبِسْ']),
      '2mp': expect.toBeOneOf(['تَيْبَسُوا', 'تَيْبِسُوا']),
      '2fp': expect.toBeOneOf(['تَيْبَسْنَ', 'تَيْبِسْنَ']),
      '3mp': expect.toBeOneOf(['يَيْبَسُوا', 'يَيْبِسُوا']),
      '3fp': expect.toBeOneOf(['يَيْبَسْنَ', 'يَيْبِسْنَ']),
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ybs-1')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِيبَسْ', 'اِيبِسْ']),
      '2fs': expect.toBeOneOf(['اِيبَسِي', 'اِيبِسِي']),
      '2d': expect.toBeOneOf(['اِيبَسَا', 'اِيبِسَا']),
      '2mp': expect.toBeOneOf(['اِيبَسُوا', 'اِيبِسُوا']),
      '2fp': expect.toBeOneOf(['اِيبَسْنَ', 'اِيبِسْنَ']),
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ybs-1')!)).toMatchObjectT({
      '3ms': 'يُبِسَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ybs-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُوبَسُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ybs-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُوبَسَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ybs-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُوبَسْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ybs-1')!)).toEqualT('يَابِس')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ybs-1')!)).toEqualT('مَيْبُوس')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ybs-1')!))).toEqualT(new Set(['يُبْس', 'يَبْس', 'يُبُوسَة', 'يُبُوس']))
  })
})
