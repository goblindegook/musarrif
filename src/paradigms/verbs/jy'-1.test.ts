import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("jy'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("jy'-1")!)).toEqualT({
      '1s': 'جِئْتُ',
      '2ms': 'جِئْتَ',
      '2fs': 'جِئْتِ',
      '3ms': 'جَاءَ',
      '3fs': 'جَاءَتْ',
      '2d': 'جِئْتُمَا',
      '3md': 'جَاءَا',
      '3fd': 'جَاءَتَا',
      '1p': 'جِئْنَا',
      '2mp': 'جِئْتُمْ',
      '2fp': 'جِئْتُنَّ',
      '3mp': expect.toBeOneOf(['جَائُوا', 'جَاؤُوا']),
      '3fp': 'جِئْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("jy'-1")!, 'indicative')).toEqualT({
      '1s': 'أَجِيءُ',
      '2ms': 'تَجِيءُ',
      '2fs': 'تَجِيئِينَ',
      '3ms': 'يَجِيءُ',
      '3fs': 'تَجِيءُ',
      '2d': 'تَجِيئَانِ',
      '3md': 'يَجِيئَانِ',
      '3fd': 'تَجِيئَانِ',
      '1p': 'نَجِيءُ',
      '2mp': expect.toBeOneOf(['تَجِيئُونَ', 'تَجِيؤُونَ']),
      '2fp': 'تَجِئْنَ',
      '3mp': expect.toBeOneOf(['يَجِيئُونَ', 'يَجِيؤُونَ']),
      '3fp': 'يَجِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("jy'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَجِيءَ',
      '2ms': 'تَجِيءَ',
      '2fs': 'تَجِيئِي',
      '3ms': 'يَجِيءَ',
      '3fs': 'تَجِيءَ',
      '2d': 'تَجِيئَا',
      '3md': 'يَجِيئَا',
      '3fd': 'تَجِيئَا',
      '1p': 'نَجِيءَ',
      '2mp': expect.toBeOneOf(['تَجِيئُوا', 'تَجِيؤُوا']),
      '2fp': 'تَجِئْنَ',
      '3mp': expect.toBeOneOf(['يَجِيئُوا', 'يَجِيؤُوا']),
      '3fp': 'يَجِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("jy'-1")!, 'jussive')).toEqualT({
      '1s': 'أَجِئْ',
      '2ms': 'تَجِئْ',
      '2fs': 'تَجِيئِي',
      '3ms': 'يَجِئْ',
      '3fs': 'تَجِئْ',
      '2d': 'تَجِيئَا',
      '3md': 'يَجِيئَا',
      '3fd': 'تَجِيئَا',
      '1p': 'نَجِئْ',
      '2mp': expect.toBeOneOf(['تَجِيئُوا', 'تَجِيؤُوا']),
      '2fp': 'تَجِئْنَ',
      '3mp': expect.toBeOneOf(['يَجِيئُوا', 'يَجِيؤُوا']),
      '3fp': 'يَجِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("jy'-1")!)).toMatchObjectT({
      '2ms': 'جِئْ',
      '2fs': 'جِيئِي',
      '2d': 'جِيئَا',
      '2mp': expect.toBeOneOf(['جِيئُوا', 'جِيؤُوا']),
      '2fp': 'جِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("jy'-1")!)).toEqualT({
      '1s': 'جِئْتُ',
      '2ms': 'جِئْتَ',
      '2fs': 'جِئْتِ',
      '3ms': 'جِيءَ',
      '3fs': 'جِيئَتْ',
      '2d': 'جِئْتُمَا',
      '3md': 'جِيئَا',
      '3fd': 'جِيئَتَا',
      '1p': 'جِئْنَا',
      '2mp': 'جِئْتُمْ',
      '2fp': 'جِئْتُنَّ',
      '3mp': expect.toBeOneOf(['جِيئُوا', 'جِيؤُوا']),
      '3fp': 'جِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("jy'-1")!, 'indicative')).toEqualT({
      '1s': 'أُجَاءُ',
      '2ms': 'تُجَاءُ',
      '2fs': 'تُجَائِينَ',
      '3ms': 'يُجَاءُ',
      '3fs': 'تُجَاءُ',
      '2d': 'تُجَاءَانِ',
      '3md': 'يُجَاءَانِ',
      '3fd': 'تُجَاءَانِ',
      '1p': 'نُجَاءُ',
      '2mp': expect.toBeOneOf(['تُجَائُونَ', 'تُجَاؤُونَ']),
      '2fp': 'تُجَأْنَ',
      '3mp': expect.toBeOneOf(['يُجَائُونَ', 'يُجَاؤُونَ']),
      '3fp': 'يُجَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("jy'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُجَاءَ',
      '2ms': 'تُجَاءَ',
      '2fs': 'تُجَائِي',
      '3ms': 'يُجَاءَ',
      '3fs': 'تُجَاءَ',
      '2d': 'تُجَاءَا',
      '3md': 'يُجَاءَا',
      '3fd': 'تُجَاءَا',
      '1p': 'نُجَاءَ',
      '2mp': expect.toBeOneOf(['تُجَائُوا', 'تُجَاؤُوا']),
      '2fp': 'تُجَأْنَ',
      '3mp': expect.toBeOneOf(['يُجَائُوا', 'يُجَاؤُوا']),
      '3fp': 'يُجَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("jy'-1")!, 'jussive')).toEqualT({
      '1s': 'أُجَأْ',
      '2ms': 'تُجَأْ',
      '2fs': 'تُجَائِي',
      '3ms': 'يُجَأْ',
      '3fs': 'تُجَأْ',
      '2d': 'تُجَاءَا',
      '3md': 'يُجَاءَا',
      '3fd': 'تُجَاءَا',
      '1p': 'نُجَأْ',
      '2mp': expect.toBeOneOf(['تُجَائُوا', 'تُجَاؤُوا']),
      '2fp': 'تُجَأْنَ',
      '3mp': expect.toBeOneOf(['يُجَائُوا', 'يُجَاؤُوا']),
      '3fp': 'يُجَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("jy'-1")!)).toEqualT('جَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("jy'-1")!)).toEqualT('مَجِيء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("jy'-1")!))).toEqualT(new Set(['مَجِيء', 'جَيْء', 'جَيْئَة', 'جِيئَة']))
  })
})
