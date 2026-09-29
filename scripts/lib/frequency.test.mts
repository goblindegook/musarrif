import { describe, expect, test } from 'vitest'
import ranking from '../../src/data/verb-frequency.json'
import { type DisplayVerb, getVerbById } from '../../src/paradigms/verbs.ts'
import { rankVerbsByLemma } from './frequency.mts'

function verbsById(...ids: string[]): DisplayVerb[] {
  return ids.map((id) => getVerbById(id)).filter((verb) => verb != null)
}

describe('rankVerbsByLemma', () => {
  test('ranks verbs by the summed counts of their lemmas, leaving out lemmas no verb has', () => {
    const lemmas = [
      ['قال', 5],
      ['عَنَى', 100],
      ['كان', 10],
    ] as const

    expect(rankVerbsByLemma(lemmas, verbsById('qwl-1', 'kwn-1'))).toEqual(['kwn-1', 'qwl-1'])
  })

  test.each([
    ['حَسِب', 'Hsb-1-i-a'],
    ['حَسَب', 'Hsb-1-a-u'],
    ['ٱِسْتَطاع', 'TwE-10'],
    ['لَيِس', 'lys-1'],
  ])('analyser lemma %s is credited to %s', (lemma, id) => {
    expect(rankVerbsByLemma([[lemma, 1]], verbsById('Hsb-1-a-u', 'Hsb-1-i-a', 'TwE-10', 'lys-1'))).toEqual([id])
  })

  test('splits a lemma evenly between the verbs it could be when its vowels do not tell them apart', () => {
    expect(rankVerbsByLemma([['حسب', 30]], verbsById('Hsb-1-a-u', 'Hsb-1-i-a', 'qwl-1'))).toEqual([
      'Hsb-1-a-u',
      'Hsb-1-i-a',
    ])
  })

  test.each([['راوَنْد'], ['وَرَى']])('credits the analyser lemma %s to رَأَى', (lemma) => {
    expect(rankVerbsByLemma([[lemma, 1]], verbsById("r'y-1", 'wry-1'))).toEqual(["r'y-1"])
  })
})

describe('verb-frequency.json', () => {
  const CORE_VERBS = [
    'qwl-1',
    'kwn-1',
    "'kd-2",
    '$wr-4',
    'Eln-4',
    'tmm-1',
    'SbH-4',
    'Ewd-1',
    'Dyf-4',
    'qwm-1',
    'mkn-4',
    'wSl-1',
    "bd'-1",
    "jy'-1",
    'TwE-10',
    'rwd-4',
    'Eml-1',
    'HSl-1',
    "r'y-1",
    'Erf-1',
  ]

  test('lists only known verb ids, each once', () => {
    expect(ranking.filter((id) => getVerbById(id) == null)).toEqual([])
    expect(new Set(ranking).size).toBe(ranking.length)
  })

  test('ranks at least 18 of 20 core verbs in the top 100', () => {
    const top = new Set(ranking.slice(0, 100))
    expect(CORE_VERBS.filter((id) => !top.has(id)).length).toBeLessThanOrEqual(2)
  })

  test('ranks a common Form I verb above its rare Form II sibling', () => {
    // An unranked verb sorts last, so indexOf's -1 becomes the largest unsigned value.
    const rank = (id: string) => ranking.indexOf(id) >>> 0
    expect(rank('ktb-1')).toBeLessThan(rank('ktb-2'))
  })
})
