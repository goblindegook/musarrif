import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("hn'-1-a-u (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("hn'-1-a-u")!)).toEqualT({
      '1s': 'هَنَأْتُ',
      '2ms': 'هَنَأْتَ',
      '2fs': 'هَنَأْتِ',
      '3ms': 'هَنَأَ',
      '3fs': 'هَنَأَتْ',
      '2d': 'هَنَأْتُمَا',
      '3md': 'هَنَآ',
      '3fd': 'هَنَأَتَا',
      '1p': 'هَنَأْنَا',
      '2mp': 'هَنَأْتُمْ',
      '2fp': 'هَنَأْتُنَّ',
      '3mp': 'هَنَؤُوا',
      '3fp': 'هَنَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-u")!, 'indicative')).toEqualT({
      '1s': expect.toBeOneOf(['أَهْنُؤُ', 'أَهْنَأُ', 'أَهْنِئُ']),
      '2ms': expect.toBeOneOf(['تَهْنُؤُ', 'تَهْنَأُ', 'تَهْنِئُ']),
      '2fs': expect.toBeOneOf(['تَهْنُئِينَ', 'تَهْنَئِينَ', 'تَهْنِئِينَ']),
      '3ms': expect.toBeOneOf(['يَهْنُؤُ', 'يَهْنَأُ', 'يَهْنِئُ']),
      '3fs': expect.toBeOneOf(['تَهْنُؤُ', 'تَهْنَأُ', 'تَهْنِئُ']),
      '2d': expect.toBeOneOf(['تَهْنُؤَانِ', 'تَهْنَآنِ', 'تَهْنِئَانِ']),
      '3md': expect.toBeOneOf(['يَهْنُؤَانِ', 'يَهْنَآنِ', 'يَهْنِئَانِ']),
      '3fd': expect.toBeOneOf(['تَهْنُؤَانِ', 'تَهْنَآنِ', 'تَهْنِئَانِ']),
      '1p': expect.toBeOneOf(['نَهْنُؤُ', 'نَهْنَأُ', 'نَهْنِئُ']),
      '2mp': expect.toBeOneOf(['تَهْنُؤُونَ', 'تَهْنَؤُونَ', 'تَهْنِئُونَ']),
      '2fp': expect.toBeOneOf(['تَهْنُؤْنَ', 'تَهْنَأْنَ', 'تَهْنِئْنَ']),
      '3mp': expect.toBeOneOf(['يَهْنُؤُونَ', 'يَهْنَؤُونَ', 'يَهْنِئُونَ']),
      '3fp': expect.toBeOneOf(['يَهْنُؤْنَ', 'يَهْنَأْنَ', 'يَهْنِئْنَ']),
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-u")!, 'subjunctive')).toEqualT({
      '1s': expect.toBeOneOf(['أَهْنُؤَ', 'أَهْنَأَ', 'أَهْنِئَ']),
      '2ms': expect.toBeOneOf(['تَهْنُؤَ', 'تَهْنَأَ', 'تَهْنِئَ']),
      '2fs': expect.toBeOneOf(['تَهْنُئِي', 'تَهْنَئِي', 'تَهْنِئِي']),
      '3ms': expect.toBeOneOf(['يَهْنُؤَ', 'يَهْنَأَ', 'يَهْنِئَ']),
      '3fs': expect.toBeOneOf(['تَهْنُؤَ', 'تَهْنَأَ', 'تَهْنِئَ']),
      '2d': expect.toBeOneOf(['تَهْنُؤَا', 'تَهْنَآ', 'تَهْنِئَا']),
      '3md': expect.toBeOneOf(['يَهْنُؤَا', 'يَهْنَآ', 'يَهْنِئَا']),
      '3fd': expect.toBeOneOf(['تَهْنُؤَا', 'تَهْنَآ', 'تَهْنِئَا']),
      '1p': expect.toBeOneOf(['نَهْنُؤَ', 'نَهْنَأَ', 'نَهْنِئَ']),
      '2mp': expect.toBeOneOf(['تَهْنُؤُوا', 'تَهْنَؤُوا', 'تَهْنِئُوا']),
      '2fp': expect.toBeOneOf(['تَهْنُؤْنَ', 'تَهْنَأْنَ', 'تَهْنِئْنَ']),
      '3mp': expect.toBeOneOf(['يَهْنُؤُوا', 'يَهْنَؤُوا', 'يَهْنِئُوا']),
      '3fp': expect.toBeOneOf(['يَهْنُؤْنَ', 'يَهْنَأْنَ', 'يَهْنِئْنَ']),
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-u")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَهْنُؤْ', 'أَهْنَأْ', 'أَهْنِئْ']),
      '2ms': expect.toBeOneOf(['تَهْنُؤْ', 'تَهْنَأْ', 'تَهْنِئْ']),
      '2fs': expect.toBeOneOf(['تَهْنُئِي', 'تَهْنَئِي', 'تَهْنِئِي']),
      '3ms': expect.toBeOneOf(['يَهْنُؤْ', 'يَهْنَأْ', 'يَهْنِئْ']),
      '3fs': expect.toBeOneOf(['تَهْنُؤْ', 'تَهْنَأْ', 'تَهْنِئْ']),
      '2d': expect.toBeOneOf(['تَهْنُؤَا', 'تَهْنَآ', 'تَهْنِئَا']),
      '3md': expect.toBeOneOf(['يَهْنُؤَا', 'يَهْنَآ', 'يَهْنِئَا']),
      '3fd': expect.toBeOneOf(['تَهْنُؤَا', 'تَهْنَآ', 'تَهْنِئَا']),
      '1p': expect.toBeOneOf(['نَهْنُؤْ', 'نَهْنَأْ', 'نَهْنِئْ']),
      '2mp': expect.toBeOneOf(['تَهْنُؤُوا', 'تَهْنَؤُوا', 'تَهْنِئُوا']),
      '2fp': expect.toBeOneOf(['تَهْنُؤْنَ', 'تَهْنَأْنَ', 'تَهْنِئْنَ']),
      '3mp': expect.toBeOneOf(['يَهْنُؤُوا', 'يَهْنَؤُوا', 'يَهْنِئُوا']),
      '3fp': expect.toBeOneOf(['يَهْنُؤْنَ', 'يَهْنَأْنَ', 'يَهْنِئْنَ']),
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("hn'-1-a-u")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اُهْنُؤْ', 'اِهْنَأْ', 'اِهْنِئْ']),
      '2fs': expect.toBeOneOf(['اُهْنُئِي', 'اِهْنَئِي', 'اِهْنِئِي']),
      '2d': expect.toBeOneOf(['اُهْنُؤَا', 'اِهْنَآ', 'اِهْنِئَا']),
      '2mp': expect.toBeOneOf(['اُهْنُؤُوا', 'اِهْنَؤُوا', 'اِهْنِئُوا']),
      '2fp': expect.toBeOneOf(['اُهْنُؤْنَ', 'اِهْنَأْنَ', 'اِهْنِئْنَ']),
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("hn'-1-a-u")!)).toEqualT({
      '1s': 'هُنِئْتُ',
      '2ms': 'هُنِئْتَ',
      '2fs': 'هُنِئْتِ',
      '3ms': 'هُنِئَ',
      '3fs': 'هُنِئَتْ',
      '2d': 'هُنِئْتُمَا',
      '3md': 'هُنِئَا',
      '3fd': 'هُنِئَتَا',
      '1p': 'هُنِئْنَا',
      '2mp': 'هُنِئْتُمْ',
      '2fp': 'هُنِئْتُنَّ',
      '3mp': 'هُنِئُوا',
      '3fp': 'هُنِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-u")!, 'indicative')).toEqualT({
      '1s': 'أُهْنَأُ',
      '2ms': 'تُهْنَأُ',
      '2fs': 'تُهْنَئِينَ',
      '3ms': 'يُهْنَأُ',
      '3fs': 'تُهْنَأُ',
      '2d': 'تُهْنَآنِ',
      '3md': 'يُهْنَآنِ',
      '3fd': 'تُهْنَآنِ',
      '1p': 'نُهْنَأُ',
      '2mp': 'تُهْنَؤُونَ',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُونَ',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-u")!, 'subjunctive')).toEqualT({
      '1s': 'أُهْنَأَ',
      '2ms': 'تُهْنَأَ',
      '2fs': 'تُهْنَئِي',
      '3ms': 'يُهْنَأَ',
      '3fs': 'تُهْنَأَ',
      '2d': 'تُهْنَآ',
      '3md': 'يُهْنَآ',
      '3fd': 'تُهْنَآ',
      '1p': 'نُهْنَأَ',
      '2mp': 'تُهْنَؤُوا',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُوا',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-u")!, 'jussive')).toEqualT({
      '1s': 'أُهْنَأْ',
      '2ms': 'تُهْنَأْ',
      '2fs': 'تُهْنَئِي',
      '3ms': 'يُهْنَأْ',
      '3fs': 'تُهْنَأْ',
      '2d': 'تُهْنَآ',
      '3md': 'يُهْنَآ',
      '3fd': 'تُهْنَآ',
      '1p': 'نُهْنَأْ',
      '2mp': 'تُهْنَؤُوا',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُوا',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("hn'-1-a-u")!)).toEqualT('هَانِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("hn'-1-a-u")!)).toEqualT('مَهْنُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("hn'-1-a-u")!))).toEqualT(new Set(['هَنْء', 'هِنْء', 'هَنَاء']))
  })
})
