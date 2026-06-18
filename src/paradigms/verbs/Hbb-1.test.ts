import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hbb-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hbb-1')!)).strings.toEqualT({
      '1s': 'حَبَبْتُ',
      '2ms': 'حَبَبْتَ',
      '2fs': 'حَبَبْتِ',
      '3ms': 'حَبَّ',
      '3fs': 'حَبَّتْ',
      '2d': 'حَبَبْتُمَا',
      '3md': 'حَبَّا',
      '3fd': 'حَبَّتَا',
      '1p': 'حَبَبْنَا',
      '2mp': 'حَبَبْتُمْ',
      '2fp': 'حَبَبْتُنَّ',
      '3mp': 'حَبُّوا',
      '3fp': 'حَبَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-1')!, 'indicative')).toEqualT({
      '1s': 'أَحِبُّ',
      '2ms': 'تَحِبُّ',
      '2fs': 'تَحِبِّينَ',
      '3ms': 'يَحِبُّ',
      '3fs': 'تَحِبُّ',
      '2d': 'تَحِبَّانِ',
      '3md': 'يَحِبَّانِ',
      '3fd': 'تَحِبَّانِ',
      '1p': 'نَحِبُّ',
      '2mp': 'تَحِبُّونَ',
      '2fp': 'تَحْبِبْنَ',
      '3mp': 'يَحِبُّونَ',
      '3fp': 'يَحْبِبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَحِبَّ',
      '2ms': 'تَحِبَّ',
      '2fs': 'تَحِبِّي',
      '3ms': 'يَحِبَّ',
      '3fs': 'تَحِبَّ',
      '2d': 'تَحِبَّا',
      '3md': 'يَحِبَّا',
      '3fd': 'تَحِبَّا',
      '1p': 'نَحِبَّ',
      '2mp': 'تَحِبُّوا',
      '2fp': 'تَحْبِبْنَ',
      '3mp': 'يَحِبُّوا',
      '3fp': 'يَحْبِبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-1')!, 'jussive')).toEqualT({
      '1s': 'أَحِبَّ',
      '2ms': 'تَحِبَّ',
      '2fs': 'تَحِبِّي',
      '3ms': 'يَحِبَّ',
      '3fs': 'تَحِبَّ',
      '2d': 'تَحِبَّا',
      '3md': 'يَحِبَّا',
      '3fd': 'تَحِبَّا',
      '1p': 'نَحِبَّ',
      '2mp': 'تَحِبُّوا',
      '2fp': 'تَحْبِبْنَ',
      '3mp': 'يَحِبُّوا',
      '3fp': 'يَحْبِبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hbb-1')!)).toMatchObjectT({
      '2ms': 'حِبَّ',
      '2fs': 'حِبِّي',
      '2d': 'حِبَّا',
      '2mp': 'حِبُّوا',
      '2fp': 'اِحْبِبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hbb-1')!)).toEqualT({
      '1s': 'حُبِبْتُ',
      '2ms': 'حُبِبْتَ',
      '2fs': 'حُبِبْتِ',
      '3ms': 'حُبَّ',
      '3fs': 'حُبَّتْ',
      '2d': 'حُبِبْتُمَا',
      '3md': 'حُبَّا',
      '3fd': 'حُبَّتَا',
      '1p': 'حُبِبْنَا',
      '2mp': 'حُبِبْتُمْ',
      '2fp': 'حُبِبْتُنَّ',
      '3mp': 'حُبُّوا',
      '3fp': 'حُبِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hbb-1')!, 'indicative')).toEqualT({
      '1s': 'أُحَبُّ',
      '2ms': 'تُحَبُّ',
      '2fs': 'تُحَبِّينَ',
      '3ms': 'يُحَبُّ',
      '3fs': 'تُحَبُّ',
      '2d': 'تُحَبَّانِ',
      '3md': 'يُحَبَّانِ',
      '3fd': 'تُحَبَّانِ',
      '1p': 'نُحَبُّ',
      '2mp': 'تُحَبُّونَ',
      '2fp': 'تُحْبَبْنَ',
      '3mp': 'يُحَبُّونَ',
      '3fp': 'يُحْبَبْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hbb-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُحَبَّ',
      '2ms': 'تُحَبَّ',
      '2fs': 'تُحَبِّي',
      '3ms': 'يُحَبَّ',
      '3fs': 'تُحَبَّ',
      '2d': 'تُحَبَّا',
      '3md': 'يُحَبَّا',
      '3fd': 'تُحَبَّا',
      '1p': 'نُحَبَّ',
      '2mp': 'تُحَبُّوا',
      '2fp': 'تُحْبَبْنَ',
      '3mp': 'يُحَبُّوا',
      '3fp': 'يُحْبَبْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hbb-1')!, 'jussive')).toEqualT({
      '1s': 'أُحَبَّ',
      '2ms': 'تُحَبَّ',
      '2fs': 'تُحَبِّي',
      '3ms': 'يُحَبَّ',
      '3fs': 'تُحَبَّ',
      '2d': 'تُحَبَّا',
      '3md': 'يُحَبَّا',
      '3fd': 'تُحَبَّا',
      '1p': 'نُحَبَّ',
      '2mp': 'تُحَبُّوا',
      '2fp': 'تُحْبَبْنَ',
      '3mp': 'يُحَبُّوا',
      '3fp': 'يُحْبَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hbb-1')!)).toEqualT('حَابّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hbb-1')!)).toEqualT('مَحْبُوب')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hbb-1')!)).toEqualT(['حُبّ', 'مَحَبَّة'])
  })
})
