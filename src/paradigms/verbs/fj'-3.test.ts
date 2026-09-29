import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("fj'-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("fj'-3")!)).toEqualT({
      '1s': 'فَاجَأْتُ',
      '2ms': 'فَاجَأْتَ',
      '2fs': 'فَاجَأْتِ',
      '3ms': 'فَاجَأَ',
      '3fs': 'فَاجَأَتْ',
      '2d': 'فَاجَأْتُمَا',
      '3md': 'فَاجَآ',
      '3fd': 'فَاجَأَتَا',
      '1p': 'فَاجَأْنَا',
      '2mp': 'فَاجَأْتُمْ',
      '2fp': 'فَاجَأْتُنَّ',
      '3mp': 'فَاجَؤُوا',
      '3fp': 'فَاجَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("fj'-3")!, 'indicative')).toEqualT({
      '1s': 'أُفَاجِئُ',
      '2ms': 'تُفَاجِئُ',
      '2fs': 'تُفَاجِئِينَ',
      '3ms': 'يُفَاجِئُ',
      '3fs': 'تُفَاجِئُ',
      '2d': 'تُفَاجِئَانِ',
      '3md': 'يُفَاجِئَانِ',
      '3fd': 'تُفَاجِئَانِ',
      '1p': 'نُفَاجِئُ',
      '2mp': 'تُفَاجِئُونَ',
      '2fp': 'تُفَاجِئْنَ',
      '3mp': 'يُفَاجِئُونَ',
      '3fp': 'يُفَاجِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("fj'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُفَاجِئَ',
      '2ms': 'تُفَاجِئَ',
      '2fs': 'تُفَاجِئِي',
      '3ms': 'يُفَاجِئَ',
      '3fs': 'تُفَاجِئَ',
      '2d': 'تُفَاجِئَا',
      '3md': 'يُفَاجِئَا',
      '3fd': 'تُفَاجِئَا',
      '1p': 'نُفَاجِئَ',
      '2mp': 'تُفَاجِئُوا',
      '2fp': 'تُفَاجِئْنَ',
      '3mp': 'يُفَاجِئُوا',
      '3fp': 'يُفَاجِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("fj'-3")!, 'jussive')).toEqualT({
      '1s': 'أُفَاجِئْ',
      '2ms': 'تُفَاجِئْ',
      '2fs': 'تُفَاجِئِي',
      '3ms': 'يُفَاجِئْ',
      '3fs': 'تُفَاجِئْ',
      '2d': 'تُفَاجِئَا',
      '3md': 'يُفَاجِئَا',
      '3fd': 'تُفَاجِئَا',
      '1p': 'نُفَاجِئْ',
      '2mp': 'تُفَاجِئُوا',
      '2fp': 'تُفَاجِئْنَ',
      '3mp': 'يُفَاجِئُوا',
      '3fp': 'يُفَاجِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("fj'-3")!)).toMatchObjectT({
      '2ms': 'فَاجِئْ',
      '2fs': 'فَاجِئِي',
      '2d': 'فَاجِئَا',
      '2mp': 'فَاجِئُوا',
      '2fp': 'فَاجِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("fj'-3")!)).toEqualT({
      '1s': 'فُوجِئْتُ',
      '2ms': 'فُوجِئْتَ',
      '2fs': 'فُوجِئْتِ',
      '3ms': 'فُوجِئَ',
      '3fs': 'فُوجِئَتْ',
      '2d': 'فُوجِئْتُمَا',
      '3md': 'فُوجِئَا',
      '3fd': 'فُوجِئَتَا',
      '1p': 'فُوجِئْنَا',
      '2mp': 'فُوجِئْتُمْ',
      '2fp': 'فُوجِئْتُنَّ',
      '3mp': 'فُوجِئُوا',
      '3fp': 'فُوجِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("fj'-3")!, 'indicative')).toEqualT({
      '1s': 'أُفَاجَأُ',
      '2ms': 'تُفَاجَأُ',
      '2fs': 'تُفَاجَئِينَ',
      '3ms': 'يُفَاجَأُ',
      '3fs': 'تُفَاجَأُ',
      '2d': 'تُفَاجَآنِ',
      '3md': 'يُفَاجَآنِ',
      '3fd': 'تُفَاجَآنِ',
      '1p': 'نُفَاجَأُ',
      '2mp': 'تُفَاجَؤُونَ',
      '2fp': 'تُفَاجَأْنَ',
      '3mp': 'يُفَاجَؤُونَ',
      '3fp': 'يُفَاجَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fj'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُفَاجَأَ',
      '2ms': 'تُفَاجَأَ',
      '2fs': 'تُفَاجَئِي',
      '3ms': 'يُفَاجَأَ',
      '3fs': 'تُفَاجَأَ',
      '2d': 'تُفَاجَآ',
      '3md': 'يُفَاجَآ',
      '3fd': 'تُفَاجَآ',
      '1p': 'نُفَاجَأَ',
      '2mp': 'تُفَاجَؤُوا',
      '2fp': 'تُفَاجَأْنَ',
      '3mp': 'يُفَاجَؤُوا',
      '3fp': 'يُفَاجَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fj'-3")!, 'jussive')).toEqualT({
      '1s': 'أُفَاجَأْ',
      '2ms': 'تُفَاجَأْ',
      '2fs': 'تُفَاجَئِي',
      '3ms': 'يُفَاجَأْ',
      '3fs': 'تُفَاجَأْ',
      '2d': 'تُفَاجَآ',
      '3md': 'يُفَاجَآ',
      '3fd': 'تُفَاجَآ',
      '1p': 'نُفَاجَأْ',
      '2mp': 'تُفَاجَؤُوا',
      '2fp': 'تُفَاجَأْنَ',
      '3mp': 'يُفَاجَؤُوا',
      '3fp': 'يُفَاجَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("fj'-3")!)).toEqualT('مُفَاجِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("fj'-3")!)).toEqualT('مُفَاجَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("fj'-3")!))).toEqualT(new Set(['مُفَاجَأَة']))
  })
})
