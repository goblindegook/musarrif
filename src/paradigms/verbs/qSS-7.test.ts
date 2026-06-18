import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { getVerbById } from '../verbs'

describe('qSS-7', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qSS-7')!)).strings.toEqualT({
      '1s': 'اِنْقَصَصْتُ',
      '2ms': 'اِنْقَصَصْتَ',
      '2fs': 'اِنْقَصَصْتِ',
      '3ms': 'اِنْقَصَّ',
      '3fs': 'اِنْقَصَّتْ',
      '2d': 'اِنْقَصَصْتُمَا',
      '3md': 'اِنْقَصَّا',
      '3fd': 'اِنْقَصَّتَا',
      '1p': 'اِنْقَصَصْنَا',
      '2mp': 'اِنْقَصَصْتُمْ',
      '2fp': 'اِنْقَصَصْتُنَّ',
      '3mp': 'اِنْقَصُّوا',
      '3fp': 'اِنْقَصَصْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qSS-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْقَصُّ',
      '2ms': 'تَنْقَصُّ',
      '2fs': 'تَنْقَصِّينَ',
      '3ms': 'يَنْقَصُّ',
      '3fs': 'تَنْقَصُّ',
      '2d': 'تَنْقَصَّانِ',
      '3md': 'يَنْقَصَّانِ',
      '3fd': 'تَنْقَصَّانِ',
      '1p': 'نَنْقَصُّ',
      '2mp': 'تَنْقَصُّونَ',
      '2fp': 'تَنْقَصِصْنَ',
      '3mp': 'يَنْقَصُّونَ',
      '3fp': 'يَنْقَصِصْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qSS-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْقَصَّ',
      '2ms': 'تَنْقَصَّ',
      '2fs': 'تَنْقَصِّي',
      '3ms': 'يَنْقَصَّ',
      '3fs': 'تَنْقَصَّ',
      '2d': 'تَنْقَصَّا',
      '3md': 'يَنْقَصَّا',
      '3fd': 'تَنْقَصَّا',
      '1p': 'نَنْقَصَّ',
      '2mp': 'تَنْقَصُّوا',
      '2fp': 'تَنْقَصِصْنَ',
      '3mp': 'يَنْقَصُّوا',
      '3fp': 'يَنْقَصِصْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qSS-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْقَصَّ',
      '2ms': 'تَنْقَصَّ',
      '2fs': 'تَنْقَصِّي',
      '3ms': 'يَنْقَصَّ',
      '3fs': 'تَنْقَصَّ',
      '2d': 'تَنْقَصَّا',
      '3md': 'يَنْقَصَّا',
      '3fd': 'تَنْقَصَّا',
      '1p': 'نَنْقَصَّ',
      '2mp': 'تَنْقَصُّوا',
      '2fp': 'تَنْقَصِصْنَ',
      '3mp': 'يَنْقَصُّوا',
      '3fp': 'يَنْقَصِصْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qSS-7')!)).toMatchObjectT({
      '2ms': 'اِنْقَصَّ',
      '2fs': 'اِنْقَصِّي',
      '2d': 'اِنْقَصَّا',
      '2mp': 'اِنْقَصُّوا',
      '2fp': 'اِنْقَصِصْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qSS-7')!)).toEqualT('مُنْقَصّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qSS-7')!)).toEqualT(['اِنْقِصَاص'])
  })
})
