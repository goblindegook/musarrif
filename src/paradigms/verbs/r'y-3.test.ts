import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-3", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-3")!)).toEqualT({
      '1s': 'رَاءَيْتُ',
      '2ms': 'رَاءَيْتَ',
      '2fs': 'رَاءَيْتِ',
      '3ms': 'رَاءَى',
      '3fs': 'رَاءَتْ',
      '2d': 'رَاءَيْتُمَا',
      '3md': 'رَاءَيَا',
      '3fd': 'رَاءَتَا',
      '1p': 'رَاءَيْنَا',
      '2mp': 'رَاءَيْتُمْ',
      '2fp': 'رَاءَيْتُنَّ',
      '3mp': 'رَاءَوْا',
      '3fp': 'رَاءَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-3")!, 'indicative')).toEqualT({
      '1s': 'أُرَائِي',
      '2ms': 'تُرَائِي',
      '2fs': 'تُرَائِينَ',
      '3ms': 'يُرَائِي',
      '3fs': 'تُرَائِي',
      '2d': 'تُرَائِيَانِ',
      '3md': 'يُرَائِيَانِ',
      '3fd': 'تُرَائِيَانِ',
      '1p': 'نُرَائِي',
      '2mp': 'تُرَائُونَ',
      '2fp': 'تُرَائِينَ',
      '3mp': 'يُرَائُونَ',
      '3fp': 'يُرَائِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُرَائِيَ',
      '2ms': 'تُرَائِيَ',
      '2fs': 'تُرَائِي',
      '3ms': 'يُرَائِيَ',
      '3fs': 'تُرَائِيَ',
      '2d': 'تُرَائِيَا',
      '3md': 'يُرَائِيَا',
      '3fd': 'تُرَائِيَا',
      '1p': 'نُرَائِيَ',
      '2mp': 'تُرَائُوا',
      '2fp': 'تُرَائِينَ',
      '3mp': 'يُرَائُوا',
      '3fp': 'يُرَائِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-3")!, 'jussive')).toEqualT({
      '1s': 'أُرَاءِ',
      '2ms': 'تُرَاءِ',
      '2fs': 'تُرَائِي',
      '3ms': 'يُرَاءِ',
      '3fs': 'تُرَاءِ',
      '2d': 'تُرَائِيَا',
      '3md': 'يُرَائِيَا',
      '3fd': 'تُرَائِيَا',
      '1p': 'نُرَاءِ',
      '2mp': 'تُرَائُوا',
      '2fp': 'تُرَائِينَ',
      '3mp': 'يُرَائُوا',
      '3fp': 'يُرَائِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-3")!)).toMatchObjectT({
      '2ms': 'رَاءِ',
      '2fs': 'رَائِي',
      '2d': 'رَائِيَا',
      '2mp': 'رَائُوا',
      '2fp': 'رَائِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-3")!)).toEqualT({
      '1s': 'رُوئِيتُ',
      '2ms': 'رُوئِيتَ',
      '2fs': 'رُوئِيتِ',
      '3ms': 'رُوئِيَ',
      '3fs': 'رُوئِيَتْ',
      '2d': 'رُوئِيتُمَا',
      '3md': 'رُوئِيَا',
      '3fd': 'رُوئِيَتَا',
      '1p': 'رُوئِينَا',
      '2mp': 'رُوئِيتُمْ',
      '2fp': 'رُوئِيتُنَّ',
      '3mp': 'رُوئُوا',
      '3fp': 'رُوئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-3")!, 'indicative')).toEqualT({
      '1s': 'أُرَاءَى',
      '2ms': 'تُرَاءَى',
      '2fs': 'تُرَاءَيْنَ',
      '3ms': 'يُرَاءَى',
      '3fs': 'تُرَاءَى',
      '2d': 'تُرَاءَيَانِ',
      '3md': 'يُرَاءَيَانِ',
      '3fd': 'تُرَاءَيَانِ',
      '1p': 'نُرَاءَى',
      '2mp': 'تُرَاءَوْنَ',
      '2fp': 'تُرَاءَيْنَ',
      '3mp': 'يُرَاءَوْنَ',
      '3fp': 'يُرَاءَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُرَاءَى',
      '2ms': 'تُرَاءَى',
      '2fs': 'تُرَاءَيْ',
      '3ms': 'يُرَاءَى',
      '3fs': 'تُرَاءَى',
      '2d': 'تُرَاءَيَا',
      '3md': 'يُرَاءَيَا',
      '3fd': 'تُرَاءَيَا',
      '1p': 'نُرَاءَى',
      '2mp': 'تُرَاءَوْا',
      '2fp': 'تُرَاءَيْنَ',
      '3mp': 'يُرَاءَوْا',
      '3fp': 'يُرَاءَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-3")!, 'jussive')).toEqualT({
      '1s': 'أُرَاءَ',
      '2ms': 'تُرَاءَ',
      '2fs': 'تُرَاءَيْ',
      '3ms': 'يُرَاءَ',
      '3fs': 'تُرَاءَ',
      '2d': 'تُرَاءَيَا',
      '3md': 'يُرَاءَيَا',
      '3fd': 'تُرَاءَيَا',
      '1p': 'نُرَاءَ',
      '2mp': 'تُرَاءَوْا',
      '2fp': 'تُرَاءَيْنَ',
      '3mp': 'يُرَاءَوْا',
      '3fp': 'يُرَاءَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-3")!)).toEqualT('مُرَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-3")!)).toEqualT('مُرَاءًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("r'y-3")!)).toEqualT(['مُرَاءَاة', 'رِئَاء', 'رِيَاء'])
  })
})
