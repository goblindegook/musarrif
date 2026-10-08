import { fireEvent, render, screen } from '@testing-library/react-native'
import { DEFAULT_FILTERS } from './filter-model'
import { VerbFilterSheet } from './VerbFilterSheet'

describe('verb filters', () => {
  test('shows sort choices as the same native list style as group choices', async () => {
    const onChange = jest.fn()
    await render(
      <VerbFilterSheet
        filters={DEFAULT_FILTERS}
        isPresented
        language="en"
        onApply={jest.fn()}
        onChange={onChange}
        onClear={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )

    await fireEvent.press(screen.getByRole('radio', { name: 'Alphabetical' }))
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, sort: 'alphabetical' })
  })

  test('makes sound roots exclusive when toggled on', async () => {
    const onChange = jest.fn()
    await render(
      <VerbFilterSheet
        filters={{ ...DEFAULT_FILTERS, rootShapes: ['doubled'] }}
        isPresented
        language="en"
        onApply={jest.fn()}
        onChange={onChange}
        onClear={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )

    await fireEvent.press(screen.getByRole('switch', { name: 'Sound' }))
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, rootShapes: ['sound'] })
  })

  test('selects a form from the native form picker', async () => {
    const onChange = jest.fn()
    await render(
      <VerbFilterSheet
        filters={DEFAULT_FILTERS}
        isPresented
        language="en"
        onApply={jest.fn()}
        onChange={onChange}
        onClear={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )

    await fireEvent.press(screen.getByRole('radio', { name: 'II' }))
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, form: '2' })
  })

  test('keeps the favorites option in the exclusive group picker', async () => {
    const onChange = jest.fn()
    await render(
      <VerbFilterSheet
        filters={DEFAULT_FILTERS}
        isPresented
        language="en"
        onApply={jest.fn()}
        onChange={onChange}
        onClear={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )

    await fireEvent.press(screen.getByRole('radio', { name: 'Favorites' }))
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, group: 'favourites' })
  })

  test('exposes native apply and clear actions', async () => {
    const onApply = jest.fn()
    const onClear = jest.fn()
    await render(
      <VerbFilterSheet
        filters={DEFAULT_FILTERS}
        isPresented
        language="en"
        onApply={onApply}
        onChange={jest.fn()}
        onClear={onClear}
        onDismiss={jest.fn()}
      />,
    )

    await fireEvent.press(screen.getByRole('button', { name: 'Apply' }))
    await fireEvent.press(screen.getByRole('button', { name: 'Clear All' }))
    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onClear).toHaveBeenCalledTimes(1)
  })
})
