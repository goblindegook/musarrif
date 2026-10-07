import { Picker } from '@expo/ui/swift-ui'
import { act, render, screen } from '@testing-library/react-native'
import { DEFAULT_FILTERS } from './filter-model'
import { VerbFilterSheet } from './VerbFilterSheet'

describe('native verb filters', () => {
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

    const sortPicker = screen.UNSAFE_getAllByType(Picker).find((picker) => picker.props.label === 'Order')!
    await act(() => sortPicker.props.onSelectionChange('alphabetical'))
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

    await act(() => screen.getByTestId('filter-root-sound').props.onIsOnChange({ nativeEvent: { isOn: true } }))
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

    const formPicker = screen
      .UNSAFE_getAllByProps({ label: 'Form' })
      .find((node) => typeof node.props.onSelectionChange === 'function')
    await act(() => formPicker?.props.onSelectionChange('2'))
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

    await act(() => screen.UNSAFE_getByProps({ label: 'By group' }).props.onSelectionChange('favourites'))
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

    await act(() => screen.UNSAFE_getByProps({ label: 'Apply' }).props.onPress())
    await act(() => screen.UNSAFE_getByProps({ label: 'Clear All' }).props.onPress())
    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onClear).toHaveBeenCalledTimes(1)
  })
})
