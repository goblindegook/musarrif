import { describe, expect, test } from 'vitest'

import { getClosestVerbs } from './selection'
import { verbs } from './verbs'

describe('getClosestVerbs', () => {
  test('prefers verbs with matching radicals in the same positions', () => {
    const closestRoots = getClosestVerbs('نبأ', verbs, 6).map((verb) => verb.root)

    expect(closestRoots).toEqualT(['نشأ', 'ابت', 'أبي', 'بدأ', 'بطأ', 'تبع'])
  })
})
