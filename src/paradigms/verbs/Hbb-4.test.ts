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

describe('Hbb-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hbb-4')!)).toEqualT({
      '1s': 'أَحْبَبْتُ',
      '2ms': 'أَحْبَبْتَ',
      '2fs': 'أَحْبَبْتِ',
      '3ms': 'أَحَبَّ',
      '3fs': 'أَحَبَّتْ',
      '2d': 'أَحْبَبْتُمَا',
      '3md': 'أَحَبَّا',
      '3fd': 'أَحَبَّتَا',
      '1p': 'أَحْبَبْنَا',
      '2mp': 'أَحْبَبْتُمْ',
      '2fp': 'أَحْبَبْتُنَّ',
      '3mp': 'أَحَبُّوا',
      '3fp': 'أَحْبَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-4')!, 'indicative')).toEqualT({
      '1s': 'أُحِبُّ',
      '2ms': 'تُحِبُّ',
      '2fs': 'تُحِبِّينَ',
      '3ms': 'يُحِبُّ',
      '3fs': 'تُحِبُّ',
      '2d': 'تُحِبَّانِ',
      '3md': 'يُحِبَّانِ',
      '3fd': 'تُحِبَّانِ',
      '1p': 'نُحِبُّ',
      '2mp': 'تُحِبُّونَ',
      '2fp': 'تُحْبِبْنَ',
      '3mp': 'يُحِبُّونَ',
      '3fp': 'يُحْبِبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُحِبَّ',
      '2ms': 'تُحِبَّ',
      '2fs': 'تُحِبِّي',
      '3ms': 'يُحِبَّ',
      '3fs': 'تُحِبَّ',
      '2d': 'تُحِبَّا',
      '3md': 'يُحِبَّا',
      '3fd': 'تُحِبَّا',
      '1p': 'نُحِبَّ',
      '2mp': 'تُحِبُّوا',
      '2fp': 'تُحْبِبْنَ',
      '3mp': 'يُحِبُّوا',
      '3fp': 'يُحْبِبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-4')!, 'jussive')).toEqualT({
      '1s': 'أُحِبَّ',
      '2ms': 'تُحِبَّ',
      '2fs': 'تُحِبِّي',
      '3ms': 'يُحِبَّ',
      '3fs': 'تُحِبَّ',
      '2d': 'تُحِبَّا',
      '3md': 'يُحِبَّا',
      '3fd': 'تُحِبَّا',
      '1p': 'نُحِبَّ',
      '2mp': 'تُحِبُّوا',
      '2fp': 'تُحْبِبْنَ',
      '3mp': 'يُحِبُّوا',
      '3fp': 'يُحْبِبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hbb-4')!)).toMatchObjectT({
      '2ms': 'أَحِبَّ',
      '2fs': 'أَحِبِّي',
      '2d': 'أَحِبَّا',
      '2mp': 'أَحِبُّوا',
      '2fp': 'أَحْبِبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hbb-4')!)).toEqualT({
      '1s': 'أُحْبِبْتُ',
      '2ms': 'أُحْبِبْتَ',
      '2fs': 'أُحْبِبْتِ',
      '3ms': 'أُحِبَّ',
      '3fs': 'أُحِبَّتْ',
      '2d': 'أُحْبِبْتُمَا',
      '3md': 'أُحِبَّا',
      '3fd': 'أُحِبَّتَا',
      '1p': 'أُحْبِبْنَا',
      '2mp': 'أُحْبِبْتُمْ',
      '2fp': 'أُحْبِبْتُنَّ',
      '3mp': 'أُحِبُّوا',
      '3fp': 'أُحْبِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hbb-4')!, 'indicative')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById('Hbb-4')!, 'subjunctive')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById('Hbb-4')!, 'jussive')).toEqualT({
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
    expect(deriveActiveParticiple(getVerbById('Hbb-4')!)).toEqualT('مُحِبّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hbb-4')!)).toEqualT('مُحَبّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hbb-4')!)).toEqualT(['إِحْبَاب', 'حُبّ', 'مَحَبَّة'])
  })
})
