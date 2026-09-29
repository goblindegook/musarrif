import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Dyq-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Dyq-3')!)).toEqualT({
      '1s': 'ضَايَقْتُ',
      '2ms': 'ضَايَقْتَ',
      '2fs': 'ضَايَقْتِ',
      '3ms': 'ضَايَقَ',
      '3fs': 'ضَايَقَتْ',
      '2d': 'ضَايَقْتُمَا',
      '3md': 'ضَايَقَا',
      '3fd': 'ضَايَقَتَا',
      '1p': 'ضَايَقْنَا',
      '2mp': 'ضَايَقْتُمْ',
      '2fp': 'ضَايَقْتُنَّ',
      '3mp': 'ضَايَقُوا',
      '3fp': 'ضَايَقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-3')!, 'indicative')).toEqualT({
      '1s': 'أُضَايِقُ',
      '2ms': 'تُضَايِقُ',
      '2fs': 'تُضَايِقِينَ',
      '3ms': 'يُضَايِقُ',
      '3fs': 'تُضَايِقُ',
      '2d': 'تُضَايِقَانِ',
      '3md': 'يُضَايِقَانِ',
      '3fd': 'تُضَايِقَانِ',
      '1p': 'نُضَايِقُ',
      '2mp': 'تُضَايِقُونَ',
      '2fp': 'تُضَايِقْنَ',
      '3mp': 'يُضَايِقُونَ',
      '3fp': 'يُضَايِقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُضَايِقَ',
      '2ms': 'تُضَايِقَ',
      '2fs': 'تُضَايِقِي',
      '3ms': 'يُضَايِقَ',
      '3fs': 'تُضَايِقَ',
      '2d': 'تُضَايِقَا',
      '3md': 'يُضَايِقَا',
      '3fd': 'تُضَايِقَا',
      '1p': 'نُضَايِقَ',
      '2mp': 'تُضَايِقُوا',
      '2fp': 'تُضَايِقْنَ',
      '3mp': 'يُضَايِقُوا',
      '3fp': 'يُضَايِقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Dyq-3')!, 'jussive')).toEqualT({
      '1s': 'أُضَايِقْ',
      '2ms': 'تُضَايِقْ',
      '2fs': 'تُضَايِقِي',
      '3ms': 'يُضَايِقْ',
      '3fs': 'تُضَايِقْ',
      '2d': 'تُضَايِقَا',
      '3md': 'يُضَايِقَا',
      '3fd': 'تُضَايِقَا',
      '1p': 'نُضَايِقْ',
      '2mp': 'تُضَايِقُوا',
      '2fp': 'تُضَايِقْنَ',
      '3mp': 'يُضَايِقُوا',
      '3fp': 'يُضَايِقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Dyq-3')!)).toMatchObjectT({
      '2ms': 'ضَايِقْ',
      '2fs': 'ضَايِقِي',
      '2d': 'ضَايِقَا',
      '2mp': 'ضَايِقُوا',
      '2fp': 'ضَايِقْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Dyq-3')!)).toEqualT({
      '1s': 'ضُويِقْتُ',
      '2ms': 'ضُويِقْتَ',
      '2fs': 'ضُويِقْتِ',
      '3ms': 'ضُويِقَ',
      '3fs': 'ضُويِقَتْ',
      '2d': 'ضُويِقْتُمَا',
      '3md': 'ضُويِقَا',
      '3fd': 'ضُويِقَتَا',
      '1p': 'ضُويِقْنَا',
      '2mp': 'ضُويِقْتُمْ',
      '2fp': 'ضُويِقْتُنَّ',
      '3mp': 'ضُويِقُوا',
      '3fp': 'ضُويِقْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dyq-3')!, 'indicative')).toEqualT({
      '1s': 'أُضَايَقُ',
      '2ms': 'تُضَايَقُ',
      '2fs': 'تُضَايَقِينَ',
      '3ms': 'يُضَايَقُ',
      '3fs': 'تُضَايَقُ',
      '2d': 'تُضَايَقَانِ',
      '3md': 'يُضَايَقَانِ',
      '3fd': 'تُضَايَقَانِ',
      '1p': 'نُضَايَقُ',
      '2mp': 'تُضَايَقُونَ',
      '2fp': 'تُضَايَقْنَ',
      '3mp': 'يُضَايَقُونَ',
      '3fp': 'يُضَايَقْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dyq-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُضَايَقَ',
      '2ms': 'تُضَايَقَ',
      '2fs': 'تُضَايَقِي',
      '3ms': 'يُضَايَقَ',
      '3fs': 'تُضَايَقَ',
      '2d': 'تُضَايَقَا',
      '3md': 'يُضَايَقَا',
      '3fd': 'تُضَايَقَا',
      '1p': 'نُضَايَقَ',
      '2mp': 'تُضَايَقُوا',
      '2fp': 'تُضَايَقْنَ',
      '3mp': 'يُضَايَقُوا',
      '3fp': 'يُضَايَقْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dyq-3')!, 'jussive')).toEqualT({
      '1s': 'أُضَايَقْ',
      '2ms': 'تُضَايَقْ',
      '2fs': 'تُضَايَقِي',
      '3ms': 'يُضَايَقْ',
      '3fs': 'تُضَايَقْ',
      '2d': 'تُضَايَقَا',
      '3md': 'يُضَايَقَا',
      '3fd': 'تُضَايَقَا',
      '1p': 'نُضَايَقْ',
      '2mp': 'تُضَايَقُوا',
      '2fp': 'تُضَايَقْنَ',
      '3mp': 'يُضَايَقُوا',
      '3fp': 'يُضَايَقْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Dyq-3')!)).toEqualT('مُضَايِق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Dyq-3')!)).toEqualT('مُضَايَق')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Dyq-3')!))).toEqualT(new Set(['مُضَايَقَة']))
  })
})
