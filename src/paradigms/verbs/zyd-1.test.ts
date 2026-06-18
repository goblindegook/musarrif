import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('zyd-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zyd-1')!)).strings.toEqualT({
      '1s': 'زِدْتُ',
      '2ms': 'زِدْتَ',
      '2fs': 'زِدْتِ',
      '3ms': 'زَادَ',
      '3fs': 'زَادَتْ',
      '2d': 'زِدْتُمَا',
      '3md': 'زَادَا',
      '3fd': 'زَادَتَا',
      '1p': 'زِدْنَا',
      '2mp': 'زِدْتُمْ',
      '2fp': 'زِدْتُنَّ',
      '3mp': 'زَادُوا',
      '3fp': 'زِدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zyd-1')!, 'indicative')).toEqualT({
      '1s': 'أَزِيدُ',
      '2ms': 'تَزِيدُ',
      '2fs': 'تَزِيدِينَ',
      '3ms': 'يَزِيدُ',
      '3fs': 'تَزِيدُ',
      '2d': 'تَزِيدَانِ',
      '3md': 'يَزِيدَانِ',
      '3fd': 'تَزِيدَانِ',
      '1p': 'نَزِيدُ',
      '2mp': 'تَزِيدُونَ',
      '2fp': 'تَزِدْنَ',
      '3mp': 'يَزِيدُونَ',
      '3fp': 'يَزِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zyd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَزِيدَ',
      '2ms': 'تَزِيدَ',
      '2fs': 'تَزِيدِي',
      '3ms': 'يَزِيدَ',
      '3fs': 'تَزِيدَ',
      '2d': 'تَزِيدَا',
      '3md': 'يَزِيدَا',
      '3fd': 'تَزِيدَا',
      '1p': 'نَزِيدَ',
      '2mp': 'تَزِيدُوا',
      '2fp': 'تَزِدْنَ',
      '3mp': 'يَزِيدُوا',
      '3fp': 'يَزِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zyd-1')!, 'jussive')).toEqualT({
      '1s': 'أَزِدْ',
      '2ms': 'تَزِدْ',
      '2fs': 'تَزِيدِي',
      '3ms': 'يَزِدْ',
      '3fs': 'تَزِدْ',
      '2d': 'تَزِيدَا',
      '3md': 'يَزِيدَا',
      '3fd': 'تَزِيدَا',
      '1p': 'نَزِدْ',
      '2mp': 'تَزِيدُوا',
      '2fp': 'تَزِدْنَ',
      '3mp': 'يَزِيدُوا',
      '3fp': 'يَزِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('zyd-1')!)).toMatchObjectT({
      '2ms': 'زِدْ',
      '2fs': 'زِيدِي',
      '2d': 'زِيدَا',
      '2mp': 'زِيدُوا',
      '2fp': 'زِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('zyd-1')!)).toEqualT({
      '1s': 'زِدْتُ',
      '2ms': 'زِدْتَ',
      '2fs': 'زِدْتِ',
      '3ms': 'زِيدَ',
      '3fs': 'زِيدَتْ',
      '2d': 'زِدْتُمَا',
      '3md': 'زِيدَا',
      '3fd': 'زِيدَتَا',
      '1p': 'زِدْنَا',
      '2mp': 'زِدْتُمْ',
      '2fp': 'زِدْتُنَّ',
      '3mp': 'زِيدُوا',
      '3fp': 'زِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('zyd-1')!, 'indicative')).toEqualT({
      '1s': 'أُزَادُ',
      '2ms': 'تُزَادُ',
      '2fs': 'تُزَادِينَ',
      '3ms': 'يُزَادُ',
      '3fs': 'تُزَادُ',
      '2d': 'تُزَادَانِ',
      '3md': 'يُزَادَانِ',
      '3fd': 'تُزَادَانِ',
      '1p': 'نُزَادُ',
      '2mp': 'تُزَادُونَ',
      '2fp': 'تُزَدْنَ',
      '3mp': 'يُزَادُونَ',
      '3fp': 'يُزَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zyd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُزَادَ',
      '2ms': 'تُزَادَ',
      '2fs': 'تُزَادِي',
      '3ms': 'يُزَادَ',
      '3fs': 'تُزَادَ',
      '2d': 'تُزَادَا',
      '3md': 'يُزَادَا',
      '3fd': 'تُزَادَا',
      '1p': 'نُزَادَ',
      '2mp': 'تُزَادُوا',
      '2fp': 'تُزَدْنَ',
      '3mp': 'يُزَادُوا',
      '3fp': 'يُزَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('zyd-1')!, 'jussive')).toEqualT({
      '1s': 'أُزَدْ',
      '2ms': 'تُزَدْ',
      '2fs': 'تُزَادِي',
      '3ms': 'يُزَدْ',
      '3fs': 'تُزَدْ',
      '2d': 'تُزَادَا',
      '3md': 'يُزَادَا',
      '3fd': 'تُزَادَا',
      '1p': 'نُزَدْ',
      '2mp': 'تُزَادُوا',
      '2fp': 'تُزَدْنَ',
      '3mp': 'يُزَادُوا',
      '3fp': 'يُزَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('zyd-1')!)).toEqualT('زَائِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('zyd-1')!)).toEqualT('مَزِيد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('zyd-1')!)).toEqualT(['زِيَادَة', 'زَيْد'])
  })
})
