import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('qbl-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qbl-1')!)).toEqualT({
      '1s': 'قَبِلْتُ',
      '2ms': 'قَبِلْتَ',
      '2fs': 'قَبِلْتِ',
      '3ms': 'قَبِلَ',
      '3fs': 'قَبِلَتْ',
      '2d': 'قَبِلْتُمَا',
      '3md': 'قَبِلَا',
      '3fd': 'قَبِلَتَا',
      '1p': 'قَبِلْنَا',
      '2mp': 'قَبِلْتُمْ',
      '2fp': 'قَبِلْتُنَّ',
      '3mp': 'قَبِلُوا',
      '3fp': 'قَبِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qbl-1')!, 'indicative')).toEqualT({
      '1s': 'أَقْبَلُ',
      '2ms': 'تَقْبَلُ',
      '2fs': 'تَقْبَلِينَ',
      '3ms': 'يَقْبَلُ',
      '3fs': 'تَقْبَلُ',
      '2d': 'تَقْبَلَانِ',
      '3md': 'يَقْبَلَانِ',
      '3fd': 'تَقْبَلَانِ',
      '1p': 'نَقْبَلُ',
      '2mp': 'تَقْبَلُونَ',
      '2fp': 'تَقْبَلْنَ',
      '3mp': 'يَقْبَلُونَ',
      '3fp': 'يَقْبَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qbl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَقْبَلَ',
      '2ms': 'تَقْبَلَ',
      '2fs': 'تَقْبَلِي',
      '3ms': 'يَقْبَلَ',
      '3fs': 'تَقْبَلَ',
      '2d': 'تَقْبَلَا',
      '3md': 'يَقْبَلَا',
      '3fd': 'تَقْبَلَا',
      '1p': 'نَقْبَلَ',
      '2mp': 'تَقْبَلُوا',
      '2fp': 'تَقْبَلْنَ',
      '3mp': 'يَقْبَلُوا',
      '3fp': 'يَقْبَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qbl-1')!, 'jussive')).toEqualT({
      '1s': 'أَقْبَلْ',
      '2ms': 'تَقْبَلْ',
      '2fs': 'تَقْبَلِي',
      '3ms': 'يَقْبَلْ',
      '3fs': 'تَقْبَلْ',
      '2d': 'تَقْبَلَا',
      '3md': 'يَقْبَلَا',
      '3fd': 'تَقْبَلَا',
      '1p': 'نَقْبَلْ',
      '2mp': 'تَقْبَلُوا',
      '2fp': 'تَقْبَلْنَ',
      '3mp': 'يَقْبَلُوا',
      '3fp': 'يَقْبَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qbl-1')!)).toMatchObjectT({
      '2ms': 'اِقْبَلْ',
      '2fs': 'اِقْبَلِي',
      '2d': 'اِقْبَلَا',
      '2mp': 'اِقْبَلُوا',
      '2fp': 'اِقْبَلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('qbl-1')!)).toEqualT({
      '1s': 'قُبِلْتُ',
      '2ms': 'قُبِلْتَ',
      '2fs': 'قُبِلْتِ',
      '3ms': 'قُبِلَ',
      '3fs': 'قُبِلَتْ',
      '2d': 'قُبِلْتُمَا',
      '3md': 'قُبِلَا',
      '3fd': 'قُبِلَتَا',
      '1p': 'قُبِلْنَا',
      '2mp': 'قُبِلْتُمْ',
      '2fp': 'قُبِلْتُنَّ',
      '3mp': 'قُبِلُوا',
      '3fp': 'قُبِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('qbl-1')!, 'indicative')).toEqualT({
      '1s': 'أُقْبَلُ',
      '2ms': 'تُقْبَلُ',
      '2fs': 'تُقْبَلِينَ',
      '3ms': 'يُقْبَلُ',
      '3fs': 'تُقْبَلُ',
      '2d': 'تُقْبَلَانِ',
      '3md': 'يُقْبَلَانِ',
      '3fd': 'تُقْبَلَانِ',
      '1p': 'نُقْبَلُ',
      '2mp': 'تُقْبَلُونَ',
      '2fp': 'تُقْبَلْنَ',
      '3mp': 'يُقْبَلُونَ',
      '3fp': 'يُقْبَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qbl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُقْبَلَ',
      '2ms': 'تُقْبَلَ',
      '2fs': 'تُقْبَلِي',
      '3ms': 'يُقْبَلَ',
      '3fs': 'تُقْبَلَ',
      '2d': 'تُقْبَلَا',
      '3md': 'يُقْبَلَا',
      '3fd': 'تُقْبَلَا',
      '1p': 'نُقْبَلَ',
      '2mp': 'تُقْبَلُوا',
      '2fp': 'تُقْبَلْنَ',
      '3mp': 'يُقْبَلُوا',
      '3fp': 'يُقْبَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qbl-1')!, 'jussive')).toEqualT({
      '1s': 'أُقْبَلْ',
      '2ms': 'تُقْبَلْ',
      '2fs': 'تُقْبَلِي',
      '3ms': 'يُقْبَلْ',
      '3fs': 'تُقْبَلْ',
      '2d': 'تُقْبَلَا',
      '3md': 'يُقْبَلَا',
      '3fd': 'تُقْبَلَا',
      '1p': 'نُقْبَلْ',
      '2mp': 'تُقْبَلُوا',
      '2fp': 'تُقْبَلْنَ',
      '3mp': 'يُقْبَلُوا',
      '3fp': 'يُقْبَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qbl-1')!)).toEqualT('قَابِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('qbl-1')!)).toEqualT('مَقْبُول')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qbl-1')!)).toEqualT(['قُبُول'])
  })
})
