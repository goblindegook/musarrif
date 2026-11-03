import { describe, expect, test } from 'vitest'
import { FATHA, SHADDA, Token, YEH } from '../tokens'
import { getVerbById } from '../verbs'
import { measureMorpheme, radicalMorpheme } from '../word'
import { deriveMasdar } from './masdar'

describe('deriveMasdar', () => {
  test('fa3l keeps assimilated glides as a radical doubled by a measure shadda', () => {
    const [masdar] = deriveMasdar(getVerbById('kwy-1')!)

    expect(masdar.morphemes).toEqual([
      radicalMorpheme(new Token('ك')),
      measureMorpheme(FATHA),
      radicalMorpheme(YEH),
      measureMorpheme(SHADDA),
    ])
  })
})
