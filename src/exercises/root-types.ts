import { tokenize } from '../paradigms/tokens'

export type SrsRootType = 'sound' | 'doubled' | 'hamzated' | 'assimilated' | 'hollow' | 'defective'

export function getSrsRootType(root: string): SrsRootType {
  const [c1, c2, c3] = tokenize(root)
  if (c3.isWeak) return 'defective'
  if (c2.isWeak) return 'hollow'
  if (c1.isWeak) return 'assimilated'
  if ([c1, c2, c3].some((t) => t.isHamza)) return 'hamzated'
  if (c2.equals(c3)) return 'doubled'
  return 'sound'
}
