import { isDateOnly, type UserDataKey } from './schema'

/** The exact SRS card key the web implementation uses, without normalizing its contents. */
export function srsCardKey(cardKey: string): UserDataKey {
  return `srs:${requireID(cardKey, 'SRS card key')}`
}

/** `date` is a local-calendar YYYY-MM-DD value; it is never converted through a timezone. */
export function dailyActivityKey(date: string): UserDataKey {
  if (!isDateOnly(date)) throw new Error(`Daily activity date must be a valid date-only value (YYYY-MM-DD): ${date}`)
  return `exercise:daily:${date}`
}

export function adaptiveDimensionKey(dimension: string): UserDataKey {
  return `dimension:${requireID(dimension, 'dimension')}`
}

function requireID(value: string, label: string): string {
  if (!value || value.trim() !== value) throw new Error(`${label} must be a non-empty stable identifier.`)
  return value
}
