import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wld-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wld-4')!)).toEqualT({
      '1s': 'أَوْلَدْتُ',
      '2ms': 'أَوْلَدْتَ',
      '2fs': 'أَوْلَدْتِ',
      '3ms': 'أَوْلَدَ',
      '3fs': 'أَوْلَدَتْ',
      '2d': 'أَوْلَدْتُمَا',
      '3md': 'أَوْلَدَا',
      '3fd': 'أَوْلَدَتَا',
      '1p': 'أَوْلَدْنَا',
      '2mp': 'أَوْلَدْتُمْ',
      '2fp': 'أَوْلَدْتُنَّ',
      '3mp': 'أَوْلَدُوا',
      '3fp': 'أَوْلَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wld-4')!, 'indicative')).toEqualT({
      '1s': 'أُولِدُ',
      '2ms': 'تُولِدُ',
      '2fs': 'تُولِدِينَ',
      '3ms': 'يُولِدُ',
      '3fs': 'تُولِدُ',
      '2d': 'تُولِدَانِ',
      '3md': 'يُولِدَانِ',
      '3fd': 'تُولِدَانِ',
      '1p': 'نُولِدُ',
      '2mp': 'تُولِدُونَ',
      '2fp': 'تُولِدْنَ',
      '3mp': 'يُولِدُونَ',
      '3fp': 'يُولِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wld-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُولِدَ',
      '2ms': 'تُولِدَ',
      '2fs': 'تُولِدِي',
      '3ms': 'يُولِدَ',
      '3fs': 'تُولِدَ',
      '2d': 'تُولِدَا',
      '3md': 'يُولِدَا',
      '3fd': 'تُولِدَا',
      '1p': 'نُولِدَ',
      '2mp': 'تُولِدُوا',
      '2fp': 'تُولِدْنَ',
      '3mp': 'يُولِدُوا',
      '3fp': 'يُولِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wld-4')!, 'jussive')).toEqualT({
      '1s': 'أُولِدْ',
      '2ms': 'تُولِدْ',
      '2fs': 'تُولِدِي',
      '3ms': 'يُولِدْ',
      '3fs': 'تُولِدْ',
      '2d': 'تُولِدَا',
      '3md': 'يُولِدَا',
      '3fd': 'تُولِدَا',
      '1p': 'نُولِدْ',
      '2mp': 'تُولِدُوا',
      '2fp': 'تُولِدْنَ',
      '3mp': 'يُولِدُوا',
      '3fp': 'يُولِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wld-4')!)).toMatchObjectT({
      '2ms': 'أَوْلِدْ',
      '2fs': 'أَوْلِدِي',
      '2d': 'أَوْلِدَا',
      '2mp': 'أَوْلِدُوا',
      '2fp': 'أَوْلِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wld-4')!)).toEqualT({
      '1s': 'أُولِدْتُ',
      '2ms': 'أُولِدْتَ',
      '2fs': 'أُولِدْتِ',
      '3ms': 'أُولِدَ',
      '3fs': 'أُولِدَتْ',
      '2d': 'أُولِدْتُمَا',
      '3md': 'أُولِدَا',
      '3fd': 'أُولِدَتَا',
      '1p': 'أُولِدْنَا',
      '2mp': 'أُولِدْتُمْ',
      '2fp': 'أُولِدْتُنَّ',
      '3mp': 'أُولِدُوا',
      '3fp': 'أُولِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wld-4')!, 'indicative')).toEqualT({
      '1s': 'أُولَدُ',
      '2ms': 'تُولَدُ',
      '2fs': 'تُولَدِينَ',
      '3ms': 'يُولَدُ',
      '3fs': 'تُولَدُ',
      '2d': 'تُولَدَانِ',
      '3md': 'يُولَدَانِ',
      '3fd': 'تُولَدَانِ',
      '1p': 'نُولَدُ',
      '2mp': 'تُولَدُونَ',
      '2fp': 'تُولَدْنَ',
      '3mp': 'يُولَدُونَ',
      '3fp': 'يُولَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wld-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُولَدَ',
      '2ms': 'تُولَدَ',
      '2fs': 'تُولَدِي',
      '3ms': 'يُولَدَ',
      '3fs': 'تُولَدَ',
      '2d': 'تُولَدَا',
      '3md': 'يُولَدَا',
      '3fd': 'تُولَدَا',
      '1p': 'نُولَدَ',
      '2mp': 'تُولَدُوا',
      '2fp': 'تُولَدْنَ',
      '3mp': 'يُولَدُوا',
      '3fp': 'يُولَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wld-4')!, 'jussive')).toEqualT({
      '1s': 'أُولَدْ',
      '2ms': 'تُولَدْ',
      '2fs': 'تُولَدِي',
      '3ms': 'يُولَدْ',
      '3fs': 'تُولَدْ',
      '2d': 'تُولَدَا',
      '3md': 'يُولَدَا',
      '3fd': 'تُولَدَا',
      '1p': 'نُولَدْ',
      '2mp': 'تُولَدُوا',
      '2fp': 'تُولَدْنَ',
      '3mp': 'يُولَدُوا',
      '3fp': 'يُولَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wld-4')!)).toEqualT('مُولِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wld-4')!)).toEqualT('مُولَد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wld-4')!)).toEqualT(['إِيلَاد'])
  })
})
