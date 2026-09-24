import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$wl-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$wl-4')!)).toEqualT({
      '1s': 'أَشَلْتُ',
      '2ms': 'أَشَلْتَ',
      '2fs': 'أَشَلْتِ',
      '3ms': 'أَشَالَ',
      '3fs': 'أَشَالَتْ',
      '2d': 'أَشَلْتُمَا',
      '3md': 'أَشَالَا',
      '3fd': 'أَشَالَتَا',
      '1p': 'أَشَلْنَا',
      '2mp': 'أَشَلْتُمْ',
      '2fp': 'أَشَلْتُنَّ',
      '3mp': 'أَشَالُوا',
      '3fp': 'أَشَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$wl-4')!, 'indicative')).toEqualT({
      '1s': 'أُشِيلُ',
      '2ms': 'تُشِيلُ',
      '2fs': 'تُشِيلِينَ',
      '3ms': 'يُشِيلُ',
      '3fs': 'تُشِيلُ',
      '2d': 'تُشِيلَانِ',
      '3md': 'يُشِيلَانِ',
      '3fd': 'تُشِيلَانِ',
      '1p': 'نُشِيلُ',
      '2mp': 'تُشِيلُونَ',
      '2fp': 'تُشِلْنَ',
      '3mp': 'يُشِيلُونَ',
      '3fp': 'يُشِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$wl-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشِيلَ',
      '2ms': 'تُشِيلَ',
      '2fs': 'تُشِيلِي',
      '3ms': 'يُشِيلَ',
      '3fs': 'تُشِيلَ',
      '2d': 'تُشِيلَا',
      '3md': 'يُشِيلَا',
      '3fd': 'تُشِيلَا',
      '1p': 'نُشِيلَ',
      '2mp': 'تُشِيلُوا',
      '2fp': 'تُشِلْنَ',
      '3mp': 'يُشِيلُوا',
      '3fp': 'يُشِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$wl-4')!, 'jussive')).toEqualT({
      '1s': 'أُشِلْ',
      '2ms': 'تُشِلْ',
      '2fs': 'تُشِيلِي',
      '3ms': 'يُشِلْ',
      '3fs': 'تُشِلْ',
      '2d': 'تُشِيلَا',
      '3md': 'يُشِيلَا',
      '3fd': 'تُشِيلَا',
      '1p': 'نُشِلْ',
      '2mp': 'تُشِيلُوا',
      '2fp': 'تُشِلْنَ',
      '3mp': 'يُشِيلُوا',
      '3fp': 'يُشِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$wl-4')!)).toMatchObjectT({
      '2ms': 'أَشِلْ',
      '2fs': 'أَشِيلِي',
      '2d': 'أَشِيلَا',
      '2mp': 'أَشِيلُوا',
      '2fp': 'أَشِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$wl-4')!)).toEqualT({
      '1s': 'أُشِلْتُ',
      '2ms': 'أُشِلْتَ',
      '2fs': 'أُشِلْتِ',
      '3ms': 'أُشِيلَ',
      '3fs': 'أُشِيلَتْ',
      '2d': 'أُشِلْتُمَا',
      '3md': 'أُشِيلَا',
      '3fd': 'أُشِيلَتَا',
      '1p': 'أُشِلْنَا',
      '2mp': 'أُشِلْتُمْ',
      '2fp': 'أُشِلْتُنَّ',
      '3mp': 'أُشِيلُوا',
      '3fp': 'أُشِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wl-4')!, 'indicative')).toEqualT({
      '1s': 'أُشَالُ',
      '2ms': 'تُشَالُ',
      '2fs': 'تُشَالِينَ',
      '3ms': 'يُشَالُ',
      '3fs': 'تُشَالُ',
      '2d': 'تُشَالَانِ',
      '3md': 'يُشَالَانِ',
      '3fd': 'تُشَالَانِ',
      '1p': 'نُشَالُ',
      '2mp': 'تُشَالُونَ',
      '2fp': 'تُشَلْنَ',
      '3mp': 'يُشَالُونَ',
      '3fp': 'يُشَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wl-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَالَ',
      '2ms': 'تُشَالَ',
      '2fs': 'تُشَالِي',
      '3ms': 'يُشَالَ',
      '3fs': 'تُشَالَ',
      '2d': 'تُشَالَا',
      '3md': 'يُشَالَا',
      '3fd': 'تُشَالَا',
      '1p': 'نُشَالَ',
      '2mp': 'تُشَالُوا',
      '2fp': 'تُشَلْنَ',
      '3mp': 'يُشَالُوا',
      '3fp': 'يُشَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wl-4')!, 'jussive')).toEqualT({
      '1s': 'أُشَلْ',
      '2ms': 'تُشَلْ',
      '2fs': 'تُشَالِي',
      '3ms': 'يُشَلْ',
      '3fs': 'تُشَلْ',
      '2d': 'تُشَالَا',
      '3md': 'يُشَالَا',
      '3fd': 'تُشَالَا',
      '1p': 'نُشَلْ',
      '2mp': 'تُشَالُوا',
      '2fp': 'تُشَلْنَ',
      '3mp': 'يُشَالُوا',
      '3fp': 'يُشَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$wl-4')!)).toEqualT('مُشِيل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$wl-4')!)).toEqualT('مُشَال')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$wl-4')!))).toEqualT(new Set(['إِشَالَة']))
  })
})
