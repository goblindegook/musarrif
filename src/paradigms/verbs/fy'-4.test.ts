import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("fy'-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("fy'-4")!)).toEqualT({
      '1s': 'أَفَأْتُ',
      '2ms': 'أَفَأْتَ',
      '2fs': 'أَفَأْتِ',
      '3ms': 'أَفَاءَ',
      '3fs': 'أَفَاءَتْ',
      '2d': 'أَفَأْتُمَا',
      '3md': 'أَفَاءَا',
      '3fd': 'أَفَاءَتَا',
      '1p': 'أَفَأْنَا',
      '2mp': 'أَفَأْتُمْ',
      '2fp': 'أَفَأْتُنَّ',
      '3mp': expect.toBeOneOf(['أَفَائُوا', 'أَفَاؤُوا']),
      '3fp': 'أَفَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("fy'-4")!, 'indicative')).toEqualT({
      '1s': 'أُفِيءُ',
      '2ms': 'تُفِيءُ',
      '2fs': 'تُفِيئِينَ',
      '3ms': 'يُفِيءُ',
      '3fs': 'تُفِيءُ',
      '2d': 'تُفِيئَانِ',
      '3md': 'يُفِيئَانِ',
      '3fd': 'تُفِيئَانِ',
      '1p': 'نُفِيءُ',
      '2mp': expect.toBeOneOf(['تُفِيئُونَ', 'تُفِيؤُونَ']),
      '2fp': 'تُفِئْنَ',
      '3mp': expect.toBeOneOf(['يُفِيئُونَ', 'يُفِيؤُونَ']),
      '3fp': 'يُفِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("fy'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُفِيءَ',
      '2ms': 'تُفِيءَ',
      '2fs': 'تُفِيئِي',
      '3ms': 'يُفِيءَ',
      '3fs': 'تُفِيءَ',
      '2d': 'تُفِيئَا',
      '3md': 'يُفِيئَا',
      '3fd': 'تُفِيئَا',
      '1p': 'نُفِيءَ',
      '2mp': expect.toBeOneOf(['تُفِيئُوا', 'تُفِيؤُوا']),
      '2fp': 'تُفِئْنَ',
      '3mp': expect.toBeOneOf(['يُفِيئُوا', 'يُفِيؤُوا']),
      '3fp': 'يُفِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("fy'-4")!, 'jussive')).toEqualT({
      '1s': 'أُفِئْ',
      '2ms': 'تُفِئْ',
      '2fs': 'تُفِيئِي',
      '3ms': 'يُفِئْ',
      '3fs': 'تُفِئْ',
      '2d': 'تُفِيئَا',
      '3md': 'يُفِيئَا',
      '3fd': 'تُفِيئَا',
      '1p': 'نُفِئْ',
      '2mp': expect.toBeOneOf(['تُفِيئُوا', 'تُفِيؤُوا']),
      '2fp': 'تُفِئْنَ',
      '3mp': expect.toBeOneOf(['يُفِيئُوا', 'يُفِيؤُوا']),
      '3fp': 'يُفِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("fy'-4")!)).toMatchObjectT({
      '2ms': 'أَفِئْ',
      '2fs': 'أَفِيئِي',
      '2d': 'أَفِيئَا',
      '2mp': expect.toBeOneOf(['أَفِيئُوا', 'أَفِيؤُوا']),
      '2fp': 'أَفِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("fy'-4")!)).toEqualT({
      '1s': 'أُفِئْتُ',
      '2ms': 'أُفِئْتَ',
      '2fs': 'أُفِئْتِ',
      '3ms': 'أُفِيءَ',
      '3fs': 'أُفِيئَتْ',
      '2d': 'أُفِئْتُمَا',
      '3md': 'أُفِيئَا',
      '3fd': 'أُفِيئَتَا',
      '1p': 'أُفِئْنَا',
      '2mp': 'أُفِئْتُمْ',
      '2fp': 'أُفِئْتُنَّ',
      '3mp': expect.toBeOneOf(['أُفِيئُوا', 'أُفِيؤُوا']),
      '3fp': 'أُفِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-4")!, 'indicative')).toEqualT({
      '1s': 'أُفَاءُ',
      '2ms': 'تُفَاءُ',
      '2fs': 'تُفَائِينَ',
      '3ms': 'يُفَاءُ',
      '3fs': 'تُفَاءُ',
      '2d': 'تُفَاءَانِ',
      '3md': 'يُفَاءَانِ',
      '3fd': 'تُفَاءَانِ',
      '1p': 'نُفَاءُ',
      '2mp': expect.toBeOneOf(['تُفَائُونَ', 'تُفَاؤُونَ']),
      '2fp': 'تُفَأْنَ',
      '3mp': expect.toBeOneOf(['يُفَائُونَ', 'يُفَاؤُونَ']),
      '3fp': 'يُفَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُفَاءَ',
      '2ms': 'تُفَاءَ',
      '2fs': 'تُفَائِي',
      '3ms': 'يُفَاءَ',
      '3fs': 'تُفَاءَ',
      '2d': 'تُفَاءَا',
      '3md': 'يُفَاءَا',
      '3fd': 'تُفَاءَا',
      '1p': 'نُفَاءَ',
      '2mp': expect.toBeOneOf(['تُفَائُوا', 'تُفَاؤُوا']),
      '2fp': 'تُفَأْنَ',
      '3mp': expect.toBeOneOf(['يُفَائُوا', 'يُفَاؤُوا']),
      '3fp': 'يُفَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-4")!, 'jussive')).toEqualT({
      '1s': 'أُفَأْ',
      '2ms': 'تُفَأْ',
      '2fs': 'تُفَائِي',
      '3ms': 'يُفَأْ',
      '3fs': 'تُفَأْ',
      '2d': 'تُفَاءَا',
      '3md': 'يُفَاءَا',
      '3fd': 'تُفَاءَا',
      '1p': 'نُفَأْ',
      '2mp': expect.toBeOneOf(['تُفَائُوا', 'تُفَاؤُوا']),
      '2fp': 'تُفَأْنَ',
      '3mp': expect.toBeOneOf(['يُفَائُوا', 'يُفَاؤُوا']),
      '3fp': 'يُفَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("fy'-4")!)).toEqualT('مُفِيء')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("fy'-4")!)).toEqualT('مُفَاء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("fy'-4")!))).toEqualT(new Set(['إِفَاءَة']))
  })
})
