import { memoize } from '@pacote/memoize'

function distance(a: string, b: string): number {
  const lettersA = Array.from(a)
  const lettersB = Array.from(b)

  const rows = lettersA.length + 1
  const cols = lettersB.length + 1
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i += 1) {
    dp[i][0] = i
  }
  for (let j = 0; j < cols; j += 1) {
    dp[0][j] = j
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = lettersA[i - 1] === lettersB[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }

  return dp[rows - 1][cols - 1]
}

const cacheKey = (a: string, b: string) => [a, b].join(':')

export const wordDistance = memoize(cacheKey, distance, { capacity: 10000 })
