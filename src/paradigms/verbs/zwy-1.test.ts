import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("zwy-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("zwy-1")!)).toEqualT({
      '1s': 'زَوَيْتُ',
      '2ms': 'زَوَيْتَ',
      '2fs': 'زَوَيْتِ',
      '3ms': 'زَوَى',
      '3fs': 'زَوَتْ',
      '2d': 'زَوَيْتُمَا',
      '3md': 'زَوَيَا',
      '3fd': 'زَوَتَا',
      '1p': 'زَوَيْنَا',
      '2mp': 'زَوَيْتُمْ',
      '2fp': 'زَوَيْتُنَّ',
      '3mp': 'زَوَوْا',
      '3fp': 'زَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("zwy-1")!, 'indicative')).toEqualT({
      '1s': 'أَزْوِي',
      '2ms': 'تَزْوِي',
      '2fs': 'تَزْوِينَ',
      '3ms': 'يَزْوِي',
      '3fs': 'تَزْوِي',
      '2d': 'تَزْوِيَانِ',
      '3md': 'يَزْوِيَانِ',
      '3fd': 'تَزْوِيَانِ',
      '1p': 'نَزْوِي',
      '2mp': 'تَزْوُونَ',
      '2fp': 'تَزْوِينَ',
      '3mp': 'يَزْوُونَ',
      '3fp': 'يَزْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("zwy-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَزْوِيَ',
      '2ms': 'تَزْوِيَ',
      '2fs': 'تَزْوِي',
      '3ms': 'يَزْوِيَ',
      '3fs': 'تَزْوِيَ',
      '2d': 'تَزْوِيَا',
      '3md': 'يَزْوِيَا',
      '3fd': 'تَزْوِيَا',
      '1p': 'نَزْوِيَ',
      '2mp': 'تَزْوُوا',
      '2fp': 'تَزْوِينَ',
      '3mp': 'يَزْوُوا',
      '3fp': 'يَزْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("zwy-1")!, 'jussive')).toEqualT({
      '1s': 'أَزْوِ',
      '2ms': 'تَزْوِ',
      '2fs': 'تَزْوِي',
      '3ms': 'يَزْوِ',
      '3fs': 'تَزْوِ',
      '2d': 'تَزْوِيَا',
      '3md': 'يَزْوِيَا',
      '3fd': 'تَزْوِيَا',
      '1p': 'نَزْوِ',
      '2mp': 'تَزْوُوا',
      '2fp': 'تَزْوِينَ',
      '3mp': 'يَزْوُوا',
      '3fp': 'يَزْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("zwy-1")!)).toMatchObjectT({
      '2ms': 'اِزْوِ',
      '2fs': 'اِزْوِي',
      '2d': 'اِزْوِيَا',
      '2mp': 'اِزْوُوا',
      '2fp': 'اِزْوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("zwy-1")!)).toEqualT({
      '1s': 'زُوِيتُ',
      '2ms': 'زُوِيتَ',
      '2fs': 'زُوِيتِ',
      '3ms': 'زُوِيَ',
      '3fs': 'زُوِيَتْ',
      '2d': 'زُوِيتُمَا',
      '3md': 'زُوِيَا',
      '3fd': 'زُوِيَتَا',
      '1p': 'زُوِينَا',
      '2mp': 'زُوِيتُمْ',
      '2fp': 'زُوِيتُنَّ',
      '3mp': 'زُوُوا',
      '3fp': 'زُوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("zwy-1")!, 'indicative')).toEqualT({
      '1s': 'أُزْوَى',
      '2ms': 'تُزْوَى',
      '2fs': 'تُزْوَيْنَ',
      '3ms': 'يُزْوَى',
      '3fs': 'تُزْوَى',
      '2d': 'تُزْوَيَانِ',
      '3md': 'يُزْوَيَانِ',
      '3fd': 'تُزْوَيَانِ',
      '1p': 'نُزْوَى',
      '2mp': 'تُزْوَوْنَ',
      '2fp': 'تُزْوَيْنَ',
      '3mp': 'يُزْوَوْنَ',
      '3fp': 'يُزْوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("zwy-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُزْوَى',
      '2ms': 'تُزْوَى',
      '2fs': 'تُزْوَيْ',
      '3ms': 'يُزْوَى',
      '3fs': 'تُزْوَى',
      '2d': 'تُزْوَيَا',
      '3md': 'يُزْوَيَا',
      '3fd': 'تُزْوَيَا',
      '1p': 'نُزْوَى',
      '2mp': 'تُزْوَوْا',
      '2fp': 'تُزْوَيْنَ',
      '3mp': 'يُزْوَوْا',
      '3fp': 'يُزْوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("zwy-1")!, 'jussive')).toEqualT({
      '1s': 'أُزْوَ',
      '2ms': 'تُزْوَ',
      '2fs': 'تُزْوَيْ',
      '3ms': 'يُزْوَ',
      '3fs': 'تُزْوَ',
      '2d': 'تُزْوَيَا',
      '3md': 'يُزْوَيَا',
      '3fd': 'تُزْوَيَا',
      '1p': 'نُزْوَ',
      '2mp': 'تُزْوَوْا',
      '2fp': 'تُزْوَيْنَ',
      '3mp': 'يُزْوَوْا',
      '3fp': 'يُزْوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("zwy-1")!)).toEqualT('زَاوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("zwy-1")!)).toEqualT('مَزْوِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("zwy-1")!))).toEqualT(new Set(['زَيّ', 'زَوِيّ']))
  })
})
