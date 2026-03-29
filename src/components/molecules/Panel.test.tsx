import { fireEvent, render, screen } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { Panel } from './Panel'

describe('Panel', () => {
  test('renders children by default', () => {
    render(
      <Panel title="Test">
        <p>Content</p>
      </Panel>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  test('does not render arrow indicator when not collapsible', () => {
    render(
      <Panel title="Test">
        <p>Content</p>
      </Panel>,
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  describe('collapsible', () => {
    test('renders arrow indicator in title when collapsible', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument()
    })

    test('children are visible when collapsible but not defaultCollapsed', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.getByText('Content')).toBeVisible()
    })

    test('children are hidden when defaultCollapsed', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.queryByText('Content')).not.toBeVisible()
    })

    test('clicking title expands a collapsed panel', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed>
          <p>Content</p>
        </Panel>,
      )
      fireEvent.click(screen.getByRole('button', { name: /test/i }))
      expect(screen.getByText('Content')).toBeVisible()
    })

    test('clicking title collapses an expanded panel', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      fireEvent.click(screen.getByRole('button', { name: /test/i }))
      expect(screen.queryByText('Content')).not.toBeVisible()
    })
  })
})
