import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { canConjugatePassive } from './support'

describe('no passive voice', () => {
  test.each<[string, VerbForm]>([
    ['وفي', 1],
    ['يئس', 1],
    ['ظلل', 1],
  ])('%s (Form %d)', (root, form) => {
    expect(canConjugatePassive(getVerb(root, form))).toBe(false)
  })
})
