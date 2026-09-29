import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wEd-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wEd-3')!)).toEqualT({
      '1s': 'وَاعَدْتُ',
      '2ms': 'وَاعَدْتَ',
      '2fs': 'وَاعَدْتِ',
      '3ms': 'وَاعَدَ',
      '3fs': 'وَاعَدَتْ',
      '2d': 'وَاعَدْتُمَا',
      '3md': 'وَاعَدَا',
      '3fd': 'وَاعَدَتَا',
      '1p': 'وَاعَدْنَا',
      '2mp': 'وَاعَدْتُمْ',
      '2fp': 'وَاعَدْتُنَّ',
      '3mp': 'وَاعَدُوا',
      '3fp': 'وَاعَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wEd-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَاعِدُ',
      '2ms': 'تُوَاعِدُ',
      '2fs': 'تُوَاعِدِينَ',
      '3ms': 'يُوَاعِدُ',
      '3fs': 'تُوَاعِدُ',
      '2d': 'تُوَاعِدَانِ',
      '3md': 'يُوَاعِدَانِ',
      '3fd': 'تُوَاعِدَانِ',
      '1p': 'نُوَاعِدُ',
      '2mp': 'تُوَاعِدُونَ',
      '2fp': 'تُوَاعِدْنَ',
      '3mp': 'يُوَاعِدُونَ',
      '3fp': 'يُوَاعِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wEd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَاعِدَ',
      '2ms': 'تُوَاعِدَ',
      '2fs': 'تُوَاعِدِي',
      '3ms': 'يُوَاعِدَ',
      '3fs': 'تُوَاعِدَ',
      '2d': 'تُوَاعِدَا',
      '3md': 'يُوَاعِدَا',
      '3fd': 'تُوَاعِدَا',
      '1p': 'نُوَاعِدَ',
      '2mp': 'تُوَاعِدُوا',
      '2fp': 'تُوَاعِدْنَ',
      '3mp': 'يُوَاعِدُوا',
      '3fp': 'يُوَاعِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wEd-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَاعِدْ',
      '2ms': 'تُوَاعِدْ',
      '2fs': 'تُوَاعِدِي',
      '3ms': 'يُوَاعِدْ',
      '3fs': 'تُوَاعِدْ',
      '2d': 'تُوَاعِدَا',
      '3md': 'يُوَاعِدَا',
      '3fd': 'تُوَاعِدَا',
      '1p': 'نُوَاعِدْ',
      '2mp': 'تُوَاعِدُوا',
      '2fp': 'تُوَاعِدْنَ',
      '3mp': 'يُوَاعِدُوا',
      '3fp': 'يُوَاعِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wEd-3')!)).toMatchObjectT({
      '2ms': 'وَاعِدْ',
      '2fs': 'وَاعِدِي',
      '2d': 'وَاعِدَا',
      '2mp': 'وَاعِدُوا',
      '2fp': 'وَاعِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wEd-3')!)).toEqualT({
      '1s': 'وُوعِدْتُ',
      '2ms': 'وُوعِدْتَ',
      '2fs': 'وُوعِدْتِ',
      '3ms': 'وُوعِدَ',
      '3fs': 'وُوعِدَتْ',
      '2d': 'وُوعِدْتُمَا',
      '3md': 'وُوعِدَا',
      '3fd': 'وُوعِدَتَا',
      '1p': 'وُوعِدْنَا',
      '2mp': 'وُوعِدْتُمْ',
      '2fp': 'وُوعِدْتُنَّ',
      '3mp': 'وُوعِدُوا',
      '3fp': 'وُوعِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wEd-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَاعَدُ',
      '2ms': 'تُوَاعَدُ',
      '2fs': 'تُوَاعَدِينَ',
      '3ms': 'يُوَاعَدُ',
      '3fs': 'تُوَاعَدُ',
      '2d': 'تُوَاعَدَانِ',
      '3md': 'يُوَاعَدَانِ',
      '3fd': 'تُوَاعَدَانِ',
      '1p': 'نُوَاعَدُ',
      '2mp': 'تُوَاعَدُونَ',
      '2fp': 'تُوَاعَدْنَ',
      '3mp': 'يُوَاعَدُونَ',
      '3fp': 'يُوَاعَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wEd-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَاعَدَ',
      '2ms': 'تُوَاعَدَ',
      '2fs': 'تُوَاعَدِي',
      '3ms': 'يُوَاعَدَ',
      '3fs': 'تُوَاعَدَ',
      '2d': 'تُوَاعَدَا',
      '3md': 'يُوَاعَدَا',
      '3fd': 'تُوَاعَدَا',
      '1p': 'نُوَاعَدَ',
      '2mp': 'تُوَاعَدُوا',
      '2fp': 'تُوَاعَدْنَ',
      '3mp': 'يُوَاعَدُوا',
      '3fp': 'يُوَاعَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wEd-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَاعَدْ',
      '2ms': 'تُوَاعَدْ',
      '2fs': 'تُوَاعَدِي',
      '3ms': 'يُوَاعَدْ',
      '3fs': 'تُوَاعَدْ',
      '2d': 'تُوَاعَدَا',
      '3md': 'يُوَاعَدَا',
      '3fd': 'تُوَاعَدَا',
      '1p': 'نُوَاعَدْ',
      '2mp': 'تُوَاعَدُوا',
      '2fp': 'تُوَاعَدْنَ',
      '3mp': 'يُوَاعَدُوا',
      '3fp': 'يُوَاعَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wEd-3')!)).toEqualT('مُوَاعِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wEd-3')!)).toEqualT('مُوَاعَد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wEd-3')!))).toEqualT(new Set(['مُوَاعَدَة']))
  })
})
