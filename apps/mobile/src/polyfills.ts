if (!Array.prototype.toSorted) {
  Object.defineProperty(Array.prototype, 'toSorted', {
    configurable: true,
    writable: true,
    value<T>(this: readonly T[], compareFn?: (left: T, right: T) => number) {
      return [...this].sort(compareFn)
    },
  })
}
