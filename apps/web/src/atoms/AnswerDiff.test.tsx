import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'
import { AnswerDiff } from './AnswerDiff'

afterEach(() => {
  cleanup()
})

test('each segment renders its own text', () => {
  render(
    <AnswerDiff
      segments={[
        { text: 'كت', mark: 'match' },
        { text: 'م', mark: 'error' },
      ]}
    />,
  )

  expect(screen.getByText('كت')).toBeInTheDocument()
  expect(screen.getByText('م')).toBeInTheDocument()
})

test('an errored segment is distinguishable from a matching one in the markup', () => {
  render(
    <AnswerDiff
      segments={[
        { text: 'كت', mark: 'match' },
        { text: 'م', mark: 'error' },
      ]}
    />,
  )

  expect(screen.getByText('م')).toHaveAttribute('data-mark', 'error')
  expect(screen.getByText('كت')).toHaveAttribute('data-mark', 'match')
})

test('a missing segment is distinguishable from an errored one', () => {
  render(<AnswerDiff segments={[{ text: 'كَ', mark: 'missing' }]} />)

  expect(screen.getByText('كَ')).toHaveAttribute('data-mark', 'missing')
})
