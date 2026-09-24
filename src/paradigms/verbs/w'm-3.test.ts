import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("w'm-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'm-3")!)).toEqualT({
      '1s': 'وَاءَمْتُ',
      '2ms': 'وَاءَمْتَ',
      '2fs': 'وَاءَمْتِ',
      '3ms': 'وَاءَمَ',
      '3fs': 'وَاءَمَتْ',
      '2d': 'وَاءَمْتُمَا',
      '3md': 'وَاءَمَا',
      '3fd': 'وَاءَمَتَا',
      '1p': 'وَاءَمْنَا',
      '2mp': 'وَاءَمْتُمْ',
      '2fp': 'وَاءَمْتُنَّ',
      '3mp': 'وَاءَمُوا',
      '3fp': 'وَاءَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'm-3")!, 'indicative')).toEqualT({
      '1s': 'أُوَائِمُ',
      '2ms': 'تُوَائِمُ',
      '2fs': 'تُوَائِمِينَ',
      '3ms': 'يُوَائِمُ',
      '3fs': 'تُوَائِمُ',
      '2d': 'تُوَائِمَانِ',
      '3md': 'يُوَائِمَانِ',
      '3fd': 'تُوَائِمَانِ',
      '1p': 'نُوَائِمُ',
      '2mp': 'تُوَائِمُونَ',
      '2fp': 'تُوَائِمْنَ',
      '3mp': 'يُوَائِمُونَ',
      '3fp': 'يُوَائِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'm-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَائِمَ',
      '2ms': 'تُوَائِمَ',
      '2fs': 'تُوَائِمِي',
      '3ms': 'يُوَائِمَ',
      '3fs': 'تُوَائِمَ',
      '2d': 'تُوَائِمَا',
      '3md': 'يُوَائِمَا',
      '3fd': 'تُوَائِمَا',
      '1p': 'نُوَائِمَ',
      '2mp': 'تُوَائِمُوا',
      '2fp': 'تُوَائِمْنَ',
      '3mp': 'يُوَائِمُوا',
      '3fp': 'يُوَائِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'm-3")!, 'jussive')).toEqualT({
      '1s': 'أُوَائِمْ',
      '2ms': 'تُوَائِمْ',
      '2fs': 'تُوَائِمِي',
      '3ms': 'يُوَائِمْ',
      '3fs': 'تُوَائِمْ',
      '2d': 'تُوَائِمَا',
      '3md': 'يُوَائِمَا',
      '3fd': 'تُوَائِمَا',
      '1p': 'نُوَائِمْ',
      '2mp': 'تُوَائِمُوا',
      '2fp': 'تُوَائِمْنَ',
      '3mp': 'يُوَائِمُوا',
      '3fp': 'يُوَائِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'm-3")!)).toMatchObjectT({
      '2ms': 'وَائِمْ',
      '2fs': 'وَائِمِي',
      '2d': 'وَائِمَا',
      '2mp': 'وَائِمُوا',
      '2fp': 'وَائِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("w'm-3")!)).toEqualT({
      '1s': 'وُوئِمْتُ',
      '2ms': 'وُوئِمْتَ',
      '2fs': 'وُوئِمْتِ',
      '3ms': 'وُوئِمَ',
      '3fs': 'وُوئِمَتْ',
      '2d': 'وُوئِمْتُمَا',
      '3md': 'وُوئِمَا',
      '3fd': 'وُوئِمَتَا',
      '1p': 'وُوئِمْنَا',
      '2mp': 'وُوئِمْتُمْ',
      '2fp': 'وُوئِمْتُنَّ',
      '3mp': 'وُوئِمُوا',
      '3fp': 'وُوئِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'm-3")!, 'indicative')).toEqualT({
      '1s': 'أُوَاءَمُ',
      '2ms': 'تُوَاءَمُ',
      '2fs': 'تُوَاءَمِينَ',
      '3ms': 'يُوَاءَمُ',
      '3fs': 'تُوَاءَمُ',
      '2d': 'تُوَاءَمَانِ',
      '3md': 'يُوَاءَمَانِ',
      '3fd': 'تُوَاءَمَانِ',
      '1p': 'نُوَاءَمُ',
      '2mp': 'تُوَاءَمُونَ',
      '2fp': 'تُوَاءَمْنَ',
      '3mp': 'يُوَاءَمُونَ',
      '3fp': 'يُوَاءَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'm-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَاءَمَ',
      '2ms': 'تُوَاءَمَ',
      '2fs': 'تُوَاءَمِي',
      '3ms': 'يُوَاءَمَ',
      '3fs': 'تُوَاءَمَ',
      '2d': 'تُوَاءَمَا',
      '3md': 'يُوَاءَمَا',
      '3fd': 'تُوَاءَمَا',
      '1p': 'نُوَاءَمَ',
      '2mp': 'تُوَاءَمُوا',
      '2fp': 'تُوَاءَمْنَ',
      '3mp': 'يُوَاءَمُوا',
      '3fp': 'يُوَاءَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'm-3")!, 'jussive')).toEqualT({
      '1s': 'أُوَاءَمْ',
      '2ms': 'تُوَاءَمْ',
      '2fs': 'تُوَاءَمِي',
      '3ms': 'يُوَاءَمْ',
      '3fs': 'تُوَاءَمْ',
      '2d': 'تُوَاءَمَا',
      '3md': 'يُوَاءَمَا',
      '3fd': 'تُوَاءَمَا',
      '1p': 'نُوَاءَمْ',
      '2mp': 'تُوَاءَمُوا',
      '2fp': 'تُوَاءَمْنَ',
      '3mp': 'يُوَاءَمُوا',
      '3fp': 'يُوَاءَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'm-3")!)).toEqualT('مُوَائِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("w'm-3")!)).toEqualT('مُوَاءَم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("w'm-3")!))).toEqualT(new Set(['مُوَاءَمَة']))
  })
})
