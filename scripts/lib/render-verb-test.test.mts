import { describe, expect, test } from 'vitest'
import { renderVerbTestFile } from './render-verb-test.mts'

const PARSED_FIXTURE = {
  paradigms: {
    'active past': {
      '1s': ['كَتَبْتُ'],
      '1p': ['كَتَبْنَا'],
      '2ms': ['كَتَبْتَ'],
      '2fs': ['كَتَبْتِ'],
      '2d': ['كَتَبْتُمَا'],
      '2mp': ['كَتَبْتُمْ'],
      '2fp': ['كَتَبْتُنَّ'],
      '3ms': ['كَتَبَ'],
      '3fs': ['كَتَبَتْ'],
      '3md': ['كَتَبَا'],
      '3fd': ['كَتَبَتَا'],
      '3mp': ['كَتَبُوا'],
      '3fp': ['كَتَبْنَ'],
    },
    'active imperative': {
      '2ms': ['اُكْتُبْ'],
      '2fs': ['اُكْتُبِي'],
      '2d': ['اُكْتُبَا'],
      '2mp': ['اُكْتُبُوا'],
      '2fp': ['اُكْتُبْنَ'],
    },
    'passive past': {
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
    },
  },
  nominals: {
    activeParticiple: 'كَاتِب',
    masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'],
    passiveParticiple: 'مَكْتُوب',
  },
} satisfies Parameters<typeof renderVerbTestFile>[1]

describe('renderVerbTestFile', () => {
  test('renders test blocks using the project matcher conventions', () => {
    const file = renderVerbTestFile('ktb-1', PARSED_FIXTURE, 'wiktionary')

    expect(file).not.toContain("const verb = getVerbById('ktb-1')!")
    expect(file).toContain('describe("ktb-1 (Wiktionary)", () => {')
    expect(file).toContain("test('active past', () => {")
    expect(file).toContain('expect(conjugatePast(getVerbById("ktb-1")!)).toEqualT({')
    expect(file).toContain("test('active imperative', () => {")
    expect(file).toContain('expect(conjugateImperative(getVerbById("ktb-1")!)).toMatchObjectT({')
    expect(file).toContain("test('active participle', () => {")
    expect(file).toContain("test('passive participle', () => {")
    expect(file).toContain("test('masdar', () => {")
    expect(file).toContain(
      "expect(new Set(deriveMasdar(getVerbById(\"ktb-1\")!))).toEqualT(new Set(['كِتَابَة', 'كَتْب', 'كِتَاب']))",
    )
  })

  test('renders valid string literals for slugs containing apostrophes', () => {
    const file = renderVerbTestFile("qr'-1", PARSED_FIXTURE, 'reverso')

    expect(file).toContain('describe("qr\'-1 (Reverso)", () => {')
    expect(file).toContain('getVerbById("qr\'-1")!')
  })

  test('renders valid getVerbById calls for slugs containing dollar-apostrophe replacement patterns', () => {
    const file = renderVerbTestFile(
      "n$'-4",
      {
        ...PARSED_FIXTURE,
        paradigms: {
          ...PARSED_FIXTURE.paradigms,
          'active present indicative': PARSED_FIXTURE.paradigms['active past'],
        },
      },
      'wiktionary',
    )

    expect(file).toContain("expect(conjugatePresentMood(getVerbById(\"n$'-4\")!, 'indicative')).toEqualT({")
  })

  test('labels the describe block with the ElixirFM source', () => {
    const file = renderVerbTestFile('ktb-1', PARSED_FIXTURE, 'elixirfm')

    expect(file).toContain('describe("ktb-1 (ElixirFM)", () => {')
  })

  test('renders paradigm slots with multiple forms as toBeOneOf while keeping toEqualT when every pronoun is present', () => {
    const file = renderVerbTestFile(
      'ktb-1',
      {
        ...PARSED_FIXTURE,
        paradigms: {
          ...PARSED_FIXTURE.paradigms,
          'active present jussive': {
            '1s': ['أَكْتُبْ'],
            '2ms': ['تَكْتُبْ'],
            '2fs': ['تَكْتُبِي'],
            '3ms': ['يَكْتُبْ', 'يَكْتُبِ', 'يَكْتُبِي'],
            '3fs': ['تَكْتُبْ'],
            '2d': ['تَكْتُبَا'],
            '3md': ['يَكْتُبَا'],
            '3fd': ['تَكْتُبَا'],
            '1p': ['نَكْتُبْ'],
            '2mp': ['تَكْتُبُوا'],
            '2fp': ['تَكْتُبْنَ'],
            '3mp': ['يَكْتُبُوا'],
            '3fp': ['يَكْتُبْنَ'],
          },
        },
      },
      'wiktionary',
    )

    expect(file).toContain('expect(conjugatePresentMood(getVerbById("ktb-1")!, \'jussive\')).toEqualT({')
    expect(file).toContain("'3ms': expect.toBeOneOf(['يَكْتُبْ', 'يَكْتُبِ', 'يَكْتُبِي']),")
  })
})
