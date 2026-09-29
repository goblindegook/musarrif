import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfq-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfq-1')!)).toEqualT({
      '1s': 'وَفِقْتُ',
      '2ms': 'وَفِقْتَ',
      '2fs': 'وَفِقْتِ',
      '3ms': 'وَفِقَ',
      '3fs': 'وَفِقَتْ',
      '2d': 'وَفِقْتُمَا',
      '3md': 'وَفِقَا',
      '3fd': 'وَفِقَتَا',
      '1p': 'وَفِقْنَا',
      '2mp': 'وَفِقْتُمْ',
      '2fp': 'وَفِقْتُنَّ',
      '3mp': 'وَفِقُوا',
      '3fp': 'وَفِقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfq-1')!, 'indicative')).toEqualT({
      '1s': 'أَفِقُ',
      '2ms': 'تَفِقُ',
      '2fs': 'تَفِقِينَ',
      '3ms': 'يَفِقُ',
      '3fs': 'تَفِقُ',
      '2d': 'تَفِقَانِ',
      '3md': 'يَفِقَانِ',
      '3fd': 'تَفِقَانِ',
      '1p': 'نَفِقُ',
      '2mp': 'تَفِقُونَ',
      '2fp': 'تَفِقْنَ',
      '3mp': 'يَفِقُونَ',
      '3fp': 'يَفِقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfq-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَفِقَ',
      '2ms': 'تَفِقَ',
      '2fs': 'تَفِقِي',
      '3ms': 'يَفِقَ',
      '3fs': 'تَفِقَ',
      '2d': 'تَفِقَا',
      '3md': 'يَفِقَا',
      '3fd': 'تَفِقَا',
      '1p': 'نَفِقَ',
      '2mp': 'تَفِقُوا',
      '2fp': 'تَفِقْنَ',
      '3mp': 'يَفِقُوا',
      '3fp': 'يَفِقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfq-1')!, 'jussive')).toEqualT({
      '1s': 'أَفِقْ',
      '2ms': 'تَفِقْ',
      '2fs': 'تَفِقِي',
      '3ms': 'يَفِقْ',
      '3fs': 'تَفِقْ',
      '2d': 'تَفِقَا',
      '3md': 'يَفِقَا',
      '3fd': 'تَفِقَا',
      '1p': 'نَفِقْ',
      '2mp': 'تَفِقُوا',
      '2fp': 'تَفِقْنَ',
      '3mp': 'يَفِقُوا',
      '3fp': 'يَفِقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfq-1')!)).toMatchObjectT({
      '2ms': 'فِقْ',
      '2fs': 'فِقِي',
      '2d': 'فِقَا',
      '2mp': 'فِقُوا',
      '2fp': 'فِقْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfq-1')!)).toEqualT({
      '1s': 'وُفِقْتُ',
      '2ms': 'وُفِقْتَ',
      '2fs': 'وُفِقْتِ',
      '3ms': 'وُفِقَ',
      '3fs': 'وُفِقَتْ',
      '2d': 'وُفِقْتُمَا',
      '3md': 'وُفِقَا',
      '3fd': 'وُفِقَتَا',
      '1p': 'وُفِقْنَا',
      '2mp': 'وُفِقْتُمْ',
      '2fp': 'وُفِقْتُنَّ',
      '3mp': 'وُفِقُوا',
      '3fp': 'وُفِقْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfq-1')!, 'indicative')).toEqualT({
      '1s': 'أُوفَقُ',
      '2ms': 'تُوفَقُ',
      '2fs': 'تُوفَقِينَ',
      '3ms': 'يُوفَقُ',
      '3fs': 'تُوفَقُ',
      '2d': 'تُوفَقَانِ',
      '3md': 'يُوفَقَانِ',
      '3fd': 'تُوفَقَانِ',
      '1p': 'نُوفَقُ',
      '2mp': 'تُوفَقُونَ',
      '2fp': 'تُوفَقْنَ',
      '3mp': 'يُوفَقُونَ',
      '3fp': 'يُوفَقْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfq-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُوفَقَ',
      '2ms': 'تُوفَقَ',
      '2fs': 'تُوفَقِي',
      '3ms': 'يُوفَقَ',
      '3fs': 'تُوفَقَ',
      '2d': 'تُوفَقَا',
      '3md': 'يُوفَقَا',
      '3fd': 'تُوفَقَا',
      '1p': 'نُوفَقَ',
      '2mp': 'تُوفَقُوا',
      '2fp': 'تُوفَقْنَ',
      '3mp': 'يُوفَقُوا',
      '3fp': 'يُوفَقْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfq-1')!, 'jussive')).toEqualT({
      '1s': 'أُوفَقْ',
      '2ms': 'تُوفَقْ',
      '2fs': 'تُوفَقِي',
      '3ms': 'يُوفَقْ',
      '3fs': 'تُوفَقْ',
      '2d': 'تُوفَقَا',
      '3md': 'يُوفَقَا',
      '3fd': 'تُوفَقَا',
      '1p': 'نُوفَقْ',
      '2mp': 'تُوفَقُوا',
      '2fp': 'تُوفَقْنَ',
      '3mp': 'يُوفَقُوا',
      '3fp': 'يُوفَقْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfq-1')!)).toEqualT('وَافِق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfq-1')!)).toEqualT('مَوْفُوق')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wfq-1')!))).toEqualT(new Set(['وَفْق']))
  })
})
