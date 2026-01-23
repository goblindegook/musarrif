import { describe, expect, test } from 'vitest'

import { getClosestVerbs } from './selection'
import { verbs } from './verbs'

describe('getClosestVerbs', () => {
  test('prefers verbs with matching radicals in the same positions', () => {
    const closestRoots = getClosestVerbs('أنبأ', verbs, 6).map((verb) => verb.root)

    expect(closestRoots).toEqualT(['أنشأ', 'تنب', 'أتي', 'أتي', 'أثر', 'أجر'])
  })
})
