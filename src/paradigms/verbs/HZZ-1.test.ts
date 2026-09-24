import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('HZZ-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('HZZ-1')!)).toEqualT({
      '1s': 'حَظَظْتُ',
      '2ms': 'حَظَظْتَ',
      '2fs': 'حَظَظْتِ',
      '3ms': 'حَظَّ',
      '3fs': 'حَظَّتْ',
      '2d': 'حَظَظْتُمَا',
      '3md': 'حَظَّا',
      '3fd': 'حَظَّتَا',
      '1p': 'حَظَظْنَا',
      '2mp': 'حَظَظْتُمْ',
      '2fp': 'حَظَظْتُنَّ',
      '3mp': 'حَظُّوا',
      '3fp': 'حَظَظْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('HZZ-1')!, 'indicative')).toEqualT({
      '1s': 'أَحَظُّ',
      '2ms': 'تَحَظُّ',
      '2fs': 'تَحَظِّينَ',
      '3ms': 'يَحَظُّ',
      '3fs': 'تَحَظُّ',
      '2d': 'تَحَظَّانِ',
      '3md': 'يَحَظَّانِ',
      '3fd': 'تَحَظَّانِ',
      '1p': 'نَحَظُّ',
      '2mp': 'تَحَظُّونَ',
      '2fp': 'تَحْظَظْنَ',
      '3mp': 'يَحَظُّونَ',
      '3fp': 'يَحْظَظْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('HZZ-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَحَظَّ',
      '2ms': 'تَحَظَّ',
      '2fs': 'تَحَظِّي',
      '3ms': 'يَحَظَّ',
      '3fs': 'تَحَظَّ',
      '2d': 'تَحَظَّا',
      '3md': 'يَحَظَّا',
      '3fd': 'تَحَظَّا',
      '1p': 'نَحَظَّ',
      '2mp': 'تَحَظُّوا',
      '2fp': 'تَحْظَظْنَ',
      '3mp': 'يَحَظُّوا',
      '3fp': 'يَحْظَظْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('HZZ-1')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَحَظَّ', 'أَحَظِّ', 'أَحْظَظْ']),
      '2ms': expect.toBeOneOf(['تَحَظَّ', 'تَحَظِّ', 'تَحْظَظْ']),
      '2fs': 'تَحَظِّي',
      '3ms': expect.toBeOneOf(['يَحَظَّ', 'يَحَظِّ', 'يَحْظَظْ']),
      '3fs': expect.toBeOneOf(['تَحَظَّ', 'تَحَظِّ', 'تَحْظَظْ']),
      '2d': 'تَحَظَّا',
      '3md': 'يَحَظَّا',
      '3fd': 'تَحَظَّا',
      '1p': expect.toBeOneOf(['نَحَظَّ', 'نَحَظِّ', 'نَحْظَظْ']),
      '2mp': 'تَحَظُّوا',
      '2fp': 'تَحْظَظْنَ',
      '3mp': 'يَحَظُّوا',
      '3fp': 'يَحْظَظْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('HZZ-1')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['حَظَّ', 'حَظِّ', 'اِحْظَظْ']),
      '2fs': 'حَظِّي',
      '2d': 'حَظَّا',
      '2mp': 'حَظُّوا',
      '2fp': 'اِحْظَظْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('HZZ-1')!)).toEqualT({
      '1s': 'حُظِظْتُ',
      '2ms': 'حُظِظْتَ',
      '2fs': 'حُظِظْتِ',
      '3ms': 'حُظَّ',
      '3fs': 'حُظَّتْ',
      '2d': 'حُظِظْتُمَا',
      '3md': 'حُظَّا',
      '3fd': 'حُظَّتَا',
      '1p': 'حُظِظْنَا',
      '2mp': 'حُظِظْتُمْ',
      '2fp': 'حُظِظْتُنَّ',
      '3mp': 'حُظُّوا',
      '3fp': 'حُظِظْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('HZZ-1')!, 'indicative')).toEqualT({
      '1s': 'أُحَظُّ',
      '2ms': 'تُحَظُّ',
      '2fs': 'تُحَظِّينَ',
      '3ms': 'يُحَظُّ',
      '3fs': 'تُحَظُّ',
      '2d': 'تُحَظَّانِ',
      '3md': 'يُحَظَّانِ',
      '3fd': 'تُحَظَّانِ',
      '1p': 'نُحَظُّ',
      '2mp': 'تُحَظُّونَ',
      '2fp': 'تُحْظَظْنَ',
      '3mp': 'يُحَظُّونَ',
      '3fp': 'يُحْظَظْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('HZZ-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُحَظَّ',
      '2ms': 'تُحَظَّ',
      '2fs': 'تُحَظِّي',
      '3ms': 'يُحَظَّ',
      '3fs': 'تُحَظَّ',
      '2d': 'تُحَظَّا',
      '3md': 'يُحَظَّا',
      '3fd': 'تُحَظَّا',
      '1p': 'نُحَظَّ',
      '2mp': 'تُحَظُّوا',
      '2fp': 'تُحْظَظْنَ',
      '3mp': 'يُحَظُّوا',
      '3fp': 'يُحْظَظْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('HZZ-1')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُحَظَّ', 'أُحَظِّ', 'أُحْظَظْ']),
      '2ms': expect.toBeOneOf(['تُحَظَّ', 'تُحَظِّ', 'تُحْظَظْ']),
      '2fs': 'تُحَظِّي',
      '3ms': expect.toBeOneOf(['يُحَظَّ', 'يُحَظِّ', 'يُحْظَظْ']),
      '3fs': expect.toBeOneOf(['تُحَظَّ', 'تُحَظِّ', 'تُحْظَظْ']),
      '2d': 'تُحَظَّا',
      '3md': 'يُحَظَّا',
      '3fd': 'تُحَظَّا',
      '1p': expect.toBeOneOf(['نُحَظَّ', 'نُحَظِّ', 'نُحْظَظْ']),
      '2mp': 'تُحَظُّوا',
      '2fp': 'تُحْظَظْنَ',
      '3mp': 'يُحَظُّوا',
      '3fp': 'يُحْظَظْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('HZZ-1')!)).toEqualT('حَاظّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('HZZ-1')!)).toEqualT('مَحْظُوظ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('HZZ-1')!))).toEqualT(new Set(['حَظّ']))
  })
})
