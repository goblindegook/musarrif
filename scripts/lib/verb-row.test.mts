import { describe, expect, test } from 'vitest'
import { synthesizeVerb } from '../../src/paradigms/verbs.ts'
import type { ParsedParadigms } from './paradigms.mts'
import { buildRootEntry, type RootEntry, upsertRootEntry } from './verb-row.mts'

const FULL_PASSIVE = {
  '1s': ['كُتِبْتُ'],
  '1p': ['كُتِبْنَا'],
  '2ms': ['كُتِبْتَ'],
  '2fs': ['كُتِبْتِ'],
  '2d': ['كُتِبْتُمَا'],
  '2mp': ['كُتِبْتُمْ'],
  '2fp': ['كُتِبْتُنَّ'],
  '3ms': ['كُتِبَ'],
  '3fs': ['كُتِبَتْ'],
  '3md': ['كُتِبَا'],
  '3fd': ['كُتِبَتَا'],
  '3mp': ['كُتِبُوا'],
  '3fp': ['كُتِبْنَ'],
}

function parsed(overrides: Partial<ParsedParadigms> = {}): ParsedParadigms {
  return {
    paradigms: { 'passive past': FULL_PASSIVE, ...overrides.paradigms },
    nominals: { activeParticiple: 'كَاتِب', passiveParticiple: 'مَكْتُوب', ...overrides.nominals },
  }
}

describe('buildRootEntry', () => {
  test('matches Form I masdars to patterns in source order', () => {
    const verb = synthesizeVerb('كتب', 1, 'a-u')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'] } }))).toEqual({
      root: 'ktb',
      form: 1,
      vowels: 'a-u',
      masdars: ['fi3aala', 'fa3l', 'fi3aal'],
    })
  })

  test('records masdars with no matching pattern as transliterated lexical masdars', () => {
    const verb = synthesizeVerb('ءبي', 1, 'a-a')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['إِبَاء', 'إِبَاءَة'] } }))).toMatchObject({
      masdars: ['fi3aal'],
      lexicalMasdars: ["<ibaA'ap"],
    })
  })

  test('marks a verb with no passive paradigm as having no passive voice', () => {
    const verb = synthesizeVerb('ذهب', 1, 'a-a')

    expect(buildRootEntry(verb, { paradigms: {}, nominals: { activeParticiple: 'ذَاهِب' } })).toMatchObject({
      passiveVoice: 'none',
      noPassiveParticiple: true,
    })
  })

  test('marks a verb with a third person masculine singular passive only as impersonal', () => {
    const verb = synthesizeVerb('شعر', 1, 'a-u')

    expect(buildRootEntry(verb, parsed({ paradigms: { 'passive past': { '3ms': ['شُعِرَ'] } } }))).toMatchObject({
      passiveVoice: 'impersonal',
    })
  })

  test('omits masdar patterns for forms beyond the first', () => {
    const verb = synthesizeVerb('كتب', 8)

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['اِكْتِتَاب'] } }))).toEqual({
      root: 'ktb',
      form: 8,
    })
  })

  test('keeps fields the source cannot describe', () => {
    const verb = synthesizeVerb('كتب', 1, 'a-u')
    const existing: RootEntry = { root: 'ktb', form: 1, vowels: 'a-a', valency: [2, 3], contractedImperative: true }

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كَتْب'] } }), existing)).toEqual({
      root: 'ktb',
      form: 1,
      vowels: 'a-u',
      contractedImperative: true,
      masdars: ['fa3l'],
      valency: [2, 3],
    })
  })
})

describe('upsertRootEntry', () => {
  test('replaces the entry with the same root and form', () => {
    const roots: RootEntry[] = [
      { root: 'ktb', form: 1, vowels: 'a-a' },
      { root: 'ktb', form: 2 },
    ]

    expect(upsertRootEntry(roots, { root: 'ktb', form: 1, vowels: 'a-u' })).toEqual([
      { root: 'ktb', form: 1, vowels: 'a-u' },
      { root: 'ktb', form: 2 },
    ])
  })

  test('inserts a new entry in root and form order', () => {
    const roots: RootEntry[] = [
      { root: 'ktb', form: 2 },
      { root: 'ktb', form: 1, vowels: 'a-u' },
    ]

    expect(upsertRootEntry(roots, { root: 'drs', form: 1, vowels: 'a-u' })).toEqual([
      { root: 'drs', form: 1, vowels: 'a-u' },
      { root: 'ktb', form: 1, vowels: 'a-u' },
      { root: 'ktb', form: 2 },
    ])
  })
})
