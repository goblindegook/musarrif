import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'frq-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'frq-1")!)).toEqualT({
      '1s': 'أَفْرَقْتُ',
      '2ms': 'أَفْرَقْتَ',
      '2fs': 'أَفْرَقْتِ',
      '3ms': 'أَفْرَقَ',
      '3fs': 'أَفْرَقَتْ',
      '2d': 'أَفْرَقْتُمَا',
      '3md': 'أَفْرَقَا',
      '3fd': 'أَفْرَقَتَا',
      '1p': 'أَفْرَقْنَا',
      '2mp': 'أَفْرَقْتُمْ',
      '2fp': 'أَفْرَقْتُنَّ',
      '3mp': 'أَفْرَقُوا',
      '3fp': 'أَفْرَقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'frq-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَفْرِقُ',
      '2ms': 'تُؤَفْرِقُ',
      '2fs': 'تُؤَفْرِقِينَ',
      '3ms': 'يُؤَفْرِقُ',
      '3fs': 'تُؤَفْرِقُ',
      '2d': 'تُؤَفْرِقَانِ',
      '3md': 'يُؤَفْرِقَانِ',
      '3fd': 'تُؤَفْرِقَانِ',
      '1p': 'نُؤَفْرِقُ',
      '2mp': 'تُؤَفْرِقُونَ',
      '2fp': 'تُؤَفْرِقْنَ',
      '3mp': 'يُؤَفْرِقُونَ',
      '3fp': 'يُؤَفْرِقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'frq-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَفْرِقَ',
      '2ms': 'تُؤَفْرِقَ',
      '2fs': 'تُؤَفْرِقِي',
      '3ms': 'يُؤَفْرِقَ',
      '3fs': 'تُؤَفْرِقَ',
      '2d': 'تُؤَفْرِقَا',
      '3md': 'يُؤَفْرِقَا',
      '3fd': 'تُؤَفْرِقَا',
      '1p': 'نُؤَفْرِقَ',
      '2mp': 'تُؤَفْرِقُوا',
      '2fp': 'تُؤَفْرِقْنَ',
      '3mp': 'يُؤَفْرِقُوا',
      '3fp': 'يُؤَفْرِقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'frq-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَفْرِقْ',
      '2ms': 'تُؤَفْرِقْ',
      '2fs': 'تُؤَفْرِقِي',
      '3ms': 'يُؤَفْرِقْ',
      '3fs': 'تُؤَفْرِقْ',
      '2d': 'تُؤَفْرِقَا',
      '3md': 'يُؤَفْرِقَا',
      '3fd': 'تُؤَفْرِقَا',
      '1p': 'نُؤَفْرِقْ',
      '2mp': 'تُؤَفْرِقُوا',
      '2fp': 'تُؤَفْرِقْنَ',
      '3mp': 'يُؤَفْرِقُوا',
      '3fp': 'يُؤَفْرِقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'frq-1")!)).toMatchObjectT({
      '2ms': 'أَفْرِقْ',
      '2fs': 'أَفْرِقِي',
      '2d': 'أَفْرِقَا',
      '2mp': 'أَفْرِقُوا',
      '2fp': 'أَفْرِقْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'frq-1")!)).toEqualT({
      '1s': 'أُفْرِقْتُ',
      '2ms': 'أُفْرِقْتَ',
      '2fs': 'أُفْرِقْتِ',
      '3ms': 'أُفْرِقَ',
      '3fs': 'أُفْرِقَتْ',
      '2d': 'أُفْرِقْتُمَا',
      '3md': 'أُفْرِقَا',
      '3fd': 'أُفْرِقَتَا',
      '1p': 'أُفْرِقْنَا',
      '2mp': 'أُفْرِقْتُمْ',
      '2fp': 'أُفْرِقْتُنَّ',
      '3mp': 'أُفْرِقُوا',
      '3fp': 'أُفْرِقْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'frq-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَفْرَقُ',
      '2ms': 'تُؤَفْرَقُ',
      '2fs': 'تُؤَفْرَقِينَ',
      '3ms': 'يُؤَفْرَقُ',
      '3fs': 'تُؤَفْرَقُ',
      '2d': 'تُؤَفْرَقَانِ',
      '3md': 'يُؤَفْرَقَانِ',
      '3fd': 'تُؤَفْرَقَانِ',
      '1p': 'نُؤَفْرَقُ',
      '2mp': 'تُؤَفْرَقُونَ',
      '2fp': 'تُؤَفْرَقْنَ',
      '3mp': 'يُؤَفْرَقُونَ',
      '3fp': 'يُؤَفْرَقْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'frq-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَفْرَقَ',
      '2ms': 'تُؤَفْرَقَ',
      '2fs': 'تُؤَفْرَقِي',
      '3ms': 'يُؤَفْرَقَ',
      '3fs': 'تُؤَفْرَقَ',
      '2d': 'تُؤَفْرَقَا',
      '3md': 'يُؤَفْرَقَا',
      '3fd': 'تُؤَفْرَقَا',
      '1p': 'نُؤَفْرَقَ',
      '2mp': 'تُؤَفْرَقُوا',
      '2fp': 'تُؤَفْرَقْنَ',
      '3mp': 'يُؤَفْرَقُوا',
      '3fp': 'يُؤَفْرَقْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'frq-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَفْرَقْ',
      '2ms': 'تُؤَفْرَقْ',
      '2fs': 'تُؤَفْرَقِي',
      '3ms': 'يُؤَفْرَقْ',
      '3fs': 'تُؤَفْرَقْ',
      '2d': 'تُؤَفْرَقَا',
      '3md': 'يُؤَفْرَقَا',
      '3fd': 'تُؤَفْرَقَا',
      '1p': 'نُؤَفْرَقْ',
      '2mp': 'تُؤَفْرَقُوا',
      '2fp': 'تُؤَفْرَقْنَ',
      '3mp': 'يُؤَفْرَقُوا',
      '3fp': 'يُؤَفْرَقْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'frq-1")!)).toEqualT('مُؤَفْرِق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'frq-1")!)).toEqualT('مُؤَفْرَق')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'frq-1")!))).toEqualT(new Set(['أَفْرَقَة']))
  })
})
