import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("T'T'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("T'T'-1")!)).toEqualT({
      '1s': 'طَأْطَأْتُ',
      '2ms': 'طَأْطَأْتَ',
      '2fs': 'طَأْطَأْتِ',
      '3ms': 'طَأْطَأَ',
      '3fs': 'طَأْطَأَتْ',
      '2d': 'طَأْطَأْتُمَا',
      '3md': 'طَأْطَآ',
      '3fd': 'طَأْطَأَتَا',
      '1p': 'طَأْطَأْنَا',
      '2mp': 'طَأْطَأْتُمْ',
      '2fp': 'طَأْطَأْتُنَّ',
      '3mp': 'طَأْطَؤُوا',
      '3fp': 'طَأْطَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("T'T'-1")!, 'indicative')).toEqualT({
      '1s': 'أُطَأْطِئُ',
      '2ms': 'تُطَأْطِئُ',
      '2fs': 'تُطَأْطِئِينَ',
      '3ms': 'يُطَأْطِئُ',
      '3fs': 'تُطَأْطِئُ',
      '2d': 'تُطَأْطِئَانِ',
      '3md': 'يُطَأْطِئَانِ',
      '3fd': 'تُطَأْطِئَانِ',
      '1p': 'نُطَأْطِئُ',
      '2mp': 'تُطَأْطِئُونَ',
      '2fp': 'تُطَأْطِئْنَ',
      '3mp': 'يُطَأْطِئُونَ',
      '3fp': 'يُطَأْطِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("T'T'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُطَأْطِئَ',
      '2ms': 'تُطَأْطِئَ',
      '2fs': 'تُطَأْطِئِي',
      '3ms': 'يُطَأْطِئَ',
      '3fs': 'تُطَأْطِئَ',
      '2d': 'تُطَأْطِئَا',
      '3md': 'يُطَأْطِئَا',
      '3fd': 'تُطَأْطِئَا',
      '1p': 'نُطَأْطِئَ',
      '2mp': 'تُطَأْطِئُوا',
      '2fp': 'تُطَأْطِئْنَ',
      '3mp': 'يُطَأْطِئُوا',
      '3fp': 'يُطَأْطِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("T'T'-1")!, 'jussive')).toEqualT({
      '1s': 'أُطَأْطِئْ',
      '2ms': 'تُطَأْطِئْ',
      '2fs': 'تُطَأْطِئِي',
      '3ms': 'يُطَأْطِئْ',
      '3fs': 'تُطَأْطِئْ',
      '2d': 'تُطَأْطِئَا',
      '3md': 'يُطَأْطِئَا',
      '3fd': 'تُطَأْطِئَا',
      '1p': 'نُطَأْطِئْ',
      '2mp': 'تُطَأْطِئُوا',
      '2fp': 'تُطَأْطِئْنَ',
      '3mp': 'يُطَأْطِئُوا',
      '3fp': 'يُطَأْطِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("T'T'-1")!)).toMatchObjectT({
      '2ms': 'طَأْطِئْ',
      '2fs': 'طَأْطِئِي',
      '2d': 'طَأْطِئَا',
      '2mp': 'طَأْطِئُوا',
      '2fp': 'طَأْطِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("T'T'-1")!)).toEqualT({
      '1s': 'طُؤْطِئْتُ',
      '2ms': 'طُؤْطِئْتَ',
      '2fs': 'طُؤْطِئْتِ',
      '3ms': 'طُؤْطِئَ',
      '3fs': 'طُؤْطِئَتْ',
      '2d': 'طُؤْطِئْتُمَا',
      '3md': 'طُؤْطِئَا',
      '3fd': 'طُؤْطِئَتَا',
      '1p': 'طُؤْطِئْنَا',
      '2mp': 'طُؤْطِئْتُمْ',
      '2fp': 'طُؤْطِئْتُنَّ',
      '3mp': 'طُؤْطِئُوا',
      '3fp': 'طُؤْطِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'T'-1")!, 'indicative')).toEqualT({
      '1s': 'أُطَأْطَأُ',
      '2ms': 'تُطَأْطَأُ',
      '2fs': 'تُطَأْطَئِينَ',
      '3ms': 'يُطَأْطَأُ',
      '3fs': 'تُطَأْطَأُ',
      '2d': 'تُطَأْطَآنِ',
      '3md': 'يُطَأْطَآنِ',
      '3fd': 'تُطَأْطَآنِ',
      '1p': 'نُطَأْطَأُ',
      '2mp': 'تُطَأْطَؤُونَ',
      '2fp': 'تُطَأْطَأْنَ',
      '3mp': 'يُطَأْطَؤُونَ',
      '3fp': 'يُطَأْطَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'T'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُطَأْطَأَ',
      '2ms': 'تُطَأْطَأَ',
      '2fs': 'تُطَأْطَئِي',
      '3ms': 'يُطَأْطَأَ',
      '3fs': 'تُطَأْطَأَ',
      '2d': 'تُطَأْطَآ',
      '3md': 'يُطَأْطَآ',
      '3fd': 'تُطَأْطَآ',
      '1p': 'نُطَأْطَأَ',
      '2mp': 'تُطَأْطَؤُوا',
      '2fp': 'تُطَأْطَأْنَ',
      '3mp': 'يُطَأْطَؤُوا',
      '3fp': 'يُطَأْطَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("T'T'-1")!, 'jussive')).toEqualT({
      '1s': 'أُطَأْطَأْ',
      '2ms': 'تُطَأْطَأْ',
      '2fs': 'تُطَأْطَئِي',
      '3ms': 'يُطَأْطَأْ',
      '3fs': 'تُطَأْطَأْ',
      '2d': 'تُطَأْطَآ',
      '3md': 'يُطَأْطَآ',
      '3fd': 'تُطَأْطَآ',
      '1p': 'نُطَأْطَأْ',
      '2mp': 'تُطَأْطَؤُوا',
      '2fp': 'تُطَأْطَأْنَ',
      '3mp': 'يُطَأْطَؤُوا',
      '3fp': 'يُطَأْطَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("T'T'-1")!)).toEqualT('مُطَأْطِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("T'T'-1")!)).toEqualT('مُطَأْطَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("T'T'-1")!))).toEqualT(new Set(['طَأْطَأَة']))
  })
})
