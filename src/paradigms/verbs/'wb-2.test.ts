import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wb-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wb-2")!)).toEqualT({
      '1s': 'أَوَّبْتُ',
      '2ms': 'أَوَّبْتَ',
      '2fs': 'أَوَّبْتِ',
      '3ms': 'أَوَّبَ',
      '3fs': 'أَوَّبَتْ',
      '2d': 'أَوَّبْتُمَا',
      '3md': 'أَوَّبَا',
      '3fd': 'أَوَّبَتَا',
      '1p': 'أَوَّبْنَا',
      '2mp': 'أَوَّبْتُمْ',
      '2fp': 'أَوَّبْتُنَّ',
      '3mp': 'أَوَّبُوا',
      '3fp': 'أَوَّبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wb-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَوِّبُ',
      '2ms': 'تُؤَوِّبُ',
      '2fs': 'تُؤَوِّبِينَ',
      '3ms': 'يُؤَوِّبُ',
      '3fs': 'تُؤَوِّبُ',
      '2d': 'تُؤَوِّبَانِ',
      '3md': 'يُؤَوِّبَانِ',
      '3fd': 'تُؤَوِّبَانِ',
      '1p': 'نُؤَوِّبُ',
      '2mp': 'تُؤَوِّبُونَ',
      '2fp': 'تُؤَوِّبْنَ',
      '3mp': 'يُؤَوِّبُونَ',
      '3fp': 'يُؤَوِّبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wb-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَوِّبَ',
      '2ms': 'تُؤَوِّبَ',
      '2fs': 'تُؤَوِّبِي',
      '3ms': 'يُؤَوِّبَ',
      '3fs': 'تُؤَوِّبَ',
      '2d': 'تُؤَوِّبَا',
      '3md': 'يُؤَوِّبَا',
      '3fd': 'تُؤَوِّبَا',
      '1p': 'نُؤَوِّبَ',
      '2mp': 'تُؤَوِّبُوا',
      '2fp': 'تُؤَوِّبْنَ',
      '3mp': 'يُؤَوِّبُوا',
      '3fp': 'يُؤَوِّبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wb-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَوِّبْ',
      '2ms': 'تُؤَوِّبْ',
      '2fs': 'تُؤَوِّبِي',
      '3ms': 'يُؤَوِّبْ',
      '3fs': 'تُؤَوِّبْ',
      '2d': 'تُؤَوِّبَا',
      '3md': 'يُؤَوِّبَا',
      '3fd': 'تُؤَوِّبَا',
      '1p': 'نُؤَوِّبْ',
      '2mp': 'تُؤَوِّبُوا',
      '2fp': 'تُؤَوِّبْنَ',
      '3mp': 'يُؤَوِّبُوا',
      '3fp': 'يُؤَوِّبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wb-2")!)).toMatchObjectT({
      '2ms': 'أَوِّبْ',
      '2fs': 'أَوِّبِي',
      '2d': 'أَوِّبَا',
      '2mp': 'أَوِّبُوا',
      '2fp': 'أَوِّبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wb-2")!)).toMatchObjectT({
      '3ms': 'أُوِّبَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wb-2")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُؤَوَّبُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wb-2")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُؤَوَّبَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wb-2")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُؤَوَّبْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'wb-2")!)).toEqualT('مُؤَوِّب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wb-2")!)).toEqualT('مُؤَوَّب')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'wb-2")!))).toEqualT(new Set(['تَأْوِيب']))
  })
})
