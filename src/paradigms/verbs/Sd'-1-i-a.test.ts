import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("Sd'-1-i-a (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Sd'-1-i-a")!)).toEqualT({
      '1s': 'صَدِئْتُ',
      '2ms': 'صَدِئْتَ',
      '2fs': 'صَدِئْتِ',
      '3ms': 'صَدِئَ',
      '3fs': 'صَدِئَتْ',
      '2d': 'صَدِئْتُمَا',
      '3md': 'صَدِئَا',
      '3fd': 'صَدِئَتَا',
      '1p': 'صَدِئْنَا',
      '2mp': 'صَدِئْتُمْ',
      '2fp': 'صَدِئْتُنَّ',
      '3mp': 'صَدِئُوا',
      '3fp': 'صَدِئْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-i-a")!, 'indicative')).toEqualT({
      '1s': 'أَصْدَأُ',
      '2ms': 'تَصْدَأُ',
      '2fs': 'تَصْدَئِينَ',
      '3ms': 'يَصْدَأُ',
      '3fs': 'تَصْدَأُ',
      '2d': 'تَصْدَآنِ',
      '3md': 'يَصْدَآنِ',
      '3fd': 'تَصْدَآنِ',
      '1p': 'نَصْدَأُ',
      '2mp': 'تَصْدَؤُونَ',
      '2fp': 'تَصْدَأْنَ',
      '3mp': 'يَصْدَؤُونَ',
      '3fp': 'يَصْدَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-i-a")!, 'subjunctive')).toEqualT({
      '1s': 'أَصْدَأَ',
      '2ms': 'تَصْدَأَ',
      '2fs': 'تَصْدَئِي',
      '3ms': 'يَصْدَأَ',
      '3fs': 'تَصْدَأَ',
      '2d': 'تَصْدَآ',
      '3md': 'يَصْدَآ',
      '3fd': 'تَصْدَآ',
      '1p': 'نَصْدَأَ',
      '2mp': 'تَصْدَؤُوا',
      '2fp': 'تَصْدَأْنَ',
      '3mp': 'يَصْدَؤُوا',
      '3fp': 'يَصْدَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-i-a")!, 'jussive')).toEqualT({
      '1s': 'أَصْدَأْ',
      '2ms': 'تَصْدَأْ',
      '2fs': 'تَصْدَئِي',
      '3ms': 'يَصْدَأْ',
      '3fs': 'تَصْدَأْ',
      '2d': 'تَصْدَآ',
      '3md': 'يَصْدَآ',
      '3fd': 'تَصْدَآ',
      '1p': 'نَصْدَأْ',
      '2mp': 'تَصْدَؤُوا',
      '2fp': 'تَصْدَأْنَ',
      '3mp': 'يَصْدَؤُوا',
      '3fp': 'يَصْدَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Sd'-1-i-a")!)).toMatchObjectT({
      '2ms': 'اِصْدَأْ',
      '2fs': 'اِصْدَئِي',
      '2d': 'اِصْدَآ',
      '2mp': 'اِصْدَؤُوا',
      '2fp': 'اِصْدَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Sd'-1-i-a")!)).toEqualT('صَدِئ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Sd'-1-i-a")!))).toEqualT(new Set(['صَدَأ']))
  })
})
