import { afterEach, expect, test } from 'vitest'
import { renderInto } from './render'

const container = document.createElement('div')
document.body.appendChild(container)

afterEach(() => {
  container.replaceChildren()
  localStorage.clear()
})

test('renders the current route on every call', () => {
  const { happyDOM } = window as unknown as { happyDOM: { setURL: (url: string) => void } }
  const snapshots = [
    ['ktb-1', 'Derived forms'],
    ['kwn-1', 'Kāna and her sisters'],
  ].map(([verbId]) => {
    happyDOM.setURL(`https://musarrif.com/verbs/${verbId}/`)
    renderInto(container)
    return container.textContent
  })

  expect(snapshots[0]).toContain('Derived forms')
  expect(snapshots[1]).toContain('Kāna and her sisters')
})
