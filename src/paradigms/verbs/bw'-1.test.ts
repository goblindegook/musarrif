import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("bw'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("bw'-1")!)).toEqualT({
      '1s': 'بُؤْتُ',
      '2ms': 'بُؤْتَ',
      '2fs': 'بُؤْتِ',
      '3ms': 'بَاءَ',
      '3fs': 'بَاءَتْ',
      '2d': 'بُؤْتُمَا',
      '3md': 'بَاءَا',
      '3fd': 'بَاءَتَا',
      '1p': 'بُؤْنَا',
      '2mp': 'بُؤْتُمْ',
      '2fp': 'بُؤْتُنَّ',
      '3mp': expect.toBeOneOf(['بَائُوا', 'بَاؤُوا']),
      '3fp': 'بُؤْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("bw'-1")!, 'indicative')).toEqualT({
      '1s': 'أَبُوءُ',
      '2ms': 'تَبُوءُ',
      '2fs': 'تَبُوئِينَ',
      '3ms': 'يَبُوءُ',
      '3fs': 'تَبُوءُ',
      '2d': 'تَبُوءَانِ',
      '3md': 'يَبُوءَانِ',
      '3fd': 'تَبُوءَانِ',
      '1p': 'نَبُوءُ',
      '2mp': expect.toBeOneOf(['تَبُوئُونَ', 'تَبُوءُونَ']),
      '2fp': 'تَبُؤْنَ',
      '3mp': expect.toBeOneOf(['يَبُوئُونَ', 'يَبُوءُونَ']),
      '3fp': 'يَبُؤْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("bw'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَبُوءَ',
      '2ms': 'تَبُوءَ',
      '2fs': 'تَبُوئِي',
      '3ms': 'يَبُوءَ',
      '3fs': 'تَبُوءَ',
      '2d': 'تَبُوءَا',
      '3md': 'يَبُوءَا',
      '3fd': 'تَبُوءَا',
      '1p': 'نَبُوءَ',
      '2mp': expect.toBeOneOf(['تَبُوئُوا', 'تَبُوءُوا']),
      '2fp': 'تَبُؤْنَ',
      '3mp': expect.toBeOneOf(['يَبُوئُوا', 'يَبُوءُوا']),
      '3fp': 'يَبُؤْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("bw'-1")!, 'jussive')).toEqualT({
      '1s': 'أَبُؤْ',
      '2ms': 'تَبُؤْ',
      '2fs': 'تَبُوئِي',
      '3ms': 'يَبُؤْ',
      '3fs': 'تَبُؤْ',
      '2d': 'تَبُوءَا',
      '3md': 'يَبُوءَا',
      '3fd': 'تَبُوءَا',
      '1p': 'نَبُؤْ',
      '2mp': expect.toBeOneOf(['تَبُوئُوا', 'تَبُوءُوا']),
      '2fp': 'تَبُؤْنَ',
      '3mp': expect.toBeOneOf(['يَبُوئُوا', 'يَبُوءُوا']),
      '3fp': 'يَبُؤْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("bw'-1")!)).toMatchObjectT({
      '2ms': 'بُؤْ',
      '2fs': 'بُوئِي',
      '2d': 'بُوءَا',
      '2mp': expect.toBeOneOf(['بُوئُوا', 'بُوءُوا']),
      '2fp': 'بُؤْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("bw'-1")!)).toEqualT({
      '1s': 'بِئْتُ',
      '2ms': 'بِئْتَ',
      '2fs': 'بِئْتِ',
      '3ms': 'بِيءَ',
      '3fs': 'بِيئَتْ',
      '2d': 'بِئْتُمَا',
      '3md': 'بِيئَا',
      '3fd': 'بِيئَتَا',
      '1p': 'بِئْنَا',
      '2mp': 'بِئْتُمْ',
      '2fp': 'بِئْتُنَّ',
      '3mp': expect.toBeOneOf(['بِيئُوا', 'بِيؤُوا']),
      '3fp': 'بِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("bw'-1")!, 'indicative')).toEqualT({
      '1s': 'أُبَاءُ',
      '2ms': 'تُبَاءُ',
      '2fs': 'تُبَائِينَ',
      '3ms': 'يُبَاءُ',
      '3fs': 'تُبَاءُ',
      '2d': 'تُبَاءَانِ',
      '3md': 'يُبَاءَانِ',
      '3fd': 'تُبَاءَانِ',
      '1p': 'نُبَاءُ',
      '2mp': expect.toBeOneOf(['تُبَائُونَ', 'تُبَاؤُونَ']),
      '2fp': 'تُبَأْنَ',
      '3mp': expect.toBeOneOf(['يُبَائُونَ', 'يُبَاؤُونَ']),
      '3fp': 'يُبَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("bw'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُبَاءَ',
      '2ms': 'تُبَاءَ',
      '2fs': 'تُبَائِي',
      '3ms': 'يُبَاءَ',
      '3fs': 'تُبَاءَ',
      '2d': 'تُبَاءَا',
      '3md': 'يُبَاءَا',
      '3fd': 'تُبَاءَا',
      '1p': 'نُبَاءَ',
      '2mp': expect.toBeOneOf(['تُبَائُوا', 'تُبَاؤُوا']),
      '2fp': 'تُبَأْنَ',
      '3mp': expect.toBeOneOf(['يُبَائُوا', 'يُبَاؤُوا']),
      '3fp': 'يُبَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("bw'-1")!, 'jussive')).toEqualT({
      '1s': 'أُبَأْ',
      '2ms': 'تُبَأْ',
      '2fs': 'تُبَائِي',
      '3ms': 'يُبَأْ',
      '3fs': 'تُبَأْ',
      '2d': 'تُبَاءَا',
      '3md': 'يُبَاءَا',
      '3fd': 'تُبَاءَا',
      '1p': 'نُبَأْ',
      '2mp': expect.toBeOneOf(['تُبَائُوا', 'تُبَاؤُوا']),
      '2fp': 'تُبَأْنَ',
      '3mp': expect.toBeOneOf(['يُبَائُوا', 'يُبَاؤُوا']),
      '3fp': 'يُبَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("bw'-1")!)).toEqualT('بَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("bw'-1")!)).toEqualT('مَبُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("bw'-1")!))).toEqualT(new Set(['بَوْء']))
  })
})
