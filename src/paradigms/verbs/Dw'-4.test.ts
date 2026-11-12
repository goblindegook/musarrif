import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Dw'-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Dw'-4")!)).toEqualT({
      '1s': 'أَضَأْتُ',
      '2ms': 'أَضَأْتَ',
      '2fs': 'أَضَأْتِ',
      '3ms': 'أَضَاءَ',
      '3fs': 'أَضَاءَتْ',
      '2d': 'أَضَأْتُمَا',
      '3md': 'أَضَاءَا',
      '3fd': 'أَضَاءَتَا',
      '1p': 'أَضَأْنَا',
      '2mp': 'أَضَأْتُمْ',
      '2fp': 'أَضَأْتُنَّ',
      '3mp': expect.toBeOneOf(['أَضَائُوا', 'أَضَاؤُوا']),
      '3fp': 'أَضَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-4")!, 'indicative')).toEqualT({
      '1s': 'أُضِيءُ',
      '2ms': 'تُضِيءُ',
      '2fs': 'تُضِيئِينَ',
      '3ms': 'يُضِيءُ',
      '3fs': 'تُضِيءُ',
      '2d': 'تُضِيئَانِ',
      '3md': 'يُضِيئَانِ',
      '3fd': 'تُضِيئَانِ',
      '1p': 'نُضِيءُ',
      '2mp': expect.toBeOneOf(['تُضِيئُونَ', 'تُضِيؤُونَ']),
      '2fp': 'تُضِئْنَ',
      '3mp': expect.toBeOneOf(['يُضِيئُونَ', 'يُضِيؤُونَ']),
      '3fp': 'يُضِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُضِيءَ',
      '2ms': 'تُضِيءَ',
      '2fs': 'تُضِيئِي',
      '3ms': 'يُضِيءَ',
      '3fs': 'تُضِيءَ',
      '2d': 'تُضِيئَا',
      '3md': 'يُضِيئَا',
      '3fd': 'تُضِيئَا',
      '1p': 'نُضِيءَ',
      '2mp': expect.toBeOneOf(['تُضِيئُوا', 'تُضِيؤُوا']),
      '2fp': 'تُضِئْنَ',
      '3mp': expect.toBeOneOf(['يُضِيئُوا', 'يُضِيؤُوا']),
      '3fp': 'يُضِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-4")!, 'jussive')).toEqualT({
      '1s': 'أُضِئْ',
      '2ms': 'تُضِئْ',
      '2fs': 'تُضِيئِي',
      '3ms': 'يُضِئْ',
      '3fs': 'تُضِئْ',
      '2d': 'تُضِيئَا',
      '3md': 'يُضِيئَا',
      '3fd': 'تُضِيئَا',
      '1p': 'نُضِئْ',
      '2mp': expect.toBeOneOf(['تُضِيئُوا', 'تُضِيؤُوا']),
      '2fp': 'تُضِئْنَ',
      '3mp': expect.toBeOneOf(['يُضِيئُوا', 'يُضِيؤُوا']),
      '3fp': 'يُضِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Dw'-4")!)).toMatchObjectT({
      '2ms': 'أَضِئْ',
      '2fs': 'أَضِيئِي',
      '2d': 'أَضِيئَا',
      '2mp': expect.toBeOneOf(['أَضِيئُوا', 'أَضِيؤُوا']),
      '2fp': 'أَضِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Dw'-4")!)).toEqualT({
      '1s': 'أُضِئْتُ',
      '2ms': 'أُضِئْتَ',
      '2fs': 'أُضِئْتِ',
      '3ms': 'أُضِيءَ',
      '3fs': 'أُضِيئَتْ',
      '2d': 'أُضِئْتُمَا',
      '3md': 'أُضِيئَا',
      '3fd': 'أُضِيئَتَا',
      '1p': 'أُضِئْنَا',
      '2mp': 'أُضِئْتُمْ',
      '2fp': 'أُضِئْتُنَّ',
      '3mp': expect.toBeOneOf(['أُضِيئُوا', 'أُضِيؤُوا']),
      '3fp': 'أُضِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-4")!, 'indicative')).toEqualT({
      '1s': 'أُضَاءُ',
      '2ms': 'تُضَاءُ',
      '2fs': 'تُضَائِينَ',
      '3ms': 'يُضَاءُ',
      '3fs': 'تُضَاءُ',
      '2d': 'تُضَاءَانِ',
      '3md': 'يُضَاءَانِ',
      '3fd': 'تُضَاءَانِ',
      '1p': 'نُضَاءُ',
      '2mp': expect.toBeOneOf(['تُضَائُونَ', 'تُضَاؤُونَ']),
      '2fp': 'تُضَأْنَ',
      '3mp': expect.toBeOneOf(['يُضَائُونَ', 'يُضَاؤُونَ']),
      '3fp': 'يُضَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُضَاءَ',
      '2ms': 'تُضَاءَ',
      '2fs': 'تُضَائِي',
      '3ms': 'يُضَاءَ',
      '3fs': 'تُضَاءَ',
      '2d': 'تُضَاءَا',
      '3md': 'يُضَاءَا',
      '3fd': 'تُضَاءَا',
      '1p': 'نُضَاءَ',
      '2mp': expect.toBeOneOf(['تُضَائُوا', 'تُضَاؤُوا']),
      '2fp': 'تُضَأْنَ',
      '3mp': expect.toBeOneOf(['يُضَائُوا', 'يُضَاؤُوا']),
      '3fp': 'يُضَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-4")!, 'jussive')).toEqualT({
      '1s': 'أُضَأْ',
      '2ms': 'تُضَأْ',
      '2fs': 'تُضَائِي',
      '3ms': 'يُضَأْ',
      '3fs': 'تُضَأْ',
      '2d': 'تُضَاءَا',
      '3md': 'يُضَاءَا',
      '3fd': 'تُضَاءَا',
      '1p': 'نُضَأْ',
      '2mp': expect.toBeOneOf(['تُضَائُوا', 'تُضَاؤُوا']),
      '2fp': 'تُضَأْنَ',
      '3mp': expect.toBeOneOf(['يُضَائُوا', 'يُضَاؤُوا']),
      '3fp': 'يُضَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Dw'-4")!)).toEqualT('مُضِيء')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Dw'-4")!)).toEqualT('مُضَاء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Dw'-4")!))).toEqualT(new Set(['إِضَاءَة']))
  })
})
