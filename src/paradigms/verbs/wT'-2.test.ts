import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wT'-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wT'-2")!)).toEqualT({
      '1s': 'وَطَّأْتُ',
      '2ms': 'وَطَّأْتَ',
      '2fs': 'وَطَّأْتِ',
      '3ms': 'وَطَّأَ',
      '3fs': 'وَطَّأَتْ',
      '2d': 'وَطَّأْتُمَا',
      '3md': 'وَطَّآ',
      '3fd': 'وَطَّأَتَا',
      '1p': 'وَطَّأْنَا',
      '2mp': 'وَطَّأْتُمْ',
      '2fp': 'وَطَّأْتُنَّ',
      '3mp': 'وَطَّؤُوا',
      '3fp': 'وَطَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wT'-2")!, 'indicative')).toEqualT({
      '1s': 'أُوَطِّئُ',
      '2ms': 'تُوَطِّئُ',
      '2fs': 'تُوَطِّئِينَ',
      '3ms': 'يُوَطِّئُ',
      '3fs': 'تُوَطِّئُ',
      '2d': 'تُوَطِّئَانِ',
      '3md': 'يُوَطِّئَانِ',
      '3fd': 'تُوَطِّئَانِ',
      '1p': 'نُوَطِّئُ',
      '2mp': 'تُوَطِّئُونَ',
      '2fp': 'تُوَطِّئْنَ',
      '3mp': 'يُوَطِّئُونَ',
      '3fp': 'يُوَطِّئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَطِّئَ',
      '2ms': 'تُوَطِّئَ',
      '2fs': 'تُوَطِّئِي',
      '3ms': 'يُوَطِّئَ',
      '3fs': 'تُوَطِّئَ',
      '2d': 'تُوَطِّئَا',
      '3md': 'يُوَطِّئَا',
      '3fd': 'تُوَطِّئَا',
      '1p': 'نُوَطِّئَ',
      '2mp': 'تُوَطِّئُوا',
      '2fp': 'تُوَطِّئْنَ',
      '3mp': 'يُوَطِّئُوا',
      '3fp': 'يُوَطِّئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-2")!, 'jussive')).toEqualT({
      '1s': 'أُوَطِّئْ',
      '2ms': 'تُوَطِّئْ',
      '2fs': 'تُوَطِّئِي',
      '3ms': 'يُوَطِّئْ',
      '3fs': 'تُوَطِّئْ',
      '2d': 'تُوَطِّئَا',
      '3md': 'يُوَطِّئَا',
      '3fd': 'تُوَطِّئَا',
      '1p': 'نُوَطِّئْ',
      '2mp': 'تُوَطِّئُوا',
      '2fp': 'تُوَطِّئْنَ',
      '3mp': 'يُوَطِّئُوا',
      '3fp': 'يُوَطِّئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wT'-2")!)).toMatchObjectT({
      '2ms': 'وَطِّئْ',
      '2fs': 'وَطِّئِي',
      '2d': 'وَطِّئَا',
      '2mp': 'وَطِّئُوا',
      '2fp': 'وَطِّئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wT'-2")!)).toEqualT({
      '1s': 'وُطِّئْتُ',
      '2ms': 'وُطِّئْتَ',
      '2fs': 'وُطِّئْتِ',
      '3ms': 'وُطِّئَ',
      '3fs': 'وُطِّئَتْ',
      '2d': 'وُطِّئْتُمَا',
      '3md': 'وُطِّئَا',
      '3fd': 'وُطِّئَتَا',
      '1p': 'وُطِّئْنَا',
      '2mp': 'وُطِّئْتُمْ',
      '2fp': 'وُطِّئْتُنَّ',
      '3mp': 'وُطِّئُوا',
      '3fp': 'وُطِّئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-2")!, 'indicative')).toEqualT({
      '1s': 'أُوَطَّأُ',
      '2ms': 'تُوَطَّأُ',
      '2fs': 'تُوَطَّئِينَ',
      '3ms': 'يُوَطَّأُ',
      '3fs': 'تُوَطَّأُ',
      '2d': 'تُوَطَّآنِ',
      '3md': 'يُوَطَّآنِ',
      '3fd': 'تُوَطَّآنِ',
      '1p': 'نُوَطَّأُ',
      '2mp': 'تُوَطَّؤُونَ',
      '2fp': 'تُوَطَّأْنَ',
      '3mp': 'يُوَطَّؤُونَ',
      '3fp': 'يُوَطَّأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَطَّأَ',
      '2ms': 'تُوَطَّأَ',
      '2fs': 'تُوَطَّئِي',
      '3ms': 'يُوَطَّأَ',
      '3fs': 'تُوَطَّأَ',
      '2d': 'تُوَطَّآ',
      '3md': 'يُوَطَّآ',
      '3fd': 'تُوَطَّآ',
      '1p': 'نُوَطَّأَ',
      '2mp': 'تُوَطَّؤُوا',
      '2fp': 'تُوَطَّأْنَ',
      '3mp': 'يُوَطَّؤُوا',
      '3fp': 'يُوَطَّأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-2")!, 'jussive')).toEqualT({
      '1s': 'أُوَطَّأْ',
      '2ms': 'تُوَطَّأْ',
      '2fs': 'تُوَطَّئِي',
      '3ms': 'يُوَطَّأْ',
      '3fs': 'تُوَطَّأْ',
      '2d': 'تُوَطَّآ',
      '3md': 'يُوَطَّآ',
      '3fd': 'تُوَطَّآ',
      '1p': 'نُوَطَّأْ',
      '2mp': 'تُوَطَّؤُوا',
      '2fp': 'تُوَطَّأْنَ',
      '3mp': 'يُوَطَّؤُوا',
      '3fp': 'يُوَطَّأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wT'-2")!)).toEqualT('مُوَطِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wT'-2")!)).toEqualT('مُوَطَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wT'-2")!))).toEqualT(new Set(['تَوْطِيء', 'تَوْطِئَة']))
  })
})
