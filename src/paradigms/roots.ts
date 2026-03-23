import { isHamzatedLetter, isWeakLetter } from './letters'

export type RootType = 'regular' | 'weak' | 'hamzated'

export function getRootType(root: string): RootType {
  if (Array.from(root).some(isWeakLetter)) return 'weak'
  if (Array.from(root).some(isHamzatedLetter)) return 'hamzated'
  return 'regular'
}
