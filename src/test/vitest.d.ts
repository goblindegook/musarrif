import 'vitest'

declare module 'vitest' {
  interface Assertion {
    toMatchObjectT(expected: unknown): void
    toEqualT(expected: unknown): void
  }
  interface AsymmetricMatchersContaining {
    toMatchObjectT(expected: unknown): void
    toEqualT(expected: unknown): void
  }
}
