import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Dw'-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Dw'-2")!)).toEqualT({
      '1s': 'ضَوَّأْتُ',
      '2ms': 'ضَوَّأْتَ',
      '2fs': 'ضَوَّأْتِ',
      '3ms': 'ضَوَّأَ',
      '3fs': 'ضَوَّأَتْ',
      '2d': 'ضَوَّأْتُمَا',
      '3md': 'ضَوَّآ',
      '3fd': 'ضَوَّأَتَا',
      '1p': 'ضَوَّأْنَا',
      '2mp': 'ضَوَّأْتُمْ',
      '2fp': 'ضَوَّأْتُنَّ',
      '3mp': 'ضَوَّؤُوا',
      '3fp': 'ضَوَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-2")!, 'indicative')).toEqualT({
      '1s': 'أُضَوِّئُ',
      '2ms': 'تُضَوِّئُ',
      '2fs': 'تُضَوِّئِينَ',
      '3ms': 'يُضَوِّئُ',
      '3fs': 'تُضَوِّئُ',
      '2d': 'تُضَوِّئَانِ',
      '3md': 'يُضَوِّئَانِ',
      '3fd': 'تُضَوِّئَانِ',
      '1p': 'نُضَوِّئُ',
      '2mp': 'تُضَوِّئُونَ',
      '2fp': 'تُضَوِّئْنَ',
      '3mp': 'يُضَوِّئُونَ',
      '3fp': 'يُضَوِّئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُضَوِّئَ',
      '2ms': 'تُضَوِّئَ',
      '2fs': 'تُضَوِّئِي',
      '3ms': 'يُضَوِّئَ',
      '3fs': 'تُضَوِّئَ',
      '2d': 'تُضَوِّئَا',
      '3md': 'يُضَوِّئَا',
      '3fd': 'تُضَوِّئَا',
      '1p': 'نُضَوِّئَ',
      '2mp': 'تُضَوِّئُوا',
      '2fp': 'تُضَوِّئْنَ',
      '3mp': 'يُضَوِّئُوا',
      '3fp': 'يُضَوِّئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-2")!, 'jussive')).toEqualT({
      '1s': 'أُضَوِّئْ',
      '2ms': 'تُضَوِّئْ',
      '2fs': 'تُضَوِّئِي',
      '3ms': 'يُضَوِّئْ',
      '3fs': 'تُضَوِّئْ',
      '2d': 'تُضَوِّئَا',
      '3md': 'يُضَوِّئَا',
      '3fd': 'تُضَوِّئَا',
      '1p': 'نُضَوِّئْ',
      '2mp': 'تُضَوِّئُوا',
      '2fp': 'تُضَوِّئْنَ',
      '3mp': 'يُضَوِّئُوا',
      '3fp': 'يُضَوِّئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Dw'-2")!)).toMatchObjectT({
      '2ms': 'ضَوِّئْ',
      '2fs': 'ضَوِّئِي',
      '2d': 'ضَوِّئَا',
      '2mp': 'ضَوِّئُوا',
      '2fp': 'ضَوِّئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Dw'-2")!)).toEqualT({
      '1s': 'ضُوِّئْتُ',
      '2ms': 'ضُوِّئْتَ',
      '2fs': 'ضُوِّئْتِ',
      '3ms': 'ضُوِّئَ',
      '3fs': 'ضُوِّئَتْ',
      '2d': 'ضُوِّئْتُمَا',
      '3md': 'ضُوِّئَا',
      '3fd': 'ضُوِّئَتَا',
      '1p': 'ضُوِّئْنَا',
      '2mp': 'ضُوِّئْتُمْ',
      '2fp': 'ضُوِّئْتُنَّ',
      '3mp': 'ضُوِّئُوا',
      '3fp': 'ضُوِّئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-2")!, 'indicative')).toEqualT({
      '1s': 'أُضَوَّأُ',
      '2ms': 'تُضَوَّأُ',
      '2fs': 'تُضَوَّئِينَ',
      '3ms': 'يُضَوَّأُ',
      '3fs': 'تُضَوَّأُ',
      '2d': 'تُضَوَّآنِ',
      '3md': 'يُضَوَّآنِ',
      '3fd': 'تُضَوَّآنِ',
      '1p': 'نُضَوَّأُ',
      '2mp': 'تُضَوَّؤُونَ',
      '2fp': 'تُضَوَّأْنَ',
      '3mp': 'يُضَوَّؤُونَ',
      '3fp': 'يُضَوَّأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُضَوَّأَ',
      '2ms': 'تُضَوَّأَ',
      '2fs': 'تُضَوَّئِي',
      '3ms': 'يُضَوَّأَ',
      '3fs': 'تُضَوَّأَ',
      '2d': 'تُضَوَّآ',
      '3md': 'يُضَوَّآ',
      '3fd': 'تُضَوَّآ',
      '1p': 'نُضَوَّأَ',
      '2mp': 'تُضَوَّؤُوا',
      '2fp': 'تُضَوَّأْنَ',
      '3mp': 'يُضَوَّؤُوا',
      '3fp': 'يُضَوَّأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-2")!, 'jussive')).toEqualT({
      '1s': 'أُضَوَّأْ',
      '2ms': 'تُضَوَّأْ',
      '2fs': 'تُضَوَّئِي',
      '3ms': 'يُضَوَّأْ',
      '3fs': 'تُضَوَّأْ',
      '2d': 'تُضَوَّآ',
      '3md': 'يُضَوَّآ',
      '3fd': 'تُضَوَّآ',
      '1p': 'نُضَوَّأْ',
      '2mp': 'تُضَوَّؤُوا',
      '2fp': 'تُضَوَّأْنَ',
      '3mp': 'يُضَوَّؤُوا',
      '3fp': 'يُضَوَّأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Dw'-2")!)).toEqualT('مُضَوِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Dw'-2")!)).toEqualT('مُضَوَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Dw'-2")!))).toEqualT(new Set(['تَضْوِيء', 'تَضْوِئَة']))
  })
})
