import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Dhy-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Dhy-3')!)).toEqualT({
      '1s': 'ضَاهَيْتُ',
      '2ms': 'ضَاهَيْتَ',
      '2fs': 'ضَاهَيْتِ',
      '3ms': 'ضَاهَى',
      '3fs': 'ضَاهَتْ',
      '2d': 'ضَاهَيْتُمَا',
      '3md': 'ضَاهَيَا',
      '3fd': 'ضَاهَتَا',
      '1p': 'ضَاهَيْنَا',
      '2mp': 'ضَاهَيْتُمْ',
      '2fp': 'ضَاهَيْتُنَّ',
      '3mp': 'ضَاهَوْا',
      '3fp': 'ضَاهَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Dhy-3')!, 'indicative')).toEqualT({
      '1s': 'أُضَاهِي',
      '2ms': 'تُضَاهِي',
      '2fs': 'تُضَاهِينَ',
      '3ms': 'يُضَاهِي',
      '3fs': 'تُضَاهِي',
      '2d': 'تُضَاهِيَانِ',
      '3md': 'يُضَاهِيَانِ',
      '3fd': 'تُضَاهِيَانِ',
      '1p': 'نُضَاهِي',
      '2mp': 'تُضَاهُونَ',
      '2fp': 'تُضَاهِينَ',
      '3mp': 'يُضَاهُونَ',
      '3fp': 'يُضَاهِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Dhy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُضَاهِيَ',
      '2ms': 'تُضَاهِيَ',
      '2fs': 'تُضَاهِي',
      '3ms': 'يُضَاهِيَ',
      '3fs': 'تُضَاهِيَ',
      '2d': 'تُضَاهِيَا',
      '3md': 'يُضَاهِيَا',
      '3fd': 'تُضَاهِيَا',
      '1p': 'نُضَاهِيَ',
      '2mp': 'تُضَاهُوا',
      '2fp': 'تُضَاهِينَ',
      '3mp': 'يُضَاهُوا',
      '3fp': 'يُضَاهِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Dhy-3')!, 'jussive')).toEqualT({
      '1s': 'أُضَاهِ',
      '2ms': 'تُضَاهِ',
      '2fs': 'تُضَاهِي',
      '3ms': 'يُضَاهِ',
      '3fs': 'تُضَاهِ',
      '2d': 'تُضَاهِيَا',
      '3md': 'يُضَاهِيَا',
      '3fd': 'تُضَاهِيَا',
      '1p': 'نُضَاهِ',
      '2mp': 'تُضَاهُوا',
      '2fp': 'تُضَاهِينَ',
      '3mp': 'يُضَاهُوا',
      '3fp': 'يُضَاهِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Dhy-3')!)).toMatchObjectT({
      '2ms': 'ضَاهِ',
      '2fs': 'ضَاهِي',
      '2d': 'ضَاهِيَا',
      '2mp': 'ضَاهُوا',
      '2fp': 'ضَاهِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Dhy-3')!)).toEqualT({
      '1s': 'ضُوهِيتُ',
      '2ms': 'ضُوهِيتَ',
      '2fs': 'ضُوهِيتِ',
      '3ms': 'ضُوهِيَ',
      '3fs': 'ضُوهِيَتْ',
      '2d': 'ضُوهِيتُمَا',
      '3md': 'ضُوهِيَا',
      '3fd': 'ضُوهِيَتَا',
      '1p': 'ضُوهِينَا',
      '2mp': 'ضُوهِيتُمْ',
      '2fp': 'ضُوهِيتُنَّ',
      '3mp': 'ضُوهُوا',
      '3fp': 'ضُوهِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dhy-3')!, 'indicative')).toEqualT({
      '1s': 'أُضَاهَى',
      '2ms': 'تُضَاهَى',
      '2fs': 'تُضَاهَيْنَ',
      '3ms': 'يُضَاهَى',
      '3fs': 'تُضَاهَى',
      '2d': 'تُضَاهَيَانِ',
      '3md': 'يُضَاهَيَانِ',
      '3fd': 'تُضَاهَيَانِ',
      '1p': 'نُضَاهَى',
      '2mp': 'تُضَاهَوْنَ',
      '2fp': 'تُضَاهَيْنَ',
      '3mp': 'يُضَاهَوْنَ',
      '3fp': 'يُضَاهَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dhy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُضَاهَى',
      '2ms': 'تُضَاهَى',
      '2fs': 'تُضَاهَيْ',
      '3ms': 'يُضَاهَى',
      '3fs': 'تُضَاهَى',
      '2d': 'تُضَاهَيَا',
      '3md': 'يُضَاهَيَا',
      '3fd': 'تُضَاهَيَا',
      '1p': 'نُضَاهَى',
      '2mp': 'تُضَاهَوْا',
      '2fp': 'تُضَاهَيْنَ',
      '3mp': 'يُضَاهَوْا',
      '3fp': 'يُضَاهَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dhy-3')!, 'jussive')).toEqualT({
      '1s': 'أُضَاهَ',
      '2ms': 'تُضَاهَ',
      '2fs': 'تُضَاهَيْ',
      '3ms': 'يُضَاهَ',
      '3fs': 'تُضَاهَ',
      '2d': 'تُضَاهَيَا',
      '3md': 'يُضَاهَيَا',
      '3fd': 'تُضَاهَيَا',
      '1p': 'نُضَاهَ',
      '2mp': 'تُضَاهَوْا',
      '2fp': 'تُضَاهَيْنَ',
      '3mp': 'يُضَاهَوْا',
      '3fp': 'يُضَاهَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Dhy-3')!)).toEqualT('مُضَاهٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Dhy-3')!)).toEqualT('مُضَاهًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Dhy-3')!))).toEqualT(new Set(['مُضَاهَاة']))
  })
})
