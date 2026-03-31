import { transliterate } from '@pacote/buckwalter'
import { mapRecord } from '../primitives/objects'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === 'object' && value.constructor === Object

export const transliterateValue = (value: unknown): unknown => {
  if (typeof value === 'string') return transliterate(value)
  if (Array.isArray(value)) return value.map(transliterateValue)
  if (isRecord(value)) return mapRecord(value, transliterateValue)
  return value
}
