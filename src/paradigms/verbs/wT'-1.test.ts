import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wT'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wT'-1")!)).toEqualT({
      '1s': 'وَطِئْتُ',
      '2ms': 'وَطِئْتَ',
      '2fs': 'وَطِئْتِ',
      '3ms': 'وَطِئَ',
      '3fs': 'وَطِئَتْ',
      '2d': 'وَطِئْتُمَا',
      '3md': 'وَطِئَا',
      '3fd': 'وَطِئَتَا',
      '1p': 'وَطِئْنَا',
      '2mp': 'وَطِئْتُمْ',
      '2fp': 'وَطِئْتُنَّ',
      '3mp': 'وَطِئُوا',
      '3fp': 'وَطِئْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wT'-1")!, 'indicative')).toEqualT({
      '1s': 'أَطَأُ',
      '2ms': 'تَطَأُ',
      '2fs': 'تَطَئِينَ',
      '3ms': 'يَطَأُ',
      '3fs': 'تَطَأُ',
      '2d': 'تَطَآنِ',
      '3md': 'يَطَآنِ',
      '3fd': 'تَطَآنِ',
      '1p': 'نَطَأُ',
      '2mp': 'تَطَؤُونَ',
      '2fp': 'تَطَأْنَ',
      '3mp': 'يَطَؤُونَ',
      '3fp': 'يَطَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَطَأَ',
      '2ms': 'تَطَأَ',
      '2fs': 'تَطَئِي',
      '3ms': 'يَطَأَ',
      '3fs': 'تَطَأَ',
      '2d': 'تَطَآ',
      '3md': 'يَطَآ',
      '3fd': 'تَطَآ',
      '1p': 'نَطَأَ',
      '2mp': 'تَطَؤُوا',
      '2fp': 'تَطَأْنَ',
      '3mp': 'يَطَؤُوا',
      '3fp': 'يَطَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wT'-1")!, 'jussive')).toEqualT({
      '1s': 'أَطَأْ',
      '2ms': 'تَطَأْ',
      '2fs': 'تَطَئِي',
      '3ms': 'يَطَأْ',
      '3fs': 'تَطَأْ',
      '2d': 'تَطَآ',
      '3md': 'يَطَآ',
      '3fd': 'تَطَآ',
      '1p': 'نَطَأْ',
      '2mp': 'تَطَؤُوا',
      '2fp': 'تَطَأْنَ',
      '3mp': 'يَطَؤُوا',
      '3fp': 'يَطَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wT'-1")!)).toMatchObjectT({
      '2ms': 'طَأْ',
      '2fs': 'طَئِي',
      '2d': 'طَآ',
      '2mp': 'طَؤُوا',
      '2fp': 'طَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wT'-1")!)).toEqualT({
      '1s': 'وُطِئْتُ',
      '2ms': 'وُطِئْتَ',
      '2fs': 'وُطِئْتِ',
      '3ms': 'وُطِئَ',
      '3fs': 'وُطِئَتْ',
      '2d': 'وُطِئْتُمَا',
      '3md': 'وُطِئَا',
      '3fd': 'وُطِئَتَا',
      '1p': 'وُطِئْنَا',
      '2mp': 'وُطِئْتُمْ',
      '2fp': 'وُطِئْتُنَّ',
      '3mp': 'وُطِئُوا',
      '3fp': 'وُطِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-1")!, 'indicative')).toEqualT({
      '1s': 'أُوطَأُ',
      '2ms': 'تُوطَأُ',
      '2fs': 'تُوطَئِينَ',
      '3ms': 'يُوطَأُ',
      '3fs': 'تُوطَأُ',
      '2d': 'تُوطَآنِ',
      '3md': 'يُوطَآنِ',
      '3fd': 'تُوطَآنِ',
      '1p': 'نُوطَأُ',
      '2mp': 'تُوطَؤُونَ',
      '2fp': 'تُوطَأْنَ',
      '3mp': 'يُوطَؤُونَ',
      '3fp': 'يُوطَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوطَأَ',
      '2ms': 'تُوطَأَ',
      '2fs': 'تُوطَئِي',
      '3ms': 'يُوطَأَ',
      '3fs': 'تُوطَأَ',
      '2d': 'تُوطَآ',
      '3md': 'يُوطَآ',
      '3fd': 'تُوطَآ',
      '1p': 'نُوطَأَ',
      '2mp': 'تُوطَؤُوا',
      '2fp': 'تُوطَأْنَ',
      '3mp': 'يُوطَؤُوا',
      '3fp': 'يُوطَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wT'-1")!, 'jussive')).toEqualT({
      '1s': 'أُوطَأْ',
      '2ms': 'تُوطَأْ',
      '2fs': 'تُوطَئِي',
      '3ms': 'يُوطَأْ',
      '3fs': 'تُوطَأْ',
      '2d': 'تُوطَآ',
      '3md': 'يُوطَآ',
      '3fd': 'تُوطَآ',
      '1p': 'نُوطَأْ',
      '2mp': 'تُوطَؤُوا',
      '2fp': 'تُوطَأْنَ',
      '3mp': 'يُوطَؤُوا',
      '3fp': 'يُوطَأْنَ',
    })
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wT'-1")!)).toEqualT('مَوْطُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wT'-1")!))).toEqualT(new Set(['وَطْء', 'طِئَة']))
  })
})
