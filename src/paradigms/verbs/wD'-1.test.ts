import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("wD'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wD'-1")!)).toEqualT({
      '1s': 'وَضُؤْتُ',
      '2ms': 'وَضُؤْتَ',
      '2fs': 'وَضُؤْتِ',
      '3ms': 'وَضُؤَ',
      '3fs': 'وَضُؤَتْ',
      '2d': 'وَضُؤْتُمَا',
      '3md': 'وَضُؤَا',
      '3fd': 'وَضُؤَتَا',
      '1p': 'وَضُؤْنَا',
      '2mp': 'وَضُؤْتُمْ',
      '2fp': 'وَضُؤْتُنَّ',
      '3mp': 'وَضُؤُوا',
      '3fp': 'وَضُؤْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wD'-1")!, 'indicative')).toEqualT({
      '1s': 'أَوْضُؤُ',
      '2ms': 'تَوْضُؤُ',
      '2fs': 'تَوْضُئِينَ',
      '3ms': 'يَوْضُؤُ',
      '3fs': 'تَوْضُؤُ',
      '2d': 'تَوْضُؤَانِ',
      '3md': 'يَوْضُؤَانِ',
      '3fd': 'تَوْضُؤَانِ',
      '1p': 'نَوْضُؤُ',
      '2mp': 'تَوْضُؤُونَ',
      '2fp': 'تَوْضُؤْنَ',
      '3mp': 'يَوْضُؤُونَ',
      '3fp': 'يَوْضُؤْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wD'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَوْضُؤَ',
      '2ms': 'تَوْضُؤَ',
      '2fs': 'تَوْضُئِي',
      '3ms': 'يَوْضُؤَ',
      '3fs': 'تَوْضُؤَ',
      '2d': 'تَوْضُؤَا',
      '3md': 'يَوْضُؤَا',
      '3fd': 'تَوْضُؤَا',
      '1p': 'نَوْضُؤَ',
      '2mp': 'تَوْضُؤُوا',
      '2fp': 'تَوْضُؤْنَ',
      '3mp': 'يَوْضُؤُوا',
      '3fp': 'يَوْضُؤْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wD'-1")!, 'jussive')).toEqualT({
      '1s': 'أَوْضُؤْ',
      '2ms': 'تَوْضُؤْ',
      '2fs': 'تَوْضُئِي',
      '3ms': 'يَوْضُؤْ',
      '3fs': 'تَوْضُؤْ',
      '2d': 'تَوْضُؤَا',
      '3md': 'يَوْضُؤَا',
      '3fd': 'تَوْضُؤَا',
      '1p': 'نَوْضُؤْ',
      '2mp': 'تَوْضُؤُوا',
      '2fp': 'تَوْضُؤْنَ',
      '3mp': 'يَوْضُؤُوا',
      '3fp': 'يَوْضُؤْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wD'-1")!)).toMatchObjectT({
      '2ms': 'اُوضُؤْ',
      '2fs': 'اُوضُئِي',
      '2d': 'اُوضُؤَا',
      '2mp': 'اُوضُؤُوا',
      '2fp': 'اُوضُؤْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wD'-1")!)).toEqualT('وَضِيء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wD'-1")!))).toEqualT(new Set(['وَضَاءَة', 'وُضُوء']))
  })
})
