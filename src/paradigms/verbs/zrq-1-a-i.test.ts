import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('zrq-1-a-i (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zrq-1-a-i')!)).toEqualT({
      '1s': 'زَرَقْتُ',
      '2ms': 'زَرَقْتَ',
      '2fs': 'زَرَقْتِ',
      '3ms': 'زَرَقَ',
      '3fs': 'زَرَقَتْ',
      '2d': 'زَرَقْتُمَا',
      '3md': 'زَرَقَا',
      '3fd': 'زَرَقَتَا',
      '1p': 'زَرَقْنَا',
      '2mp': 'زَرَقْتُمْ',
      '2fp': 'زَرَقْتُنَّ',
      '3mp': 'زَرَقُوا',
      '3fp': 'زَرَقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1-a-i')!, 'indicative')).toEqualT({
      '1s': expect.toBeOneOf(['أَزْرِقُ', 'أَزْرُقُ']),
      '2ms': expect.toBeOneOf(['تَزْرِقُ', 'تَزْرُقُ']),
      '2fs': expect.toBeOneOf(['تَزْرِقِينَ', 'تَزْرُقِينَ']),
      '3ms': expect.toBeOneOf(['يَزْرِقُ', 'يَزْرُقُ']),
      '3fs': expect.toBeOneOf(['تَزْرِقُ', 'تَزْرُقُ']),
      '2d': expect.toBeOneOf(['تَزْرِقَانِ', 'تَزْرُقَانِ']),
      '3md': expect.toBeOneOf(['يَزْرِقَانِ', 'يَزْرُقَانِ']),
      '3fd': expect.toBeOneOf(['تَزْرِقَانِ', 'تَزْرُقَانِ']),
      '1p': expect.toBeOneOf(['نَزْرِقُ', 'نَزْرُقُ']),
      '2mp': expect.toBeOneOf(['تَزْرِقُونَ', 'تَزْرُقُونَ']),
      '2fp': expect.toBeOneOf(['تَزْرِقْنَ', 'تَزْرُقْنَ']),
      '3mp': expect.toBeOneOf(['يَزْرِقُونَ', 'يَزْرُقُونَ']),
      '3fp': expect.toBeOneOf(['يَزْرِقْنَ', 'يَزْرُقْنَ']),
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1-a-i')!, 'subjunctive')).toEqualT({
      '1s': expect.toBeOneOf(['أَزْرِقَ', 'أَزْرُقَ']),
      '2ms': expect.toBeOneOf(['تَزْرِقَ', 'تَزْرُقَ']),
      '2fs': expect.toBeOneOf(['تَزْرِقِي', 'تَزْرُقِي']),
      '3ms': expect.toBeOneOf(['يَزْرِقَ', 'يَزْرُقَ']),
      '3fs': expect.toBeOneOf(['تَزْرِقَ', 'تَزْرُقَ']),
      '2d': expect.toBeOneOf(['تَزْرِقَا', 'تَزْرُقَا']),
      '3md': expect.toBeOneOf(['يَزْرِقَا', 'يَزْرُقَا']),
      '3fd': expect.toBeOneOf(['تَزْرِقَا', 'تَزْرُقَا']),
      '1p': expect.toBeOneOf(['نَزْرِقَ', 'نَزْرُقَ']),
      '2mp': expect.toBeOneOf(['تَزْرِقُوا', 'تَزْرُقُوا']),
      '2fp': expect.toBeOneOf(['تَزْرِقْنَ', 'تَزْرُقْنَ']),
      '3mp': expect.toBeOneOf(['يَزْرِقُوا', 'يَزْرُقُوا']),
      '3fp': expect.toBeOneOf(['يَزْرِقْنَ', 'يَزْرُقْنَ']),
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zrq-1-a-i')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَزْرِقْ', 'أَزْرُقْ']),
      '2ms': expect.toBeOneOf(['تَزْرِقْ', 'تَزْرُقْ']),
      '2fs': expect.toBeOneOf(['تَزْرِقِي', 'تَزْرُقِي']),
      '3ms': expect.toBeOneOf(['يَزْرِقْ', 'يَزْرُقْ']),
      '3fs': expect.toBeOneOf(['تَزْرِقْ', 'تَزْرُقْ']),
      '2d': expect.toBeOneOf(['تَزْرِقَا', 'تَزْرُقَا']),
      '3md': expect.toBeOneOf(['يَزْرِقَا', 'يَزْرُقَا']),
      '3fd': expect.toBeOneOf(['تَزْرِقَا', 'تَزْرُقَا']),
      '1p': expect.toBeOneOf(['نَزْرِقْ', 'نَزْرُقْ']),
      '2mp': expect.toBeOneOf(['تَزْرِقُوا', 'تَزْرُقُوا']),
      '2fp': expect.toBeOneOf(['تَزْرِقْنَ', 'تَزْرُقْنَ']),
      '3mp': expect.toBeOneOf(['يَزْرِقُوا', 'يَزْرُقُوا']),
      '3fp': expect.toBeOneOf(['يَزْرِقْنَ', 'يَزْرُقْنَ']),
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('zrq-1-a-i')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِزْرِقْ', 'اُزْرُقْ']),
      '2fs': expect.toBeOneOf(['اِزْرِقِي', 'اُزْرُقِي']),
      '2d': expect.toBeOneOf(['اِزْرِقَا', 'اُزْرُقَا']),
      '2mp': expect.toBeOneOf(['اِزْرِقُوا', 'اُزْرُقُوا']),
      '2fp': expect.toBeOneOf(['اِزْرِقْنَ', 'اُزْرُقْنَ']),
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('zrq-1-a-i')!)).toEqualT({
      '1s': 'زُرِقْتُ',
      '2ms': 'زُرِقْتَ',
      '2fs': 'زُرِقْتِ',
      '3ms': 'زُرِقَ',
      '3fs': 'زُرِقَتْ',
      '2d': 'زُرِقْتُمَا',
      '3md': 'زُرِقَا',
      '3fd': 'زُرِقَتَا',
      '1p': 'زُرِقْنَا',
      '2mp': 'زُرِقْتُمْ',
      '2fp': 'زُرِقْتُنَّ',
      '3mp': 'زُرِقُوا',
      '3fp': 'زُرِقْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1-a-i')!, 'indicative')).toEqualT({
      '1s': 'أُزْرَقُ',
      '2ms': 'تُزْرَقُ',
      '2fs': 'تُزْرَقِينَ',
      '3ms': 'يُزْرَقُ',
      '3fs': 'تُزْرَقُ',
      '2d': 'تُزْرَقَانِ',
      '3md': 'يُزْرَقَانِ',
      '3fd': 'تُزْرَقَانِ',
      '1p': 'نُزْرَقُ',
      '2mp': 'تُزْرَقُونَ',
      '2fp': 'تُزْرَقْنَ',
      '3mp': 'يُزْرَقُونَ',
      '3fp': 'يُزْرَقْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1-a-i')!, 'subjunctive')).toEqualT({
      '1s': 'أُزْرَقَ',
      '2ms': 'تُزْرَقَ',
      '2fs': 'تُزْرَقِي',
      '3ms': 'يُزْرَقَ',
      '3fs': 'تُزْرَقَ',
      '2d': 'تُزْرَقَا',
      '3md': 'يُزْرَقَا',
      '3fd': 'تُزْرَقَا',
      '1p': 'نُزْرَقَ',
      '2mp': 'تُزْرَقُوا',
      '2fp': 'تُزْرَقْنَ',
      '3mp': 'يُزْرَقُوا',
      '3fp': 'يُزْرَقْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zrq-1-a-i')!, 'jussive')).toEqualT({
      '1s': 'أُزْرَقْ',
      '2ms': 'تُزْرَقْ',
      '2fs': 'تُزْرَقِي',
      '3ms': 'يُزْرَقْ',
      '3fs': 'تُزْرَقْ',
      '2d': 'تُزْرَقَا',
      '3md': 'يُزْرَقَا',
      '3fd': 'تُزْرَقَا',
      '1p': 'نُزْرَقْ',
      '2mp': 'تُزْرَقُوا',
      '2fp': 'تُزْرَقْنَ',
      '3mp': 'يُزْرَقُوا',
      '3fp': 'يُزْرَقْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('zrq-1-a-i')!)).toEqualT('زَارِق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('zrq-1-a-i')!)).toEqualT('مَزْرُوق')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('zrq-1-a-i')!))).toEqualT(new Set(['زَرْق']))
  })
})
