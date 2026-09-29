import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("nw'-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("nw'-3")!)).toEqualT({
      '1s': 'نَاوَأْتُ',
      '2ms': 'نَاوَأْتَ',
      '2fs': 'نَاوَأْتِ',
      '3ms': 'نَاوَأَ',
      '3fs': 'نَاوَأَتْ',
      '2d': 'نَاوَأْتُمَا',
      '3md': 'نَاوَآ',
      '3fd': 'نَاوَأَتَا',
      '1p': 'نَاوَأْنَا',
      '2mp': 'نَاوَأْتُمْ',
      '2fp': 'نَاوَأْتُنَّ',
      '3mp': 'نَاوَؤُوا',
      '3fp': 'نَاوَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("nw'-3")!, 'indicative')).toEqualT({
      '1s': 'أُنَاوِئُ',
      '2ms': 'تُنَاوِئُ',
      '2fs': 'تُنَاوِئِينَ',
      '3ms': 'يُنَاوِئُ',
      '3fs': 'تُنَاوِئُ',
      '2d': 'تُنَاوِئَانِ',
      '3md': 'يُنَاوِئَانِ',
      '3fd': 'تُنَاوِئَانِ',
      '1p': 'نُنَاوِئُ',
      '2mp': 'تُنَاوِئُونَ',
      '2fp': 'تُنَاوِئْنَ',
      '3mp': 'يُنَاوِئُونَ',
      '3fp': 'يُنَاوِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("nw'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُنَاوِئَ',
      '2ms': 'تُنَاوِئَ',
      '2fs': 'تُنَاوِئِي',
      '3ms': 'يُنَاوِئَ',
      '3fs': 'تُنَاوِئَ',
      '2d': 'تُنَاوِئَا',
      '3md': 'يُنَاوِئَا',
      '3fd': 'تُنَاوِئَا',
      '1p': 'نُنَاوِئَ',
      '2mp': 'تُنَاوِئُوا',
      '2fp': 'تُنَاوِئْنَ',
      '3mp': 'يُنَاوِئُوا',
      '3fp': 'يُنَاوِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("nw'-3")!, 'jussive')).toEqualT({
      '1s': 'أُنَاوِئْ',
      '2ms': 'تُنَاوِئْ',
      '2fs': 'تُنَاوِئِي',
      '3ms': 'يُنَاوِئْ',
      '3fs': 'تُنَاوِئْ',
      '2d': 'تُنَاوِئَا',
      '3md': 'يُنَاوِئَا',
      '3fd': 'تُنَاوِئَا',
      '1p': 'نُنَاوِئْ',
      '2mp': 'تُنَاوِئُوا',
      '2fp': 'تُنَاوِئْنَ',
      '3mp': 'يُنَاوِئُوا',
      '3fp': 'يُنَاوِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("nw'-3")!)).toMatchObjectT({
      '2ms': 'نَاوِئْ',
      '2fs': 'نَاوِئِي',
      '2d': 'نَاوِئَا',
      '2mp': 'نَاوِئُوا',
      '2fp': 'نَاوِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("nw'-3")!)).toEqualT({
      '1s': 'نُووِئْتُ',
      '2ms': 'نُووِئْتَ',
      '2fs': 'نُووِئْتِ',
      '3ms': 'نُووِئَ',
      '3fs': 'نُووِئَتْ',
      '2d': 'نُووِئْتُمَا',
      '3md': 'نُووِئَا',
      '3fd': 'نُووِئَتَا',
      '1p': 'نُووِئْنَا',
      '2mp': 'نُووِئْتُمْ',
      '2fp': 'نُووِئْتُنَّ',
      '3mp': 'نُووِئُوا',
      '3fp': 'نُووِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("nw'-3")!, 'indicative')).toEqualT({
      '1s': 'أُنَاوَأُ',
      '2ms': 'تُنَاوَأُ',
      '2fs': 'تُنَاوَئِينَ',
      '3ms': 'يُنَاوَأُ',
      '3fs': 'تُنَاوَأُ',
      '2d': 'تُنَاوَآنِ',
      '3md': 'يُنَاوَآنِ',
      '3fd': 'تُنَاوَآنِ',
      '1p': 'نُنَاوَأُ',
      '2mp': 'تُنَاوَؤُونَ',
      '2fp': 'تُنَاوَأْنَ',
      '3mp': 'يُنَاوَؤُونَ',
      '3fp': 'يُنَاوَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("nw'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُنَاوَأَ',
      '2ms': 'تُنَاوَأَ',
      '2fs': 'تُنَاوَئِي',
      '3ms': 'يُنَاوَأَ',
      '3fs': 'تُنَاوَأَ',
      '2d': 'تُنَاوَآ',
      '3md': 'يُنَاوَآ',
      '3fd': 'تُنَاوَآ',
      '1p': 'نُنَاوَأَ',
      '2mp': 'تُنَاوَؤُوا',
      '2fp': 'تُنَاوَأْنَ',
      '3mp': 'يُنَاوَؤُوا',
      '3fp': 'يُنَاوَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("nw'-3")!, 'jussive')).toEqualT({
      '1s': 'أُنَاوَأْ',
      '2ms': 'تُنَاوَأْ',
      '2fs': 'تُنَاوَئِي',
      '3ms': 'يُنَاوَأْ',
      '3fs': 'تُنَاوَأْ',
      '2d': 'تُنَاوَآ',
      '3md': 'يُنَاوَآ',
      '3fd': 'تُنَاوَآ',
      '1p': 'نُنَاوَأْ',
      '2mp': 'تُنَاوَؤُوا',
      '2fp': 'تُنَاوَأْنَ',
      '3mp': 'يُنَاوَؤُوا',
      '3fp': 'يُنَاوَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("nw'-3")!)).toEqualT('مُنَاوِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("nw'-3")!)).toEqualT('مُنَاوَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("nw'-3")!))).toEqualT(new Set(['مُنَاوَأَة']))
  })
})
