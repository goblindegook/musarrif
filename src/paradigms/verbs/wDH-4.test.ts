import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wDH-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wDH-4')!)).toEqualT({
      '1s': 'أَوْضَحْتُ',
      '2ms': 'أَوْضَحْتَ',
      '2fs': 'أَوْضَحْتِ',
      '3ms': 'أَوْضَحَ',
      '3fs': 'أَوْضَحَتْ',
      '2d': 'أَوْضَحْتُمَا',
      '3md': 'أَوْضَحَا',
      '3fd': 'أَوْضَحَتَا',
      '1p': 'أَوْضَحْنَا',
      '2mp': 'أَوْضَحْتُمْ',
      '2fp': 'أَوْضَحْتُنَّ',
      '3mp': 'أَوْضَحُوا',
      '3fp': 'أَوْضَحْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wDH-4')!, 'indicative')).toEqualT({
      '1s': 'أُوضِحُ',
      '2ms': 'تُوضِحُ',
      '2fs': 'تُوضِحِينَ',
      '3ms': 'يُوضِحُ',
      '3fs': 'تُوضِحُ',
      '2d': 'تُوضِحَانِ',
      '3md': 'يُوضِحَانِ',
      '3fd': 'تُوضِحَانِ',
      '1p': 'نُوضِحُ',
      '2mp': 'تُوضِحُونَ',
      '2fp': 'تُوضِحْنَ',
      '3mp': 'يُوضِحُونَ',
      '3fp': 'يُوضِحْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوضِحَ',
      '2ms': 'تُوضِحَ',
      '2fs': 'تُوضِحِي',
      '3ms': 'يُوضِحَ',
      '3fs': 'تُوضِحَ',
      '2d': 'تُوضِحَا',
      '3md': 'يُوضِحَا',
      '3fd': 'تُوضِحَا',
      '1p': 'نُوضِحَ',
      '2mp': 'تُوضِحُوا',
      '2fp': 'تُوضِحْنَ',
      '3mp': 'يُوضِحُوا',
      '3fp': 'يُوضِحْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-4')!, 'jussive')).toEqualT({
      '1s': 'أُوضِحْ',
      '2ms': 'تُوضِحْ',
      '2fs': 'تُوضِحِي',
      '3ms': 'يُوضِحْ',
      '3fs': 'تُوضِحْ',
      '2d': 'تُوضِحَا',
      '3md': 'يُوضِحَا',
      '3fd': 'تُوضِحَا',
      '1p': 'نُوضِحْ',
      '2mp': 'تُوضِحُوا',
      '2fp': 'تُوضِحْنَ',
      '3mp': 'يُوضِحُوا',
      '3fp': 'يُوضِحْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wDH-4')!)).toMatchObjectT({
      '2ms': 'أَوْضِحْ',
      '2fs': 'أَوْضِحِي',
      '2d': 'أَوْضِحَا',
      '2mp': 'أَوْضِحُوا',
      '2fp': 'أَوْضِحْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wDH-4')!)).toEqualT({
      '1s': 'أُوضِحْتُ',
      '2ms': 'أُوضِحْتَ',
      '2fs': 'أُوضِحْتِ',
      '3ms': 'أُوضِحَ',
      '3fs': 'أُوضِحَتْ',
      '2d': 'أُوضِحْتُمَا',
      '3md': 'أُوضِحَا',
      '3fd': 'أُوضِحَتَا',
      '1p': 'أُوضِحْنَا',
      '2mp': 'أُوضِحْتُمْ',
      '2fp': 'أُوضِحْتُنَّ',
      '3mp': 'أُوضِحُوا',
      '3fp': 'أُوضِحْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-4')!, 'indicative')).toEqualT({
      '1s': 'أُوضَحُ',
      '2ms': 'تُوضَحُ',
      '2fs': 'تُوضَحِينَ',
      '3ms': 'يُوضَحُ',
      '3fs': 'تُوضَحُ',
      '2d': 'تُوضَحَانِ',
      '3md': 'يُوضَحَانِ',
      '3fd': 'تُوضَحَانِ',
      '1p': 'نُوضَحُ',
      '2mp': 'تُوضَحُونَ',
      '2fp': 'تُوضَحْنَ',
      '3mp': 'يُوضَحُونَ',
      '3fp': 'يُوضَحْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوضَحَ',
      '2ms': 'تُوضَحَ',
      '2fs': 'تُوضَحِي',
      '3ms': 'يُوضَحَ',
      '3fs': 'تُوضَحَ',
      '2d': 'تُوضَحَا',
      '3md': 'يُوضَحَا',
      '3fd': 'تُوضَحَا',
      '1p': 'نُوضَحَ',
      '2mp': 'تُوضَحُوا',
      '2fp': 'تُوضَحْنَ',
      '3mp': 'يُوضَحُوا',
      '3fp': 'يُوضَحْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDH-4')!, 'jussive')).toEqualT({
      '1s': 'أُوضَحْ',
      '2ms': 'تُوضَحْ',
      '2fs': 'تُوضَحِي',
      '3ms': 'يُوضَحْ',
      '3fs': 'تُوضَحْ',
      '2d': 'تُوضَحَا',
      '3md': 'يُوضَحَا',
      '3fd': 'تُوضَحَا',
      '1p': 'نُوضَحْ',
      '2mp': 'تُوضَحُوا',
      '2fp': 'تُوضَحْنَ',
      '3mp': 'يُوضَحُوا',
      '3fp': 'يُوضَحْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wDH-4')!)).toEqualT('مُوضِح')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wDH-4')!)).toEqualT('مُوضَح')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wDH-4')!)).toEqualT(['إِيضَاح'])
  })
})
