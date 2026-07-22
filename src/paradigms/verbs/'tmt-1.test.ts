import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'tmt-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'tmt-1")!)).toEqualT({
      '1s': 'أَتْمَتُّ',
      '2ms': 'أَتْمَتَّ',
      '2fs': 'أَتْمَتِّ',
      '3ms': 'أَتْمَتَ',
      '3fs': 'أَتْمَتَتْ',
      '2d': 'أَتْمَتُّمَا',
      '3md': 'أَتْمَتَا',
      '3fd': 'أَتْمَتَتَا',
      '1p': 'أَتْمَتْنَا',
      '2mp': 'أَتْمَتُّمْ',
      '2fp': 'أَتْمَتُّنَّ',
      '3mp': 'أَتْمَتُوا',
      '3fp': 'أَتْمَتْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'tmt-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَتْمِتُ',
      '2ms': 'تُؤَتْمِتُ',
      '2fs': 'تُؤَتْمِتِينَ',
      '3ms': 'يُؤَتْمِتُ',
      '3fs': 'تُؤَتْمِتُ',
      '2d': 'تُؤَتْمِتَانِ',
      '3md': 'يُؤَتْمِتَانِ',
      '3fd': 'تُؤَتْمِتَانِ',
      '1p': 'نُؤَتْمِتُ',
      '2mp': 'تُؤَتْمِتُونَ',
      '2fp': 'تُؤَتْمِتْنَ',
      '3mp': 'يُؤَتْمِتُونَ',
      '3fp': 'يُؤَتْمِتْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'tmt-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَتْمِتَ',
      '2ms': 'تُؤَتْمِتَ',
      '2fs': 'تُؤَتْمِتِي',
      '3ms': 'يُؤَتْمِتَ',
      '3fs': 'تُؤَتْمِتَ',
      '2d': 'تُؤَتْمِتَا',
      '3md': 'يُؤَتْمِتَا',
      '3fd': 'تُؤَتْمِتَا',
      '1p': 'نُؤَتْمِتَ',
      '2mp': 'تُؤَتْمِتُوا',
      '2fp': 'تُؤَتْمِتْنَ',
      '3mp': 'يُؤَتْمِتُوا',
      '3fp': 'يُؤَتْمِتْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'tmt-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَتْمِتْ',
      '2ms': 'تُؤَتْمِتْ',
      '2fs': 'تُؤَتْمِتِي',
      '3ms': 'يُؤَتْمِتْ',
      '3fs': 'تُؤَتْمِتْ',
      '2d': 'تُؤَتْمِتَا',
      '3md': 'يُؤَتْمِتَا',
      '3fd': 'تُؤَتْمِتَا',
      '1p': 'نُؤَتْمِتْ',
      '2mp': 'تُؤَتْمِتُوا',
      '2fp': 'تُؤَتْمِتْنَ',
      '3mp': 'يُؤَتْمِتُوا',
      '3fp': 'يُؤَتْمِتْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'tmt-1")!)).toMatchObjectT({
      '2ms': 'أَتْمِتْ',
      '2fs': 'أَتْمِتِي',
      '2d': 'أَتْمِتَا',
      '2mp': 'أَتْمِتُوا',
      '2fp': 'أَتْمِتْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'tmt-1")!)).toEqualT({
      '1s': 'أُتْمِتُّ',
      '2ms': 'أُتْمِتَّ',
      '2fs': 'أُتْمِتِّ',
      '3ms': 'أُتْمِتَ',
      '3fs': 'أُتْمِتَتْ',
      '2d': 'أُتْمِتُّمَا',
      '3md': 'أُتْمِتَا',
      '3fd': 'أُتْمِتَتَا',
      '1p': 'أُتْمِتْنَا',
      '2mp': 'أُتْمِتُّمْ',
      '2fp': 'أُتْمِتُّنَّ',
      '3mp': 'أُتْمِتُوا',
      '3fp': 'أُتْمِتْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'tmt-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَتْمَتُ',
      '2ms': 'تُؤَتْمَتُ',
      '2fs': 'تُؤَتْمَتِينَ',
      '3ms': 'يُؤَتْمَتُ',
      '3fs': 'تُؤَتْمَتُ',
      '2d': 'تُؤَتْمَتَانِ',
      '3md': 'يُؤَتْمَتَانِ',
      '3fd': 'تُؤَتْمَتَانِ',
      '1p': 'نُؤَتْمَتُ',
      '2mp': 'تُؤَتْمَتُونَ',
      '2fp': 'تُؤَتْمَتْنَ',
      '3mp': 'يُؤَتْمَتُونَ',
      '3fp': 'يُؤَتْمَتْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'tmt-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَتْمَتَ',
      '2ms': 'تُؤَتْمَتَ',
      '2fs': 'تُؤَتْمَتِي',
      '3ms': 'يُؤَتْمَتَ',
      '3fs': 'تُؤَتْمَتَ',
      '2d': 'تُؤَتْمَتَا',
      '3md': 'يُؤَتْمَتَا',
      '3fd': 'تُؤَتْمَتَا',
      '1p': 'نُؤَتْمَتَ',
      '2mp': 'تُؤَتْمَتُوا',
      '2fp': 'تُؤَتْمَتْنَ',
      '3mp': 'يُؤَتْمَتُوا',
      '3fp': 'يُؤَتْمَتْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'tmt-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَتْمَتْ',
      '2ms': 'تُؤَتْمَتْ',
      '2fs': 'تُؤَتْمَتِي',
      '3ms': 'يُؤَتْمَتْ',
      '3fs': 'تُؤَتْمَتْ',
      '2d': 'تُؤَتْمَتَا',
      '3md': 'يُؤَتْمَتَا',
      '3fd': 'تُؤَتْمَتَا',
      '1p': 'نُؤَتْمَتْ',
      '2mp': 'تُؤَتْمَتُوا',
      '2fp': 'تُؤَتْمَتْنَ',
      '3mp': 'يُؤَتْمَتُوا',
      '3fp': 'يُؤَتْمَتْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'tmt-1")!)).toEqualT('مُؤَتْمِت')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'tmt-1")!)).toEqualT('مُؤَتْمَت')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'tmt-1")!))).toEqualT(new Set(['أَتْمَتَة']))
  })
})
