import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Tm'n-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Tm'n-1")!)).toEqualT({
      '1s': 'طَمْأَنْتُ',
      '2ms': 'طَمْأَنْتَ',
      '2fs': 'طَمْأَنْتِ',
      '3ms': 'طَمْأَنَ',
      '3fs': 'طَمْأَنَتْ',
      '2d': 'طَمْأَنْتُمَا',
      '3md': 'طَمْأَنَا',
      '3fd': 'طَمْأَنَتَا',
      '1p': 'طَمْأَنَّا',
      '2mp': 'طَمْأَنْتُمْ',
      '2fp': 'طَمْأَنْتُنَّ',
      '3mp': 'طَمْأَنُوا',
      '3fp': 'طَمْأَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Tm'n-1")!, 'indicative')).toEqualT({
      '1s': 'أُطَمْئِنُ',
      '2ms': 'تُطَمْئِنُ',
      '2fs': 'تُطَمْئِنِينَ',
      '3ms': 'يُطَمْئِنُ',
      '3fs': 'تُطَمْئِنُ',
      '2d': 'تُطَمْئِنَانِ',
      '3md': 'يُطَمْئِنَانِ',
      '3fd': 'تُطَمْئِنَانِ',
      '1p': 'نُطَمْئِنُ',
      '2mp': 'تُطَمْئِنُونَ',
      '2fp': 'تُطَمْئِنَّ',
      '3mp': 'يُطَمْئِنُونَ',
      '3fp': 'يُطَمْئِنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Tm'n-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُطَمْئِنَ',
      '2ms': 'تُطَمْئِنَ',
      '2fs': 'تُطَمْئِنِي',
      '3ms': 'يُطَمْئِنَ',
      '3fs': 'تُطَمْئِنَ',
      '2d': 'تُطَمْئِنَا',
      '3md': 'يُطَمْئِنَا',
      '3fd': 'تُطَمْئِنَا',
      '1p': 'نُطَمْئِنَ',
      '2mp': 'تُطَمْئِنُوا',
      '2fp': 'تُطَمْئِنَّ',
      '3mp': 'يُطَمْئِنُوا',
      '3fp': 'يُطَمْئِنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Tm'n-1")!, 'jussive')).toEqualT({
      '1s': 'أُطَمْئِنْ',
      '2ms': 'تُطَمْئِنْ',
      '2fs': 'تُطَمْئِنِي',
      '3ms': 'يُطَمْئِنْ',
      '3fs': 'تُطَمْئِنْ',
      '2d': 'تُطَمْئِنَا',
      '3md': 'يُطَمْئِنَا',
      '3fd': 'تُطَمْئِنَا',
      '1p': 'نُطَمْئِنْ',
      '2mp': 'تُطَمْئِنُوا',
      '2fp': 'تُطَمْئِنَّ',
      '3mp': 'يُطَمْئِنُوا',
      '3fp': 'يُطَمْئِنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Tm'n-1")!)).toMatchObjectT({
      '2ms': 'طَمْئِنْ',
      '2fs': 'طَمْئِنِي',
      '2d': 'طَمْئِنَا',
      '2mp': 'طَمْئِنُوا',
      '2fp': 'طَمْئِنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Tm'n-1")!)).toEqualT({
      '1s': 'طُمْئِنْتُ',
      '2ms': 'طُمْئِنْتَ',
      '2fs': 'طُمْئِنْتِ',
      '3ms': 'طُمْئِنَ',
      '3fs': 'طُمْئِنَتْ',
      '2d': 'طُمْئِنْتُمَا',
      '3md': 'طُمْئِنَا',
      '3fd': 'طُمْئِنَتَا',
      '1p': 'طُمْئِنَّا',
      '2mp': 'طُمْئِنْتُمْ',
      '2fp': 'طُمْئِنْتُنَّ',
      '3mp': 'طُمْئِنُوا',
      '3fp': 'طُمْئِنَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tm'n-1")!, 'indicative')).toEqualT({
      '1s': 'أُطَمْأَنُ',
      '2ms': 'تُطَمْأَنُ',
      '2fs': 'تُطَمْأَنِينَ',
      '3ms': 'يُطَمْأَنُ',
      '3fs': 'تُطَمْأَنُ',
      '2d': 'تُطَمْأَنَانِ',
      '3md': 'يُطَمْأَنَانِ',
      '3fd': 'تُطَمْأَنَانِ',
      '1p': 'نُطَمْأَنُ',
      '2mp': 'تُطَمْأَنُونَ',
      '2fp': 'تُطَمْأَنَّ',
      '3mp': 'يُطَمْأَنُونَ',
      '3fp': 'يُطَمْأَنَّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tm'n-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُطَمْأَنَ',
      '2ms': 'تُطَمْأَنَ',
      '2fs': 'تُطَمْأَنِي',
      '3ms': 'يُطَمْأَنَ',
      '3fs': 'تُطَمْأَنَ',
      '2d': 'تُطَمْأَنَا',
      '3md': 'يُطَمْأَنَا',
      '3fd': 'تُطَمْأَنَا',
      '1p': 'نُطَمْأَنَ',
      '2mp': 'تُطَمْأَنُوا',
      '2fp': 'تُطَمْأَنَّ',
      '3mp': 'يُطَمْأَنُوا',
      '3fp': 'يُطَمْأَنَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tm'n-1")!, 'jussive')).toEqualT({
      '1s': 'أُطَمْأَنْ',
      '2ms': 'تُطَمْأَنْ',
      '2fs': 'تُطَمْأَنِي',
      '3ms': 'يُطَمْأَنْ',
      '3fs': 'تُطَمْأَنْ',
      '2d': 'تُطَمْأَنَا',
      '3md': 'يُطَمْأَنَا',
      '3fd': 'تُطَمْأَنَا',
      '1p': 'نُطَمْأَنْ',
      '2mp': 'تُطَمْأَنُوا',
      '2fp': 'تُطَمْأَنَّ',
      '3mp': 'يُطَمْأَنُوا',
      '3fp': 'يُطَمْأَنَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Tm'n-1")!)).toEqualT('مُطَمْئِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Tm'n-1")!)).toEqualT('مُطَمْأَن')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Tm'n-1")!))).toEqualT(new Set(['طَمْأَنَة']))
  })
})
