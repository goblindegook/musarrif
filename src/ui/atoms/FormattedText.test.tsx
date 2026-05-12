import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { FormattedText } from './FormattedText'

afterEach(() => {
  cleanup()
})

describe('FormattedText', () => {
  test('renders allowed inline html tags', () => {
    render(<FormattedText text={'Use <strong>bold</strong> and <em>emphasis</em><br>now'} />)

    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText('emphasis').tagName).toBe('EM')
    expect(document.querySelectorAll('br')).toHaveLength(1)
  })

  test('sanitizes disallowed tags and unsafe attributes', () => {
    render(
      <FormattedText
        text={
          'Read <span>carefully</span> <a href="javascript:alert(1)" data-x="1">unsafe</a> ' +
          '<a href="/docs" data-x="2">safe</a>'
        }
      />,
    )

    const unsafe = screen.getByText('unsafe')
    const safe = screen.getByText('safe').closest('a')!

    expect(unsafe.closest('p')!.textContent).toBe('Read carefully unsafe safe')
    expect(unsafe.closest('a')!.getAttribute('href')).toBeNull()
    expect(safe.getAttribute('href')).toBe('/docs')
    expect(safe.getAttribute('data-x')).toBeNull()
  })
})
