import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wT'-6", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wT'-6")!)).toEqualT({
      '1s': 'تَوَاطَأْتُ',
      '2ms': 'تَوَاطَأْتَ',
      '2fs': 'تَوَاطَأْتِ',
      '3ms': 'تَوَاطَأَ',
      '3fs': 'تَوَاطَأَتْ',
      '2d': 'تَوَاطَأْتُمَا',
      '3md': 'تَوَاطَآ',
      '3fd': 'تَوَاطَأَتَا',
      '1p': 'تَوَاطَأْنَا',
      '2mp': 'تَوَاطَأْتُمْ',
      '2fp': 'تَوَاطَأْتُنَّ',
      '3mp': 'تَوَاطَؤُوا',
      '3fp': 'تَوَاطَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wT'-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَوَاطَأُ',
      '2ms': 'تَتَوَاطَأُ',
      '2fs': 'تَتَوَاطَئِينَ',
      '3ms': 'يَتَوَاطَأُ',
      '3fs': 'تَتَوَاطَأُ',
      '2d': 'تَتَوَاطَآنِ',
      '3md': 'يَتَوَاطَآنِ',
      '3fd': 'تَتَوَاطَآنِ',
      '1p': 'نَتَوَاطَأُ',
      '2mp': 'تَتَوَاطَؤُونَ',
      '2fp': 'تَتَوَاطَأْنَ',
      '3mp': 'يَتَوَاطَؤُونَ',
      '3fp': 'يَتَوَاطَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَاطَأَ',
      '2ms': 'تَتَوَاطَأَ',
      '2fs': 'تَتَوَاطَئِي',
      '3ms': 'يَتَوَاطَأَ',
      '3fs': 'تَتَوَاطَأَ',
      '2d': 'تَتَوَاطَآ',
      '3md': 'يَتَوَاطَآ',
      '3fd': 'تَتَوَاطَآ',
      '1p': 'نَتَوَاطَأَ',
      '2mp': 'تَتَوَاطَؤُوا',
      '2fp': 'تَتَوَاطَأْنَ',
      '3mp': 'يَتَوَاطَؤُوا',
      '3fp': 'يَتَوَاطَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَوَاطَأْ',
      '2ms': 'تَتَوَاطَأْ',
      '2fs': 'تَتَوَاطَئِي',
      '3ms': 'يَتَوَاطَأْ',
      '3fs': 'تَتَوَاطَأْ',
      '2d': 'تَتَوَاطَآ',
      '3md': 'يَتَوَاطَآ',
      '3fd': 'تَتَوَاطَآ',
      '1p': 'نَتَوَاطَأْ',
      '2mp': 'تَتَوَاطَؤُوا',
      '2fp': 'تَتَوَاطَأْنَ',
      '3mp': 'يَتَوَاطَؤُوا',
      '3fp': 'يَتَوَاطَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wT'-6")!)).toMatchObjectT({
      '2ms': 'تَوَاطَأْ',
      '2fs': 'تَوَاطَئِي',
      '2d': 'تَوَاطَآ',
      '2mp': 'تَوَاطَؤُوا',
      '2fp': 'تَوَاطَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wT'-6")!)).toMatchObjectT({
      '3ms': 'تُوُوطِئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-6")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَوَاطَأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-6")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَوَاطَأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-6")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَوَاطَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wT'-6")!)).toEqualT('مُتَوَاطِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wT'-6")!)).toEqualT('مُتَوَاطَأ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("wT'-6")!)).toEqualT(['تَوَاطُؤ'])
  })
})
