import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wT'-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wT'-3")!)).toEqualT({
      '1s': 'وَاطَأْتُ',
      '2ms': 'وَاطَأْتَ',
      '2fs': 'وَاطَأْتِ',
      '3ms': 'وَاطَأَ',
      '3fs': 'وَاطَأَتْ',
      '2d': 'وَاطَأْتُمَا',
      '3md': 'وَاطَآ',
      '3fd': 'وَاطَأَتَا',
      '1p': 'وَاطَأْنَا',
      '2mp': 'وَاطَأْتُمْ',
      '2fp': 'وَاطَأْتُنَّ',
      '3mp': 'وَاطَؤُوا',
      '3fp': 'وَاطَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wT'-3")!, 'indicative')).toEqualT({
      '1s': 'أُوَاطِئُ',
      '2ms': 'تُوَاطِئُ',
      '2fs': 'تُوَاطِئِينَ',
      '3ms': 'يُوَاطِئُ',
      '3fs': 'تُوَاطِئُ',
      '2d': 'تُوَاطِئَانِ',
      '3md': 'يُوَاطِئَانِ',
      '3fd': 'تُوَاطِئَانِ',
      '1p': 'نُوَاطِئُ',
      '2mp': 'تُوَاطِئُونَ',
      '2fp': 'تُوَاطِئْنَ',
      '3mp': 'يُوَاطِئُونَ',
      '3fp': 'يُوَاطِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَاطِئَ',
      '2ms': 'تُوَاطِئَ',
      '2fs': 'تُوَاطِئِي',
      '3ms': 'يُوَاطِئَ',
      '3fs': 'تُوَاطِئَ',
      '2d': 'تُوَاطِئَا',
      '3md': 'يُوَاطِئَا',
      '3fd': 'تُوَاطِئَا',
      '1p': 'نُوَاطِئَ',
      '2mp': 'تُوَاطِئُوا',
      '2fp': 'تُوَاطِئْنَ',
      '3mp': 'يُوَاطِئُوا',
      '3fp': 'يُوَاطِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-3")!, 'jussive')).toEqualT({
      '1s': 'أُوَاطِئْ',
      '2ms': 'تُوَاطِئْ',
      '2fs': 'تُوَاطِئِي',
      '3ms': 'يُوَاطِئْ',
      '3fs': 'تُوَاطِئْ',
      '2d': 'تُوَاطِئَا',
      '3md': 'يُوَاطِئَا',
      '3fd': 'تُوَاطِئَا',
      '1p': 'نُوَاطِئْ',
      '2mp': 'تُوَاطِئُوا',
      '2fp': 'تُوَاطِئْنَ',
      '3mp': 'يُوَاطِئُوا',
      '3fp': 'يُوَاطِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wT'-3")!)).toMatchObjectT({
      '2ms': 'وَاطِئْ',
      '2fs': 'وَاطِئِي',
      '2d': 'وَاطِئَا',
      '2mp': 'وَاطِئُوا',
      '2fp': 'وَاطِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wT'-3")!)).toEqualT({
      '1s': 'وُوطِئْتُ',
      '2ms': 'وُوطِئْتَ',
      '2fs': 'وُوطِئْتِ',
      '3ms': 'وُوطِئَ',
      '3fs': 'وُوطِئَتْ',
      '2d': 'وُوطِئْتُمَا',
      '3md': 'وُوطِئَا',
      '3fd': 'وُوطِئَتَا',
      '1p': 'وُوطِئْنَا',
      '2mp': 'وُوطِئْتُمْ',
      '2fp': 'وُوطِئْتُنَّ',
      '3mp': 'وُوطِئُوا',
      '3fp': 'وُوطِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-3")!, 'indicative')).toEqualT({
      '1s': 'أُوَاطَأُ',
      '2ms': 'تُوَاطَأُ',
      '2fs': 'تُوَاطَئِينَ',
      '3ms': 'يُوَاطَأُ',
      '3fs': 'تُوَاطَأُ',
      '2d': 'تُوَاطَآنِ',
      '3md': 'يُوَاطَآنِ',
      '3fd': 'تُوَاطَآنِ',
      '1p': 'نُوَاطَأُ',
      '2mp': 'تُوَاطَؤُونَ',
      '2fp': 'تُوَاطَأْنَ',
      '3mp': 'يُوَاطَؤُونَ',
      '3fp': 'يُوَاطَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُوَاطَأَ',
      '2ms': 'تُوَاطَأَ',
      '2fs': 'تُوَاطَئِي',
      '3ms': 'يُوَاطَأَ',
      '3fs': 'تُوَاطَأَ',
      '2d': 'تُوَاطَآ',
      '3md': 'يُوَاطَآ',
      '3fd': 'تُوَاطَآ',
      '1p': 'نُوَاطَأَ',
      '2mp': 'تُوَاطَؤُوا',
      '2fp': 'تُوَاطَأْنَ',
      '3mp': 'يُوَاطَؤُوا',
      '3fp': 'يُوَاطَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-3")!, 'jussive')).toEqualT({
      '1s': 'أُوَاطَأْ',
      '2ms': 'تُوَاطَأْ',
      '2fs': 'تُوَاطَئِي',
      '3ms': 'يُوَاطَأْ',
      '3fs': 'تُوَاطَأْ',
      '2d': 'تُوَاطَآ',
      '3md': 'يُوَاطَآ',
      '3fd': 'تُوَاطَآ',
      '1p': 'نُوَاطَأْ',
      '2mp': 'تُوَاطَؤُوا',
      '2fp': 'تُوَاطَأْنَ',
      '3mp': 'يُوَاطَؤُوا',
      '3fp': 'يُوَاطَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wT'-3")!)).toEqualT('مُوَاطِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wT'-3")!)).toEqualT('مُوَاطَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wT'-3")!))).toEqualT(new Set(['مُوَاطَأَة', 'وِطَاء']))
  })
})
