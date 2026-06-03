import { describe, expect, test } from 'vitest'
import { renderVerbTestFile } from './verb-test-render.mts'
import type { ParsedParadigms } from './wiktionary-parse.mts'

const PARSED_FIXTURE: ParsedParadigms = {
  paradigms: {
    'active past': {
      '1s': 'كَتَبْتُ',
      '1p': 'كَتَبْنَا',
      '2ms': 'كَتَبْتَ',
      '2fs': 'كَتَبْتِ',
      '2d': 'كَتَبْتُمَا',
      '2mp': 'كَتَبْتُمْ',
      '2fp': 'كَتَبْتُنَّ',
      '3ms': 'كَتَبَ',
      '3fs': 'كَتَبَتْ',
      '3md': 'كَتَبَا',
      '3fd': 'كَتَبَتَا',
      '3mp': 'كَتَبُوا',
      '3fp': 'كَتَبْنَ',
    },
    'active imperative': {
      '2ms': 'اُكْتُبْ',
      '2fs': 'اُكْتُبِي',
      '2d': 'اُكْتُبَا',
      '2mp': 'اُكْتُبُوا',
      '2fp': 'اُكْتُبْنَ',
    },
    'passive past': {
      '1s': 'كُتِبْتُ',
      '1p': 'كُتِبْنَا',
      '2ms': 'كُتِبْتَ',
      '2fs': 'كُتِبْتِ',
      '2d': 'كُتِبْتُمَا',
      '2mp': 'كُتِبْتُمْ',
      '2fp': 'كُتِبْتُنَّ',
      '3ms': 'كُتِبَ',
      '3fs': 'كُتِبَتْ',
      '3md': 'كُتِبَا',
      '3fd': 'كُتِبَتَا',
      '3mp': 'كُتِبُوا',
      '3fp': 'كُتِبْنَ',
    },
  },
  nominals: {
    activeParticiple: 'كَاتِب',
    masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'],
    passiveParticiple: 'مَكْتُوب',
  },
}

describe('renderVerbTestFile', () => {
  test('renders test blocks using the project matcher conventions', () => {
    const file = renderVerbTestFile('ktb-1', PARSED_FIXTURE)

    expect(file).not.toContain("const verb = getVerbById('ktb-1')!")
    expect(file).toContain("test('active past', () => {")
    expect(file).toContain('expect(conjugatePast(getVerbById("ktb-1")!)).toEqualT({')
    expect(file).toContain("test('active imperative', () => {")
    expect(file).toContain('expect(conjugateImperative(getVerbById("ktb-1")!)).toMatchObjectT({')
    expect(file).toContain("test('active participle', () => {")
    expect(file).toContain("test('passive participle', () => {")
    expect(file).toContain("test('masdar', () => {")
    expect(file).toContain("expect(deriveMasdar(getVerbById(\"ktb-1\")!)).toEqualT(['كِتَابَة', 'كَتْب', 'كِتَاب'])")
  })

  test('renders valid string literals for slugs containing apostrophes', () => {
    const file = renderVerbTestFile("qr'-1", PARSED_FIXTURE)

    expect(file).toContain('describe("qr\'-1", () => {')
    expect(file).toContain('getVerbById("qr\'-1")!')
  })
})
