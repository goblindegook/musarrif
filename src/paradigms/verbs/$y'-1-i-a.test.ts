import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("$y'-1-i-a (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("$y'-1-i-a")!)).toEqualT({
      '1s': 'شِئْتُ',
      '2ms': 'شِئْتَ',
      '2fs': 'شِئْتِ',
      '3ms': 'شَاءَ',
      '3fs': 'شَاءَتْ',
      '2d': 'شِئْتُمَا',
      '3md': 'شَاءَا',
      '3fd': 'شَاءَتَا',
      '1p': 'شِئْنَا',
      '2mp': 'شِئْتُمْ',
      '2fp': 'شِئْتُنَّ',
      '3mp': expect.toBeOneOf(['شَائُوا', 'شَاؤُوا']),
      '3fp': 'شِئْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("$y'-1-i-a")!, 'indicative')).toEqualT({
      '1s': 'أَشَاءُ',
      '2ms': 'تَشَاءُ',
      '2fs': 'تَشَائِينَ',
      '3ms': 'يَشَاءُ',
      '3fs': 'تَشَاءُ',
      '2d': 'تَشَاءَانِ',
      '3md': 'يَشَاءَانِ',
      '3fd': 'تَشَاءَانِ',
      '1p': 'نَشَاءُ',
      '2mp': expect.toBeOneOf(['تَشَائُونَ', 'تَشَاؤُونَ']),
      '2fp': 'تَشَأْنَ',
      '3mp': expect.toBeOneOf(['يَشَائُونَ', 'يَشَاؤُونَ']),
      '3fp': 'يَشَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("$y'-1-i-a")!, 'subjunctive')).toEqualT({
      '1s': 'أَشَاءَ',
      '2ms': 'تَشَاءَ',
      '2fs': 'تَشَائِي',
      '3ms': 'يَشَاءَ',
      '3fs': 'تَشَاءَ',
      '2d': 'تَشَاءَا',
      '3md': 'يَشَاءَا',
      '3fd': 'تَشَاءَا',
      '1p': 'نَشَاءَ',
      '2mp': expect.toBeOneOf(['تَشَائُوا', 'تَشَاؤُوا']),
      '2fp': 'تَشَأْنَ',
      '3mp': expect.toBeOneOf(['يَشَائُوا', 'يَشَاؤُوا']),
      '3fp': 'يَشَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("$y'-1-i-a")!, 'jussive')).toEqualT({
      '1s': 'أَشَأْ',
      '2ms': 'تَشَأْ',
      '2fs': 'تَشَائِي',
      '3ms': 'يَشَأْ',
      '3fs': 'تَشَأْ',
      '2d': 'تَشَاءَا',
      '3md': 'يَشَاءَا',
      '3fd': 'تَشَاءَا',
      '1p': 'نَشَأْ',
      '2mp': expect.toBeOneOf(['تَشَائُوا', 'تَشَاؤُوا']),
      '2fp': 'تَشَأْنَ',
      '3mp': expect.toBeOneOf(['يَشَائُوا', 'يَشَاؤُوا']),
      '3fp': 'يَشَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("$y'-1-i-a")!)).toMatchObjectT({
      '2ms': 'شَأْ',
      '2fs': 'شَائِي',
      '2d': 'شَاءَا',
      '2mp': expect.toBeOneOf(['شَائُوا', 'شَاؤُوا']),
      '2fp': 'شَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("$y'-1-i-a")!)).toEqualT({
      '1s': 'شِئْتُ',
      '2ms': 'شِئْتَ',
      '2fs': 'شِئْتِ',
      '3ms': 'شِيءَ',
      '3fs': 'شِيئَتْ',
      '2d': 'شِئْتُمَا',
      '3md': 'شِيئَا',
      '3fd': 'شِيئَتَا',
      '1p': 'شِئْنَا',
      '2mp': 'شِئْتُمْ',
      '2fp': 'شِئْتُنَّ',
      '3mp': expect.toBeOneOf(['شِيئُوا', 'شِيؤُوا']),
      '3fp': 'شِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-1-i-a")!, 'indicative')).toEqualT({
      '1s': 'أُشَاءُ',
      '2ms': 'تُشَاءُ',
      '2fs': 'تُشَائِينَ',
      '3ms': 'يُشَاءُ',
      '3fs': 'تُشَاءُ',
      '2d': 'تُشَاءَانِ',
      '3md': 'يُشَاءَانِ',
      '3fd': 'تُشَاءَانِ',
      '1p': 'نُشَاءُ',
      '2mp': expect.toBeOneOf(['تُشَائُونَ', 'تُشَاؤُونَ']),
      '2fp': 'تُشَأْنَ',
      '3mp': expect.toBeOneOf(['يُشَائُونَ', 'يُشَاؤُونَ']),
      '3fp': 'يُشَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-1-i-a")!, 'subjunctive')).toEqualT({
      '1s': 'أُشَاءَ',
      '2ms': 'تُشَاءَ',
      '2fs': 'تُشَائِي',
      '3ms': 'يُشَاءَ',
      '3fs': 'تُشَاءَ',
      '2d': 'تُشَاءَا',
      '3md': 'يُشَاءَا',
      '3fd': 'تُشَاءَا',
      '1p': 'نُشَاءَ',
      '2mp': expect.toBeOneOf(['تُشَائُوا', 'تُشَاؤُوا']),
      '2fp': 'تُشَأْنَ',
      '3mp': expect.toBeOneOf(['يُشَائُوا', 'يُشَاؤُوا']),
      '3fp': 'يُشَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-1-i-a")!, 'jussive')).toEqualT({
      '1s': 'أُشَأْ',
      '2ms': 'تُشَأْ',
      '2fs': 'تُشَائِي',
      '3ms': 'يُشَأْ',
      '3fs': 'تُشَأْ',
      '2d': 'تُشَاءَا',
      '3md': 'يُشَاءَا',
      '3fd': 'تُشَاءَا',
      '1p': 'نُشَأْ',
      '2mp': expect.toBeOneOf(['تُشَائُوا', 'تُشَاؤُوا']),
      '2fp': 'تُشَأْنَ',
      '3mp': expect.toBeOneOf(['يُشَائُوا', 'يُشَاؤُوا']),
      '3fp': 'يُشَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("$y'-1-i-a")!)).toEqualT('شَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("$y'-1-i-a")!)).toEqualT('مَشِيء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("$y'-1-i-a")!))).toEqualT(new Set(['مَشِيئَة']))
  })
})
