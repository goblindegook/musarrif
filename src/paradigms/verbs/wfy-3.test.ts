import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-3', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-3')!)).toEqualT({
      '1s': 'وَافَيْتُ',
      '2ms': 'وَافَيْتَ',
      '2fs': 'وَافَيْتِ',
      '3ms': 'وَافَى',
      '3fs': 'وَافَتْ',
      '2d': 'وَافَيْتُمَا',
      '3md': 'وَافَيَا',
      '3fd': 'وَافَتَا',
      '1p': 'وَافَيْنَا',
      '2mp': 'وَافَيْتُمْ',
      '2fp': 'وَافَيْتُنَّ',
      '3mp': 'وَافَوْا',
      '3fp': 'وَافَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَافِي',
      '2ms': 'تُوَافِي',
      '2fs': 'تُوَافِينَ',
      '3ms': 'يُوَافِي',
      '3fs': 'تُوَافِي',
      '2d': 'تُوَافِيَانِ',
      '3md': 'يُوَافِيَانِ',
      '3fd': 'تُوَافِيَانِ',
      '1p': 'نُوَافِي',
      '2mp': 'تُوَافُونَ',
      '2fp': 'تُوَافِينَ',
      '3mp': 'يُوَافُونَ',
      '3fp': 'يُوَافِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَافِيَ',
      '2ms': 'تُوَافِيَ',
      '2fs': 'تُوَافِي',
      '3ms': 'يُوَافِيَ',
      '3fs': 'تُوَافِيَ',
      '2d': 'تُوَافِيَا',
      '3md': 'يُوَافِيَا',
      '3fd': 'تُوَافِيَا',
      '1p': 'نُوَافِيَ',
      '2mp': 'تُوَافُوا',
      '2fp': 'تُوَافِينَ',
      '3mp': 'يُوَافُوا',
      '3fp': 'يُوَافِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَافِ',
      '2ms': 'تُوَافِ',
      '2fs': 'تُوَافِي',
      '3ms': 'يُوَافِ',
      '3fs': 'تُوَافِ',
      '2d': 'تُوَافِيَا',
      '3md': 'يُوَافِيَا',
      '3fd': 'تُوَافِيَا',
      '1p': 'نُوَافِ',
      '2mp': 'تُوَافُوا',
      '2fp': 'تُوَافِينَ',
      '3mp': 'يُوَافُوا',
      '3fp': 'يُوَافِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-3')!)).toMatchObjectT({
      '2ms': 'وَافِ',
      '2fs': 'وَافِي',
      '2d': 'وَافِيَا',
      '2mp': 'وَافُوا',
      '2fp': 'وَافِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-3')!)).toEqualT({
      '1s': 'وُوفِيتُ',
      '2ms': 'وُوفِيتَ',
      '2fs': 'وُوفِيتِ',
      '3ms': 'وُوفِيَ',
      '3fs': 'وُوفِيَتْ',
      '2d': 'وُوفِيتُمَا',
      '3md': 'وُوفِيَا',
      '3fd': 'وُوفِيَتَا',
      '1p': 'وُوفِينَا',
      '2mp': 'وُوفِيتُمْ',
      '2fp': 'وُوفِيتُنَّ',
      '3mp': 'وُوفُوا',
      '3fp': 'وُوفِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَافَى',
      '2ms': 'تُوَافَى',
      '2fs': 'تُوَافَيْنَ',
      '3ms': 'يُوَافَى',
      '3fs': 'تُوَافَى',
      '2d': 'تُوَافَيَانِ',
      '3md': 'يُوَافَيَانِ',
      '3fd': 'تُوَافَيَانِ',
      '1p': 'نُوَافَى',
      '2mp': 'تُوَافَوْنَ',
      '2fp': 'تُوَافَيْنَ',
      '3mp': 'يُوَافَوْنَ',
      '3fp': 'يُوَافَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَافَى',
      '2ms': 'تُوَافَى',
      '2fs': 'تُوَافَيْ',
      '3ms': 'يُوَافَى',
      '3fs': 'تُوَافَى',
      '2d': 'تُوَافَيَا',
      '3md': 'يُوَافَيَا',
      '3fd': 'تُوَافَيَا',
      '1p': 'نُوَافَى',
      '2mp': 'تُوَافَوْا',
      '2fp': 'تُوَافَيْنَ',
      '3mp': 'يُوَافَوْا',
      '3fp': 'يُوَافَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَافَ',
      '2ms': 'تُوَافَ',
      '2fs': 'تُوَافَيْ',
      '3ms': 'يُوَافَ',
      '3fs': 'تُوَافَ',
      '2d': 'تُوَافَيَا',
      '3md': 'يُوَافَيَا',
      '3fd': 'تُوَافَيَا',
      '1p': 'نُوَافَ',
      '2mp': 'تُوَافَوْا',
      '2fp': 'تُوَافَيْنَ',
      '3mp': 'يُوَافَوْا',
      '3fp': 'يُوَافَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-3')!)).toEqualT('مُوَافٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-3')!)).toEqualT('مُوَافًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-3')!)).toEqualT(['مُوَافَاة'])
  })
})
