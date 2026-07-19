import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Dw'-10", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Dw'-10")!)).toEqualT({
      '1s': 'اِسْتَضَأْتُ',
      '2ms': 'اِسْتَضَأْتَ',
      '2fs': 'اِسْتَضَأْتِ',
      '3ms': 'اِسْتَضَاءَ',
      '3fs': 'اِسْتَضَاءَتْ',
      '2d': 'اِسْتَضَأْتُمَا',
      '3md': 'اِسْتَضَاءَا',
      '3fd': 'اِسْتَضَاءَتَا',
      '1p': 'اِسْتَضَأْنَا',
      '2mp': 'اِسْتَضَأْتُمْ',
      '2fp': 'اِسْتَضَأْتُنَّ',
      '3mp': 'اِسْتَضَائُوا',
      '3fp': 'اِسْتَضَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَضِيءُ',
      '2ms': 'تَسْتَضِيءُ',
      '2fs': 'تَسْتَضِيئِينَ',
      '3ms': 'يَسْتَضِيءُ',
      '3fs': 'تَسْتَضِيءُ',
      '2d': 'تَسْتَضِيئَانِ',
      '3md': 'يَسْتَضِيئَانِ',
      '3fd': 'تَسْتَضِيئَانِ',
      '1p': 'نَسْتَضِيءُ',
      '2mp': 'تَسْتَضِيئُونَ',
      '2fp': 'تَسْتَضِئْنَ',
      '3mp': 'يَسْتَضِيئُونَ',
      '3fp': 'يَسْتَضِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَضِيءَ',
      '2ms': 'تَسْتَضِيءَ',
      '2fs': 'تَسْتَضِيئِي',
      '3ms': 'يَسْتَضِيءَ',
      '3fs': 'تَسْتَضِيءَ',
      '2d': 'تَسْتَضِيئَا',
      '3md': 'يَسْتَضِيئَا',
      '3fd': 'تَسْتَضِيئَا',
      '1p': 'نَسْتَضِيءَ',
      '2mp': 'تَسْتَضِيئُوا',
      '2fp': 'تَسْتَضِئْنَ',
      '3mp': 'يَسْتَضِيئُوا',
      '3fp': 'يَسْتَضِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَضِئْ',
      '2ms': 'تَسْتَضِئْ',
      '2fs': 'تَسْتَضِيئِي',
      '3ms': 'يَسْتَضِئْ',
      '3fs': 'تَسْتَضِئْ',
      '2d': 'تَسْتَضِيئَا',
      '3md': 'يَسْتَضِيئَا',
      '3fd': 'تَسْتَضِيئَا',
      '1p': 'نَسْتَضِئْ',
      '2mp': 'تَسْتَضِيئُوا',
      '2fp': 'تَسْتَضِئْنَ',
      '3mp': 'يَسْتَضِيئُوا',
      '3fp': 'يَسْتَضِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Dw'-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَضِئْ',
      '2fs': 'اِسْتَضِيئِي',
      '2d': 'اِسْتَضِيئَا',
      '2mp': 'اِسْتَضِيئُوا',
      '2fp': 'اِسْتَضِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Dw'-10")!)).toMatchObjectT({
      '3ms': 'اُسْتُضِيءَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-10")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَضَاءُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-10")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَضَاءَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-10")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَضَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Dw'-10")!)).toEqualT('مُسْتَضِيء')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Dw'-10")!)).toEqualT('مُسْتَضَاء')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("Dw'-10")!)).toEqualT(['اِسْتِضَاءَة'])
  })
})
