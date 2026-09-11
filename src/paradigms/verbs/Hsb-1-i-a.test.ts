import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hsb-1-i-a (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hsb-1-i-a')!)).toEqualT({
      '1s': 'حَسِبْتُ',
      '2ms': 'حَسِبْتَ',
      '2fs': 'حَسِبْتِ',
      '3ms': 'حَسِبَ',
      '3fs': 'حَسِبَتْ',
      '2d': 'حَسِبْتُمَا',
      '3md': 'حَسِبَا',
      '3fd': 'حَسِبَتَا',
      '1p': 'حَسِبْنَا',
      '2mp': 'حَسِبْتُمْ',
      '2fp': 'حَسِبْتُنَّ',
      '3mp': 'حَسِبُوا',
      '3fp': 'حَسِبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-i-a')!, 'indicative')).toEqualT({
      '1s': expect.toBeOneOf(['أَحْسَبُ', 'أَحْسِبُ']),
      '2ms': expect.toBeOneOf(['تَحْسَبُ', 'تَحْسِبُ']),
      '2fs': expect.toBeOneOf(['تَحْسَبِينَ', 'تَحْسِبِينَ']),
      '3ms': expect.toBeOneOf(['يَحْسَبُ', 'يَحْسِبُ']),
      '3fs': expect.toBeOneOf(['تَحْسَبُ', 'تَحْسِبُ']),
      '2d': expect.toBeOneOf(['تَحْسَبَانِ', 'تَحْسِبَانِ']),
      '3md': expect.toBeOneOf(['يَحْسَبَانِ', 'يَحْسِبَانِ']),
      '3fd': expect.toBeOneOf(['تَحْسَبَانِ', 'تَحْسِبَانِ']),
      '1p': expect.toBeOneOf(['نَحْسَبُ', 'نَحْسِبُ']),
      '2mp': expect.toBeOneOf(['تَحْسَبُونَ', 'تَحْسِبُونَ']),
      '2fp': expect.toBeOneOf(['تَحْسَبْنَ', 'تَحْسِبْنَ']),
      '3mp': expect.toBeOneOf(['يَحْسَبُونَ', 'يَحْسِبُونَ']),
      '3fp': expect.toBeOneOf(['يَحْسَبْنَ', 'يَحْسِبْنَ']),
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': expect.toBeOneOf(['أَحْسَبَ', 'أَحْسِبَ']),
      '2ms': expect.toBeOneOf(['تَحْسَبَ', 'تَحْسِبَ']),
      '2fs': expect.toBeOneOf(['تَحْسَبِي', 'تَحْسِبِي']),
      '3ms': expect.toBeOneOf(['يَحْسَبَ', 'يَحْسِبَ']),
      '3fs': expect.toBeOneOf(['تَحْسَبَ', 'تَحْسِبَ']),
      '2d': expect.toBeOneOf(['تَحْسَبَا', 'تَحْسِبَا']),
      '3md': expect.toBeOneOf(['يَحْسَبَا', 'يَحْسِبَا']),
      '3fd': expect.toBeOneOf(['تَحْسَبَا', 'تَحْسِبَا']),
      '1p': expect.toBeOneOf(['نَحْسَبَ', 'نَحْسِبَ']),
      '2mp': expect.toBeOneOf(['تَحْسَبُوا', 'تَحْسِبُوا']),
      '2fp': expect.toBeOneOf(['تَحْسَبْنَ', 'تَحْسِبْنَ']),
      '3mp': expect.toBeOneOf(['يَحْسَبُوا', 'يَحْسِبُوا']),
      '3fp': expect.toBeOneOf(['يَحْسَبْنَ', 'يَحْسِبْنَ']),
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-i-a')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَحْسَبْ', 'أَحْسِبْ']),
      '2ms': expect.toBeOneOf(['تَحْسَبْ', 'تَحْسِبْ']),
      '2fs': expect.toBeOneOf(['تَحْسَبِي', 'تَحْسِبِي']),
      '3ms': expect.toBeOneOf(['يَحْسَبْ', 'يَحْسِبْ']),
      '3fs': expect.toBeOneOf(['تَحْسَبْ', 'تَحْسِبْ']),
      '2d': expect.toBeOneOf(['تَحْسَبَا', 'تَحْسِبَا']),
      '3md': expect.toBeOneOf(['يَحْسَبَا', 'يَحْسِبَا']),
      '3fd': expect.toBeOneOf(['تَحْسَبَا', 'تَحْسِبَا']),
      '1p': expect.toBeOneOf(['نَحْسَبْ', 'نَحْسِبْ']),
      '2mp': expect.toBeOneOf(['تَحْسَبُوا', 'تَحْسِبُوا']),
      '2fp': expect.toBeOneOf(['تَحْسَبْنَ', 'تَحْسِبْنَ']),
      '3mp': expect.toBeOneOf(['يَحْسَبُوا', 'يَحْسِبُوا']),
      '3fp': expect.toBeOneOf(['يَحْسَبْنَ', 'يَحْسِبْنَ']),
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hsb-1-i-a')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِحْسَبْ', 'اِحْسِبْ']),
      '2fs': expect.toBeOneOf(['اِحْسَبِي', 'اِحْسِبِي']),
      '2d': expect.toBeOneOf(['اِحْسَبَا', 'اِحْسِبَا']),
      '2mp': expect.toBeOneOf(['اِحْسَبُوا', 'اِحْسِبُوا']),
      '2fp': expect.toBeOneOf(['اِحْسَبْنَ', 'اِحْسِبْنَ']),
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hsb-1-i-a')!)).toEqualT({
      '1s': 'حُسِبْتُ',
      '2ms': 'حُسِبْتَ',
      '2fs': 'حُسِبْتِ',
      '3ms': 'حُسِبَ',
      '3fs': 'حُسِبَتْ',
      '2d': 'حُسِبْتُمَا',
      '3md': 'حُسِبَا',
      '3fd': 'حُسِبَتَا',
      '1p': 'حُسِبْنَا',
      '2mp': 'حُسِبْتُمْ',
      '2fp': 'حُسِبْتُنَّ',
      '3mp': 'حُسِبُوا',
      '3fp': 'حُسِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أُحْسَبُ',
      '2ms': 'تُحْسَبُ',
      '2fs': 'تُحْسَبِينَ',
      '3ms': 'يُحْسَبُ',
      '3fs': 'تُحْسَبُ',
      '2d': 'تُحْسَبَانِ',
      '3md': 'يُحْسَبَانِ',
      '3fd': 'تُحْسَبَانِ',
      '1p': 'نُحْسَبُ',
      '2mp': 'تُحْسَبُونَ',
      '2fp': 'تُحْسَبْنَ',
      '3mp': 'يُحْسَبُونَ',
      '3fp': 'يُحْسَبْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أُحْسَبَ',
      '2ms': 'تُحْسَبَ',
      '2fs': 'تُحْسَبِي',
      '3ms': 'يُحْسَبَ',
      '3fs': 'تُحْسَبَ',
      '2d': 'تُحْسَبَا',
      '3md': 'يُحْسَبَا',
      '3fd': 'تُحْسَبَا',
      '1p': 'نُحْسَبَ',
      '2mp': 'تُحْسَبُوا',
      '2fp': 'تُحْسَبْنَ',
      '3mp': 'يُحْسَبُوا',
      '3fp': 'يُحْسَبْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-i-a')!, 'jussive')).toEqualT({
      '1s': 'أُحْسَبْ',
      '2ms': 'تُحْسَبْ',
      '2fs': 'تُحْسَبِي',
      '3ms': 'يُحْسَبْ',
      '3fs': 'تُحْسَبْ',
      '2d': 'تُحْسَبَا',
      '3md': 'يُحْسَبَا',
      '3fd': 'تُحْسَبَا',
      '1p': 'نُحْسَبْ',
      '2mp': 'تُحْسَبُوا',
      '2fp': 'تُحْسَبْنَ',
      '3mp': 'يُحْسَبُوا',
      '3fp': 'يُحْسَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hsb-1-i-a')!)).toEqualT('أَحْسَب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hsb-1-i-a')!)).toEqualT('مَحْسُوب')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hsb-1-i-a')!))).toEqualT(new Set(['حِسْبَان', 'مَحْسَبَة', 'مَحْسِبَة']))
  })
})
