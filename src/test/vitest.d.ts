import 'vitest'

interface StringAssertions {
  toMatchObjectT(expected: unknown): void
  toEqualT(expected: unknown): void
}

declare module 'vitest' {
  interface Assertion {
    strings: StringAssertions
    toMatchObjectT(expected: unknown): void
    toEqualT(expected: unknown): void
  }
  interface AsymmetricMatchersContaining {
    toMatchObjectT(expected: unknown): void
    toEqualT(expected: unknown): void
  }
}
