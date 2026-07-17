import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'lm-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'lm-4")!)).toEqualT({
      '1s': 'آلَمْتُ',
      '2ms': 'آلَمْتَ',
      '2fs': 'آلَمْتِ',
      '3ms': 'آلَمَ',
      '3fs': 'آلَمَتْ',
      '2d': 'آلَمْتُمَا',
      '3md': 'آلَمَا',
      '3fd': 'آلَمَتَا',
      '1p': 'آلَمْنَا',
      '2mp': 'آلَمْتُمْ',
      '2fp': 'آلَمْتُنَّ',
      '3mp': 'آلَمُوا',
      '3fp': 'آلَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'lm-4")!, 'indicative')).toEqualT({
      '1s': 'أُولِمُ',
      '2ms': 'تُؤْلِمُ',
      '2fs': 'تُؤْلِمِينَ',
      '3ms': 'يُؤْلِمُ',
      '3fs': 'تُؤْلِمُ',
      '2d': 'تُؤْلِمَانِ',
      '3md': 'يُؤْلِمَانِ',
      '3fd': 'تُؤْلِمَانِ',
      '1p': 'نُؤْلِمُ',
      '2mp': 'تُؤْلِمُونَ',
      '2fp': 'تُؤْلِمْنَ',
      '3mp': 'يُؤْلِمُونَ',
      '3fp': 'يُؤْلِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'lm-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُولِمَ',
      '2ms': 'تُؤْلِمَ',
      '2fs': 'تُؤْلِمِي',
      '3ms': 'يُؤْلِمَ',
      '3fs': 'تُؤْلِمَ',
      '2d': 'تُؤْلِمَا',
      '3md': 'يُؤْلِمَا',
      '3fd': 'تُؤْلِمَا',
      '1p': 'نُؤْلِمَ',
      '2mp': 'تُؤْلِمُوا',
      '2fp': 'تُؤْلِمْنَ',
      '3mp': 'يُؤْلِمُوا',
      '3fp': 'يُؤْلِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'lm-4")!, 'jussive')).toEqualT({
      '1s': 'أُولِمْ',
      '2ms': 'تُؤْلِمْ',
      '2fs': 'تُؤْلِمِي',
      '3ms': 'يُؤْلِمْ',
      '3fs': 'تُؤْلِمْ',
      '2d': 'تُؤْلِمَا',
      '3md': 'يُؤْلِمَا',
      '3fd': 'تُؤْلِمَا',
      '1p': 'نُؤْلِمْ',
      '2mp': 'تُؤْلِمُوا',
      '2fp': 'تُؤْلِمْنَ',
      '3mp': 'يُؤْلِمُوا',
      '3fp': 'يُؤْلِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'lm-4")!)).toMatchObjectT({
      '2ms': 'آلِمْ',
      '2fs': 'آلِمِي',
      '2d': 'آلِمَا',
      '2mp': 'آلِمُوا',
      '2fp': 'آلِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'lm-4")!)).toEqualT({
      '1s': 'أُولِمْتُ',
      '2ms': 'أُولِمْتَ',
      '2fs': 'أُولِمْتِ',
      '3ms': 'أُولِمَ',
      '3fs': 'أُولِمَتْ',
      '2d': 'أُولِمْتُمَا',
      '3md': 'أُولِمَا',
      '3fd': 'أُولِمَتَا',
      '1p': 'أُولِمْنَا',
      '2mp': 'أُولِمْتُمْ',
      '2fp': 'أُولِمْتُنَّ',
      '3mp': 'أُولِمُوا',
      '3fp': 'أُولِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lm-4")!, 'indicative')).toEqualT({
      '1s': 'أُولَمُ',
      '2ms': 'تُؤْلَمُ',
      '2fs': 'تُؤْلَمِينَ',
      '3ms': 'يُؤْلَمُ',
      '3fs': 'تُؤْلَمُ',
      '2d': 'تُؤْلَمَانِ',
      '3md': 'يُؤْلَمَانِ',
      '3fd': 'تُؤْلَمَانِ',
      '1p': 'نُؤْلَمُ',
      '2mp': 'تُؤْلَمُونَ',
      '2fp': 'تُؤْلَمْنَ',
      '3mp': 'يُؤْلَمُونَ',
      '3fp': 'يُؤْلَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lm-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُولَمَ',
      '2ms': 'تُؤْلَمَ',
      '2fs': 'تُؤْلَمِي',
      '3ms': 'يُؤْلَمَ',
      '3fs': 'تُؤْلَمَ',
      '2d': 'تُؤْلَمَا',
      '3md': 'يُؤْلَمَا',
      '3fd': 'تُؤْلَمَا',
      '1p': 'نُؤْلَمَ',
      '2mp': 'تُؤْلَمُوا',
      '2fp': 'تُؤْلَمْنَ',
      '3mp': 'يُؤْلَمُوا',
      '3fp': 'يُؤْلَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lm-4")!, 'jussive')).toEqualT({
      '1s': 'أُولَمْ',
      '2ms': 'تُؤْلَمْ',
      '2fs': 'تُؤْلَمِي',
      '3ms': 'يُؤْلَمْ',
      '3fs': 'تُؤْلَمْ',
      '2d': 'تُؤْلَمَا',
      '3md': 'يُؤْلَمَا',
      '3fd': 'تُؤْلَمَا',
      '1p': 'نُؤْلَمْ',
      '2mp': 'تُؤْلَمُوا',
      '2fp': 'تُؤْلَمْنَ',
      '3mp': 'يُؤْلَمُوا',
      '3fp': 'يُؤْلَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'lm-4")!)).toEqualT('مُؤْلِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'lm-4")!)).toEqualT('مُؤْلَم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'lm-4")!)).toEqualT(['إِيلَام'])
  })
})
