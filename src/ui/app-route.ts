const APP_ROUTE_SEGMENTS = new Set(['verbs', 'test'])

export function hasAppRoute({ pathname, hash }: { pathname: string; hash: string }): boolean {
  if (hash.startsWith('#/')) return true
  const [segment] = pathname.split('/').filter(Boolean)
  return segment != null && APP_ROUTE_SEGMENTS.has(segment)
}
