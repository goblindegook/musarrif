import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("dEw-8", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("dEw-8")!)).toEqualT({
      '1s': 'اِدَّعَيْتُ',
      '2ms': 'اِدَّعَيْتَ',
      '2fs': 'اِدَّعَيْتِ',
      '3ms': 'اِدَّعَى',
      '3fs': 'اِدَّعَتْ',
      '2d': 'اِدَّعَيْتُمَا',
      '3md': 'اِدَّعَيَا',
      '3fd': 'اِدَّعَتَا',
      '1p': 'اِدَّعَيْنَا',
      '2mp': 'اِدَّعَيْتُمْ',
      '2fp': 'اِدَّعَيْتُنَّ',
      '3mp': 'اِدَّعَوْا',
      '3fp': 'اِدَّعَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("dEw-8")!, 'indicative')).toEqualT({
      '1s': 'أَدَّعِي',
      '2ms': 'تَدَّعِي',
      '2fs': 'تَدَّعِينَ',
      '3ms': 'يَدَّعِي',
      '3fs': 'تَدَّعِي',
      '2d': 'تَدَّعِيَانِ',
      '3md': 'يَدَّعِيَانِ',
      '3fd': 'تَدَّعِيَانِ',
      '1p': 'نَدَّعِي',
      '2mp': 'تَدَّعُونَ',
      '2fp': 'تَدَّعِينَ',
      '3mp': 'يَدَّعُونَ',
      '3fp': 'يَدَّعِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("dEw-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَدَّعِيَ',
      '2ms': 'تَدَّعِيَ',
      '2fs': 'تَدَّعِي',
      '3ms': 'يَدَّعِيَ',
      '3fs': 'تَدَّعِيَ',
      '2d': 'تَدَّعِيَا',
      '3md': 'يَدَّعِيَا',
      '3fd': 'تَدَّعِيَا',
      '1p': 'نَدَّعِيَ',
      '2mp': 'تَدَّعُوا',
      '2fp': 'تَدَّعِينَ',
      '3mp': 'يَدَّعُوا',
      '3fp': 'يَدَّعِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("dEw-8")!, 'jussive')).toEqualT({
      '1s': 'أَدَّعِ',
      '2ms': 'تَدَّعِ',
      '2fs': 'تَدَّعِي',
      '3ms': 'يَدَّعِ',
      '3fs': 'تَدَّعِ',
      '2d': 'تَدَّعِيَا',
      '3md': 'يَدَّعِيَا',
      '3fd': 'تَدَّعِيَا',
      '1p': 'نَدَّعِ',
      '2mp': 'تَدَّعُوا',
      '2fp': 'تَدَّعِينَ',
      '3mp': 'يَدَّعُوا',
      '3fp': 'يَدَّعِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("dEw-8")!)).toMatchObjectT({
      '2ms': 'اِدَّعِ',
      '2fs': 'اِدَّعِي',
      '2d': 'اِدَّعِيَا',
      '2mp': 'اِدَّعُوا',
      '2fp': 'اِدَّعِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("dEw-8")!)).toEqualT({
      '1s': 'اُدُّعِيتُ',
      '2ms': 'اُدُّعِيتَ',
      '2fs': 'اُدُّعِيتِ',
      '3ms': 'اُدُّعِيَ',
      '3fs': 'اُدُّعِيَتْ',
      '2d': 'اُدُّعِيتُمَا',
      '3md': 'اُدُّعِيَا',
      '3fd': 'اُدُّعِيَتَا',
      '1p': 'اُدُّعِينَا',
      '2mp': 'اُدُّعِيتُمْ',
      '2fp': 'اُدُّعِيتُنَّ',
      '3mp': 'اُدُّعُوا',
      '3fp': 'اُدُّعِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("dEw-8")!, 'indicative')).toEqualT({
      '1s': 'أُدَّعَى',
      '2ms': 'تُدَّعَى',
      '2fs': 'تُدَّعَيْنَ',
      '3ms': 'يُدَّعَى',
      '3fs': 'تُدَّعَى',
      '2d': 'تُدَّعَيَانِ',
      '3md': 'يُدَّعَيَانِ',
      '3fd': 'تُدَّعَيَانِ',
      '1p': 'نُدَّعَى',
      '2mp': 'تُدَّعَوْنَ',
      '2fp': 'تُدَّعَيْنَ',
      '3mp': 'يُدَّعَوْنَ',
      '3fp': 'يُدَّعَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("dEw-8")!, 'subjunctive')).toEqualT({
      '1s': 'أُدَّعَى',
      '2ms': 'تُدَّعَى',
      '2fs': 'تُدَّعَيْ',
      '3ms': 'يُدَّعَى',
      '3fs': 'تُدَّعَى',
      '2d': 'تُدَّعَيَا',
      '3md': 'يُدَّعَيَا',
      '3fd': 'تُدَّعَيَا',
      '1p': 'نُدَّعَى',
      '2mp': 'تُدَّعَوْا',
      '2fp': 'تُدَّعَيْنَ',
      '3mp': 'يُدَّعَوْا',
      '3fp': 'يُدَّعَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("dEw-8")!, 'jussive')).toEqualT({
      '1s': 'أُدَّعَ',
      '2ms': 'تُدَّعَ',
      '2fs': 'تُدَّعَيْ',
      '3ms': 'يُدَّعَ',
      '3fs': 'تُدَّعَ',
      '2d': 'تُدَّعَيَا',
      '3md': 'يُدَّعَيَا',
      '3fd': 'تُدَّعَيَا',
      '1p': 'نُدَّعَ',
      '2mp': 'تُدَّعَوْا',
      '2fp': 'تُدَّعَيْنَ',
      '3mp': 'يُدَّعَوْا',
      '3fp': 'يُدَّعَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("dEw-8")!)).toEqualT('مُدَّعٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("dEw-8")!)).toEqualT('مُدَّعًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("dEw-8")!)).toEqualT(['اِدِّعَاء', 'دَعْوَى'])
  })
})
