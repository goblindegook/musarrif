import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hsb-1-a-u (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hsb-1-a-u')!)).toEqualT({
      '1s': 'حَسَبْتُ',
      '2ms': 'حَسَبْتَ',
      '2fs': 'حَسَبْتِ',
      '3ms': 'حَسَبَ',
      '3fs': 'حَسَبَتْ',
      '2d': 'حَسَبْتُمَا',
      '3md': 'حَسَبَا',
      '3fd': 'حَسَبَتَا',
      '1p': 'حَسَبْنَا',
      '2mp': 'حَسَبْتُمْ',
      '2fp': 'حَسَبْتُنَّ',
      '3mp': 'حَسَبُوا',
      '3fp': 'حَسَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-a-u')!, 'indicative')).toEqualT({
      '1s': 'أَحْسُبُ',
      '2ms': 'تَحْسُبُ',
      '2fs': 'تَحْسُبِينَ',
      '3ms': 'يَحْسُبُ',
      '3fs': 'تَحْسُبُ',
      '2d': 'تَحْسُبَانِ',
      '3md': 'يَحْسُبَانِ',
      '3fd': 'تَحْسُبَانِ',
      '1p': 'نَحْسُبُ',
      '2mp': 'تَحْسُبُونَ',
      '2fp': 'تَحْسُبْنَ',
      '3mp': 'يَحْسُبُونَ',
      '3fp': 'يَحْسُبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-a-u')!, 'subjunctive')).toEqualT({
      '1s': 'أَحْسُبَ',
      '2ms': 'تَحْسُبَ',
      '2fs': 'تَحْسُبِي',
      '3ms': 'يَحْسُبَ',
      '3fs': 'تَحْسُبَ',
      '2d': 'تَحْسُبَا',
      '3md': 'يَحْسُبَا',
      '3fd': 'تَحْسُبَا',
      '1p': 'نَحْسُبَ',
      '2mp': 'تَحْسُبُوا',
      '2fp': 'تَحْسُبْنَ',
      '3mp': 'يَحْسُبُوا',
      '3fp': 'يَحْسُبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hsb-1-a-u')!, 'jussive')).toEqualT({
      '1s': 'أَحْسُبْ',
      '2ms': 'تَحْسُبْ',
      '2fs': 'تَحْسُبِي',
      '3ms': 'يَحْسُبْ',
      '3fs': 'تَحْسُبْ',
      '2d': 'تَحْسُبَا',
      '3md': 'يَحْسُبَا',
      '3fd': 'تَحْسُبَا',
      '1p': 'نَحْسُبْ',
      '2mp': 'تَحْسُبُوا',
      '2fp': 'تَحْسُبْنَ',
      '3mp': 'يَحْسُبُوا',
      '3fp': 'يَحْسُبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hsb-1-a-u')!)).toMatchObjectT({
      '2ms': 'اُحْسُبْ',
      '2fs': 'اُحْسُبِي',
      '2d': 'اُحْسُبَا',
      '2mp': 'اُحْسُبُوا',
      '2fp': 'اُحْسُبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hsb-1-a-u')!)).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-a-u')!, 'indicative')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-a-u')!, 'subjunctive')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById('Hsb-1-a-u')!, 'jussive')).toEqualT({
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
    expect(deriveActiveParticiple(getVerbById('Hsb-1-a-u')!)).toEqualT('حَاسِب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hsb-1-a-u')!)).toEqualT('مَحْسُوب')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hsb-1-a-u')!))).toEqualT(new Set(['حَسْب', 'حِسَاب', 'حُسْبَان']))
  })
})
