import { describe, expect, test } from 'vitest'
import { getVerb } from '../../src/paradigms/verbs.ts'
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
    const verb = getVerb('كتب', 1, 'a-u')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'] } }))).toEqual({
      root: 'ktb',
      form: 1,
      vowels: 'a-u',
      masdars: ['fi3aala', 'fa3l', 'fi3aal'],
    })
  })

  test('records masdars with no matching pattern as transliterated lexical masdars', () => {
    const verb = getVerb('ءبي', 1, 'a-a')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['إِبَاء', 'إِبَاءَة'] } }))).toMatchObject({
      masdars: ['fi3aal'],
      lexicalMasdars: ["<ibaA'ap"],
    })
  })

  test('marks a verb with no passive paradigm as having no passive voice', () => {
    const verb = getVerb('ذهب', 1, 'a-a')

    expect(buildRootEntry(verb, { paradigms: {}, nominals: { activeParticiple: 'ذَاهِب' } })).toMatchObject({
      passive: 'none',
    })
  })

  test('marks a verb with a third person masculine singular passive only as impersonal', () => {
    const verb = getVerb('شعر', 1, 'a-u')

    expect(buildRootEntry(verb, parsed({ paradigms: { 'passive past': { '3ms': ['شُعِرَ'] } } }))).toMatchObject({
      passive: 'impersonal',
    })
  })

  test('omits masdar patterns for forms beyond the first', () => {
    const verb = getVerb('كتب', 8)

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['اِكْتِتَاب'] } }))).toEqual({
      root: 'ktb',
      form: 8,
    })
  })

  test('keeps fields the source cannot describe', () => {
    const verb = getVerb('كتب', 1, 'a-u')
    const existing: RootEntry = { root: 'ktb', form: 1, vowels: 'a-u', valency: [2, 3], contractedImperative: true }

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كَتْب'] } }), existing)).toEqual({
      root: 'ktb',
      form: 1,
      vowels: 'a-u',
      contractedImperative: true,
      masdars: ['fa3l'],
      valency: [2, 3],
    })
  })

  test('drops fields belonging to the lexeme a changed vowel pattern replaces', () => {
    const verb = getVerb('كتب', 1, 'a-u')
    const existing: RootEntry = { root: 'ktb', form: 1, vowels: 'a-a', valency: [2, 3], lexicalActiveParticiple: 'x' }

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كَتْب'] } }), existing)).toEqual({
      root: 'ktb',
      form: 1,
      vowels: 'a-u',
      masdars: ['fa3l'],
    })
  })

  test('records an empty pattern list when every Form I masdar is lexical', () => {
    const verb = getVerb('حسب', 1, 'i-a')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['حِسْبَان', 'مَحْسَبَة'] } }))).toMatchObject({
      masdars: [],
      lexicalMasdars: ['HisobaAn', 'maHosabap'],
    })
  })

  test('reads a repeated source masdar once', () => {
    const verb = getVerb('كتب', 1, 'a-u')

    expect(buildRootEntry(verb, parsed({ nominals: { masdar: ['كَتْب', 'كَتْب'] } }))).toMatchObject({
      masdars: ['fa3l'],
    })
  })
})

describe('upsertRootEntry', () => {
  test('replaces the entry with the same root, form, and vowels', () => {
    const roots: RootEntry[] = [
      { root: 'ktb', form: 1, vowels: 'a-u', valency: [2] },
      { root: 'ktb', form: 2 },
    ]

    expect(upsertRootEntry(roots, { root: 'ktb', form: 1, vowels: 'a-u', masdars: ['fa3l'] })).toEqual([
      { root: 'ktb', form: 1, vowels: 'a-u', masdars: ['fa3l'] },
      { root: 'ktb', form: 2 },
    ])
  })

  test('adds a new Form I entry, in vowel order, when the root already has a different pattern', () => {
    const roots: RootEntry[] = [
      { root: 'Hsb', form: 1, vowels: 'i-a', masdars: [] },
      { root: 'Hsb', form: 3 },
    ]

    expect(upsertRootEntry(roots, { root: 'Hsb', form: 1, vowels: 'a-u', masdars: ['fa3l'] })).toEqual([
      { root: 'Hsb', form: 1, vowels: 'a-u', masdars: ['fa3l'] },
      { root: 'Hsb', form: 1, vowels: 'i-a', masdars: [] },
      { root: 'Hsb', form: 3 },
    ])
  })

  test("keeps a root's Form I entries ordered by vowels when a later-sorting pattern is added", () => {
    const roots: RootEntry[] = [{ root: 'jml', form: 1, vowels: 'a-u' }]

    expect(upsertRootEntry(roots, { root: 'jml', form: 1, vowels: 'u-u' })).toEqual([
      { root: 'jml', form: 1, vowels: 'a-u' },
      { root: 'jml', form: 1, vowels: 'u-u' },
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
