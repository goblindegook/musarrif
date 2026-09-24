import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("Sd'-1-u-u (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Sd'-1-u-u")!)).toEqualT({
      '1s': 'صَدُؤْتُ',
      '2ms': 'صَدُؤْتَ',
      '2fs': 'صَدُؤْتِ',
      '3ms': 'صَدُؤَ',
      '3fs': 'صَدُؤَتْ',
      '2d': 'صَدُؤْتُمَا',
      '3md': 'صَدُؤَا',
      '3fd': 'صَدُؤَتَا',
      '1p': 'صَدُؤْنَا',
      '2mp': 'صَدُؤْتُمْ',
      '2fp': 'صَدُؤْتُنَّ',
      '3mp': 'صَدُؤُوا',
      '3fp': 'صَدُؤْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-u-u")!, 'indicative')).toEqualT({
      '1s': 'أَصْدُؤُ',
      '2ms': 'تَصْدُؤُ',
      '2fs': 'تَصْدُئِينَ',
      '3ms': 'يَصْدُؤُ',
      '3fs': 'تَصْدُؤُ',
      '2d': 'تَصْدُؤَانِ',
      '3md': 'يَصْدُؤَانِ',
      '3fd': 'تَصْدُؤَانِ',
      '1p': 'نَصْدُؤُ',
      '2mp': 'تَصْدُؤُونَ',
      '2fp': 'تَصْدُؤْنَ',
      '3mp': 'يَصْدُؤُونَ',
      '3fp': 'يَصْدُؤْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-u-u")!, 'subjunctive')).toEqualT({
      '1s': 'أَصْدُؤَ',
      '2ms': 'تَصْدُؤَ',
      '2fs': 'تَصْدُئِي',
      '3ms': 'يَصْدُؤَ',
      '3fs': 'تَصْدُؤَ',
      '2d': 'تَصْدُؤَا',
      '3md': 'يَصْدُؤَا',
      '3fd': 'تَصْدُؤَا',
      '1p': 'نَصْدُؤَ',
      '2mp': 'تَصْدُؤُوا',
      '2fp': 'تَصْدُؤْنَ',
      '3mp': 'يَصْدُؤُوا',
      '3fp': 'يَصْدُؤْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Sd'-1-u-u")!, 'jussive')).toEqualT({
      '1s': 'أَصْدُؤْ',
      '2ms': 'تَصْدُؤْ',
      '2fs': 'تَصْدُئِي',
      '3ms': 'يَصْدُؤْ',
      '3fs': 'تَصْدُؤْ',
      '2d': 'تَصْدُؤَا',
      '3md': 'يَصْدُؤَا',
      '3fd': 'تَصْدُؤَا',
      '1p': 'نَصْدُؤْ',
      '2mp': 'تَصْدُؤُوا',
      '2fp': 'تَصْدُؤْنَ',
      '3mp': 'يَصْدُؤُوا',
      '3fp': 'يَصْدُؤْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Sd'-1-u-u")!)).toMatchObjectT({
      '2ms': 'اُصْدُؤْ',
      '2fs': 'اُصْدُئِي',
      '2d': 'اُصْدُؤَا',
      '2mp': 'اُصْدُؤُوا',
      '2fp': 'اُصْدُؤْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Sd'-1-u-u")!)).toEqualT('صَدِئ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Sd'-1-u-u")!))).toEqualT(new Set(['صَدَاءَة']))
  })
})
