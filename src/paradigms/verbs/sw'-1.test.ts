import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("sw'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("sw'-1")!)).toEqualT({
      '1s': 'سُؤْتُ',
      '2ms': 'سُؤْتَ',
      '2fs': 'سُؤْتِ',
      '3ms': 'سَاءَ',
      '3fs': 'سَاءَتْ',
      '2d': 'سُؤْتُمَا',
      '3md': 'سَاءَا',
      '3fd': 'سَاءَتَا',
      '1p': 'سُؤْنَا',
      '2mp': 'سُؤْتُمْ',
      '2fp': 'سُؤْتُنَّ',
      '3mp': expect.toBeOneOf(['سَائُوا', 'سَاؤُوا']),
      '3fp': 'سُؤْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("sw'-1")!, 'indicative')).toEqualT({
      '1s': 'أَسُوءُ',
      '2ms': 'تَسُوءُ',
      '2fs': 'تَسُوئِينَ',
      '3ms': 'يَسُوءُ',
      '3fs': 'تَسُوءُ',
      '2d': 'تَسُوءَانِ',
      '3md': 'يَسُوءَانِ',
      '3fd': 'تَسُوءَانِ',
      '1p': 'نَسُوءُ',
      '2mp': expect.toBeOneOf(['تَسُوئُونَ', 'تَسُوءُونَ']),
      '2fp': 'تَسُؤْنَ',
      '3mp': expect.toBeOneOf(['يَسُوئُونَ', 'يَسُوءُونَ']),
      '3fp': 'يَسُؤْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("sw'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَسُوءَ',
      '2ms': 'تَسُوءَ',
      '2fs': 'تَسُوئِي',
      '3ms': 'يَسُوءَ',
      '3fs': 'تَسُوءَ',
      '2d': 'تَسُوءَا',
      '3md': 'يَسُوءَا',
      '3fd': 'تَسُوءَا',
      '1p': 'نَسُوءَ',
      '2mp': expect.toBeOneOf(['تَسُوئُوا', 'تَسُوءُوا']),
      '2fp': 'تَسُؤْنَ',
      '3mp': expect.toBeOneOf(['يَسُوئُوا', 'يَسُوءُوا']),
      '3fp': 'يَسُؤْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("sw'-1")!, 'jussive')).toEqualT({
      '1s': 'أَسُؤْ',
      '2ms': 'تَسُؤْ',
      '2fs': 'تَسُوئِي',
      '3ms': 'يَسُؤْ',
      '3fs': 'تَسُؤْ',
      '2d': 'تَسُوءَا',
      '3md': 'يَسُوءَا',
      '3fd': 'تَسُوءَا',
      '1p': 'نَسُؤْ',
      '2mp': expect.toBeOneOf(['تَسُوئُوا', 'تَسُوءُوا']),
      '2fp': 'تَسُؤْنَ',
      '3mp': expect.toBeOneOf(['يَسُوئُوا', 'يَسُوءُوا']),
      '3fp': 'يَسُؤْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("sw'-1")!)).toMatchObjectT({
      '2ms': 'سُؤْ',
      '2fs': 'سُوئِي',
      '2d': 'سُوءَا',
      '2mp': expect.toBeOneOf(['سُوئُوا', 'سُوءُوا']),
      '2fp': 'سُؤْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("sw'-1")!)).toEqualT({
      '1s': 'سِئْتُ',
      '2ms': 'سِئْتَ',
      '2fs': 'سِئْتِ',
      '3ms': 'سِيءَ',
      '3fs': 'سِيئَتْ',
      '2d': 'سِئْتُمَا',
      '3md': 'سِيئَا',
      '3fd': 'سِيئَتَا',
      '1p': 'سِئْنَا',
      '2mp': 'سِئْتُمْ',
      '2fp': 'سِئْتُنَّ',
      '3mp': expect.toBeOneOf(['سِيئُوا', 'سِيؤُوا']),
      '3fp': 'سِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-1")!, 'indicative')).toEqualT({
      '1s': 'أُسَاءُ',
      '2ms': 'تُسَاءُ',
      '2fs': 'تُسَائِينَ',
      '3ms': 'يُسَاءُ',
      '3fs': 'تُسَاءُ',
      '2d': 'تُسَاءَانِ',
      '3md': 'يُسَاءَانِ',
      '3fd': 'تُسَاءَانِ',
      '1p': 'نُسَاءُ',
      '2mp': expect.toBeOneOf(['تُسَائُونَ', 'تُسَاؤُونَ']),
      '2fp': 'تُسَأْنَ',
      '3mp': expect.toBeOneOf(['يُسَائُونَ', 'يُسَاؤُونَ']),
      '3fp': 'يُسَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُسَاءَ',
      '2ms': 'تُسَاءَ',
      '2fs': 'تُسَائِي',
      '3ms': 'يُسَاءَ',
      '3fs': 'تُسَاءَ',
      '2d': 'تُسَاءَا',
      '3md': 'يُسَاءَا',
      '3fd': 'تُسَاءَا',
      '1p': 'نُسَاءَ',
      '2mp': expect.toBeOneOf(['تُسَائُوا', 'تُسَاؤُوا']),
      '2fp': 'تُسَأْنَ',
      '3mp': expect.toBeOneOf(['يُسَائُوا', 'يُسَاؤُوا']),
      '3fp': 'يُسَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-1")!, 'jussive')).toEqualT({
      '1s': 'أُسَأْ',
      '2ms': 'تُسَأْ',
      '2fs': 'تُسَائِي',
      '3ms': 'يُسَأْ',
      '3fs': 'تُسَأْ',
      '2d': 'تُسَاءَا',
      '3md': 'يُسَاءَا',
      '3fd': 'تُسَاءَا',
      '1p': 'نُسَأْ',
      '2mp': expect.toBeOneOf(['تُسَائُوا', 'تُسَاؤُوا']),
      '2fp': 'تُسَأْنَ',
      '3mp': expect.toBeOneOf(['يُسَائُوا', 'يُسَاؤُوا']),
      '3fp': 'يُسَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("sw'-1")!)).toEqualT('سَيِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("sw'-1")!)).toEqualT('مَسُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("sw'-1")!))).toEqualT(
      new Set(['سُوء', 'سَوْء', 'سَوَاء', 'سَوَاءَة', 'سَوَايَة', 'سَوَائِيَة', 'مَسَاءَة', 'مَسَايَة', 'مَسَاء', 'مَسَائِيَة']),
    )
  })
})
