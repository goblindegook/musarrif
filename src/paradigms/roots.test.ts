import { describe, expect, test } from 'vitest'
import { analyzeRoot, type RootAnalysisType, rootTypeLocaleKey } from './roots'
import { tokenize } from './tokens'

describe('analyzeRoot', () => {
  test.each<[string, readonly string[], string | undefined, number[], number[]]>([
    ['كتب', ['sound'], undefined, [], []],
    ['قام', ['hollow'], 'yaa', [1], []],
    ['دعو', ['defective'], 'waw', [2], []],
    ['وصل', ['assimilated'], undefined, [0], []],
    ['وقي', ['assimilated', 'defective'], 'yaa', [0, 2], []],
    ['روي', ['hollow', 'defective'], 'waw', [1, 2], []],
    ['ءكل', ['sound', 'hamzated'], undefined, [], [0]],
    ['أول', ['hamzated', 'hollow'], 'waw', [1], [0]],
    ['ءوي', ['hamzated', 'hollow', 'defective'], undefined, [1, 2], [0]],
    ['ءتى', ['hamzated', 'defective'], 'yaa', [2], [0]],
    ['وأد', ['hamzated', 'assimilated'], undefined, [0], [1]],
  ])('identifies %s as %s', (root, type, weakLetter, weakPositions, hamzaPositions) => {
    expect(analyzeRoot(tokenize(root))).toEqual({ type, weakLetter, weakPositions, hamzaPositions })
  })

  test('analyzeRoot types a doubled root as sound, since a doubled pair is no عِلَّة', () => {
    expect(analyzeRoot(tokenize('مدد'))).toEqual({
      type: ['sound', 'doubled'],
      weakLetter: undefined,
      weakPositions: [],
      hamzaPositions: [],
    })
  })

  test('analyzeRoot types ردد as sound and doubled too', () => {
    expect(analyzeRoot(tokenize('ردد'))).toEqual({
      type: ['sound', 'doubled'],
      weakLetter: undefined,
      weakPositions: [],
      hamzaPositions: [],
    })
  })

  test('analyzeRoot types أمم as sound, hamzated and doubled', () => {
    expect(analyzeRoot(tokenize('أمم'))).toEqual({
      type: ['sound', 'hamzated', 'doubled'],
      weakLetter: undefined,
      weakPositions: [],
      hamzaPositions: [0],
    })
  })

  test('analyzeRoot types a sound root as sound', () => {
    expect(analyzeRoot(tokenize('كتب')).type).toEqual(['sound'])
  })

  test('analyzeRoot hollow root returns the specific weak letter', () => {
    expect(analyzeRoot(tokenize('قول'))).toMatchObject({ type: ['hollow'], weakLetter: 'waw' })
  })

  test('analyzeRoot types a reduplicated quadriliteral root as sound and biliteral', () => {
    expect(analyzeRoot(tokenize('زلزل')).type).toEqual(['sound', 'biliteral'])
  })

  test('analyzeRoot types a reduplicated root with a hamza as sound, hamzated and biliteral', () => {
    expect(analyzeRoot(tokenize('ءلءل')).type).toEqual(['sound', 'hamzated', 'biliteral'])
  })

  test('analyzeRoot types a reduplicated root with weak letters as quadriliteral-weak and biliteral', () => {
    expect(analyzeRoot(tokenize('ولول')).type).toEqual(['quadriliteral-weak', 'biliteral'])
  })

  test.each<[string, readonly string[]]>([
    ['سيطر', ['quadriliteral-weak']],
    ['بلور', ['quadriliteral-weak']],
    ['كلور', ['quadriliteral-weak']],
    ['وسوس', ['quadriliteral-weak', 'biliteral']],
    ['زلزل', ['sound', 'biliteral']],
    ['عرقل', ['sound']],
    ['ءرشف', ['sound', 'hamzated']],
    ['لءلء', ['sound', 'hamzated', 'biliteral']],
    ['ءلوز', ['hamzated', 'quadriliteral-weak']],
    ['سيءطر', ['hamzated', 'quadriliteral-weak']],
  ])('identifies quadriliteral %s as %s', (root, type) => {
    expect(analyzeRoot(tokenize(root)).type).toEqual(type)
  })

  test('analyzeRoot types an assimilated doubled root as weak, not sound', () => {
    expect(analyzeRoot(tokenize('ودد')).type).toEqual(['assimilated', 'doubled'])
  })
})

describe('rootTypeLocaleKey', () => {
  test.each<[readonly string[], string]>([
    [['sound', 'biliteral'], 'sound'],
    [['sound', 'doubled'], 'doubled'],
    [['sound', 'hamzated', 'biliteral'], 'hamzated'],
    [['hamzated', 'biliteral'], 'hamzated'],
    [['quadriliteral-weak', 'biliteral'], 'quadriliteral-weak'],
  ])('reads %s as %s: sound and biliteral name no behaviour of their own', (type, key) => {
    expect(rootTypeLocaleKey(type as RootAnalysisType)).toBe(key)
  })
})
