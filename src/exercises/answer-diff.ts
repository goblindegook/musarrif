import { applyDiacriticsPreference } from '../paradigms/tokens'

export type AnswerMark = 'match' | 'error' | 'missing'
export type AnswerSegment = { text: string; mark: AnswerMark }

export type AnswerDiffResult = {
  outcome: 'correct' | 'partial' | 'wrong'
  typed: readonly AnswerSegment[]
  correct: readonly AnswerSegment[]
}

const SHADDA = 'ّ'
const SUKOON = 'ْ'
const VOWELS = new Set(['ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ'])

type Cluster = {
  letter: string
  slot: string
  shadda: boolean
  end: number
}

function clusters(text: string): readonly Cluster[] {
  const result: Cluster[] = []
  let offset = 0

  for (const char of text) {
    offset += char.length
    if (/\p{Mn}/u.test(char)) {
      const current = result[result.length - 1]
      if (current == null) continue
      if (char === SHADDA) current.shadda = true
      else if (current.slot === '' && (char === SUKOON || VOWELS.has(char))) current.slot = char
      current.end = offset
      continue
    }
    result.push({ letter: char, slot: '', shadda: false, end: offset })
  }

  return result
}

function lcsPairs(a: readonly Cluster[], b: readonly Cluster[]): readonly (readonly [number, number])[] {
  const table = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i][j] = a[i].letter === b[j].letter ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1])
    }
  }

  const pairs: (readonly [number, number])[] = []
  let i = 0
  let j = 0

  while (i < a.length && j < b.length) {
    if (a[i].letter === b[j].letter) {
      pairs.push([i, j])
      i += 1
      j += 1
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i += 1
    } else {
      j += 1
    }
  }

  return pairs
}

function toSegments(text: string, source: readonly Cluster[], marks: readonly AnswerMark[]): AnswerSegment[] {
  const segments: AnswerSegment[] = []
  let cursor = 0

  source.forEach((cluster, index) => {
    const slice = text.slice(cursor, cluster.end)
    cursor = cluster.end
    const last = segments[segments.length - 1]
    if (last?.mark === marks[index]) last.text += slice
    else segments.push({ text: slice, mark: marks[index] })
  })

  const tail = text.slice(cursor)
  if (tail === '') return segments
  const last = segments[segments.length - 1]
  if (last == null) return [{ text: tail, mark: 'match' }]
  last.text += tail
  return segments
}

function compareSlot(solution: string, typed: string, lenient: boolean): AnswerMark {
  if (!VOWELS.has(solution)) return VOWELS.has(typed) ? 'error' : 'match'
  if (typed === solution) return 'match'
  if (typed === '') return lenient ? 'match' : 'missing'
  return 'error'
}

function compareCluster(solution: Cluster, typed: Cluster, lenient: boolean): AnswerMark {
  if (solution.shadda !== typed.shadda) return 'error'
  return compareSlot(solution.slot, typed.slot, lenient)
}

export function diffAnswer(typed: string, solution: string): AnswerDiffResult {
  const typedText = typed.normalize('NFC').trim()
  const solutionText = solution.normalize('NFC').trim()
  const typedClusters = clusters(typedText)
  const solutionClusters = clusters(solutionText)
  const pairs = lcsPairs(typedClusters, solutionClusters)

  const typedMarks: AnswerMark[] = typedClusters.map(() => 'error')
  const solutionMarks: AnswerMark[] = solutionClusters.map(() => 'error')
  for (const [i, j] of pairs) {
    typedMarks[i] = 'match'
    solutionMarks[j] = 'match'
  }

  const lettersMatch = pairs.length === typedClusters.length && pairs.length === solutionClusters.length
  const hasTypedMarks = typedClusters.some((cluster) => cluster.slot !== '' || cluster.shadda)

  if (lettersMatch && hasTypedMarks) {
    const someClusters = clusters(applyDiacriticsPreference(solutionText, 'some'))
    for (const [i, j] of pairs) {
      const mark = compareCluster(solutionClusters[j], typedClusters[i], someClusters[j]?.slot === '')
      solutionMarks[j] = mark
      typedMarks[i] = mark === 'missing' ? 'match' : mark
    }
  }

  const marks = [...typedMarks, ...solutionMarks]
  const outcome = !lettersMatch || marks.includes('error') ? 'wrong' : marks.includes('missing') ? 'partial' : 'correct'

  return {
    outcome,
    typed: toSegments(typedText, typedClusters, typedMarks),
    correct: toSegments(solutionText, solutionClusters, solutionMarks),
  }
}
