import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("l'm-3", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("l'm-3")!)).toEqualT({
      '1s': 'لَاءَمْتُ',
      '2ms': 'لَاءَمْتَ',
      '2fs': 'لَاءَمْتِ',
      '3ms': 'لَاءَمَ',
      '3fs': 'لَاءَمَتْ',
      '2d': 'لَاءَمْتُمَا',
      '3md': 'لَاءَمَا',
      '3fd': 'لَاءَمَتَا',
      '1p': 'لَاءَمْنَا',
      '2mp': 'لَاءَمْتُمْ',
      '2fp': 'لَاءَمْتُنَّ',
      '3mp': 'لَاءَمُوا',
      '3fp': 'لَاءَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("l'm-3")!, 'indicative')).toEqualT({
      '1s': 'أُلَائِمُ',
      '2ms': 'تُلَائِمُ',
      '2fs': 'تُلَائِمِينَ',
      '3ms': 'يُلَائِمُ',
      '3fs': 'تُلَائِمُ',
      '2d': 'تُلَائِمَانِ',
      '3md': 'يُلَائِمَانِ',
      '3fd': 'تُلَائِمَانِ',
      '1p': 'نُلَائِمُ',
      '2mp': 'تُلَائِمُونَ',
      '2fp': 'تُلَائِمْنَ',
      '3mp': 'يُلَائِمُونَ',
      '3fp': 'يُلَائِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("l'm-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُلَائِمَ',
      '2ms': 'تُلَائِمَ',
      '2fs': 'تُلَائِمِي',
      '3ms': 'يُلَائِمَ',
      '3fs': 'تُلَائِمَ',
      '2d': 'تُلَائِمَا',
      '3md': 'يُلَائِمَا',
      '3fd': 'تُلَائِمَا',
      '1p': 'نُلَائِمَ',
      '2mp': 'تُلَائِمُوا',
      '2fp': 'تُلَائِمْنَ',
      '3mp': 'يُلَائِمُوا',
      '3fp': 'يُلَائِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("l'm-3")!, 'jussive')).toEqualT({
      '1s': 'أُلَائِمْ',
      '2ms': 'تُلَائِمْ',
      '2fs': 'تُلَائِمِي',
      '3ms': 'يُلَائِمْ',
      '3fs': 'تُلَائِمْ',
      '2d': 'تُلَائِمَا',
      '3md': 'يُلَائِمَا',
      '3fd': 'تُلَائِمَا',
      '1p': 'نُلَائِمْ',
      '2mp': 'تُلَائِمُوا',
      '2fp': 'تُلَائِمْنَ',
      '3mp': 'يُلَائِمُوا',
      '3fp': 'يُلَائِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("l'm-3")!)).toMatchObjectT({
      '2ms': 'لَائِمْ',
      '2fs': 'لَائِمِي',
      '2d': 'لَائِمَا',
      '2mp': 'لَائِمُوا',
      '2fp': 'لَائِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("l'm-3")!)).toEqualT({
      '1s': 'لُوئِمْتُ',
      '2ms': 'لُوئِمْتَ',
      '2fs': 'لُوئِمْتِ',
      '3ms': 'لُوئِمَ',
      '3fs': 'لُوئِمَتْ',
      '2d': 'لُوئِمْتُمَا',
      '3md': 'لُوئِمَا',
      '3fd': 'لُوئِمَتَا',
      '1p': 'لُوئِمْنَا',
      '2mp': 'لُوئِمْتُمْ',
      '2fp': 'لُوئِمْتُنَّ',
      '3mp': 'لُوئِمُوا',
      '3fp': 'لُوئِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("l'm-3")!, 'indicative')).toEqualT({
      '1s': 'أُلَاءَمُ',
      '2ms': 'تُلَاءَمُ',
      '2fs': 'تُلَاءَمِينَ',
      '3ms': 'يُلَاءَمُ',
      '3fs': 'تُلَاءَمُ',
      '2d': 'تُلَاءَمَانِ',
      '3md': 'يُلَاءَمَانِ',
      '3fd': 'تُلَاءَمَانِ',
      '1p': 'نُلَاءَمُ',
      '2mp': 'تُلَاءَمُونَ',
      '2fp': 'تُلَاءَمْنَ',
      '3mp': 'يُلَاءَمُونَ',
      '3fp': 'يُلَاءَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("l'm-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُلَاءَمَ',
      '2ms': 'تُلَاءَمَ',
      '2fs': 'تُلَاءَمِي',
      '3ms': 'يُلَاءَمَ',
      '3fs': 'تُلَاءَمَ',
      '2d': 'تُلَاءَمَا',
      '3md': 'يُلَاءَمَا',
      '3fd': 'تُلَاءَمَا',
      '1p': 'نُلَاءَمَ',
      '2mp': 'تُلَاءَمُوا',
      '2fp': 'تُلَاءَمْنَ',
      '3mp': 'يُلَاءَمُوا',
      '3fp': 'يُلَاءَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("l'm-3")!, 'jussive')).toEqualT({
      '1s': 'أُلَاءَمْ',
      '2ms': 'تُلَاءَمْ',
      '2fs': 'تُلَاءَمِي',
      '3ms': 'يُلَاءَمْ',
      '3fs': 'تُلَاءَمْ',
      '2d': 'تُلَاءَمَا',
      '3md': 'يُلَاءَمَا',
      '3fd': 'تُلَاءَمَا',
      '1p': 'نُلَاءَمْ',
      '2mp': 'تُلَاءَمُوا',
      '2fp': 'تُلَاءَمْنَ',
      '3mp': 'يُلَاءَمُوا',
      '3fp': 'يُلَاءَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("l'm-3")!)).toEqualT('مُلَائِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("l'm-3")!)).toEqualT('مُلَاءَم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("l'm-3")!)).toEqualT(['مُلَاءَمَة'])
  })
})
