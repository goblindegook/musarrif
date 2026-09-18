import { describe, expect, test } from 'vitest'
import { findMissingTranslations } from './missing-translations.mts'

const verbs = [
  { id: 'ktb-1', rootId: 'ktb' },
  { id: 'ktb-2', rootId: 'ktb' },
  { id: 'nSr-1', rootId: 'nSr' },
]

describe('findMissingTranslations', () => {
  test('lists a verb id once per locale it is missing from', () => {
    const result = findMissingTranslations(verbs, {
      en: { verbs: { 'ktb-1': 'to write', 'ktb-2': 'to correspond', 'nSr-1': 'to help' }, roots: {} },
      it: { verbs: { 'ktb-1': 'scrivere', 'nSr-1': 'aiutare' }, roots: {} },
      pt: { verbs: { 'ktb-1': 'escrever', 'ktb-2': 'corresponder', 'nSr-1': 'ajudar' }, roots: {} },
      ar: { roots: {} },
    })

    expect(result.verbs).toEqual([{ id: 'ktb-2', missingIn: ['it'] }])
  })

  test('lists a root once per locale it is missing from, deduplicated across its forms', () => {
    const result = findMissingTranslations(verbs, {
      en: { verbs: {}, roots: { ktb: 'writing' } },
      it: { verbs: {}, roots: {} },
      pt: { verbs: {}, roots: { ktb: 'escrita', nSr: 'vitória' } },
      ar: { roots: { nSr: 'نَصْر' } },
    })

    expect(result.roots).toEqual([
      { rootId: 'ktb', missingIn: ['it', 'ar'] },
      { rootId: 'nSr', missingIn: ['en', 'it'] },
    ])
  })

  test('reports nothing missing when every id and root is translated everywhere', () => {
    const result = findMissingTranslations(verbs, {
      en: { verbs: { 'ktb-1': 'a', 'ktb-2': 'b', 'nSr-1': 'c' }, roots: { ktb: 'x', nSr: 'y' } },
      it: { verbs: { 'ktb-1': 'a', 'ktb-2': 'b', 'nSr-1': 'c' }, roots: { ktb: 'x', nSr: 'y' } },
      pt: { verbs: { 'ktb-1': 'a', 'ktb-2': 'b', 'nSr-1': 'c' }, roots: { ktb: 'x', nSr: 'y' } },
      ar: { roots: { ktb: 'x', nSr: 'y' } },
    })

    expect(result).toEqual({ verbs: [], roots: [] })
  })
})
