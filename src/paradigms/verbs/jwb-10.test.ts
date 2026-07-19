import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('jwb-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('jwb-10')!)).toEqualT({
      '1s': 'اِسْتَجَبْتُ',
      '2ms': 'اِسْتَجَبْتَ',
      '2fs': 'اِسْتَجَبْتِ',
      '3ms': 'اِسْتَجَابَ',
      '3fs': 'اِسْتَجَابَتْ',
      '2d': 'اِسْتَجَبْتُمَا',
      '3md': 'اِسْتَجَابَا',
      '3fd': 'اِسْتَجَابَتَا',
      '1p': 'اِسْتَجَبْنَا',
      '2mp': 'اِسْتَجَبْتُمْ',
      '2fp': 'اِسْتَجَبْتُنَّ',
      '3mp': 'اِسْتَجَابُوا',
      '3fp': 'اِسْتَجَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('jwb-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَجِيبُ',
      '2ms': 'تَسْتَجِيبُ',
      '2fs': 'تَسْتَجِيبِينَ',
      '3ms': 'يَسْتَجِيبُ',
      '3fs': 'تَسْتَجِيبُ',
      '2d': 'تَسْتَجِيبَانِ',
      '3md': 'يَسْتَجِيبَانِ',
      '3fd': 'تَسْتَجِيبَانِ',
      '1p': 'نَسْتَجِيبُ',
      '2mp': 'تَسْتَجِيبُونَ',
      '2fp': 'تَسْتَجِبْنَ',
      '3mp': 'يَسْتَجِيبُونَ',
      '3fp': 'يَسْتَجِبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('jwb-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَجِيبَ',
      '2ms': 'تَسْتَجِيبَ',
      '2fs': 'تَسْتَجِيبِي',
      '3ms': 'يَسْتَجِيبَ',
      '3fs': 'تَسْتَجِيبَ',
      '2d': 'تَسْتَجِيبَا',
      '3md': 'يَسْتَجِيبَا',
      '3fd': 'تَسْتَجِيبَا',
      '1p': 'نَسْتَجِيبَ',
      '2mp': 'تَسْتَجِيبُوا',
      '2fp': 'تَسْتَجِبْنَ',
      '3mp': 'يَسْتَجِيبُوا',
      '3fp': 'يَسْتَجِبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('jwb-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَجِبْ',
      '2ms': 'تَسْتَجِبْ',
      '2fs': 'تَسْتَجِيبِي',
      '3ms': 'يَسْتَجِبْ',
      '3fs': 'تَسْتَجِبْ',
      '2d': 'تَسْتَجِيبَا',
      '3md': 'يَسْتَجِيبَا',
      '3fd': 'تَسْتَجِيبَا',
      '1p': 'نَسْتَجِبْ',
      '2mp': 'تَسْتَجِيبُوا',
      '2fp': 'تَسْتَجِبْنَ',
      '3mp': 'يَسْتَجِيبُوا',
      '3fp': 'يَسْتَجِبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('jwb-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَجِبْ',
      '2fs': 'اِسْتَجِيبِي',
      '2d': 'اِسْتَجِيبَا',
      '2mp': 'اِسْتَجِيبُوا',
      '2fp': 'اِسْتَجِبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('jwb-10')!)).toEqualT({
      '1s': 'اُسْتُجِبْتُ',
      '2ms': 'اُسْتُجِبْتَ',
      '2fs': 'اُسْتُجِبْتِ',
      '3ms': 'اُسْتُجِيبَ',
      '3fs': 'اُسْتُجِيبَتْ',
      '2d': 'اُسْتُجِبْتُمَا',
      '3md': 'اُسْتُجِيبَا',
      '3fd': 'اُسْتُجِيبَتَا',
      '1p': 'اُسْتُجِبْنَا',
      '2mp': 'اُسْتُجِبْتُمْ',
      '2fp': 'اُسْتُجِبْتُنَّ',
      '3mp': 'اُسْتُجِيبُوا',
      '3fp': 'اُسْتُجِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('jwb-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَجَابُ',
      '2ms': 'تُسْتَجَابُ',
      '2fs': 'تُسْتَجَابِينَ',
      '3ms': 'يُسْتَجَابُ',
      '3fs': 'تُسْتَجَابُ',
      '2d': 'تُسْتَجَابَانِ',
      '3md': 'يُسْتَجَابَانِ',
      '3fd': 'تُسْتَجَابَانِ',
      '1p': 'نُسْتَجَابُ',
      '2mp': 'تُسْتَجَابُونَ',
      '2fp': 'تُسْتَجَبْنَ',
      '3mp': 'يُسْتَجَابُونَ',
      '3fp': 'يُسْتَجَبْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jwb-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَجَابَ',
      '2ms': 'تُسْتَجَابَ',
      '2fs': 'تُسْتَجَابِي',
      '3ms': 'يُسْتَجَابَ',
      '3fs': 'تُسْتَجَابَ',
      '2d': 'تُسْتَجَابَا',
      '3md': 'يُسْتَجَابَا',
      '3fd': 'تُسْتَجَابَا',
      '1p': 'نُسْتَجَابَ',
      '2mp': 'تُسْتَجَابُوا',
      '2fp': 'تُسْتَجَبْنَ',
      '3mp': 'يُسْتَجَابُوا',
      '3fp': 'يُسْتَجَبْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jwb-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَجَبْ',
      '2ms': 'تُسْتَجَبْ',
      '2fs': 'تُسْتَجَابِي',
      '3ms': 'يُسْتَجَبْ',
      '3fs': 'تُسْتَجَبْ',
      '2d': 'تُسْتَجَابَا',
      '3md': 'يُسْتَجَابَا',
      '3fd': 'تُسْتَجَابَا',
      '1p': 'نُسْتَجَبْ',
      '2mp': 'تُسْتَجَابُوا',
      '2fp': 'تُسْتَجَبْنَ',
      '3mp': 'يُسْتَجَابُوا',
      '3fp': 'يُسْتَجَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('jwb-10')!)).toEqualT('مُسْتَجِيب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('jwb-10')!)).toEqualT('مُسْتَجَاب')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('jwb-10')!)).toEqualT(['اِسْتِجَابَة'])
  })
})
